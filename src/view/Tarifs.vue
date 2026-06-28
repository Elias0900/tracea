<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useTheme } from '@/composables/useTheme'

const { dark, toggleTheme } = useTheme()
</script>

<template>
  <div>
    <AppHeader :dark="dark" @toggle-theme="toggleTheme" />

    <main>
      <!-- Hero -->
      <section class="page-hero">
        <div class="page-hero-inner">
          <p class="overline">Transparence</p>
          <h1 class="title">Des tarifs pensés pour être accessibles.</h1>
          <p class="lead">
            Chaque situation est unique. Nous adaptons notre accompagnement à la complexité
            de la démarche et à la durée de la médiation. Le premier échange est toujours gratuit.
          </p>
        </div>
      </section>

      <!-- Cards -->
      <section class="section">
        <div class="content-inner">
          <div class="cards-grid">

            <div class="card">
              <div class="card-top">
                <span class="card-label">Premier échange</span>
                <span class="card-price">Gratuit</span>
                <span class="card-desc">Sans engagement</span>
              </div>
              <ul class="card-features">
                <li>Écoute de votre situation</li>
                <li>Évaluation de la faisabilité</li>
                <li>Présentation de notre approche</li>
                <li>Réponse sous 24h</li>
              </ul>
              <a href="/contact" class="btn-ghost">Prendre contact</a>
            </div>

            <div class="card card--featured">
              <div class="card-top">
                <span class="card-label">Accompagnement</span>
                <span class="card-price">À partir de 290 €</span>
                <span class="card-desc">Par dossier</span>
              </div>
              <ul class="card-features">
                <li>Prise de contact avec la famille</li>
                <li>Préparation des deux parties</li>
                <li>Présence lors de la visite</li>
                <li>Suivi post-visite (30 jours)</li>
              </ul>
              <a href="#demande" class="btn-primary">Commencer</a>
            </div>

            <div class="card">
              <div class="card-top">
                <span class="card-label">Suivi long terme</span>
                <span class="card-price">Sur devis</span>
                <span class="card-desc">Situations complexes</span>
              </div>
              <ul class="card-features">
                <li>Plusieurs rencontres préparées</li>
                <li>Médiation familiale approfondie</li>
                <li>Suivi personnalisé (3 à 6 mois)</li>
                <li>Accompagnement psychologique</li>
              </ul>
              <a href="/contact" class="btn-ghost">Nous écrire</a>
            </div>

          </div>
        </div>
      </section>

      <!-- Note -->
      <section class="section-alt">
        <div class="note-inner">
          <p class="note-title">Une question sur les tarifs ?</p>
          <p class="note-body">
            Nous comprenons que certaines situations ne rentrent pas dans une case.
            Contactez-nous directement — nous trouverons ensemble une formule adaptée.
          </p>
          <a href="/contact" class="btn-ghost">Nous contacter</a>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page-hero {
  padding: 96px 32px 80px;
  border-bottom: 1px solid var(--border);
}
.page-hero-inner {
  max-width: 680px;
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
  font: 500 48px/1.1 'Spectral', serif;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  margin: 0 0 28px;
}
.lead {
  font: 300 18px/1.7 'Work Sans', sans-serif;
  color: var(--text-secondary);
  margin: 0;
}

.section {
  padding: 80px 32px;
}
.section-alt {
  padding: 64px 32px;
  background: var(--section-bg);
  border-top: 1px solid var(--border);
}
.content-inner {
  max-width: 1060px;
  margin: 0 auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: start;
}
.card {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
}
.card--featured {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent);
}
.card-top {
  padding: 32px 28px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.card-label {
  font: 500 12px/1 'Work Sans', sans-serif;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
}
.card-price {
  font: 400 34px/1 'Spectral', serif;
  color: var(--text-primary);
}
.card-desc {
  font: 300 13px/1 'Work Sans', sans-serif;
  color: var(--text-tertiary);
}
.card-features {
  list-style: none;
  padding: 24px 28px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.card-features li {
  font: 300 14px/1.5 'Work Sans', sans-serif;
  color: var(--text-secondary);
  padding-left: 16px;
  position: relative;
}
.card-features li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 12px;
}
.btn-primary,
.btn-ghost {
  display: block;
  margin: 0 28px 28px;
  padding: 13px 20px;
  text-align: center;
  font: 500 14px/1 'Work Sans', sans-serif;
  border-radius: 3px;
  text-decoration: none;
  transition: background 0.4s, color 0.4s, border-color 0.4s;
}
.btn-primary {
  background: var(--accent);
  border: 1.5px solid var(--accent);
  color: #fff;
}
.btn-primary:hover {
  background: transparent;
  color: var(--accent);
}
.btn-ghost {
  background: transparent;
  border: 1.5px solid var(--border);
  color: var(--text-secondary);
}
.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.note-inner {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.note-title {
  font: 400 24px/1.2 'Spectral', serif;
  color: var(--text-primary);
  margin: 0;
}
.note-body {
  font: 300 15px/1.7 'Work Sans', sans-serif;
  color: var(--text-secondary);
  margin: 0;
}
.note-inner .btn-ghost {
  margin: 8px 0 0;
  padding: 12px 28px;
  display: inline-block;
}

@media (max-width: 900px) {
  .cards-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
}

@media (max-width: 768px) {
  .page-hero { padding: 60px 20px 48px; }
  .title { font-size: 34px; }
  .section, .section-alt { padding: 56px 20px; }
  .cards-grid { max-width: 100%; }
}

@media (max-width: 480px) {
  .title { font-size: 28px; }
  .page-hero { padding: 48px 16px 36px; }
  .section, .section-alt { padding: 40px 16px; }
}
</style>
