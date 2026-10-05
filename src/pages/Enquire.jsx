import { useState } from 'react'
import { ticketFor } from '../data.js'
import enq from '../assets/enq.jpg'
import { Sheet, Ic, I } from '../ui.jsx'
const OPTS = ['₹30 L', '₹65 L', '₹1.3 Cr', '₹2.6 Cr', 'Above ₹2.6 Cr', 'Full floor']
export default function Enquire({ lakh, ticket }) {
  const [tk, setTk] = useState(ticket || ticketFor(lakh))
  const [err, setErr] = useState('')
  const [ok, setOk] = useState(false)
  const submit = e => {
    e.preventDefault()
    const f = new FormData(e.target), n = (f.get('name') || '').trim(), p = (f.get('phone') || '').trim()
    if (!n) return setErr('Enter your name.')
    if (p.replace(/\D/g, '').length < 10) return setErr('Enter a 10-digit mobile number.')
    setErr('')
    const body = 'Name: ' + n + '\nMobile: ' + p + '\nTicket size: ' + tk + '\n\nPlease call me back about the MIZU pre-launch.'
    window.location.href = 'mailto:info@cityhub.com?subject=' + encodeURIComponent('MIZU pre-launch enquiry — ' + tk) + '&body=' + encodeURIComponent(body)
    setOk(true)
  }
  return (
    <Sheet tone="wine" narrow side={enq} sidealt="MIZU by ISTA entrance with timber fins, planting and a reflecting pool at dusk"
      rail={<><h1>Hold your share <em>before</em> <span>launch</span></h1><i className="rule" /><p className="lead">Tell us your ticket size. CITYHUB Properties will call you back with the floor plan, the agreement terms and a site visit slot.</p>
        <p className="note"><span className="mc"><Ic d={I.mail} size={20} /></span><span>Or write to<br /><a href="mailto:info@cityhub.com">info@cityhub.com</a></span></p></>}>
      <form className="card enq" onSubmit={submit} noValidate>
        <div className="field"><label htmlFor="nm">Name</label><div className="inp"><Ic d={I.user} size={22} /><input id="nm" name="name" autoComplete="name" placeholder="Enter your full name" required /></div></div>
        <div className="field"><label htmlFor="ph">Mobile number</label><div className="inp"><Ic d={I.phone} size={22} /><input id="ph" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter your mobile number" required /></div></div>
        <div className="field"><label htmlFor="tk">Ticket size</label>
          <div className="inp sel"><span className="rc">₹</span>
            <select id="tk" value={tk} onChange={e => setTk(e.target.value)}>{OPTS.map(o => <option key={o}>{o}</option>)}</select>
            <Ic d={I.down} size={20} /></div></div>
        <p className="err" role="alert">{err}</p>
        <button className="cta dark wide" type="submit">Request a call back <Ic d={I.arrow} size={20} /></button>
        <p className="note lk"><Ic d={I.lock} size={18} />Opens your email app with your details filled in, addressed to CITYHUB Properties.</p>
      </form>
      {ok && <div className="ok" role="status">Your email is ready to send. If it didn't open, write to <a href="mailto:info@cityhub.com">info@cityhub.com</a> with your name, number and ticket size.</div>}
    </Sheet>
  )
}
