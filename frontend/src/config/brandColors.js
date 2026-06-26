// Mapa de colores de marca para entidades argentinas.
// Colores primarios oficiales de cada marca.
const BRAND_COLORS_RAW = {
  // Supermercados
  'coto': '#E31837',
  'carrefour': '#006CB7',
  'dia': '#E2001A',
  'jumbo': '#009FE3',
  'changomas': '#0071CE',
  'walmart': '#0071CE',
  'disco': '#E31837',
  'vea': '#CC0000',
  'la anonima': '#E31837',

  // Bancos
  'banco nacion': '#003B7A',
  'santander': '#EC0000',
  'galicia': '#CC0000',
  'bbva': '#004481',
  'hsbc': '#DB0011',
  'itau': '#EC6608',
  'macro': '#FFCC00',
  'provincia': '#00529B',
  'icbc': '#CC0033',
  'ciudad': '#E2001A',
  'supervielle': '#E31837',
  'patagonia': '#005A8E',
  'comafi': '#005B99',

  // Billeteras / Fintech
  'mercado pago': '#009EE3',
  'modo': '#7B2D8B',
  'naranja': '#FF6200',
  'uala': '#00D4B4',
  'brubank': '#7B2FBE',
  'personal pay': '#E2001A',
  'prex': '#00C08B',
}

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

const BRAND_COLORS_NORMALIZED = Object.fromEntries(
  Object.entries(BRAND_COLORS_RAW).map(([k, v]) => [normalize(k), v])
)

export const FALLBACK_COLOR = '#6B7280'

/**
 * Devuelve el color de marca para una entidad dado su nombre.
 * Hace matching parcial insensible a acentos y mayúsculas.
 */
export function getBrandColor(nombre) {
  if (!nombre) return FALLBACK_COLOR
  const n = normalize(nombre)
  for (const [brand, color] of Object.entries(BRAND_COLORS_NORMALIZED)) {
    if (n === brand || n.includes(brand) || brand.includes(n)) {
      return color
    }
  }
  return FALLBACK_COLOR
}

/**
 * Devuelve una versión más clara del color de marca para usar como fondo sutil.
 * Agrega opacidad al color hex.
 */
export function getBrandColorLight(nombre, opacity = '15') {
  const color = getBrandColor(nombre)
  return `${color}${opacity}`
}
