import historyImage from '../assets/about/about-groomer-trimming.webp'
import kosmoscienceLogo from '../assets/products/materiais/logo-group-kosmoscience.svg'

export const homeEditorial = {
  technicalCredibility: {
    eyebrow: 'Pesquisa • Tecnologia • Confiança',
    title: 'Pesquisa aplicada ao cuidado profissional.',
    description: 'Desenvolvimento especializado, avaliação técnica e testes dermatológicos sustentam formulações pensadas para a rotina profissional.',
    technicalPartner: {
      eyebrow: 'Pesquisa e validação',
      title: 'Avaliação técnica conduzida pela Kosmoscience.',
      description: 'Os produtos Atual Pet são avaliados pela Kosmoscience, referência em pesquisa e desenvolvimento cosmético.',
      logo: kosmoscienceLogo,
      logoWidth: 2350,
      logoHeight: 429,
    },
    evidence: [
      {
        id: 'orion',
        number: '01',
        eyebrow: 'Desenvolvimento',
        title: 'Desenvolvimento realizado pela Orion Cosméticos.',
        description: 'A Orion Ind e Com de Cosméticos Ltda. desenvolve e fabrica os produtos Atual Pet.',
      },
      {
        id: 'dermatologically-tested',
        number: '02',
        eyebrow: 'Segurança',
        title: 'Produtos testados dermatologicamente para oferecer mais segurança durante o cuidado animal.',
        featured: true,
      },
      {
        id: 'professional-performance',
        number: '03',
        eyebrow: 'Performance',
        title: 'Formulações criadas para a rotina profissional.',
        description: 'Soluções de alto desempenho para diferentes necessidades e etapas do cuidado animal.',
      },
    ],
  },
  testimonials: {
    contentStatus: 'placeholder-replace-before-final-publication',
    eyebrow: 'Experiência no dia a dia',
    title: 'Percepções de quem vive a rotina profissional.',
    items: [
      {
        id: 'professional-routine',
        quote: 'A variedade das linhas ajuda a organizar diferentes etapas do banho e tosa com escolhas mais claras para cada rotina.',
        attribution: 'Profissional de banho e tosa',
      },
      {
        id: 'presentation-fragrance',
        quote: 'A apresentação dos produtos valoriza o espaço profissional, enquanto as fragrâncias completam a experiência do serviço.',
        attribution: 'Equipe de pet shop',
      },
      {
        id: 'commercial-relationship',
        quote: 'Ter propostas diferentes no mesmo portfólio facilita conversar com profissionais que atendem perfis e necessidades variadas.',
        attribution: 'Parceiro comercial',
      },
    ],
  },
  history: {
    eyebrow: 'Por trás da marca',
    title: 'Uma estrutura dedicada ao mercado profissional pet.',
    paragraphs: [
      'A Atual Pet é uma marca de cosméticos profissionais para pets. A Orion Ind e Com de Cosméticos Ltda. é a empresa responsável pela marca e pela fabricação dos produtos.',
      'Essa estrutura conecta desenvolvimento de portfólio, cuidado profissional e relacionamento com distribuidores parceiros.',
    ],
    ctaLabel: 'Conheça nossa história',
    ctaUrl: '/sobre',
    image: historyImage,
    imageWidth: 1800,
    imageHeight: 1200,
    imageAlt: 'Profissional realizando o acabamento da pelagem de um cachorro',
  },
}
