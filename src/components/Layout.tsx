import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useLenis } from '../hooks/useLenis'
import { useTheme } from '../hooks/useTheme'

export function Layout() {
  useLenis()
  const location = useLocation()
  const { theme } = useTheme()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <>
      <Helmet>
        <meta
          name="theme-color"
          content={theme === 'dark' ? '#090909' : '#F8F8F5'}
        />
      </Helmet>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
