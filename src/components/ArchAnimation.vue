<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)

function replay() {
  show.value = false
  setTimeout(() => {
    show.value = true
  }, 80)
}
</script>

<template>
  <div class="arch-wrap" @click="replay()">
    <div class="arch-ambient" />

    <svg
      v-if="show"
      width="210"
      height="260"
      viewBox="0 0 100 124"
      fill="none"
      class="arch-svg"
      style="overflow: visible"
    >
      <defs>
        <radialGradient id="arch-grad" cx="50%" cy="28%" r="68%">
          <stop offset="0%" stop-color="#fef3dc" stop-opacity=".90" />
          <stop offset="25%" stop-color="#e8b870" stop-opacity=".70" />
          <stop offset="55%" stop-color="#c48840" stop-opacity=".40" />
          <stop offset="80%" stop-color="#9a6030" stop-opacity=".15" />
          <stop offset="100%" stop-color="#7a4020" stop-opacity="0" />
        </radialGradient>
        <clipPath id="arch-clip">
          <path d="M 14 112 L 14 44 A 36 36 0 0 1 86 44 L 86 112 Z" />
        </clipPath>
      </defs>

      <!-- Warm glow -->
      <ellipse
        cx="50"
        cy="72"
        rx="38"
        ry="46"
        fill="url(#arch-grad)"
        clip-path="url(#arch-clip)"
        style="
          animation:
            glowReveal 2s ease-out 1.5s both,
            glowBreath 5s ease-in-out infinite 3.5s;
          transform-box: fill-box;
          transform-origin: center;
        "
      />

      <!-- Arch stroke -->
      <path
        d="M 14 112 L 14 44 A 36 36 0 0 1 86 44 L 86 112"
        stroke="oklch(0.48 0.025 76)"
        stroke-width="2.6"
        stroke-linecap="round"
        stroke-dasharray="260"
        style="animation: archDraw 2.4s cubic-bezier(0.4, 0, 0.2, 1) both"
      />

      <!-- Threshold line -->
      <line
        x1="4"
        y1="118"
        x2="96"
        y2="118"
        stroke="oklch(0.55 0.08 78)"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-dasharray="100"
        style="animation: seuilIn 1s ease-out 2.3s both"
      />

      <!-- Motes -->
      <circle
        cx="50"
        cy="104"
        r="1.7"
        fill="oklch(0.64 0.08 74)"
        style="
          transform-box: fill-box;
          transform-origin: center;
          animation: mote 5.2s ease-in infinite 3.3s;
        "
      />
      <circle
        cx="36"
        cy="96"
        r="1.1"
        fill="oklch(0.62 0.07 72)"
        style="
          transform-box: fill-box;
          transform-origin: center;
          animation: mote 6.4s ease-in infinite 4.1s;
        "
      />
      <circle
        cx="64"
        cy="99"
        r="1.4"
        fill="oklch(0.63 0.08 76)"
        style="
          transform-box: fill-box;
          transform-origin: center;
          animation: mote 4.8s ease-in infinite 3.8s;
        "
      />
      <circle
        cx="43"
        cy="88"
        r="0.9"
        fill="oklch(0.60 0.07 70)"
        style="
          transform-box: fill-box;
          transform-origin: center;
          animation: mote 5.8s ease-in infinite 4.6s;
        "
      />
      <circle
        cx="60"
        cy="82"
        r="0.8"
        fill="oklch(0.62 0.07 78)"
        style="
          transform-box: fill-box;
          transform-origin: center;
          animation: mote 4.2s ease-in infinite 5.2s;
        "
      />
    </svg>
  </div>
</template>

<style scoped>
.arch-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}

.arch-wrap:hover {
  border-color: oklch(0.32 0.03 230);
}

.arch-ambient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 60% at 50% 44%,
    oklch(0.65 0.08 78 / 0.18),
    transparent 72%
  );
  pointer-events: none;
}
.arch-svg {
  position: relative;
  z-index: 2;
}
</style>
