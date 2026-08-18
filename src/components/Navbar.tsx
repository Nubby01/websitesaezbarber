import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { scrollLenisToTop } from '../hooks/useLenis'
import { brand, mainNavLinks } from '../data/siteContact'

function navIsActive(to: string, pathname: string, hash: string) {
  if (to === '/') {
    return pathname === '/'
  }
  if (to === '/#ejes') {
    return pathname === '/' && hash === '#ejes'
  }
  if (to.startsWith('/visagistas')) {
    return pathname === '/visagistas'
  }
  if (to.startsWith('/academia')) {
    return pathname === '/academia'
  }
  return false
}

export function Navbar() {
  const [navState, setNavState] = useState<'top' | 'blur' | 'solid'>('top')
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 12) setNavState('top')
      else if (y < 72) setNavState('blur')
      else setNavState('solid')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Si el destino es la ruta actual, React Router no navega y el scroll queda intacto
  const handleNavClick = (to: string) => {
    setOpen(false)
    const [path, hash] = to.split('#')
    const target = path || '/'
    if (!hash && target === location.pathname && !location.hash) {
      scrollLenisToTop()
    }
  }

  const headerClass =
    navState === 'top'
      ? 'bg-transparent border-b border-transparent py-5'
      : navState === 'blur'
        ? 'bg-surface/40 backdrop-blur-md border-b border-border/60 py-4'
        : 'bg-surface/95 backdrop-blur-xl border-b border-border py-3 shadow-soft'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${headerClass}`}
    >
      <nav
        className="container-grid flex items-center justify-between gap-4"
        aria-label="Navegación principal"
      >
        <Link
          to="/"
          onClick={() => handleNavClick('/')}
          className={`text-display text-text-primary transition-all duration-500 shrink-0 ${
            navState === 'solid' ? 'text-2xl' : 'text-3xl md:text-[2rem]'
          }`}
          aria-label={`${brand.name} — inicio`}
        >
          Visagismo <span className="text-primary">SB</span>
        </Link>

        <ul className="hidden md:flex items-center gap-5 lg:gap-7">
          {mainNavLinks.map((link) => {
            const active = navIsActive(
              link.to,
              location.pathname,
              location.hash,
            )
            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`text-sm tracking-wide transition-colors duration-300 whitespace-nowrap ${
                    active
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </NavLink>
              </li>
            )
          })}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="p-2 text-text-primary"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute inset-x-0 top-full bg-surface/95 backdrop-blur-xl border-b border-border max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <ul className="container-grid flex flex-col gap-5 py-8">
              {mainNavLinks.map((link) => {
                const active = navIsActive(
                  link.to,
                  location.pathname,
                  location.hash,
                )
                return (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={() => handleNavClick(link.to)}
                      className={`text-display text-2xl sm:text-3xl leading-tight ${
                        active ? 'text-primary' : 'text-text-primary'
                      }`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
