import ApiAuth from '../factories/ApiAuth'

export default {
  async init ({ commit, state }) {
    const isLoggedIn = state.isLoggedIn
    if (!isLoggedIn) {
      return false
    }

    const responses = await Promise.all([
      ApiAuth.getLoggedInUser()
    ].map(p => p.catch(e => e)))

    const errors = responses.filter(r => (r instanceof Error))
    if (errors.length > 0) {
      console.log('ERRORS', errors)
    }

    const sessionInfo = responses[0]

    commit('SET_SESSION_INFO', {
      user: sessionInfo.session.user
    })
  },

  redirectToHome () {
    window.vueRouter.push('/')
  },

  redirectToLogin () {
    window.vueRouter.push('/gatekeeper/login')
  },

  redirectToPasswordReset () {
    window.vueRouter.push('/autherror/resetpassword')
  }
}
