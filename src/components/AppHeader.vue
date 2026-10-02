<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import logoSrc from '@/assets/cle-arche-header.png'

defineProps<{ dark: boolean }>()
defineEmits(['toggle-theme'])

const router   = useRouter()
const route    = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)
const progress = ref(0)
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
function onScroll() {
  scrolled.value = window.scrollY > 12
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header ref="headerEl" class="header" :class="{ 'header--scrolled': scrolled }">
    <span class="progress" :style="{ width: progress + '%' }" aria-hidden="true" />
    <div class="inner">

      <RouterLink to="/" class="logo" @click="closeMenu">
        <span class="logo-halo" />
        <img :src="logoSrc" alt="Logo Tracea" class="logo-img" />
        <span class="logo-name">Tracea</span>
      </RouterLink>

      <!-- Navigation desktop -->
      <nav class="nav-desktop" aria-label="Navigation principale">
        <a class="nav-link" @click.prevent="goTo('principe')">Le principe</a>
        <a class="nav-link" @click.prevent="goTo('parcours')">Le parcours</a>
        <a class="nav-link" @click.prevent="goTo('pourqui')">Pour qui</a>
        <RouterLink to="/tarifs" class="nav-link">Tarifs</RouterLink>
        <RouterLink to="/qui-sommes-nous" class="nav-link">Qui sommes-nous</RouterLink>
      </nav>

      <!-- Actions desktop -->
      <div class="header-actions">
        <button
          class="theme-btn"
          type="button"
          :aria-label="dark ? 'Activer le thème clair' : 'Activer le thème sombre'"
          @click="$emit('toggle-theme')"
        >
          <svg class="theme-icon" :class="{ 'theme-icon--dark': dark }" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
            <circle class="theme-sun" cx="12" cy="12" r="5" fill="currentColor" />
            <g class="theme-rays" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="12" y1="1.5" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22.5" />
              <line x1="1.5" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22.5" y2="12" />
              <line x1="4.2" y1="4.2" x2="5.9" y2="5.9" />
              <line x1="18.1" y1="18.1" x2="19.8" y2="19.8" />
              <line x1="4.2" y1="19.8" x2="5.9" y2="18.1" />
              <line x1="18.1" y1="5.9" x2="19.8" y2="4.2" />
            </g>
            <path class="theme-moon" fill="currentColor"
              d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
          </svg>
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

    <!-- Menu mobile plein écran -->
    <Transition name="overlay">
      <div v-show="menuOpen" class="nav-mobile grain">
        <nav class="mob-nav" aria-label="Navigation mobile">
          <a class="mob-link" style="--i: 0" @click.prevent="goTo('principe')">Le principe</a>
          <a class="mob-link" style="--i: 1" @click.prevent="goTo('parcours')">Le parcours</a>
          <a class="mob-link" style="--i: 2" @click.prevent="goTo('pourqui')">Pour qui</a>
          <RouterLink to="/tarifs" class="mob-link" style="--i: 3" @click="closeMenu">Tarifs</RouterLink>
          <RouterLink to="/qui-sommes-nous" class="mob-link" style="--i: 4" @click="closeMenu">Qui sommes-nous</RouterLink>
          <RouterLink to="/contact" class="mob-link" style="--i: 5" @click="closeMenu">Contact</RouterLink>
        </nav>
        <div class="mob-footer" style="--i: 6">
          <button class="theme-btn theme-btn--wide" type="button" @click="$emit('toggle-theme')">
            <svg class="theme-icon" :class="{ 'theme-icon--dark': dark }" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <circle class="theme-sun" cx="12" cy="12" r="5" fill="currentColor" />
              <g class="theme-rays" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="12" y1="1.5" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22.5" />
                <line x1="1.5" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22.5" y2="12" />
                <line x1="4.2" y1="4.2" x2="5.9" y2="5.9" />
                <line x1="18.1" y1="18.1" x2="19.8" y2="19.8" />
                <line x1="4.2" y1="19.8" x2="5.9" y2="18.1" />
                <line x1="18.1" y1="5.9" x2="19.8" y2="4.2" />
              </g>
              <path class="theme-moon" fill="currentColor"
                d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
            </svg>
            {{ dark ? 'Thème clair' : 'Thème sombre' }}
          </button>
          <a class="cta mob-cta" @click.prevent="goTo('demande')">Commencer</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ─── Structure ────────────────────────────────────── */
.header {
  position: sticky;
  top: 0;
  z-index: 60;
  background: color-mix(in oklab, var(--bg) 60%, transparent);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid transparent;
  transition: background 0.4s, border-color 0.4s, box-shadow 0.4s, backdrop-filter 0.4s;
}
.header--scrolled {
  background: var(--header-bg);
  backdrop-filter: blur(16px) saturate(1.2);
  border-bottom-color: var(--hairline);
  box-shadow: var(--shadow-sm);
}
.progress {
  position: absolute;
  top: 0; left: 0;
  height: 2px;
  background: var(--accent-grad);
  transition: width 0.1s linear;
  z-index: 1;
}
.inner {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 48px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  transition: height 0.4s var(--ease-out);
}
.header--scrolled .inner { height: 62px; }

/* ─── Logo ─────────────────────────────────────────── */
.logo {
  position: relative;
  display: flex;
  align-items: center;
  gap: 13px;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-halo {
  position: absolute;
  left: 8px; top: 50%;
  width: 46px; height: 46px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: radial-gradient(circle, var(--glow), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s;
}
.logo:hover .logo-halo { opacity: 1; }
.logo-img {
  display: block;
  height: var(--logo-size-header);
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  mix-blend-mode: var(--logo-blend, multiply);
  filter: var(--logo-filter, none);
  animation: headerLogoIn 0.8s var(--ease-out) both;
  transition: transform 0.5s var(--ease-spring), height 0.4s var(--ease-out);
}
.header--scrolled .logo-img { height: var(--logo-size-header-scrolled); }
.logo:hover .logo-img { transform: rotate(-4deg) scale(1.03); }
@keyframes headerLogoIn {
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
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
  gap: 28px;
  flex: 1;
}
.nav-link {
  position: relative;
  cursor: pointer;
  font: 400 15px/1 'Work Sans', sans-serif;
  color: var(--text-secondary);
  text-decoration: none;
  white-space: nowrap;
  padding: 6px 0;
  transition: color 0.25s;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 100%; height: 1.5px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s var(--ease-out);
}
.nav-link:hover,
.nav-link.router-link-active { color: var(--accent); }
.nav-link:hover::after,
.nav-link.router-link-active::after { transform: scaleX(1); }

/* ─── Actions desktop ──────────────────────────────── */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.theme-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 38px; height: 38px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color 0.35s, color 0.35s, transform 0.45s var(--ease-spring);
}
.theme-btn:hover { border-color: var(--accent); color: var(--accent); transform: rotate(12deg); }
.theme-btn--wide {
  width: auto;
  border-radius: 20px;
  padding: 0 16px;
  height: 40px;
  font: 400 13px/1 'Work Sans', sans-serif;
}
.theme-btn--wide:hover { transform: none; }

.theme-icon { position: relative; flex-shrink: 0; }
.theme-sun, .theme-rays {
  transform-origin: center;
  transition: opacity 0.4s var(--ease-out), transform 0.5s var(--ease-spring);
}
.theme-moon {
  opacity: 0;
  transform: rotate(-40deg) scale(0.5);
  transform-origin: center;
  transition: opacity 0.4s var(--ease-out), transform 0.5s var(--ease-spring);
}
.theme-icon--dark .theme-sun,
.theme-icon--dark .theme-rays { opacity: 0; transform: scale(0.3); }
.theme-icon--dark .theme-moon { opacity: 1; transform: rotate(0) scale(1); }

.cta {
  position: relative;
  cursor: pointer;
  padding: 11px 20px;
  background: var(--accent-grad);
  color: #fff;
  font: 500 14px/1 'Work Sans', sans-serif;
  border-radius: var(--radius-sm);
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 6px 18px var(--accent-shadow);
  transition: transform 0.35s var(--ease-out), box-shadow 0.35s var(--ease-out);
}
.cta:hover { transform: translateY(-2px); box-shadow: 0 10px 26px var(--accent-shadow); }
.cta:active { transform: translateY(0) scale(0.97); }

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

/* ─── Navigation mobile (plein écran) ─────────────── */
.nav-mobile {
  position: fixed;
  inset: 0;
  z-index: 55;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 90px 32px 40px;
  background: var(--bg);
  overflow-y: auto;
}
.overlay-enter-active, .overlay-leave-active {
  transition: opacity 0.35s var(--ease-out);
}
.overlay-enter-active .mob-link,
.overlay-enter-active .mob-footer {
  transition: transform 0.5s var(--ease-out) calc(var(--i) * 55ms), opacity 0.5s var(--ease-out) calc(var(--i) * 55ms);
}
.overlay-enter-from, .overlay-leave-to { opacity: 0; }
.overlay-enter-from .mob-link,
.overlay-enter-from .mob-footer { transform: translateY(18px); opacity: 0; }

.mob-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mob-link {
  cursor: pointer;
  padding: 14px 4px;
  font: 500 32px/1.15 'Spectral', serif;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: color 0.25s, padding-left 0.25s;
}
.mob-link:hover,
.mob-link.router-link-active {
  color: var(--accent);
  padding-left: 14px;
}

.mob-footer {
  margin-top: 36px;
  padding: 0;
  display: flex;
  gap: 12px;
  align-items: center;
}
.mob-cta {
  flex: 1;
  text-align: center;
  padding: 15px 18px;
}

/* ─── Breakpoint mobile (≤ 900px) ─────────────────── */
@media (max-width: 900px) {
  .inner { padding: 0 20px; height: 62px; }
  .header--scrolled .inner { height: 58px; }
  .nav-desktop  { display: none; }
  .header-actions { display: none; }
  .burger { display: flex; }
}

@media (min-width: 901px) {
  .nav-mobile { display: none !important; }
}

@media (max-width: 480px) {
  .nav-mobile { padding: 80px 20px 32px; }
  .mob-link { font-size: 26px; }
}
</style>
