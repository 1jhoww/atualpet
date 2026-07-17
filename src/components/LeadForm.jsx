import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { company } from '../data/company'

const valueOrFallback = (value) => value.trim() || 'Não informado'

const buildWhatsappMessage = (data, distributor) => {
  const lines = distributor
    ? [
        'Solicitação de Distribuidor',
        '',
        `Nome: ${valueOrFallback(data.name)}`,
        `Empresa: ${valueOrFallback(data.company)}`,
        `CNPJ: ${valueOrFallback(data.cnpj)}`,
        `Telefone: ${valueOrFallback(data.phone)}`,
        `Email: ${valueOrFallback(data.email)}`,
        `Cidade: ${valueOrFallback(data.city)}`,
        `Estado: ${valueOrFallback(data.state)}`,
        `Regiões atendidas: ${valueOrFallback(data.regions)}`,
        `Experiência: ${valueOrFallback(data.experience)}`,
        'Mensagem:',
        valueOrFallback(data.message),
      ]
    : [
        'Contato pelo site Atual Pet',
        '',
        `Nome: ${valueOrFallback(data.name)}`,
        `Empresa: ${valueOrFallback(data.company)}`,
        `Email: ${valueOrFallback(data.email)}`,
        `Telefone: ${valueOrFallback(data.phone)}`,
        `Assunto: ${valueOrFallback(data.subject)}`,
        'Mensagem:',
        valueOrFallback(data.message),
      ]

  return lines.join('\n')
}

export default function LeadForm({ type = 'contact' }) {
  const distributor = type === 'distributor'
  const [status, setStatus] = useState('idle')
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({ name: '', company: '', cnpj: '', email: '', phone: '', city: '', state: '', regions: '', experience: '', subject: '', message: '', privacy: false })
  const update = (event) => setData({ ...data, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value })
  const validate = () => {
    const next = {}
    if (data.name.trim().length < 3) next.name = 'Informe seu nome completo.'
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = 'Informe um e-mail válido.'
    if (data.phone.replace(/\D/g, '').length < 10) next.phone = 'Informe telefone com DDD.'
    if (!data.message.trim()) next.message = 'Escreva uma mensagem.'
    if (!data.privacy) next.privacy = 'É necessário aceitar a Política de Privacidade.'
    if (distributor && !data.city.trim()) next.city = 'Informe sua cidade.'
    if (distributor && !data.state) next.state = 'Selecione o estado.'
    setErrors(next); return Object.keys(next).length === 0
  }
  const submit = (event) => {
    event.preventDefault(); if (!validate()) return
    const message = buildWhatsappMessage(data, distributor)
    const nextWhatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`
    setWhatsappUrl(nextWhatsappUrl)
    try {
      window.open(nextWhatsappUrl, '_blank', 'noopener,noreferrer')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }
  const field = (name, label, required = false, typeInput = 'text') => <label>{label}{required && ' *'}<input name={name} type={typeInput} value={data[name]} onChange={update} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined}/>{errors[name] && <small id={`${name}-error`} className="field-error">{errors[name]}</small>}</label>
  return <form className="lead-form" onSubmit={submit} noValidate>
    <div className="form-grid">{field('name', 'Nome', true)}{field('company', 'Empresa')}{distributor && field('cnpj', 'CNPJ')}{field('email', 'E-mail', true, 'email')}{field('phone', 'Telefone / WhatsApp', true, 'tel')}{distributor && field('city', 'Cidade', true)}
      {distributor && <label>Estado *<select name="state" value={data.state} onChange={update} aria-invalid={!!errors.state}><option value="">Selecione</option>{['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(s=><option key={s}>{s}</option>)}</select>{errors.state&&<small className="field-error">{errors.state}</small>}</label>}
      {!distributor && <label>Assunto<select name="subject" value={data.subject} onChange={update}><option value="">Selecione</option><option>Informações sobre produtos</option><option>Onde comprar</option><option>Quero ser distribuidor</option><option>Suporte comercial</option><option>Materiais</option><option>Outros</option></select></label>}
      {distributor && field('regions', 'Regiões atendidas')}{distributor && field('experience', 'Experiência no mercado pet')}
    </div>
    <label>Mensagem *<textarea name="message" rows="5" value={data.message} onChange={update} aria-invalid={!!errors.message}/>{errors.message&&<small className="field-error">{errors.message}</small>}</label>
    <label className="check"><input name="privacy" type="checkbox" checked={data.privacy} onChange={update}/><span>Li e aceito a <a href="/politica-de-privacidade">Política de Privacidade</a>.</span></label>{errors.privacy&&<small className="field-error">{errors.privacy}</small>}
    <button className="button"><FaWhatsapp size={17} aria-hidden="true"/> Enviar pelo WhatsApp</button>
    {status==='success'&&<p className="form-status form-status--success" role="status">O WhatsApp foi aberto com sua mensagem pronta para envio. <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Abrir novamente</a>.</p>}
    {status==='error'&&<p className="form-status" role="alert">Não foi possível abrir o WhatsApp. Verifique as permissões do navegador e tente novamente.</p>}
  </form>
}
