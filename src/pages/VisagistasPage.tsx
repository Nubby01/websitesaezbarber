import { Helmet } from 'react-helmet-async'
import { CertifiedCommunity } from '../components/CertifiedCommunity'

export function VisagistasPage() {
  return (
    <>
      <Helmet>
        <title>Visagistas SB | Comunidad certificada Academia SB</title>
        <meta
          name="description"
          content="Conocé a los Visagistas SB certificados: fichas, generaciones y perfiles de la comunidad Academia SB."
        />
      </Helmet>
      <CertifiedCommunity />
    </>
  )
}
