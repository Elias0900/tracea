<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ dark: boolean }>()
defineEmits(['toggle-theme'])

const menuOpen = ref(false)

function goTo(id: string) {
  menuOpen.value = false

  const el = document.getElementById(id)
  if (!el) return

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <header class="header">
    <div class="inner">
      <a class="logo" @click="menuOpen = false">
        <svg width="11" height="32" viewBox="0 0 70 202" fill="none">
          <defs>
            <linearGradient id="gKeyHeader" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stop-color="oklch(0.72 0.08 86)" />
              <stop offset="100%" stop-color="oklch(0.50 0.08 70)" />
            </linearGradient>
          </defs>

          <ellipse
            cx="35"
            cy="52"
            rx="28"
            ry="34"
            stroke="url(#gKeyHeader)"
            stroke-width="3"
            fill="none"
          />
          <ellipse
            cx="35"
            cy="52"
            rx="16"
            ry="22"
            stroke="url(#gKeyHeader)"
            stroke-width="2"
            fill="none"
          />
        </svg>

        <span class="logo-name">Aux Origines</span>
      </a>

      <nav :class="['nav', { 'nav--open': menuOpen }]" aria-label="Navigation principale">
        <!-- FIX: suppression href pour éviter double comportement + warnings IDE -->
        <a class="nav-link" @click.prevent="goTo('principe')">Le principe</a>
        <a class="nav-link" @click.prevent="goTo('parcours')">Le parcours</a>
        <a class="nav-link" @click.prevent="goTo('pourqui')">Pour qui</a>

        <button class="theme-btn" type="button" @click="$emit('toggle-theme')">
          {{ dark ? '☀ Clair' : '◑ Sombre' }}
        </button>

        <a class="cta" @click.prevent="goTo('demande')"> Commencer </a>
      </nav>

      <button
        class="burger"
        type="button"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
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
  transition:
    background 0.4s,
    border-color 0.4s;
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
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 13px;
  text-decoration: none;
}
.logo-name {
  font:
    italic 500 22px/1 'Spectral',
    serif;
  color: var(--text-primary);
  transition: color 0.4s;
}
.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-link {
  cursor: pointer;
  font:
    400 15px/1 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover {
  color: var(--accent);
}

.theme-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 7px 14px;
  font:
    400 13px/1 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    border-color 0.3s,
    color 0.3s;
}
.theme-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.cta {
  cursor: pointer;
  padding: 10px 18px;
  background: var(--accent);
  border: 1.5px solid var(--accent);
  color: #fff;
  font:
    500 14px/1 'Work Sans',
    sans-serif;
  border-radius: 3px;
  text-decoration: none;
  transition:
    background 0.6s ease,
    border-color 0.6s ease,
    color 0.6s ease;
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
  transition:
    transform 0.3s,
    opacity 0.3s;
}
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
  .nav-link {
    cursor: pointer;
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
