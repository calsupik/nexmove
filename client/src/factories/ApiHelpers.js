export async function handleFetchResponse (response, type = 'json') {
  const typeParser = (type) ? await response[type]() : null
  if (response.status >= 400) {
    let errorInfo = null
    try {
      if (!typeParser) {
        errorInfo = (await response.json()).error
      } else {
        errorInfo = typeParser.error
      }
      throw new Error(errorInfo || response)
    } catch (e) {
      throw new Error(errorInfo || response || e)
    }
  } else {
    return typeParser
  }
}
