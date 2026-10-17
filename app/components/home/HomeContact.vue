<script setup lang="ts">
import { computed } from 'vue'

import CButton from '~/components/ui/CButton/CButton.vue'
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import type { SiteProfile } from '~/types/content'

const props = defineProps<{
  profile: SiteProfile
}>()

const socialIconNames = {
  CodePen: 'ph:codepen-logo',
  GitHub: 'ph:github-logo',
  LinkedIn: 'ph:linkedin-logo',
} as const

const socialContacts = computed(() => props.profile.contacts.flatMap((contact) => {
  const icon = socialIconNames[contact.label as keyof typeof socialIconNames]
  return icon ? [{ ...contact, icon }] : []
}))
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
          v-for="link in socialContacts"
          :key="link.label"
          class="contact-social-link"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
        >
          <Icon class="contact-social-icon" :name="link.icon" mode="svg" aria-hidden="true" />
          <span>{{ link.label }}</span>
        </a>
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
  grid-template-columns: 2.5rem minmax(0, 1fr);
  margin-left: calc(50% - 50vw);
  padding-block: 3rem max(1.5rem, env(safe-area-inset-bottom));
  padding-inline: max(1.25rem, env(safe-area-inset-left)) max(1.25rem, env(safe-area-inset-right));
  width: 100vw;
}

.contact-marker { --rule-strong: color-mix(in srgb, var(--on-footer) 50%, transparent); }

.contact-main { grid-column: 2; }

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
  display: grid;
  gap: .25rem 1rem;
  grid-template-columns: repeat(2, max-content);
  margin-top: 2rem;
}

.contact-primary { grid-column: 1 / -1; }

.contact-social-link {
  align-items: center;
  display: inline-flex;
  font-size: var(--text-sm);
  gap: .5rem;
  min-height: 2.75rem;
  min-width: 2.75rem;
  text-underline-offset: .35rem;
}

.contact-social-icon {
  flex: 0 0 auto;
  height: 1.125rem;
  width: 1.125rem;
}

.contact-drawing {
  align-self: center;
  display: none;
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
  font-size: var(--text-2xl);
  left: 28%;
  line-height: 1;
  position: absolute;
  rotate: -17deg;
  top: 0;
}

.contact-brand {
  display: flex;
  flex-direction: column;
  grid-column: 2;
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
  flex-direction: column;
  font-size: var(--text-xs);
  gap: .65rem;
  grid-column: 1 / -1;
  margin-top: 1.25rem;
  padding-top: 1.2rem;
}

@media (min-width: 44.0625rem) {
  .contact {
    grid-template-columns: 3rem 1fr 16rem;
    padding-block-start: 3.5rem;
    padding-inline: max(var(--page-gutter), calc((100vw - var(--content-max)) / 2 + var(--page-gutter)));
  }

  .contact-links {
    display: flex;
    flex-wrap: wrap;
    gap: .25rem 1.5rem;
  }

  .contact-primary { grid-column: auto; }

  .contact-brand {
    border-left: 1px solid color-mix(in srgb, var(--on-footer) 50%, transparent);
    grid-column: 3;
    padding-left: 2rem;
  }

  .contact-fine-print {
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
  }
}

@media (min-width: 68.0625rem) {
  .contact {
    grid-template-columns: 3rem minmax(30rem, 1.4fr) minmax(18rem, .7fr) minmax(13rem, .5fr);
  }

  .contact-drawing { display: block; grid-column: 3; }
  .contact-brand { grid-column: 4; }
}
</style>
