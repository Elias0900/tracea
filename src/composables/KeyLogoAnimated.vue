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

  const strokes = ['k-bow-outer', 'k-bow-inner']
  strokes.forEach(id => {
    const el = document.getElementById(id)
    if (el) el.style.strokeDashoffset = '1000'
  })

  const pin   = document.getElementById('k-bow-pin');  if (pin)   pin.style.opacity   = '0'
  const shaft = document.getElementById('k-shaft');     if (shaft) shaft.style.transform = 'scaleY(0)'
  const bits  = document.getElementById('k-bits');      if (bits)  bits.style.transform  = 'scaleX(0)'
  const heart = document.getElementById('k-heart');     if (heart) heart.style.transform = 'scale(0)'
  const word  = document.getElementById('k-word')
  if (word) { word.style.opacity = '0'; word.style.transform = 'translateY(8px)' }

  const s = (id: string, dur: number, delay: number) =>
    tween(id, (el, e) => { el.style.strokeDashoffset = String(1000 * (1 - e)) }, dur, delay)

  s('k-bow-outer', 1900,   50)
  s('k-bow-inner', 1300,  340)

  tween('k-bow-pin', (el, e) => { el.style.opacity = String(e) }, 500, 1320)
  tween('k-shaft',   (el, e) => { el.style.transform = `scaleY(${e})` }, 1000, 1700, eInOut)
  tween('k-bits',    (el, e) => { el.style.transform = `scaleX(${e})` }, 540,  2560, eOut)
  tween('k-heart',   (el, e) => { el.style.transform = `scale(${e})` },  960,  2860, eSpring)
  tween('k-word',    (el, e) => {
    el.style.opacity = String(e)
    el.style.transform = `translateY(${8 * (1 - e)}px)`
  }, 860, 3640)
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
        <linearGradient id="gHero" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stop-color="oklch(0.80 0.10 90)"/>
          <stop offset="40%"  stop-color="oklch(0.62 0.09 80)"/>
          <stop offset="100%" stop-color="oklch(0.46 0.08 68)"/>
        </linearGradient>
      </defs>

      <!-- Bow : deux cercles concentriques -->
      <circle id="k-bow-outer" cx="35" cy="38" r="25"
        stroke="url(#gHero)" stroke-width="4" fill="none"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>
      <circle id="k-bow-inner" cx="35" cy="38" r="13"
        stroke="url(#gHero)" stroke-width="2.5" fill="none"
        stroke-dasharray="1000" stroke-dashoffset="1000"/>

      <!-- Pivot central du panneton -->
      <circle id="k-bow-pin" cx="35" cy="38" r="3.5" fill="url(#gHero)" style="opacity:0"/>

      <!-- Tige : col + lame -->
      <g id="k-shaft" style="transform-box:fill-box;transform-origin:center top;transform:scaleY(0)">
        <rect x="28" y="63" width="14" height="6" rx="2.5" fill="url(#gHero)"/>
        <rect x="32" y="69" width="6"  height="94" rx="2.5" fill="url(#gHero)"/>
        <line x1="35" y1="72" x2="35" y2="160"
          stroke="oklch(0.86 0.10 90 / .18)" stroke-width="1.2"/>
      </g>

      <!-- Garnitures (dents) — se déploient depuis la tige -->
      <g id="k-bits"
        style="transform-box:fill-box;transform-origin:left center;transform:scaleX(0)">
        <rect x="38" y="104" width="20" height="12" rx="2.5" fill="url(#gHero)"/>
        <rect x="38" y="130" width="13" height="9"  rx="2"   fill="url(#gHero)"/>
      </g>

      <!-- Cœur -->
      <g id="k-heart"
        style="transform-box:fill-box;transform-origin:center top;transform:scale(0)">
        <path d="M 35 200 C 16 185 14 164 24 159
                 C 29 155 35 160 35 167
                 C 35 160 41 155 46 159
                 C 56 164 54 185 35 200 Z"
          fill="url(#gHero)"/>
        <path d="M 27 167 C 23 173 23 182 29 186"
          stroke="oklch(0.86 0.10 90 / .28)" stroke-width="2"
          fill="none" stroke-linecap="round"/>
      </g>
    </svg>

    <div id="k-word" style="text-align:center;opacity:0;transform:translateY(8px)">
      <slot>
        <span class="wordmark">Revoir<em>.</em></span>
      </slot>
    </div>

    <span class="replay-hint">↺ relancer</span>
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
.replay-hint {
  font: 300 11px/1 'Work Sans', sans-serif;
  color: var(--text-tertiary);
  letter-spacing: .06em;
}
</style>
