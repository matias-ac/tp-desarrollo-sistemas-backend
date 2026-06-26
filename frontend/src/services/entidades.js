import { api } from './api'

export const entidadesService = {
  getSupermercados: () =>
    api.get('/api/entidades/supermercados/'),

  getOferentes: () =>
    api.get('/api/entidades/oferentes/'),
}
