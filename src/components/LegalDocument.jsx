import { Link } from 'react-router-dom'
import { legal } from '../data/legal'
import PageHero from './PageHero'
import Seo from './Seo'
import styles from './LegalDocument.module.css'

export default function LegalDocument({ document, path }) {
  return <>
    <Seo title={document.title} description={document.description} path={path} />
    <PageHero eyebrow={document.eyebrow} title={document.headline} text={document.intro} />
    <main className={`${styles.document} shell section`}>
      <p className={styles.updated}>Última atualização: <time dateTime="2026-07-16">{legal.lastUpdated}</time></p>
      {document.sections.map((section) => <section key={section.title}>
        <h2>{section.title}</h2>
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.lists && <ul>{section.lists.map((item) => <li key={item}>{item}</li>)}</ul>}
        {section.table && <div className={styles.tableWrap}>
          <table>
            <caption>Tecnologias de armazenamento identificadas no projeto</caption>
            <thead><tr><th>Nome ou chave</th><th>Provedor e tipo</th><th>Categoria e finalidade</th><th>Duração</th></tr></thead>
            <tbody>{legal.storageTechnologies.map((item) => <tr key={item.key}><td><code>{item.key}</code></td><td>{item.provider}<small>{item.type}</small></td><td><strong>{item.category}</strong>{item.purpose}</td><td>{item.duration}</td></tr>)}</tbody>
          </table>
        </div>}
      </section>)}
      <aside className={styles.contact} aria-labelledby="legal-contact-title">
        <span className="eyebrow">Canal de contato</span>
        <h2 id="legal-contact-title">Fale com a Atual Pet.</h2>
        <p>Até a confirmação de um canal específico de privacidade, utilize o e-mail geral <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a>. Para assuntos comerciais, você também pode usar a <Link to="/contato">página de contato</Link>.</p>
      </aside>
    </main>
  </>
}
