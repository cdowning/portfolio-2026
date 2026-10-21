<script setup lang="ts">
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import CTimeline from '~/components/ui/CTimeline/CTimeline.vue'
import type { ExperienceRole } from '~/types/content'

defineProps<{
  roles: ExperienceRole[]
}>()

const roleKey = (role: ExperienceRole) => `${role.company}-${role.title}`
const isCurrentRole = (role: ExperienceRole) => Boolean(role.current)
</script>

<template>
  <section id="experience" class="resume-experience" aria-labelledby="resume-experience-title" data-reveal>
    <CSectionMarker class="resume-experience-marker" number="04" />
    <header>
      <h2 id="resume-experience-title">Experience</h2>
      <p>Real work. Lasting impact.</p>
    </header>
    <CTimeline
      v-slot="{ item: role }"
      class="resume-experience-list"
      :items="roles"
      :item-key="roleKey"
      :is-current="isCurrentRole"
    >
      <div class="resume-experience-item">
        <time>{{ role.shortPeriod }}</time>
        <article :aria-label="`${role.company}, ${role.title}`">
          <div class="resume-experience-role">
            <div>
              <h3>{{ role.company }}</h3>
              <p>{{ role.title }}</p>
            </div>
            <time>{{ role.period }}</time>
          </div>
          <ul>
            <li v-for="bullet in role.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </article>
      </div>
    </CTimeline>
    <aside aria-hidden="true"><i /><p>Different<br>places<br>same<br>passion</p><span>Building for people always fits. — C</span></aside>
  </section>
</template>

<style scoped>
.resume-experience {
  border-bottom: 1px solid var(--rule);
  display: grid;
  gap: 1.5rem 2.5rem;
  grid-template-columns: 3rem 1fr 7rem;
  padding: 3rem var(--page-gutter) 2.5rem;
}

.resume-experience-marker { grid-row: 1 / 3; }

.resume-experience header { grid-column: 2; }

.resume-experience h2 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  letter-spacing: .12em;
  margin-bottom: .45rem;
  text-transform: uppercase;
}

.resume-experience header p {
  font-size: var(--text-xs);
  letter-spacing: .28em;
  text-transform: uppercase;
}

.resume-experience-list {
  --timeline-content-inset: 7rem;
  --timeline-axis-position: 5rem;
  --timeline-item-min-size: 10.5rem;
  --timeline-marker-block-offset: .7125rem;

  grid-column: 2;
}

.resume-experience-item {
  min-height: inherit;
  position: relative;
}

.resume-experience-item > time {
  font-size: var(--text-xs);
  left: -7rem;
  line-height: 1.6;
  position: absolute;
  text-transform: uppercase;
  top: 0;
  width: 4rem;
}

.resume-experience article {
  border-bottom: 1px dotted var(--rule-strong);
  padding: 0 0 1.35rem;
}

.resume-experience-role {
  align-items: start;
  display: flex;
  justify-content: space-between;
}

.resume-experience-role h3 {
  font-size: var(--text-md);
  margin: 0;
}

.resume-experience-role p {
  font-size: var(--text-sm);
  letter-spacing: .1em;
  margin-bottom: .7rem;
}

.resume-experience-role time {
  font-size: var(--text-xs);
  white-space: nowrap;
}

.resume-experience article ul {
  font-size: var(--text-xs);
  line-height: 1.45;
  padding-left: 1.25rem;
}

.resume-experience aside {
  border-left: 1px solid var(--rule-strong);
  grid-column: 3;
  grid-row: 1 / 3;
  padding-left: 1.3rem;
  position: relative;
}

.resume-experience aside i {
  background: var(--rule-strong);
  display: block;
  height: 1px;
  margin: .8rem 0 1.5rem;
  width: 100%;
}

.resume-experience aside p {
  font-size: var(--text-xs);
  letter-spacing: .25em;
  line-height: 1.65;
  text-transform: uppercase;
}

.resume-experience aside span {
  bottom: 9rem;
  font-family: var(--font-note);
  font-size: var(--text-md);
  line-height: 1;
  position: absolute;
  rotate: -8deg;
  width: 6rem;
}

@media (max-width: 64rem) {
  .resume-experience { grid-template-columns: 3rem minmax(0, 1fr); }
  .resume-experience aside { display: none; }
}

@media (max-width: 42rem) {
  .resume-experience { gap: 1.5rem 1rem; grid-template-columns: 2.5rem minmax(0, 1fr); padding: 3rem 1.25rem; }
  .resume-experience-list {
    --timeline-content-inset: 2.5rem;
    --timeline-axis-position: .5rem;
    --timeline-marker-block-offset: 3.2125rem;
  }
  .resume-experience-item { padding-top: 2.5rem; }
  .resume-experience-item > time { left: 0; top: 0; width: auto; }
  .resume-experience-role { flex-direction: column; gap: .35rem; }
  .resume-experience-role time { white-space: normal; }
}
</style>
