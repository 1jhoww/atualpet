import dreamColorLogo from '../assets/lines/logos/dream-color-logo.png'
import theLuxeLogo from '../assets/lines/logos/the-luxe-logo.png'
import vanityPetLogo from '../assets/lines/logos/vanity-pet-logo.png'
import zoomLogo from '../assets/lines/logos/zoom-logo.png'

export const productLines = [
  {
    id: 'dream-color',
    name: 'Dream Color',
    shortName: 'Dream Color',
    tier: 'Super Premium',
    shortDescription: 'Alta performance para diferentes etapas do cuidado profissional.',
    description: 'Linha super premium desenvolvida para profissionais que buscam variedade, cuidado avançado e uma experiência sensorial consistente ao longo da rotina de banho e tosa.',
    highlights: ['Alta performance', 'Uso profissional', 'Diferentes etapas do cuidado'],
    focus: 'Alta performance profissional',
    logo: dreamColorLogo,
    logoWidth: 500,
    logoHeight: 300,
    visualProducts: ['shampoo-pre-lavagem-dream-color', 'mascara-bambu-dream-color'],
    route: '/linhas/dream-color',
    accent: '#ed7b0a',
    surface: '#fff1e3',
    order: 10,
  },
  {
    id: 'dream-color-care',
    name: 'Dream Color Care',
    shortName: 'Dream Color Care',
    tier: 'Ultra Premium',
    shortDescription: 'Cuidados especiais para momentos que pedem atenção mais direcionada.',
    description: 'Extensão ultra premium da Dream Color criada para complementar a rotina profissional com produtos voltados a cuidados específicos, sem perder a linguagem sensorial da linha de origem.',
    highlights: ['Cuidados especiais', 'Produtos complementares', 'Atenção direcionada'],
    focus: 'Cuidados especiais e complementares',
    logo: null,
    visualProducts: ['shampoo-propolis-dream-color-care', 'power-puff-spray-de-volume-dream-color-care'],
    route: '',
    accent: '#469f9b',
    surface: '#e8f7f6',
    order: 20,
  },
  {
    id: 'the-luxe',
    name: 'The Luxe',
    shortName: 'The Luxe',
    tier: 'Premium',
    shortDescription: 'Desempenho profissional com equilíbrio entre variedade e custo-benefício.',
    description: 'Linha premium criada para oferecer desempenho profissional, variedade e excelente relação entre qualidade e custo-benefício na rotina de banho e tosa.',
    highlights: ['Desempenho profissional', 'Variedade de soluções', 'Excelente custo-benefício'],
    focus: 'Performance e custo-benefício',
    logo: theLuxeLogo,
    logoWidth: 500,
    logoHeight: 300,
    visualProducts: ['shampoo-cereja-avela-the-luxe', 'condicionador-cereja-avela-the-luxe'],
    route: '/linhas/the-luxe',
    accent: '#9a7842',
    surface: '#f2eee6',
    order: 30,
  },
  {
    id: 'vanity-pet',
    name: 'Vanity Pet',
    shortName: 'Vanity',
    tier: 'Ultra Premium',
    shortDescription: 'Perfumaria profissional para valorizar o acabamento.',
    description: 'Linha ultra premium de perfumaria pet desenvolvida para transformar a etapa final do cuidado em uma experiência sensorial marcante, com foco em perfumes, fragrâncias e sofisticação.',
    highlights: ['Perfumaria profissional', 'Acabamento sofisticado', 'Experiência sensorial'],
    focus: 'Perfumaria e acabamento',
    logo: vanityPetLogo,
    logoWidth: 500,
    logoHeight: 300,
    visualProducts: ['perfume-baby-vanity-pet', 'colonia-you-vanity-pet'],
    route: '/linhas/vanity-pet',
    accent: '#8c557a',
    surface: '#f4ebf1',
    order: 40,
  },
  {
    id: 'zoom-pet',
    name: 'Zoom',
    shortName: 'Zoom',
    tier: 'Essencial e prática',
    shortDescription: 'Praticidade e funcionalidade para o cuidado diário.',
    description: 'Linha essencial e prática para a rotina de banho e tosa, com soluções acessíveis e funcionais para diferentes necessidades do dia a dia.',
    highlights: ['Uso prático', 'Soluções funcionais', 'Rotina diária'],
    focus: 'Praticidade para o dia a dia',
    logo: zoomLogo,
    logoWidth: 500,
    logoHeight: 300,
    visualProducts: ['shampoo-neutro-zoom', 'condicionador-zoom'],
    route: '/linhas/zoom-pet',
    accent: '#2f8f8b',
    surface: '#e8f7f6',
    order: 50,
  },
  { id: 'materiais-de-apoio', name: 'Materiais de apoio', order: 90, supportMaterial: true },
]

export const productCategories = [
  { id: 'shampoos', name: 'Shampoos', order: 10 },
  { id: 'pre-lavagem', name: 'Pré-lavagem', order: 20 },
  { id: 'condicionadores', name: 'Condicionadores', order: 30 },
  { id: 'mascaras', name: 'Máscaras', order: 40 },
  { id: 'colonias', name: 'Colônias', order: 50 },
  { id: 'perfumes', name: 'Perfumes', order: 60 },
  { id: 'aromatizadores', name: 'Aromatizadores', order: 70 },
  { id: 'finalizadores', name: 'Finalizadores', order: 80 },
  { id: 'cuidados-especiais', name: 'Cuidados especiais', order: 90 },
  { id: 'materiais-de-apoio', name: 'Materiais de apoio', order: 100 },
]

export const dilutionValues = ['Pronto uso', '1:4', '1:5', '1:12']

// A apresentação continua no produto, mas embalagens de 120 ml/120 g não fazem
// parte da navegação pública por volume nesta versão do catálogo.
export const publicVolumeFilter = ['50 ml', '300 ml', '500 ml', '500 g', '750 ml', '1 L', '5 L']

export const productTaxonomyAliases = {
  lines: {
    vanity: 'vanity-pet',
    zoom: 'zoom-pet',
    luxe: 'the-luxe',
  },
  categories: {
    shampoo: 'shampoos',
    condicionador: 'condicionadores',
    colonia: 'colonias',
    perfume: 'perfumes',
    prelavagem: 'pre-lavagem',
  },
  dilutions: {
    'pronto-uso': 'Pronto uso',
    '1/4': '1:4',
    '1/5': '1:5',
    '1/12': '1:12',
  },
}

export const getProductLine = (id) => productLines.find((line) => line.id === id)

export const getProductCategory = (id) => productCategories.find((category) => category.id === id)
