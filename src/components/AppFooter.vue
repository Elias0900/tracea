<script setup lang="ts">
import logoSrc from '@/assets/cle-arche-header.png'

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="topline" aria-hidden="true" />
    <div class="inner">
      <div class="brand-col">
        <RouterLink to="/" class="brand">
          <img :src="logoSrc" alt="Logo Tracea" class="brand-img" />
          <div>
            <span class="brand-name">Tracea</span>
            <span class="brand-sub">médiation · visites accompagnées</span>
          </div>
        </RouterLink>
        <p class="brand-line">Revivre. Ressentir. Transmettre.</p>
      </div>

      <nav class="links" aria-label="Navigation secondaire">
        <div class="link-col">
          <span class="col-title">Service</span>
          <RouterLink to="/qui-sommes-nous" class="link">Qui sommes-nous</RouterLink>
          <RouterLink to="/tarifs" class="link">Tarifs</RouterLink>
          <RouterLink to="/entamer-les-demarches" class="link">Entamer les démarches</RouterLink>
        </div>
        <div class="link-col">
          <span class="col-title">Nous joindre</span>
          <RouterLink to="/contact" class="link">Contact</RouterLink>
          <a href="mailto:tracea.officiel@gmail.com" class="link">tracea.officiel@gmail.com</a>
          <a href="tel:+33184000000" class="link">01 84 00 00 00</a>
        </div>
        <div class="link-col">
          <span class="col-title">Légal</span>
          <RouterLink to="/rgpd" class="link">Politique RGPD</RouterLink>
        </div>
      </nav>
    </div>

    <div class="bottom">
      <span class="copy">© {{ new Date().getFullYear() }} Tracea — Tous droits réservés</span>
      <button class="to-top" type="button" @click="toTop">
        Haut de page <span aria-hidden="true">↑</span>
      </button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  background: var(--footer-bg);
}
.topline {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.5;
}
.inner {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 58px 32px 44px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 48px;
  flex-wrap: wrap;
}
.brand-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
}
.brand-img {
  display: block;
  height: var(--logo-size-footer);
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  mix-blend-mode: screen;
  filter: invert(1) hue-rotate(180deg);
  transition: transform 0.5s var(--ease-spring), opacity 0.4s ease;
}
.brand:hover .brand-img { transform: rotate(-4deg) scale(1.03); opacity: 0.9; }
.brand-name {
  display: block;
  font: italic 600 22px/1 'Spectral', serif;
  color: var(--footer-text);
}
.brand-sub {
  display: block;
  margin-top: 6px;
  font: 300 11px/1 'Work Sans', sans-serif;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--footer-sub);
}
.brand-line {
  margin: 0;
  font: italic 300 14px/1 'Spectral', serif;
  letter-spacing: 0.06em;
  color: var(--footer-logo);
  opacity: 0.7;
}

.links {
  display: flex;
  gap: 52px;
  flex-wrap: wrap;
}
.link-col {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.col-title {
  font: 500 11px/1 'Work Sans', sans-serif;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--footer-sub);
  margin-bottom: 4px;
}
.link {
  position: relative;
  width: fit-content;
  font: 300 13px/1.2 'Work Sans', sans-serif;
  color: var(--footer-sub);
  text-decoration: none;
  transition: color 0.25s, padding-left 0.25s;
}
.link::before {
  content: '';
  position: absolute;
  left: -12px; top: 50%;
  width: 6px; height: 1px;
  background: var(--accent);
  transform: translateY(-50%) scaleX(0);
  transform-origin: left;
  transition: transform 0.25s var(--ease-out);
}
.link:hover { color: var(--footer-text); padding-left: 4px; }
.link:hover::before { transform: translateY(-50%) scaleX(1); }

.bottom {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 18px 32px 30px;
  border-top: 1px solid oklch(1 0 0 / 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.copy {
  font: 300 12px/1 'Work Sans', sans-serif;
  color: var(--footer-sub);
  opacity: 0.6;
}
.to-top {
  background: none;
  border: none;
  cursor: pointer;
  font: 400 12px/1 'Work Sans', sans-serif;
  letter-spacing: 0.06em;
  color: var(--footer-sub);
  display: inline-flex;
  align-items: center;
  gap: 7px;
  transition: color 0.25s;
}
.to-top:hover { color: var(--footer-text); }
.to-top span { transition: transform 0.3s var(--ease-out); }
.to-top:hover span { transform: translateY(-3px); }

@media (max-width: 768px) {
  .inner { padding: 44px 20px 32px; flex-direction: column; gap: 36px; }
  .links { gap: 32px; }
  .bottom { padding: 16px 20px 26px; }
}
</style>
