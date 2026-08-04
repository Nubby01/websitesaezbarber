import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-12 md:py-14 bg-surface">
      <div className="container-grid grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-display text-3xl text-text-primary mb-3">
            Academia <span className="text-primary">SB</span>
          </p>
          <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
            Metodología de visagismo desarrollada por SaezBarber. Formamos
            profesionales con criterio, identidad y estándar propio.
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <p className="text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-3">
            Navegación
          </p>
          <ul className="grid gap-2 text-sm text-text-primary">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/visagistas"
                className="hover:text-primary transition-colors"
              >
                Visagistas
              </Link>
            </li>
            <li>
              <Link
                to="/academia"
                className="hover:text-primary transition-colors"
              >
                Academia
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-3">
            Créditos
          </p>
          <p className="text-sm text-text-secondary">© {year} Academia SB</p>
          <p className="text-sm text-text-secondary mt-1">
            Sitio creado por{' '}
            <span className="text-text-primary">Anthara Sáez</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
