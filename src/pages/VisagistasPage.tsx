import { Helmet } from 'react-helmet-async'
import { CertifiedCommunity } from '../components/CertifiedCommunity'

export function VisagistasPage() {
  return (
    <>
      <Helmet>
        <title>Visagismo SB | Directorio y Mapa Oficial de Visagistas SB</title>
        <meta
          name="description"
          content="Directorio y mapa oficial de Visagistas SB. Ubica al profesional certificado más cercano y explora perfiles con asesoría basada en ciencia, respeto y empatía."
        />
      </Helmet>
      <CertifiedCommunity />
    </>
  )
}
