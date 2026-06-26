import { api } from './api'

export const promocionesService = {
  getPromociones: ({ supermercados, dias_semana } = {}) => {
    const params = new URLSearchParams()
    if (supermercados?.length) {
      supermercados.forEach((id) => params.append('supermercados', id))
    }
    if (dias_semana?.length) {
      dias_semana.forEach((id) => params.append('dias_semana', id))
    }
    const query = params.toString()
    return api.get(`/api/promociones/${query ? '?' + query : ''}`)
  },

  getPromocion: (id) =>
    api.get(`/api/promociones/${id}/`),

  getMediosDePago: () =>
    api.get('/api/promociones/medios-de-pago/'),

  getDiasSemana: () =>
    api.get('/api/promociones/dias-semana/'),
}
