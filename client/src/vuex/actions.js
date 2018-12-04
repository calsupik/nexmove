import ApiAuth from '../factories/ApiAuth'

export default {
  async init ({ commit, state }) {
    const responses = await Promise.all([
      ApiAuth.getLoggedInUser()
    ].map(p => p.catch(e => e)))

    const errors = responses.filter(r => (r instanceof Error))
    if (errors.length > 0) {
      console.log('ERRORS', errors)
    }

    const sessionInfo = responses[0]

    if (sessionInfo && sessionInfo.session && sessionInfo.session.user) {
      commit('CHECK_LOGGED_IN', true)

      commit('SET_SESSION_INFO', {
        user: sessionInfo.session.user
      })
    }

    commit('APP_NO_LONGER_LOADING')
  },

  redirectToHome () {
    window.vueRouter.push('/')
  },

  redirectToLogin () {
    window.vueRouter.push('/login')
  },

  redirectToPasswordReset () {
    window.vueRouter.push('/autherror/resetpassword')
  }
}
