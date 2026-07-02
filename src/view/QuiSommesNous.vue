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
          <p class="overline">Notre histoire</p>
          <h1 class="title">Nés d'un désir que beaucoup portent en silence.</h1>
          <p class="lead">
            Tracea est né d'une observation simple : des millions de personnes portent
            en elles le souvenir d'une maison, d'un appartement, d'un lieu d'enfance
            qu'elles ne reverront peut-être jamais — non par impossibilité géographique,
            mais par impossibilité humaine. Nous avons voulu changer cela.
          </p>
        </div>
      </section>

      <!-- Mission -->
      <section class="section-alt">
        <div class="content-inner">
          <div class="two-col">
            <div>
              <h2 class="section-title">Notre mission</h2>
              <p class="body-text">
                Nous créons le cadre de confiance qui rend possible une visite que personne
                n'oserait organiser seul. Ni intrusion, ni confrontation : une rencontre
                préparée, accompagnée, et respectueuse de chaque partie.
              </p>
              <p class="body-text">
                Le médiateur reste présent tout au long du processus — de la première
                prise de contact jusqu'au suivi après la visite.
              </p>
            </div>
            <div>
              <h2 class="section-title">Nos valeurs</h2>
              <ul class="values-list">
                <li class="value-item">
                  <span class="value-name">Discrétion</span>
                  <span class="value-desc">Chaque démarche reste strictement confidentielle.</span>
                </li>
                <li class="value-item">
                  <span class="value-name">Empathie</span>
                  <span class="value-desc">Nous écoutons avant d'agir, toujours.</span>
                </li>
                <li class="value-item">
                  <span class="value-name">Équilibre</span>
                  <span class="value-desc">Nous accompagnons les deux familles avec la même attention.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="section">
        <div class="content-inner">
          <p class="overline">L'équipe</p>
          <h2 class="section-title centered">Des médiateurs formés à l'écoute.</h2>
          <p class="body-text centered">
            Notre équipe réunit des professionnels issus de la médiation familiale,
            de la psychologie et du travail social. Chacun partage la même conviction :
            certains liens méritent d'être préservés.
          </p>
          <div class="team-grid">
            <div class="team-card">
              <div class="team-avatar" />
              <span class="team-name">Nicolas P.</span>
              <span class="team-role">Co-Fondateur</span>
            </div>
            <div class="team-card">
              <div class="team-avatar" />
              <span class="team-name">Laurine L.</span>
              <span class="team-role">Co-Fondatrice</span>
            </div>
            <div class="team-card">
              <div class="team-avatar" />
              <span class="team-name">Elias G.</span>
              <span class="team-role">Co-Fondateur</span>
            </div>
          </div>
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
  max-width: 760px;
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
  padding: 80px 32px;
  background: var(--section-bg);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.content-inner {
  max-width: 1060px;
  margin: 0 auto;
}
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
}
.section-title {
  font: 400 28px/1.2 'Spectral', serif;
  color: var(--text-primary);
  margin: 0 0 20px;
}
.section-title.centered { text-align: center; }
.body-text {
  font: 300 16px/1.7 'Work Sans', sans-serif;
  color: var(--text-secondary);
  margin: 0 0 16px;
}
.body-text.centered { text-align: center; max-width: 600px; margin: 0 auto 16px; }

.values-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.value-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 16px;
  border-left: 2px solid var(--accent);
}
.value-name {
  font: 500 15px/1 'Work Sans', sans-serif;
  color: var(--text-primary);
}
.value-desc {
  font: 300 14px/1.5 'Work Sans', sans-serif;
  color: var(--text-secondary);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 48px;
}
.team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 24px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 4px;
}
.team-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--border);
}
.team-name {
  font: 500 16px/1 'Spectral', serif;
  color: var(--text-primary);
}
.team-role {
  font: 300 13px/1 'Work Sans', sans-serif;
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .two-col { grid-template-columns: 1fr; gap: 40px; }
  .team-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .page-hero { padding: 60px 20px 48px; }
  .title { font-size: 34px; }
  .section, .section-alt { padding: 56px 20px; }
}

@media (max-width: 560px) {
  .title { font-size: 28px; }
  .team-grid { grid-template-columns: 1fr; }
  .page-hero { padding: 48px 16px 36px; }
  .section, .section-alt { padding: 40px 16px; }
}
</style>
