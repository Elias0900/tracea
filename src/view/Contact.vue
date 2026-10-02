<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useTheme } from '@/composables/useTheme'

const { dark, toggleTheme } = useTheme()

const name    = ref('')
const email   = ref('')
const message = ref('')
const sent    = ref(false)
const shake   = ref(false)

function submit() {
  if (name.value.trim() && email.value.trim() && message.value.trim()) {
    sent.value = true
    return
  }
  shake.value = false
  requestAnimationFrame(() => { shake.value = true })
  setTimeout(() => { shake.value = false }, 500)
}
</script>

<template>
  <div>
    <AppHeader :dark="dark" @toggle-theme="toggleTheme" />

    <main>
      <section class="page-hero grain">
        <div class="hero-glow" aria-hidden="true" />
        <div class="page-hero-inner">
          <p class="overline" v-reveal><span class="overline-line" />Contact</p>
          <h1 class="title" v-reveal="{ delay: 80 }">Écrivez-nous.</h1>
          <p class="lead" v-reveal="{ delay: 180 }">Nous répondons dans les 24 heures.</p>
        </div>
      </section>

      <section class="section">
        <div class="layout">

          <!-- Form -->
          <div class="form-col" v-reveal>
            <div v-if="!sent" class="form-card" :class="{ 'form-card--shake': shake }">
              <form class="form" @submit.prevent="submit">
                <div class="field">
                  <label class="label" for="c-name">Votre nom</label>
                  <input id="c-name" v-model="name" class="input" type="text"
                    placeholder="Marie Dupont" required />
                </div>
                <div class="field">
                  <label class="label" for="c-email">Adresse e-mail</label>
                  <input id="c-email" v-model="email" class="input" type="email"
                    placeholder="marie@exemple.fr" required />
                </div>
                <div class="field">
                  <label class="label" for="c-message">Votre message</label>
                  <textarea id="c-message" v-model="message" class="input textarea"
                    placeholder="Décrivez votre situation en quelques lignes…" rows="6" required />
                </div>
                <button class="btn-submit" type="submit"
                  :disabled="!name.trim() || !email.trim() || !message.trim()">
                  Envoyer le message
                </button>
              </form>
            </div>

            <div v-else class="sent-card">
              <span class="sent-icon">✓</span>
              <p class="sent-title">Message envoyé.</p>
              <p class="sent-body">
                Nous avons bien reçu votre message et vous répondrons sous 24h.
              </p>
              <button class="btn-ghost" type="button" @click="sent = false; name = ''; email = ''; message = ''">
                Envoyer un autre message
              </button>
            </div>
          </div>

          <!-- Info -->
          <aside class="info-col" v-reveal="{ delay: 140 }">
            <div class="info-block">
              <span class="info-label">E-mail</span>
              <a href="mailto:contact@tracea.fr" class="info-value">contact@tracea.fr</a>
            </div>
            <div class="info-block">
              <span class="info-label">Téléphone</span>
              <a href="tel:+33184000000" class="info-value">01 84 00 00 00</a>
            </div>
            <div class="info-block">
              <span class="info-label">Horaires</span>
              <span class="info-value">Lun – Ven, 9h – 18h</span>
            </div>
            <div class="info-block">
              <span class="info-label">Délai de réponse</span>
              <span class="info-value">Moins de 24h</span>
            </div>
          </aside>

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
  top: -140px; left: 30%;
  width: 520px; height: 340px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, var(--glow), transparent 70%);
  pointer-events: none;
  z-index: 0;
}
.page-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 560px;
  margin: 0 auto;
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
  font: 500 clamp(28px, 4.8vw, 52px)/1.08 'Spectral', serif;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  margin: 0 0 16px;
}
.lead {
  font: 300 18px/1.5 'Work Sans', sans-serif;
  color: var(--text-secondary);
  margin: 0;
}

.section {
  padding: 72px 32px 96px;
}
.layout {
  max-width: 1060px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 64px;
  align-items: start;
}

.form-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 40px;
  box-shadow: var(--shadow-md);
}
.form-card--shake { animation: shakeForm 0.5s var(--ease-out); }
@keyframes shakeForm {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(7px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(3px); }
}
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.label {
  font: 400 13px/1 'Work Sans', sans-serif;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
}
.input {
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 12px 14px;
  font: 300 15px/1 'Work Sans', sans-serif;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.2s;
  resize: none;
}
.input:focus { border-color: var(--accent); }
.textarea { line-height: 1.6; }
.btn-submit {
  padding: 15px 24px;
  background: var(--accent-grad);
  border: 1.5px solid transparent;
  color: #fff;
  font: 500 14px/1 'Work Sans', sans-serif;
  border-radius: var(--radius-sm);
  cursor: pointer;
  box-shadow: 0 8px 22px var(--accent-shadow);
  transition: transform 0.35s var(--ease-out), box-shadow 0.35s var(--ease-out);
}
.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px var(--accent-shadow);
}
.btn-submit:active:not(:disabled) { transform: translateY(0) scale(0.97); }
.btn-submit:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.sent-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 56px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}
.sent-icon {
  font-size: 28px;
  color: var(--accent);
}
.sent-title {
  font: 400 24px/1 'Spectral', serif;
  color: var(--text-primary);
  margin: 0;
}
.sent-body {
  font: 300 15px/1.6 'Work Sans', sans-serif;
  color: var(--text-secondary);
  margin: 0;
}
.btn-ghost {
  margin-top: 8px;
  padding: 11px 22px;
  background: transparent;
  border: 1.5px solid var(--border);
  color: var(--text-secondary);
  font: 400 13px/1 'Work Sans', sans-serif;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}
.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.info-col {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-top: 8px;
}
.info-block {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border);
}
.info-block:last-child { border-bottom: none; padding-bottom: 0; }
.info-label {
  font: 500 11px/1 'Work Sans', sans-serif;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}
.info-value {
  font: 300 16px/1.4 'Work Sans', sans-serif;
  color: var(--text-primary);
  text-decoration: none;
}
a.info-value:hover { color: var(--accent); }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 768px) {
  .page-hero { padding: 60px 20px 48px; }
  .section { padding: 48px 20px 64px; }
  .form-card { padding: 28px 20px; }
}

@media (max-width: 480px) {
  .page-hero { padding: 48px 16px 36px; }
  .section { padding: 36px 16px 48px; }
}
</style>
