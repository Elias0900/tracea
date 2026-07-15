<script setup lang="ts">
</script>

<template>
  <section id="demande" class="demande">
    <div class="inner">
      <div class="intro">
        <p class="overline">Être recontacté</p>
        <h2 class="title">Laissez-nous vous accompagner dans votre projet.</h2>
        <p class="subtitle">Un premier échange rapide, gratuit et sans engagement.</p>
      </div>

      <div class="cta-wrap">
        <RouterLink to="/entamer-les-demarches" class="nav-next">Demander un devis</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demande {
  padding: 96px 32px;
  background: var(--bg);
}
.inner {
  max-width: 560px;
  margin: 0 auto;
}
.intro {
  text-align: center;
}
.overline {
  font:
    500 11px/1 'Work Sans',
    sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0;
}
.title {
  margin: 20px 0 0;
  font:
    500 36px/1.18 'Spectral',
    serif;
  color: var(--text-primary);
}
.subtitle {
  margin: 14px 0 0;
  font:
    300 16px/1.6 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
}
.cta-wrap {
  margin-top: 42px;
  text-align: center;
}
.nav-next {
  display: inline-block;
  padding: 16px 40px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  font:
    500 15px/1 'Work Sans',
    sans-serif;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.nav-next:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .demande {
    padding: 64px 16px;
  }
  .title {
    font-size: 26px;
  }
}
</style>
