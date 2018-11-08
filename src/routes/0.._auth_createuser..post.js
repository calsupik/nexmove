import bunyan from 'bunyan'
import Errors from '../errors'
import PostgresClient from '../libs/PostgresClient'
import LoginHandler from '../libs/LoginHandler'
import Users from '../libs/models/Users'
import Routes from '../libs/Routes'
import config from '../config'

const log       = bunyan.createLogger(config.logger.options)
const postgres  = new PostgresClient()

export default async function AuthCreateUser(req, res) {
  try {
    const username        = req.body.username
    const password        = req.body.password
    const confirmPassword = req.body.cpassword
    const usersInst       = Users(postgres, req.session)

    if (password !== confirmPassword)
      throw new Errors.PasswordsNotMatch(`Your passwords do not match.`)

    let userRecord = await usersInst.findBy({ username_email: username })
    if (userRecord)
      throw new Errors.UsernameAlreadyExists(`There is already a user with this email address.`)

    userRecord = await usersInst.findOrCreateBy({ username_email: username })
    usersInst.setRecord(Object.assign({
      password_hash:  await usersInst.hashPassword(password),
      first_name:     null,
      last_name:      null,
      last_login:     new Date(),
      num_logins:     1
    }, { id: userRecord.id }))
    await usersInst.save()

    const login = LoginHandler(postgres, req.session)
    await login.standardLogin(userRecord)
    Routes.checkAndRedirect(req, res)
    //res.redirect('/app')

  } catch(err) {
    log.error("Error", err)
    res.status(500).json({ error: err })
  }
}
