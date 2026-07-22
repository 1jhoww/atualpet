import { memo, useMemo, useState } from 'react'
import brazilMap from '../assets/maps/brazil-states-map.json'
import styles from './BrazilMap.module.css'

const distributorLabel = (count) => `${count} ${count === 1 ? 'distribuidor' : 'distribuidores'}`
const compactStates = new Set(['DF', 'ES', 'RJ', 'SE'])

function BrazilMap({ counts, selectedState, highlightedState, onToggleState }) {
  const [hoveredState, setHoveredState] = useState('')
  const [keyboardState, setKeyboardState] = useState('')
  const focusedState = keyboardState || hoveredState
  const states = useMemo(() => [...brazilMap.states].sort((first, second) => {
    const firstAvailable = Boolean(counts[first.uf])
    const secondAvailable = Boolean(counts[second.uf])
    const availabilityOrder = Number(firstAvailable) - Number(secondAvailable)
    if (availabilityOrder) return availabilityOrder
    return Number(compactStates.has(first.uf)) - Number(compactStates.has(second.uf))
  }), [counts])
  const focused = brazilMap.states.find((state) => state.uf === focusedState)
  const focusedCount = focused ? counts[focused.uf] || 0 : 0

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
          Mapa vetorial com os 27 estados. Estados em ciano possuem distribuidores e podem ser selecionados com Enter ou Espaço. Estados em cinza ainda não possuem distribuidores cadastrados.
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

          if (!isAvailable) {
            return <g
              key={state.uf}
              className={className}
              role="img"
              aria-label={`${state.name}, sem distribuidor cadastrado`}
              aria-disabled="true"
              onPointerEnter={() => setHoveredState(state.uf)}
              onPointerLeave={() => setHoveredState('')}
            >
              <path className={styles.shape} d={state.d} />
            </g>
          }

          return <g
            key={state.uf}
            className={className}
            role="button"
            tabIndex="0"
            aria-pressed={isSelected}
            aria-label={`${state.name}, ${distributorLabel(count)}, ${isSelected ? 'pressione Enter para remover o filtro' : 'pressione Enter para filtrar'}`}
            onClick={() => onToggleState(state.uf)}
            onKeyDown={(event) => handleKeyDown(event, state.uf)}
            onFocus={() => setKeyboardState(state.uf)}
            onBlur={() => setKeyboardState('')}
            onPointerEnter={() => setHoveredState(state.uf)}
            onPointerLeave={() => setHoveredState('')}
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

      {focused && <div className={styles.tooltip} role="tooltip">
        <strong>{focused.uf} · {focused.name}</strong>
        <span>{focusedCount ? distributorLabel(focusedCount) : 'Sem distribuidor cadastrado'}</span>
      </div>}
    </div>

    <figcaption className={styles.caption}>
      <p>Selecione um estado em ciano para filtrar a rede de distribuidores.</p>
      <ul className={styles.legend} aria-label="Legenda do mapa">
        <li><span className={styles.legendAvailable} aria-hidden="true" />Com distribuidores</li>
        <li><span className={styles.legendUnavailable} aria-hidden="true" />Sem distribuidores</li>
        <li><span className={styles.legendSelected} aria-hidden="true" />Estado selecionado</li>
      </ul>
    </figcaption>
  </figure>
}

export default memo(BrazilMap)
