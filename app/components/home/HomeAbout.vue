<script setup lang="ts">
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import type { SiteProfile } from '~/types/content'

defineProps<{
  profile: SiteProfile
}>()
</script>

<template>
  <section id="about" class="about" aria-labelledby="about-title" data-reveal>
    <CSectionMarker class="about-marker" number="03" />
    <div class="about-copy">
      <h2 id="about-title">About / How I work</h2>
      <p class="about-eyebrow">Thoughtful interfaces for real people.</p>
      <p>I’m a frontend developer who cares about the details — from the logic under the hood to the little moments people experience on screen.</p>
      <p>I build accessible, scalable interfaces with Vue and TypeScript, and I love turning complex problems into simple, elegant solutions.</p>
      <p>I’m especially drawn to work that combines design, technology, and human understanding to make the web a little more inclusive and a little more joyful.</p>
    </div>
    <figure class="about-photo">
      <span class="about-tape" aria-hidden="true" />
      <img src="/images/travel.jpg" alt="Sunlight spilling over clouds viewed from an airplane window">
      <figcaption class="about-note" aria-hidden="true">Better interfaces<br>for a kinder internet.</figcaption>
    </figure>
    <div class="about-method">
      <p class="about-method-note" aria-hidden="true">The same curiosity everywhere I go</p>
      <svg viewBox="0 0 500 130" aria-hidden="true">
        <path d="M0 48C58 118 95 14 157 63s92 38 143-4 80-53 198 10" />
      </svg>
      <div class="about-circles">
        <div><strong>Systems</strong><span>Solid foundations</span></div>
        <div><strong>Screens</strong><span>Meaningful experiences</span></div>
        <div><strong>People</strong><span>A more human web</span></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  border-bottom: 1px solid var(--rule);
  display: grid;
  gap: clamp(2rem, 4vw, 4rem);
  grid-template-columns: 3rem minmax(18rem, .9fr) minmax(20rem, .85fr) minmax(20rem, 1fr);
  padding: clamp(4rem, 6vw, 6.5rem) var(--page-gutter);
}

.about-copy h2 {
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: var(--text-section-title);
  letter-spacing: -.04em;
  line-height: 1.05;
  margin-bottom: .75rem;
}

.about-eyebrow {
  font-size: var(--text-xs);
  letter-spacing: .29em;
  margin-bottom: 3rem;
  text-transform: uppercase;
}

.about-copy > p:not(.about-eyebrow) {
  font-size: var(--text-base);
  line-height: 1.55;
  max-width: 43ch;
}

.about-photo {
  margin: 0;
  padding: 1rem;
  position: relative;
  rotate: -1.5deg;
}

.about-photo img {
  aspect-ratio: .82;
  border: .75rem solid var(--surface-raised);
  box-shadow: 0 1rem 2rem var(--shadow);
  height: 100%;
  object-fit: cover;
}

.about-tape {
  background: color-mix(in srgb, var(--support-highlight) 70%, var(--canvas));
  height: 2rem;
  left: 31%;
  opacity: .85;
  position: absolute;
  top: .25rem;
  width: 40%;
  z-index: 2;
}

.about-note {
  bottom: 10%;
  font-family: var(--font-note);
  font-size: var(--text-md);
  left: -5.5rem;
  line-height: 1;
  position: absolute;
  rotate: -6deg;
}

.about-method {
  align-self: center;
}

.about-method-note {
  font-size: var(--text-xs);
  letter-spacing: .25em;
  line-height: 1.7;
  margin-bottom: 1rem;
  max-width: 18ch;
  text-transform: uppercase;
}

.about-method svg {
  fill: none;
  margin-bottom: 1rem;
  overflow: visible;
  stroke: var(--text);
  stroke-dasharray: 7 7;
  stroke-width: 1;
}

.about-circles {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.about-circles div {
  text-align: center;
}

.about-circles strong {
  align-items: center;
  aspect-ratio: 1;
  border: 1px dashed var(--text);
  border-radius: 50%;
  display: flex;
  font-size: var(--text-xs);
  justify-content: center;
  letter-spacing: .12em;
  margin-bottom: .8rem;
  text-transform: uppercase;
}

.about-circles span {
  display: block;
  font-size: var(--text-xs);
  letter-spacing: .08em;
  line-height: 1.45;
}

@media (max-width: 72rem) {
  .about {
    grid-template-columns: 3rem 1fr 1fr;
  }

  .about-method {
    grid-column: 2 / -1;
  }
}

@media (max-width: 42rem) {
  .about {
    gap: 2rem 1rem;
    grid-template-columns: 2.5rem 1fr;
    padding: 3rem 1.25rem;
  }

  .about-photo,
  .about-method {
    grid-column: 2;
  }

  .about-note {
    display: none;
  }
}
</style>
