import L from 'leaflet'

export type MapThemeMode = 'light' | 'dark'

/** CartoDB Positron (claro) y Dark Matter (oscuro) */
export function sbMapTileUrl(theme: MapThemeMode) {
  return theme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
}

export function sbPersonMarkerIcon(
  active: boolean,
  theme: MapThemeMode,
  variant: 'primary' | 'peer' = 'primary',
  pulse = false,
) {
  const classes = [
    'sb-map-marker-pin',
    theme === 'dark' ? 'is-dark' : '',
    active ? 'is-active' : '',
    variant === 'peer' ? 'is-peer' : '',
    pulse ? 'is-pulse' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return L.divIcon({
    className: 'sb-map-marker',
    html: `<span class="${classes}" aria-hidden="true"></span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

export function sbCityClusterIcon(
  count: number,
  active: boolean,
  theme: MapThemeMode,
) {
  const classes = [
    'sb-map-cluster-dot',
    theme === 'dark' ? 'is-dark' : '',
    active ? 'is-active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const size = active ? 44 : 40

  return L.divIcon({
    className: 'sb-map-cluster',
    html: `<span class="${classes}">${count}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}
