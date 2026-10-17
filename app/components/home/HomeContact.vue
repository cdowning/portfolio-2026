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
      <h2 class="contact-title">Let’s make something thoughtful.</h2>
      <p class="contact-intro">I’m always open to meaningful conversations about interesting work.</p>
      <div class="contact-action">
        <CButton class="contact-primary" :href="`mailto:${profile.email}`" tone="ink">Say hello</CButton>
        <svg class="contact-flight" viewBox="0 0 680 96" preserveAspectRatio="none" aria-hidden="true">
          <path class="contact-flight-path" d="M0 48C105 48 119 23 205 26C293 29 317 68 410 67C496 66 535 35 615 38" />
          <g class="contact-airplane" transform="translate(614 11)">
            <path d="m0 27 57-24-19 55-12-21L0 27Z" />
            <path d="M26 37 57 3 17 31" />
          </g>
        </svg>
      </div>
      <div class="contact-socials" aria-label="Social links">
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

.contact-main {
  grid-column: 2;
  min-width: 0;
}

.contact-title {
  color: var(--on-footer);
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 11vw, var(--text-5xl));
  letter-spacing: -.04em;
  line-height: .98;
  margin-bottom: 1.2rem;
  max-width: 20ch;
  text-wrap: balance;
}

.contact-intro {
  font-size: var(--text-base);
  max-width: 68ch;
}

.contact-action {
  align-items: center;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;
}

.contact-primary {
  justify-self: start;
  min-width: 13.75rem;
}

.contact-flight {
  color: var(--on-footer);
  display: none;
  height: 4.5rem;
  max-width: 42rem;
  overflow: visible;
  width: 100%;
}

.contact-flight-path {
  fill: none;
  stroke: currentcolor;
  stroke-dasharray: 7 7;
  stroke-width: 1.2;
  vector-effect: non-scaling-stroke;
}

.contact-airplane {
  fill: var(--footer);
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}

.contact-socials {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: .5rem;
  margin-top: 1.5rem;
}

.contact-social-link {
  align-items: center;
  color: inherit;
  display: inline-flex;
  font-size: var(--text-base);
  gap: .7rem;
  min-height: 2.75rem;
  text-decoration-thickness: 1px;
  text-underline-offset: .38rem;
}

.contact-social-icon {
  flex: 0 0 auto;
  height: 1.45rem;
  width: 1.45rem;
}

.contact-brand {
  display: flex;
  flex-direction: column;
  grid-column: 2;
  margin-top: 2rem;
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
  font-size: var(--text-md);
  line-height: 1.55;
  margin-top: 1.25rem;
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
    grid-template-columns: 3rem minmax(0, 1fr) 14rem;
    padding-block-start: 3.5rem;
    padding-inline: max(var(--page-gutter), calc((100vw - var(--content-max)) / 2 + var(--page-gutter)));
  }

  .contact-title {
    font-size: clamp(var(--text-4xl), 5.6vw, var(--text-7xl));
  }

  .contact-intro { font-size: var(--text-md); }

  .contact-action {
    grid-template-columns: max-content minmax(8rem, 42rem);
    margin-top: 2.75rem;
  }

  .contact-flight { display: block; }

  .contact-socials {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1.5rem 3rem;
    margin-top: 2rem;
  }

  .contact-brand {
    border-left: 1px solid color-mix(in srgb, var(--on-footer) 50%, transparent);
    grid-column: 3;
    margin-top: 0;
    padding-left: 2rem;
  }

  .contact-brand p {
    margin-top: 2.25rem;
  }

  .contact-fine-print {
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
  }
}

@media (min-width: 68.0625rem) {
  .contact {
    grid-template-columns: 3rem minmax(0, 1fr) minmax(15rem, 18rem);
  }
}
</style>
