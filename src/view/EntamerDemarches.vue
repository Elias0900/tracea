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
      <section class="page-hero grain">
        <div class="hero-glow" aria-hidden="true" />
        <div class="page-hero-inner">
          <p class="overline" v-reveal><span class="overline-line" />Entamer les démarches</p>
          <h1 class="title" v-reveal="{ delay: 80 }">Racontez-nous la maison. Nous nous occupons du reste.</h1>
          <p class="lead" v-reveal="{ delay: 180 }">
            Cinq étapes pour nous transmettre toutes les informations utiles. Un médiateur
            étudie ensuite votre dossier et vous recontacte sous 48 heures.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="inner" v-reveal>
          <FullDemandForm />
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding: 104px 32px 80px;
  border-bottom: 1px solid var(--hairline);
  overflow: hidden;
}
.hero-glow {
  position: absolute;
  top: -140px; left: 50%;
  width: 520px; height: 340px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, var(--glow), transparent 70%);
  pointer-events: none;
  z-index: 0;
}
.page-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 620px;
  margin: 0 auto;
  text-align: center;
}
.overline {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font: 500 12px/1 'Work Sans', sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 20px;
}
.overline-line { width: 26px; height: 1px; background: var(--accent); opacity: 0.6; }
.title {
  font: 500 clamp(26px, 4vw, 44px)/1.12 'Spectral', serif;
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
  .section { padding: 48px 16px 64px; }
}

@media (max-width: 480px) {
  .page-hero { padding: 48px 16px 36px; }
}
</style>
