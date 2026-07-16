import { ArrowDown, CheckCircle2 } from 'lucide-react'
import LeadForm from '../components/LeadForm'
import Seo from '../components/Seo'
import styles from './Content.module.css'

export default function BecomeDistributor() {
  return <>
    <Seo
      title="Seja um distribuidor"
      description="Apresente sua empresa e região para distribuir os cosméticos profissionais Atual Pet."
      path="/seja-um-distribuidor/"
    />
    <section className={styles.distributorHero}>
      <div className="shell">
        <span className="eyebrow">Parceria comercial</span>
        <h1>Uma marca forte se constrói perto de quem atende o mercado.</h1>
        <p>A Atual Pet é uma marca de cosméticos profissionais para pets e conta com distribuidores parceiros para atender diferentes regiões. Se sua empresa atua no segmento pet, apresente seu perfil à nossa equipe.</p>
        <a href="#formulario">Preencher formulário <ArrowDown size={17} /></a>
      </div>
    </section>
    <main>
      <section className={`${styles.partnerProfile} shell section`}>
        <div>
          <span className="eyebrow">Perfil da parceria</span>
          <h2>Proximidade, presença e conhecimento do mercado.</h2>
        </div>
        <ul>
          <li><CheckCircle2 />Atuação comercial no segmento pet ou áreas relacionadas</li>
          <li><CheckCircle2 />Capacidade de atender a região informada</li>
          <li><CheckCircle2 />Relacionamento com pet shops, groomers e lojistas</li>
          <li><CheckCircle2 />Interesse em desenvolver a marca localmente</li>
        </ul>
      </section>
      <section id="formulario" className={`${styles.formSection} section`}>
        <div className="shell">
          <header>
            <span className="eyebrow">Inicie a conversa</span>
            <h2>Conte sobre sua empresa.</h2>
            <p>O preenchimento não garante aprovação, exclusividade ou condições comerciais. A equipe analisará o perfil após o recebimento.</p>
          </header>
          <LeadForm type="distributor" />
        </div>
      </section>
    </main>
  </>
}
