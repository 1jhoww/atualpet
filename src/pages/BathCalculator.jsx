import { Calculator, Droplets, FlaskConical, Gauge, Package, PawPrint } from 'lucide-react'
import { useId, useState } from 'react'
import dreamColorLogo from '../assets/lines/logos/dream-color-logo.png'
import theLuxeLogo from '../assets/lines/logos/the-luxe-logo.png'
import zoomLogo from '../assets/lines/logos/zoom-logo.png'
import Breadcrumbs from '../components/Breadcrumbs'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import {
  bathAnimalSizes,
  bathCalculatorLines,
  bathVolumeUnits,
  getBathAnimalSize,
  getBathCalculatorLine,
  getBathCalculatorOption,
} from '../data/bathCalculator'
import {
  calculateBathCosts,
  calculateFinalVolumeMl,
  formatCurrency,
  normalizeVolumeToMl,
  parseBrazilianCurrency,
  parseBrazilianNumber,
} from '../utils/bathCalculator'
import styles from './BathCalculator.module.css'

const formatVolume = (volumeMl) => volumeMl >= 1000
  ? `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(volumeMl / 1000)} L`
  : `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(volumeMl)} ml`

const formatInputNumber = (value) => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 3 }).format(value)

const getDefaultVolume = (option) => option.volumePresets[0]

const lineLogos = {
  'dream-color': dreamColorLogo,
  'the-luxe': theLuxeLogo,
  zoom: zoomLogo,
}

export default function BathCalculator() {
  const priceHintId = useId()
  const priceErrorId = useId()
  const volumeHintId = useId()
  const volumeErrorId = useId()
  const initialLine = bathCalculatorLines[0]
  const initialOption = initialLine.options[0]
  const initialVolume = getDefaultVolume(initialOption)
  const [lineId, setLineId] = useState(initialLine.id)
  const [optionId, setOptionId] = useState(initialOption.id)
  const [volumeInput, setVolumeInput] = useState(String(initialVolume.amount))
  const [volumeUnit, setVolumeUnit] = useState(initialVolume.unit)
  const [volumeTouched, setVolumeTouched] = useState(false)
  const [priceInput, setPriceInput] = useState('')
  const [priceTouched, setPriceTouched] = useState(false)
  const [sizeId, setSizeId] = useState(bathAnimalSizes[0].id)

  const selectedLine = getBathCalculatorLine(lineId)
  const selectedOption = getBathCalculatorOption(lineId, optionId) || selectedLine.options[0]
  const selectedSize = getBathAnimalSize(sizeId)
  const volumeAmount = parseBrazilianNumber(volumeInput)
  const packageVolumeMl = normalizeVolumeToMl(volumeAmount, volumeUnit)
  const validVolume = Number.isFinite(packageVolumeMl) && packageVolumeMl > 0
  const finalVolumeMl = validVolume ? calculateFinalVolumeMl(packageVolumeMl, selectedOption.dilution) : Number.NaN
  const volumeError = volumeTouched && !validVolume
    ? volumeInput.trim() ? 'Informe uma quantidade numérica maior que zero.' : 'Informe o volume que deseja calcular.'
    : ''
  const price = parseBrazilianCurrency(priceInput)
  const validPrice = Number.isFinite(price) && price > 0
  const priceError = priceTouched && !validPrice
    ? priceInput.trim() ? 'Informe um valor maior que zero.' : 'Informe quanto você pagou pelo produto.'
    : ''

  const result = calculateBathCosts({
    price,
    packageVolumeMl,
    dilution: selectedOption.dilution,
    usageMl: selectedSize.usageMl,
  })

  const handleLineChange = (nextLineId) => {
    const nextLine = getBathCalculatorLine(nextLineId)
    const nextOption = nextLine.options[0]
    const nextVolume = getDefaultVolume(nextOption)
    setLineId(nextLineId)
    setOptionId(nextOption.id)
    setVolumeInput(String(nextVolume.amount))
    setVolumeUnit(nextVolume.unit)
    setVolumeTouched(false)
  }

  const handleOptionChange = (nextOptionId) => {
    const nextOption = getBathCalculatorOption(lineId, nextOptionId)
    const nextVolume = getDefaultVolume(nextOption)
    setOptionId(nextOptionId)
    setVolumeInput(String(nextVolume.amount))
    setVolumeUnit(nextVolume.unit)
    setVolumeTouched(false)
  }

  const applyVolumePreset = (preset) => {
    setVolumeInput(String(preset.amount))
    setVolumeUnit(preset.unit)
    setVolumeTouched(false)
  }

  const handleVolumeBlur = () => {
    setVolumeTouched(true)
    if (validVolume) setVolumeInput(formatInputNumber(volumeAmount))
  }

  const handlePriceBlur = () => {
    setPriceTouched(true)
    if (validPrice) setPriceInput(formatCurrency(price))
  }

  return <>
    <Seo
      title="Calculadora do Banho"
      description="Estime o custo do produto utilizado em cada banho com volume personalizado, diluição e porte do animal."
      path="/calculadora-do-banho"
    />

    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="bath-calculator-title">
        <div className={`${styles.heroInner} shell`}>
          <Reveal className={styles.heroCopy}>
            <Breadcrumbs items={[{ label: 'Calculadora do Banho' }]} />
            <span className="eyebrow">Ferramenta profissional</span>
            <h1 id="bath-calculator-title">Descubra o custo estimado de produto por banho.</h1>
            <p>Escolha uma combinação Atual Pet, informe o volume e o preço pago e selecione o porte do animal. O cálculo aparece automaticamente.</p>
          </Reveal>

          <Reveal className={styles.heroFormula} delay={90} aria-label="Resumo da fórmula de cálculo">
            <Calculator size={28} strokeWidth={1.4} aria-hidden="true" />
            <span>Embalagem + diluição + consumo</span>
            <strong>Custo aproximado por banho</strong>
            <p>Pronto uso mantém o volume informado. A diluição 1:X considera uma parte de produto e X partes de água.</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.calculatorSection} aria-labelledby="calculator-form-title">
        <div className={`${styles.calculatorLayout} shell`}>
          <Reveal as="form" className={styles.form} onSubmit={(event) => event.preventDefault()} noValidate>
            <div className={styles.formHeading}>
              <span className="eyebrow">Sua simulação</span>
              <h2 id="calculator-form-title">Escolhas guiadas. Resultado imediato.</h2>
            </div>

            <fieldset className={styles.fieldset}>
              <legend><span>01</span> Escolha a linha</legend>
              <div className={styles.lineOptions}>
                {bathCalculatorLines.map((line) => <label className={styles.choice} key={line.id}>
                  <input
                    type="radio"
                    name="bath-line"
                    value={line.id}
                    checked={lineId === line.id}
                    aria-label={`Selecionar linha ${line.name}`}
                    onChange={() => handleLineChange(line.id)}
                    onKeyDown={(event) => {
                      if (event.key === ' ' || event.key === 'Enter') {
                        event.preventDefault()
                        handleLineChange(line.id)
                      }
                    }}
                  />
                  <img
                    className={styles.lineLogo}
                    src={lineLogos[line.id]}
                    width="500"
                    height="300"
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                  />
                </label>)}
              </div>
            </fieldset>

            <div className={styles.fieldGroup}>
              <span className={styles.fieldLabel}><span>02</span> Produto e concentração</span>
              {selectedLine.options.length > 1
                ? <label className={styles.selectField}>
                  <span>Tipo de produto</span>
                  <select value={selectedOption.id} onChange={(event) => handleOptionChange(event.target.value)}>
                    {selectedLine.options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                  </select>
                </label>
                : <div className={styles.autoSelection} aria-live="polite">
                  <span>Seleção automática</span>
                  <strong>{selectedOption.label}</strong>
                </div>}

              <div className={styles.dilutionSummary}>
                <span>Diluição associada</span>
                <strong>{selectedOption.dilutionLabel}</strong>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <span className={styles.fieldLabel}><span>03</span> Qual volume você deseja calcular?</span>
              <div className={styles.volumeFields}>
                <label className={styles.volumeAmount} htmlFor="bath-product-volume">
                  <span>Quantidade</span>
                  <input
                    id="bath-product-volume"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="Ex.: 750 ou 3"
                    value={volumeInput}
                    aria-invalid={volumeError ? 'true' : undefined}
                    aria-describedby={`${volumeHintId}${volumeError ? ` ${volumeErrorId}` : ''}`}
                    onChange={(event) => setVolumeInput(event.target.value)}
                    onBlur={handleVolumeBlur}
                  />
                </label>
                <label className={styles.volumeUnit} htmlFor="bath-volume-unit">
                  <span>Unidade</span>
                  <select id="bath-volume-unit" value={volumeUnit} onChange={(event) => setVolumeUnit(event.target.value)}>
                    {bathVolumeUnits.map((unit) => <option key={unit.id} value={unit.id}>{unit.label}</option>)}
                  </select>
                </label>
              </div>
              <p className={styles.hint} id={volumeHintId}>Use uma apresentação sugerida ou informe livremente qualquer volume válido.</p>
              {volumeError && <p className={styles.error} id={volumeErrorId} role="alert">{volumeError}</p>}

              <div className={styles.volumePresets} aria-label="Apresentações comerciais conhecidas">
                <span>Apresentações de referência</span>
                <div>{selectedOption.volumePresets.map((preset) => <button
                  type="button"
                  key={`${preset.amount}-${preset.unit}`}
                  aria-pressed={volumeUnit === preset.unit && volumeAmount === preset.amount}
                  onClick={() => applyVolumePreset(preset)}
                >{preset.label}</button>)}</div>
              </div>

              <dl className={styles.selectionSummary}>
                <div><dt>Volume informado</dt><dd>{validVolume ? formatVolume(packageVolumeMl) : '—'}</dd></div>
                <div><dt>Diluição</dt><dd>{selectedOption.dilutionLabel}</dd></div>
                <div><dt>Rendimento</dt><dd>{validVolume ? formatVolume(finalVolumeMl) : '—'}</dd></div>
              </dl>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.priceField} htmlFor="bath-product-price">
                <span className={styles.fieldLabel}><span>04</span> Quanto você pagou pelo produto?</span>
                <input
                  id="bath-product-price"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="R$ 89,90"
                  value={priceInput}
                  aria-invalid={priceError ? 'true' : undefined}
                  aria-describedby={`${priceHintId}${priceError ? ` ${priceErrorId}` : ''}`}
                  onChange={(event) => setPriceInput(event.target.value)}
                  onBlur={handlePriceBlur}
                />
              </label>
              <p className={styles.hint} id={priceHintId}>Use o valor total pago pelo volume informado.</p>
              {priceError && <p className={styles.error} id={priceErrorId} role="alert">{priceError}</p>}
            </div>

            <fieldset className={styles.fieldset}>
              <legend><span>05</span> Porte do animal</legend>
              <p className={styles.legendHelp}>Consumo médio de produto já diluído considerado no banho.</p>
              <div className={styles.sizeOptions}>
                {bathAnimalSizes.map((size) => <label className={styles.sizeChoice} key={size.id}>
                  <input
                    type="radio"
                    name="animal-size"
                    value={size.id}
                    checked={sizeId === size.id}
                    onChange={() => setSizeId(size.id)}
                    onKeyDown={(event) => {
                      if (event.key === ' ' || event.key === 'Enter') {
                        event.preventDefault()
                        setSizeId(size.id)
                      }
                    }}
                  />
                  <PawPrint size={18} strokeWidth={1.5} aria-hidden="true" />
                  <strong>{size.name}</strong>
                  <span>{size.usageMl} ml</span>
                </label>)}
              </div>
            </fieldset>
          </Reveal>

          <Reveal as="aside" className={styles.resultPanel} delay={90} aria-labelledby="bath-result-title">
            <div className={styles.resultTop} aria-live="polite" aria-atomic="true">
              <span className="eyebrow">Estimativa atual</span>
              <h2 id="bath-result-title">Custo estimado por banho</h2>
              <strong>{result ? formatCurrency(result.bathCost) : '—'}</strong>
              <small>{result ? `por banho · porte ${selectedSize.name.toLowerCase()}` : 'Informe um volume e um preço válidos para calcular.'}</small>
              <div className={styles.yieldResult}>
                <span><Gauge size={16} aria-hidden="true" /> Rendimento após diluição</span>
                <strong>{validVolume ? formatVolume(finalVolumeMl) : '—'}</strong>
              </div>
            </div>

            <dl className={styles.metrics}>
              <div>
                <dt><Package size={16} aria-hidden="true" /> Produto por litro</dt>
                <dd>{result ? formatCurrency(result.productCostPerLiter) : '—'}</dd>
              </div>
              <div>
                <dt><FlaskConical size={16} aria-hidden="true" /> Produto por ml</dt>
                <dd>{result ? formatCurrency(result.productCostPerMl) : '—'}</dd>
              </div>
              <div>
                <dt><Droplets size={16} aria-hidden="true" /> Diluído por litro</dt>
                <dd>{result ? formatCurrency(result.dilutedCostPerLiter) : '—'}</dd>
              </div>
              <div>
                <dt><Droplets size={16} aria-hidden="true" /> Diluído por ml</dt>
                <dd>{result ? formatCurrency(result.dilutedCostPerMl) : '—'}</dd>
              </div>
            </dl>

            <div className={styles.resultSummary}>
              <span>Resumo da seleção</span>
              <p>{selectedLine.name} · {selectedOption.label} · {validVolume ? formatVolume(packageVolumeMl) : 'volume pendente'} · {selectedSize.usageMl} ml por banho</p>
            </div>

            <p className={styles.disclaimer}>Esta é uma estimativa. O consumo real pode variar conforme pelagem, técnica, protocolo e rotina profissional.</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.method} aria-labelledby="bath-method-title">
        <div className="shell">
          <Reveal as="header" className={styles.methodHeading}>
            <span className="eyebrow">Como calculamos</span>
            <h2 id="bath-method-title">A matemática fica nos bastidores.</h2>
            <p>O preço informado é distribuído pelo rendimento da solução e pelo consumo médio do porte escolhido.</p>
          </Reveal>
          <div className={styles.methodGrid}>
            <Reveal as="article"><span>01</span><h3>Volume final</h3><p>Pronto uso mantém o volume; nas diluições, o volume é multiplicado pelo total de partes.</p></Reveal>
            <Reveal as="article" delay={60}><span>02</span><h3>Custo diluído</h3><p>O preço pago é dividido pela quantidade aproximada de solução pronta.</p></Reveal>
            <Reveal as="article" delay={120}><span>03</span><h3>Custo do banho</h3><p>O custo por ml é multiplicado pelo consumo médio do porte selecionado.</p></Reveal>
          </div>
        </div>
      </section>
    </main>
  </>
}
