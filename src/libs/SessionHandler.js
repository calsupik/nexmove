import moment from 'moment'

export default function SessionHandler(session, { redis } = {}) {
  return {
    getLoggedInUserId(fullRecord=false) {
      if (session && session.user)
        return (fullRecord) ? session.user : session.user.id

      return null
    },

    setSession(object, sessionObj=session) {
      if (session && sessionObj) {
        for (var _key in object) {
          if (object[_key] && object[_key].toString() === '[object Object]') {
            sessionObj[_key] = sessionObj[_key] || {}
            this.setSession(object[_key], sessionObj[_key])
          } else {
            sessionObj[_key] = object[_key]
          }
        }

        session.save()
        return true
      }
      return false
    }
  }
}
