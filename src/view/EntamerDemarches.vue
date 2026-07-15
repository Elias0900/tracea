<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import FullDemandForm from '@/components/FullDemandForm.vue'
import { useTheme } from '@/composables/useTheme'

const { dark, toggleTheme } = useTheme()
</script>

<template>
  <div>
    <AppHeader :dark="dark" @toggle-theme="toggleTheme" />

    <main>
      <section class="page-hero">
        <div class="page-hero-inner">
          <p class="overline">Entamer les démarches</p>
          <h1 class="title">Racontez-nous la maison. Nous nous occupons du reste.</h1>
          <p class="lead">
            Cinq étapes pour nous transmettre toutes les informations utiles. Un médiateur
            étudie ensuite votre dossier et vous recontacte sous 48 heures.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="inner">
          <FullDemandForm />
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page-hero {
  padding: 96px 32px 72px;
  border-bottom: 1px solid var(--border);
}
.page-hero-inner {
  max-width: 620px;
  margin: 0 auto;
  text-align: center;
}
.overline {
  font: 500 12px/1 'Work Sans', sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 20px;
}
.title {
  font: 500 44px/1.12 'Spectral', serif;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  margin: 0 0 18px;
}
.lead {
  font: 300 17px/1.6 'Work Sans', sans-serif;
  color: var(--text-secondary);
  margin: 0;
}

.section {
  padding: 72px 32px 96px;
  background: var(--bg);
}
.inner {
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .page-hero { padding: 60px 20px 48px; }
  .title { font-size: 32px; }
  .section { padding: 48px 16px 64px; }
}

@media (max-width: 480px) {
  .page-hero { padding: 48px 16px 36px; }
  .title { font-size: 26px; }
}
</style>
