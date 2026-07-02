<script setup lang="ts">
import { ref, computed } from 'vue'
import { sendFullDemand } from '@/composables/useEmailjs'
import { isValidEmail, isValidName, isValidPhone, isValidPostalCode } from '@/composables/useValidation'

const step = ref(0)
const totalSteps = 5

const roleLabels: Record<string, string> = {
  visiteur: "C'est sa maison d'enfance",
  proche: "Organise pour un proche",
  autre: "Autre situation",
}

const role = ref<string | null>(null)
const address = ref('')
const city = ref('')
const postalCode = ref('')
const era = ref('')
const memory = ref('')
const motivation = ref('')
const name = ref('')
const phone = ref('')
const email = ref('')
const availability = ref('')
const source = ref('')
const extraMessage = ref('')
const consent = ref(false)
const submitted = ref(false)

const addressTouched = ref(false)
const cityTouched = ref(false)
const postalCodeTouched = ref(false)
const memoryTouched = ref(false)
const nameTouched = ref(false)
const phoneTouched = ref(false)
const emailTouched = ref(false)

const addressValid = computed(() => address.value.trim().length > 0)
const cityValid = computed(() => city.value.trim().length > 0)
const postalCodeValid = computed(
  () => postalCode.value.trim().length === 0 || isValidPostalCode(postalCode.value),
)
const memoryValid = computed(() => memory.value.trim().length > 0)
const nameValid = computed(() => isValidName(name.value))
const phoneValid = computed(() => phone.value.trim().length === 0 || isValidPhone(phone.value))
const emailValid = computed(() => email.value.trim().length === 0 || isValidEmail(email.value))
const contactProvided = computed(() => phone.value.trim().length > 0 || email.value.trim().length > 0)

const addressError = computed(() =>
  addressTouched.value && !addressValid.value ? "Merci d'indiquer une adresse." : '',
)
const cityError = computed(() =>
  cityTouched.value && !cityValid.value ? 'Merci d\'indiquer une ville.' : '',
)
const postalCodeError = computed(() =>
  postalCodeTouched.value && !postalCodeValid.value ? 'Code postal invalide (5 chiffres).' : '',
)
const memoryError = computed(() =>
  memoryTouched.value && !memoryValid.value
    ? "Merci de décrire ce que vous aimeriez revoir."
    : '',
)
const nameError = computed(() =>
  nameTouched.value && !nameValid.value ? "Merci d'indiquer votre nom." : '',
)
const phoneError = computed(() =>
  phoneTouched.value && !phoneValid.value ? 'Numéro de téléphone invalide.' : '',
)
const emailError = computed(() =>
  emailTouched.value && !emailValid.value ? 'Adresse e-mail invalide.' : '',
)
const contactError = computed(() =>
  (phoneTouched.value || emailTouched.value) && !contactProvided.value
    ? 'Indiquez au moins un téléphone ou un e-mail.'
    : '',
)

const canNext = computed(() => {
  if (step.value === 0) return !!role.value
  if (step.value === 1) return addressValid.value && cityValid.value && postalCodeValid.value
  if (step.value === 2) return memoryValid.value
  if (step.value === 3) {
    return nameValid.value && phoneValid.value && emailValid.value && contactProvided.value
  }
  return true
})
const canSubmit = computed(() => canNext.value && consent.value)
const progress = computed(() => ((step.value + 1) / totalSteps) * 100 + '%')
const stepLabel = computed(() => `Étape ${step.value + 1} sur ${totalSteps}`)
const sending = ref(false)
const error = ref(false)

function next() {
  if (step.value === 1) {
    addressTouched.value = true
    cityTouched.value = true
    postalCodeTouched.value = true
  }
  if (step.value === 2) memoryTouched.value = true
  if (step.value === 3) {
    nameTouched.value = true
    phoneTouched.value = true
    emailTouched.value = true
  }
  if (!canNext.value) return
  if (step.value < totalSteps - 1) step.value++
}
function back() {
  if (step.value > 0) step.value--
}
async function submit() {
  if (!canSubmit.value || sending.value) return
  sending.value = true
  error.value = false
  try {
    await sendFullDemand({
      role: roleLabels[role.value ?? ''] ?? '',
      address: address.value,
      city: city.value,
      postal_code: postalCode.value,
      era: era.value,
      memory: memory.value,
      motivation: motivation.value,
      from_name: name.value,
      phone: phone.value,
      email: email.value,
      availability: availability.value,
      source: source.value,
      extra_message: extraMessage.value,
    })
    submitted.value = true
  } catch {
    error.value = true
  } finally {
    sending.value = false
  }
}
function restart() {
  step.value = 0
  role.value = null
  address.value = ''
  city.value = ''
  postalCode.value = ''
  era.value = ''
  memory.value = ''
  motivation.value = ''
  name.value = ''
  phone.value = ''
  email.value = ''
  availability.value = ''
  source.value = ''
  extraMessage.value = ''
  consent.value = false
  submitted.value = false
  error.value = false
  addressTouched.value = false
  cityTouched.value = false
  postalCodeTouched.value = false
  memoryTouched.value = false
  nameTouched.value = false
  phoneTouched.value = false
  emailTouched.value = false
}
</script>

<template>
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
          <button
            :class="['choice', { 'choice--active': role === 'autre' }]"
            @click="role = 'autre'"
          >
            <span>
              <strong>Autre situation</strong>
              <small>Je souhaite en discuter avec un médiateur.</small>
            </span>
            <span v-if="role === 'autre'" class="check">✓</span>
          </button>
        </div>
      </div>

      <!-- Step 1 — Maison -->
      <div v-if="!submitted && step === 1">
        <h3 class="step-title">La maison.</h3>
        <p class="step-hint">Le plus de détails possible nous aide à préparer la démarche.</p>
        <label class="field-label">Adresse</label>
        <input
          v-model="address"
          class="field-input"
          :class="{ 'field-input--error': addressError }"
          placeholder="ex. 14 rue des Lilas"
          @blur="addressTouched = true"
        />
        <p v-if="addressError" class="field-error">{{ addressError }}</p>
        <div class="field-row">
          <div>
            <label class="field-label">Ville</label>
            <input
              v-model="city"
              class="field-input"
              :class="{ 'field-input--error': cityError }"
              placeholder="ex. Nantes"
              @blur="cityTouched = true"
            />
            <p v-if="cityError" class="field-error">{{ cityError }}</p>
          </div>
          <div>
            <label class="field-label">Code postal <span class="optional">(facultatif)</span></label>
            <input
              v-model="postalCode"
              class="field-input"
              :class="{ 'field-input--error': postalCodeError }"
              placeholder="ex. 44000"
              inputmode="numeric"
              @blur="postalCodeTouched = true"
            />
            <p v-if="postalCodeError" class="field-error">{{ postalCodeError }}</p>
          </div>
        </div>
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
          :class="{ 'field-input--error': memoryError }"
          placeholder="La cuisine, la fenêtre de ma chambre, le jardin…"
          @blur="memoryTouched = true"
        />
        <p v-if="memoryError" class="field-error">{{ memoryError }}</p>
        <label class="field-label">Pourquoi ce retour compte pour vous <span class="optional">(facultatif)</span></label>
        <textarea
          v-model="motivation"
          class="field-textarea"
          placeholder="Ce que ce lieu représente, ce que vous espérez de cette visite…"
        />
      </div>

      <!-- Step 3 — Contact -->
      <div v-if="!submitted && step === 3">
        <h3 class="step-title">Comment vous joindre&nbsp;?</h3>
        <p class="step-hint">Un médiateur vous rappelle sous 48 h, sans engagement.</p>
        <label class="field-label">Votre nom</label>
        <input
          v-model="name"
          class="field-input"
          :class="{ 'field-input--error': nameError }"
          placeholder="Prénom et nom"
          @blur="nameTouched = true"
        />
        <p v-if="nameError" class="field-error">{{ nameError }}</p>
        <div class="field-row">
          <div>
            <label class="field-label">Téléphone</label>
            <input
              v-model="phone"
              type="tel"
              class="field-input"
              :class="{ 'field-input--error': phoneError }"
              placeholder="06 …"
              @blur="phoneTouched = true"
            />
            <p v-if="phoneError" class="field-error">{{ phoneError }}</p>
          </div>
          <div>
            <label class="field-label">E-mail</label>
            <input
              v-model="email"
              type="email"
              class="field-input"
              :class="{ 'field-input--error': emailError }"
              placeholder="vous@exemple.fr"
              @blur="emailTouched = true"
            />
            <p v-if="emailError" class="field-error">{{ emailError }}</p>
          </div>
        </div>
        <p v-if="contactError" class="field-error">{{ contactError }}</p>
        <label class="field-label">Disponibilités <span class="optional">(facultatif)</span></label>
        <input v-model="availability" class="field-input" placeholder="ex. Semaine, après 18h" />
      </div>

      <!-- Step 4 — Finalisation -->
      <div v-if="!submitted && step === 4">
        <h3 class="step-title">Dernier point.</h3>
        <p class="step-hint">Cela nous permet de vous répondre au mieux.</p>
        <label class="field-label">Comment avez-vous connu Tracea&nbsp;? <span class="optional">(facultatif)</span></label>
        <input v-model="source" class="field-input" placeholder="ex. Recommandation, recherche internet…" />
        <label class="field-label">Message complémentaire <span class="optional">(facultatif)</span></label>
        <textarea
          v-model="extraMessage"
          class="field-textarea"
          placeholder="Toute information utile pour préparer votre démarche…"
        />
        <label class="consent">
          <input type="checkbox" v-model="consent" />
          <span>J'accepte d'être recontacté(e) par Tracea au sujet de ma demande.</span>
        </label>
        <p v-if="error" class="form-error">
          Une erreur est survenue lors de l'envoi. Merci de réessayer.
        </p>
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
        <h3 class="submitted-title">Votre dossier est entre de bonnes mains.</h3>
        <p class="submitted-body">
          Un médiateur étudie votre demande et vous recontacte sous 48 heures pour préparer ce
          retour, à votre rythme.
        </p>
        <button class="submitted-restart" @click="restart">Faire une autre demande</button>
      </div>

      <!-- Navigation -->
      <div v-if="!submitted" class="form-nav">
        <button v-if="step > 0" class="nav-back" @click="back">← Retour</button>
        <span v-else />
        <button
          v-if="step < totalSteps - 1"
          class="nav-next"
          :style="{ opacity: canNext ? '1' : '0.55' }"
          @click="next"
        >
          Continuer →
        </button>
        <button
          v-if="step === totalSteps - 1"
          class="nav-next"
          :style="{
            opacity: canSubmit && !sending ? '1' : '0.38',
            pointerEvents: canSubmit && !sending ? 'auto' : 'none',
          }"
          @click="submit"
        >
          {{ sending ? 'Envoi en cours…' : 'Envoyer ma demande' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-card {
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
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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
.consent {
  margin-top: 22px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}
.consent input {
  margin-top: 3px;
  accent-color: var(--accent);
  flex: none;
}
.consent span {
  font:
    300 13.5px/1.5 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
}
.form-error {
  margin: 16px 0 0;
  font:
    400 13px/1.5 'Work Sans',
    sans-serif;
  color: #c0392b;
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
  max-width: 420px;
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

@media (max-width: 640px) {
  .field-row { grid-template-columns: 1fr; gap: 0; }
  .form-body { padding: 20px 18px; }
  .form-progress { padding: 18px 18px 0; }
  .nav-next { padding: 12px 18px; font-size: 14px; }
}
</style>
