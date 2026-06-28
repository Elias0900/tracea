<script setup lang="ts">
const cards = [
  {
    title: 'Vous revenez',
    body: "Vous avez grandi là. Nous portons la démarche à votre place — vous n'avez qu'à vous laisser accompagner, à votre rythme.",
  },
  {
    title: 'Vous organisez pour un proche',
    body: 'Un parent vieillissant, un deuil à honorer. Offrez ce retour — nous gérons le contact, le cadre et la présence le jour J.',
  },
]
</script>

<template>
  <section id="pourqui" class="pourqui">
    <div class="inner">
      <div class="intro">
        <p class="overline">Pour qui</p>
        <h2 class="title">Que ce soit votre histoire ou celle d'un proche.</h2>
      </div>
      <div class="grid">
        <div v-for="card in cards" :key="card.title" class="card">
          <svg width="22" height="28" viewBox="0 0 52 62" fill="none">
            <path
              d="M 2 60 L 2 2 L 50 2 L 50 60"
              stroke="var(--accent)"
              stroke-width="3"
              stroke-linecap="square"
              fill="none"
            />
            <path
              d="M 2 2 L 30 6 L 30 60"
              stroke="var(--accent)"
              stroke-width="2.2"
              stroke-linecap="round"
              opacity=".55"
              fill="none"
            />
            <circle cx="27" cy="33" r="2.5" fill="var(--accent)" />
          </svg>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-body">{{ card.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pourqui {
  padding: 96px 32px;
  background: var(--section-bg);
  border-top: 1px solid var(--border);
}
.inner {
  max-width: 1000px;
  margin: 0 auto;
}
.intro {
  text-align: center;
  max-width: 560px;
  margin: 0 auto 46px;
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
    500 36px/1.18 'Spectral',
    serif;
  color: var(--text-primary);
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}
.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 36px;
}
.card-title {
  margin: 20px 0 0;
  font:
    500 27px/1.2 'Spectral',
    serif;
  color: var(--text-primary);
}
.card-body {
  margin: 12px 0 0;
  font:
    300 15.5px/1.65 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .pourqui { padding: 64px 20px; }
  .title { font-size: 28px; }
  .grid { grid-template-columns: 1fr; gap: 16px; }
  .card { padding: 24px; }
  .card-title { font-size: 22px; }
}

@media (max-width: 480px) {
  .pourqui { padding: 48px 16px; }
  .title { font-size: 24px; }
  .card { padding: 20px; }
  .card-title { font-size: 20px; }
}
</style>
