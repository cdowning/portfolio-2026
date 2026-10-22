<script setup lang="ts">
import CButton from '~/components/ui/CButton/CButton.vue'
import FabricSwatches from '~/components/ui/FabricSwatches/FabricSwatches.vue'
import CTag from '~/components/ui/CTag/CTag.vue'
import type { SiteProfile } from '~/types/content'

const swatchColors = ['var(--support-highlight)', 'var(--color-blush-30)', 'var(--action)', 'var(--rule)'] as const

defineProps<{
  capabilities: string[]
  profile: SiteProfile
}>()

const emit = defineEmits<{
  print: []
}>()
</script>

<template>
  <section class="resume-intro" aria-labelledby="resume-name" data-reveal="hero">
    <div class="resume-intro-identity">
      <div class="resume-kicker"><span>01</span><i />Code <b>×</b> Design <b>×</b> People</div>
      <h1 id="resume-name">Caitlin<br>Hawley</h1>
      <p class="resume-intro-role">{{ profile.role }}</p>
      <p class="resume-intro-summary">{{ profile.summary }}</p>
      <address class="resume-intro-contact">
        <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <span>{{ profile.location }}</span>
        <a :href="profile.website">caitlinhawley.com</a>
        <a
          v-for="contact in profile.contacts.filter((item) => item.label === 'LinkedIn' || item.label === 'GitHub')"
          :key="contact.label"
          :href="contact.href"
          target="_blank"
          rel="noreferrer"
        >{{ contact.label }}</a>
      </address>
      <div class="resume-intro-print">
        <CButton @click="emit('print')">Print résumé</CButton>
        <span>Cmd + P</span>
      </div>
      <p class="resume-intro-note" aria-hidden="true">Same ideas.<br>More possibilities.</p>
    </div>

    <div class="resume-intro-profile">
      <svg class="resume-intro-arc" viewBox="0 0 360 570" aria-hidden="true">
        <path d="M85 530C-3 342 26 125 249 20" />
        <path d="M84 183H17" />
        <path d="M250 20v42" />
      </svg>
      <div class="resume-intro-profile-copy">
        <h2>Professional profile</h2>
        <p>{{ profile.summary }}</p>
        <h3>Core capabilities</h3>
        <ul>
          <CTag
            v-for="(capability, index) in capabilities"
            :key="capability"
            class="profile-tag"
            :class="{ 'profile-tag-wide': index >= capabilities.length - 2 }"
            :label="capability"
          />
        </ul>
      </div>
      <aside class="resume-intro-swatches" aria-hidden="true">
        <p>Ideas<br>people<br>progress</p>
        <FabricSwatches :colors="swatchColors" />
        <span>Same<br>better<br>brighter<br>together</span>
      </aside>
      <p class="resume-intro-profile-note" aria-hidden="true">Thoughtful code for a brighter web. — C</p>
      <div class="resume-intro-ruler" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped>
.resume-intro {
  border-bottom: 1px solid var(--rule);
  display: grid;
  grid-template-columns: minmax(31rem, .86fr) minmax(39rem, 1.14fr);
  min-height: 54rem;
  overflow: hidden;
}

.resume-intro-identity {
  display: flex;
  flex-direction: column;
  padding: 4rem clamp(2rem, 4vw, 4.5rem) 3rem var(--page-gutter);
  position: relative;
}

.resume-kicker {
  align-items: center;
  display: flex;
  font-size: var(--text-xs);
  font-weight: 600;
  gap: 1rem;
  letter-spacing: .32em;
  margin-bottom: 2.25rem;
  text-transform: uppercase;
}

.resume-kicker i {
  background: var(--rule-strong);
  height: 1px;
  width: 2rem;
}

.resume-kicker b { font-weight: 400; }

.resume-intro h1 {
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: clamp(var(--text-7xl), 7.2vw, var(--text-9xl));
  letter-spacing: -.04em;
  line-height: .83;
  margin-bottom: 1.5rem;
}

.resume-intro-role {
  font-size: var(--text-base);
  letter-spacing: .35em;
  text-transform: uppercase;
}

.resume-intro-summary {
  font-size: var(--text-md);
  line-height: 1.45;
  margin: 1.4rem 0;
  max-width: 40ch;
}

.resume-intro-contact {
  display: grid;
  font-size: var(--text-xs);
  font-style: normal;
  gap: .8rem 1.25rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: auto;
}

.resume-intro-contact a {
  text-underline-offset: .25rem;
}

.resume-intro-print {
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.resume-intro-print > span { font-size: var(--text-xs); }

.resume-intro-note {
  bottom: 1.2rem;
  font-family: var(--font-note);
  font-size: var(--text-md);
  line-height: .95;
  position: absolute;
  right: 1rem;
  rotate: -9deg;
}

.resume-intro-profile {
  border-left: 1px solid var(--rule);
  padding: 7.5rem 9rem 4rem 8rem;
  position: relative;
}

.resume-intro-profile-copy {
  margin-inline: auto;
  max-width: 35rem;
  position: relative;
  z-index: 2;
}

.resume-intro-profile h2 {
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  letter-spacing: -.035em;
  margin-bottom: 1.1rem;
}

.resume-intro-profile-copy > p {
  font-size: var(--text-base);
  line-height: 1.48;
  max-width: 44ch;
}

.resume-intro-profile h3 {
  font-size: var(--text-xs);
  letter-spacing: .28em;
  margin: 3rem 0 .9rem;
  text-transform: uppercase;
}

.resume-intro-profile ul {
  --tag-background: color-mix(in srgb, var(--support-highlight) 28%, var(--canvas));
  --tag-min-height: 3rem;
  --tag-padding: .5rem;

  display: grid;
  gap: .65rem;
  grid-template-columns: repeat(6, 1fr);
  list-style: none;
  margin: 0;
  padding: 0;
}

.profile-tag {
  align-items: center;
  display: flex;
  grid-column: span 2;
  justify-content: center;
}

.profile-tag-wide { grid-column: span 3; }

.resume-intro-arc {
  fill: none;
  height: 75%;
  left: -3.5rem;
  position: absolute;
  stroke: var(--text);
  stroke-dasharray: 7 6;
  stroke-width: 1;
  top: 0;
  width: 17rem;
}

.resume-intro-swatches {
  --swatch-height: 3.25rem;

  border-left: 1px solid var(--rule-strong);
  display: grid;
  gap: .45rem;
  padding-left: 1.5rem;
  position: absolute;
  right: 1.5rem;
  top: 2.25rem;
  width: 6.4rem;
}

.resume-intro-swatches p,
.resume-intro-swatches span {
  font-size: var(--text-xs);
  letter-spacing: .28em;
  line-height: 1.75;
  text-transform: uppercase;
}

.resume-intro-profile-note {
  bottom: 4.5rem;
  font-family: var(--font-note);
  font-size: var(--text-md);
  line-height: 1;
  position: absolute;
  right: 1.25rem;
  rotate: -9deg;
  width: 6rem;
}

.resume-intro-ruler {
  background: repeating-linear-gradient(90deg, var(--text) 0 1px, transparent 1px 9px);
  bottom: 3.5rem;
  height: .8rem;
  left: 8rem;
  opacity: .35;
  position: absolute;
  right: 8rem;
}

@media (max-width: 72rem) {
  .resume-intro { grid-template-columns: 1fr; }
  .resume-intro-profile { border-left: 0; border-top: 1px solid var(--rule); min-height: 40rem; }
}

@media (max-width: 42rem) {
  .resume-intro-identity { padding: 3rem 1.25rem; }
  .resume-intro h1 { font-size: clamp(var(--text-6xl), 23vw, var(--text-8xl)); }
  .resume-intro-contact { grid-template-columns: 1fr; }
  .resume-intro-profile { padding: 4rem 1.25rem 7rem; }
  .resume-intro-profile ul { grid-template-columns: 1fr; }
  .profile-tag,
  .profile-tag-wide { grid-column: auto; }
  .resume-intro-arc { opacity: .25; }
  .resume-intro-swatches { display: none; }
  .resume-intro-profile-note { display: none; }
  .resume-intro-note,
  .resume-intro-print > span { display: none; }
  .resume-intro-ruler { left: 1.25rem; right: 1.25rem; }
}

@media (max-width: 40rem) {
  .resume-intro-summary { display: none; }
  .resume-intro-profile ul { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .resume-intro-profile .profile-tag:last-child { grid-column: 1 / -1; }
}
</style>
