import aboutDogBath from '../assets/about/about-dog-bath.webp'
import aboutGroomerTrimming from '../assets/about/about-groomer-trimming.webp'
import aboutMissionCare from '../assets/about/about-mission-care.webp'
import aboutSalonCare from '../assets/about/about-salon-care.webp'
import aboutTowelCare from '../assets/about/about-towel-care.webp'
import aboutValuesTrust from '../assets/about/about-values-trust.webp'
import aboutVisionProfessional from '../assets/about/about-vision-professional.webp'
import { company } from './company'

export const aboutContent = {
  hero: {
    eyebrow: 'A Atual Pet',
    title: 'Cuidado profissional em cada detalhe.',
    description: 'Uma marca brasileira de cosméticos profissionais para pets, presente em diferentes etapas da rotina de banho e tosa.',
  },
  whoWeAre: {
    eyebrow: 'Quem somos',
    title: 'Uma marca dedicada ao cuidado profissional.',
    paragraphs: [
      'A Atual Pet reúne cosméticos profissionais para pets voltados à higiene, estética, perfumaria e cuidado animal. Seu portfólio acompanha profissionais, pet shops e centros de estética em diferentes momentos da rotina.',
      company.distributionModel,
    ],
    highlights: [
      'Marca brasileira de cosméticos profissionais para pets',
      'Linhas para diferentes etapas do cuidado',
      'Comercialização por distribuidores parceiros',
    ],
  },
  history: {
    eyebrow: 'Nossa história',
    title: 'Uma marca apoiada por uma estrutura responsável.',
    paragraphs: [
      'A Atual Pet é uma marca brasileira de cosméticos profissionais para pets, com um portfólio voltado à higiene, estética, perfumaria e cuidado animal.',
      'A Orion Ind e Com de Cosméticos Ltda. é a empresa responsável pela Atual Pet e fabrica os produtos apresentados pela marca. A comercialização acontece por meio de distribuidores parceiros.',
    ],
    image: aboutGroomerTrimming,
    imageWidth: 1800,
    imageHeight: 1200,
    imageAlt: 'Profissional realizando o acabamento da pelagem de um cachorro',
  },
  careJourney: {
    label: 'Antes, durante e depois do banho',
    items: [
      {
        id: 'before',
        eyebrow: 'Antes do banho',
        title: 'Cada cuidado começa entendendo o que a rotina pede.',
        description: 'Pelagem, etapa do serviço e intenção de acabamento orientam a escolha entre diferentes linhas e apresentações.',
        image: aboutSalonCare,
        imageWidth: 1600,
        imageHeight: 1067,
        imageAlt: 'Profissional preparando um cachorro para o cuidado da pelagem',
      },
      {
        id: 'during-after',
        eyebrow: 'Durante e depois',
        title: 'Técnica, cosmético e atenção formam a experiência.',
        description: 'Da higiene à finalização, o portfólio Atual Pet acompanha o trabalho profissional e valoriza o resultado percebido nos detalhes.',
        image: aboutDogBath,
        imageWidth: 1600,
        imageHeight: 1068,
        imageAlt: 'Cachorro de pelagem molhada recebendo cuidados durante o banho',
        cta: { label: 'Conheça o portfólio', url: '/produtos' },
      },
    ],
  },
  commitment: {
    eyebrow: 'Nosso compromisso',
    title: 'Qualidade percebida em todas as etapas.',
    items: [
      { id: 'portfolio', icon: 'portfolio', title: 'Portfólio profissional', description: 'Soluções organizadas para limpeza, tratamento, perfumaria e acabamento.' },
      { id: 'clarity', icon: 'clarity', title: 'Clareza e segurança', description: 'Informações de uso devem seguir os rótulos e materiais técnicos oficiais.' },
      { id: 'partners', icon: 'partners', title: 'Rede parceira', description: 'Produtos comercializados por distribuidores parceiros em diferentes regiões.' },
      { id: 'lines', icon: 'lines', title: 'Linhas complementares', description: 'Quatro identidades para diferentes rotinas, públicos e propostas.' },
    ],
  },
  principles: {
    eyebrow: 'O que orienta a Atual Pet',
    title: 'Direção clara para evoluir com consistência.',
    description: 'Missão, visão e valores orientam a forma como a marca organiza seu portfólio e constrói relações profissionais.',
    items: [
      {
        id: 'mission',
        type: 'statement',
        number: '01',
        title: 'Missão',
        description: 'Oferecer cosméticos profissionais que acompanhem a rotina de higiene, estética e perfumaria, apoiem profissionais do mercado pet e contribuam para uma experiência de cuidado atenta ao bem-estar de cada animal.',
        image: aboutMissionCare,
        imageWidth: 1800,
        imageHeight: 1201,
        imageAlt: 'Profissional realizando o banho cuidadoso de um cachorro',
      },
      {
        id: 'vision',
        type: 'statement',
        number: '02',
        title: 'Visão',
        description: 'Ampliar com consistência a presença da Atual Pet no mercado profissional, fortalecendo relações com distribuidores e profissionais e evoluindo suas linhas e a experiência da marca.',
        image: aboutVisionProfessional,
        imageWidth: 1201,
        imageHeight: 1800,
        imageAlt: 'Groomer trabalhando no acabamento de um poodle em um salão profissional',
      },
      {
        id: 'values',
        type: 'values',
        number: '03',
        title: 'Valores',
        description: 'Atitudes que orientam as escolhas, as relações e a experiência construída pela Atual Pet.',
        image: aboutValuesTrust,
        imageWidth: 1800,
        imageHeight: 1201,
        imageAlt: 'Cachorro tranquilo enquanto recebe uma escovação cuidadosa',
        items: [
          { title: 'Cuidado responsável', description: 'Considerar o bem-estar animal e a realidade da rotina profissional nas escolhas de portfólio, comunicação e atendimento.' },
          { title: 'Respeito ao profissional', description: 'Valorizar a técnica, o conhecimento e o trabalho de groomers, banhistas, pet shops e demais profissionais do setor.' },
          { title: 'Qualidade em cada detalhe', description: 'Buscar consistência na apresentação das linhas, na experiência de uso, no atendimento e na relação com o mercado.' },
          { title: 'Parcerias transparentes', description: 'Construir relações comerciais claras, próximas e responsáveis com distribuidores, clientes e profissionais.' },
          { title: 'Evolução constante', description: 'Ouvir o mercado, acompanhar novas necessidades e aprimorar continuamente as linhas e a experiência da marca.' },
        ],
      },
    ],
  },
  finalCta: {
    eyebrow: 'Próximo passo',
    title: 'Escolhas profissionais para cada etapa do cuidado.',
    description: 'Conheça as linhas Atual Pet ou fale com nossa equipe para encontrar o canal ideal de atendimento.',
    primaryLabel: 'Conheça nossas linhas',
    primaryUrl: '/produtos',
    secondaryLabel: 'Fale com a equipe',
    secondaryUrl: '/contato',
    image: aboutTowelCare,
    imageWidth: 1135,
    imageHeight: 1800,
    imageAlt: 'Cachorro de pelagem molhada sendo cuidadosamente seco com uma toalha',
  },
}
