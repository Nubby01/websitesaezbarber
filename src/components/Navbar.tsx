import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/visagistas', label: 'Visagistas' },
  { to: '/academia', label: 'Academia' },
]

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
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

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
          className={`text-display text-text-primary transition-all duration-500 ${
            navState === 'solid' ? 'text-2xl' : 'text-3xl md:text-[2rem]'
          }`}
          aria-label="Academia SB — inicio"
        >
          Academia <span className="text-primary">SB</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Link
              to="/academia#inscripcion"
              className="text-sm tracking-wide px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-light transition-colors duration-300"
            >
              Postular
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2 lg:hidden">
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
            className="lg:hidden absolute inset-x-0 top-full bg-surface/95 backdrop-blur-xl border-b border-border"
          >
            <ul className="container-grid flex flex-col gap-6 py-8">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `text-display text-3xl ${
                        isActive ? 'text-primary' : 'text-text-primary'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link
                  to="/academia#inscripcion"
                  className="inline-flex text-sm tracking-wide px-5 py-2.5 bg-primary text-on-primary"
                >
                  Postular
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
