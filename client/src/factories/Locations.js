import { handleFetchResponse } from './ApiHelpers'

export default {
  async getLocations () {
    const response = await window.nexmoveFetch('/api/1.0/locations/all')
    return handleFetchResponse(response)
  }
}
