<script setup lang="ts">
const steps = [
  {
    n: 1,
    title: 'Votre récit',
    body: "Vous nous confiez la maison : l'adresse, l'époque, ce qui vous y rattache. En quelques mots, à votre rythme.",
    highlight: false,
    line: true,
  },
  {
    n: 2,
    title: 'La prise de contact',
    body: "Nous identifions l'occupant actuel et l'approchons avec soin, sans pression et sans révéler votre identité.",
    highlight: false,
    line: true,
  },
  {
    n: 3,
    title: 'La médiation',
    body: "On bâtit l'accord, le cadre de confiance et le consentement — des deux côtés de la porte.",
    highlight: true,
    line: false,
  },
  {
    n: 4,
    title: 'La visite accompagnée',
    body: 'Le jour venu, un médiateur est à vos côtés. Un souvenir à emporter, une mémoire apaisée.',
    highlight: false,
    line: false,
  },
]
</script>

<template>
  <section id="parcours" class="parcours">
    <div class="inner">
      <div class="intro">
        <p class="overline">Le parcours</p>
        <h2 class="title">Quatre étapes, une seule porte à franchir.</h2>
      </div>

      <div class="grid">
        <div v-for="step in steps" :key="step.n" class="step">
          <div class="step-marker">
            <div :class="['step-num', { 'step-num--highlight': step.highlight }]">
              {{ step.n }}
            </div>
            <div v-if="step.line" class="step-line" />
          </div>
          <div :class="['step-body', { 'step-body--pb': step.line }]">
            <div class="step-title-row">
              <span :class="['step-title', { 'step-title--highlight': step.highlight }]">
                {{ step.title }}
              </span>
              <span v-if="step.highlight" class="step-badge">cœur</span>
            </div>
            <p class="step-text">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.parcours {
  padding: 96px 32px;
  background: var(--bg);
}
.inner {
  max-width: 1100px;
  margin: 0 auto;
}
.intro {
  max-width: 560px;
}

.overline {
  font:
    500 11px/1 'Work Sans',
    sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0;
}
.title {
  margin: 20px 0 0;
  font:
    500 38px/1.15 'Spectral',
    serif;
  color: var(--text-primary);
}
.grid {
  margin-top: 52px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px 48px;
}
.step {
  display: flex;
  gap: 20px;
}
.step-marker {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step-num {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font:
    500 15px/1 'Work Sans',
    sans-serif;
  color: var(--accent);
  background: var(--card-bg);
  flex: none;
}
.step-num--highlight {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  box-shadow: 0 6px 18px var(--accent-shadow);
}
.step-line {
  width: 1px;
  flex: 1;
  background: var(--border);
  margin-top: 8px;
}
.step-body {
  flex: 1;
}
.step-body--pb {
  padding-bottom: 30px;
}
.step-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.step-title {
  font:
    500 22px/1.2 'Spectral',
    serif;
  color: var(--text-primary);
}
.step-title--highlight {
  color: var(--accent-text);
}
.step-badge {
  font:
    600 9px/1 'Work Sans',
    sans-serif;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: var(--accent);
  color: #fff;
  padding: 4px 8px;
  border-radius: 3px;
}
.step-text {
  margin: 8px 0 0;
  font:
    300 14.5px/1.6 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .parcours { padding: 64px 20px; }
  .title { font-size: 28px; }
  .grid {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 36px;
  }
}

@media (max-width: 480px) {
  .parcours { padding: 48px 16px; }
  .title { font-size: 24px; }
  .step-title { font-size: 18px; }
}
</style>
