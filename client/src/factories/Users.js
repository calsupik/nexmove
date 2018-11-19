import { handleFetchResponse } from './ApiHelpers'

export default {
  async get () {
    const response = await window.nexmoveFetch('/api/1.0/users/all')
    return handleFetchResponse(response)
  },

  async save (user) {
    const response = await window.nexmoveFetch('/api/1.0/users/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    return handleFetchResponse(response)
  },

  async delete (user) {
    const response = await window.nexmoveFetch('/api/1.0/users/delete', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    return handleFetchResponse(response)
  }
}
