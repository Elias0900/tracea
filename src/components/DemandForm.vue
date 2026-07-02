<script setup lang="ts">
import { ref, computed } from 'vue'
import { sendQuickDemand } from '@/composables/useEmailjs'
import { isValidEmail, isValidName, isValidPhone } from '@/composables/useValidation'

const name = ref('')
const contact = ref('')
const message = ref('')
const submitted = ref(false)
const sending = ref(false)
const error = ref(false)

const nameTouched = ref(false)
const contactTouched = ref(false)

const nameValid = computed(() => isValidName(name.value))
const contactValid = computed(() => isValidEmail(contact.value) || isValidPhone(contact.value))

const nameError = computed(() => (nameTouched.value && !nameValid.value ? 'Merci d\'indiquer votre nom.' : ''))
const contactError = computed(() =>
  contactTouched.value && !contactValid.value
    ? 'Entrez un numéro de téléphone ou un e-mail valide.'
    : '',
)

const canSubmit = computed(() => nameValid.value && contactValid.value)

async function submit() {
  nameTouched.value = true
  contactTouched.value = true
  if (!canSubmit.value || sending.value) return
  sending.value = true
  error.value = false
  try {
    await sendQuickDemand({
      from_name: name.value,
      from_contact: contact.value,
      message: message.value,
    })
    submitted.value = true
  } catch {
    error.value = true
  } finally {
    sending.value = false
  }
}
function restart() {
  name.value = ''
  contact.value = ''
  message.value = ''
  nameTouched.value = false
  contactTouched.value = false
  submitted.value = false
  error.value = false
}
</script>

<template>
  <section id="demande" class="demande">
    <div class="inner">
      <div class="intro">
        <p class="overline">Être recontacté</p>
        <h2 class="title">Laissez-nous vos coordonnées. Nous vous rappelons.</h2>
        <p class="subtitle">Un premier échange rapide, gratuit et sans engagement.</p>
      </div>

      <div class="form-card">
        <div v-if="!submitted" class="form-body">
          <label class="field-label">Votre nom</label>
          <input
            v-model="name"
            class="field-input"
            :class="{ 'field-input--error': nameError }"
            placeholder="Prénom et nom"
            @blur="nameTouched = true"
          />
          <p v-if="nameError" class="field-error">{{ nameError }}</p>

          <label class="field-label">Téléphone ou e-mail</label>
          <input
            v-model="contact"
            class="field-input"
            :class="{ 'field-input--error': contactError }"
            placeholder="06 … ou vous@exemple.fr"
            @blur="contactTouched = true"
          />
          <p v-if="contactError" class="field-error">{{ contactError }}</p>

          <label class="field-label">Message <span class="optional">(facultatif)</span></label>
          <textarea
            v-model="message"
            class="field-textarea"
            placeholder="Quelques mots sur votre situation…"
          />

          <p v-if="error" class="form-error">
            Une erreur est survenue lors de l'envoi. Merci de réessayer.
          </p>

          <button
            class="nav-next"
            :style="{ opacity: canSubmit && !sending ? '1' : '0.55', pointerEvents: sending ? 'none' : 'auto' }"
            @click="submit"
          >
            {{ sending ? 'Envoi en cours…' : 'Être recontacté' }}
          </button>
        </div>

        <div v-else class="submitted">
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
  max-width: 560px;
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
.subtitle {
  margin: 14px 0 0;
  font:
    300 16px/1.6 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
}
.form-card {
  margin-top: 42px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--card-bg);
  box-shadow: var(--form-shadow);
  overflow: hidden;
}
.form-body {
  padding: 32px 30px;
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
  margin-top: 0;
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
.field-input--error {
  border-color: #c0392b;
}
.field-error {
  margin: 6px 0 0;
  font:
    400 12.5px/1.4 'Work Sans',
    sans-serif;
  color: #c0392b;
}
.field-textarea {
  width: 100%;
  margin-top: 9px;
  min-height: 100px;
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
.form-error {
  margin: 16px 0 0;
  font:
    400 13px/1.5 'Work Sans',
    sans-serif;
  color: #c0392b;
}
.nav-next {
  width: 100%;
  margin-top: 26px;
  padding: 14px 26px;
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
  padding: 44px 30px;
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
    500 26px/1.25 'Spectral',
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
  .form-body { padding: 24px 18px; }
}
</style>
