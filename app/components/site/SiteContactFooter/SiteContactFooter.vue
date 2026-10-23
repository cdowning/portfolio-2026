<script setup lang="ts">
import { computed } from 'vue'

import CButton from '~/components/ui/CButton/CButton.vue'
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import type { SiteProfile } from '~/types/content'

const props = defineProps<{
  profile: SiteProfile
  sectionNumber: string
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
    <CSectionMarker class="contact-marker" :number="sectionNumber" />
    <div class="contact-main">
      <h2 class="contact-title">Let’s make something thoughtful.</h2>
      <p class="contact-intro">I’m always open to meaningful conversations about interesting work.</p>
      <div class="contact-action">
        <CButton class="contact-primary" :href="`mailto:${profile.email}`" tone="ink">Say hello</CButton>
        <svg class="contact-flight" viewBox="0 32.5 700 145" aria-hidden="true">
          <path
            class="contact-flight-path"
            d="M0 105C90 105 130 75 220 77C310 79 330 135 410 133C465 131 495 95 540 107C568 87 568 57 540 57C512 57 512 87 540 107C568 125 582 95 615 99"
          />
          <path class="contact-flight-tip" d="M603 99 615 99" />
          <image
            class="contact-airplane"
            href="/images/contact-paper-airplane.png"
            x="584"
            y="5"
            width="112"
            height="97"
            preserveAspectRatio="xMidYMid meet"
          />
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
  gap: 2rem .5rem;
  grid-template-columns: 1.5rem minmax(0, 1fr);
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
  aspect-ratio: 700 / 145;
  color: var(--on-footer);
  display: none;
  max-width: 42rem;
  overflow: visible;
  width: 100%;
}

.contact-flight-path {
  fill: none;
  stroke: currentcolor;
  stroke-dasharray: 8 9;
  stroke-linecap: round;
  stroke-width: 1.6;
  vector-effect: non-scaling-stroke;
}

.contact-flight-tip {
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-width: 1.6;
  vector-effect: non-scaling-stroke;
}

.contact-airplane {
  opacity: 1;
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

@media (min-width: 40rem) {
  .contact {
    column-gap: 2rem;
    grid-template-columns: 2.5rem minmax(0, 1fr);
  }
}

@media (min-width: 48rem) {
  .contact {
    grid-template-columns: 3rem minmax(0, 1fr);
    padding-block-start: 3.5rem;
    padding-inline: max(var(--page-gutter), calc((100vw - var(--content-max)) / 2 + var(--page-gutter)));
  }

  .contact-title {
    font-size: clamp(var(--text-4xl), 5.6vw, var(--text-7xl));
  }

  .contact-intro { font-size: var(--text-md); }

  .contact-action { margin-top: 2.75rem; }

  .contact-socials {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1.5rem 3rem;
    margin-top: 2rem;
  }

  .contact-brand {
    grid-column: 2;
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

@media (min-width: 64rem) {
  .contact-action {
    grid-template-columns: max-content minmax(38rem, 42rem);
  }

  .contact-flight {
    display: block;
    min-width: 38rem;
  }
}

@media (min-width: 96rem) {
  .contact {
    grid-template-columns: 3rem minmax(0, 1fr) minmax(15rem, 18rem);
  }

  .contact-brand {
    border-left: 1px solid color-mix(in srgb, var(--on-footer) 50%, transparent);
    grid-column: 3;
    margin-top: 0;
    padding-left: 2rem;
  }
}
</style>
