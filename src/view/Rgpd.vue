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
      <section class="page-hero">
        <div class="page-hero-inner">
          <p class="overline">Légal</p>
          <h1 class="title">Protection des données personnelles</h1>
          <p class="lead">Dernière mise à jour : janvier 2025</p>
        </div>
      </section>

      <section class="section">
        <div class="prose-inner">

          <div class="prose-block">
            <h2>1. Responsable du traitement</h2>
            <p>
              Aux Origines — médiation et visites accompagnées, dont le siège social est situé
              à Paris (France), est responsable du traitement de vos données personnelles
              collectées via ce site.
            </p>
            <p>Contact : <a href="mailto:contact@aux-origines.fr">contact@aux-origines.fr</a></p>
          </div>

          <div class="prose-block">
            <h2>2. Données collectées</h2>
            <p>Nous collectons uniquement les données que vous nous transmettez volontairement :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone (facultatif)</li>
              <li>Informations relatives à votre situation, partagées lors du formulaire de demande</li>
            </ul>
            <p>
              Nous ne collectons aucune donnée de navigation, n'utilisons pas de cookies
              à des fins publicitaires et ne recourons à aucun outil d'analyse tiers.
            </p>
          </div>

          <div class="prose-block">
            <h2>3. Finalités du traitement</h2>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul>
              <li>Répondre à votre demande d'accompagnement</li>
              <li>Organiser la médiation et les visites</li>
              <li>Vous contacter dans le cadre de votre dossier</li>
            </ul>
            <p>Elles ne sont jamais transmises à des tiers, vendues ou utilisées à des fins commerciales.</p>
          </div>

          <div class="prose-block">
            <h2>4. Base légale</h2>
            <p>
              Le traitement est fondé sur votre consentement explicite (article 6.1.a du RGPD),
              recueilli lors de la soumission de votre formulaire de demande.
            </p>
          </div>

          <div class="prose-block">
            <h2>5. Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant la durée de votre accompagnement,
              puis pendant 3 ans à compter de la clôture de votre dossier, conformément
              aux obligations légales en matière de médiation.
            </p>
          </div>

          <div class="prose-block">
            <h2>6. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li><strong>Accès</strong> — obtenir une copie de vos données</li>
              <li><strong>Rectification</strong> — corriger des données inexactes</li>
              <li><strong>Effacement</strong> — demander la suppression de vos données</li>
              <li><strong>Portabilité</strong> — recevoir vos données dans un format structuré</li>
              <li><strong>Opposition</strong> — vous opposer à certains traitements</li>
            </ul>
            <p>
              Pour exercer ces droits, écrivez-nous à
              <a href="mailto:contact@aux-origines.fr">contact@aux-origines.fr</a>.
              Vous pouvez également introduire une réclamation auprès de la CNIL
              (<a href="https://www.cnil.fr" target="_blank" rel="noopener">www.cnil.fr</a>).
            </p>
          </div>

          <div class="prose-block">
            <h2>7. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
              pour protéger vos données contre tout accès non autorisé, perte ou divulgation.
              Les échanges sur ce site sont chiffrés via le protocole HTTPS.
            </p>
          </div>

        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page-hero {
  padding: 80px 32px 56px;
  border-bottom: 1px solid var(--border);
}
.page-hero-inner {
  max-width: 720px;
  margin: 0 auto;
}
.overline {
  font: 500 12px/1 'Work Sans', sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 20px;
}
.title {
  font: 400 38px/1.15 'Spectral', serif;
  color: var(--text-primary);
  margin: 0 0 14px;
}
.lead {
  font: 300 14px/1 'Work Sans', sans-serif;
  color: var(--text-tertiary);
  margin: 0;
}

.section {
  padding: 64px 32px 96px;
}
.prose-inner {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.prose-block h2 {
  font: 400 20px/1.3 'Spectral', serif;
  color: var(--text-primary);
  margin: 0 0 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}
.prose-block p {
  font: 300 15px/1.75 'Work Sans', sans-serif;
  color: var(--text-secondary);
  margin: 0 0 10px;
}
.prose-block p:last-child { margin-bottom: 0; }
.prose-block ul {
  padding-left: 0;
  margin: 10px 0 14px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.prose-block li {
  font: 300 15px/1.6 'Work Sans', sans-serif;
  color: var(--text-secondary);
  padding-left: 18px;
  position: relative;
}
.prose-block li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 12px;
  top: 3px;
}
.prose-block a {
  color: var(--accent-text);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.prose-block strong {
  font-weight: 500;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .page-hero { padding: 56px 20px 40px; }
  .title { font-size: 28px; }
  .section { padding: 48px 20px 64px; }
}

@media (max-width: 480px) {
  .page-hero { padding: 40px 16px 28px; }
  .title { font-size: 24px; }
  .section { padding: 36px 16px 48px; }
}
</style>
