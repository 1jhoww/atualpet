import dreamImage from '../assets/lines/dream-color.jpg'
import dreamStoryImage from '../assets/lines/line-dream-color-professional-care.webp'
import luxeStoryImage from '../assets/lines/line-the-luxe-professional-routine.webp'
import vanityStoryImage from '../assets/lines/line-vanity-pet-fragrance-finish.webp'
import zoomStoryImage from '../assets/lines/line-zoom-pet-daily-care.webp'
import luxeImage from '../assets/lines/the-luxe.jpg'
import vanityImage from '../assets/lines/vanity-pet.jpg'
import zoomImage from '../assets/lines/zoom-pet.png'

export const lines = [
  {
    slug: 'dream-color',
    name: 'Dream Color',
    eyebrow: 'Sensorial e expressiva',
    headline: 'Cor, fragrância e performance em uma linha versátil.',
    description: 'Shampoos, condicionadores, máscaras, colônias e aromatizadores com diferentes fragrâncias e soluções para a rotina profissional.',
    image: dreamImage,
    storyImage: dreamStoryImage,
    storyImageAlt: 'Profissional realizando cuidado detalhado na pelagem de um cachorro',
    tone: 'dream',
    benefits: ['Variedade de fragrâncias', 'Opções para diferentes etapas', 'Apresentações profissionais'],
    story: [
      ['Intenção', 'Escolher fragrância e proposta para o momento do cuidado.'],
      ['Ritual', 'Combinar produtos para diferentes etapas da rotina profissional.'],
      ['Acabamento', 'Concluir o serviço com uma experiência sensorial marcante.'],
    ],
  },
  {
    slug: 'the-luxe',
    name: 'The Luxe',
    eyebrow: 'Cuidado premium',
    headline: 'Acabamento refinado para protocolos de alta performance.',
    description: 'Uma linha ampla de higiene, hidratação, finalização, perfumaria e cuidados especiais para compor serviços completos.',
    image: luxeImage,
    storyImage: luxeStoryImage,
    storyImageAlt: 'Groomer trabalhando durante a rotina profissional de banho e tosa',
    tone: 'luxe',
    benefits: ['Rotina completa', 'Fragrâncias sofisticadas', 'Cuidados de acabamento'],
    story: [
      ['Preparação', 'Organizar um protocolo completo para a necessidade do serviço.'],
      ['Cuidado', 'Integrar higiene, hidratação e finalização durante o atendimento.'],
      ['Resultado', 'Valorizar a pelagem e os detalhes de um acabamento refinado.'],
    ],
  },
  {
    slug: 'vanity-pet',
    name: 'Vanity Pet',
    eyebrow: 'Perfumaria pet',
    headline: 'Fragrâncias que completam o ritual de cuidado.',
    description: 'Linha dedicada à perfumaria e à experiência sensorial, com apresentações voltadas ao uso profissional e ao acabamento.',
    image: vanityImage,
    storyImage: vanityStoryImage,
    storyImageAlt: 'Profissional aplicando spray no acabamento da pelagem de um cachorro',
    tone: 'vanity',
    benefits: ['Portfólio de fragrâncias', 'Identidade de perfumaria', 'Finalização sensorial'],
    story: [
      ['Escolha', 'Encontrar a fragrância que melhor traduz a intenção do serviço.'],
      ['Finalização', 'Aplicar a perfumaria como etapa de conclusão do cuidado.'],
      ['Presença', 'Criar uma assinatura sensorial que acompanha o resultado.'],
    ],
  },
  {
    slug: 'zoom-pet',
    name: 'Zoom',
    eyebrow: 'Praticidade diária',
    headline: 'Soluções diretas para uma rotina profissional eficiente.',
    description: 'Produtos de higiene e condicionamento com opções funcionais para diferentes pelagens e necessidades do dia a dia.',
    image: zoomImage,
    storyImage: zoomStoryImage,
    storyImageAlt: 'Profissional realizando cuidado cotidiano em ambiente de banho e tosa',
    tone: 'zoom',
    benefits: ['Uso prático', 'Variedade funcional', 'Apresentações para rotina'],
    story: [
      ['Rotina', 'Identificar a necessidade de higiene e condicionamento do atendimento.'],
      ['Agilidade', 'Escolher soluções funcionais para o fluxo profissional diário.'],
      ['Entrega', 'Concluir o cuidado com limpeza, maciez e praticidade.'],
    ],
  },
]

export const getLine = (slug) => lines.find((line) => line.slug === slug)
