import { useState, useEffect, useRef, useContext } from 'react'
import plan from '../assets/siteplan.jpg'
import lake from '../assets/s1.jpg'
import { Foot, BookCtx, Ic, I } from '../ui.jsx'

const cells = ['Amazon', 'WaveRock SEZ', 'My Home RMZ', 'Google', 'MIZU', 'Jayabheri', 'NVIDIA', 'Knowledge Capital', 'Nehru ORR']
const dist = [['Knowledge Capital', 'Next door'], ['Sohini Tech Park', '0.7 km'], ['Continental Hospitals', '0.75 km'], ['Apollo Hospitals', '0.9 km'], ['ORR Exit 19, Nanakramguda', '1.3 km']]
const campus = 'MIZU sits on Narsingi–Nanakramguda Road, with Google, Amazon and NVIDIA campuses as neighbours and the Outer Ring Road minutes away.'
const MAPS = 'https://maps.google.com/?q=17.4166044,78.3464452'
const info = {
  Amazon: { t: campus }, Google: { t: campus }, NVIDIA: { t: campus }, 'Nehru ORR': { t: campus, stat: '1.3 km', row: 'ORR Exit 19, Nanakramguda' },
  'Knowledge Capital': { t: 'Beside Knowledge Capital, facing the lake', stat: 'Next door', row: 'Knowledge Capital' },
  MIZU: { t: 'To the east, a landscaped buffer opens onto the water.', link: true },
}
const SCHEMA = 'Neighbourhood schematic, not to scale'
const Note = () => <p className="note">Straight-line distances, approximate. <a href={MAPS} target="_blank" rel="noopener noreferrer">Open the site on Google Maps</a></p>
const Mark = ({ n }) => {
  if (n === 'Amazon') return <span className="bm amz" aria-hidden="true">a</span>
  if (n === 'Google') return <span className="bm ggl" aria-hidden="true">G</span>
  if (n === 'NVIDIA') return <span className="bm" style={{ color: '#76B900' }}><Ic d={I.eye} size={30} sw={2} /></span>
  const d = { 'WaveRock SEZ': I.waves, 'My Home RMZ': I.house, MIZU: I.site, Jayabheri: I.tower, 'Knowledge Capital': I.cap, 'Nehru ORR': I.road }[n]
  return <span className="bm"><Ic d={d} size={28} sw={n === 'Nehru ORR' ? 2.4 : 1.8} /></span>
}

export default function Location() {
  const [p, setP] = useState(0)
  const pr = useRef(0)
  const book = useContext(BookCtx)
  const to = n => { pr.current = n; setP(n) }
  useEffect(() => {
    book.current = d => { const n = pr.current + d; if (n < 0 || n > cells.length) return false; to(n); return true }
    const k = e => { if (e.key === 'ArrowRight') book.current(1); if (e.key === 'ArrowLeft') book.current(-1) }
    window.addEventListener('keydown', k)
    return () => { book.current = null; window.removeEventListener('keydown', k) }
  }, [])
  const tx = useRef(0)
  const leaf = (i, label, node) => (
    <section key={i} className={'leaf' + (p > i ? ' gone' : '') + (p === i ? ' cur' : '')} style={{ zIndex: 100 - i }} aria-label={label} aria-hidden={p !== i} ref={el => { if (el) el.inert = p !== i }}>{node}</section>
  )
  return (
    <main className="sheet book" onTouchStart={e => { tx.current = e.touches[0].clientX }} onTouchEnd={e => { const d = e.changedTouches[0].clientX - tx.current; if (Math.abs(d) > 60) book.current && book.current(d < 0 ? 1 : -1) }}>
      {leaf(0, 'Location',
        <div className="pg locpg">
          <figure className="fig plan"><img src={plan} alt="Indicative site plan: 80 ft road to the north with entry and exit gates, 23 ft driveways all round, buffer area and water body to the east" /></figure>
          <div className="body lbody">
            <img className="lakebg" src={lake} alt="" aria-hidden="true" />
            <span className="pill tr">MIZU by ISTA HOMES</span>
            <div className="bk">
              <h1 className="hsans">Beside Knowledge Capital, <span>facing the lake</span></h1>
              <p className="lead">MIZU sits on Narsingi–Nanakramguda Road, with Google, Amazon and NVIDIA campuses as neighbours and the Outer Ring Road minutes away. To the east, a landscaped buffer opens onto the water.</p>
              <div className="neigh" aria-label={SCHEMA}>
                {cells.map((c, i) => <button type="button" key={c} className={c === 'MIZU' ? 'me' : ''} onClick={() => to(i + 1)}><Mark n={c} /><span>{c === 'MIZU' ? 'M I Z U' : c}</span></button>)}
              </div>
              <p className="note pinned"><Ic d={I.site} size={18} /><span>Straight-line distances, approximate. <a href={MAPS} target="_blank" rel="noopener noreferrer">Open the site on Google Maps</a></span></p>
              <Foot />
            </div>
          </div>
        </div>)}
      {cells.map((name, i) => {
        const d = info[name] || {}
        return leaf(i + 1, name,
          <div className="pg tri">
            <aside className="rail brown"><span className="pill">MIZU by ISTA HOMES</span>
              <h1>{name}</h1>
              {d.stat && <div className="stat">{d.stat}</div>}
              {d.t && <p className="lead">{d.t}</p>}
              {d.link && <a className="rl" href={MAPS} target="_blank" rel="noopener noreferrer">Open the site on Google Maps</a>}
            </aside>
            <div className="mid">
              <div className="mapx" aria-label={SCHEMA}>
                {cells.map((c, j) => <button type="button" key={c} className={(c === 'MIZU' ? 'me ' : '') + (j === i ? 'sel' : '')} onClick={() => to(j + 1)}>{c}</button>)}
              </div>
              <small>{SCHEMA}</small>
            </div>
            <div className="body">
              <div className="bk">
                <Note />
                <ul className="dist" aria-label="Approximate straight-line distances from the site">
                  {dist.map(([a, b]) => <li key={a} className={a === d.row ? 'hl' : ''}><span>{a}</span><span>{b}</span></li>)}
                </ul>
                <Foot />
              </div>
            </div>
          </div>)
      })}
      <div className="dots" role="group" aria-label="Pages">
        {[0, ...cells.map((_, i) => i + 1)].map(i => <button key={i} type="button" className={p === i ? 'on' : ''} aria-label={i ? cells[i - 1] : 'Location'} aria-current={p === i} title={i ? cells[i - 1] : 'Location'} onClick={() => to(i)} />)}
      </div>
    </main>
  )
}
