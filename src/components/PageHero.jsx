export default function PageHero({ eyebrow, title, text, variant = '' }) {
  return <section className={`page-hero ${variant ? `page-hero--${variant}` : ''}`}><div className="shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</div></section>
}
