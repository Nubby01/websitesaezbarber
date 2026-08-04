import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { VisagistasPage } from './pages/VisagistasPage'
import { AcademiaPage } from './pages/AcademiaPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="visagistas" element={<VisagistasPage />} />
          <Route path="academia" element={<AcademiaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
