import { Link } from 'react-router-dom'
import {
  activeSocialLinks,
  applicationFormPath,
  brand,
  footerNavLinks,
  siteContact,
  tallyFormUrl,
} from '../data/siteContact'

export function Footer() {
  const year = new Date().getFullYear()
  const { whatsapp, email } = siteContact
  const social = activeSocialLinks()

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-grid py-14 md:py-16">
        <div className="grid gap-12 md:gap-10 md:grid-cols-3">
          <div>
            <Link
              to="/"
              className="inline-block text-display text-3xl text-text-primary mb-4 hover:text-primary transition-colors"
            >
              Visagismo <span className="text-primary">SB</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              {brand.tagline}
            </p>
            <p className="mt-6 text-xs text-text-secondary tracking-wide">
              © {year} {brand.name}
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-4">
              Navegación
            </p>
            <ul className="grid gap-2.5 text-sm text-text-primary">
              {footerNavLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-4">
              Contacto
            </p>
            <ul className="grid gap-2.5 text-sm text-text-primary">
              {whatsapp ? (
                <li>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp de Atención
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-primary transition-colors"
                  >
                    Email de Soporte
                  </a>
                </li>
              ) : null}
              {!whatsapp && !email ? (
                <li className="text-text-secondary text-sm leading-relaxed">
                  WhatsApp de Atención y Email de Soporte — próximamente.
                </li>
              ) : null}
            </ul>

            {(social.length > 0 || siteContact.social.length > 0) && (
              <div className="mt-6">
                <p className="text-[10px] tracking-[0.25em] uppercase text-text-secondary mb-3">
                  Redes
                </p>
                {social.length > 0 ? (
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {social.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-primary hover:text-primary transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-text-secondary">
                    Instagram · YouTube · TikTok · Podcast — próximamente.
                  </p>
                )}
              </div>
            )}

            <p className="mt-6">
              <a
                href={tallyFormUrl}
                className="text-sm text-primary hover:text-primary-light transition-colors"
              >
                Postular a la Academia SB
              </a>
              <span className="text-text-secondary mx-2" aria-hidden>
                ·
              </span>
              <Link
                to={applicationFormPath}
                className="text-sm text-text-primary hover:text-primary transition-colors"
              >
                Ver formulario
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-grid py-4">
          <p className="text-xs text-text-secondary text-center md:text-left">
            Sitio creado por{' '}
            <span className="text-text-primary">Anthara Sáez</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
