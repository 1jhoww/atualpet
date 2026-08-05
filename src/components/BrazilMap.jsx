import { memo, useMemo } from 'react'
import brazilMap from '../assets/maps/brazil-states-map.json'
import styles from './BrazilMap.module.css'

const compactStates = new Set(['DF', 'ES', 'RJ', 'SE'])

function BrazilMap({ counts, selectedState, highlightedState, onToggleState }) {
  const states = useMemo(() => [...brazilMap.states].sort((first, second) => {
    const firstAvailable = Boolean(counts[first.uf])
    const secondAvailable = Boolean(counts[second.uf])
    const availabilityOrder = Number(firstAvailable) - Number(secondAvailable)
    if (availabilityOrder) return availabilityOrder
    return Number(compactStates.has(first.uf)) - Number(compactStates.has(second.uf))
  }), [counts])

  const handleKeyDown = (event, state) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onToggleState(state)
  }

  return <figure className={styles.figure}>
    <div className={styles.frame}>
      <svg
        className={styles.map}
        viewBox={brazilMap.viewBox}
        role="group"
        aria-labelledby="brazil-map-title brazil-map-description"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="brazil-map-title">Mapa interativo dos distribuidores Atual Pet no Brasil</title>
        <desc id="brazil-map-description">
          Mapa vetorial com os 27 estados. Todos podem ser selecionados com Enter ou Espaço. Estados em ciano possuem cobertura comercial; nos estados em cinza, o contato administrativo será apresentado.
        </desc>

        {states.map((state) => {
          const count = counts[state.uf] || 0
          const isAvailable = count > 0
          const isSelected = selectedState === state.uf
          const isHighlighted = highlightedState === state.uf && !isSelected
          const className = [
            styles.state,
            isAvailable ? styles.available : styles.unavailable,
            isSelected ? styles.selected : '',
            isHighlighted ? styles.highlighted : '',
          ].filter(Boolean).join(' ')

          return <g
            key={state.uf}
            className={className}
            role="button"
            tabIndex="0"
            aria-pressed={isSelected}
            aria-label={`${state.name}, ${isAvailable ? 'estado com cobertura comercial' : 'estado sem distribuidor cadastrado, com atendimento administrativo disponível'}, ${isSelected ? 'pressione Enter para remover o filtro' : 'pressione Enter para selecionar'}`}
            onClick={() => onToggleState(state.uf)}
            onKeyDown={(event) => handleKeyDown(event, state.uf)}
          >
            <path className={styles.shape} d={state.d} />
            {compactStates.has(state.uf) && <circle
              className={styles.hitArea}
              cx={state.focusPoint[0]}
              cy={state.focusPoint[1]}
              r="12"
              aria-hidden="true"
            />}
          </g>
        })}
      </svg>

    </div>

    <figcaption className={styles.caption}>
      <p>Selecione qualquer estado para consultar a cobertura ou falar com o setor administrativo.</p>
      <ul className={styles.legend} aria-label="Legenda do mapa">
        <li><span className={styles.legendAvailable} aria-hidden="true" />Com cobertura</li>
        <li><span className={styles.legendUnavailable} aria-hidden="true" />Sem cobertura</li>
        <li><span className={styles.legendSelected} aria-hidden="true" />Estado selecionado</li>
      </ul>
    </figcaption>
  </figure>
}

export default memo(BrazilMap)
