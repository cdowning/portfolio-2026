<script setup lang="ts">
import SectionMarker from '~/components/ui/SectionMarker.vue'
import type { SiteProfile } from '~/types/content'

defineProps<{
  profile: SiteProfile
}>()
</script>

<template>
  <section id="about" class="about" aria-labelledby="about-title" data-reveal>
    <SectionMarker class="about__marker" number="03" />
    <div class="about__copy">
      <h2 id="about-title">About / How I work</h2>
      <p class="about__eyebrow">Thoughtful interfaces for real people.</p>
      <p>I’m a frontend developer who cares about the details — from the logic under the hood to the little moments people experience on screen.</p>
      <p>I build accessible, scalable interfaces with Vue and TypeScript, and I love turning complex problems into simple, elegant solutions.</p>
      <p>I’m especially drawn to work that combines design, technology, and human understanding to make the web a little more inclusive and a little more joyful.</p>
    </div>
    <figure class="about__photo">
      <span class="about__tape" aria-hidden="true" />
      <img src="/images/travel.jpg" alt="Sunlight spilling over clouds viewed from an airplane window">
      <figcaption class="about__note" aria-hidden="true">Better interfaces<br>for a kinder internet.</figcaption>
    </figure>
    <div class="about__method">
      <p class="about__method-note" aria-hidden="true">The same curiosity everywhere I go</p>
      <svg viewBox="0 0 500 130" aria-hidden="true">
        <path d="M0 48C58 118 95 14 157 63s92 38 143-4 80-53 198 10" />
      </svg>
      <div class="about__circles">
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

.about__copy h2 {
  color: var(--ink-strong);
  font-family: var(--font-display);
  font-size: clamp(2rem, 2.4vw, 2.8rem);
  letter-spacing: -.04em;
  line-height: 1.05;
  margin-bottom: .75rem;
}

.about__eyebrow {
  font-size: .57rem;
  letter-spacing: .29em;
  margin-bottom: 3rem;
  text-transform: uppercase;
}

.about__copy > p:not(.about__eyebrow) {
  font-size: .95rem;
  line-height: 1.55;
  max-width: 43ch;
}

.about__photo {
  margin: 0;
  padding: 1rem;
  position: relative;
  rotate: -1.5deg;
}

.about__photo img {
  aspect-ratio: .82;
  border: .75rem solid var(--paper);
  box-shadow: 0 1rem 2rem color-mix(in srgb, var(--ink) 14%, transparent);
  height: 100%;
  object-fit: cover;
}

.about__tape {
  background: color-mix(in srgb, var(--teal) 70%, var(--paper));
  height: 2rem;
  left: 31%;
  opacity: .85;
  position: absolute;
  top: .25rem;
  width: 40%;
  z-index: 2;
}

.about__note {
  bottom: 10%;
  font-family: var(--font-note);
  font-size: 1.25rem;
  left: -5.5rem;
  line-height: 1;
  position: absolute;
  rotate: -6deg;
}

.about__method {
  align-self: center;
}

.about__method-note {
  font-size: .58rem;
  letter-spacing: .25em;
  line-height: 1.7;
  margin-bottom: 1rem;
  max-width: 18ch;
  text-transform: uppercase;
}

.about__method svg {
  fill: none;
  margin-bottom: 1rem;
  overflow: visible;
  stroke: var(--ink);
  stroke-dasharray: 7 7;
  stroke-width: 1;
}

.about__circles {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.about__circles div {
  text-align: center;
}

.about__circles strong {
  align-items: center;
  aspect-ratio: 1;
  border: 1px dashed var(--ink);
  border-radius: 50%;
  display: flex;
  font-size: .65rem;
  justify-content: center;
  letter-spacing: .12em;
  margin-bottom: .8rem;
  text-transform: uppercase;
}

.about__circles span {
  display: block;
  font-size: .58rem;
  letter-spacing: .08em;
  line-height: 1.45;
}

@media (max-width: 72rem) {
  .about {
    grid-template-columns: 3rem 1fr 1fr;
  }

  .about__method {
    grid-column: 2 / -1;
  }
}

@media (max-width: 42rem) {
  .about {
    gap: 2rem 1rem;
    grid-template-columns: 2.5rem 1fr;
    padding: 3rem 1.25rem;
  }

  .about__photo,
  .about__method {
    grid-column: 2;
  }

  .about__note {
    display: none;
  }
}
</style>
