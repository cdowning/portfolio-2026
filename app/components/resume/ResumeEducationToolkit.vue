<script setup lang="ts">
import type { EducationEntry } from '~/types/content'

defineProps<{
  education: EducationEntry
  toolkit: string[]
}>()
</script>

<template>
  <section class="resume-foundation" aria-label="Education and toolkit">
    <div class="resume-foundation__education">
      <div class="resume-foundation__marker">05</div>
      <div>
        <h2>Education</h2>
        <p class="tagline">Early foundations. Lasting curiosity.</p>
        <div class="education-entry">
          <div><strong>{{ education.school }}</strong><span>{{ education.degree }}</span></div>
          <time>{{ education.period }}</time>
        </div>
      </div>
    </div>
    <div class="resume-foundation__toolkit">
      <div class="resume-foundation__marker">06</div>
      <div>
        <h2>Toolkit</h2>
        <p class="tagline">The tools that help ideas take shape.</p>
        <ul>
          <li v-for="item in toolkit" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
    <aside aria-hidden="true"><i /><p>Tools<br>people<br>possibilities</p></aside>
  </section>
</template>

<style scoped>
.resume-foundation {
  border-bottom: 1px solid var(--rule);
  display: grid;
  grid-template-columns: 1fr 1fr 7rem;
  padding: 2.5rem var(--page-gutter);
}

.resume-foundation__education,
.resume-foundation__toolkit {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 3rem 1fr;
}

.resume-foundation__toolkit {
  border-left: 1px dashed var(--rule-strong);
  padding-left: 2rem;
}

.resume-foundation__marker {
  border-right: 1px solid var(--rule-strong);
  font-size: .7rem;
}

.resume-foundation h2 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: .11em;
  margin-bottom: .45rem;
  text-transform: uppercase;
}

.tagline,
.resume-foundation aside p {
  font-size: .54rem;
  letter-spacing: .25em;
  line-height: 1.65;
  text-transform: uppercase;
}

.education-entry {
  align-items: end;
  display: flex;
  justify-content: space-between;
  margin-top: 2.8rem;
}

.education-entry strong,
.education-entry span { display: block; }
.education-entry strong { font-size: .9rem; }
.education-entry span,
.education-entry time { font-size: .72rem; }

.resume-foundation ul {
  display: flex;
  flex-wrap: wrap;
  gap: .65rem;
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
}

.resume-foundation li {
  background: color-mix(in srgb, var(--teal) 10%, var(--paper));
  font-size: .72rem;
  min-width: 5rem;
  padding: .55rem .75rem;
  text-align: center;
}

.resume-foundation aside {
  border-left: 1px solid var(--rule-strong);
  padding-left: 1.25rem;
}

.resume-foundation aside i {
  background: var(--rule-strong);
  display: block;
  height: 1px;
  margin: .8rem 0 1.5rem;
}

@media (max-width: 62rem) {
  .resume-foundation { grid-template-columns: 1fr; gap: 3rem; }
  .resume-foundation__toolkit { border-left: 0; padding-left: 0; }
  .resume-foundation aside { display: none; }
}

@media (max-width: 42rem) {
  .resume-foundation { padding: 3rem 1.25rem; }
  .resume-foundation__education,
  .resume-foundation__toolkit { gap: 1rem; grid-template-columns: 2.5rem 1fr; }
  .education-entry { align-items: start; flex-direction: column; gap: .75rem; }
}
</style>
