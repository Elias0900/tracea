<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="inner">
      <a href="#top" class="logo">
        <svg width="16" height="20" viewBox="0 0 52 62" fill="none" style="opacity: 0.85">
          <path
            d="M 2 60 L 2 2 L 50 2 L 50 60"
            stroke="var(--logo-stroke)"
            stroke-width="2.8"
            stroke-linecap="square"
            fill="none"
          />
          <path
            d="M 2 2 L 30 6 L 30 60"
            stroke="var(--accent)"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
          />
          <circle cx="27" cy="33" r="2.5" fill="var(--accent)" />
        </svg>
        <span class="logo-name">le seuil</span>
      </a>

      <nav class="nav">
        <a href="#principe" class="nav-link">Le principe</a>
        <a href="#parcours" class="nav-link">Le parcours</a>
        <a href="#pourqui" class="nav-link">Pour qui</a>
        <a href="#demande" class="cta">Commencer</a>
      </nav>
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
  font:
    italic 500 22px/1 'Cormorant Garamond',
    serif;
  color: var(--text-primary);
}
.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-link {
  font:
    400 15px/1 'Jost',
    sans-serif;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover {
  color: var(--accent);
}
.cta {
  padding: 10px 18px;
  background: var(--accent);
  border: 1.5px solid var(--accent);
  color: #fff;
  font:
    500 14px/1 'Jost',
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
</style>
