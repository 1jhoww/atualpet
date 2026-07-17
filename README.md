# Atual Pet — site institucional e catálogo digital

Nova aplicação institucional da Atual Pet, criada em React e Vite. Inclui catálogo público sem preços, páginas de linhas, localizador de distribuidores, formulários preparados para integração e conteúdo centralizado em dados locais.

## Tecnologias

- React, Vite e JavaScript
- React Router
- CSS Modules + tokens globais
- Lucide React
- ESLint

## Executar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm run lint
npm run build
npm run preview
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`.

- `VITE_PORTAL_COMERCIAL_URL`: endereço do Portal Comercial.
- `VITE_SITE_URL`: domínio canônico.
- `VITE_WHATSAPP_NUMBER`: número com DDI e DDD.
- `VITE_CONTACT_API_URL`: endpoint futuro dos formulários. Sem ele, o site informa que não houve envio e oferece WhatsApp.

## Organização

- `src/assets`: assets oficiais copiados localmente e placeholders identificados.
- `src/components`: componentes globais e reutilizáveis.
- `src/data`: empresa, linhas, produtos, distribuidores e materiais.
- `src/pages`: páginas associadas às rotas.
- `src/services`: camada de acesso ao catálogo e envio de formulários.

## Atualizar conteúdo

- Produtos: edite `src/data/products.js`. Use campos vazios quando uma informação não estiver confirmada.
- Lançamentos: defina `isLaunch: true` somente em produtos oficialmente confirmados. O filtro público usa `?lancamento=true`.
- Distribuidores: edite `src/data/distributors.js`.
- Materiais: adicione itens em `src/data/materials.js` somente com arquivos oficiais.
- Contatos e textos institucionais: edite `src/data/company.js`.
- Vídeo institucional: atualize `institutionalVideo` em `src/data/company.js`; o componente aceita URL do YouTube e não reproduz automaticamente.
- Linhas e banners: edite `src/data/lines.js` e substitua arquivos em `src/assets/lines`.
- Portal Comercial: defina `VITE_PORTAL_COMERCIAL_URL`.

## Privacidade e cookies

- Os dados, textos estruturados e a versão do consentimento ficam em `src/data/legal.js`.
- A preferência é armazenada em `atualpet_cookie_consent_v1` e pode ser reaberta pelo rodapé.
- O player do YouTube usa `youtube-nocookie.com` e só é inserido após consentimento funcional e interação do visitante.
- Revise `LEGAL_CONTENT_REVIEW.md` antes de qualquer publicação.

## Créditos das fotografias editoriais

As fotografias em `src/assets/editorial` são imagens gratuitas do Pexels, armazenadas localmente para evitar dependências externas:

- Banho profissional e cão no salão: Goochie Poochie Grooming / Pexels.
- Cuidado da pelagem: Gustavo Fring / Pexels.

## Deploy na Vercel

Importe o repositório, use `npm run build` e diretório de saída `dist`. Cadastre as variáveis no painel. O React Router é atendido por `vercel.json`.

Antes da publicação, conclua os itens de `CONTENT_REVIEW.md` e substitua as imagens marcadas como pendentes.
