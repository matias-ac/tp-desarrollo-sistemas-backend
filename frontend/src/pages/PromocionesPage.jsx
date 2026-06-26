import { useState, useEffect, useCallback } from 'react'
import { promocionesService } from '../services/promociones'
import { useCatalogs } from '../context/CatalogsContext'
import PromocionCard from '../components/PromocionCard'
import FiltrosPromocion from '../components/FiltrosPromocion'
import { SkeletonGrid } from '../components/SkeletonCard'

export default function PromocionesPage() {
  const { supermercados, diasSemana } = useCatalogs()
  const [promociones, setPromociones] = useState([])
  const [filtros, setFiltros] = useState({ supermercados: [], dias_semana: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFiltros, setShowFiltros] = useState(false)

  const fetchPromociones = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await promocionesService.getPromociones(filtros)
      setPromociones(data)
    } catch (err) {
      setError(err.message || 'No se pudieron cargar las promociones')
    } finally {
      setLoading(false)
    }
  }, [filtros])

  useEffect(() => {
    fetchPromociones()
  }, [fetchPromociones])

  const activeFiltersCount =
    (filtros.supermercados?.length || 0) + (filtros.dias_semana?.length || 0)

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-brand-700 to-brand-500 rounded-2xl p-6 mb-6 text-white">
        <h1 className="text-2xl font-bold">Promociones de supermercados</h1>
        <p className="text-brand-100 text-sm mt-1">
          Descuentos, cuotas y reintegros en un solo lugar
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {loading ? 'Cargando...' : `${promociones.length} promociones`}
        </p>
        <button
          onClick={() => setShowFiltros((v) => !v)}
          className="flex items-center gap-2 text-sm font-medium text-brand-700 border border-brand-300 px-3 py-1.5 rounded-xl hover:bg-brand-50 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
            />
          </svg>
          Filtros
          {activeFiltersCount > 0 && (
            <span className="bg-brand-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {showFiltros && (
        <div className="mb-4">
          <FiltrosPromocion
            supermercados={supermercados}
            diasSemana={diasSemana}
            filtros={filtros}
            onChange={setFiltros}
          />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 text-center">
          {error}
          <button onClick={fetchPromociones} className="ml-2 underline font-medium">
            Reintentar
          </button>
        </div>
      )}

      {loading && <SkeletonGrid count={6} />}

      {!loading && !error && promociones.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">🔍</div>
          <p className="font-semibold text-gray-600 text-lg">Sin resultados</p>
          <p className="text-sm mt-1">Proba cambiando los filtros para ver mas promociones</p>
          {activeFiltersCount > 0 && (
            <button
              onClick={() => setFiltros({ supermercados: [], dias_semana: [] })}
              className="mt-4 text-sm text-brand-600 hover:underline font-medium"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {!loading && !error && promociones.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {promociones.map((p) => (
            <PromocionCard key={p.id} promocion={p} />
          ))}
        </div>
      )}
    </main>
  )
}
