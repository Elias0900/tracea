<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoSrc from '@/assets/cle-arche.png'

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
        <img :src="logoSrc" alt="Logo Aux Origines" class="logo-img" />
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
        :aria-expanded="menuOpen"
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
  perspective: 500px;
}
.logo-img {
  display: block;
  height: 40px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  mix-blend-mode: var(--logo-blend, multiply);
  filter: var(--logo-filter, none);
  animation:
    headerLogoIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) both,
    headerFlip   10s ease-in-out 2s infinite;
  transition: opacity 0.3s ease;
}
.logo:hover .logo-img {
  opacity: 0.85;
}
@keyframes headerLogoIn {
  from { opacity: 0; transform: scale(0.75); }
  65%  { transform: scale(1.05); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes headerFlip {
  0%    { transform: rotateY(0deg); }
  4%    { transform: rotateY(180deg); }
  8%    { transform: rotateY(360deg); }
  100%  { transform: rotateY(360deg); }
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
