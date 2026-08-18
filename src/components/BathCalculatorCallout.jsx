import { ArrowRight, Calculator, Droplets, Gauge } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import styles from './BathCalculatorCallout.module.css'

const calculatorSteps = [
  ['01', 'Linha e produto'],
  ['02', 'Volume e valor'],
  ['03', 'Porte do animal'],
]

export default function BathCalculatorCallout({ compact = false, lineName = '' }) {
  const titleId = compact ? 'line-bath-calculator-title' : 'home-bath-calculator-title'

  if (compact) {
    return <Reveal as="aside" className={styles.compact} aria-labelledby={titleId}>
      <div className={styles.compactIcon} aria-hidden="true"><Droplets size={23} strokeWidth={1.5}/></div>
      <div className={styles.compactCopy}>
        <span>Estimativa profissional</span>
        <h3 id={titleId}>Quer estimar o custo por banho?</h3>
        <p>Use a apresentação e a diluição dos produtos {lineName} para simular o custo de cada atendimento.</p>
      </div>
      <Link className="text-link" to="/calculadora-do-banho">Calcular agora <ArrowRight size={16} aria-hidden="true"/></Link>
    </Reveal>
  }

  return <section className={styles.section} aria-labelledby={titleId}>
    <Reveal className={`${styles.feature} shell`}>
      <div className={styles.copy}>
        <span className="eyebrow">Ferramenta profissional</span>
        <h2 id={titleId}>Quanto custa cada banho?</h2>
        <p>Estime o custo dos produtos concentrados utilizados em cada atendimento a partir da apresentação, diluição e rotina de uso.</p>
        <Link className="button" to="/calculadora-do-banho">Calcular custo por banho <ArrowRight size={17} aria-hidden="true"/></Link>
      </div>

      <div className={styles.preview} aria-hidden="true">
        <div className={styles.previewHeading}>
          <Calculator size={25} strokeWidth={1.45}/>
          <div><span>Calculadora do Banho</span><strong>Uma estimativa guiada</strong></div>
        </div>
        <ol>{calculatorSteps.map(([number, label]) => <li key={number}><span>{number}</span><strong>{label}</strong></li>)}</ol>
        <div className={styles.previewResult}><Gauge size={19} strokeWidth={1.5}/><span>Custo estimado por banho</span></div>
      </div>
    </Reveal>
  </section>
}
