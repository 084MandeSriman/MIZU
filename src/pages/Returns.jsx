import office from '../assets/office.jpg'
import { Sheet, SLink, Ic, I } from '../ui.jsx'
const rows = [[30, '₹30 L', '~231 sq.ft', '₹15,000', '₹1.8 L'], [65, '₹65 L', '500 sq.ft', '₹32,500', '₹3.9 L'], [130, '₹1.3 Cr', '1,000 sq.ft', '₹65,000', '₹7.8 L'], [260, '₹2.6 Cr', '2,000 sq.ft', '₹1.3 L', '₹15.6 L'], [0, '₹32.02 Cr', 'Full floor', '₹16 L', '₹1.92 Cr']]
const heads = [['Investment', 'coins'], ['Share', 'expand'], ['Rent a month', 'cal'], ['Rent a year', 'chart']]
export default function Returns({ lakh, setLakh, ticket, setTicket }) {
  const sel = ticket === 'Full floor' ? 0 : lakh
  const pick = v => v === 0 ? setTicket('Full floor') : setLakh(v)
  return (
    <Sheet tone="brown" rimg={office} rail={<><h1>What each <span>ticket earns</span></h1><i className="rule" /><p className="lead">Only one floor, about 25,000 sq.ft, is offered at the pre-launch price.</p></>}>
      <div className="tbl" role="table" aria-label="What each ticket earns">
        <div className="trow thead" role="row">{heads.map(([l, ic], i) => <div className="th" role="columnheader" key={l}><span className={'ic c' + i}><Ic d={I[ic]} size={22} /></span>{l}</div>)}</div>
        {rows.map(([v, ...r]) => (
          <div key={v} role="row" tabIndex={0} aria-selected={v === sel} className={'trow rrow' + (v === sel ? ' pick' : '')} onClick={() => pick(v)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(v) } }}>
            {r.map((x, i) => <div role="cell" key={i}>{x}</div>)}
          </div>
        ))}
      </div>
      <SLink className="cta dark wide" to="/enquire">Reserve this ticket <Ic d={I.arrow} size={20} /></SLink>
    </Sheet>
  )
}
