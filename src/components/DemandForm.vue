<script setup lang="ts"></script>

<template>
  <section id="demande" class="demande">
    <div class="panel grain" v-reveal>
      <div class="panel-bg" aria-hidden="true">
        <span class="mesh mesh-a" />
        <span class="mesh mesh-b" />
      </div>
      <div class="inner">
        <p class="overline"><span class="overline-line" />Être recontacté</p>
        <h2 class="title">Laissez-nous vous accompagner dans votre projet.</h2>
        <p class="subtitle">Un premier échange rapide, gratuit et sans engagement.</p>
        <div class="cta-wrap">
          <RouterLink to="/entamer-les-demarches" class="nav-next">
            <span>Demander un devis</span>
            <span class="cta-arrow">→</span>
          </RouterLink>
          <RouterLink to="/contact" class="nav-ghost">Nous écrire</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demande {
  padding: 96px 32px;
  background: var(--bg);
}
.panel {
  position: relative;
  max-width: 840px;
  margin: 0 auto;
  border-radius: var(--radius-lg);
  border: 1px solid color-mix(in oklab, var(--accent) 26%, var(--border));
  background: var(--card-bg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}
.panel-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.mesh {
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
  animation: meshDrift 20s ease-in-out infinite;
}
.mesh-a {
  width: 380px; height: 380px;
  top: -140px; left: -60px;
  background: radial-gradient(circle, var(--mesh-1), transparent 68%);
}
.mesh-b {
  width: 340px; height: 340px;
  bottom: -160px; right: -40px;
  background: radial-gradient(circle, var(--mesh-2), transparent 66%);
  animation-delay: -8s;
}
.inner {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
  padding: 72px 40px;
  text-align: center;
}
.overline {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font: 500 11px/1 'Work Sans', sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0;
}
.overline-line { width: 26px; height: 1px; background: var(--accent); opacity: 0.6; }
.title {
  margin: 20px 0 0;
  font: 500 clamp(26px, 3.8vw, 38px)/1.18 'Spectral', serif;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.subtitle {
  margin: 16px 0 0;
  font: 300 16.5px/1.6 'Work Sans', sans-serif;
  color: var(--text-secondary);
}
.cta-wrap {
  margin-top: 40px;
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}
.nav-next {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 16px 36px;
  background: var(--accent-grad);
  color: #fff;
  border-radius: var(--radius-sm);
  font: 500 15px/1 'Work Sans', sans-serif;
  text-decoration: none;
  box-shadow: 0 12px 32px var(--accent-shadow);
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}
.nav-next:hover { transform: translateY(-2px); box-shadow: 0 18px 44px var(--accent-shadow); }
.nav-next:active { transform: translateY(0) scale(0.97); }
.cta-arrow { transition: transform 0.35s var(--ease-out); }
.nav-next:hover .cta-arrow { transform: translateX(4px); }
.nav-ghost {
  display: inline-flex;
  align-items: center;
  padding: 16px 26px;
  border: 1.5px solid var(--border);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  font: 500 15px/1 'Work Sans', sans-serif;
  text-decoration: none;
  background: color-mix(in oklab, var(--card-bg) 70%, transparent);
  transition: border-color 0.3s, color 0.3s, transform 0.3s var(--ease-out);
}
.nav-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
.nav-ghost:active { transform: translateY(0) scale(0.97); }

@media (max-width: 768px) {
  .demande { padding: 64px 16px; }
  .inner { padding: 52px 24px; }
  .cta-wrap { flex-direction: column; }
  .nav-next, .nav-ghost { justify-content: center; }
}
</style>
