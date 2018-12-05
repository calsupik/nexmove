import { handleFetchResponse } from './ApiHelpers'

export default {
  async setRedirect (targetUrl) {
    const response = await window.nexmoveFetch(`/api/1.0/auth/redirect/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: targetUrl })
    })
    return handleFetchResponse(response)
  },

  async setSession (key, data) {
    const response = await window.nexmoveFetch(`/api/1.0/auth/session/set`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, data })
    })
    return handleFetchResponse(response)
  },

  async forgotPassword (email) {
    const response = await window.nexmoveFetch(`/api/1.0/auth/password/forgot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    return handleFetchResponse(response)
  },

  async resetPassword ({ currentPassword, newPassword }) {
    const response = await window.nexmoveFetch(`/api/1.0/auth/password/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
    })
    return handleFetchResponse(response)
  },

  async getLoggedInUser () {
    const response = await window.nexmoveFetch(`/api/1.0/auth/session`)
    return handleFetchResponse(response)
  },

  async checkUsernameAvailability (username) {
    const response = await window.nexmoveFetch(`/api/1.0/auth/username/available?username=${encodeURIComponent(username)}`)
    return handleFetchResponse(response)
  },

  async getLoggedInUsersIntegrations () {
    const response = await window.nexmoveFetch(`/api/1.0/auth/integrations/get`)
    return handleFetchResponse(response)
  },

  isValidEmail (text = '') {
    return /^.+@.+\.([a-zA-Z\d]{2,5})$/.test(text)
  },

  isValidTeamId (id = '') {
    return /^[a-z\d]{5,8}$/.test((id || '').toLowerCase())
  }
}
