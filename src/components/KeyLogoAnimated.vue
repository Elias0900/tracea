<script setup lang="ts">
import logoSrc from '@/assets/double-cle.png'
import { ref } from 'vue'

const animKey = ref(0)

function replay() {
  animKey.value++
}

defineExpose({ replay })
</script>

<template>
  <div class="logo-wrap" @click="replay">
    <div :key="animKey" class="logo-frame">
      <img :src="logoSrc" alt="Logo Aux Origines" class="logo-img" />
      <div class="logo-shimmer" />
    </div>
    <div :key="'word-' + animKey" class="wordmark-wrap">
      <slot>
        <span class="wordmark">Aux Origines<em>.</em></span>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.logo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  cursor: pointer;
  user-select: none;
}

.logo-frame {
  position: relative;
  width: clamp(200px, 32vw, 320px);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  animation:
    heroEntrance 1.5s cubic-bezier(0.22, 1, 0.36, 1) both,
    heroFloat    6s   ease-in-out 1.5s infinite;
  filter: drop-shadow(0 12px 32px oklch(0.50 0.08 70 / var(--logo-shadow-alpha, 0.35)));
}


.logo-shimmer {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: linear-gradient(
    108deg,
    transparent 35%,
    oklch(1 0 0 / 0.45) 50%,
    transparent 65%
  );
  background-size: 250% 100%;
  opacity: var(--logo-halo-alpha, 1);
  animation: shimmer 1.8s ease 0.5s 1 both;
  pointer-events: none;
  mix-blend-mode: overlay;
}

@keyframes heroEntrance {
  from {
    opacity: 0;
    transform: scale(0.80) translateY(36px);
    filter: blur(10px) drop-shadow(0 0 0 transparent);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0) drop-shadow(0 12px 32px oklch(0.50 0.08 70 / var(--logo-shadow-alpha, 0.35)));
  }
}

@keyframes heroFloat {
  0%,  100% { transform: translateY(0px)   rotate(0deg);    }
  33%        { transform: translateY(-10px) rotate(-0.6deg); }
  66%        { transform: translateY(-4px)  rotate(0.4deg);  }
}


@keyframes shimmer {
  from { background-position: 200% 0; opacity: 0; }
  15%  { opacity: var(--logo-halo-alpha, 1); }
  to   { background-position: -200% 0; opacity: 0; }
}

.wordmark-wrap {
  animation: wordFadeIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1s both;
}

@keyframes wordFadeIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.wordmark {
  font: 400 46px/1 'Spectral', serif;
  color: var(--text-primary);
}
.wordmark em { color: var(--accent); }
</style>
