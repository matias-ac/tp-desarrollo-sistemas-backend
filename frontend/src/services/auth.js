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
    api.post(`/api/promociones/${id}/agregar-favorito/`, {}, { token }),

  quitarPromocionFavorita: (id, token) =>
    api.post(`/api/promociones/${id}/quitar-favorito/`, {}, { token }),

  agregarSupermercadoFavorito: (id, token) =>
    api.post(`/api/entidades/supermercados/${id}/agregar-favorito/`, {}, { token }),

  quitarSupermercadoFavorito: (id, token) =>
    api.post(`/api/entidades/supermercados/${id}/quitar-favorito/`, {}, { token }),
}
