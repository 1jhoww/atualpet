export const CONSENT_VERSION = 1
export const CONSENT_STORAGE_KEY = `atualpet_cookie_consent_v${CONSENT_VERSION}`

export const legal = {
  brandName: 'Atual Pet',
  controllerName: 'Orion Ind e Com de Cosméticos Ltda',
  legalName: 'Orion Ind e Com de Cosméticos Ltda',
  document: '41.994.699/0001-30',
  relationship: 'A Atual Pet é uma marca da Orion Ind e Com de Cosméticos Ltda.',
  address: '',
  privacyEmail: '',
  contactEmail: 'marketingatualpet@outlook.com',
  lastUpdated: '16 de julho de 2026',
  consentVersion: CONSENT_VERSION,
  consentStorageKey: CONSENT_STORAGE_KEY,
  externalServices: [
    {
      name: 'YouTube',
      provider: 'Google LLC',
      purpose: 'Exibir o vídeo institucional somente após consentimento funcional e interação do visitante.',
      privacyUrl: 'https://policies.google.com/privacy?hl=pt-BR',
    },
    {
      name: 'Google Fonts',
      provider: 'Google LLC',
      purpose: 'Fornecer as famílias tipográficas carregadas pelas folhas de estilo do site.',
      privacyUrl: 'https://policies.google.com/privacy?hl=pt-BR',
    },
  ],
  formFields: {
    contact: ['nome', 'empresa', 'e-mail', 'telefone ou WhatsApp', 'assunto', 'mensagem e aceite da Política de Privacidade'],
    distributor: ['nome', 'empresa', 'CNPJ', 'e-mail', 'telefone ou WhatsApp', 'cidade', 'estado', 'regiões atendidas', 'experiência no mercado pet', 'mensagem e aceite da Política de Privacidade'],
  },
  cookieCategories: [
    {
      id: 'necessary',
      name: 'Necessários',
      description: 'Mantêm a escolha de privacidade e os controles essenciais do site. Permanecem ativos.',
      required: true,
    },
    {
      id: 'functional',
      name: 'Funcionais',
      description: 'Permitem carregar o player externo do YouTube quando você decide assistir ao vídeo institucional.',
      required: false,
    },
  ],
  storageTechnologies: [
    {
      key: CONSENT_STORAGE_KEY,
      provider: 'Atual Pet',
      type: 'localStorage',
      category: 'Necessários',
      purpose: 'Guardar a versão, as escolhas de consentimento e a data da última atualização.',
      duration: 'Até a limpeza do navegador ou a substituição por uma nova versão do consentimento.',
    },
    {
      key: 'Armazenamentos definidos pelo player do YouTube',
      provider: 'Google/YouTube',
      type: 'Cookies e armazenamento de terceiros',
      category: 'Funcionais',
      purpose: 'Reproduzir o vídeo institucional e registrar interações conforme as configurações do YouTube e da conta Google do visitante.',
      duration: 'Definida pelo Google/YouTube; varia conforme o navegador, a conta e a tecnologia utilizada.',
    },
  ],
}

export const legalEntityStatement = `A ${legal.brandName} é uma marca da ${legal.legalName}, inscrita no CNPJ sob o nº ${legal.document}.`

export const privacyPolicy = {
  title: 'Política de Privacidade',
  description: 'Como o site institucional da Atual Pet trata dados pessoais e utiliza serviços de terceiros.',
  eyebrow: 'Privacidade',
  headline: 'Transparência sobre seus dados e suas escolhas.',
  intro: 'Esta política descreve o tratamento de dados pessoais no site institucional e catálogo digital da Atual Pet. Ela não representa certificação de conformidade e deve ser revisada sempre que o funcionamento do site ou os responsáveis pelo tratamento mudarem.',
  sections: [
    {
      title: '1. Identificação e escopo',
      paragraphs: [
        legalEntityStatement,
        'Esta política se aplica à navegação, aos formulários de contato e de interesse em distribuição, à gestão de preferências de cookies e ao vídeo institucional incorporado. Sites de distribuidores, redes sociais, WhatsApp, YouTube e outros destinos externos possuem regras próprias.',
      ],
    },
    {
      title: '2. Dados que podem ser coletados',
      paragraphs: ['O formulário de contato pode receber: nome, empresa, e-mail, telefone ou WhatsApp, assunto, mensagem e registro do aceite da política. O formulário para potenciais distribuidores também pode receber CNPJ, cidade, estado, regiões atendidas e experiência no mercado pet.'],
      lists: [
        'Dados fornecidos voluntariamente nos formulários ou em contatos iniciados por e-mail e WhatsApp.',
        'Preferência de cookies, versão do consentimento e data da escolha, armazenadas no navegador.',
        'Dados técnicos tratados pelos provedores externos somente quando seus recursos são carregados, como endereço IP, navegador, dispositivo e interação com o vídeo.',
      ],
    },
    {
      title: '3. Como os dados são coletados e utilizados',
      paragraphs: [
        'O site utiliza os dados para responder solicitações, direcionar dúvidas sobre produtos, avaliar manifestações de interesse comercial e manter o registro das preferências de privacidade.',
        'Os formulários dependem de um endpoint externo configurado por ambiente. Quando essa integração não está configurada, a interface informa que os dados não foram enviados e oferece a opção de continuar pelo WhatsApp. Ao abrir o WhatsApp, o visitante decide se enviará a mensagem ao serviço externo.',
      ],
    },
    {
      title: '4. Bases legais',
      paragraphs: ['Conforme a finalidade e o contexto, o tratamento poderá se apoiar em consentimento, procedimentos preliminares relacionados a uma solicitação, legítimo interesse avaliado com as salvaguardas cabíveis, cumprimento de obrigação legal ou exercício regular de direitos. A base adequada deve ser confirmada no fluxo operacional e jurídico da empresa.'],
    },
    {
      title: '5. Compartilhamento e serviços de terceiros',
      paragraphs: [
        'Dados podem ser tratados por fornecedores necessários à hospedagem e ao envio dos formulários, quando configurados, e pelos serviços escolhidos pelo visitante, como WhatsApp e YouTube. A identificação dos provedores de hospedagem e formulário ainda depende de confirmação.',
        'O vídeo usa o domínio youtube-nocookie.com, mas o iframe só é criado depois do consentimento funcional e de um clique para assistir. O YouTube ainda pode tratar dados e utilizar cookies ou tecnologias semelhantes após o carregamento do player.',
        'As fontes do site são solicitadas ao Google Fonts no carregamento das páginas. Essa requisição pode transmitir dados técnicos, como endereço IP e informações do navegador, ao provedor.',
      ],
    },
    {
      title: '6. Transferência internacional',
      paragraphs: ['O uso de serviços do Google/YouTube e de outros provedores que venham a ser confirmados pode envolver processamento de dados fora do Brasil. O detalhamento dos locais, mecanismos e operadores depende da contratação e da configuração efetiva desses serviços.'],
    },
    {
      title: '7. Armazenamento, retenção e segurança',
      paragraphs: [
        'A preferência de cookies permanece no navegador até ser apagada ou substituída por nova versão. Dados recebidos por canais de contato devem ser conservados apenas pelo tempo necessário para atender à solicitação, manter registros legítimos e cumprir obrigações aplicáveis. Os prazos internos exatos ainda precisam de validação.',
        'São adotadas medidas técnicas e organizacionais proporcionais ao serviço, sem promessa de segurança absoluta. O visitante também deve proteger seu dispositivo e evitar enviar dados desnecessários ou sensíveis nos campos livres.',
      ],
    },
    {
      title: '8. Direitos dos titulares',
      paragraphs: ['Quando aplicável, o titular pode solicitar confirmação do tratamento, acesso, correção, anonimização, bloqueio ou eliminação, portabilidade nos termos da regulamentação, informação sobre compartilhamento, revogação do consentimento, oposição e revisão de decisões automatizadas. O site não implementa decisões automatizadas sobre os formulários nesta versão. Cada solicitação será analisada conforme a legislação e as obrigações de conservação aplicáveis.'],
    },
    {
      title: '9. Crianças e adolescentes',
      paragraphs: ['Os formulários são destinados a contatos institucionais e profissionais e não foram desenhados para coletar intencionalmente dados de crianças ou adolescentes. Caso um responsável identifique envio indevido, poderá solicitar análise e as providências cabíveis pelo canal informado abaixo.'],
    },
    {
      title: '10. Cookies e preferências',
      paragraphs: ['As tecnologias efetivamente identificadas estão detalhadas na Política de Cookies. O visitante pode aceitar, rejeitar ou alterar a categoria funcional a qualquer momento pelo link “Gerenciar cookies” no rodapé.'],
    },
    {
      title: '11. Atualizações e contato',
      paragraphs: ['Esta política pode ser atualizada para refletir mudanças no site, nos serviços ou na legislação. Solicitações de privacidade podem ser encaminhadas ao e-mail geral de contato informado abaixo até que um canal específico seja confirmado.'],
    },
  ],
}

export const termsOfUse = {
  title: 'Termos de Uso',
  description: 'Condições de uso do site institucional e catálogo digital da Atual Pet.',
  eyebrow: 'Termos de uso',
  headline: 'Informação clara para navegar pelo site Atual Pet.',
  intro: 'Ao utilizar este site, o visitante concorda em respeitar estes termos e a legislação aplicável. O documento deve passar por validação jurídica antes da publicação definitiva.',
  sections: [
    { title: '1. Finalidade do site', paragraphs: [legalEntityStatement, 'O site apresenta institucionalmente a Atual Pet, suas linhas, produtos e distribuidores parceiros. O catálogo é informativo, não exibe preços e não realiza compra, pagamento, entrega ou contratação direta.'] },
    { title: '2. Produtos e disponibilidade', paragraphs: ['A presença de um produto no catálogo não constitui, por si só, oferta direta ao consumidor. Disponibilidade, condições comerciais e atendimento variam conforme o distribuidor parceiro e a região. Imagens podem ser ilustrativas quando indicado; informações técnicas de uso, composição, indicação e segurança devem seguir o rótulo e os materiais oficiais atualizados do produto.'] },
    { title: '3. Uso permitido', paragraphs: ['O visitante pode consultar e compartilhar links públicos para fins legítimos. É proibido interferir no funcionamento do site, tentar obter acesso não autorizado, extrair dados de forma abusiva ou utilizar o conteúdo para enganar terceiros.'] },
    { title: '4. Propriedade intelectual', paragraphs: ['Marcas, logos, fotografias, textos, layout e demais conteúdos são protegidos conforme a legislação aplicável e pertencem aos respectivos titulares. Nenhuma autorização de uso comercial, reprodução integral ou criação de versões modificadas é concedida apenas pelo acesso ao site.'] },
    { title: '5. Links e serviços externos', paragraphs: ['Links para distribuidores, redes sociais, WhatsApp e YouTube levam a serviços mantidos por terceiros, sujeitos aos próprios termos e políticas. A Atual Pet não controla a disponibilidade, as configurações de privacidade ou o conteúdo desses ambientes externos.'] },
    { title: '6. Atualizações e disponibilidade do site', paragraphs: ['Conteúdos, produtos, rotas e funcionalidades podem ser corrigidos ou atualizados. Podem ocorrer indisponibilidades temporárias por manutenção, falhas de rede ou serviços de terceiros. Erros identificados podem ser informados pelo canal de contato.'] },
    { title: '7. Responsabilidades', paragraphs: ['A Atual Pet busca manter informações úteis e atualizadas, mas o visitante deve confirmar dados técnicos nos rótulos e canais oficiais antes do uso. Nada nestes termos exclui responsabilidades que não possam ser afastadas pela legislação brasileira.'] },
    { title: '8. Legislação e contato', paragraphs: ['Aplica-se a legislação brasileira. Eventuais questões serão avaliadas conforme as regras legais de competência, sem eleição de foro nesta versão. Dúvidas sobre o site podem ser encaminhadas ao contato abaixo.'] },
  ],
}

export const cookiePolicy = {
  title: 'Política de Cookies',
  description: 'Tecnologias de armazenamento e preferências utilizadas no site Atual Pet.',
  eyebrow: 'Cookies',
  headline: 'Você decide quando recursos externos podem ser carregados.',
  intro: `Cookies são pequenos arquivos ou registros gravados no dispositivo. Tecnologias semelhantes, como localStorage, também podem guardar preferências. Esta política lista somente os recursos identificados na versão atual do projeto. ${legalEntityStatement}`,
  sections: [
    { title: '1. Categorias utilizadas', paragraphs: ['Necessários: guardam a escolha de privacidade e permitem os controles essenciais. Funcionais: liberam o player externo do YouTube para o vídeo institucional. Não foram identificados Google Analytics, Meta Pixel, cookies de publicidade ou uma categoria de marketing no projeto.'] },
    { title: '2. Escolha e bloqueio', paragraphs: ['Antes de uma decisão, apenas o armazenamento necessário da própria preferência pode ser utilizado. O player do YouTube permanece ausente da página até o consentimento funcional e um clique do visitante. Rejeitar a categoria funcional não impede a navegação, o catálogo, os formulários ou os links; apenas mantém o vídeo bloqueado.'] },
    { title: '3. Tecnologias identificadas', table: true },
    { title: '4. Alterar ou revogar preferências', paragraphs: ['Use “Gerenciar cookies” no rodapé para alterar sua escolha. Também é possível apagar cookies e dados de sites nas configurações do navegador; nesse caso, o banner poderá aparecer novamente. A exclusão de dados definidos diretamente pelo YouTube deve ser feita nas configurações do navegador e, quando aplicável, da conta Google.'] },
    { title: '5. Serviços sem chave local identificada', paragraphs: ['O CSS do site solicita fontes ao Google Fonts. A auditoria do código não encontrou uma chave de cookie ou localStorage criada pelo projeto para essa finalidade, por isso o serviço não aparece na tabela de armazenamento. A requisição de rede e seus possíveis dados técnicos são explicados na Política de Privacidade.'] },
    { title: '6. Atualizações e contato', paragraphs: ['A inclusão de analytics, pixels, mapas, widgets ou novos embeds exige nova auditoria, atualização desta política e, quando necessário, bloqueio prévio por categoria. Dúvidas podem ser encaminhadas ao contato abaixo.'] },
  ],
}
