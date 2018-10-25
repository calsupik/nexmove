import Errors from '../errors'
import Users from './models/Users'
import config from '../config'

export default function LoginHandler(postgres, session) {
  const users = Users(postgres, session)

  return {
    async standardLogin(userRecord) {
      const didLogin = users.login(userRecord)

      users.setSession({
        last_login: new Date()
      })
    }
  }
}
