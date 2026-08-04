import { alumniPhotos } from './alumniPhotos'

export type Generation = '1.0' | '2.0'

export type Alumni = {
  id: string
  name: string
  generation: Generation
  year: number
  specialty: string
  certificate: string
  instagram?: string
  city?: string
  country?: string
  lat?: number
  lng?: number
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
  specialty: 'Visagismo',
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
    instagram: 'enzogiovannir',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.4489,
    lng: -70.6693
  }),
  createAlumni({
    id: 'rody-bernazar',
    name: 'Rody Bernazar',
    generation: '1.0',
    instagram: 'rody.ricchh',
    city: 'Valparaíso',
    country: 'Chile',
    lat: -33.0472,
    lng: -71.6127,
  }),
  createAlumni({
    id: 'matias-gonzalez-toro',
    name: 'Matías González Toro',
    generation: '1.0',
    instagram: 'saitambarber',
    city: 'Concepción',
    country: 'Chile',
    lat: -36.8201,
    lng: -73.0444
  }),
  createAlumni({
    id: 'rodrigo-perez-tobar',
    name: 'Rodrigo Perez Tobar',
    generation: '1.0',
    instagram: 'rodrigoperezt_',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.4372,
    lng: -70.6506,
  }),
  createAlumni({
    id: 'bayron-flores',
    name: 'Bayron Flores',
    generation: '1.0',
    instagram: 'bayronflores.vsg',
    city: 'La Serena',
    country: 'Chile',
    lat: -29.9027,
    lng: -71.2519,
  }),
  createAlumni({
    id: 'carlos-aguero',
    name: 'Carlos Aguero',
    generation: '1.0',
    instagram: 'carryoficial1',
    city: 'Antofagasta',
    country: 'Chile',
    lat: -23.6509,
    lng: -70.3975,
  }),
  createAlumni({
    id: 'sofia-barraza',
    name: 'Sofia Barraza',
    generation: '1.0',
    instagram: 'sofiav_barraza',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.4172,
    lng: -70.6067
  }),
  createAlumni({
    id: 'jose-juan-rodriguez',
    name: 'Jose Juan Rodriguez Garcia',
    generation: '1.0',
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
    city: 'Guadalajara',
    country: 'México',
    lat: 20.6597,
    lng: -103.3496,
  }),
  createAlumni({
    id: 'matias-arancibia',
    name: 'Matías Arancibia',
    generation: '1.0',
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
    instagram: 'barberocris',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.4569,
    lng: -70.6483
  }),
  createAlumni({
    id: 'alberth-tolosa',
    name: 'Alberth Tolosa',
    generation: '2.0',
    instagram: 'alberth_barber',
    city: 'Viña del Mar',
    country: 'Chile',
    lat: -33.0153,
    lng: -71.5503,
  }),
  createAlumni({
    id: 'trinidad-ormazabal',
    name: 'Trinidad Ormazabal',
    generation: '2.0',
    instagram: 'trinibarber.cl',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.425,
    lng: -70.575
  }),
  createAlumni({
    id: 'angelo-alfaro',
    name: 'Angelo Alfaro',
    generation: '2.0',
    instagram: 'angelosky_barber',
    city: 'Rancagua',
    country: 'Chile',
    lat: -34.1708,
    lng: -70.7444,
  }),
  createAlumni({
    id: 'camilo-rocha',
    name: 'Camilo Rocha',
    generation: '2.0',
    instagram: 'clubneos.cl',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.441,
    lng: -70.655,
  }),
  createAlumni({
    id: 'jared-ordenes',
    name: 'Jared Ordenes',
    generation: '2.0',
    instagram: 'jared.ordenes',
    city: 'Puerto Montt',
    country: 'Chile',
    lat: -41.4693,
    lng: -72.9424,
  }),
  createAlumni({
    id: 'carlos-matias-correa',
    name: 'Carlos Matías Correa',
    generation: '2.0',
    instagram: 'matiasccorrea',
    city: 'Talca',
    country: 'Chile',
    lat: -35.4264,
    lng: -71.6554,
  }),
  createAlumni({
    id: 'jonathan-romero',
    name: 'Jonathan Romero',
    generation: '2.0',
    instagram: 'barberamamx',
    city: 'Ciudad de México',
    country: 'México',
    lat: 19.391,
    lng: -99.162
  }),
  createAlumni({
    id: 'nicolas-paz',
    name: 'Nicolas Paz',
    generation: '2.0',
    instagram: 'nicobarber._',
    city: 'Iquique',
    country: 'Chile',
    lat: -20.2307,
    lng: -70.1357,
  }),
  createAlumni({
    id: 'vicente-gomez',
    name: 'Vicente Gomez',
    generation: '2.0',
    instagram: 'barbervg_',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.46,
    lng: -70.64,
  }),
  createAlumni({
    id: 'vicente-tapia',
    name: 'Vicente Tapia',
    generation: '2.0',
    instagram: 'rvlosbarber',
    city: 'Chillán',
    country: 'Chile',
    lat: -36.6067,
    lng: -72.1034,
  }),
  createAlumni({
    id: 'gricele-vergara',
    name: 'Gricele Vergara',
    generation: '2.0',
    instagram: 'barbergris_',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.43,
    lng: -70.62
  }),
  createAlumni({
    id: 'mauren-baron',
    name: 'Mauren Baron',
    generation: '2.0',
    instagram: 'maurenbarron',
    city: 'Bogotá',
    country: 'Colombia',
    lat: 4.711,
    lng: -74.0721,
  }),
  createAlumni({
    id: 'andres-jejen',
    name: 'Andres Jejen',
    generation: '2.0',
    city: 'Medellín',
    country: 'Colombia',
    lat: 6.2476,
    lng: -75.5658,
  }),
  createAlumni({
    id: 'carlos-javier-sanchez',
    name: 'Carlos Javier Sánchez Martínez',
    generation: '2.0',
    city: 'Lima',
    country: 'Perú',
    lat: -12.0464,
    lng: -77.0428,
  }),
  createAlumni({
    id: 'vicente-ahumada',
    name: 'Vicente Ahumada',
    generation: '2.0',
    city: 'Copiapó',
    country: 'Chile',
    lat: -27.3668,
    lng: -70.3322,
  }),
  createAlumni({
    id: 'tomas-valdes',
    name: 'Tomas Ignacio Valdes Navarrete',
    generation: '2.0',
    city: 'Osorno',
    country: 'Chile',
    lat: -40.574,
    lng: -73.134,
  }),
  createAlumni({
    id: 'benjamin-aguirre',
    name: 'Benjamin Aguirre',
    generation: '2.0',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.47,
    lng: -70.61,
  }),
  createAlumni({
    id: 'darian-faez',
    name: 'Darian Aaron Faez',
    generation: '2.0',
    city: 'Buenos Aires',
    country: 'Argentina',
    lat: -34.6037,
    lng: -58.3816,
  }),
  createAlumni({
    id: 'vicente-lizama',
    name: 'Vicente Lizama',
    generation: '2.0',
    city: 'Arica',
    country: 'Chile',
    lat: -18.4783,
    lng: -70.3126,
  }),
  createAlumni({
    id: 'daniel-tualongo',
    name: 'Daniel Tualongo',
    generation: '2.0',
    city: 'Quito',
    country: 'Ecuador',
    lat: -0.1807,
    lng: -78.4678,
  }),
  createAlumni({
    id: 'felipe-sepulveda',
    name: 'Felipe Sepulveda',
    generation: '2.0',
    city: 'Santiago',
    country: 'Chile',
    lat: -33.41,
    lng: -70.58,
  }),
  createAlumni({
    id: 'eswin-miranda',
    name: 'Eswin Miranda',
    generation: '2.0',
    city: 'Ciudad de Guatemala',
    country: 'Guatemala',
    lat: 14.6349,
    lng: -90.5069,
  }),
]

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
