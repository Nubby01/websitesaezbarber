export type SocialLink = {
  label: string
  href: string
}

export const siteContact = {
  /** Ejemplo: 'https://wa.me/56912345678' */
  whatsapp: '',
  /** Email de soporte */
  email: '',
  /** Completar href cuando el cliente entregue los enlaces */
  social: [
    { label: 'Instagram', href: '' },
    { label: 'YouTube', href: '' },
    { label: 'TikTok', href: '' },
    { label: 'Podcast', href: '' },
  ] as SocialLink[],
}

export const brand = {
  name: 'Visagismo SB',
  tagline:
    'Restaurando el oficio, elevando la industria. Dejamos de cortar pelo para transformar identidades.',
} as const

export const tallyFormUrl = 'https://tally.so/r/WOpPpv'
export const tallyEmbedUrl =
  'https://tally.so/embed/WOpPpv?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'

/** Ruta interna: academia con scroll al formulario embebido */
export const applicationFormPath = '/academia#formulario-postulacion'

/** Navegación compacta del header */
export const mainNavLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/visagistas', label: 'Visagistas' },
  { to: '/academia', label: 'Academia' },
] as const

/** Navegación institucional completa del footer (según guía de contenidos) */
export const footerNavLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/#ejes', label: 'Metodología y Filosofía' },
  { to: '/visagistas', label: 'Alumnos Certificados' },
  { to: '/academia', label: 'Academia SB y Postulación' },
] as const

export function activeSocialLinks() {
  return siteContact.social.filter((item) => item.href.trim().length > 0)
}
