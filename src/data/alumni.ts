import { alumniPhotos } from './alumniPhotos'

export type Generation = '1.0' | '2.0'

export type Alumni = {
  id: string
  name: string
  generation: Generation
  year: number
  specialty: string
  certificate: string
  /** Uso interno; no se expone en la web pública */
  email?: string
  instagram?: string
  /** Dirección completa cuando el cliente la confirma (uso interno / mapa) */
  address?: string
  /** Nombre comercial del local */
  businessName?: string
  /** Si true, muestra barbería o dirección comercial en la ficha pública */
  showCommercialAddress?: boolean
  /** Comuna o ciudad de referencia */
  city?: string
  /** Región, estado o provincia */
  region?: string
  country?: string
  lat?: number
  lng?: number
  /** Zoom fijo para el mapa de la ficha; si no se define se calcula por precisión */
  mapZoom?: number
  photo?: string
  photoPosition?: string
  photoBackdrop?: string
  photoScale?: number
  photoOrigin?: string
}

type PhotoStyle = {
  position?: string
  backdrop?: string
  scale?: number
  origin?: string
}

const photoStyles: Record<string, PhotoStyle> = {
  'enzo-giovanni-ravello': { position: 'center 24%' },
  'rody-bernazar': { position: 'center 28%' },
  'matias-gonzalez-toro': {
    position: 'center 52%',
    backdrop: 'linear-gradient(90deg, #F5F6F5 0%, #FBFCFB 35%, #FDFDFD 100%)',
    scale: 1.32,
    origin: 'center 48%',
  },
  'rodrigo-perez-tobar': { position: 'center 34%' },
  'bayron-flores': { position: 'center 28%' },
  'carlos-aguero': { position: 'center 34%' },
  'sofia-barraza': { position: 'center 32%' },
  'jose-juan-rodriguez': { position: 'center 24%' },
  'jose-manuel-rodriguez': {
    position: 'center 34%',
    backdrop: '#FFFFFF',
    scale: 1.14,
    origin: 'center 36%',
  },
  'matias-arancibia': { position: 'center 24%' },
  'enrique-garza': {
    position: 'center 12%',
    backdrop: '#FEFEFE',
    scale: 1.18,
    origin: 'center 18%',
  },
  'cristopher-ivan': {
    position: 'center 12%',
    backdrop: '#FAFAFC',
    scale: 1.26,
    origin: 'center 20%',
  },
  'alberth-tolosa': {
    position: 'center 14%',
    backdrop: '#F8F9FB',
    scale: 1.24,
    origin: 'center 22%',
  },
  'trinidad-ormazabal': {
    position: 'center 14%',
    backdrop: '#F6F7F9',
    scale: 1.24,
    origin: 'center 22%',
  },
  'angelo-alfaro': { position: 'center 36%' },
  'camilo-rocha': { position: 'center 30%' },
  'jared-ordenes': {
    position: 'center 16%',
    backdrop: '#F7F7F9',
    scale: 1.26,
    origin: 'center 24%',
  },
  'carlos-matias-correa': {
    position: 'center 12%',
    backdrop: '#F9FAFC',
    scale: 1.26,
    origin: 'center 20%',
  },
  'jonathan-romero': {
    position: 'center 12%',
    backdrop: '#FAFAFA',
    scale: 1.26,
    origin: 'center 20%',
  },
  'nicolas-paz': {
    position: 'center 14%',
    backdrop: '#F9FAFB',
    scale: 1.22,
    origin: 'center 22%',
  },
  'vicente-gomez': {
    position: 'center 14%',
    backdrop: 'linear-gradient(90deg, #EAEAE9 0%, #F1F1F1 45%, #F6F6F6 100%)',
    scale: 1.28,
    origin: 'center 22%',
  },
  'vicente-tapia': { position: 'center 28%' },
  'gricele-vergara': {
    position: 'center 12%',
    backdrop: '#FAFAF9',
    scale: 1.22,
    origin: 'center 20%',
  },
  'mauren-baron': {
    position: 'center 14%',
    backdrop: '#F8F9FB',
    scale: 1.24,
    origin: 'center 18%',
  },
}

const defaults = {
  specialty: 'Visagista SB Masculino & Consultor de Imagen',
  certificate: 'Visagista SB',
} as const

function createAlumni(
  partial: Omit<Alumni, 'specialty' | 'certificate' | 'year'> & {
    year?: number
    specialty?: string
    certificate?: string
  },
): Alumni {
  const style = photoStyles[partial.id]
  return {
    specialty: defaults.specialty,
    certificate: defaults.certificate,
    year: partial.generation === '1.0' ? 2024 : 2025,
    ...partial,
    photo: partial.photo ?? alumniPhotos[partial.id],
    photoPosition: partial.photoPosition ?? style?.position ?? 'center 16%',
    photoBackdrop: partial.photoBackdrop ?? style?.backdrop ?? '#FFFFFF',
    photoScale: partial.photoScale ?? style?.scale,
    photoOrigin: partial.photoOrigin ?? style?.origin ?? 'center center',
  }
}

export const alumni: Alumni[] = [
  createAlumni({
    id: 'enzo-giovanni-ravello',
    name: 'Enzo Giovanni Ravello',
    generation: '1.0',
    email: 'Enzor426@gmail.com',
    instagram: 'enzogiovannir',
    address: 'Pje. Los Mangos 945, Padre Hurtado, Región Metropolitana, Chile',
    city: 'Padre Hurtado',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.5673051,
    lng: -70.8020467,
  }),
  createAlumni({
    id: 'rody-bernazar',
    name: 'Rody Bernazar',
    generation: '1.0',
    email: 'rodybernazar79@gmail.com',
    instagram: 'rody.ricchh',
    address: 'C. Guayacán 79, Puente Alto, Región Metropolitana, Chile',
    city: 'Puente Alto',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.611026,
    lng: -70.5580294,
  }),
  createAlumni({
    id: 'matias-gonzalez-toro',
    name: 'Matías González Toro',
    generation: '1.0',
    email: 'maiastoro.274@gmail.com',
    instagram: 'saitambarber',
    address: 'Jericó 274, Lo Barnechea, Región Metropolitana, Chile',
    city: 'Lo Barnechea',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.3654291,
    lng: -70.5041642,
  }),
  createAlumni({
    id: 'rodrigo-perez-tobar',
    name: 'Rodrigo Perez Tobar',
    generation: '1.0',
    email: 'rodrigo.perezto@gmail.com',
    instagram: 'rodrigoperezt_',
    address:
      'Hernán Cortés 2829, Depto. 204, Ñuñoa, Región Metropolitana, Chile',
    city: 'Ñuñoa',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.4466868,
    lng: -70.6016442,
  }),
  createAlumni({
    id: 'bayron-flores',
    name: 'Bayron Flores',
    generation: '1.0',
    email: 'bayron.flores18@icloud.com',
    instagram: 'bayronflores.vsg',
    address: 'Estación Máfil 0401, Puente Alto, Región Metropolitana, Chile',
    city: 'Puente Alto',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.6215787,
    lng: -70.6131484,
  }),
  createAlumni({
    id: 'carlos-aguero',
    name: 'Carlos Aguero',
    generation: '1.0',
    email: 'aguerovasquezcarlos2001@outlook.es',
    instagram: 'carryoficial1',
    address: 'Av. Bolívar Este, Maracay 2101, Aragua, Venezuela',
    city: 'Maracay',
    region: 'Aragua',
    country: 'Venezuela',
    lat: 10.251095,
    lng: -67.5980746,
  }),
  createAlumni({
    id: 'sofia-barraza',
    name: 'Sofia Barraza',
    generation: '1.0',
    email: 'svbb1998@gmail.com',
    instagram: 'sofiav_barraza',
    address: 'Los Arándanos 5101, La Serena, Coquimbo, Chile',
    city: 'La Serena',
    region: 'Coquimbo',
    country: 'Chile',
    lat: -29.922296,
    lng: -71.1999938,
  }),
  createAlumni({
    id: 'jose-juan-rodriguez',
    name: 'Jose Juan Rodriguez Garcia',
    generation: '1.0',
    email: 'nantli.ayahuasca@hotmail.com',
    instagram: 'jose.visagista.25',
    city: 'Ciudad de México',
    country: 'México',
    lat: 19.4326,
    lng: -99.1332,
  }),
  createAlumni({
    id: 'jose-manuel-rodriguez',
    name: 'Jose Manuel Rodriguez',
    generation: '1.0',
    email: 'joseazul791@gmail.com',
    city: 'Guadalajara',
    country: 'México',
    lat: 20.6597,
    lng: -103.3496,
  }),
  createAlumni({
    id: 'matias-arancibia',
    name: 'Matías Arancibia',
    generation: '1.0',
    email: 'matias.arancibia.sanchez21@gmail.com',
    instagram: 'matiass_barbero',
    city: 'Temuco',
    country: 'Chile',
    lat: -38.7359,
    lng: -72.5904,
  }),
  createAlumni({
    id: 'enrique-garza',
    name: 'Enrique Garza Morales',
    generation: '1.0',
    email: 'henrygarza002@hotmail.com',
    instagram: 'soyenriquegarzza',
    city: 'Monterrey',
    country: 'México',
    lat: 25.6866,
    lng: -100.3161,
  }),
  createAlumni({
    id: 'cristopher-ivan',
    name: 'Cristopher Ivan',
    generation: '2.0',
    email: 'ivancristopher198@gmail.com',
    instagram: 'barberocris',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.4569,
    lng: -70.6483,
  }),
  createAlumni({
    id: 'alberth-tolosa',
    name: 'Alberth Tolosa',
    generation: '2.0',
    email: 'tolosa.alberth27@gmail.com',
    instagram: 'alberth_barber',
    address: 'Coronel 2330, Providencia, Región Metropolitana, Chile',
    city: 'Providencia',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.42235,
    lng: -70.6063912,
  }),
  createAlumni({
    id: 'trinidad-ormazabal',
    name: 'Trinidad Ormazabal',
    generation: '2.0',
    email: 'trini.sale15@gmail.com',
    instagram: 'trinibarber.cl',
    address:
      'Av. Irarrázaval 5185, Of. 508, Ñuñoa, Región Metropolitana, Chile',
    city: 'Ñuñoa',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.4544166,
    lng: -70.5761759,
  }),
  createAlumni({
    id: 'angelo-alfaro',
    name: 'Angelo Alfaro',
    generation: '2.0',
    email: 'enriqueangelo777@gmail.com',
    instagram: 'angelosky_barber',
    address: 'Av. Laguna Sur 8558, Pudahuel, Región Metropolitana, Chile',
    city: 'Pudahuel',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.4599807,
    lng: -70.7537082,
  }),
  createAlumni({
    id: 'camilo-rocha',
    name: 'Camilo Rocha',
    generation: '2.0',
    email: 'camilorochacanilo@gmail.com',
    instagram: 'clubneos.cl',
    address: "Nicolás Palacios 173, Of. 1, Santa Cruz, O'Higgins, Chile",
    city: 'Santa Cruz',
    region: "O'Higgins",
    country: 'Chile',
    lat: -34.6368009,
    lng: -71.3682508,
  }),
  createAlumni({
    id: 'jared-ordenes',
    name: 'Jared Ordenes',
    generation: '2.0',
    email: 'jaredordenes097@gmail.com',
    instagram: 'jared.ordenes',
    address: 'Calle José Joaquín Prieto 775, Concepción, Bío Bío, Chile',
    city: 'Concepción',
    region: 'Bío Bío',
    country: 'Chile',
    lat: -36.818984,
    lng: -73.0569704,
  }),
  createAlumni({
    id: 'carlos-matias-correa',
    name: 'Carlos Matías Correa',
    generation: '2.0',
    email: 'cacs.gospel@gmail.com',
    instagram: 'matiasccorrea',
    address: 'Río Lauca 836, Peñalolén, Región Metropolitana, Chile',
    city: 'Peñalolén',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.4747864,
    lng: -70.5294718,
  }),
  createAlumni({
    id: 'jonathan-romero',
    name: 'Jonathan Romero',
    generation: '2.0',
    email: 'setbarber18@gmail.com',
    instagram: 'barberamamx',
    address:
      'Paseo de San Ángel 321, Cumbres 1er Sector, Monterrey, N.L., México',
    city: 'Monterrey',
    region: 'Nuevo León',
    country: 'México',
    lat: 25.6802019,
    lng: -100.315258,
  }),
  createAlumni({
    id: 'nicolas-paz',
    name: 'Nicolas Paz',
    generation: '2.0',
    email: 'nicolaspazruiz@icloud.com',
    instagram: 'nicobarber._',
    address: 'San Rafael 7737, La Cisterna, Región Metropolitana, Chile',
    city: 'La Cisterna',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.5245139,
    lng: -70.64763,
  }),
  createAlumni({
    id: 'vicente-gomez',
    name: 'Vicente Gomez',
    generation: '2.0',
    email: 'vicentemilio14@gmail.com',
    instagram: 'barbervg_',
    address: 'C. de Ferraz 79, Moncloa - Aravaca, 28008 Madrid, España',
    city: 'Madrid',
    region: 'Comunidad de Madrid',
    country: 'España',
    lat: 40.4322876,
    lng: -3.7234153,
  }),
  createAlumni({
    id: 'vicente-tapia',
    name: 'Vicente Tapia',
    generation: '2.0',
    email: 'vrtapiaaguirre@gmail.com',
    instagram: 'rvlosbarber',
    address: 'De La Cincha 252, Quilicura, Región Metropolitana, Chile',
    city: 'Quilicura',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.3582302,
    lng: -70.7316501,
  }),
  createAlumni({
    id: 'gricele-vergara',
    name: 'Gricele Vergara',
    generation: '2.0',
    email: 'gricele.vergara@gmail.com',
    instagram: 'barbergris_',
    address: 'Av. Gral. Óscar Bonilla 8259, Pudahuel, Región Metropolitana, Chile',
    city: 'Pudahuel',
    region: 'Región Metropolitana',
    country: 'Chile',
    lat: -33.4517765,
    lng: -70.7429869,
  }),
  createAlumni({
    id: 'mauren-baron',
    name: 'Mauren Baron',
    generation: '2.0',
    email: 'maurenbarron@gmail.com',
    instagram: 'maurenbarron',
    address:
      'Av. Sierra Vista 536, Lomas 4ta Sección, San Luis Potosí, S.L.P., México',
    city: 'San Luis Potosí',
    region: 'San Luis Potosí',
    country: 'México',
    lat: 22.1387642,
    lng: -101.0363157,
  }),
]

export const featuredAlumniIds = [
  'enzo-giovanni-ravello',
  'matias-gonzalez-toro',
  'sofia-barraza',
  'enrique-garza',
  'trinidad-ormazabal',
  'cristopher-ivan',
] as const

export function featuredAlumni(): Alumni[] {
  return featuredAlumniIds
    .map((id) => alumni.find((person) => person.id === id))
    .filter((person): person is Alumni => !!person)
}

export function alumniLocationLabel(person: Alumni) {
  return [person.city, person.country].filter(Boolean).join(', ')
}

/** Ciudad + región para la ficha pública (sin calle) */
export function alumniProfessionalLocationLabel(person: Alumni) {
  return [person.city, person.region].filter(Boolean).join(', ')
}

export function alumniMapFooterLines(person: Alumni) {
  return {
    city: person.city || 'Ubicación por confirmar',
    regionCountry: [person.region, person.country].filter(Boolean).join(', '),
  }
}

/** Texto de barbería solo si el alumno autorizó mostrarla */
export function alumniCommercialLabel(person: Alumni) {
  if (!person.showCommercialAddress) return null
  if (person.businessName?.trim()) return person.businessName.trim()
  if (person.address?.trim()) return person.address.trim()
  return null
}

export function alumniAddressLabel(person: Alumni) {
  const commercial = alumniCommercialLabel(person)
  if (commercial) return commercial
  return alumniProfessionalLocationLabel(person) || alumniLocationLabel(person) || 'Por confirmar'
}

/**
 * Precisión real de las coordenadas: `address` cuando vienen de una dirección
 * geocodificada y `city` cuando solo tenemos el centro de la ciudad.
 */
export function alumniMapPrecision(person: Alumni): 'address' | 'city' {
  return person.address?.trim() ? 'address' : 'city'
}

export function alumniMapZoom(
  person: Alumni,
  variant: 'panel' | 'expanded',
): number {
  if (typeof person.mapZoom === 'number') {
    return variant === 'expanded' ? person.mapZoom + 2 : person.mapZoom
  }

  if (alumniMapPrecision(person) === 'address') {
    return variant === 'expanded' ? 17 : 15
  }

  return variant === 'expanded' ? 13 : 11
}

export function alumniMapsUrl(person: Alumni) {
  if (typeof person.lat !== 'number' || typeof person.lng !== 'number') {
    return null
  }

  const query = person.address?.trim()
    ? encodeURIComponent(person.address)
    : `${person.lat},${person.lng}`

  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export function generationLabel(generation: Generation) {
  const numbers: Record<Generation, string> = {
    '1.0': '01',
    '2.0': '02',
  }
  return `Generación SB #${numbers[generation]}`
}

export function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function instagramUrl(handle: string) {
  return `https://instagram.com/${handle}`
}
