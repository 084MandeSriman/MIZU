import { useState, useEffect, useRef } from 'react'
import { Routes, Route, NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { NAV } from './data.js'
import { I, Ic, NavCtx, BookCtx, SLink } from './ui.jsx'
import Home from './pages/Home.jsx'
import Location from './pages/Location.jsx'
import Building from './pages/Building.jsx'
import Returns from './pages/Returns.jsx'
import Protection from './pages/Protection.jsx'
import Process from './pages/Process.jsx'
import Enquire from './pages/Enquire.jsx'

export default function App() {
  const [lakh, setLakh] = useState(130)
  const [ticket, setTicket] = useState(null)
  const [leaving, setLeaving] = useState(false)
  const { pathname } = useLocation()
  const go = useNavigate()
  const book = useRef(null)
  const idx = Math.max(0, NAV.findIndex(n => n[0] === pathname))
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  const nav = to => {
    if (to === pathname || leaving) return
    setLeaving(true)
    setTimeout(() => { go(to); setLeaving(false) }, 380)
  }
  const step = d => { if (book.current && book.current(d)) return; nav(NAV[(idx + d + NAV.length) % NAV.length][0]) }
  const s = { lakh, setLakh: v => { setTicket(null); setLakh(v) }, ticket, setTicket }
  return (
    <NavCtx.Provider value={nav}><BookCtx.Provider value={book}>
      <div className="bg" aria-hidden="true"><i /><i /><i /></div>
      {pathname === '/' && <nav className="pillbar" aria-label="Quick links">
        <SLink to="/enquire" title="Enquire" aria-label="Enquire"><Ic d={I.mail} /></SLink>
        <a href="https://maps.google.com/?q=17.4166044,78.3464452" target="_blank" rel="noopener noreferrer" title="Open the site on Google Maps" aria-label="Open the site on Google Maps"><Ic d={I.site} /></a>
        <SLink to="/returns" title="Returns" aria-label="Returns"><Ic d={I.rupee} /></SLink>
      </nav>}
      <nav className="dock" aria-label="Main">
        {NAV.map(([to, label, ic]) => <NavLink key={to} to={to} end data-l={label} aria-label={label} onClick={e => { e.preventDefault(); nav(to) }}><Ic d={I[ic]} /></NavLink>)}
      </nav>
      {pathname === '/' && <Link className="logo" to="/" aria-label="MIZU by ISTA, home"><span>水</span><b>MIZU<small>by ISTA HOMES</small></b></Link>}
      {pathname === '/' && <SLink className="topr" to="/enquire">ENQUIRE</SLink>}
      <div key={pathname} className={leaving ? 'leaving' : ''}>
        <Routes>
          <Route path="/" element={<Home {...s} />} />
          <Route path="/location" element={<Location />} />
          <Route path="/building" element={<Building />} />
          <Route path="/returns" element={<Returns {...s} />} />
          <Route path="/protection" element={<Protection />} />
          <Route path="/process" element={<Process />} />
          <Route path="/enquire" element={<Enquire lakh={lakh} ticket={ticket} />} />
          <Route path="*" element={<Home {...s} />} />
        </Routes>
      </div>
      <button className="arrow prev" aria-label="Previous page" onClick={() => step(-1)}><Ic d={I.l} /></button>
      <button className="arrow next" aria-label="Next page" onClick={() => step(1)}><Ic d={I.r} /></button>
    </BookCtx.Provider></NavCtx.Provider>
  )
}
