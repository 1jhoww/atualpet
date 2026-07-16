import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { company } from '../data/company'
import { formService } from '../services/formService'

export default function LeadForm({ type = 'contact' }) {
  const distributor = type === 'distributor'
  const [status, setStatus] = useState('idle')
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
  const submit = async (event) => {
    event.preventDefault(); if (!validate()) return
    setStatus('sending')
    try { const result = await formService.submit(data, type); setStatus(result.ok ? 'success' : 'not-configured') } catch { setStatus('error') }
  }
  const whatsappMessage = encodeURIComponent(`${distributor ? 'Olá, quero conversar sobre distribuição Atual Pet.' : 'Olá, gostaria de falar com a Atual Pet.'}\nNome: ${data.name}\nEmpresa: ${data.company}\nCidade: ${data.city}/${data.state}\nMensagem: ${data.message}`)
  const field = (name, label, required = false, typeInput = 'text') => <label>{label}{required && ' *'}<input name={name} type={typeInput} value={data[name]} onChange={update} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined}/>{errors[name] && <small id={`${name}-error`} className="field-error">{errors[name]}</small>}</label>
  return <form className="lead-form" onSubmit={submit} noValidate>
    <div className="form-grid">{field('name', 'Nome', true)}{field('company', 'Empresa')}{distributor && field('cnpj', 'CNPJ')}{field('email', 'E-mail', true, 'email')}{field('phone', 'Telefone / WhatsApp', true, 'tel')}{distributor && field('city', 'Cidade', true)}
      {distributor && <label>Estado *<select name="state" value={data.state} onChange={update} aria-invalid={!!errors.state}><option value="">Selecione</option>{['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(s=><option key={s}>{s}</option>)}</select>{errors.state&&<small className="field-error">{errors.state}</small>}</label>}
      {!distributor && <label>Assunto<select name="subject" value={data.subject} onChange={update}><option value="">Selecione</option><option>Informações sobre produtos</option><option>Onde comprar</option><option>Quero ser distribuidor</option><option>Suporte comercial</option><option>Materiais</option><option>Outros</option></select></label>}
      {distributor && field('regions', 'Regiões atendidas')}{distributor && field('experience', 'Experiência no mercado pet')}
    </div>
    <label>Mensagem *<textarea name="message" rows="5" value={data.message} onChange={update} aria-invalid={!!errors.message}/>{errors.message&&<small className="field-error">{errors.message}</small>}</label>
    <label className="check"><input name="privacy" type="checkbox" checked={data.privacy} onChange={update}/><span>Li e aceito a <a href="/politica-de-privacidade">Política de Privacidade</a>.</span></label>{errors.privacy&&<small className="field-error">{errors.privacy}</small>}
    <button className="button" disabled={status==='sending'}>{status==='sending'?'Enviando…':'Enviar solicitação'}</button>
    {status==='success'&&<p className="form-status form-status--success" role="status">Mensagem enviada. Nossa equipe retornará pelo contato informado.</p>}
    {status==='error'&&<p className="form-status" role="alert">Não foi possível enviar agora. Use o WhatsApp abaixo.</p>}
    {status==='not-configured'&&<div className="form-fallback" role="status"><p>O envio online ainda não está configurado. Seus dados não foram enviados.</p><a className="button button--outline" href={`https://wa.me/${company.whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Continuar pelo WhatsApp</a></div>}
  </form>
}
