<script setup lang="ts">
import ArchAnimation from './ArchAnimation.vue'
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-inner">
      <!-- Visual LEFT -->
      <div class="hero-visual">
        <ArchAnimation />
      </div>

      <!-- Copy RIGHT -->
      <div class="hero-copy">
        <p class="overline">Médiation · visites accompagnées</p>
        <h1 class="headline">Une porte fermée peut,&nbsp;parfois, s'ouvrir à nouveau.</h1>
        <p class="body-text">
          Cette maison d'avant — ses odeurs, sa lumière, ses murs — est encore là derrière une
          porte. Nous créons le cadre de confiance et la médiation qui rendent ce retour possible.
        </p>
        <div class="hero-actions">
          <a href="#demande" class="btn-primary">Ouvrir cette porte →</a>
          <a href="#parcours" class="btn-ghost">Comment ça marche</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 0 32px;
}
.hero-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 88px 0 96px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 60px;
  align-items: center;
}
.hero-visual {
  position: relative;
  height: 480px;
}

.overline {
  font:
    500 12px/1 'Jost',
    sans-serif;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0;
}
.headline {
  margin: 22px 0 0;
  font:
    500 52px/1.08 'Cormorant Garamond',
    serif;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.body-text {
  margin: 24px 0 0;
  font:
    300 17px/1.65 'Jost',
    sans-serif;
  color: var(--text-secondary);
  max-width: 480px;
}
.hero-actions {
  display: flex;
  gap: 14px;
  margin-top: 36px;
}
.btn-primary {
  padding: 15px 28px;
  background: var(--accent);
  border: 1.5px solid var(--accent);
  color: #fff;
  font:
    500 15px/1 'Jost',
    sans-serif;
  border-radius: 3px;
  text-decoration: none;
  transition:
    background 0.6s ease,
    border-color 0.6s ease,
    color 0.6s ease;
}
.btn-primary:hover {
  background: transparent;
  border-color: var(--accent);
  color: var(--accent);
}
.btn-ghost {
  padding: 15px 28px;
  border: 1.5px solid var(--border);
  color: var(--text-secondary);
  font:
    500 15px/1 'Jost',
    sans-serif;
  border-radius: 3px;
  text-decoration: none;
  transition:
    border-color 0.2s,
    color 0.2s;
}
.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
