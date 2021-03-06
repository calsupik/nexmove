import objectAssignDeep from 'object-assign-deep'
import SessionHandler from '../../../SessionHandler'
import Mailer from '../../../Mailer'
import Users from '../../../models/Users'
import config from '../../../../config'

export default {
  session({ req, res }) {
    res.json({ session: req.session })
  },
  
  ['session/set']({ req, res, postgres }) {
    const users   = Users(postgres, req.session)
    const session = SessionHandler(req.session)
    const userId  = session.getLoggedInUserId()
    const data    = req.body.data
    const key     = req.body.key || '__temp'

    if (data.toString() !== '[object Object]')
      return res.status(400).json({ error: "Make sure you pass an object to add to the session." })

    users.setSession({ [ key ]: objectAssignDeep(req.session[key] || {}, data) })
    res.json(true)
  },

  async ['username/available']({ req, res, postgres }) {
    const users     = Users(postgres)
    const username  = req.query.username

    const userRecord = await users.findBy({ username_email: username })
    res.json(!userRecord)
  },

  ['redirect/set']({ req, res }) {
    req.session.returnTo = req.body.target
    req.session.save()
    res.json(null)
  },

  async ['password/forgot']({ req, res, redis, postgres }) {
    const users     = Users(postgres, req.session)
    const username  = req.body.email

    const userRecord = await users.findBy({ username_email: username })
    if (!userRecord)
      return res.status(404).json({ error: "User Record Not Found." })

    const tempPassword  = users.generateTempPassword()
    const tempPwHash    = await users.hashPassword(tempPassword)
    users.setRecord({ id: userRecord.id, needs_password_reset: true, password_hash: tempPwHash })
    await users.save()

    const mailer = Mailer()
    mailer.send({
      to: username,
      subject: `${config.app.name}: Temporary Password`,
      html: `<div> Your temporary password to login to ${config.app.name} is below:
              <div style="margin:25px 0px"><strong>${tempPassword}</strong></div>
              <div><a href="${config.app.host}"> Login Now! </a></div>
            </div>`
    })

    res.json(true)
  },

  async ['password/reset']({ req, res, redis, postgres }) {
    const session           = SessionHandler(req.session, { redis })
    const users             = Users(postgres, req.session)
    const userRec           = session.getLoggedInUserId(true)
    const currentPassword   = req.body.current_password
    const newPassword       = req.body.new_password

    if (userRec.password_hash) {
      if (!currentPassword)
        return res.status(401).json({ error: "Please enter your current password to validate before changing." })

      if (currentPassword === newPassword)
        return res.status(400).json({ error: "Please enter a different password than your previous one." })

      const isCurrentPasswordCorrect = await users.validateUserPassword(userRec.username_email, currentPassword)
      if (!isCurrentPasswordCorrect)
        return res.status(401).json({ error: "The current password you provided is not correct. Please try again." })
    }

    const newHashedPassword = await users.hashPassword(newPassword)
    users.setRecord({ id: userRec.id, password_hash: newHashedPassword, needs_password_reset: null, last_password_reset: new Date() })
    await users.save()

    res.json(true)
  }
}
