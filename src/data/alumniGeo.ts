import type { Alumni } from './alumni'

export type CityGroup = {
  key: string
  city: string
  country: string
  lat: number
  lng: number
  people: Alumni[]
}

function located(person: Alumni): person is Alumni & { lat: number; lng: number } {
  return typeof person.lat === 'number' && typeof person.lng === 'number'
}

export function cityKey(city: string, country: string) {
  return `${country.trim().toLowerCase()}|${city.trim().toLowerCase()}`
}

export function groupAlumniByCity(people: Alumni[]): CityGroup[] {
  const groups = new Map<string, CityGroup>()

  for (const person of people) {
    if (!located(person)) continue

    const city = person.city?.trim() || 'Ubicación'
    const country = person.country?.trim() || ''
    const key = cityKey(city, country)

    const existing = groups.get(key)
    if (existing) {
      existing.people.push(person)
      existing.lat =
        existing.people.reduce((sum, p) => sum + (p.lat ?? 0), 0) /
        existing.people.length
      existing.lng =
        existing.people.reduce((sum, p) => sum + (p.lng ?? 0), 0) /
        existing.people.length
    } else {
      groups.set(key, {
        key,
        city,
        country,
        lat: person.lat,
        lng: person.lng,
        people: [person],
      })
    }
  }

  return [...groups.values()].sort((a, b) =>
    `${a.city}${a.country}`.localeCompare(`${b.city}${b.country}`, 'es'),
  )
}

export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const earthRadius = 6371
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function sortByDistance(
  people: Alumni[],
  origin: { lat: number; lng: number },
) {
  return [...people]
    .filter(located)
    .map((person) => ({
      person,
      km: distanceKm(origin.lat, origin.lng, person.lat, person.lng),
    }))
    .sort((a, b) => a.km - b.km)
}

export function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

export function matchesAlumniSearch(person: Alumni, query: string) {
  if (!query) return true

  const needle = normalizeSearch(query)
  const haystack = normalizeSearch(
    [
      person.name,
      person.address,
      person.city,
      person.region,
      person.country,
      person.instagram,
    ]
      .filter(Boolean)
      .join(' '),
  )
  return haystack.includes(needle)
}

export function alumniInSameCity(person: Alumni, people: Alumni[]) {
  if (!located(person)) return []

  const city = person.city?.trim() || 'Ubicación'
  const country = person.country?.trim() || ''
  const key = cityKey(city, country)

  return people.filter((candidate) => {
    if (!located(candidate)) return false
    const candidateCity = candidate.city?.trim() || 'Ubicación'
    const candidateCountry = candidate.country?.trim() || ''
    return cityKey(candidateCity, candidateCountry) === key
  })
}
