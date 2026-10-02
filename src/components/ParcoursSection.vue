<script setup lang="ts">
const steps = [
  {
    n: 1,
    title: 'Votre récit',
    body: "Vous nous confiez la maison : l'adresse, l'époque, ce qui vous y rattache. En quelques mots, à votre rythme.",
    highlight: false,
  },
  {
    n: 2,
    title: 'La prise de contact',
    body: "Nous identifions l'occupant actuel et l'approchons avec soin, sans pression et sans révéler votre identité.",
    highlight: false,
  },
  {
    n: 3,
    title: 'La médiation',
    body: "On bâtit l'accord, le cadre de confiance et le consentement — des deux côtés de la porte.",
    highlight: true,
  },
  {
    n: 4,
    title: 'La visite accompagnée',
    body: 'Le jour venu, un médiateur est à vos côtés. Un souvenir à emporter, une mémoire apaisée.',
    highlight: false,
  },
]
</script>

<template>
  <section id="parcours" class="parcours">
    <div class="inner">
      <div class="intro">
        <p class="overline" v-reveal><span class="overline-line" />Le parcours</p>
        <h2 class="title" v-reveal="{ delay: 80 }">Quatre étapes, une seule porte à franchir.</h2>
        <p class="lead" v-reveal="{ delay: 160 }">
          Un chemin balisé, jamais précipité. Vous avancez à votre rythme, accompagné à chaque pas.
        </p>
      </div>

      <ol class="timeline">
        <li
          v-for="(step, i) in steps"
          :key="step.n"
          class="step"
          :class="{ 'step--highlight': step.highlight }"
          v-reveal="{ delay: i * 120 }"
        >
          <div class="step-rail">
            <div class="step-num">
              <span>{{ step.n }}</span>
            </div>
          </div>
          <div class="step-card">
            <div class="step-head">
              <h3 class="step-title">{{ step.title }}</h3>
              <span v-if="step.highlight" class="step-badge">le cœur</span>
            </div>
            <p class="step-text">{{ step.body }}</p>
          </div>
        </li>
      </ol>

      <div class="cta-wrap" v-reveal>
        <RouterLink to="/entamer-les-demarches" class="cta">
          <span>Entamer les démarches</span>
          <span class="cta-arrow">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.parcours {
  padding: 112px 32px;
  background: var(--bg);
}
.inner {
  max-width: 900px;
  margin: 0 auto;
}
.intro {
  max-width: 620px;
  margin: 0 auto 60px;
  text-align: center;
}
.overline {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font: 500 11px/1 'Work Sans', sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0;
}
.overline-line { width: 26px; height: 1px; background: var(--accent); opacity: 0.6; }
.title {
  margin: 20px 0 0;
  font: 500 clamp(26px, 4vw, 40px)/1.14 'Spectral', serif;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.lead {
  margin: 18px auto 0;
  max-width: 520px;
  font: 300 16px/1.65 'Work Sans', sans-serif;
  color: var(--text-secondary);
}

/* ── Timeline ────────────────────────────────────────── */
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}
.step {
  position: relative;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 24px;
  padding-bottom: 22px;
}
.step:last-child { padding-bottom: 0; }

.step-rail {
  position: relative;
  display: flex;
  justify-content: center;
}
/* ligne verticale reliant les marqueurs */
.step:not(:last-child) .step-rail::after {
  content: '';
  position: absolute;
  top: 52px; bottom: -22px;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(var(--accent), var(--border));
  opacity: 0.35;
}
.step-num {
  width: 52px; height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 500 17px/1 'Work Sans', sans-serif;
  color: var(--accent);
  background: var(--card-bg);
  border: 1.5px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform 0.4s var(--ease-spring), box-shadow 0.4s var(--ease-out);
}
.step--highlight .step-num {
  color: #fff;
  background: var(--accent-grad);
  border-color: transparent;
  box-shadow: 0 8px 24px var(--accent-shadow);
}
.step:hover .step-num {
  transform: scale(1.08) translateY(-2px);
  box-shadow: 0 12px 28px var(--accent-shadow);
}

.step-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 28px;
  transition: transform 0.4s var(--ease-out), border-color 0.4s, box-shadow 0.4s;
}
.step:hover .step-card {
  transform: translateY(-3px);
  border-color: var(--accent);
  box-shadow: var(--shadow-md);
}
.step--highlight .step-card {
  border-color: color-mix(in oklab, var(--accent) 45%, var(--border));
  background:
    linear-gradient(var(--card-bg), var(--card-bg)) padding-box,
    var(--accent-grad) border-box;
}
.step-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.step-title {
  margin: 0;
  font: 500 22px/1.2 'Spectral', serif;
  color: var(--text-primary);
}
.step--highlight .step-title { color: var(--accent-text); }
.step-badge {
  font: 600 9px/1 'Work Sans', sans-serif;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: var(--accent-grad);
  color: #fff;
  padding: 5px 9px;
  border-radius: 20px;
}
.step-text {
  margin: 10px 0 0;
  font: 300 15px/1.62 'Work Sans', sans-serif;
  color: var(--text-secondary);
}

/* ── CTA ─────────────────────────────────────────────── */
.cta-wrap {
  margin-top: 56px;
  text-align: center;
}
.cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 15px 30px;
  background: var(--accent-grad);
  color: #fff;
  font: 500 15px/1 'Work Sans', sans-serif;
  border-radius: var(--radius-sm);
  text-decoration: none;
  box-shadow: 0 10px 30px var(--accent-shadow);
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}
.cta:hover { transform: translateY(-2px); box-shadow: 0 16px 40px var(--accent-shadow); }
.cta:active { transform: translateY(0) scale(0.97); }
.cta-arrow { transition: transform 0.35s var(--ease-out); }
.cta:hover .cta-arrow { transform: translateX(4px); }

@media (max-width: 768px) {
  .parcours { padding: 72px 20px; }
  .step { grid-template-columns: 44px 1fr; gap: 16px; }
  .step-num { width: 44px; height: 44px; font-size: 15px; }
  .step:not(:last-child) .step-rail::after { top: 44px; }
  .step-card { padding: 18px 20px; }
  .cta { width: 100%; justify-content: center; }
}
@media (max-width: 480px) {
  .parcours { padding: 56px 16px; }
  .step-title { font-size: 19px; }
}
</style>
