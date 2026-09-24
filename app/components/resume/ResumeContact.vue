<script setup lang="ts">
import ActionControl from '~/components/ui/ActionControl.vue'
import SectionMarker from '~/components/ui/SectionMarker.vue'
import type { SiteProfile } from '~/types/content'

defineProps<{
  profile: SiteProfile
}>()
</script>

<template>
  <footer id="contact" class="resume-contact" data-reveal>
    <SectionMarker class="resume-contact__marker" number="07" />
    <div class="resume-contact__main">
      <h2>Let’s build something thoughtful.</h2>
      <p>I’m always open to meaningful conversations about interesting work.</p>
      <div class="resume-contact__links">
        <ActionControl class="resume-contact__primary" :href="`mailto:${profile.email}`" tone="ink">Get in touch</ActionControl>
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
    <div class="resume-contact__drawing" aria-hidden="true">
      <svg viewBox="0 0 340 170"><path d="M0 93C67 36 106 155 180 102S257 5 340 51" /></svg>
      <p>Good people build<br>great things. — C</p>
    </div>
    <div class="resume-contact__brand">
      <strong>{{ profile.name }}</strong>
      <span>{{ profile.role }}</span>
      <p>Thoughtful code<br>for a brighter web.</p>
    </div>
    <div class="resume-contact__fine-print">
      <span>© {{ new Date().getFullYear() }} Caitlin Hawley. All rights reserved.</span>
      <span>Built with care, coffee, and a more human web in mind.</span>
    </div>
  </footer>
</template>

<style scoped>
.resume-contact {
  background: var(--gold);
  display: grid;
  gap: 2rem;
  grid-template-columns: 3rem minmax(30rem, 1.35fr) minmax(17rem, .65fr) minmax(13rem, .5fr);
  margin-left: calc(50% - 50vw);
  padding: 3.5rem var(--page-gutter) 1.5rem;
  padding-inline: max(var(--page-gutter), calc((100vw - var(--content-max)) / 2 + var(--page-gutter)));
  width: 100vw;
}

.resume-contact__marker { --rule-strong: color-mix(in srgb, var(--ink) 50%, transparent); }

.resume-contact__main h2 {
  color: var(--ink-strong);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 3.5vw, 4rem);
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .8rem;
}

.resume-contact__main > p { font-size: 1.05rem; }

.resume-contact__links {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;
  margin-top: 2rem;
}

.resume-contact__links a:not(.resume-contact__primary) {
  font-size: .8rem;
  min-width: 2.75rem;
  text-underline-offset: .35rem;
}

.resume-contact__drawing { align-self: center; position: relative; }
.resume-contact__drawing svg { fill: none; stroke: var(--ink); stroke-dasharray: 7 7; stroke-width: 1.2; }
.resume-contact__drawing p {
  font-family: var(--font-note);
  font-size: 1.25rem;
  line-height: 1;
  position: absolute;
  right: 10%;
  rotate: -8deg;
  top: 42%;
}

.resume-contact__brand {
  border-left: 1px solid color-mix(in srgb, var(--ink) 50%, transparent);
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
}

.resume-contact__brand strong {
  font-family: var(--font-display);
  font-size: .9rem;
  letter-spacing: .27em;
  text-transform: uppercase;
}

.resume-contact__brand span {
  font-size: .54rem;
  letter-spacing: .3em;
  margin-top: .35rem;
  text-transform: uppercase;
}

.resume-contact__brand p { line-height: 1.5; margin-top: 2rem; }

.resume-contact__fine-print {
  border-top: 1px solid color-mix(in srgb, var(--ink) 25%, transparent);
  display: flex;
  font-size: .55rem;
  grid-column: 1 / -1;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1.1rem;
}

@media (max-width: 68rem) {
  .resume-contact { grid-template-columns: 3rem 1fr 16rem; }
  .resume-contact__drawing { display: none; }
}

@media (max-width: 44rem) {
  .resume-contact { grid-template-columns: 2.5rem 1fr; padding: 3rem 1.25rem 1.5rem; }
  .resume-contact__brand { border-left: 0; grid-column: 2; padding-left: 0; }
  .resume-contact__fine-print { flex-direction: column; gap: .65rem; }
}
</style>
