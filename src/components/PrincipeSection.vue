<template>
  <section id="principe" class="principe">
    <div class="inner">
      <p class="overline">Le principe</p>
      <h2 class="title">Une nostalgie longtemps restée sans réponse.</h2>
      <p class="body">
        On ne sonne pas chez un inconnu en espérant entrer dans son salon. Ce désir n'avait aucun
        cadre pour exister. Tracea en créer un&nbsp;: une médiation douce, un accord entre deux
        familles et un médiateur présent à chaque étape.
      </p>
      <blockquote class="quote">
        « Ce n'est pas seulement une maison. C'est une part de soi qu'on retrouve. »
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.principe {
  padding: 96px 32px;
  border-top: 1px solid var(--border);
  background: var(--section-bg);
}
.inner {
  max-width: 760px;
  margin: 0 auto;
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
    500 38px/1.18 'Spectral',
    serif;
  color: var(--text-primary);
}
.body {
  margin: 26px 0 0;
  font:
    300 17.5px/1.7 'Work Sans',
    sans-serif;
  color: var(--text-secondary);
}
.quote {
  margin: 48px auto 0;
  max-width: 560px;
  font:
    italic 400 26px/1.55 'Spectral',
    serif;
  color: var(--quote-color);
}
@media (max-width: 768px) {
  .principe { padding: 64px 20px; }
  .title { font-size: 28px; }
  .body { font-size: 15.5px; }
  .quote { font-size: 21px; margin-top: 32px; }
}

@media (max-width: 480px) {
  .principe { padding: 48px 16px; }
  .title { font-size: 24px; }
  .quote { font-size: 18px; }
}
</style>
