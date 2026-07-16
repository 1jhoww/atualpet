export const formService = {
  submit: async (payload, formType) => {
    const endpoint = import.meta.env.VITE_CONTACT_API_URL
    if (!endpoint) return { ok: false, reason: 'not-configured', payload, formType }
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, formType }) })
    if (!response.ok) throw new Error('Não foi possível enviar o formulário.')
    return { ok: true }
  },
}
