import { handleFetchResponse } from './ApiHelpers'

export default {
  async get () {
    const response = await window.nexmoveFetch('/api/1.0/locations/all')
    return handleFetchResponse(response)
  },

  async save (location) {
    const response = await window.nexmoveFetch('/api/1.0/locations/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(location)
    })
    return handleFetchResponse(response)
  },

  async delete (location) {
    const response = await window.nexmoveFetch('/api/1.0/locations/delete', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(location)
    })
    return handleFetchResponse(response)
  }
}
