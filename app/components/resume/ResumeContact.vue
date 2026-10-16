<script setup lang="ts">
import CButton from '~/components/ui/CButton/CButton.vue'
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import type { SiteProfile } from '~/types/content'

defineProps<{
  profile: SiteProfile
}>()
</script>

<template>
  <footer id="contact" class="resume-contact" data-reveal>
    <CSectionMarker class="resume-contact-marker" number="07" />
    <div class="resume-contact-main">
      <h2>Let’s build something thoughtful.</h2>
      <p>I’m always open to meaningful conversations about interesting work.</p>
      <div class="resume-contact-links">
        <CButton class="resume-contact-primary" :href="`mailto:${profile.email}`" tone="ink">Get in touch</CButton>
        <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <a
          v-for="contact in profile.contacts.filter((item) => item.label === 'LinkedIn' || item.label === 'GitHub')"
          :key="contact.label"
          :href="contact.href"
          target="_blank"
          rel="noreferrer"
        >{{ contact.label }}</a>
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
  grid-template-columns: 3rem minmax(30rem, 1.35fr) minmax(17rem, .65fr) minmax(13rem, .5fr);
  margin-left: calc(50% - 50vw);
  padding: 3.5rem var(--page-gutter) 1.5rem;
  padding-inline: max(var(--page-gutter), calc((100vw - var(--content-max)) / 2 + var(--page-gutter)));
  width: 100vw;
}

.resume-contact-marker { --rule-strong: color-mix(in srgb, var(--on-footer) 50%, transparent); }

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
  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;
  margin-top: 2rem;
}

.resume-contact-links a:not(.resume-contact-primary) {
  font-size: var(--text-sm);
  min-width: 2.75rem;
  text-underline-offset: .35rem;
}

.resume-contact-drawing { align-self: center; position: relative; }
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
  border-left: 1px solid color-mix(in srgb, var(--on-footer) 50%, transparent);
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
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
  font-size: var(--text-xs);
  grid-column: 1 / -1;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1.1rem;
}

@media (max-width: 68rem) {
  .resume-contact { grid-template-columns: 3rem 1fr 16rem; }
  .resume-contact-drawing { display: none; }
}

@media (max-width: 44rem) {
  .resume-contact { grid-template-columns: 2.5rem 1fr; padding: 3rem 1.25rem 1.5rem; }
  .resume-contact-brand { border-left: 0; grid-column: 2; padding-left: 0; }
  .resume-contact-fine-print { flex-direction: column; gap: .65rem; }
}
</style>
