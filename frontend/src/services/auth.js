import { api } from './api'

export const authService = {
  login: (email, password) =>
    api.post('/api/token/', { username: email, password }),

  register: (data) =>
    api.post('/api/usuarios/registro/', data),

  refreshToken: (refresh) =>
    api.post('/api/token/refresh/', { refresh }),

  getPerfil: (token) =>
    api.get('/api/usuarios/perfil/', { token }),

  agregarPromocionFavorita: (id, token) =>
    api.post(`/api/usuarios/favoritos/promociones/${id}/agregar/`, {}, { token }),

  quitarPromocionFavorita: (id, token) =>
    api.post(`/api/usuarios/favoritos/promociones/${id}/quitar/`, {}, { token }),

  agregarSupermercadoFavorito: (id, token) =>
    api.post(`/api/usuarios/favoritos/supermercados/${id}/agregar/`, {}, { token }),

  quitarSupermercadoFavorito: (id, token) =>
    api.post(`/api/usuarios/favoritos/supermercados/${id}/quitar/`, {}, { token }),
}
