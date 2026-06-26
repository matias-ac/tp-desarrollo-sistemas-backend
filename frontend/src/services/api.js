const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8090'

/**
 * Low-level fetch wrapper. Automatically attaches Bearer token if provided.
 */
async function request(path, { token, ...options } = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })

  if (!res.ok) {
    let errorData
    try {
      errorData = await res.json()
    } catch {
      errorData = { detail: res.statusText }
    }
    const error = new Error(errorData.detail || 'Error en la solicitud')
    error.status = res.status
    error.data = errorData
    throw error
  }

  // 204 No Content
  if (res.status === 204) return null

  return res.json()
}

export const api = {
  get: (path, options) => request(path, { method: 'GET', ...options }),
  post: (path, body, options) =>
    request(path, { method: 'POST', body: JSON.stringify(body), ...options }),
  delete: (path, options) => request(path, { method: 'DELETE', ...options }),
}
