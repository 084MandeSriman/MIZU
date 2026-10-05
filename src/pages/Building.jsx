import retail from '../assets/retail.jpg'
import b1 from '../assets/b1.jpg'; import b2 from '../assets/b2.jpg'; import b3 from '../assets/b3.jpg'; import b4 from '../assets/b4.jpg'
import b5 from '../assets/b5.jpg'; import b6 from '../assets/b6.jpg'; import b7 from '../assets/b7.jpg'; import b8 from '../assets/b8.jpg'
import { Sheet, Ic, I } from '../ui.jsx'
const specs = [['G + 11', 'with 4 basement levels', 'layers', 'peach', b1], ['~2.98 lakh', 'sq.ft built-up', 'expand', 'sage', b2], ['24,634', 'sq.ft typical office floor', 'chair', 'tan', b3], ['80 ft', 'road frontage', 'road', 'blue', b4], ['Ground & 1st', 'retail', 'bag', 'peach', b5], ['2nd to 11th', 'offices', 'tower', 'sage', b6], ['6th floor', 'green deck', 'leaf', 'sage', b7], ['6 + 2', 'passenger and goods lifts', 'lift', 'tan', b8]]
export default function Building() {
  return (
    <Sheet tone="brown" rimg={retail} rail={<><h1 className="w">Retail at street level, <span>offices above</span></h1><i className="rule" /><p className="lead">A well-planned mixed-use building with retail on the ground and first floor, and modern offices above.</p></>}>
      <div className="grid2">
        {specs.map(([a, b, ic, col, im]) => (
          <div className="fcard" key={a} style={{ '--bimg': `url(${im})` }}>
            <span className={'ic ' + col}><Ic d={I[ic]} size={26} /></span>
            <div><strong>{a}</strong><small>{b}</small></div>
          </div>
        ))}
      </div>
    </Sheet>
  )
}
