<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

type EasingFn = (t: number) => number

const timeouts: ReturnType<typeof setTimeout>[] = []
const rafHandles: number[] = []

const eOut: EasingFn    = t => 1 - Math.pow(1 - t, 3)
const eInOut: EasingFn  = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
const eSpring: EasingFn = t => {
  if (t <= 0) return 0
  if (t >= 1) return 1
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1
}

function tween(
  id: string,
  applyFn: (el: HTMLElement, t: number) => void,
  duration: number,
  delay: number,
  easing?: EasingFn
): void {
  const ease = easing ?? eOut
  const t0 = setTimeout(() => {
    const el = document.getElementById(id)
    if (!el) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      applyFn(el, ease(t))
      if (t < 1) rafHandles.push(requestAnimationFrame(tick))
    }
    rafHandles.push(requestAnimationFrame(tick))
  }, delay)
  timeouts.push(t0)
}

function startAnimation(): void {
  timeouts.forEach(clearTimeout)
  rafHandles.forEach(cancelAnimationFrame)
  timeouts.length = 0
  rafHandles.length = 0

  const strokes = [
    'k-bow-outer', 'k-bow-inner', 'k-crown-arch', 'k-crown-stem', 'k-crown-petal',
    'k-scroll-l', 'k-scroll-lc', 'k-scroll-r', 'k-scroll-rc',
    'k-leaf-l', 'k-leaf-r', 'k-leaf-stem', 'k-leaf-petal',
  ]
  strokes.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.style.strokeDashoffset = '1000'
  })

  const shaft = document.getElementById('k-shaft'); if (shaft) shaft.style.transform = 'scaleY(0)'
  const heart = document.getElementById('k-heart'); if (heart) heart.style.transform = 'scale(0)'
  const word  = document.getElementById('k-word')
  if (word) { word.style.opacity = '0'; word.style.transform = 'translateY(8px)' }

  const s = (id: string, dur: number, delay: number) =>
    tween(id, (el, e) => { el.style.strokeDashoffset = String(1000 * (1 - e)) }, dur, delay)

  s('k-bow-outer',  1800,   50)
  s('k-bow-inner',  1400,  320)
  s('k-crown-arch',  860,  980)
  s('k-crown-stem',  420, 1200)
  s('k-crown-petal', 520, 1360)
  s('k-scroll-l',   1050, 1020)
  s('k-scroll-lc',   520, 1560)
  s('k-scroll-r',   1050, 1080)
  s('k-scroll-rc',   520, 1620)
  s('k-leaf-l',      720, 1780)
  s('k-leaf-r',      720, 1900)
  s('k-leaf-stem',   340, 2200)
  s('k-leaf-petal',  440, 2300)

  tween('k-shaft', (el, e) => { el.style.transform = `scaleY(${e})` }, 1100, 2480, eInOut)
  tween('k-heart', (el, e) => { el.style.transform = `scale(${e})` },  950, 3480, eSpring)
  tween('k-word',  (el, e) => {
    el.style.opacity = String(e)
    el.style.transform = `translateY(${8 * (1 - e)}px)`
  }, 860, 4260)
}

onMounted(startAnimation)
onUnmounted(() => {
  timeouts.forEach(clearTimeout)
  rafHandles.forEach(cancelAnimationFrame)
})

defineExpose({ replay: startAnimation })
</script>

<template>
  <div class="key-wrap" @click="startAnimation">
    <svg width="100" height="290" viewBox="0 0 70 202" fill="none" class="key-svg">
      <defs>
        <linearGradient id="gHero" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stop-color="oklch(0.72 0.08 86)"/>
          <stop offset="100%" stop-color="oklch(0.50 0.08 70)"/>
        </linearGradient>
      </defs>

      <ellipse id="k-bow-outer" cx="35" cy="52" rx="28" ry="34"
        stroke="url(#gHero)" stroke-width="3" fill="none"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <ellipse id="k-bow-inner" cx="35" cy="52" rx="16" ry="22"
        stroke="url(#gHero)" stroke-width="2" fill="none"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>

      <path id="k-crown-arch"  d="M 28 20 Q 31 12 35 11 Q 39 12 42 20"
        stroke="url(#gHero)" stroke-width="2.5" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <path id="k-crown-stem"  d="M 35 11 L 35 6"
        stroke="url(#gHero)" stroke-width="2" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <path id="k-crown-petal" d="M 30 7 Q 35 2 40 7"
        stroke="url(#gHero)" stroke-width="1.8" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>

      <path id="k-scroll-l"  d="M 8 52 C 1 44 3 30 13 27 C 18 25 22 29 18 34"
        stroke="url(#gHero)" stroke-width="2" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <path id="k-scroll-lc" d="M 18 34 C 14 38 10 37 10 34"
        stroke="url(#gHero)" stroke-width="1.5" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <path id="k-scroll-r"  d="M 62 52 C 69 44 67 30 57 27 C 52 25 48 29 52 34"
        stroke="url(#gHero)" stroke-width="2" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <path id="k-scroll-rc" d="M 52 34 C 56 38 60 37 60 34"
        stroke="url(#gHero)" stroke-width="1.5" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>

      <path id="k-leaf-l"     d="M 26 87 C 18 81 22 72 29 75 C 32 76 34 82 35 85"
        stroke="url(#gHero)" stroke-width="1.9" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <path id="k-leaf-r"     d="M 44 87 C 52 81 48 72 41 75 C 38 76 36 82 35 85"
        stroke="url(#gHero)" stroke-width="1.9" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <path id="k-leaf-stem"  d="M 35 85 L 35 78"
        stroke="url(#gHero)" stroke-width="1.9" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <path id="k-leaf-petal" d="M 31 79 Q 35 73 39 79"
        stroke="url(#gHero)" stroke-width="1.8" fill="none" stroke-linecap="round"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>

      <g id="k-shaft" style="transform-box:fill-box;transform-origin:center top;transform:scaleY(0)">
        <rect x="31" y="88" width="8" height="72" rx="3" fill="url(#gHero)"/>
      </g>

      <g id="k-heart" style="transform-box:fill-box;transform-origin:center top;transform:scale(0)">
        <path d="M 35 199 C 16 184 14 163 24 158 C 29 154 35 159 35 166 C 35 159 41 154 46 158 C 56 163 54 184 35 199 Z"
          fill="url(#gHero)"/>
      </g>
    </svg>

    <div id="k-word" style="text-align:center;opacity:0;transform:translateY(8px)">
      <slot>
        <span class="wordmark">Aux Origines<em>.</em></span>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.key-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  cursor: pointer;
}
.key-svg { overflow: visible; }
.wordmark {
  font: 400 46px/1 'Spectral', serif;
  color: var(--text-primary);
}
.wordmark em { color: var(--accent); }
</style>
