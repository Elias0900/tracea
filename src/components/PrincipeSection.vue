<template>
  <section id="principe" class="principe grain">
    <div class="glow" aria-hidden="true" />
    <div class="inner">
      <p class="overline" v-reveal><span class="overline-line" />Le principe</p>
      <h2 class="title" v-reveal="{ delay: 80 }">
        Une nostalgie longtemps restée sans réponse.
      </h2>
      <p class="body" v-reveal="{ delay: 180 }">
        On ne sonne pas chez un inconnu en espérant entrer dans son salon. Ce désir n'avait aucun
        cadre pour exister. Tracea en crée un&nbsp;: une médiation douce, un accord entre deux
        familles et un médiateur présent à chaque étape.
      </p>
      <blockquote class="quote" v-reveal="{ delay: 280 }">
        <span class="quote-mark" aria-hidden="true">“</span>
        Ce n'est pas seulement une maison. C'est une part de soi qu'on retrouve.
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.principe {
  position: relative;
  padding: 112px 32px;
  border-top: 1px solid var(--hairline);
  background: var(--section-bg);
  overflow: hidden;
}
.glow {
  position: absolute;
  top: -120px; left: 50%;
  width: 520px; height: 320px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, var(--glow), transparent 70%);
  pointer-events: none;
  z-index: 0;
}
.inner {
  position: relative;
  z-index: 2;
  max-width: 760px;
  margin: 0 auto;
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
.overline-line {
  width: 26px; height: 1px;
  background: var(--accent);
  opacity: 0.6;
}
.title {
  margin: 22px 0 0;
  font: 500 clamp(26px, 4vw, 40px)/1.16 'Spectral', serif;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.body {
  margin: 26px auto 0;
  max-width: 620px;
  font: 300 17.5px/1.72 'Work Sans', sans-serif;
  color: var(--text-secondary);
}
.quote {
  position: relative;
  margin: 52px auto 0;
  max-width: 580px;
  padding-top: 28px;
  font: italic 400 clamp(20px, 3vw, 27px)/1.5 'Spectral', serif;
  color: var(--quote-color);
}
.quote-mark {
  display: block;
  font: 400 64px/0.4 'Spectral', serif;
  color: var(--accent);
  opacity: 0.35;
  margin-bottom: 14px;
}
@media (max-width: 768px) {
  .principe { padding: 72px 20px; }
  .body { font-size: 15.5px; }
}
@media (max-width: 480px) {
  .principe { padding: 56px 16px; }
}
</style>
