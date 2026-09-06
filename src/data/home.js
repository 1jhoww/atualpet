import historyImage from '../assets/about/about-groomer-trimming.webp'
import orionLogo from '../assets/institutional/orion-logo.webp'

export const homeEditorial = {
  technicalCredibility: {
    eyebrow: 'Desenvolvimento • Cuidado • Performance',
    title: 'Estrutura responsável, cuidado em cada escolha.',
    description: 'A Atual Pet organiza suas linhas com atenção às formulações, às diferentes etapas do cuidado e à experiência profissional.',
    institutionalLead: {
      eyebrow: 'Desenvolvimento e fabricação',
      title: 'A Atual Pet é uma marca da Orion Cosméticos.',
      description: 'A Orion Ind e Com de Cosméticos Ltda. é responsável pelo desenvolvimento e pela fabricação dos produtos Atual Pet.',
      logo: orionLogo,
      logoWidth: 1600,
      logoHeight: 424,
      logoAlt: 'Orion Indústria e Comércio de Cosméticos Ltda.',
      logoUrl: 'https://orioninternacional.com.br/',
    },
    evidence: [
      {
        id: 'development',
        number: '01',
        eyebrow: 'Desenvolvimento',
        visualLabel: 'Criação',
        title: 'Formulações voltadas à rotina profissional.',
        description: 'Produtos pensados para acompanhar diferentes momentos do trabalho de banho e tosa.',
      },
      {
        id: 'care',
        number: '02',
        eyebrow: 'Cuidado',
        visualLabel: 'Rotina',
        title: 'Soluções para diferentes etapas do cuidado animal.',
        description: 'Linhas organizadas para higiene, estética, perfumaria e acabamento.',
      },
      {
        id: 'professional-performance',
        number: '03',
        eyebrow: 'Performance',
        visualLabel: 'Resultado',
        title: 'Apresentações pensadas para o uso profissional.',
        description: 'Um portfólio que reúne variedade, identidade e atenção à experiência de uso.',
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
