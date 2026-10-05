import facade from '../assets/facade.jpg'
import p1 from '../assets/p1.jpg'; import p2 from '../assets/p2.jpg'; import p3 from '../assets/p3.jpg'
import { Sheet, Ic, I } from '../ui.jsx'
const p = [['12% a year', 'simple interest on your principal for the time it was held', 'coins', 'peach', p1], ['Less rent paid', 'rent you have already received is adjusted', 'hand', 'sage', p2], ['90 days', 'refund paid within 90 days of cancellation', 'cal', 'blue', p3]]
export default function Protection() {
  return (
    <Sheet img={facade} alt="MIZU by ISTA front elevation concept: timber fins, planted balconies and a green deck">
      <h1 className="hser">If the project is delayed, <span>your money comes back with interest</span></h1>
      <p className="lead">If construction is delayed or work halts, you can cancel your booking.</p>
      <div className="pgrid">
        {p.map(([a, b, ic, col, im]) => (
          <div className="pcard" key={a} style={{ '--pimg': `url(${im})` }}>
            <span className={'ic ' + col}><Ic d={I[ic]} size={26} /></span>
            <strong>{a}</strong><small>{b}</small>
          </div>
        ))}
      </div>
    </Sheet>
  )
}
