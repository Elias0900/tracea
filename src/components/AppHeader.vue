<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

defineProps<{ dark: boolean }>()
defineEmits(['toggle-theme'])

const router   = useRouter()
const route    = useRoute()
const menuOpen = ref(false)
const headerEl = ref<HTMLElement | null>(null)

function closeMenu() { menuOpen.value = false }

function goTo(id: string) {
  closeMenu()
  if (route.path !== '/') {
    router.push(`/#${id}`)
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onClickOutside(e: MouseEvent) {
  if (menuOpen.value && headerEl.value && !headerEl.value.contains(e.target as Node)) {
    closeMenu()
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <header ref="headerEl" class="header">
    <div class="inner">

      <RouterLink to="/" class="logo" @click="closeMenu">
        <svg width="11" height="32" viewBox="0 0 70 202" fill="none">
          <defs>
            <linearGradient id="gKeyHeader" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stop-color="oklch(0.72 0.08 86)" />
              <stop offset="100%" stop-color="oklch(0.50 0.08 70)" />
            </linearGradient>
          </defs>
          <ellipse cx="35" cy="52" rx="28" ry="34" stroke="url(#gKeyHeader)" stroke-width="3"   fill="none"/>
          <ellipse cx="35" cy="52" rx="16" ry="22" stroke="url(#gKeyHeader)" stroke-width="2"   fill="none"/>
          <path d="M 28 20 Q 31 12 35 11 Q 39 12 42 20" stroke="url(#gKeyHeader)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M 35 11 L 35 6"                       stroke="url(#gKeyHeader)" stroke-width="2"   fill="none" stroke-linecap="round"/>
          <path d="M 30 7 Q 35 2 40 7"                   stroke="url(#gKeyHeader)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <path d="M 8 52 C 1 44 3 30 13 27 C 18 25 22 29 18 34"    stroke="url(#gKeyHeader)" stroke-width="2"   fill="none" stroke-linecap="round"/>
          <path d="M 18 34 C 14 38 10 37 10 34"                      stroke="url(#gKeyHeader)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <path d="M 62 52 C 69 44 67 30 57 27 C 52 25 48 29 52 34" stroke="url(#gKeyHeader)" stroke-width="2"   fill="none" stroke-linecap="round"/>
          <path d="M 52 34 C 56 38 60 37 60 34"                      stroke="url(#gKeyHeader)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <path d="M 26 87 C 18 81 22 72 29 75 C 32 76 34 82 35 85 M 44 87 C 52 81 48 72 41 75 C 38 76 36 82 35 85 M 35 85 L 35 78 M 31 79 Q 35 73 39 79" stroke="url(#gKeyHeader)" stroke-width="1.9" fill="none" stroke-linecap="round"/>
          <rect x="31" y="88" width="8" height="72" rx="3" fill="url(#gKeyHeader)"/>
          <path d="M 35 199 C 16 184 14 163 24 158 C 29 154 35 159 35 166 C 35 159 41 154 46 158 C 56 163 54 184 35 199 Z" fill="url(#gKeyHeader)"/>
        </svg>
        <span class="logo-name">Aux Origines</span>
      </RouterLink>

      <!-- Navigation desktop -->
      <nav class="nav-desktop" aria-label="Navigation principale">
        <a class="nav-link" @click.prevent="goTo('principe')">Le principe</a>
        <a class="nav-link" @click.prevent="goTo('parcours')">Le parcours</a>
        <a class="nav-link" @click.prevent="goTo('pourqui')">Pour qui</a>
        <RouterLink to="/qui-sommes-nous" class="nav-link">Qui sommes-nous</RouterLink>
        <RouterLink to="/tarifs"          class="nav-link">Tarifs</RouterLink>
      </nav>

      <!-- Actions desktop -->
      <div class="header-actions">
        <button class="theme-btn" type="button" @click="$emit('toggle-theme')">
          {{ dark ? '☀ Clair' : '◑ Sombre' }}
        </button>
        <a class="cta" @click.prevent="goTo('demande')">Commencer</a>
      </div>

      <!-- Bouton burger (mobile) -->
      <button
        class="burger"
        type="button"
        :aria-expanded="String(menuOpen)"
        aria-label="Ouvrir le menu"
        @click.stop="menuOpen = !menuOpen"
      >
        <span class="bar bar-1" :class="{ 'bar--open': menuOpen }" />
        <span class="bar bar-2" :class="{ 'bar--open': menuOpen }" />
        <span class="bar bar-3" :class="{ 'bar--open': menuOpen }" />
      </button>
    </div>

    <!-- Dropdown mobile -->
    <div v-show="menuOpen" class="nav-mobile">
      <a class="mob-link" @click.prevent="goTo('principe')">Le principe</a>
      <a class="mob-link" @click.prevent="goTo('parcours')">Le parcours</a>
      <a class="mob-link" @click.prevent="goTo('pourqui')">Pour qui</a>
      <RouterLink to="/qui-sommes-nous" class="mob-link" @click="closeMenu">Qui sommes-nous</RouterLink>
      <RouterLink to="/tarifs"          class="mob-link" @click="closeMenu">Tarifs</RouterLink>
      <RouterLink to="/contact"         class="mob-link" @click="closeMenu">Contact</RouterLink>
      <div class="mob-footer">
        <button class="theme-btn" type="button" @click="$emit('toggle-theme')">
          {{ dark ? '☀ Clair' : '◑ Sombre' }}
        </button>
        <a class="cta mob-cta" @click.prevent="goTo('demande')">Commencer</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* ─── Structure ────────────────────────────────────── */
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
  padding: 0 48px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

/* ─── Logo ─────────────────────────────────────────── */
.logo {
  display: flex;
  align-items: center;
  gap: 13px;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-name {
  font: italic 500 22px/1 'Spectral', serif;
  color: var(--text-primary);
  transition: color 0.4s;
}

/* ─── Navigation desktop ───────────────────────────── */
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
}
.nav-link {
  cursor: pointer;
  font: 400 15px/1 'Work Sans', sans-serif;
  color: var(--text-secondary);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s;
}
.nav-link:hover,
.nav-link.router-link-active { color: var(--accent); }

/* ─── Actions desktop ──────────────────────────────── */
.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}
.theme-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 7px 14px;
  font: 400 13px/1 'Work Sans', sans-serif;
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.3s, color 0.3s;
}
.theme-btn:hover { border-color: var(--accent); color: var(--accent); }

.cta {
  cursor: pointer;
  padding: 10px 18px;
  background: var(--accent);
  border: 1.5px solid var(--accent);
  color: #fff;
  font: 500 14px/1 'Work Sans', sans-serif;
  border-radius: 3px;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.5s ease, border-color 0.5s ease, color 0.5s ease;
}
.cta:hover { background: transparent; border-color: var(--accent); color: var(--accent); }

/* ─── Burger ───────────────────────────────────────── */
.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}
.bar {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transform-origin: center;
}
.bar-1.bar--open { transform: translateY(7px) rotate(45deg); }
.bar-2.bar--open { opacity: 0; transform: scaleX(0); }
.bar-3.bar--open { transform: translateY(-7px) rotate(-45deg); }

/* ─── Navigation mobile (dropdown) ────────────────── */
.nav-mobile {
  display: flex;
  flex-direction: column;
  background: var(--header-bg);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.mob-link {
  cursor: pointer;
  padding: 15px 24px;
  font: 400 16px/1 'Work Sans', sans-serif;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: color 0.2s, background 0.2s;
}
.mob-link:last-of-type { border-bottom: none; }
.mob-link:hover,
.mob-link.router-link-active { color: var(--accent); background: var(--section-bg); }

.mob-footer {
  padding: 16px 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-top: 1px solid var(--border);
}
.mob-cta {
  flex: 1;
  text-align: center;
}

/* ─── Breakpoint mobile (≤ 900px) ─────────────────── */
@media (max-width: 900px) {
  .inner { padding: 0 20px; height: 60px; }
  .nav-desktop  { display: none; }
  .header-actions { display: none; }
  .burger { display: flex; }
}

/* Forcer le masquage du dropdown sur desktop (si resize) */
@media (min-width: 901px) {
  .nav-mobile { display: none !important; }
}
</style>
