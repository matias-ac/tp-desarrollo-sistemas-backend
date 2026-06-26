export default function FiltrosPromocion({
  supermercados,
  diasSemana,
  filtros,
  onChange,
}) {
  const toggleItem = (key, id) => {
    const current = filtros[key] || []
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id]
    onChange({ ...filtros, [key]: next })
  }

  const hasFilters =
    (filtros.supermercados?.length || 0) + (filtros.dias_semana?.length || 0) > 0

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
          Filtros
        </h2>
        {hasFilters && (
          <button
            onClick={() => onChange({ supermercados: [], dias_semana: [] })}
            className="text-xs text-brand-600 hover:underline font-medium"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Supermercados */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          Supermercados
        </p>
        <div className="flex flex-wrap gap-2">
          {supermercados.map((s) => {
            const active = filtros.supermercados?.includes(s.id)
            return (
              <button
                key={s.id}
                onClick={() => toggleItem('supermercados', s.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-brand-400'
                }`}
              >
                {s.nombre}
              </button>
            )
          })}
        </div>
      </div>

      {/* Dias de semana */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          Dia de la semana
        </p>
        <div className="flex flex-wrap gap-2">
          {diasSemana.map((d) => {
            const active = filtros.dias_semana?.includes(d.id)
            return (
              <button
                key={d.id}
                onClick={() => toggleItem('dias_semana', d.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  active
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-brand-400'
                }`}
              >
                {d.nombre}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
