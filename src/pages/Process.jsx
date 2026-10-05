import lobby from '../assets/lobby.jpg'
import s1 from '../assets/s1.jpg'; import s2 from '../assets/s2.jpg'; import s3 from '../assets/s3.jpg'; import s4 from '../assets/s4.jpg'
import { Sheet, SLink, Ic, I } from '../ui.jsx'
const s = [['01', 'Visit the site', 'Walk the location and see the plans.', 'site', s1, '/location'], ['02', 'Choose your ticket', 'From ₹30 lakh, up to a full floor.', 'ticket', s2, '/returns'], ['03', 'Book', 'Pay the booking amount to hold your share.', 'doc', s3, '/enquire'], ['04', 'Sign and earn', 'Agreement signed, rent begins.', 'chart', s4, '/protection']]
export default function Process() {
  return (
    <Sheet tone="wine" rimg={lobby} rail={<><h1>From first visit <span>to first rent</span></h1><i className="rule" /><p className="lead">A simple, transparent process to help you own an income generating asset at MIZU.</p></>}>
      <ol className="steps">
        {s.map(([n, a, b, ic, im, to]) => (
          <li className="step" key={n}>
            <span className="num" aria-hidden="true">{n}</span>
            <div className="scard" style={{ '--simg': `url(${im})` }}>
              <span className="ic peach"><Ic d={I[ic]} size={26} /></span>
              <div className="st"><b>{a}</b><span>{b}</span></div>
              <SLink className="go" to={to} aria-label={a}><Ic d={I.arrow} size={20} /></SLink>
            </div>
          </li>
        ))}
      </ol>
    </Sheet>
  )
}
