<script setup lang="ts">
const cards = [
  {
    title: 'Vous revenez',
    body: "Vous avez grandi là. Nous portons la démarche à votre place — vous n'avez qu'à vous laisser accompagner, à votre rythme.",
  },
  {
    title: 'Vous organisez pour un proche',
    body: 'Un parent vieillissant, un deuil à honorer. Offrez ce retour — nous gérons le contact, le cadre et la présence le jour J.',
  },
]
</script>

<template>
  <section id="pourqui" class="pourqui grain">
    <div class="inner">
      <div class="intro">
        <p class="overline" v-reveal><span class="overline-line" />Pour qui</p>
        <h2 class="title" v-reveal="{ delay: 80 }">
          Que ce soit votre histoire ou celle d'un proche.
        </h2>
      </div>
      <div class="grid">
        <article
          v-for="(card, i) in cards"
          :key="card.title"
          class="card"
          v-reveal="{ delay: i * 140 }"
        >
          <div class="card-icon">
            <svg width="26" height="32" viewBox="0 0 52 62" fill="none">
              <path d="M 2 60 L 2 2 L 50 2 L 50 60" stroke="var(--accent)" stroke-width="3"
                stroke-linecap="square" fill="none" />
              <path d="M 2 2 L 30 6 L 30 60" stroke="var(--accent)" stroke-width="2.2"
                stroke-linecap="round" opacity=".55" fill="none" />
              <circle cx="27" cy="33" r="2.5" fill="var(--accent)" />
            </svg>
          </div>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-body">{{ card.body }}</p>
          <span class="card-shine" aria-hidden="true" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pourqui {
  position: relative;
  padding: 112px 32px;
  background: var(--section-bg);
  border-top: 1px solid var(--hairline);
  overflow: hidden;
}
.inner {
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
}
.intro {
  text-align: center;
  max-width: 580px;
  margin: 0 auto 52px;
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
  font: 500 clamp(24px, 3.6vw, 38px)/1.18 'Spectral', serif;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.card {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 40px;
  overflow: hidden;
  transition: transform 0.45s var(--ease-out), box-shadow 0.45s var(--ease-out), border-color 0.45s;
}
.card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in oklab, var(--accent) 40%, var(--border));
  box-shadow: var(--shadow-lg);
}
.card-icon {
  width: 60px; height: 60px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in oklab, var(--accent) 12%, var(--card-bg));
  border: 1px solid color-mix(in oklab, var(--accent) 20%, var(--border));
  transition: transform 0.45s var(--ease-spring);
}
.card:hover .card-icon { transform: translateY(-3px) rotate(-4deg); }
.card-title {
  margin: 24px 0 0;
  font: 500 27px/1.2 'Spectral', serif;
  color: var(--text-primary);
}
.card-body {
  margin: 12px 0 0;
  font: 300 15.5px/1.68 'Work Sans', sans-serif;
  color: var(--text-secondary);
}
.card-shine {
  position: absolute;
  top: 0; left: 0;
  width: 60%; height: 100%;
  background: linear-gradient(100deg, transparent, var(--glow), transparent);
  transform: translateX(-140%);
  pointer-events: none;
}
.card:hover .card-shine { animation: shine 1.2s var(--ease-out); }

@media (max-width: 768px) {
  .pourqui { padding: 72px 20px; }
  .grid { grid-template-columns: 1fr; gap: 16px; }
  .card { padding: 28px; }
  .card-title { font-size: 23px; }
}
@media (max-width: 480px) {
  .pourqui { padding: 56px 16px; }
  .card { padding: 22px; }
}
</style>
