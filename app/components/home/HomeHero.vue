<script setup lang="ts">
import ActionControl from '~/components/ui/ActionControl.vue'
import FabricSwatches from '~/components/ui/FabricSwatches.vue'
import type { SiteProfile } from '~/types/content'

const swatchColors = ['var(--teal)', 'var(--blush-light)', 'var(--gold)', '#ded5cb'] as const

defineProps<{
  profile: SiteProfile
}>()
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title" data-reveal="hero">
    <div class="hero__copy">
      <div class="kicker"><span>01</span><i />Code <b>×</b> Design <b>×</b> People</div>
      <h1 id="hero-title" class="hero__title">I build thoughtful<br>interfaces,<br>from system to screen.</h1>
      <p class="hero__lede">{{ profile.shortSummary }}</p>
      <ActionControl class="hero__cta" href="#work" size="large">View my work</ActionControl>

      <div class="hero__facts">
        <div>
          <strong>{{ profile.experienceLabel }}</strong>
          <span>Building for a brighter,<br> more human web.</span>
        </div>
        <div>
          <strong>Vue · TypeScript · Design systems</strong>
          <span>Interfaces that carry ideas further.</span>
        </div>
      </div>
    </div>

    <div class="hero__construction" aria-hidden="true">
      <svg class="hero__construction-drawing" viewBox="0 0 1600 840" preserveAspectRatio="none">
        <path
          class="hero__construction-path hero__construction-path--solid"
          d="M914 770C842 504 874 206 1121 54"
        />
        <path
          class="hero__construction-path hero__construction-path--dashed"
          d="M934 770C866 515 902 229 1139 79"
        />
        <path
          class="hero__construction-path hero__construction-path--dashed hero__construction-path--flow"
          d="M263 535C363 535 390 477 456 493C526 511 542 564 618 554C720 541 747 468 895 468"
        />
        <path
          class="hero__construction-path hero__construction-path--dashed hero__construction-path--lower"
          d="M786 735C828 678 873 665 927 677C971 687 1000 712 1028 741"
        />

        <g class="hero__crosshair" transform="translate(895 468)">
          <circle r="7" />
          <path d="M-14 0H14M0-14V14" />
        </g>
        <g class="hero__crosshair" transform="translate(786 735)">
          <circle r="8" />
          <path d="M-15 0H15M0-15V15" />
        </g>
        <g class="hero__crosshair" transform="translate(934 770)">
          <path d="M-10-10L10 10M10-10L-10 10" />
        </g>

        <g class="hero__measurements">
          <path d="M1121 54H1170M1121 43V66M1170 43V66" />
          <path d="M1400 74V309M1388 74H1412M1388 191H1412M1388 309H1412" />
          <path d="M1006 788H1427M1006 778V800M1427 778V800" />
        </g>
      </svg>

      <p class="hero__callout hero__callout--02">
        <span class="hero__callout-index">02</span>
        <span>A more<br>human web</span>
      </p>
      <p class="hero__callout hero__callout--03">
        <span class="hero__callout-index">03</span>
        <span>Good things<br>take shape</span>
      </p>
      <p class="hero__callout hero__callout--04">
        <span class="hero__callout-index">04</span>
        <span>Scale ideas<br>not ego</span>
      </p>
    </div>

    <div class="hero__portrait">
      <img
        class="hero__image"
        src="/images/hero-portrait-caitlin.png"
        alt="Caitlin Hawley smiling"
        width="1098"
        height="1433"
        fetchpriority="high"
      >
      <div class="hero__swatches" aria-hidden="true">
        <FabricSwatches :colors="swatchColors" />
      </div>
      <p class="hero__margin-note" aria-hidden="true">Good ideas fit here.</p>
      <p class="hero__side-note" aria-hidden="true">Patterns<br>ideas<br>people<br>progress</p>
      <div class="hero__ruler" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  border-bottom: 1px solid var(--rule);
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(32rem, .88fr);
  isolation: isolate;
  min-height: calc(100svh - var(--header-height));
  overflow: hidden;
  position: relative;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(4rem, 7vw, 7rem) clamp(2rem, 5vw, 5.5rem) 3.5rem var(--page-gutter);
  position: relative;
  z-index: 4;
}

.kicker {
  align-items: center;
  display: flex;
  font-size: .64rem;
  font-weight: 600;
  gap: 1.1rem;
  letter-spacing: .34em;
  margin-bottom: 3.5rem;
  text-transform: uppercase;
}

.kicker i {
  background: var(--rule-strong);
  height: 1px;
  width: 2.25rem;
}

.kicker b {
  font-weight: 400;
}

.hero__title {
  color: var(--ink-strong);
  font-family: var(--font-display);
  font-size: clamp(3.3rem, 5.25vw, 6rem);
  letter-spacing: -.045em;
  line-height: .91;
  margin-bottom: 2.2rem;
  max-width: 18ch;
}

.hero__lede {
  font-size: clamp(1.25rem, 1.8vw, 1.75rem);
  line-height: 1.35;
  margin-bottom: 2.5rem;
}

.hero__cta { align-self: flex-start; }

.hero__facts {
  border-top: 1px solid var(--rule-strong);
  display: grid;
  gap: 2rem;
  grid-template-columns: .75fr 1.25fr;
  margin-top: auto;
  padding-top: 1.75rem;
}

.hero__facts > div + div {
  border-left: 1px solid var(--rule-strong);
  padding-left: 2.5rem;
}

.hero__facts strong,
.hero__facts span {
  display: block;
}

.hero__facts strong {
  font-size: 1.15rem;
  margin-bottom: .8rem;
}

.hero__facts > div:first-child strong {
  font-size: 1.75rem;
}

.hero__facts span {
  font-size: .62rem;
  letter-spacing: .27em;
  line-height: 1.75;
  text-transform: uppercase;
}

.hero__portrait {
  border-left: 1px solid var(--rule);
  min-height: 52rem;
  position: relative;
  z-index: 2;
}

.hero__image {
  bottom: 0;
  display: block;
  height: auto;
  left: 50%;
  max-width: 1098px;
  position: absolute;
  transform: translateX(-50%);
  width: 100%;
  z-index: 1;
}

.hero__construction {
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 3;
}

.hero__construction-drawing {
  height: 100%;
  inset: 0;
  overflow: visible;
  position: absolute;
  width: 100%;
}

.hero__construction-path,
.hero__crosshair,
.hero__measurements {
  fill: none;
  stroke: var(--ink);
  stroke-linecap: round;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.hero__construction-path--solid {
  stroke-dasharray: none;
}

.hero__construction-path--dashed {
  stroke-dasharray: 8 8;
}

.hero__construction-path--flow,
.hero__construction-path--lower {
  opacity: .88;
}

.hero__crosshair circle {
  fill: var(--paper);
}

.hero__measurements {
  opacity: .68;
}

.hero__callout {
  align-items: flex-start;
  border-left: 1px solid var(--ink);
  display: flex;
  font-size: .58rem;
  gap: .7rem;
  letter-spacing: .3em;
  line-height: 1.9;
  margin: 0;
  padding: .1rem 0 .85rem .75rem;
  position: absolute;
  text-transform: uppercase;
}

.hero__callout::after {
  background: var(--ink);
  bottom: 0;
  content: '';
  height: 1px;
  left: .75rem;
  position: absolute;
  width: .9rem;
}

.hero__callout-index {
  font-size: .7rem;
  letter-spacing: 0;
}

.hero__callout--02 {
  left: 54.2%;
  top: 7.5%;
}

.hero__callout--03 {
  left: 48.4%;
  top: 61%;
}

.hero__callout--04 {
  bottom: 1.6rem;
  right: 3.5%;
}

.hero__swatches {
  display: grid;
  gap: .45rem;
  position: absolute;
  right: 2rem;
  top: 8rem;
  width: 3.8rem;
  z-index: 3;
}

.hero__margin-note {
  bottom: 9rem;
  font-family: var(--font-note);
  font-size: 1.5rem;
  left: -3.5rem;
  line-height: .95;
  position: absolute;
  rotate: -10deg;
  z-index: 3;
}

.hero__side-note {
  font-size: .6rem;
  letter-spacing: .35em;
  line-height: 1.9;
  position: absolute;
  right: 2.2rem;
  text-transform: uppercase;
  top: 2rem;
  z-index: 3;
}

.hero__ruler {
  background: repeating-linear-gradient(90deg, var(--ink) 0 1px, transparent 1px 9px);
  bottom: 1rem;
  height: .75rem;
  left: 5%;
  opacity: .35;
  position: absolute;
  right: 4%;
}

@media (max-width: 70rem) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero__portrait {
    border-left: 0;
    border-top: 1px solid var(--rule);
    min-height: 44rem;
  }

  .hero__construction {
    display: none;
  }
}

@media (max-width: 40rem) {
  .hero__copy {
    padding: 3rem 1.25rem;
  }

  .kicker {
    gap: .65rem;
    letter-spacing: .2em;
    margin-bottom: 2rem;
  }

  .hero__title {
    font-size: clamp(3rem, 14vw, 4.35rem);
  }

  .hero__facts {
    grid-template-columns: 1fr;
    margin-top: 4rem;
  }

  .hero__facts > div + div {
    border-left: 0;
    padding-left: 0;
  }

  .hero__portrait {
    min-height: 34rem;
  }

  .hero__swatches {
    right: 1rem;
    top: 8rem;
    width: 2.7rem;
  }

  .hero__margin-note {
    left: .8rem;
  }

  .swatch {
    height: 2.5rem;
  }
}
</style>
