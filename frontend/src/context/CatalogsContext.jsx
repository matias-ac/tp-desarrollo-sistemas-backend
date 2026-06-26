import { createContext, useContext, useState, useEffect } from 'react'
import { entidadesService } from '../services/entidades'
import { promocionesService } from '../services/promociones'

const CatalogsContext = createContext(null)

export function CatalogsProvider({ children }) {
  const [supermercados, setSupermercados] = useState([])
  const [diasSemana, setDiasSemana] = useState([])
  const [mediosPago, setMediosPago] = useState([])

  useEffect(() => {
    Promise.all([
      entidadesService.getSupermercados(),
      promocionesService.getDiasSemana(),
      promocionesService.getMediosDePago(),
    ]).then(([supers, dias, medios]) => {
      setSupermercados(supers)
      setDiasSemana(dias)
      setMediosPago(medios)
    })
  }, [])

  const supermercadosMap = Object.fromEntries(supermercados.map((s) => [s.id, s]))
  const diasSemanaMap = Object.fromEntries(diasSemana.map((d) => [d.id, d]))
  const mediosPagoMap = Object.fromEntries(mediosPago.map((m) => [m.id, m]))

  return (
    <CatalogsContext.Provider value={{
      supermercados,
      diasSemana,
      mediosPago,
      supermercadosMap,
      diasSemanaMap,
      mediosPagoMap,
    }}>
      {children}
    </CatalogsContext.Provider>
  )
}

export function useCatalogs() {
  const ctx = useContext(CatalogsContext)
  if (!ctx) throw new Error('useCatalogs must be used within CatalogsProvider')
  return ctx
}
