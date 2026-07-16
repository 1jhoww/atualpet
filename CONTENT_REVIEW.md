# Revisão de conteúdo antes da publicação

## Informações institucionais

- **Informação confirmada:** a Atual Pet é fabricante brasileira de cosméticos profissionais para pets.
- **Modelo comercial confirmado:** a Atual Pet fabrica seus produtos e os comercializa por meio de distribuidores parceiros.
- Confirmar história oficial, missão, visão e valores. O site antigo contém redações conflitantes e não informa data de fundação.
- Confirmar endereço oficial. O cabeçalho antigo informa Rua Hawai, 77, Vargem Grande Paulista; a página de contato informa Avenida Sapopemba, 5964, São Paulo.
- Confirmar perfis oficiais de Instagram e Facebook.
- Confirmar link do Portal Comercial.
- O vídeo institucional oficial foi localizado na Home antiga e configurado como `https://youtu.be/bbsd6U560AE` em `src/data/company.js`.

## Produtos

- Revisar todos os nomes, categorias, volumes, diluições, indicações e benefícios com rótulos/fichas técnicas vigentes.
- Completar modos de uso. Eles foram mantidos vazios quando não estavam disponíveis de forma confiável.
- Validar a informação “a partir de 8 semanas” do Shampoo Branqueador Dream Color.
- Validar a diluição e apresentações do Shampoo Neutro Zoom.
- Substituir placeholders dos produtos marcados com `imagePending`.
- Confirmar composição e disponibilidade do Display de Perfumes Vanity.
- Ampliar a base: esta primeira versão usa um recorte verificável, não o portfólio completo.
- Confirmar quais produtos devem receber `isLaunch: true`. Nenhum produto foi marcado como lançamento sem validação.

## Fotografias editoriais

- A utilização de banco de imagens foi autorizada nesta rodada de direção de arte.
- As fotografias de banho, grooming e ambiente profissional são imagens gratuitas do Pexels e estão armazenadas em `src/assets/editorial`.
- Créditos e origem estão registrados no `README.md`.
- Substituir por fotografias institucionais próprias da Atual Pet quando houver um ensaio oficial disponível.

## Distribuidores

- Validar toda a relação e autorização para publicação de contatos.
- Confirmar W A Comércio e Distribuição Ltda.: telefone com DDD 82 conflita com Santa Luzia/MG.
- Adicionar endereços, regiões atendidas e links de localização quando oficiais.

## Jurídico e integrações

- Validar a Política de Privacidade com assessoria responsável.
- Configurar endpoint real dos formulários ou manter o fallback explícito de WhatsApp.
- Cadastrar PDFs oficiais na página Materiais.
- Revisar sitemap e domínio canônico antes do deploy.
