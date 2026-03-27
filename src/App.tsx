import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Tjenester from './pages/Tjenester'
import TjenestePage from './pages/TjenestePage'
import HvemViEr from './pages/HvemViEr'
import Kontakt from './pages/Kontakt'
import Prosjekter from './pages/Prosjekter'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tjenester" element={<Tjenester />} />
        <Route path="/tjenester/:slug" element={<TjenestePage />} />
        <Route path="/hvem-vi-er" element={<HvemViEr />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/prosjekter" element={<Prosjekter />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
