const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const smoothstep = (start, end, value) => {
  const progress = clamp((value - start) / (end - start))
  return progress * progress * (3 - 2 * progress)
}

function createRandom(seed) {
  let value = seed % 2147483647
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

function createLayer(count, config, random) {
  return Array.from({ length: count }, () => ({
    x: random(),
    radius: config.minRadius + random() * (config.maxRadius - config.minRadius),
    start: config.startMin + random() * (config.startMax - config.startMin),
    duration: config.durationMin + random() * (config.durationMax - config.durationMin),
    drift: (random() - 0.5) * config.maxDrift,
    phase: random() * Math.PI * 2,
    alpha: config.alphaMin + random() * (config.alphaMax - config.alphaMin),
  }))
}

function createFoam(count, random) {
  return Array.from({ length: count }, () => {
    const followsDog = random() < 0.78
    return {
      x: followsDog ? 0.48 + random() * 0.5 : random(),
      y: 0.87 + random() * 0.16,
      radius: 7 + random() * 31,
      lift: 38 + random() * 145,
      drift: (random() - 0.5) * 34,
      alpha: 0.38 + random() * 0.46,
    }
  })
}

function prepareCanvas(canvas, maxDpr) {
  const ratio = Math.min(window.devicePixelRatio || 1, maxDpr)
  const rect = canvas.parentElement?.getBoundingClientRect() ?? canvas.getBoundingClientRect()
  const width = Math.max(1, rect.width)
  const height = Math.max(1, rect.height)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = Math.round(width * ratio)
  canvas.height = Math.round(height * ratio)
  const context = canvas.getContext('2d', { alpha: true })
  if (!context) throw new Error('Canvas 2D unavailable')
  context.setTransform(ratio, 0, 0, ratio, 0, 0)
  return { context, width, height }
}

function drawBubble(context, bubble, width, height, progress, depth) {
  const local = clamp((progress - bubble.start) / bubble.duration)
  if (local <= 0 || local >= 1) return

  const life = Math.sin(Math.PI * local)
  const radius = bubble.radius * (0.82 + local * 0.18)
  const x = bubble.x * width + Math.sin(local * Math.PI * 2 + bubble.phase) * bubble.drift
  const y = height + radius - local * (height + radius * 2.4)
  const alpha = bubble.alpha * life

  context.globalAlpha = alpha
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fillStyle = depth === 'background' ? 'rgba(232,247,246,.22)' : 'rgba(255,255,255,.22)'
  context.fill()
  context.lineWidth = depth === 'front' ? 1.5 : 1
  context.strokeStyle = depth === 'background' ? 'rgba(70,159,155,.22)' : 'rgba(70,159,155,.3)'
  context.stroke()

  context.globalAlpha = alpha * 0.9
  context.beginPath()
  context.arc(x - radius * 0.28, y - radius * 0.3, Math.max(1.2, radius * 0.12), 0, Math.PI * 2)
  context.fillStyle = 'rgba(255,255,255,.95)'
  context.fill()
}

function drawFoam(context, particles, width, height, progress) {
  const grow = smoothstep(0.2, 0.47, progress)
  const dissipate = 1 - smoothstep(0.68, 0.93, progress)
  const intensity = grow * dissipate
  if (intensity <= 0.002) return

  particles.forEach((particle) => {
    const radius = particle.radius * (0.42 + intensity * 0.72)
    const x = particle.x * width + particle.drift * intensity
    const y = particle.y * height - particle.lift * intensity
    const alpha = particle.alpha * intensity

    context.globalAlpha = alpha
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(255,255,255,.88)'
    context.fill()
    context.lineWidth = 1
    context.strokeStyle = 'rgba(70,159,155,.16)'
    context.stroke()

    context.globalAlpha = alpha * 0.7
    context.beginPath()
    context.arc(x - radius * 0.24, y - radius * 0.28, Math.max(1, radius * 0.1), 0, Math.PI * 2)
    context.fillStyle = 'rgba(255,255,255,1)'
    context.fill()
  })
}

export function createBathBubbleRenderer(backCanvas, frontCanvas, counts, { maxDpr = 2 } = {}) {
  const random = createRandom(17072026)
  const background = createLayer(counts.background, {
    minRadius: 6, maxRadius: 27, startMin: 0.01, startMax: 0.3,
    durationMin: 0.48, durationMax: 0.66, maxDrift: 72,
    alphaMin: 0.16, alphaMax: 0.34,
  }, random)
  const middle = createLayer(counts.middle, {
    minRadius: 14, maxRadius: 52, startMin: 0.08, startMax: 0.38,
    durationMin: 0.4, durationMax: 0.57, maxDrift: 105,
    alphaMin: 0.28, alphaMax: 0.58,
  }, random)
  const front = createLayer(counts.front, {
    minRadius: 46, maxRadius: 112, startMin: 0.16, startMax: 0.42,
    durationMin: 0.34, durationMax: 0.5, maxDrift: 130,
    alphaMin: 0.2, alphaMax: 0.42,
  }, random)
  const foam = createFoam(counts.foam, random)

  let back = prepareCanvas(backCanvas, maxDpr)
  let frontLayer = prepareCanvas(frontCanvas, maxDpr)
  let frame = 0
  let latestProgress = 0

  const draw = () => {
    frame = 0
    const progress = latestProgress
    back.context.clearRect(0, 0, back.width, back.height)
    frontLayer.context.clearRect(0, 0, frontLayer.width, frontLayer.height)

    background.forEach((bubble) => drawBubble(back.context, bubble, back.width, back.height, progress, 'background'))
    middle.forEach((bubble) => drawBubble(frontLayer.context, bubble, frontLayer.width, frontLayer.height, progress, 'middle'))
    drawFoam(frontLayer.context, foam, frontLayer.width, frontLayer.height, progress)
    front.forEach((bubble) => drawBubble(frontLayer.context, bubble, frontLayer.width, frontLayer.height, progress, 'front'))

    back.context.globalAlpha = 1
    frontLayer.context.globalAlpha = 1
  }

  return {
    render(progress) {
      latestProgress = clamp(progress)
      if (!frame) frame = window.requestAnimationFrame(draw)
    },
    resize() {
      back = prepareCanvas(backCanvas, maxDpr)
      frontLayer = prepareCanvas(frontCanvas, maxDpr)
      this.render(latestProgress)
    },
    destroy() {
      if (frame) window.cancelAnimationFrame(frame)
      back.context.clearRect(0, 0, back.width, back.height)
      frontLayer.context.clearRect(0, 0, frontLayer.width, frontLayer.height)
    },
  }
}
