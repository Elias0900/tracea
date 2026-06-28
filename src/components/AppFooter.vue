<template>
  <footer class="footer">
    <div class="inner">

      <RouterLink to="/" class="brand">
        <svg width="14" height="40" viewBox="0 0 70 202" fill="none">
          <defs>
            <linearGradient id="gKeyFooter" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stop-color="oklch(0.72 0.08 86)" />
              <stop offset="100%" stop-color="oklch(0.50 0.08 70)" />
            </linearGradient>
          </defs>
          <ellipse cx="35" cy="52" rx="28" ry="34" stroke="url(#gKeyFooter)" stroke-width="3"   fill="none"/>
          <ellipse cx="35" cy="52" rx="16" ry="22" stroke="url(#gKeyFooter)" stroke-width="2"   fill="none"/>
          <path d="M 28 20 Q 31 12 35 11 Q 39 12 42 20" stroke="url(#gKeyFooter)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M 35 11 L 35 6"                       stroke="url(#gKeyFooter)" stroke-width="2"   fill="none" stroke-linecap="round"/>
          <path d="M 30 7 Q 35 2 40 7"                   stroke="url(#gKeyFooter)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <path d="M 8 52 C 1 44 3 30 13 27 C 18 25 22 29 18 34"    stroke="url(#gKeyFooter)" stroke-width="2"   fill="none" stroke-linecap="round"/>
          <path d="M 18 34 C 14 38 10 37 10 34"                      stroke="url(#gKeyFooter)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <path d="M 62 52 C 69 44 67 30 57 27 C 52 25 48 29 52 34" stroke="url(#gKeyFooter)" stroke-width="2"   fill="none" stroke-linecap="round"/>
          <path d="M 52 34 C 56 38 60 37 60 34"                      stroke="url(#gKeyFooter)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <path d="M 26 87 C 18 81 22 72 29 75 C 32 76 34 82 35 85 M 44 87 C 52 81 48 72 41 75 C 38 76 36 82 35 85 M 35 85 L 35 78 M 31 79 Q 35 73 39 79" stroke="url(#gKeyFooter)" stroke-width="1.9" fill="none" stroke-linecap="round"/>
          <rect x="31" y="88" width="8" height="72" rx="3" fill="url(#gKeyFooter)"/>
          <path d="M 35 199 C 16 184 14 163 24 158 C 29 154 35 159 35 166 C 35 159 41 154 46 158 C 56 163 54 184 35 199 Z" fill="url(#gKeyFooter)"/>
        </svg>
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
