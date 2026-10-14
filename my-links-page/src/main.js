// ─── Floating ember particles ────────────────────────────────────────────────
const canvas = document.getElementById('particles')
if (canvas) {
  const ctx = canvas.getContext('2d')

  // Warm embers: wine-red, amber-gold, dusty-rose, deep-violet
  const COLORS = [
    [170, 80,  60],
    [190, 120, 50],
    [140, 70,  100],
    [100, 60,  150],
  ]
  const COUNT = 40
  let W, H
  const pts = []
  let rafId

  function rand(a, b) { return Math.random() * (b - a) + a }

  // Pre-rendered glow per color: a radial gradient is far cheaper than shadowBlur every frame
  const SPRITES = COLORS.map(([r, g, b]) => {
    const s = document.createElement('canvas')
    s.width = s.height = 32
    const c = s.getContext('2d')
    const grad = c.createRadialGradient(16, 16, 0, 16, 16, 16)
    grad.addColorStop(0, `rgba(${r},${g},${b},1)`)
    grad.addColorStop(0.15, `rgba(${r},${g},${b},0.9)`)
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
    c.fillStyle = grad
    c.fillRect(0, 0, 32, 32)
    return s
  })

  function make(scatter) {
    const idx = Math.floor(Math.random() * COLORS.length)
    const [r, g, b] = COLORS[idx]
    const maxLife = rand(300, 700)
    return {
      x: rand(0, W || 1),
      y: scatter ? rand(0, H || 1) : (H || 600) + 5,
      vx: rand(-0.12, 0.12),
      vy: rand(-0.2, -0.55),
      size: rand(1, 2.2),
      life: scatter ? rand(0, maxLife) : 0,
      maxLife,
      maxOpacity: rand(0.25, 0.65),
      sprite: SPRITES[idx],
    }
  }

  function resize() {
    W = canvas.width = window.innerWidth
    H = canvas.height = window.innerHeight
    for (const p of pts) {
      if (p.x > W) p.x = rand(0, W)
      if (p.y > H) p.y = rand(0, H)
    }
  }

  function init() {
    resize()
    for (let i = 0; i < COUNT; i++) pts.push(make(true))
  }

  function frame() {
    ctx.clearRect(0, 0, W, H)
    for (const p of pts) {
      p.life++
      p.x += p.vx
      p.y += p.vy
      const half = p.maxLife / 2
      const opacity = p.life < half
        ? (p.life / half) * p.maxOpacity
        : ((p.maxLife - p.life) / half) * p.maxOpacity
      if (p.life >= p.maxLife) Object.assign(p, make(false))
      ctx.globalAlpha = Math.max(0, opacity)
      const d = p.size * 12
      ctx.drawImage(p.sprite, p.x - d / 2, p.y - d / 2, d, d)
    }
    ctx.globalAlpha = 1
    rafId = requestAnimationFrame(frame)
  }

  // ─── Avatar 3-D tilt ──────────────────────────────────────────────────────
  const avatar = canvas.closest('.page')?.querySelector('.avatar-frame')
  if (avatar && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    avatar.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = avatar.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      avatar.style.transition = 'none'
      avatar.style.transform = `perspective(500px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.04)`
    })
    avatar.addEventListener('mouseleave', () => {
      avatar.style.transition = 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)'
      avatar.getBoundingClientRect()
      avatar.style.transform = ''
    })
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId)
    else rafId = requestAnimationFrame(frame)
  })

  window.addEventListener('resize', resize)
  init()
  frame()
}
