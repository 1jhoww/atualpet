# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

Requer Node.js 20+.

```bash
npm run dev        # Vite dev server
npm run lint       # eslint . --max-warnings 0 (zero warnings ou falha)
npm run build      # build de produção em dist/ (sourcemap ligado)
npm run preview    # serve o build
npm test           # node --test (runner nativo, sem framework)
```

Teste único / caso único:

```bash
node --test src/utils/bathCalculator.test.js
```

```bash
node --test --test-name-pattern "diluição 1:5"
```

## Arquitetura

Site institucional estático (React + Vite + React Router), sem backend. Todo o conteúdo vem de módulos JS locais em `src/data`; não há CMS nem API de catálogo.

**Fluxo de dados:** `src/data/*.js` (fonte da verdade) → `src/services/catalogService.js` (busca/filtros em memória) → páginas em `src/pages`. Componentes nunca fazem fetch de catálogo.

**Pipeline do catálogo** (`src/data/products.js`): `productCatalog` (array cru, um objeto por produto, uma linha por produto) passa por `map` que aplica, nesta ordem: defaults de todos os campos → o objeto cru → override editorial de `verifiedProductContent[slug]` → resolução da imagem via `getProductAsset`. Depois ordena por `supportMaterial` → `order` da linha → `order` da categoria → nome (`localeCompare` pt-BR) e só então grava `order` sequencial. Consequências ao editar:
- `verifiedProductContent.js` **sobrescreve** `short`/`description`/`benefits` definidos em `products.js` para o mesmo slug.
- `products.js` guarda `sourceOrder` (ordem no array) usado como desempate em `compareLaunchDate`; o `order` público é derivado, nunca escrito à mão.
- Volumes diferentes do mesmo produto ficam no **mesmo registro** (campos `volumes` + `variants`), não em registros separados.

**Assets de produto:** `getProductAsset` (`src/data/productAssets.js`) usa `import.meta.glob` sobre `src/assets/products/optimized/**/*.webp` e **lança erro** se o caminho relativo do campo `asset` não existir. Imagem nova = arquivo `.webp` em `assets/products/optimized/<linha>/` + campo `asset: '<linha>/<arquivo>.webp'`. Sem `asset`, cai no placeholder SVG. Originais não otimizados ficam em pastas `originals/` e não são referenciados pelo código.

**Taxonomia** (`src/data/productTaxonomy.js`): `productLines`, `productCategories`, `dilutionValues`, `publicVolumeFilter` definem os filtros públicos e a ordenação. Um `line`/`category` em `products.js` sem entrada aqui cai em `order: 999` e some dos filtros (as opções são filtradas pelo que existe no catálogo ativo).

**Rotas** (`src/App.jsx`): todas lazy, slugs em português (`/produtos`, `/onde-encontrar`, `/lancamentos/linha-exclusiva-amazon`, ...). Os query params de filtro também são em português: `busca`, `lancamento`, `linha`, `categoria`, `fragrancia`, `volume`, `diluicao` (mapa em `queryKeys` de `src/pages/Products.jsx`). Ao adicionar rota, atualizar `public/sitemap.xml` manualmente.

**Consentimento de cookies:** `CookieConsentProvider` envolve o app em `main.jsx`; consumo via `useCookieConsent()`. Conteúdo de terceiros é bloqueado até `isAllowed('functional')` — ver `InstitutionalVideo.jsx`, que só insere o iframe `youtube-nocookie.com` após consentimento **e** clique. Incrementar `CONSENT_VERSION` em `src/data/legal.js` muda a chave de localStorage e invalida todos os consentimentos guardados.

**Formulários:** `formService.submit` retorna `{ ok: false, reason: 'not-configured' }` quando `VITE_CONTACT_API_URL` está vazio (caso atual). O `LeadForm` então monta uma mensagem e oferece link `wa.me` — o fluxo de WhatsApp é o caminho real de contato, não um fallback decorativo.

## Estilo de código

- Formatação deliberadamente compacta: sem ponto e vírgula, aspas simples, várias declarações/JSX na mesma linha (ver `App.jsx`, `products.js`). Seguir o padrão do arquivo que está sendo editado; não reformatar arquivos existentes.
- CSS Modules por componente (`Componente.module.css`) + tokens e utilitários globais em `src/styles/global.css` (`--brand-cyan`, `--brand-orange`, `--ease-premium`, `.shell`, `.section`, `.eyebrow`, `.button`). Usar tokens; não hardcodar cores.
- `no-unused-vars` com `varsIgnorePattern: '^[A-Z_]'`; `npm run lint` falha com qualquer warning.
- Todo texto visível e todo comentário em pt-BR; ordenações de string usam `localeCompare(..., 'pt-BR')`.
- Animações de entrada pelo componente `Reveal` (IntersectionObserver, respeita `prefers-reduced-motion`). GSAP é usado apenas em `BathTransformation.jsx`.
- SEO por rota via componente `<Seo>` (manipula `document.head` em `useEffect`, inclui JSON-LD opcional).

## Variáveis de ambiente

`.env.example` → `.env.local`. `VITE_PORTAL_COMERCIAL_URL` (botão do portal só aparece se definido), `VITE_SITE_URL` (canônico/OG), `VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_API_URL` (vazio = modo WhatsApp).

## Conteúdo e revisão

- Lançamento: `isLaunch: true` + `launchDate` apenas para produtos confirmados. `PROVISIONAL_LAUNCH_DATE` em `products.js` é placeholder a substituir antes do deploy.
- `src/data/materials.js` está vazio de propósito — só adicionar com arquivos oficiais.
- Os arquivos `CONTENT_REVIEW.md`, `LEGAL_CONTENT_REVIEW.md`, `PRODUCT_*.md` e `ASSET_SOURCES.md` existem localmente mas estão no `.gitignore`; rastreiam pendências de conteúdo/licença de imagens (fotos de stock Pexels em `assets/about`, `assets/lines`, `assets/editorial` ainda aguardam validação).
- Deploy na Vercel: saída `dist`, SPA atendida por `vercel.json` (e `public/_redirects` para outros hosts).
