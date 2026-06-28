<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ dark: boolean }>()
defineEmits(['toggle-theme'])

const menuOpen = ref(false)
</script>

<template>
  <header class="header">
    <div class="inner">
      <a href="#top" class="logo" @click="menuOpen = false">
        <svg width="11" height="32" viewBox="0 0 70 202" fill="none">
          <defs>
            <linearGradient id="gKeyHeader" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%"   stop-color="oklch(0.80 0.10 90)"/>
              <stop offset="38%"  stop-color="oklch(0.62 0.09 80)"/>
              <stop offset="100%" stop-color="oklch(0.46 0.08 68)"/>
            </linearGradient>
          </defs>
          <ellipse cx="35" cy="52" rx="28" ry="34" stroke="url(#gKeyHeader)" stroke-width="3.5" fill="none"/>
          <ellipse cx="35" cy="52" rx="16" ry="22" stroke="url(#gKeyHeader)" stroke-width="2.2" fill="none"/>
          <path d="M 28 20 Q 31 12 35 11 Q 39 12 42 20" stroke="url(#gKeyHeader)" stroke-width="2.8" fill="none" stroke-linecap="round"/>
          <path d="M 35 11 L 35 6"   stroke="url(#gKeyHeader)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
          <path d="M 30 7 Q 35 2 40 7" stroke="url(#gKeyHeader)" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M 8 52 C 1 44 3 30 13 27 C 18 25 22 29 18 34 C 14 38 10 37 10 34"    stroke="url(#gKeyHeader)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
          <path d="M 62 52 C 69 44 67 30 57 27 C 52 25 48 29 52 34 C 56 38 60 37 60 34" stroke="url(#gKeyHeader)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
          <path d="M 26 87 C 18 81 22 72 29 75 C 32 76 34 82 35 85 M 44 87 C 52 81 48 72 41 75 C 38 76 36 82 35 85 M 35 85 L 35 78 M 31 79 Q 35 73 39 79" stroke="url(#gKeyHeader)" stroke-width="2" fill="none" stroke-linecap="round"/>
          <ellipse cx="35" cy="90.5" rx="10" ry="2.8" fill="url(#gKeyHeader)"/>
          <ellipse cx="35" cy="96"   rx="9"  ry="2.3" fill="url(#gKeyHeader)"/>
          <ellipse cx="35" cy="101"  rx="8"  ry="2"   fill="url(#gKeyHeader)"/>
          <rect x="31" y="104" width="8" height="56" rx="3" fill="url(#gKeyHeader)"/>
          <path d="M 35 199 C 16 184 14 163 24 158 C 29 154 35 159 35 166 C 35 159 41 154 46 158 C 56 163 54 184 35 199 Z" fill="url(#gKeyHeader)"/>
        </svg>
        <span class="logo-name">le seuil</span>
      </a>

      <nav :class="['nav', { 'nav--open': menuOpen }]">
        <a href="#principe" class="nav-link" @click="menuOpen = false">Le principe</a>
        <a href="#parcours" class="nav-link" @click="menuOpen = false">Le parcours</a>
        <a href="#pourqui" class="nav-link" @click="menuOpen = false">Pour qui</a>
        <button class="theme-btn" @click="$emit('toggle-theme')">
          {{ dark ? '☀ Clair' : '◑ Sombre' }}
        </button>
        <a href="#demande" class="cta" @click="menuOpen = false">Commencer</a>
      </nav>

      <button class="burger" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
        <span :class="['burger-line', { 'burger-line--open': menuOpen }]" />
        <span :class="['burger-line', { 'burger-line--open': menuOpen }]" />
        <span :class="['burger-line', { 'burger-line--open': menuOpen }]" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 60;
  background: var(--header-bg);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  transition: background 0.4s, border-color 0.4s;
}
.inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  gap: 13px;
  text-decoration: none;
}
.logo-name {
  font: italic 500 22px/1 'Spectral', serif;
  color: var(--text-primary);
  transition: color 0.4s;
}
.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-link {
  font: 400 15px/1 'Work Sans', sans-serif;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover { color: var(--accent); }

.theme-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 7px 14px;
  font: 400 13px/1 'Work Sans', sans-serif;
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color 0.3s, color 0.3s;
}
.theme-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.cta {
  padding: 10px 18px;
  background: var(--accent);
  border: 1.5px solid var(--accent);
  color: #fff;
  font: 500 14px/1 'Work Sans', sans-serif;
  border-radius: 3px;
  text-decoration: none;
  transition: background 0.6s ease, border-color 0.6s ease, color 0.6s ease;
}
.cta:hover {
  background: transparent;
  border-color: var(--accent);
  color: var(--accent);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.burger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
.burger-line--open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger-line--open:nth-child(2) { opacity: 0; }
.burger-line--open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .inner {
    padding: 16px 20px;
  }
  .burger {
    display: flex;
  }
  .nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    background: var(--header-bg);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    padding: 12px 20px 20px;
  }
  .nav--open {
    display: flex;
  }
  .nav-link {
    width: 100%;
    padding: 14px 0;
    font-size: 16px;
    border-bottom: 1px solid var(--border);
  }
  .theme-btn {
    margin-top: 14px;
  }
  .cta {
    margin-top: 14px;
    width: 100%;
    text-align: center;
  }
}
</style>
