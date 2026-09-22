<script setup lang="ts">
import ActionControl from '~/components/ui/ActionControl.vue'
import FabricSwatches from '~/components/ui/FabricSwatches.vue'
import SkillTag from '~/components/ui/SkillTag.vue'
import type { SiteProfile } from '~/types/content'

const swatchColors = ['var(--teal)', 'var(--blush-light)', 'var(--gold)', '#ded5cb'] as const

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
    <div class="resume-intro__identity">
      <div class="resume-kicker"><span>01</span><i />Code <b>×</b> Design <b>×</b> People</div>
      <h1 id="resume-name">Caitlin<br>Hawley</h1>
      <p class="resume-intro__role">{{ profile.role }}</p>
      <p class="resume-intro__summary">{{ profile.summary }}</p>
      <address class="resume-intro__contact">
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
      <div class="resume-intro__print">
        <ActionControl @click="emit('print')">Print résumé</ActionControl>
        <span>Cmd + P</span>
      </div>
      <p class="resume-intro__note" aria-hidden="true">Same ideas.<br>More possibilities.</p>
    </div>

    <div class="resume-intro__profile">
      <svg class="resume-intro__arc" viewBox="0 0 360 570" aria-hidden="true">
        <path d="M85 530C-3 342 26 125 249 20" />
        <path d="M84 183H17" />
        <path d="M250 20v42" />
      </svg>
      <div class="resume-intro__profile-copy">
        <h2>Professional profile</h2>
        <p>{{ profile.summary }}</p>
        <h3>Core capabilities</h3>
        <ul>
          <SkillTag v-for="capability in capabilities" :key="capability" :label="capability" />
        </ul>
      </div>
      <aside class="resume-intro__swatches" aria-hidden="true">
        <p>Ideas<br>people<br>progress</p>
        <FabricSwatches :colors="swatchColors" />
        <span>Same<br>better<br>brighter<br>together</span>
      </aside>
      <p class="resume-intro__profile-note" aria-hidden="true">Thoughtful code for a brighter web. — C</p>
      <div class="resume-intro__ruler" aria-hidden="true" />
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

.resume-intro__identity {
  display: flex;
  flex-direction: column;
  padding: 4rem clamp(2rem, 4vw, 4.5rem) 3rem var(--page-gutter);
  position: relative;
}

.resume-kicker {
  align-items: center;
  display: flex;
  font-size: .6rem;
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
  color: var(--ink-strong);
  font-family: var(--font-display);
  font-size: clamp(5rem, 7.2vw, 7.4rem);
  letter-spacing: -.04em;
  line-height: .83;
  margin-bottom: 1.5rem;
}

.resume-intro__role {
  font-size: 1.05rem;
  letter-spacing: .35em;
  text-transform: uppercase;
}

.resume-intro__summary {
  font-size: 1.12rem;
  line-height: 1.45;
  margin: 1.4rem 0;
  max-width: 40ch;
}

.resume-intro__contact {
  display: grid;
  font-size: .75rem;
  font-style: normal;
  gap: .8rem 1.25rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: auto;
}

.resume-intro__contact a {
  text-underline-offset: .25rem;
}

.resume-intro__print {
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.resume-intro__print > span { font-size: .75rem; }

.resume-intro__note {
  bottom: 1.2rem;
  font-family: var(--font-note);
  font-size: 1.25rem;
  line-height: .95;
  position: absolute;
  right: 1rem;
  rotate: -9deg;
}

.resume-intro__profile {
  border-left: 1px solid var(--rule);
  padding: 7.5rem 9rem 4rem 8rem;
  position: relative;
}

.resume-intro__profile-copy {
  margin-inline: auto;
  max-width: 35rem;
  position: relative;
  z-index: 2;
}

.resume-intro__profile h2 {
  color: var(--ink-strong);
  font-family: var(--font-display);
  font-size: 2rem;
  letter-spacing: -.035em;
  margin-bottom: 1.1rem;
}

.resume-intro__profile-copy > p {
  font-size: 1.04rem;
  line-height: 1.48;
  max-width: 44ch;
}

.resume-intro__profile h3 {
  font-size: .63rem;
  letter-spacing: .28em;
  margin: 3rem 0 .9rem;
  text-transform: uppercase;
}

.resume-intro__profile ul {
  display: grid;
  gap: .65rem;
  grid-template-columns: repeat(6, 1fr);
  list-style: none;
  margin: 0;
  padding: 0;
}

.resume-intro__profile :deep(.skill-tag) {
  align-items: center;
  background: color-mix(in srgb, var(--teal) 28%, var(--paper));
  display: flex;
  grid-column: span 2;
  justify-content: center;
  min-height: 3rem;
  padding: .5rem;
  text-align: center;
}

.resume-intro__profile :deep(.skill-tag:nth-last-child(-n + 2)) { grid-column: span 3; }

.resume-intro__arc {
  fill: none;
  height: 75%;
  left: -3.5rem;
  position: absolute;
  stroke: var(--ink);
  stroke-dasharray: 7 6;
  stroke-width: 1;
  top: 0;
  width: 17rem;
}

.resume-intro__swatches {
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

.resume-intro__swatches p,
.resume-intro__swatches span {
  font-size: .55rem;
  letter-spacing: .28em;
  line-height: 1.75;
  text-transform: uppercase;
}

.resume-intro__profile-note {
  bottom: 4.5rem;
  font-family: var(--font-note);
  font-size: 1.25rem;
  line-height: 1;
  position: absolute;
  right: 1.25rem;
  rotate: -9deg;
  width: 6rem;
}

.resume-intro__ruler {
  background: repeating-linear-gradient(90deg, var(--ink) 0 1px, transparent 1px 9px);
  bottom: 3.5rem;
  height: .8rem;
  left: 8rem;
  opacity: .35;
  position: absolute;
  right: 8rem;
}

@media (max-width: 72rem) {
  .resume-intro { grid-template-columns: 1fr; }
  .resume-intro__profile { border-left: 0; border-top: 1px solid var(--rule); min-height: 40rem; }
}

@media (max-width: 42rem) {
  .resume-intro__identity { padding: 3rem 1.25rem; }
  .resume-intro h1 { font-size: clamp(4.5rem, 23vw, 6rem); }
  .resume-intro__contact { grid-template-columns: 1fr; }
  .resume-intro__profile { padding: 4rem 1.25rem 7rem; }
  .resume-intro__profile ul { grid-template-columns: 1fr; }
  .resume-intro__profile :deep(.skill-tag),
  .resume-intro__profile :deep(.skill-tag:nth-last-child(-n + 2)) { grid-column: auto; }
  .resume-intro__arc { opacity: .25; }
  .resume-intro__swatches { display: none; }
  .resume-intro__profile-note { display: none; }
  .resume-intro__note,
  .resume-intro__print > span { display: none; }
  .resume-intro__ruler { left: 1.25rem; right: 1.25rem; }
}
</style>
