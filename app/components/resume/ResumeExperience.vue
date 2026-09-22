<script setup lang="ts">
import SectionMarker from '~/components/ui/SectionMarker.vue'
import type { ExperienceRole } from '~/types/content'

defineProps<{
  roles: ExperienceRole[]
}>()
</script>

<template>
  <section id="experience" class="resume-experience" aria-labelledby="resume-experience-title" data-reveal>
    <SectionMarker class="resume-experience__marker" number="04" />
    <header>
      <h2 id="resume-experience-title">Experience</h2>
      <p>Real work. Lasting impact.</p>
    </header>
    <ol>
      <li v-for="role in roles" :key="`${role.company}-${role.title}`">
        <time>{{ role.shortPeriod }}</time>
        <article :aria-label="`${role.company}, ${role.title}`">
          <div class="resume-experience__role">
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
      </li>
    </ol>
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

.resume-experience__marker { grid-row: 1 / 3; }

.resume-experience header { grid-column: 2; }

.resume-experience h2 {
  font-family: var(--font-display);
  font-size: 1.7rem;
  letter-spacing: .12em;
  margin-bottom: .45rem;
  text-transform: uppercase;
}

.resume-experience header p {
  font-size: .56rem;
  letter-spacing: .28em;
  text-transform: uppercase;
}

.resume-experience > ol {
  grid-column: 2;
  list-style: none;
  margin: 0;
  padding: 0 0 0 7rem;
  position: relative;
}

.resume-experience > ol::before {
  background: var(--rule-strong);
  bottom: 0;
  content: '';
  left: 5rem;
  position: absolute;
  top: 0;
  width: 1px;
}

.resume-experience > ol > li {
  min-height: 10.5rem;
  position: relative;
}

.resume-experience > ol > li::before {
  background: var(--paper);
  border: 1px solid var(--ink);
  border-radius: 50%;
  content: '';
  height: .65rem;
  left: -2.35rem;
  position: absolute;
  top: .4rem;
  width: .65rem;
}

.resume-experience > ol > li > time {
  font-size: .73rem;
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

.resume-experience__role {
  align-items: start;
  display: flex;
  justify-content: space-between;
}

.resume-experience__role h3 {
  font-size: 1.1rem;
  margin: 0;
}

.resume-experience__role p {
  font-size: .8rem;
  letter-spacing: .1em;
  margin-bottom: .7rem;
}

.resume-experience__role time {
  font-size: .75rem;
  white-space: nowrap;
}

.resume-experience article ul {
  font-size: .75rem;
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
  font-size: .55rem;
  letter-spacing: .25em;
  line-height: 1.65;
  text-transform: uppercase;
}

.resume-experience aside span {
  bottom: 9rem;
  font-family: var(--font-note);
  font-size: 1.25rem;
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
  .resume-experience > ol { padding-left: 2.5rem; }
  .resume-experience > ol::before { left: .5rem; }
  .resume-experience > ol > li { padding-top: 2.5rem; }
  .resume-experience > ol > li > time { left: 0; top: 0; width: auto; }
  .resume-experience > ol > li::before { left: -2.3rem; top: 2.9rem; }
  .resume-experience__role { flex-direction: column; gap: .35rem; }
  .resume-experience__role time { white-space: normal; }
}
</style>
