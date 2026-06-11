const BASE_URL = 'https://dog.ceo/api'

// Dog CEO wraps every payload as { message, status }; callers only need `message`.
export const getMessage = async (path) => {
    const response = await fetch(`${BASE_URL}${path}`)
    if (!response.ok) {
        throw new Error(`Dog CEO request failed (${response.status}) for ${path}`)
    }
    const body = await response.json()
    return body.message
}
