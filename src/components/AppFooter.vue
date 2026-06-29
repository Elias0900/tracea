<script setup lang="ts">
import logoSrc from '@/assets/cle-arche.png'
</script>

<template>
  <footer class="footer">
    <div class="inner">

      <RouterLink to="/" class="brand">
        <img :src="logoSrc" alt="Logo Aux Origines" class="brand-img" />
        <div>
          <span class="brand-name">Aux Origines</span>
          <span class="brand-sub">médiation · visites accompagnées</span>
        </div>
      </RouterLink>

      <nav class="links" aria-label="Navigation secondaire">
        <div class="link-col">
          <span class="col-title">Service</span>
          <RouterLink to="/qui-sommes-nous" class="link">Qui sommes-nous</RouterLink>
          <RouterLink to="/tarifs" class="link">Tarifs</RouterLink>
        </div>
        <div class="link-col">
          <span class="col-title">Nous joindre</span>
          <RouterLink to="/contact" class="link">Contact</RouterLink>
          <a href="mailto:contact@aux-origines.fr" class="link">contact@aux-origines.fr</a>
          <a href="tel:+33184000000" class="link">01 84 00 00 00</a>
        </div>
        <div class="link-col">
          <span class="col-title">Légal</span>
          <RouterLink to="/rgpd" class="link">Politique RGPD</RouterLink>
        </div>
      </nav>

    </div>

    <div class="bottom">
      <span class="copy">© {{ new Date().getFullYear() }} Aux Origines — Tous droits réservés</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--footer-bg);
  border-top: 1px solid var(--border);
}
.inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 52px 32px 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
}
.brand {
  display: flex;
  align-items: center;
  gap: 13px;
  text-decoration: none;
}
.brand-img {
  display: block;
  height: 60px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  mix-blend-mode: screen;
  filter: invert(1) hue-rotate(180deg);
  animation: footerLogoIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.brand:hover .brand-img {
  transform: scale(1.07) translateY(-3px);
  opacity: 0.85;
}
@keyframes footerLogoIn {
  from { opacity: 0; transform: scale(0.82) translateY(14px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.brand-name {
  display: block;
  font: italic 600 22px/1 'Spectral', serif;
  color: var(--footer-text);
}
.brand-sub {
  display: block;
  margin-top: 5px;
  font: 300 11px/1 'Work Sans', sans-serif;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--footer-sub);
}

.links {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
}
.link-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.col-title {
  font: 500 11px/1 'Work Sans', sans-serif;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--footer-sub);
  margin-bottom: 4px;
}
.link {
  font: 300 13px/1 'Work Sans', sans-serif;
  color: var(--footer-sub);
  text-decoration: none;
  transition: color 0.2s;
}
.link:hover { color: var(--footer-text); }

.bottom {
  max-width: 1160px;
  margin: 0 auto;
  padding: 16px 32px 28px;
  border-top: 1px solid oklch(1 0 0 / .06);
}
.copy {
  font: 300 12px/1 'Work Sans', sans-serif;
  color: var(--footer-sub);
  opacity: 0.6;
}

@media (max-width: 768px) {
  .inner { padding: 40px 20px 28px; flex-direction: column; gap: 32px; }
  .links { gap: 28px; }
  .bottom { padding: 14px 20px 24px; }
}
</style>
