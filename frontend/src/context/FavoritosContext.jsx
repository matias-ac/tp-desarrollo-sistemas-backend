import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from './AuthContext'
import { authService } from '../services/auth'

const FavoritosContext = createContext(null)

export function FavoritosProvider({ children }) {
  const { user, accessToken } = useAuth()
  const [promosFav, setPromosFav] = useState(new Set())
  const [supersFav, setSupersFav] = useState(new Set())

  // Refs que se actualizan SINCRÓNICAMENTE junto con el estado.
  // No usan useEffect para evitar el timing gap entre commit y efecto.
  const promosFavRef = useRef(new Set())
  const supersFavRef = useRef(new Set())

  // Guards de concurrencia: un Set de IDs con requests en vuelo
  const pendingPromosRef = useRef(new Set())
  const pendingSupersRef = useRef(new Set())

  // Sincroniza con el perfil del usuario al hacer login/logout.
  // Actualiza ref Y estado juntos para que nunca estén desincronizados.
  useEffect(() => {
    if (user) {
      const promos = new Set(user.promociones_favoritas || [])
      const supers = new Set(user.supermercados_favoritos || [])
      promosFavRef.current = promos
      supersFavRef.current = supers
      setPromosFav(promos)
      setSupersFav(supers)
    } else {
      promosFavRef.current = new Set()
      supersFavRef.current = new Set()
      setPromosFav(new Set())
      setSupersFav(new Set())
    }
  }, [user])

  const togglePromoFav = useCallback(async (id) => {
    if (!accessToken) return
    if (pendingPromosRef.current.has(id)) return

    pendingPromosRef.current.add(id)

    // Leer estado actual desde ref (siempre actualizado sincrónicamente)
    const esFav = promosFavRef.current.has(id)

    // Actualizar el ref síncronamente ANTES de setState
    if (esFav) {
      promosFavRef.current.delete(id)
    } else {
      promosFavRef.current.add(id)
    }
    // Pasar new Set() garantiza nueva referencia → React siempre re-renderiza
    setPromosFav(new Set(promosFavRef.current))

    try {
      if (esFav) {
        await authService.quitarPromocionFavorita(id, accessToken)
      } else {
        await authService.agregarPromocionFavorita(id, accessToken)
      }
    } catch (err) {
      console.error('Error al togglear promo favorita:', err)
      // Revertir ref y estado si la request falla
      if (esFav) {
        promosFavRef.current.add(id)
      } else {
        promosFavRef.current.delete(id)
      }
      setPromosFav(new Set(promosFavRef.current))
    } finally {
      pendingPromosRef.current.delete(id)
    }
  }, [accessToken])

  const toggleSuperFav = useCallback(async (id) => {
    if (!accessToken) return
    if (pendingSupersRef.current.has(id)) return

    pendingSupersRef.current.add(id)

    const esFav = supersFavRef.current.has(id)

    if (esFav) {
      supersFavRef.current.delete(id)
    } else {
      supersFavRef.current.add(id)
    }
    setSupersFav(new Set(supersFavRef.current))

    try {
      if (esFav) {
        await authService.quitarSupermercadoFavorito(id, accessToken)
      } else {
        await authService.agregarSupermercadoFavorito(id, accessToken)
      }
    } catch (err) {
      console.error('Error al togglear super favorito:', err)
      if (esFav) {
        supersFavRef.current.add(id)
      } else {
        supersFavRef.current.delete(id)
      }
      setSupersFav(new Set(supersFavRef.current))
    } finally {
      pendingSupersRef.current.delete(id)
    }
  }, [accessToken])

  return (
    <FavoritosContext.Provider value={{ promosFav, supersFav, togglePromoFav, toggleSuperFav }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  const ctx = useContext(FavoritosContext)
  if (!ctx) throw new Error('useFavoritos must be used within FavoritosProvider')
  return ctx
}
