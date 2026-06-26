import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/auth'

function Field({ name, label, type = 'text', placeholder, autoComplete, value, onChange, error, withToggle = false }) {
  const [showPwd, setShowPwd] = useState(false)
  const inputType = withToggle ? (showPwd ? 'text' : 'password') : type

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm transition-shadow ${
            withToggle ? 'pr-11' : ''
          } ${error ? 'border-red-400' : 'border-gray-300'}`}
        />
        {withToggle && (
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setFieldErrors((fe) => ({ ...fe, [e.target.name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    if (form.password !== form.confirmPassword) {
      setFieldErrors({ confirmPassword: 'Las contrasenas no coinciden' })
      return
    }

    setLoading(true)
    try {
      await authService.register({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
      })
      const tokens = await authService.login(form.email, form.password)
      const userData = await authService.getPerfil(tokens.access)
      login(tokens, userData)
      navigate('/', { replace: true })
    } catch (err) {
      if (err.data && typeof err.data === 'object') {
        const mapped = {}
        for (const [key, val] of Object.entries(err.data)) {
          mapped[key] = Array.isArray(val) ? val[0] : val
        }
        setFieldErrors(mapped)
      } else {
        setError(err.message || 'No se pudo completar el registro')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-5xl">🛒</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Crea tu cuenta</h1>
          <p className="text-gray-500 text-sm mt-1">Guarda tus promociones favoritas</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field name="first_name" label="Nombre" placeholder="Juan" autoComplete="given-name" value={form.first_name} onChange={handleChange} error={fieldErrors.first_name} />
              <Field name="last_name" label="Apellido" placeholder="Perez" autoComplete="family-name" value={form.last_name} onChange={handleChange} error={fieldErrors.last_name} />
            </div>
            <Field name="email" label="Email" type="email" placeholder="tu@email.com" autoComplete="email" value={form.email} onChange={handleChange} error={fieldErrors.email} />
            <Field name="password" label="Contrasena" placeholder="Minimo 8 caracteres" autoComplete="new-password" value={form.password} onChange={handleChange} error={fieldErrors.password} withToggle />
            <Field name="confirmPassword" label="Repetir contrasena" placeholder="••••••••" autoComplete="new-password" value={form.confirmPassword} onChange={handleChange} error={fieldErrors.confirmPassword} withToggle />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Ya tenes cuenta?{' '}
          <Link to="/login" className="text-brand-600 font-medium hover:underline">
            Ingresa
          </Link>
        </p>
      </div>
    </div>
  )
}
