<script setup lang="ts">
import logoSrc from '@/assets/cle-arche.png'
import { ref } from 'vue'

const animKey = ref(0)
function replay() { animKey.value++ }
defineExpose({ replay })
</script>

<template>
  <div class="logo-wrap" @click="replay">
    <!-- Le frame porte l'animation transform — l'image garde son mix-blend-mode intact -->
    <div class="logo-frame">
      <div :key="animKey" class="logo-inner">
        <img :src="logoSrc" alt="Logo Aux Origines" class="logo-img" />
      </div>
    </div>

    <p :key="'w-' + animKey" class="wordmark">
      <slot>Aux&nbsp;Origines<em>.</em></slot>
    </p>
  </div>
</template>

<style scoped>
.logo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
}

/* ── Float : enveloppe qui flotte en boucle ── */
.logo-frame {
  width: clamp(150px, 20vw, 240px);
  height: clamp(150px, 20vw, 240px);
  animation: frameFloat 4s ease-in-out infinite;
}

/* ── Inner : entrée scale (ne touche pas transform du parent) ── */
.logo-inner {
  width: 100%;
  height: 100%;
  animation: frameIn 1.1s cubic-bezier(0.34, 1.42, 0.64, 1) both;
}

@keyframes frameIn {
  from { transform: scale(0.78) translateY(24px); opacity: 0; }
  to   { transform: scale(1)    translateY(0);    opacity: 1; }
}

@keyframes frameFloat {
  0%,  100% { transform: translateY(0);     }
  50%        { transform: translateY(-13px); }
}

/* ── Image : blend mode uniquement ── */
.logo-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: var(--logo-blend, multiply);
  filter: var(--logo-filter, none);
}

/* ── Wordmark ── */
.wordmark {
  margin: 0;
  font: italic 400 44px/1 'Spectral', serif;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  animation: wordIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.7s both;
}

.wordmark em {
  font-style: normal;
  color: var(--accent);
}

@keyframes wordIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0);    }
}
</style>
