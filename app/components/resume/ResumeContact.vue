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
  <footer id="contact" class="resume-contact" data-reveal>
    <CSectionMarker class="resume-contact-marker" number="07" />
    <div class="resume-contact-main">
      <h2>Let’s build something thoughtful.</h2>
      <p>I’m always open to meaningful conversations about interesting work.</p>
      <div class="resume-contact-links">
        <CButton class="resume-contact-primary" :href="`mailto:${profile.email}`" tone="ink">Get in touch</CButton>
        <a class="resume-contact-email" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <a
          v-for="contact in socialContacts"
          :key="contact.label"
          class="resume-contact-social-link"
          :href="contact.href"
          target="_blank"
          rel="noreferrer"
        >
          <Icon class="resume-contact-social-icon" :name="contact.icon" mode="svg" aria-hidden="true" />
          <span>{{ contact.label }}</span>
        </a>
      </div>
    </div>
    <div class="resume-contact-drawing" aria-hidden="true">
      <svg viewBox="0 0 340 170"><path d="M0 93C67 36 106 155 180 102S257 5 340 51" /></svg>
      <p>Good people build<br>great things. — C</p>
    </div>
    <div class="resume-contact-brand">
      <strong>{{ profile.name }}</strong>
      <span>{{ profile.role }}</span>
      <p>Thoughtful code<br>for a brighter web.</p>
    </div>
    <div class="resume-contact-fine-print">
      <span>© {{ new Date().getFullYear() }} Caitlin Hawley. All rights reserved.</span>
      <span>Built with care, coffee, and a more human web in mind.</span>
    </div>
  </footer>
</template>

<style scoped>
.resume-contact {
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

.resume-contact-marker { --rule-strong: color-mix(in srgb, var(--on-footer) 50%, transparent); }

.resume-contact-main { grid-column: 2; }

.resume-contact-main h2 {
  color: var(--on-footer);
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 3.5vw, var(--text-6xl));
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .8rem;
}

.resume-contact-main > p { font-size: var(--text-base); }

.resume-contact-links {
  align-items: center;
  display: grid;
  gap: .25rem 1rem;
  grid-template-columns: repeat(2, max-content);
  margin-top: 2rem;
}

.resume-contact-primary { grid-column: 1 / -1; }
.resume-contact-email { grid-column: 1 / -1; }

.resume-contact-links > a:not(.resume-contact-primary) {
  font-size: var(--text-sm);
  min-height: 2.75rem;
  min-width: 2.75rem;
  text-underline-offset: .35rem;
}

.resume-contact-social-link {
  align-items: center;
  display: inline-flex;
  gap: .5rem;
}

.resume-contact-social-icon {
  flex: 0 0 auto;
  height: 1.125rem;
  width: 1.125rem;
}

.resume-contact-drawing { align-self: center; display: none; position: relative; }
.resume-contact-drawing svg { fill: none; stroke: var(--on-footer); stroke-dasharray: 7 7; stroke-width: 1.2; }
.resume-contact-drawing p {
  font-family: var(--font-note);
  font-size: var(--text-md);
  line-height: 1;
  position: absolute;
  right: 10%;
  rotate: -8deg;
  top: 62%;
}

.resume-contact-brand {
  display: flex;
  flex-direction: column;
  grid-column: 2;
}

.resume-contact-brand strong {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  letter-spacing: .27em;
  text-transform: uppercase;
}

.resume-contact-brand span {
  font-size: var(--text-xs);
  letter-spacing: .3em;
  margin-top: .35rem;
  text-transform: uppercase;
}

.resume-contact-brand p { line-height: 1.5; margin-top: 2rem; }

.resume-contact-fine-print {
  border-top: 1px solid color-mix(in srgb, var(--on-footer) 25%, transparent);
  display: flex;
  flex-direction: column;
  font-size: var(--text-xs);
  gap: .65rem;
  grid-column: 1 / -1;
  margin-top: 1rem;
  padding-top: 1.1rem;
}

@media (min-width: 44.0625rem) {
  .resume-contact {
    grid-template-columns: 3rem 1fr 16rem;
    padding-block-start: 3.5rem;
    padding-inline: max(var(--page-gutter), calc((100vw - var(--content-max)) / 2 + var(--page-gutter)));
  }

  .resume-contact-links {
    display: flex;
    flex-wrap: wrap;
    gap: .25rem 1.5rem;
  }

  .resume-contact-primary { grid-column: auto; }

  .resume-contact-brand {
    border-left: 1px solid color-mix(in srgb, var(--on-footer) 50%, transparent);
    grid-column: 3;
    padding-left: 2rem;
  }

  .resume-contact-fine-print {
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
  }
}

@media (min-width: 68.0625rem) {
  .resume-contact {
    grid-template-columns: 3rem minmax(30rem, 1.35fr) minmax(17rem, .65fr) minmax(13rem, .5fr);
  }

  .resume-contact-drawing { display: block; grid-column: 3; }
  .resume-contact-brand { grid-column: 4; }
}
</style>
