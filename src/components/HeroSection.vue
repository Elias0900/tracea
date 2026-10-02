<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import KeyLogoAnimated from '@/components/KeyLogoAnimated.vue'

const router = useRouter()
const route = useRoute()

const canTrackCursor =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(pointer: fine)').matches &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const heroVisual = ref<HTMLElement | null>(null)

// Position cible (souris) et position courante (affichée), reliées par un
// lissage (lerp) à chaque frame pour un halo qui suit la souris en douceur
// plutôt que de s'y téléporter.
let targetX = 50
let targetY = 50
let currentX = 50
let currentY = 50
let rafId = 0

function onVisualMove(e: MouseEvent) {
  if (!canTrackCursor || !heroVisual.value) return
  const rect = heroVisual.value.getBoundingClientRect()
  targetX = ((e.clientX - rect.left) / rect.width) * 100
  targetY = ((e.clientY - rect.top) / rect.height) * 100
}

function tick() {
  currentX += (targetX - currentX) * 0.08
  currentY += (targetY - currentY) * 0.08
  heroVisual.value?.style.setProperty('--mx', `${currentX}%`)
  heroVisual.value?.style.setProperty('--my', `${currentY}%`)
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  if (canTrackCursor) rafId = requestAnimationFrame(tick)
})
onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})

function goTo(id: string) {
  if (route.path !== '/') {
    router.push(`/#${id}`)
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section id="top" class="hero grain">
    <!-- Fond : dégradé mesh animé -->
    <div class="hero-bg" aria-hidden="true">
      <span class="mesh mesh-a" />
      <span class="mesh mesh-b" />
      <span class="mesh mesh-c" />
    </div>

    <div class="hero-inner">
      <!-- Visuel : la clé -->
      <div ref="heroVisual" class="hero-visual" @mousemove="onVisualMove">
        <span class="cursor-glow" aria-hidden="true" />
        <div class="hero-key">
          <KeyLogoAnimated />
        </div>
      </div>

      <!-- Copy -->
      <div class="hero-copy">
        <p class="overline" v-reveal>
          <span class="overline-dot" />Médiation · visites accompagnées
        </p>
        <h1 class="headline">
          <span class="line" v-reveal="{ delay: 60 }">Une porte fermée</span>
          <span class="line" v-reveal="{ delay: 160 }">peut, parfois,</span>
          <span class="line line--accent" v-reveal="{ delay: 260 }">s'ouvrir à nouveau.</span>
        </h1>
        <p class="body-text" v-reveal="{ delay: 380 }">
          Cette maison d'avant — ses odeurs, sa lumière, ses murs — est encore là derrière une
          porte. Nous créons le cadre de confiance et la médiation qui rendent ce retour possible.
        </p>
        <div class="hero-actions" v-reveal="{ delay: 480 }">
          <a class="btn-primary" @click.prevent="goTo('demande')">
            <span>Ouvrir cette porte</span>
            <span class="btn-arrow">→</span>
          </a>
          <a class="btn-ghost" @click.prevent="goTo('parcours')">Comment ça marche</a>
        </div>
        <div class="hero-trust" v-reveal="{ delay: 560 }">
          <span class="trust-item">✓ Premier échange gratuit</span>
          <span class="trust-sep" />
          <span class="trust-item">✓ Sans engagement</span>
          <span class="trust-sep" />
          <span class="trust-item">✓ Réponse sous 48h</span>
        </div>
      </div>
    </div>

    <!-- Indice de scroll -->
    <button class="scroll-cue" type="button" aria-label="Découvrir" @click="goTo('principe')">
      <span class="scroll-cue-line" />
      <span class="scroll-cue-label">Découvrir</span>
    </button>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 0 32px;
  overflow: hidden;
}

/* ── Fond mesh animé ─────────────────────────────────── */
.hero-bg {
  position: absolute;
  inset: -20% -10% 0;
  z-index: 0;
  pointer-events: none;
}
.mesh {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  animation: meshDrift 18s ease-in-out infinite;
}
.mesh-a {
  width: 620px; height: 620px;
  top: -180px; left: -80px;
  background: radial-gradient(circle at 50% 50%, var(--mesh-1), transparent 68%);
}
.mesh-b {
  width: 540px; height: 540px;
  top: 40px; right: -60px;
  background: radial-gradient(circle at 50% 50%, var(--mesh-2), transparent 66%);
  animation-delay: -6s;
}
.mesh-c {
  width: 460px; height: 460px;
  bottom: -160px; left: 32%;
  background: radial-gradient(circle at 50% 50%, var(--mesh-3), transparent 66%);
  animation-delay: -11s;
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 96px 0 104px;
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: 64px;
  align-items: center;
}

/* ── Visuel ──────────────────────────────────────────── */
.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 440px;
  overflow: hidden;
}
.cursor-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    300px circle at var(--mx, 50%) var(--my, 50%),
    var(--glow),
    transparent 72%
  );
  transition: opacity 0.6s var(--ease-out);
}
.hero-visual:hover .cursor-glow { opacity: 1; }
@media (pointer: coarse) {
  .cursor-glow { display: none; }
}
.hero-key {
  position: relative;
  z-index: 1;
  animation: floatSoft 8s ease-in-out infinite;
}

/* ── Copy ────────────────────────────────────────────── */
.overline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font: 500 12px/1 'Work Sans', sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0;
}
.overline-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--glow);
}
.headline {
  margin: 24px 0 0;
  font: 500 clamp(34px, 5vw, 58px)/1.06 'Spectral', serif;
  color: var(--text-primary);
  letter-spacing: -0.015em;
}
.headline .line { display: block; }
.line--accent {
  font-style: italic;
  color: var(--accent-text);
}
.body-text {
  margin: 26px 0 0;
  font: 300 17.5px/1.68 'Work Sans', sans-serif;
  color: var(--text-secondary);
  max-width: 480px;
}
.hero-actions {
  display: flex;
  gap: 14px;
  margin-top: 38px;
}
.btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 15px 30px;
  background: var(--accent-grad);
  color: #fff;
  font: 500 15px/1 'Work Sans', sans-serif;
  border-radius: var(--radius-sm);
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 10px 30px var(--accent-shadow);
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}
.btn-primary::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(100deg, transparent, oklch(1 0 0 / 0.35), transparent);
  transform: translateX(-120%);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px var(--accent-shadow);
}
.btn-primary:active { transform: translateY(0) scale(0.97); }
.btn-primary:hover::before { animation: shine 1.1s var(--ease-out); }
.btn-arrow { transition: transform 0.35s var(--ease-out); }
.btn-primary:hover .btn-arrow { transform: translateX(4px); }

.btn-ghost {
  cursor: pointer;
  padding: 15px 26px;
  border: 1.5px solid var(--border);
  color: var(--text-secondary);
  font: 500 15px/1 'Work Sans', sans-serif;
  border-radius: var(--radius-sm);
  text-decoration: none;
  background: var(--card-bg);
  transition: border-color 0.3s, color 0.3s, transform 0.3s var(--ease-out);
}
.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}
.btn-ghost:active { transform: translateY(0) scale(0.97); }

.hero-trust {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 30px;
  flex-wrap: wrap;
}
.trust-item {
  font: 400 12.5px/1 'Work Sans', sans-serif;
  color: var(--text-tertiary);
  letter-spacing: 0.01em;
}
.trust-sep {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--border);
}

/* ── Scroll cue ──────────────────────────────────────── */
.scroll-cue {
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
}
.scroll-cue-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(var(--accent), transparent);
  position: relative;
  overflow: hidden;
}
.scroll-cue-line::after {
  content: '';
  position: absolute;
  top: -12px; left: 0;
  width: 100%; height: 12px;
  background: var(--accent);
  animation: cueFall 2.2s ease-in-out infinite;
}
@keyframes cueFall {
  0%   { transform: translateY(0); opacity: 0; }
  30%  { opacity: 1; }
  100% { transform: translateY(52px); opacity: 0; }
}
.scroll-cue-label {
  font: 500 10px/1 'Work Sans', sans-serif;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-inner { gap: 40px; }
}
@media (max-width: 768px) {
  .hero { padding: 0 20px; }
  .hero-inner {
    grid-template-columns: 1fr;
    padding: 56px 0 72px;
    gap: 24px;
  }
  .hero-visual { min-height: 300px; order: -1; }
  .body-text { font-size: 15.5px; max-width: 100%; }
  .hero-actions { flex-direction: column; }
  .btn-primary, .btn-ghost { justify-content: center; text-align: center; }
  .scroll-cue { display: none; }
}
@media (max-width: 480px) {
  .hero { padding: 0 16px; }
  .hero-actions { gap: 10px; }
  .hero-trust { gap: 10px; }
}
</style>
