<script setup lang="ts">
import SectionMarker from '~/components/ui/SectionMarker.vue'
import SkillTag from '~/components/ui/SkillTag.vue'
import type { SiteProfile, SkillGroup } from '~/types/content'

defineProps<{
  groups: SkillGroup[]
  profile: SiteProfile
}>()
</script>

<template>
  <section class="resume-skills" aria-labelledby="resume-skills-title" data-reveal>
    <SectionMarker class="resume-skills__marker" number="03" />
    <div class="resume-skills__intro">
      <h2 id="resume-skills-title">Profile / Skills</h2>
      <p class="resume-skills__tagline">A solid foundation for meaningful work.</p>
      <p>{{ profile.approach }}</p>
    </div>
    <div
      v-for="group in groups"
      :key="group.title"
      class="resume-skills__group"
    >
      <h3>{{ group.title }}</h3>
      <ul>
        <SkillTag v-for="item in group.items" :key="item" :label="item" />
      </ul>
    </div>
    <aside aria-hidden="true"><i /><p>Ideas into<br>interfaces</p></aside>
  </section>
</template>

<style scoped>
.resume-skills {
  border-bottom: 1px solid var(--rule);
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 3rem minmax(18rem, .85fr) repeat(2, minmax(19rem, 1fr)) 7rem;
  padding: 3rem var(--page-gutter);
}

.resume-skills h2 {
  font-family: var(--font-display);
  font-size: 1.7rem;
  letter-spacing: .04em;
  margin-bottom: .45rem;
  text-transform: uppercase;
}

.resume-skills__tagline {
  font-size: .56rem;
  letter-spacing: .28em;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
}

.resume-skills__intro > p:last-child {
  font-size: .91rem;
  line-height: 1.5;
  max-width: 43ch;
}

.resume-skills__group {
  border-left: 1px dashed var(--rule-strong);
  padding-left: 2.5rem;
  padding-top: 3.5rem;
}

.resume-skills__group h3 {
  font-family: var(--font-display);
  font-size: 1.4rem;
  letter-spacing: -.03em;
}

.resume-skills__group ul {
  display: flex;
  flex-wrap: wrap;
  gap: .7rem;
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
}

.resume-skills__group :deep(.skill-tag) { font-size: .75rem; padding: .65rem .85rem; }

.resume-skills aside {
  border-left: 1px solid var(--rule-strong);
  padding-left: 1.25rem;
}

.resume-skills aside i {
  background: var(--rule-strong);
  display: block;
  height: 1px;
  margin: .8rem 0 1.5rem;
  width: 100%;
}

.resume-skills aside p {
  font-size: .55rem;
  letter-spacing: .25em;
  line-height: 1.7;
  text-transform: uppercase;
}

@media (max-width: 72rem) {
  .resume-skills { grid-template-columns: 3rem repeat(2, 1fr); }
  .resume-skills__intro { grid-column: 2 / -1; }
  .resume-skills__group:first-of-type { grid-column: 2; }
  .resume-skills aside { display: none; }
}

@media (max-width: 42rem) {
  .resume-skills { gap: 2rem 1rem; grid-template-columns: 2.5rem 1fr; padding: 3rem 1.25rem; }
  .resume-skills__marker { grid-row: 1 / 4; }
  .resume-skills__intro,
  .resume-skills__group,
  .resume-skills__group:first-of-type { grid-column: 2; }
  .resume-skills__group { border-left: 0; padding: 0; }
}
</style>
