import { ArrowRight, FlaskConical, HeartHandshake, Layers3, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import dogSalon from '../assets/editorial/dog-salon.jpg'
import groomerBath from '../assets/editorial/groomer-bath.jpg'
import groomerFur from '../assets/editorial/groomer-fur.jpg'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { company } from '../data/company'
import styles from './Content.module.css'

export default function About() {
  return <>
    <Seo title="A Atual Pet" description="Conheça a fabricante brasileira de cosméticos profissionais para pets." path="/sobre"/>
    <main>
      <section className={styles.aboutHero}>
        <div className={`${styles.aboutHeroInner} shell`}>
          <div className={styles.aboutHeroCopy}>
            <span className="eyebrow">A Atual Pet</span>
            <h1>Cosméticos profissionais feitos para quem cuida.</h1>
            <p>{company.legalPositioning}.</p>
          </div>
          <figure className={styles.aboutHeroMedia}>
            <img src={groomerBath} width="1600" height="1067" alt="Profissional realizando o banho cuidadoso de um cão"/>
          </figure>
        </div>
      </section>

      <Reveal as="section" className={`${styles.editorial} shell section`}>
        <div><span className="eyebrow">Quem somos</span><h2>Uma fabricante dedicada ao cuidado estético animal.</h2></div>
        <div><p>{company.about}</p><p>{company.distributionModel}</p></div>
      </Reveal>

      <section className={`${styles.aboutStory} shell`}>
        <Reveal as="figure" data-reveal="image">
          <img src={dogSalon} width="1600" height="1067" loading="lazy" alt="Cão aguardando o cuidado em um ambiente profissional de banho e tosa"/>
        </Reveal>
        <Reveal className={styles.aboutStoryCopy} delay={100}>
          <span className="eyebrow">Antes do banho</span>
          <h2>Cada cuidado começa entendendo o que a rotina pede.</h2>
          <p>Pelagem, etapa do serviço e intenção de acabamento orientam a escolha entre diferentes linhas e apresentações.</p>
        </Reveal>
      </section>

      <section className={`${styles.aboutStory} ${styles.aboutStoryReverse} shell section`}>
        <Reveal as="figure" data-reveal="image">
          <img src={groomerFur} width="1600" height="1067" loading="lazy" alt="Groomer trabalhando cuidadosamente a pelagem de um cão"/>
        </Reveal>
        <Reveal className={styles.aboutStoryCopy} delay={100}>
          <span className="eyebrow">Durante e depois</span>
          <h2>Técnica, cosmético e atenção formam a experiência.</h2>
          <p>Da higiene à finalização, a Atual Pet desenvolve um portfólio que acompanha o trabalho profissional e valoriza o resultado percebido nos detalhes.</p>
          <Link className="text-link" to="/produtos">Conheça o portfólio <ArrowRight size={16}/></Link>
        </Reveal>
      </section>

      <section className={`${styles.dark} section`}><div className="shell">
        <Reveal>
          <span className="eyebrow">Nosso compromisso</span><h2>Qualidade percebida em todas as etapas.</h2>
        </Reveal>
        <div className={styles.iconGrid}>
          <Reveal delay={0}><FlaskConical/><h3>Portfólio profissional</h3><p>Soluções organizadas para limpeza, tratamento, perfumaria e acabamento.</p></Reveal>
          <Reveal delay={80}><ShieldCheck/><h3>Clareza e segurança</h3><p>Informações de uso devem seguir os rótulos e materiais técnicos oficiais.</p></Reveal>
          <Reveal delay={160}><HeartHandshake/><h3>Rede parceira</h3><p>Produtos comercializados por distribuidores parceiros em diferentes regiões.</p></Reveal>
          <Reveal delay={240}><Layers3/><h3>Linhas complementares</h3><p>Quatro identidades para diferentes rotinas, públicos e propostas.</p></Reveal>
        </div>
      </div></section>

      <Reveal as="section" className={`${styles.pillars} shell section`}>
        <article><span>Missão</span><h2>{company.mission}</h2></article>
        <article><span>Visão</span><h2>{company.vision}</h2></article>
        <article><span>Valores</span><ul>{company.values.map(value=><li key={value}>{value}</li>)}</ul></article>
      </Reveal>

      <Reveal as="section" className={`${styles.dualCta} shell section`}>
        <div><h2>Conheça as linhas</h2><p>Explore produtos para diferentes momentos do cuidado.</p><Link className="text-link" to="/produtos">Ver produtos <ArrowRight size={16}/></Link></div>
        <div><h2>Fale com a equipe</h2><p>Envie dúvidas comerciais ou de produto.</p><Link className="text-link" to="/contato">Entrar em contato <ArrowRight size={16}/></Link></div>
      </Reveal>
    </main>
  </>
}
