import hero from '../assets/hero.jpg'
import { fmt, money, short, calc } from '../data.js'
import { Foot, SLink, Ic, I, useLenis, useTween } from '../ui.jsx'

export default function Home({ lakh, setLakh }) {
  const c0 = calc(lakh)
  const c = { m: useTween(c0.m), y: useTween(c0.y), sq: useTween(c0.sq) }
  useLenis(null)
  const mv = e => { const r = e.currentTarget; r.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(3)); r.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(3)) }
  return (
    <>
      <section className="hero" onMouseMove={mv}>
        <figure className="hero-img">
          <img src={hero} alt="MIZU by ISTA at dusk: glass office floors with planted terraces facing the lake" />
        </figure>
        <div className="head">
          <p className="eyebrow">INVESTMENT POTENTIAL</p>
          <h1 className="q">Earn from a <span>Prime Location</span></h1>
          <p className="who">Assured rental income from day one, in the heart of Hyderabad’s Financial District — beside Knowledge Capital and facing the lake at Nanakramguda.</p>
        </div>
        <div className="calc" aria-labelledby="calc-title">
          <div className="c1">
            <label id="calc-title" htmlFor="amt">YOUR INVESTMENT</label>
            <div className="amount" aria-live="polite">{money(lakh)}</div>
            <input id="amt" type="range" min="30" max="500" step="5" value={lakh} onChange={e => setLakh(+e.target.value)} style={{ '--p': ((lakh - 30) / 470) * 100 + '%' }} />
            <div className="ticks"><span>₹30 L</span><span>₹5 Cr</span></div>
            <div className="chips" role="group" aria-label="Quick picks">
              {[30, 65, 130, 260].map(v => <button key={v} type="button" className="chip" aria-pressed={v === lakh} onClick={() => setLakh(v)}>{v === 130 ? '₹1.3 Cr' : v === 260 ? '₹2.6 Cr' : '₹' + v + ' L'}</button>)}
            </div>
          </div>
          <div className="c2">
            <div className="rlabel">MONTHLY ASSURED RENT</div>
            <div className="rent">{fmt(c.m)}</div>
            <div className="rsub">from day one</div>
            <div className="facts">
              <div><span className="fi"><Ic d={I.coins} size={22} /></span><strong>{short(c.y)}</strong><small>Annual Income</small></div>
              <div><span className="fi"><Ic d={I.percent} size={22} /></span><strong>6%</strong><small>Assured Yield</small></div>
              <div><span className="fi"><Ic d={I.frame} size={22} /></span><strong>{(lakh === 30 ? '~' : '') + Math.round(c.sq).toLocaleString('en-IN')}</strong><small>Sq.Ft You Own</small></div>
            </div>
          </div>
          <div className="c3">
            <p className="ref">Reference price ₹13,000 per sq.ft. Assured rent ₹65 per sq.ft a month, paid from day one through construction. Excludes GST, registration and other charges.</p>
            <SLink className="cta gold" to="/enquire">Reserve this ticket <Ic d={I.arrow} size={18} /></SLink>
          </div>
        </div>
      </section>
      <Foot dark />
    </>
  )
}
