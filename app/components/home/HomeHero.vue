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

    <div class="hero__portrait">
      <svg class="hero__arc" viewBox="0 0 620 720" aria-hidden="true">
        <path d="M57 650C-8 414 34 150 300 20" />
        <path d="M77 650C14 421 62 176 312 46" />
        <path d="M58 386C-30 386 -35 386 -88 386" />
      </svg>
      <div class="portrait-placeholder" role="img" aria-label="Portrait placeholder awaiting Caitlin's original photograph">
        <div class="portrait-placeholder__halo" />
        <div class="portrait-placeholder__label">
          <span>Portrait study</span>
          <strong>Original source pending</strong>
        </div>
      </div>
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
  min-height: calc(100svh - var(--header-height));
  overflow: hidden;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(4rem, 7vw, 7rem) clamp(2rem, 5vw, 5.5rem) 3.5rem var(--page-gutter);
  position: relative;
  z-index: 2;
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
}

.portrait-placeholder {
  background:
    linear-gradient(135deg, transparent 0 42%, color-mix(in srgb, var(--teal) 22%, transparent) 42% 43%, transparent 43%),
    repeating-linear-gradient(105deg, transparent 0 1.5rem, color-mix(in srgb, var(--ink) 4%, transparent) 1.5rem 1.6rem),
    linear-gradient(145deg, var(--paper-deep), #e6ded4);
  bottom: 0;
  clip-path: polygon(21% 11%, 78% 4%, 94% 29%, 91% 100%, 4% 100%, 8% 33%);
  left: 8%;
  min-height: 76%;
  overflow: hidden;
  position: absolute;
  right: 13%;
}

.portrait-placeholder::before,
.portrait-placeholder::after {
  border: 1px solid color-mix(in srgb, var(--ink) 18%, transparent);
  border-radius: 50%;
  content: '';
  position: absolute;
}

.portrait-placeholder::before {
  aspect-ratio: 1;
  background: color-mix(in srgb, var(--blush) 50%, var(--paper));
  left: 27%;
  top: 16%;
  width: 48%;
}

.portrait-placeholder::after {
  background: color-mix(in srgb, var(--ink) 88%, var(--teal-deep));
  border-radius: 48% 48% 0 0;
  bottom: -9%;
  height: 60%;
  left: 15%;
  width: 72%;
}

.portrait-placeholder__halo {
  border: 1px dashed var(--ink);
  border-radius: 50%;
  height: 56%;
  left: 18%;
  opacity: .4;
  position: absolute;
  top: 7%;
  width: 64%;
}

.portrait-placeholder__label {
  background: var(--paper);
  border: 1px solid var(--rule-strong);
  bottom: 7%;
  left: 8%;
  padding: .8rem 1rem;
  position: absolute;
  z-index: 2;
}

.portrait-placeholder__label span,
.portrait-placeholder__label strong {
  display: block;
  font-size: .58rem;
  letter-spacing: .22em;
  line-height: 1.55;
  text-transform: uppercase;
}

.portrait-placeholder__label strong {
  font-size: .68rem;
}

.hero__arc {
  fill: none;
  height: 88%;
  left: -9%;
  position: absolute;
  stroke: var(--ink);
  stroke-dasharray: 9 8;
  stroke-width: 1;
  top: 4%;
  width: 65%;
  z-index: 2;
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
    top: 4rem;
    width: 2.7rem;
  }

  .swatch {
    height: 2.5rem;
  }
}
</style>
