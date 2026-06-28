<script setup lang="ts">
import { ref, computed } from 'vue'

const step = ref(0)
const role = ref<string | null>(null)
const address = ref('')
const era = ref('')
const memory = ref('')
const name = ref('')
const contact = ref('')
const submitted = ref(false)

const canNext = computed(() => {
  if (step.value === 0) return !!role.value
  if (step.value === 1) return address.value.trim().length > 0
  if (step.value === 2) return memory.value.trim().length > 0
  return true
})
const canSubmit = computed(() => name.value.trim().length > 0 && contact.value.trim().length > 0)
const progress = computed(() => ((step.value + 1) / 4) * 100 + '%')
const stepLabel = computed(() => `Étape ${step.value + 1} sur 4`)

function next() {
  if (step.value < 3) step.value++
}
function back() {
  if (step.value > 0) step.value--
}
function submit() {
  if (canSubmit.value) submitted.value = true
}
function restart() {
  step.value = 0
  role.value = null
  address.value = ''
  era.value = ''
  memory.value = ''
  name.value = ''
  contact.value = ''
  submitted.value = false
}
</script>

<template>
  <section id="demande" class="demande">
    <div class="inner">
      <div class="intro">
        <p class="overline">Commencer</p>
        <h2 class="title">Confiez-nous la porte. Nous nous occupons du reste.</h2>
      </div>

      <div class="form-card">
        <!-- Progress bar -->
        <div v-if="!submitted" class="form-progress">
          <div class="progress-header">
            <span class="step-label">{{ stepLabel }}</span>
            <span class="no-commitment">Gratuit · sans engagement</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: progress }" />
          </div>
        </div>

        <div class="form-body">
          <!-- Step 0 — Rôle -->
          <div v-if="!submitted && step === 0">
            <h3 class="step-title">Qui êtes-vous&nbsp;?</h3>
            <div class="choices">
              <button
                :class="['choice', { 'choice--active': role === 'visiteur' }]"
                @click="role = 'visiteur'"
              >
                <span>
                  <strong>C'est ma maison d'enfance</strong>
                  <small>Je souhaite revoir là où j'ai grandi.</small>
                </span>
                <span v-if="role === 'visiteur'" class="check">✓</span>
              </button>
              <button
                :class="['choice', { 'choice--active': role === 'proche' }]"
                @click="role = 'proche'"
              >
                <span>
                  <strong>J'organise pour un proche</strong>
                  <small>Un parent, un proche à qui offrir ce retour.</small>
                </span>
                <span v-if="role === 'proche'" class="check">✓</span>
              </button>
            </div>
          </div>

          <!-- Step 1 — Maison -->
          <div v-if="!submitted && step === 1">
            <h3 class="step-title">La maison.</h3>
            <p class="step-hint">Une adresse approximative suffit pour commencer.</p>
            <label class="field-label">Adresse ou lieu</label>
            <input
              v-model="address"
              class="field-input"
              placeholder="ex. 14 rue des Lilas, Nantes"
            />
            <label class="field-label">Années <span class="optional">(facultatif)</span></label>
            <input v-model="era" class="field-input" placeholder="ex. 1958 – 1974" />
          </div>

          <!-- Step 2 — Mémoire -->
          <div v-if="!submitted && step === 2">
            <h3 class="step-title">Qu'aimeriez-vous revoir&nbsp;?</h3>
            <p class="step-hint">Quelques mots suffisent pour préparer la rencontre.</p>
            <textarea
              v-model="memory"
              class="field-textarea"
              placeholder="La cuisine, la fenêtre de ma chambre, le jardin…"
            />
          </div>

          <!-- Step 3 — Contact -->
          <div v-if="!submitted && step === 3">
            <h3 class="step-title">Comment vous joindre&nbsp;?</h3>
            <p class="step-hint">Un médiateur vous rappelle sous 48 h, sans engagement.</p>
            <label class="field-label">Votre nom</label>
            <input v-model="name" class="field-input" placeholder="Prénom et nom" />
            <label class="field-label">Téléphone ou e-mail</label>
            <input v-model="contact" class="field-input" placeholder="06 … ou vous@exemple.fr" />
          </div>

          <!-- Submitted -->
          <div v-if="submitted" class="submitted">
            <div class="submitted-icon">
              <svg width="22" height="28" viewBox="0 0 52 62" fill="none">
                <path
                  d="M 2 60 L 2 2 L 50 2 L 50 60"
                  stroke="var(--accent)"
                  stroke-width="3.2"
                  stroke-linecap="square"
                />
                <path
                  d="M 2 2 L 30 6 L 30 60"
                  stroke="var(--accent)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
                <circle cx="27" cy="33" r="2.8" fill="var(--accent)" />
              </svg>
            </div>
            <h3 class="submitted-title">Votre demande est entre de bonnes mains.</h3>
            <p class="submitted-body">
              Un médiateur vous rappelle sous 48 heures pour préparer ce retour, à votre rythme.
            </p>
            <button class="submitted-restart" @click="restart">Faire une autre demande</button>
          </div>

          <!-- Navigation -->
          <div v-if="!submitted" class="form-nav">
            <button v-if="step > 0" class="nav-back" @click="back">← Retour</button>
            <span v-else />
            <button
              v-if="step < 3"
              class="nav-next"
              :style="{ opacity: canNext ? '1' : '0.38', pointerEvents: canNext ? 'auto' : 'none' }"
              @click="next"
            >
              Continuer →
            </button>
            <button
              v-if="step === 3"
              class="nav-next"
              :style="{
                opacity: canSubmit ? '1' : '0.38',
                pointerEvents: canSubmit ? 'auto' : 'none',
              }"
              @click="submit"
            >
              Envoyer ma demande
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demande {
  padding: 96px 32px;
  background: var(--bg);
}
.inner {
  max-width: 600px;
  margin: 0 auto;
}
.intro {
  text-align: center;
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
.form-card {
  margin-top: 42px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--card-bg);
  box-shadow: var(--form-shadow);
  overflow: hidden;
}
.form-progress {
  padding: 22px 30px 0;
}
.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.step-label {
  font:
    500 11px/1 'Work Sans',
    sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}
.no-commitment {
  font:
    300 11.5px/1 'Work Sans',
    sans-serif;
  color: var(--text-tertiary);
}
.progress-track {
  margin-top: 11px;
  height: 2.5px;
  border-radius: 3px;
  background: var(--border);
}
.progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
  transition: width 0.4s ease;
}
.form-body {
  padding: 28px 30px;
}

.step-title {
  margin: 0;
  font:
    500 24px/1.3 'Spectral',
    serif;
  color: var(--text-primary);
}
.step-hint {
  margin: 7px 0 0;
  font:
    300 14px/1.5 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
}
.choices {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}
.choice {
  text-align: left;
  cursor: pointer;
  border-radius: 9px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--card-bg);
  border: 1.5px solid var(--border);
  transition:
    background 0.35s ease,
    border-color 0.35s ease;
  width: 100%;
}
.choice:not(.choice--active):hover {
  background: var(--sel-bg);
  border-color: var(--text-tertiary);
}
.choice--active {
  background: var(--sel-bg);
  border-color: var(--accent);
}
.choice strong {
  display: block;
  font:
    500 16px/1.3 'Work Sans',
    sans-serif;
  color: var(--text-primary);
}
.choice small {
  display: block;
  margin-top: 3px;
  font:
    300 13.5px/1.4 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
}
.check {
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}
.field-label {
  display: block;
  margin-top: 16px;
  font:
    500 11px/1 'Work Sans',
    sans-serif;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}
.field-label:first-of-type {
  margin-top: 20px;
}
.optional {
  font-weight: 300;
  text-transform: none;
  color: var(--text-tertiary);
}
.field-input {
  width: 100%;
  margin-top: 9px;
  padding: 13px 15px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font:
    300 15px 'Work Sans',
    sans-serif;
  color: var(--text-primary);
  background: var(--input-bg);
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.field-input:focus {
  border-color: var(--accent);
}
.field-textarea {
  width: 100%;
  margin-top: 18px;
  min-height: 120px;
  resize: vertical;
  padding: 13px 15px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font:
    300 15px/1.55 'Work Sans',
    sans-serif;
  color: var(--text-primary);
  background: var(--input-bg);
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.field-textarea:focus {
  border-color: var(--accent);
}

.form-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 26px;
}
.nav-back {
  background: none;
  border: none;
  cursor: pointer;
  font:
    500 14px/1 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
  transition: color 0.2s;
}
.nav-back:hover {
  color: var(--text-primary);
}
.nav-next {
  padding: 13px 26px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  font:
    500 15px/1 'Work Sans',
    sans-serif;
  cursor: pointer;
  transition: opacity 0.2s;
}
.submitted {
  text-align: center;
  padding: 12px 0;
}
.submitted-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border-radius: 50%;
  background: var(--section-bg);
  border: 1.5px solid var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
}
.submitted-title {
  margin: 22px 0 0;
  font:
    500 28px/1.25 'Spectral',
    serif;
  color: var(--text-primary);
}
.submitted-body {
  margin: 12px auto 0;
  max-width: 400px;
  font:
    300 15px/1.65 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
}
.submitted-restart {
  margin-top: 22px;
  background: none;
  border: none;
  border-bottom: 1.5px solid var(--border);
  cursor: pointer;
  font:
    500 14px/1 'Work Sans',
    sans-serif;
  color: var(--accent);
  padding-bottom: 3px;
}

@media (max-width: 768px) {
  .demande { padding: 64px 16px; }
  .title { font-size: 26px; }
  .form-body { padding: 20px 18px; }
  .form-progress { padding: 18px 18px 0; }
  .nav-next { padding: 12px 18px; font-size: 14px; }
}
</style>
