<script setup lang="ts">
import { useTemplateRef } from 'vue'

import CButton from '~/components/ui/CButton/CButton.vue'
import FabricSwatches from '~/components/ui/FabricSwatches/FabricSwatches.vue'
import { useHeroScrollMotion } from '~/composables/useHeroScrollMotion'
import type { SiteProfile } from '~/types/content'

const swatchColors = ['var(--support-highlight)', 'var(--palette-blush-light)', 'var(--action)', 'var(--rule)'] as const

defineProps<{
  profile: SiteProfile
}>()

const hero = useTemplateRef<HTMLElement>('hero')

useHeroScrollMotion(hero)
</script>

<template>
  <section id="top" ref="hero" class="hero" aria-labelledby="hero-title" data-reveal="hero">
    <div class="hero__stage">
      <div class="hero__copy">
        <div class="kicker"><span>01</span><i />Code <b>×</b> Design <b>×</b> People</div>
        <h1 id="hero-title" class="hero__title">I build thoughtful<br>interfaces,<br>from system to screen.</h1>
        <p class="hero__lede">{{ profile.shortSummary }}</p>
        <div class="hero__cta-flow">
          <CButton class="hero__cta" href="#work" size="large">View my work</CButton>
          <svg
            class="hero__cta-connector"
            viewBox="0 0 600 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              class="hero__cta-connector-path"
              d="M0 60C118 60 142 18 246 34C358 51 378 100 474 84C523 76 554 60 600 60"
            />
            <g class="hero__crosshair hero__crosshair--connect" transform="translate(600 60)">
              <circle r="8" />
              <path d="M-15 0H15M0-15V15" />
            </g>
          </svg>
        </div>

        <div class="hero__lower">
          <p class="hero__margin-note" aria-hidden="true">Good ideas fit here.</p>
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
      </div>

      <div class="hero__construction" aria-hidden="true">
        <svg class="hero__construction-drawing" viewBox="0 0 1600 840" preserveAspectRatio="none">
        <path
          class="hero__construction-path hero__construction-path--solid"
          d="M1121 54C874 206 842 504 914 770"
        />
        <path
          class="hero__construction-path hero__construction-path--dashed"
          d="M1139 79C902 229 866 515 934 770"
        />
        <path
          class="hero__construction-path hero__construction-path--dashed hero__construction-path--lower"
          d="M786 735C828 678 873 665 927 677C971 687 1000 712 1028 741"
        />

        <g class="hero__crosshair hero__crosshair--assemble" transform="translate(786 735)">
          <circle r="8" />
          <path d="M-15 0H15M0-15V15" />
        </g>
        <g class="hero__crosshair hero__crosshair--release" transform="translate(934 770)">
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
        <div class="hero__portrait-grid" aria-hidden="true" />
        <img
          class="hero__image"
          src="/images/hero-portrait-caitlin.png"
          alt="Caitlin Hawley smiling"
          width="1098"
          height="1433"
          fetchpriority="high"
        >
        <div class="hero__portrait-paper" aria-hidden="true" />
        <div class="hero__portrait-cover" aria-hidden="true" />
        <div class="hero__swatches" aria-hidden="true">
          <FabricSwatches :colors="swatchColors" />
        </div>
        <p class="hero__side-note" aria-hidden="true">Patterns<br>ideas<br>people<br>progress</p>
        <div class="hero__ruler" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@property --hero-progress {
  syntax: '<number>';
  inherits: true;
  initial-value: 1;
}

.hero {
  border-bottom: 1px solid var(--rule);
  min-height: calc(100svh - var(--header-height));
  position: relative;
  --hero-progress: 1;
}

.hero__stage {
  --hero-register: clamp(0, calc(var(--hero-progress) * 5.5556), 1);
  --hero-cut: clamp(0, calc((var(--hero-progress) - .08) * 3.8462), 1);
  --hero-seam: clamp(0, calc((var(--hero-progress) - .18) * 3.5714), 1);
  --hero-connect: clamp(0, calc((var(--hero-progress) - .3) * 3.125), 1);
  --hero-assemble: clamp(0, calc((var(--hero-progress) - .52) * 3.3333), 1);
  --hero-release: clamp(0, calc((var(--hero-progress) - .76) * 4.1667), 1);
  --hero-register-shift: calc((1 - var(--hero-register)) * 14px);
  --hero-cut-clip: calc((1 - var(--hero-cut)) * 100%);
  --hero-seam-clip: calc((1 - var(--hero-seam)) * 100%);
  --hero-paper-clip: calc(var(--hero-cut) * 100%);
  --hero-connect-clip: calc((1 - var(--hero-connect)) * 100%);
  --hero-assemble-clip: calc((1 - var(--hero-assemble)) * 100%);
  --hero-release-clip: calc((1 - var(--hero-release)) * 100%);
  --hero-portrait-shift: calc((1 - var(--hero-assemble)) * 20px);
  --hero-swatch-1: clamp(0, calc((var(--hero-progress) - .54) * 7.1429), 1);
  --hero-swatch-2: clamp(0, calc((var(--hero-progress) - .6) * 7.1429), 1);
  --hero-swatch-3: clamp(0, calc((var(--hero-progress) - .66) * 7.1429), 1);
  --hero-swatch-4: clamp(0, calc((var(--hero-progress) - .72) * 7.1429), 1);
  --hero-swatch-1-shift: calc((1 - var(--hero-swatch-1)) * -18px);
  --hero-swatch-2-shift: calc((1 - var(--hero-swatch-2)) * -18px);
  --hero-swatch-3-shift: calc((1 - var(--hero-swatch-3)) * -18px);
  --hero-swatch-4-shift: calc((1 - var(--hero-swatch-4)) * -18px);
  background: var(--canvas);
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(32rem, .88fr);
  isolation: isolate;
  min-height: calc(100svh - var(--header-height));
  overflow: hidden;
  position: relative;
}

.hero[data-hero-motion='scroll'] {
  min-height: calc(175svh - var(--header-height));
  view-timeline-axis: block;
  view-timeline-name: --hero-drafting;
}

.hero[data-hero-motion='scroll'] .hero__stage {
  height: calc(100svh - var(--header-height));
  position: sticky;
  top: var(--header-height);
}

.hero[data-hero-driver='native'] .hero__stage {
  animation: hero-native-progress 1ms linear both;
  animation-range: contain 0% contain 100%;
  animation-timeline: --hero-drafting;
}

.hero__copy {
  --hero-copy-inline-end: clamp(2rem, 5vw, 5.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(4rem, 7vw, 7rem) var(--hero-copy-inline-end) 3.5rem var(--page-gutter);
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
  color: var(--text-strong);
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

.hero__cta-flow {
  align-items: center;
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  margin-right: calc(-1 * var(--hero-copy-inline-end));
}

.hero__cta { align-self: center; }

.hero__cta-connector {
  display: block;
  height: clamp(4.2rem, 6vw, 5.5rem);
  overflow: visible;
  width: 100%;
}

.hero__cta-connector-path {
  clip-path: inset(0 var(--hero-connect-clip) 0 0);
  fill: none;
  stroke: var(--text);
  stroke-dasharray: 8 8;
  stroke-linecap: round;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.hero__lower { margin-top: auto; }

.hero__facts {
  border-top: 1px solid var(--rule-strong);
  display: grid;
  gap: 2rem;
  grid-template-columns: .75fr 1.25fr;
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
  isolation: isolate;
  min-height: 52rem;
  position: relative;
  z-index: 2;
}

.hero__portrait-grid {
  background-image:
    linear-gradient(var(--rule) 1px, transparent 1px),
    linear-gradient(90deg, var(--rule) 1px, transparent 1px);
  background-size: 1.65rem 1.65rem;
  inset: 2rem 3.5rem 5rem 2.5rem;
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
  mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
  opacity: .2;
  position: absolute;
}

.hero__image {
  bottom: 0;
  display: block;
  height: auto;
  left: 50%;
  max-width: 61rem;
  position: absolute;
  transform: translateX(-50%) translateY(var(--hero-portrait-shift));
  width: 86%;
  z-index: 1;
}

.hero__portrait-cover {
  background: var(--canvas);
  bottom: 0;
  clip-path: inset(var(--hero-release-clip) 0 0);
  height: 20%;
  inset-inline: 0;
  max-height: 130px;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.hero__portrait-paper {
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--canvas) 32%, transparent), color-mix(in srgb, var(--canvas) 12%, transparent));
  clip-path: inset(0 0 0 var(--hero-paper-clip));
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
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
  stroke: var(--text);
  stroke-linecap: round;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.hero__construction-path--solid {
  clip-path: inset(0 0 var(--hero-cut-clip) 0);
  stroke-dasharray: none;
}

.hero__construction-path--dashed {
  clip-path: inset(0 0 var(--hero-seam-clip) 0);
  stroke-dasharray: 8 8;
}

.hero__construction-path--flow {
  clip-path: inset(0 var(--hero-connect-clip) 0 0);
}

.hero__construction-path--lower {
  clip-path: inset(0 var(--hero-release-clip) 0 0);
}

.hero__construction-path--flow,
.hero__construction-path--lower {
  opacity: .88;
}

.hero__crosshair circle {
  fill: var(--canvas);
}

.hero__crosshair {
  opacity: var(--hero-connect);
  scale: calc(.55 + var(--hero-connect) * .45);
  transform-box: fill-box;
  transform-origin: center;
}

.hero__crosshair--assemble { opacity: var(--hero-assemble); scale: calc(.55 + var(--hero-assemble) * .45); }
.hero__crosshair--release { opacity: var(--hero-release); scale: calc(.55 + var(--hero-release) * .45); }

.hero__measurements {
  opacity: calc(var(--hero-register) * .68);
}

.hero__callout {
  align-items: flex-start;
  border-left: 1px solid var(--text);
  display: flex;
  font-size: .58rem;
  gap: .7rem;
  letter-spacing: .3em;
  line-height: 1.9;
  margin: 0;
  padding: .1rem 0 .85rem .75rem;
  position: absolute;
  text-transform: uppercase;
  transform: translateY(var(--hero-register-shift));
}

.hero__callout::after {
  background: var(--text);
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
  opacity: var(--hero-register);
  top: 7.5%;
}

.hero__callout--03 {
  left: 48.4%;
  opacity: var(--hero-assemble);
  top: 46%;
}

.hero__callout--04 {
  bottom: 1.6rem;
  opacity: var(--hero-release);
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

.hero__swatches :deep(.fabric-swatch:nth-child(1)) { opacity: var(--hero-swatch-1); transform: translateY(var(--hero-swatch-1-shift)); }
.hero__swatches :deep(.fabric-swatch:nth-child(2)) { opacity: var(--hero-swatch-2); transform: translateY(var(--hero-swatch-2-shift)); }
.hero__swatches :deep(.fabric-swatch:nth-child(3)) { opacity: var(--hero-swatch-3); transform: translateY(var(--hero-swatch-3-shift)); }
.hero__swatches :deep(.fabric-swatch:nth-child(4)) { opacity: var(--hero-swatch-4); transform: translateY(var(--hero-swatch-4-shift)); }

.hero__margin-note {
  font-family: var(--font-note);
  font-size: 2.25rem;
  line-height: 1.4;
  margin: 0 clamp(1rem, 5vw, 4.5rem) 3.5rem auto;
  rotate: -6deg;
  clip-path: inset(0 var(--hero-assemble-clip) 0 0);
  text-align: right;
  white-space: nowrap;
  width: max-content;
}

.hero__side-note {
  font-size: .6rem;
  letter-spacing: .35em;
  line-height: 1.9;
  position: absolute;
  opacity: var(--hero-assemble);
  right: 2.2rem;
  text-transform: uppercase;
  top: 2rem;
  transform: translateY(var(--hero-register-shift));
  z-index: 3;
}

.hero__ruler {
  background: repeating-linear-gradient(90deg, var(--text) 0 1px, transparent 1px 9px);
  bottom: 1rem;
  height: .75rem;
  left: 5%;
  opacity: .35;
  position: absolute;
  right: 4%;
  scale: var(--hero-release) 1;
  transform-origin: left;
}

.hero[data-hero-motion='scroll'] :is(
  .hero__image,
  .hero__portrait-paper,
  .hero__portrait-cover,
  .hero__construction-path,
  .hero__cta-connector-path,
  .hero__crosshair,
  .hero__measurements,
  .hero__callout,
  .hero__side-note,
  .hero__ruler,
  .hero__swatches :deep(.fabric-swatch)
) {
  will-change: clip-path, opacity, transform;
}

@media (min-width: 64.001rem) and (max-height: 58rem) {
  .hero__copy {
    padding-block: 1.5rem 1.25rem;
  }

  .kicker {
    margin-bottom: 1.35rem;
  }

  .hero__title {
    font-size: clamp(3.3rem, 5vw, 4.5rem);
    margin-bottom: 1.25rem;
  }

  .hero__lede {
    font-size: clamp(1.05rem, 1.55vw, 1.4rem);
    margin-bottom: 1.35rem;
  }

  .hero__facts {
    gap: 1.25rem;
    padding-top: 1rem;
  }

  .hero__facts > div + div {
    padding-left: 1.5rem;
  }

  .hero__facts strong {
    margin-bottom: .45rem;
  }

  .hero__portrait {
    min-height: 0;
  }

  .hero__margin-note { margin-bottom: 3.5rem; }
}

@media (max-width: 64rem) {
  .hero__stage {
    grid-template-columns: 1fr;
  }

  .hero__portrait {
    border-left: 0;
    border-top: 1px solid var(--rule);
    min-height: 44rem;
  }

  .hero__portrait-grid {
    inset: 2rem 2rem 4rem;
  }

  .hero__image {
    width: min(92%, 50rem);
  }

  .hero__cta-flow {
    display: block;
    margin-right: 0;
  }

  .hero__cta-connector { display: none; }

  .hero__lower { margin-top: 2.5rem; }

  .hero__margin-note { margin: 0 1rem 2rem auto; }

  .hero__construction {
    bottom: 0;
    height: 44rem;
    inset-inline: 0;
    top: auto;
  }

  .hero__construction-path--flow,
  .hero__construction-path--lower,
  .hero__measurements,
  .hero__callout--03,
  .hero__callout--04 {
    display: none;
  }

  .hero__callout--02 {
    left: 55%;
    top: 5%;
  }

  .hero[data-hero-motion='compact'][data-revealed='true'] .hero__construction-path--solid,
  .hero[data-hero-motion='compact'][data-revealed='true'] .hero__construction-path--dashed {
    animation: hero-compact-cut 720ms var(--ease-out) both;
  }

  .hero[data-hero-motion='compact'][data-revealed='true'] .hero__crosshair {
    animation: hero-compact-register 420ms var(--ease-out) 440ms both;
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
  }

  .hero__lower { margin-top: 4rem; }

  .hero__facts > div + div {
    border-left: 0;
    padding-left: 0;
  }

  .hero__portrait {
    min-height: 34rem;
  }

  .hero__portrait-grid {
    background-size: 1.35rem 1.35rem;
    inset: 1.5rem 1rem 3rem;
    opacity: .16;
  }

  .hero__image {
    width: 100%;
  }

  .hero__portrait-cover {
    height: 18%;
  }

  .hero__construction {
    height: 34rem;
  }

  .hero__construction-drawing {
    transform: translateX(18%);
  }

  .hero__callout--02,
  .hero__side-note {
    display: none;
  }

  .hero__swatches {
    right: 1rem;
    top: 8rem;
    width: 2.7rem;
  }

  .swatch {
    height: 2.5rem;
  }
}

@keyframes hero-compact-cut {
  from { clip-path: inset(0 0 100% 0); }
  to { clip-path: inset(0); }
}

@keyframes hero-native-progress {
  from { --hero-progress: 0; }
  to { --hero-progress: 1; }
}

@keyframes hero-compact-register {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .hero__stage { position: relative; top: auto; }
  .hero__image { transform: translateX(-50%); }
  .hero__portrait-paper { display: none; }
  .hero__construction-path { clip-path: inset(0); }
  .hero__margin-note { clip-path: inset(0); }
  .hero__ruler { scale: 1; }
}
</style>
