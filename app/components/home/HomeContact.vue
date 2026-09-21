<script setup lang="ts">
import type { SiteProfile } from '~/types/content'

defineProps<{
  profile: SiteProfile
}>()
</script>

<template>
  <footer id="contact" class="contact">
    <div class="contact__marker">06</div>
    <div class="contact__main">
      <h2>Let’s make something thoughtful.</h2>
      <p>I’m always open to meaningful conversations about interesting work.</p>
      <div class="contact__links">
        <a class="contact__primary" :href="`mailto:${profile.email}`">Say hello <span aria-hidden="true">→</span></a>
        <a
          v-for="link in profile.contacts.filter((item) => item.label === 'LinkedIn' || item.label === 'GitHub')"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
        >{{ link.label }}</a>
      </div>
    </div>
    <div class="contact__drawing" aria-hidden="true">
      <svg viewBox="0 0 360 160"><path d="M0 79C84 29 100 151 181 103S264 2 360 57" /></svg>
      <p>Good people build<br>great things.</p>
    </div>
    <div class="contact__brand">
      <strong>{{ profile.name }}</strong>
      <span>{{ profile.role }}</span>
      <p>Thoughtful code<br>for a brighter web.</p>
    </div>
    <div class="contact__fine-print">
      <span>© {{ new Date().getFullYear() }} Caitlin Hawley. All rights reserved.</span>
      <span>Built with care, coffee, and a more human web in mind.</span>
    </div>
  </footer>
</template>

<style scoped>
.contact {
  background: var(--gold);
  display: grid;
  gap: 2rem;
  grid-template-columns: 3rem minmax(30rem, 1.4fr) minmax(18rem, .7fr) minmax(13rem, .5fr);
  padding: 3.5rem var(--page-gutter) 1.5rem;
}

.contact__marker {
  border-right: 1px solid color-mix(in srgb, var(--ink) 50%, transparent);
  font-size: .7rem;
}

.contact__main h2 {
  color: var(--ink-strong);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 3.5vw, 4rem);
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .8rem;
}

.contact__main > p {
  font-size: 1.05rem;
}

.contact__links {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.contact__links a:not(.contact__primary) {
  font-size: .85rem;
  text-underline-offset: .35rem;
}

.contact__primary {
  align-items: center;
  background: var(--ink-strong);
  color: var(--paper);
  display: inline-flex;
  gap: 2rem;
  min-height: 3.5rem;
  padding: 0 1.4rem;
  text-decoration: none;
}

.contact__drawing {
  align-self: center;
  position: relative;
}

.contact__drawing svg {
  fill: none;
  stroke: var(--ink);
  stroke-dasharray: 7 7;
  stroke-width: 1.2;
}

.contact__drawing p {
  font-family: var(--font-note);
  font-size: 1.35rem;
  line-height: 1;
  position: absolute;
  right: 20%;
  rotate: -7deg;
  top: 41%;
}

.contact__brand {
  border-left: 1px solid color-mix(in srgb, var(--ink) 50%, transparent);
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
}

.contact__brand strong {
  font-family: var(--font-display);
  font-size: .95rem;
  letter-spacing: .27em;
  text-transform: uppercase;
}

.contact__brand span {
  font-size: .55rem;
  letter-spacing: .3em;
  margin-top: .35rem;
  text-transform: uppercase;
}

.contact__brand p {
  line-height: 1.55;
  margin-top: 2.25rem;
}

.contact__fine-print {
  border-top: 1px solid color-mix(in srgb, var(--ink) 25%, transparent);
  display: flex;
  font-size: .55rem;
  grid-column: 1 / -1;
  justify-content: space-between;
  margin-top: 1.25rem;
  padding-top: 1.2rem;
}

@media (max-width: 68rem) {
  .contact {
    grid-template-columns: 3rem 1fr 16rem;
  }

  .contact__drawing { display: none; }
}

@media (max-width: 44rem) {
  .contact {
    grid-template-columns: 2.5rem 1fr;
    padding: 3rem 1.25rem 1.5rem;
  }

  .contact__brand {
    border-left: 0;
    grid-column: 2;
    padding-left: 0;
  }

  .contact__fine-print {
    flex-direction: column;
    gap: .65rem;
  }
}
</style>
