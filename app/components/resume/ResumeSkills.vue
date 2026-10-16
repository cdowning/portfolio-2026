<script setup lang="ts">
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import CTag from '~/components/ui/CTag/CTag.vue'
import type { SiteProfile, SkillGroup } from '~/types/content'

defineProps<{
  groups: SkillGroup[]
  profile: SiteProfile
}>()
</script>

<template>
  <section class="resume-skills" aria-labelledby="resume-skills-title" data-reveal>
    <CSectionMarker class="resume-skills-marker" number="03" />
    <div class="resume-skills-intro">
      <h2 id="resume-skills-title">Profile / Skills</h2>
      <p class="resume-skills-tagline">A solid foundation for meaningful work.</p>
      <p>{{ profile.approach }}</p>
    </div>
    <div
      v-for="group in groups"
      :key="group.title"
      class="resume-skills-group"
    >
      <h3>{{ group.title }}</h3>
      <ul>
        <CTag v-for="item in group.items" :key="item" :label="item" />
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
  font-size: var(--text-xl);
  letter-spacing: .04em;
  margin-bottom: .45rem;
  text-transform: uppercase;
}

.resume-skills-tagline {
  font-size: var(--text-xs);
  letter-spacing: .28em;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
}

.resume-skills-intro > p:last-child {
  font-size: var(--text-sm);
  line-height: 1.5;
  max-width: 43ch;
}

.resume-skills-group {
  border-left: 1px dashed var(--rule-strong);
  padding-left: 2.5rem;
  padding-top: 3.5rem;
}

.resume-skills-group h3 {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  letter-spacing: -.03em;
}

.resume-skills-group ul {
  --tag-font-size: var(--text-xs);
  --tag-padding: .65rem .85rem;

  display: flex;
  flex-wrap: wrap;
  gap: .7rem;
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
}

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
  font-size: var(--text-xs);
  letter-spacing: .25em;
  line-height: 1.7;
  text-transform: uppercase;
}

@media (max-width: 72rem) {
  .resume-skills { grid-template-columns: 3rem repeat(2, 1fr); }
  .resume-skills-intro { grid-column: 2 / -1; }
  .resume-skills-group:first-of-type { grid-column: 2; }
  .resume-skills aside { display: none; }
}

@media (max-width: 42rem) {
  .resume-skills { gap: 2rem 1rem; grid-template-columns: 2.5rem 1fr; padding: 3rem 1.25rem; }
  .resume-skills-marker { grid-row: 1 / 4; }
  .resume-skills-intro,
  .resume-skills-group,
  .resume-skills-group:first-of-type { grid-column: 2; }
  .resume-skills-group { border-left: 0; padding: 0; }
}
</style>
