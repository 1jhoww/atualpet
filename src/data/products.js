import { getProductAsset } from './productAssets'
import { getProductCategory, getProductLine } from './productTaxonomy'
import { verifiedProductContent } from './verifiedProductContent'

// Data provisória dos lançamentos confirmados. Substituir pela data oficial
// de lançamento antes do deploy.
export const PROVISIONAL_LAUNCH_DATE = '2026-07-20'

const productCatalog = [
  // Lançamentos confirmados — volumes iguais pertencem ao mesmo registro, conforme o padrão do catálogo.
  { slug: 'mascara-acao-rapida-cereja-e-avela', name: 'Máscara de Ação Rápida Cereja e Avelã', line: 'the-luxe', category: 'mascaras', fragrance: 'Cereja e Avelã', volumes: ['1 kg'], short: 'Máscara de ação rápida com tempo de ação de 60 segundos.', description: 'Máscara de ação rápida em embalagem de 1 kg, com tempo de ação de 60 segundos.', asset: 'the-luxe/mascara-acao-rapida-cereja-avela-1kg.webp', imageWidth: 1080, imageHeight: 1446, isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE },
  { slug: 'mascara-acao-rapida-lichia-e-roma', name: 'Máscara de Ação Rápida Lichia e Romã', line: 'the-luxe', category: 'mascaras', fragrance: 'Lichia e Romã', volumes: ['1 kg'], short: 'Máscara de ação rápida com tempo de ação de 60 segundos.', description: 'Máscara de ação rápida em embalagem de 1 kg, com tempo de ação de 60 segundos.', asset: 'the-luxe/mascara-acao-rapida-lichia-roma-1kg.webp', imageWidth: 1080, imageHeight: 1446, isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE },
  { slug: 'mascara-acao-rapida-melancia', name: 'Máscara de Ação Rápida Melancia', line: 'the-luxe', category: 'mascaras', volumes: ['1 kg'], short: 'Máscara de ação rápida com tempo de ação de 60 segundos.', description: 'Máscara de ação rápida em embalagem de 1 kg, com tempo de ação de 60 segundos.', asset: 'the-luxe/mascara-acao-rapida-melancia-1kg.webp', imageWidth: 1080, imageHeight: 1446, isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE },
  { slug: 'mascara-acao-rapida-neutro', name: 'Máscara de Ação Rápida Neutro', line: 'the-luxe', category: 'mascaras', volumes: ['1 kg'], short: 'Máscara de ação rápida com tempo de ação de 60 segundos.', description: 'Máscara de ação rápida em embalagem de 1 kg, com tempo de ação de 60 segundos.', asset: 'the-luxe/mascara-acao-rapida-neutro-1kg.webp', imageWidth: 1080, imageHeight: 1446, isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE },
  { slug: 'shampoo-vanilla', name: 'Shampoo Vanilla', line: 'dream-color', category: 'shampoos', fragrance: 'Vanilla', volumes: ['1 L', '5 L'], dilution: '1:12', short: 'Shampoo com fragrância Vanilla e diluição 1:12.', description: 'Shampoo com fragrância Vanilla nas apresentações de 1 L e 5 L. Diluição 1:12.', asset: 'dream-color/shampoo-vanilla-1l-5l.webp', imageWidth: 1536, imageHeight: 1024, isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE },
  { slug: 'condicionador-vanilla', name: 'Condicionador Vanilla', line: 'dream-color', category: 'condicionadores', fragrance: 'Vanilla', volumes: ['1 L', '5 L'], short: 'Condicionador com fragrância Vanilla.', description: 'Condicionador com fragrância Vanilla nas apresentações de 1 L e 5 L.', asset: 'dream-color/condicionador-vanilla-1l-5l.webp', imageWidth: 1536, imageHeight: 1024, isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE },
  { slug: 'colonia-vanilla', name: 'Colônia Vanilla', line: 'dream-color', category: 'colonias', fragrance: 'Vanilla', volumes: ['300 ml'], short: 'Colônia com fragrância Vanilla.', description: 'Colônia com fragrância Vanilla em embalagem de 300 ml.', asset: 'dream-color/colonia-vanilla-300ml.webp', imageWidth: 610, imageHeight: 610, isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE },
  { slug: 'aromatizador-vanilla', name: 'Aromatizador Vanilla', line: 'dream-color', category: 'aromatizadores', fragrance: 'Vanilla', volumes: ['250 ml'], short: 'Aromatizador com fragrância Vanilla.', description: 'Aromatizador com fragrância Vanilla em embalagem de 250 ml.', asset: 'dream-color/aromatizador-vanilla-250ml.webp', imageWidth: 1271, imageHeight: 1800, isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE },
  { slug: 'shampoo-extra-volume', name: 'Shampoo Extra Volume', line: 'dream-color-care', category: 'shampoos', volumes: ['1 L'], dilution: '1:5', short: 'Shampoo Extra Volume da linha Dream Color Care em embalagem de 1 L e diluição 1:5.', description: 'Shampoo Extra Volume da linha Dream Color Care em embalagem de 1 L e diluição 1:5.', asset: 'dream-color-care/shampoo-extra-volume-1l.webp', imageWidth: 1344, imageHeight: 1800, isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE },
  { slug: 'shampoo-jasmim-com-amendoas', name: 'Shampoo Jasmim com Amêndoas', line: 'dream-color', category: 'shampoos', fragrance: 'Jasmim com Amêndoas', volumes: ['1 L', '5 L'], dilution: '1:12', short: 'Shampoo com fragrância Jasmim com Amêndoas e diluição 1:12.', description: 'Shampoo com fragrância Jasmim com Amêndoas nas apresentações de 1 L e 5 L. Diluição 1:12.', isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE, imagePending: true },
  { slug: 'condicionador-jasmim-com-amendoas', name: 'Condicionador Jasmim com Amêndoas', line: 'dream-color', category: 'condicionadores', fragrance: 'Jasmim com Amêndoas', volumes: ['1 L', '5 L'], short: 'Condicionador com fragrância Jasmim com Amêndoas.', description: 'Condicionador com fragrância Jasmim com Amêndoas nas apresentações de 1 L e 5 L.', isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE, imagePending: true },
  { slug: 'colonia-jasmim-com-amendoas', name: 'Colônia Jasmim com Amêndoas', line: 'dream-color', category: 'colonias', fragrance: 'Jasmim com Amêndoas', volumes: ['300 ml'], short: 'Colônia com fragrância Jasmim com Amêndoas.', description: 'Colônia com fragrância Jasmim com Amêndoas em embalagem de 300 ml.', isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE, imagePending: true },
  { slug: 'aromatizador-jasmim-com-amendoas', name: 'Aromatizador Jasmim com Amêndoas', line: 'dream-color', category: 'aromatizadores', fragrance: 'Jasmim com Amêndoas', volumes: ['250 ml'], short: 'Aromatizador com fragrância Jasmim com Amêndoas.', description: 'Aromatizador com fragrância Jasmim com Amêndoas em embalagem de 250 ml.', isLaunch: true, launchDate: PROVISIONAL_LAUNCH_DATE, imagePending: true },

  // Dream Color — diluições distintas permanecem como produtos distintos.
  { slug: 'shampoo-alecrim-do-campo-1-12-dream-color', name: 'Shampoo Alecrim do Campo 1:12', line: 'dream-color', category: 'shampoos', fragrance: 'Alecrim do Campo', volumes: ['5 L'], dilution: '1:12', asset: 'dream-color/1-12-shampoo-alecrim-do-campo-5l.webp' },
  { slug: 'shampoo-framboesa-com-chantilly-1-12-dream-color', name: 'Shampoo Framboesa com Chantilly 1:12', line: 'dream-color', category: 'shampoos', fragrance: 'Framboesa com Chantilly', volumes: ['5 L'], dilution: '1:12', asset: 'dream-color/1-12-shampoo-framboesa-5l.webp' },
  { slug: 'shampoo-pre-lavagem-1-12-dream-color', name: 'Shampoo Pré-lavagem 1:12', line: 'dream-color', category: 'pre-lavagem', volumes: ['5 L'], dilution: '1:12', asset: 'dream-color/1-12-shampoo-pre-lavagem-5l.webp' },
  { slug: 'shampoo-tutti-frutti-1-12-dream-color', name: 'Shampoo Tutti-Frutti 1:12', line: 'dream-color', category: 'shampoos', fragrance: 'Tutti-Frutti', volumes: ['5 L'], dilution: '1:12', asset: 'dream-color/1-12-shampoo-tutti-frutti-5l.webp' },
  { slug: 'shampoo-branqueador-dream-color', name: 'Shampoo Branqueador 1:12', line: 'dream-color', category: 'shampoos', volumes: ['1 L'], dilution: '1:12', asset: 'dream-color/branqueador-1l-1-12.webp' },
  { slug: 'shampoo-pre-lavagem-dream-color', name: 'Shampoo Pré-lavagem Coco e Menta', line: 'dream-color', category: 'pre-lavagem', fragrance: 'Coco e Menta Fresh', volumes: ['5 L'], dilution: '1:5', asset: 'dream-color/dream-color-sh-pre-lavagem-coco-e-menta.webp' },
  { slug: 'shampoo-tangerina-citrus-1-12-dream-color', name: 'Shampoo Tangerina Citrus 1:12', line: 'dream-color', category: 'shampoos', fragrance: 'Tangerina Citrus', volumes: ['5 L'], dilution: '1:12', asset: 'dream-color/shampoo-dream-color-tangerina-citrus-112.webp' },
  { slug: 'shampoo-neutro-alecrim-do-campo-dream-color', name: 'Shampoo Neutro Alecrim do Campo', line: 'dream-color', category: 'shampoos', fragrance: 'Alecrim do Campo', volumes: ['1 L', '5 L'], dilution: '1:5', asset: 'dream-color/shampoo-neutro-alecrim-do-campo-1-e-5-l.webp' },
  { slug: 'shampoo-neutro-framboesa-com-chantilly-dream-color', name: 'Shampoo Neutro Framboesa com Chantilly', line: 'dream-color', category: 'shampoos', fragrance: 'Framboesa com Chantilly', volumes: ['1 L', '5 L'], dilution: '1:5', asset: 'dream-color/shampoo-neutro-framboesa-com-chantilly-1e-5l.webp' },
  { slug: 'shampoo-neutro-tangerina-citrus-dream-color', name: 'Shampoo Neutro Tangerina Citrus', line: 'dream-color', category: 'shampoos', fragrance: 'Tangerina Citrus', volumes: ['1 L', '5 L'], dilution: '1:5', asset: 'dream-color/shampoo-neutro-tangerina-citrus-e-5-l.webp' },
  { slug: 'shampoo-neutro-tutti-frutti-dream-color', name: 'Shampoo Neutro Tutti-Frutti', line: 'dream-color', category: 'shampoos', fragrance: 'Tutti-Frutti', volumes: ['1 L', '5 L'], dilution: '1:5', asset: 'dream-color/shampoo-neutro-tutti-frutti-1-e-5-l.webp' },
  { slug: 'condicionador-alecrim-do-campo-dream-color', name: 'Condicionador Neutro Alecrim do Campo', line: 'dream-color', category: 'condicionadores', fragrance: 'Alecrim do Campo', volumes: ['1 L', '5 L'], asset: 'dream-color/condicionador-neutro-alecrim-do-campo-1-e-5l.webp' },
  { slug: 'condicionador-framboesa-com-chantilly-dream-color', name: 'Condicionador Neutro Framboesa com Chantilly', line: 'dream-color', category: 'condicionadores', fragrance: 'Framboesa com Chantilly', volumes: ['1 L', '5 L'], asset: 'dream-color/condicionador-neutro-framboesa-com-chantilly-5e-1-l.webp' },
  { slug: 'condicionador-tangerina-dream-color', name: 'Condicionador Neutro Tangerina Citrus', line: 'dream-color', category: 'condicionadores', fragrance: 'Tangerina Citrus', volumes: ['1 L', '5 L'], asset: 'dream-color/condicionador-neutro-tangerina-citrus-1-e-l.webp' },
  { slug: 'condicionador-tutti-frutti-dream-color', name: 'Condicionador Neutro Tutti-Frutti', line: 'dream-color', category: 'condicionadores', fragrance: 'Tutti-Frutti', volumes: ['1 L', '5 L'], asset: 'dream-color/condicionador-neutro-tutti-frutti-5-e-1-l.webp' },
  { slug: 'mascara-bambu-dream-color', name: 'Máscara de Hidratação Bambu', line: 'dream-color', category: 'mascaras', volumes: ['500 g'], asset: 'dream-color/dream-color-mascara-bambu-2048x2048.webp' },
  { slug: 'colonia-alecrim-do-campo-dream-color', name: 'Colônia Alecrim do Campo', line: 'dream-color', category: 'colonias', fragrance: 'Alecrim do Campo', volumes: ['300 ml'], asset: 'dream-color/colonia-alecrim-do-campo.webp' },
  { slug: 'colonia-framboesa-com-chantilly-dream-color', name: 'Colônia Framboesa com Chantilly', line: 'dream-color', category: 'colonias', fragrance: 'Framboesa com Chantilly', volumes: ['300 ml'], asset: 'dream-color/colonia-framboesa-com-chantilly-dream-color-line.webp' },
  { slug: 'colonia-tangerina-citrus-dream-color', name: 'Colônia Tangerina Citrus', line: 'dream-color', category: 'colonias', fragrance: 'Tangerina Citrus', volumes: ['300 ml'], asset: 'dream-color/colonia-tangerina-citrus-dream-color-line.webp' },
  { slug: 'colonia-tutti-frutti-dream-color', name: 'Colônia Tutti-Frutti', line: 'dream-color', category: 'colonias', fragrance: 'Tutti-Frutti', volumes: ['300 ml'], asset: 'dream-color/colonia-tutti-frutti-dream-color-line.webp' },
  { slug: 'difusor-alecrim-do-campo-dream-color', name: 'Difusor de Ambiente Alecrim do Campo', line: 'dream-color', category: 'aromatizadores', fragrance: 'Alecrim do Campo', asset: 'dream-color/aromatizador-de-ambientes-alecrim-do-campo-dream-color-line.webp' },
  { slug: 'difusor-framboesa-dream-color', name: 'Difusor de Ambiente Framboesa', line: 'dream-color', category: 'aromatizadores', fragrance: 'Framboesa', asset: 'dream-color/aromatizador-de-ambientes-framboesa.webp' },
  { slug: 'difusor-tangerina-citrus-dream-color', name: 'Difusor de Ambiente Tangerina Citrus', line: 'dream-color', category: 'aromatizadores', fragrance: 'Tangerina Citrus', asset: 'dream-color/aromatizador-de-ambientes-tangerina-citrus-dream-color-line.webp' },
  { slug: 'difusor-tutti-frutti-dream-color', name: 'Difusor de Ambiente Tutti-Frutti', line: 'dream-color', category: 'aromatizadores', fragrance: 'Tutti-Frutti', asset: 'dream-color/aromatizador-de-ambientes-tutti-frutti-dream-color-line.webp' },

  // Dream Color Care é mantida como linha própria no catálogo.
  { slug: 'shampoo-propolis-dream-color-care', name: 'Shampoo Própolis', line: 'dream-color-care', category: 'cuidados-especiais', productType: 'shampoos', volumes: ['500 ml', '1 L'], asset: 'dream-color-care/shampoo-dream-color-line-care-propolis.webp' },
  { slug: 'power-puff-spray-de-volume-dream-color-care', name: 'Power Puff Spray de Volume', line: 'dream-color-care', category: 'cuidados-especiais', productType: 'finalizadores', volumes: ['300 ml'], asset: 'dream-color-care/spray-de-volume-dream-color-line-care-power-puff.webp' },

  // The Luxe.
  { slug: 'shampoo-cereja-avela-the-luxe', name: 'Shampoo Cereja & Avelã', line: 'the-luxe', category: 'shampoos', fragrance: 'Cereja & Avelã', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/shampoo-cereja-avela-5l.webp' },
  { slug: 'shampoo-limpeza-profunda-coco-the-luxe', name: 'Shampoo Limpeza Profunda Coco', line: 'the-luxe', category: 'pre-lavagem', productType: 'shampoos', fragrance: 'Coco', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/shampoo-limpeza-profunda-coco.webp' },
  { slug: 'shampoo-limpeza-profunda-talco-the-luxe', name: 'Shampoo Limpeza Profunda Talco', line: 'the-luxe', category: 'pre-lavagem', productType: 'shampoos', fragrance: 'Talco', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/shampoo-limpeza-profunda-talco.webp' },
  { slug: 'shampoo-melancia-the-luxe', name: 'Shampoo Melancia', line: 'the-luxe', category: 'shampoos', fragrance: 'Melancia', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/shampoo-melancia-the-luxe.webp' },
  { slug: 'shampoo-neutro-the-luxe', name: 'Shampoo Neutro', line: 'the-luxe', category: 'shampoos', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/shampoo-neutro-the-luxe-1.webp' },
  { slug: 'shampoo-peles-sensiveis-face-filhotes-the-luxe', name: 'Shampoo Peles Sensíveis e Face — Filhotes', line: 'the-luxe', category: 'cuidados-especiais', productType: 'shampoos', volumes: ['1 L'], dilution: '1:5', asset: 'the-luxe/shampoo-the-luxe-peles-sensiveis-e-face-filhotes.webp' },
  { slug: 'shampoo-branqueador-the-luxe', name: 'Shampoo Branqueador', line: 'the-luxe', category: 'shampoos', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/shampoo-theluixe-braqueador.webp' },
  { slug: 'shampoo-lichia-roma-the-luxe', name: 'Shampoo Lichia & Romã', line: 'the-luxe', category: 'shampoos', fragrance: 'Lichia & Romã', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/shmpoolichiaeroma.webp' },
  { slug: 'condicionador-cereja-avela-the-luxe', name: 'Condicionador Cereja & Avelã', line: 'the-luxe', category: 'condicionadores', fragrance: 'Cereja & Avelã', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/condicionador-cereja-avela-hidratacao-reparadora.webp' },
  { slug: 'condicionador-lichia-roma-the-luxe', name: 'Condicionador Lichia & Romã', line: 'the-luxe', category: 'condicionadores', fragrance: 'Lichia & Romã', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/condicionador-lichia-roma-hidratacao-fortalecedora.webp' },
  { slug: 'condicionador-melancia-the-luxe', name: 'Condicionador Melancia', line: 'the-luxe', category: 'condicionadores', fragrance: 'Melancia', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/condicionador-melancia-hidratacao-revitalizante.webp' },
  { slug: 'condicionador-neutro-the-luxe', name: 'Condicionador Neutro', line: 'the-luxe', category: 'condicionadores', volumes: ['5 L'], dilution: '1:5', asset: 'the-luxe/condicionador-neutro-hidratacao-equilibrante.webp' },
  { slug: 'condicionador-neutro-pronto-uso-the-luxe', name: 'Condicionador Neutro Pronto Uso', line: 'the-luxe', category: 'condicionadores', volumes: ['5 L'], dilution: 'Pronto uso', asset: 'the-luxe/condicionador-the-luxe-neutro-pronto-uso-5l.webp' },
  { slug: 'mascara-neutro-500g-the-luxe', name: 'Máscara de Hidratação Neutro', line: 'the-luxe', category: 'mascaras', volumes: ['500 g'], asset: 'the-luxe/ascara-de-hidratacao-neutro-500g.webp' },
  { slug: 'mascara-cereja-avela-the-luxe', name: 'Máscara de Hidratação Cereja & Avelã', line: 'the-luxe', category: 'mascaras', fragrance: 'Cereja & Avelã', volumes: ['5 L'], asset: 'the-luxe/mascara-de-hidratacao-cereja-avela-the-luxe.webp' },
  { slug: 'mascara-hidratacao-intensa-the-luxe', name: 'Máscara de Hidratação Intensa', line: 'the-luxe', category: 'mascaras', volumes: ['500 g'], asset: 'the-luxe/mascara-de-hidratacao-intensa-the-luxe.webp' },
  { slug: 'mascara-lichia-roma-the-luxe', name: 'Máscara de Hidratação Lichia & Romã', line: 'the-luxe', category: 'mascaras', fragrance: 'Lichia & Romã', volumes: ['5 L'], asset: 'the-luxe/mascara-de-hidratacao-lichia-roma-the-luxe.webp' },
  { slug: 'mascara-melancia-the-luxe', name: 'Máscara de Hidratação Melancia', line: 'the-luxe', category: 'mascaras', fragrance: 'Melancia', volumes: ['5 L'], asset: 'the-luxe/mascara-de-hidratacao-melancia-the-luxe.webp' },
  { slug: 'colonia-one-the-luxe', name: 'Colônia One', line: 'the-luxe', category: 'colonias', fragrance: 'Angel', volumes: ['500 ml'], asset: 'the-luxe/colonia-one-inspirada-em-angel.webp' },
  { slug: 'colonia-two-the-luxe', name: 'Colônia Two', line: 'the-luxe', category: 'colonias', fragrance: 'Lady Million', volumes: ['500 ml'], asset: 'the-luxe/colonia-two-inspirada-em-lady-million.webp' },
  { slug: 'colonia-three-the-luxe', name: 'Colônia Three', line: 'the-luxe', category: 'colonias', fragrance: 'Olympea', volumes: ['500 ml'], asset: 'the-luxe/colonia-three-inspirada-em-olympea.webp' },
  { slug: 'colonia-four-the-luxe', name: 'Colônia Four', line: 'the-luxe', category: 'colonias', fragrance: 'Flor de Cerejeira', volumes: ['500 ml'], asset: 'the-luxe/colonia-four-inspirada-em-flor-de-cerejeira.webp' },
  { slug: 'colonia-five-the-luxe', name: 'Colônia Five', line: 'the-luxe', category: 'colonias', fragrance: 'Safira', volumes: ['500 ml'], asset: 'the-luxe/colonia-five-inspirada-em-safira.webp' },
  { slug: 'colonia-six-the-luxe', name: 'Colônia Six', line: 'the-luxe', category: 'colonias', fragrance: 'Babaloo Botti', volumes: ['500 ml'], asset: 'the-luxe/colonia-six-inspirada-em-babaloo-botti.webp' },
  { slug: 'colonia-seven-the-luxe', name: 'Colônia Seven', line: 'the-luxe', category: 'colonias', fragrance: 'Idole Intense', volumes: ['500 ml'], asset: 'the-luxe/colonia-seven-inspirada-em-idole-intense-1.webp' },
  { slug: 'colonia-eight-the-luxe', name: 'Colônia Eight', line: 'the-luxe', category: 'colonias', fragrance: 'Allure Sport', volumes: ['500 ml'], asset: 'the-luxe/colonia-eight-inspirada-em-allure-sport.webp' },
  { slug: 'colonia-nine-the-luxe', name: 'Colônia Nine', line: 'the-luxe', category: 'colonias', fragrance: 'Pool Men Sport', volumes: ['500 ml'], asset: 'the-luxe/colonia-nine-inspirada-em-pool-men-sport.webp' },
  { slug: 'colonia-ten-the-luxe', name: 'Colônia Ten', line: 'the-luxe', category: 'colonias', fragrance: 'Ferrari Black', volumes: ['500 ml'], asset: 'the-luxe/colonia-ten-inspirada-em-ferrari-black.webp' },
  { slug: 'colonia-cereja-avela-the-luxe', name: 'Colônia Cereja & Avelã', line: 'the-luxe', category: 'colonias', fragrance: 'Cereja & Avelã', volumes: ['500 ml'], asset: 'the-luxe/colonia-the-luxe-cereja-avela-the-luxe.webp' },
  { slug: 'colonia-lichia-roma-the-luxe', name: 'Colônia Lichia & Romã', line: 'the-luxe', category: 'colonias', fragrance: 'Lichia & Romã', volumes: ['500 ml'], asset: 'the-luxe/colonia-the-luxe-lichia-roma-the-luxe.webp' },
  { slug: 'colonia-melancia-the-luxe', name: 'Colônia Melancia', line: 'the-luxe', category: 'colonias', fragrance: 'Melancia', volumes: ['500 ml'], asset: 'the-luxe/colonia-the-luxe-melancia-the-luxe.webp' },
  { slug: 'colonia-morango-the-luxe', name: 'Colônia Morango', line: 'the-luxe', category: 'colonias', fragrance: 'Morango', volumes: ['500 ml'], asset: 'the-luxe/colonia-the-luxe-morango-the-luxe.webp' },
  { slug: 'banho-a-seco-the-luxe', name: 'Banho a Seco', line: 'the-luxe', category: 'cuidados-especiais', volumes: ['500 ml'], dilution: 'Pronto uso', asset: 'the-luxe/banho-a-seco-the-luxe.webp' },
  { slug: 'fluido-finalizador-argan-the-luxe', name: 'Fluido Finalizador Argan', line: 'the-luxe', category: 'finalizadores', volumes: ['120 ml'], dilution: 'Pronto uso', asset: 'the-luxe/fluido-finalizador-argan.webp' },
  { slug: 'hidratante-patinhas-the-luxe', name: 'Hidratante para Patinhas', line: 'the-luxe', category: 'cuidados-especiais', volumes: ['120 g'], asset: 'the-luxe/hidratante-de-patinhas-the-luxe.webp' },
  { slug: 'leave-in-finalizador-the-luxe', name: 'Leave-in Finalizador', line: 'the-luxe', category: 'finalizadores', volumes: ['500 ml'], asset: 'the-luxe/leave-in-finalizador-the-luxe.webp' },
  { slug: 'limpa-orelhas-the-luxe', name: 'Limpa Orelhas', line: 'the-luxe', category: 'cuidados-especiais', volumes: ['500 ml'], dilution: 'Pronto uso', asset: 'the-luxe/limpa-orelhas-the-luxe.webp' },

  // Vanity Pet — a marca usa nomes comerciais próprios dentro da categoria Perfumes.
  { slug: 'perfume-baby-vanity-pet', name: 'Baby', line: 'vanity-pet', category: 'perfumes', fragrance: 'Baby', volumes: ['50 ml', '500 ml'], asset: 'vanity/baby.webp' },
  { slug: 'colonia-black-cherry-vanity-pet', name: 'Black Cherry', line: 'vanity-pet', category: 'perfumes', fragrance: 'Black Cherry', volumes: ['50 ml', '500 ml'], asset: 'vanity/black-cherry.webp' },
  { slug: 'colonia-black-vanity-pet', name: 'Black', line: 'vanity-pet', category: 'perfumes', fragrance: 'Black', volumes: ['50 ml', '500 ml'], asset: 'vanity/black-vanity.webp' },
  { slug: 'colonia-brown-vanity-pet', name: 'Brown', line: 'vanity-pet', category: 'perfumes', fragrance: 'Brown', volumes: ['50 ml', '500 ml'], asset: 'vanity/brown.webp' },
  { slug: 'colonia-choc-vanity-pet', name: 'Choc', line: 'vanity-pet', category: 'perfumes', fragrance: 'Choc', volumes: ['50 ml', '500 ml'], asset: 'vanity/choc.webp' },
  { slug: 'colonia-citric-vanity-pet', name: 'Citric', line: 'vanity-pet', category: 'perfumes', fragrance: 'Citric', volumes: ['50 ml', '500 ml'], asset: 'vanity/citric.webp' },
  { slug: 'colonia-explosion-vanity-pet', name: 'Explosion', line: 'vanity-pet', category: 'perfumes', fragrance: 'Explosion', volumes: ['50 ml', '500 ml'], asset: 'vanity/explosion.webp' },
  { slug: 'colonia-flowers-vanity-pet', name: 'Flowers', line: 'vanity-pet', category: 'perfumes', fragrance: 'Flowers', volumes: ['50 ml', '500 ml'], asset: 'vanity/flowers.webp' },
  { slug: 'colonia-glamour-vanity-pet', name: 'Glamour', line: 'vanity-pet', category: 'perfumes', fragrance: 'Glamour', volumes: ['50 ml', '500 ml'], asset: 'vanity/glamour.webp' },
  { slug: 'colonia-gold-vanity-pet', name: 'Gold', line: 'vanity-pet', category: 'perfumes', fragrance: 'Gold', volumes: ['50 ml', '500 ml'], asset: 'vanity/gold.webp' },
  { slug: 'colonia-illusion-vanity-pet', name: 'Illusion', line: 'vanity-pet', category: 'perfumes', fragrance: 'Illusion', volumes: ['50 ml', '500 ml'], asset: 'vanity/illusion.webp' },
  { slug: 'colonia-jasmim-vanity-pet', name: 'Jasmim', line: 'vanity-pet', category: 'perfumes', fragrance: 'Jasmim', volumes: ['50 ml', '500 ml'], asset: 'vanity/jasmim.webp' },
  { slug: 'colonia-mango-vanity-pet', name: 'Mango', line: 'vanity-pet', category: 'perfumes', fragrance: 'Mango', volumes: ['50 ml', '500 ml'], asset: 'vanity/mango.webp' },
  { slug: 'colonia-night-vanity-pet', name: 'Night', line: 'vanity-pet', category: 'perfumes', fragrance: 'Night', volumes: ['50 ml', '500 ml'], asset: 'vanity/night.webp' },
  { slug: 'colonia-strawberry-vanity-pet', name: 'Strawberry', line: 'vanity-pet', category: 'perfumes', fragrance: 'Strawberry', volumes: ['50 ml', '500 ml'], asset: 'vanity/strawberry.webp' },
  { slug: 'colonia-style-g-vanity-pet', name: 'Style G', line: 'vanity-pet', category: 'perfumes', fragrance: 'Style G', volumes: ['50 ml', '500 ml'], asset: 'vanity/style-g.webp' },
  { slug: 'colonia-sweet-vanity-pet', name: 'Sweet', line: 'vanity-pet', category: 'perfumes', fragrance: 'Sweet', volumes: ['50 ml', '500 ml'], asset: 'vanity/sweet.webp' },
  { slug: 'colonia-watermelon-vanity-pet', name: 'Watermelon', line: 'vanity-pet', category: 'perfumes', fragrance: 'Watermelon', volumes: ['50 ml', '500 ml'], asset: 'vanity/watermelon.webp' },
  { slug: 'colonia-you-vanity-pet', name: 'You', line: 'vanity-pet', category: 'perfumes', fragrance: 'You', volumes: ['50 ml', '500 ml'], dilution: 'Pronto uso', asset: 'vanity/you.webp' },
  { slug: 'display-perfumes-vanity-pet', name: 'Display de Perfumes Vanity', line: 'vanity-pet', category: 'materiais-de-apoio', supportMaterial: true, asset: 'vanity/display-perfume-vanity-ultra-premium.webp' },

  // Zoom.
  { slug: 'shampoo-neutro-zoom', name: 'Shampoo Neutro', line: 'zoom-pet', category: 'shampoos', volumes: ['750 ml', '5 L'], variants: [{ volume: '750 ml', dilution: 'Pronto uso' }, { volume: '5 L', dilution: '1:4' }], asset: 'zoom/shampoo-neutro-vpsom.webp' },
  { slug: 'shampoo-neutro-morango-zoom', name: 'Shampoo Neutro Morango', line: 'zoom-pet', category: 'shampoos', fragrance: 'Morango', volumes: ['750 ml', '5 L'], variants: [{ volume: '750 ml', dilution: 'Pronto uso' }, { volume: '5 L', dilution: '1:4' }], asset: 'zoom/shampoo-neutro-morango2vp.webp' },
  { slug: 'shampoo-neutro-filhotes-zoom', name: 'Shampoo Neutro Filhotes', line: 'zoom-pet', category: 'shampoos', volumes: ['750 ml', '5 L'], variants: [{ volume: '750 ml', dilution: 'Pronto uso' }, { volume: '5 L', dilution: '1:4' }], asset: 'zoom/shampoo-neutro-filhotes-zoom.webp' },
  { slug: 'shampoo-pelos-claros-zoom', name: 'Shampoo Pelos Claros', line: 'zoom-pet', category: 'shampoos', volumes: ['750 ml', '5 L'], variants: [{ volume: '750 ml', dilution: 'Pronto uso' }, { volume: '5 L', dilution: '1:4' }], asset: 'zoom/pelos-claros.webp' },
  { slug: 'shampoo-pelos-escuros-zoom', name: 'Shampoo Pelos Escuros', line: 'zoom-pet', category: 'shampoos', volumes: ['750 ml', '5 L'], variants: [{ volume: '750 ml', dilution: 'Pronto uso' }, { volume: '5 L', dilution: '1:4' }], asset: 'zoom/pelosescuros-zoom-atualpet.webp' },
  { slug: 'shampoo-oleo-neem-zoom', name: 'Shampoo Óleo de Neem', line: 'zoom-pet', category: 'shampoos', volumes: ['750 ml', '5 L'], variants: [{ volume: '750 ml', dilution: 'Pronto uso' }, { volume: '5 L', dilution: '1:4' }], asset: 'zoom/shampoo-oleo-de-neem-zoom.webp' },
  { slug: 'shampoo-pre-lavagem-zoom', name: 'Shampoo Pré-lavagem', line: 'zoom-pet', category: 'pre-lavagem', volumes: ['5 L'], dilution: '1:4', asset: 'zoom/shampoo-pre-lavagemzoom.webp' },
  { slug: 'shampoo-branqueador-zoom', name: 'Shampoo Branqueador', line: 'zoom-pet', category: 'shampoos', volumes: ['750 ml'], dilution: 'Pronto uso', asset: 'zoom/zoom-750ml-sh-branqueador-2048x2048.webp' },
  { slug: 'condicionador-zoom', name: 'Condicionador', line: 'zoom-pet', category: 'condicionadores', volumes: ['750 ml', '5 L'], variants: [{ volume: '750 ml', dilution: 'Pronto uso' }, { volume: '5 L', dilution: 'Pronto uso' }], asset: 'zoom/condicionador-zoom.webp' },

  // Materiais de apoio ficam explicitamente separados dos cosméticos.
  { slug: 'almotolia-atual-pet', name: 'Almotolia Atual Pet', line: 'materiais-de-apoio', category: 'materiais-de-apoio', supportMaterial: true, asset: 'materiais/almotolia.webp' },
  { slug: 'avental-atual-pet', name: 'Avental Atual Pet', line: 'materiais-de-apoio', category: 'materiais-de-apoio', supportMaterial: true, asset: 'materiais/avenal2.webp' },
  { slug: 'jaleco-atual-pet', name: 'Jaleco Atual Pet', line: 'materiais-de-apoio', category: 'materiais-de-apoio', supportMaterial: true, asset: 'materiais/jaleco.webp' },
  { slug: 'valvula-pump-galao-5l', name: 'Válvula Pump para Galão de 5 L', line: 'materiais-de-apoio', category: 'materiais-de-apoio', supportMaterial: true, asset: 'materiais/valvula-pump-para-galao-5l.webp' },
]

const lineOrder = (product) => getProductLine(product.line)?.order ?? 999
const categoryOrder = (product) => getProductCategory(product.category)?.order ?? 999

export const products = productCatalog
  .map((product, index) => ({
    id: product.slug,
    short: '',
    description: '',
    benefits: [],
    indication: '',
    usage: '',
    dilution: '',
    fragrance: '',
    volumes: [],
    variants: [],
    gallery: [],
    featured: false,
    isLaunch: false,
    launchDate: '',
    active: true,
    supportMaterial: false,
    seo: { title: '', description: '' },
    sourceUrl: '',
    ...product,
    ...verifiedProductContent[product.slug],
    image: getProductAsset(product.asset),
    imageWidth: product.imageWidth ?? (product.asset ? 1080 : 700),
    imageHeight: product.imageHeight ?? (product.asset ? 1080 : 800),
    sourceOrder: index,
    dilutions: [...new Set([product.dilution, ...(product.variants ?? []).map((variant) => variant.dilution)].filter(Boolean))],
  }))
  .sort((a, b) => Number(a.supportMaterial) - Number(b.supportMaterial)
    || lineOrder(a) - lineOrder(b)
    || categoryOrder(a) - categoryOrder(b)
    || a.name.localeCompare(b.name, 'pt-BR'))
  .map((product, index) => ({ ...product, order: index + 1 }))

export const getProduct = (slug) => products.find((product) => product.slug === slug && product.active)

export const compareLaunchDate = (a, b) => (Date.parse(b.launchDate) || 0) - (Date.parse(a.launchDate) || 0)
  || a.sourceOrder - b.sourceOrder
