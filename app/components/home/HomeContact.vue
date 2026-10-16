<script setup lang="ts">
import CButton from '~/components/ui/CButton/CButton.vue'
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import type { SiteProfile } from '~/types/content'

defineProps<{
  profile: SiteProfile
}>()
</script>

<template>
  <footer id="contact" class="contact" data-reveal>
    <CSectionMarker class="contact-marker" number="06" />
    <div class="contact-main">
      <h2>Let’s make something thoughtful.</h2>
      <p>I’m always open to meaningful conversations about interesting work.</p>
      <div class="contact-links">
        <CButton class="contact-primary" :href="`mailto:${profile.email}`" tone="ink">Say hello</CButton>
        <a
          v-for="link in profile.contacts.filter((item) => item.label === 'LinkedIn' || item.label === 'GitHub')"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
        >{{ link.label }}</a>
      </div>
    </div>
    <div class="contact-drawing" aria-hidden="true">
      <svg viewBox="0 0 360 160"><path d="M0 79C84 29 100 151 181 103S264 2 360 57" /></svg>
      <p>Good people build<br>great things.</p>
    </div>
    <div class="contact-brand">
      <strong>{{ profile.name }}</strong>
      <span>{{ profile.role }}</span>
      <p>Thoughtful code<br>for a brighter web.</p>
    </div>
    <div class="contact-fine-print">
      <span>© {{ new Date().getFullYear() }} Caitlin Hawley. All rights reserved.</span>
      <span>Built with care, coffee, and a more human web in mind.</span>
    </div>
  </footer>
</template>

<style scoped>
.contact {
  background: var(--footer);
  color: var(--on-footer);
  display: grid;
  gap: 2rem;
  grid-template-columns: 3rem minmax(30rem, 1.4fr) minmax(18rem, .7fr) minmax(13rem, .5fr);
  margin-left: calc(50% - 50vw);
  padding: 3.5rem var(--page-gutter) 1.5rem;
  padding-inline: max(var(--page-gutter), calc((100vw - var(--content-max)) / 2 + var(--page-gutter)));
  width: 100vw;
}

.contact-marker { --rule-strong: color-mix(in srgb, var(--on-footer) 50%, transparent); }

.contact-main h2 {
  color: var(--on-footer);
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 3.5vw, var(--text-6xl));
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .8rem;
}

.contact-main > p {
  font-size: var(--text-base);
}

.contact-links {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.contact-links a:not(.contact-primary) {
  font-size: var(--text-sm);
  min-width: 2.75rem;
  text-underline-offset: .35rem;
}

.contact-drawing {
  align-self: center;
  position: relative;
}

.contact-drawing svg {
  fill: none;
  stroke: var(--on-footer);
  stroke-dasharray: 7 7;
  stroke-width: 1.2;
}

.contact-drawing p {
  font-family: var(--font-note);
  font-size: var(--text-lg);
  line-height: 1;
  position: absolute;
  right: 20%;
  rotate: -7deg;
  top: 62%;
}

.contact-brand {
  border-left: 1px solid color-mix(in srgb, var(--on-footer) 50%, transparent);
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
}

.contact-brand strong {
  font-family: var(--font-display);
  font-size: var(--text-base);
  letter-spacing: .27em;
  text-transform: uppercase;
}

.contact-brand span {
  font-size: var(--text-xs);
  letter-spacing: .3em;
  margin-top: .35rem;
  text-transform: uppercase;
}

.contact-brand p {
  line-height: 1.55;
  margin-top: 2.25rem;
}

.contact-fine-print {
  border-top: 1px solid color-mix(in srgb, var(--on-footer) 25%, transparent);
  display: flex;
  font-size: var(--text-xs);
  grid-column: 1 / -1;
  justify-content: space-between;
  margin-top: 1.25rem;
  padding-top: 1.2rem;
}

@media (max-width: 68rem) {
  .contact {
    grid-template-columns: 3rem 1fr 16rem;
  }

  .contact-drawing { display: none; }
}

@media (max-width: 44rem) {
  .contact {
    grid-template-columns: 2.5rem 1fr;
    padding: 3rem 1.25rem 1.5rem;
  }

  .contact-brand {
    border-left: 0;
    grid-column: 2;
    padding-left: 0;
  }

  .contact-fine-print {
    flex-direction: column;
    gap: .65rem;
  }
}
</style>
