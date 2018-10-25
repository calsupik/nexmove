export default {
  APP_NO_LONGER_LOADING (state) {
    state.isLoading = false
  },

  CACHE_INIT_USER_RECORD (state, user) {
    state.initUser = user
  },

  CHECK_LOGGED_IN (state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },

  SET_SESSION_INFO (state, {
    user
  }) {
    state.auth.user = Object.assign(state.auth.user || {}, user)
    console.log('STATE', state)
  }
}
