<script setup lang="ts">
import CButton from '~/components/ui/CButton/CButton.vue'
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import type { ExperienceRole } from '~/types/content'

defineProps<{
  experienceLabel: string
  roles: ExperienceRole[]
}>()
</script>

<template>
  <section id="experience" class="experience" aria-labelledby="experience-title" data-reveal>
    <CSectionMarker class="experience-marker" number="04" />
    <header class="experience-heading">
      <h2 id="experience-title">Experience</h2>
      <p>{{ experienceLabel }} of building, learning, and growing.</p>
    </header>
    <div class="experience-summary">
      <strong>{{ experienceLabel }}</strong>
      <span>of frontend<br>development<br>experience</span>
    </div>
    <ol class="experience-list">
      <li
        v-for="role in roles"
        :key="`${role.company}-${role.title}`"
        :aria-current="role.current ? 'true' : undefined"
        :class="{ 'experience-current': role.current }"
      >
        <div>
          <strong>{{ role.title }}</strong>
          <span>{{ role.company }}</span>
        </div>
        <time>{{ role.shortPeriod }}</time>
        <p>{{ role.skills.join(' · ') }}</p>
      </li>
    </ol>
    <div class="experience-aside" aria-hidden="true" />
    <CButton class="experience-link" href="/resume">View full resume</CButton>
  </section>
</template>

<style scoped>
.experience {
  border-bottom: 1px solid var(--rule);
  display: grid;
  gap: 1.5rem 2.5rem;
  grid-template-columns: 3rem 14rem 1fr 8rem;
  padding: 3.5rem var(--page-gutter);
  position: relative;
}

.experience-marker { grid-row: 1 / 3; }

.experience-heading {
  grid-column: 2 / 4;
}

.experience-heading h2 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .7rem;
}

.experience-heading p,
.experience-summary span {
  font-size: var(--text-xs);
  letter-spacing: .28em;
  line-height: 1.65;
  text-transform: uppercase;
}

.experience-summary {
  align-self: center;
  grid-column: 2;
}

.experience-summary strong,
.experience-summary span {
  display: block;
}

.experience-summary strong {
  font-size: var(--text-2xl);
  margin-bottom: 1rem;
}

.experience-list {
  border-left: 1px solid var(--rule-strong);
  grid-column: 3;
  list-style: none;
  margin: 0;
  padding: 0 0 0 2rem;
}

.experience-list li {
  align-items: center;
  border-bottom: 1px solid var(--rule);
  display: grid;
  gap: 1.2rem;
  grid-template-columns: 1.1fr .65fr 1fr;
  min-height: 4.4rem;
  padding: .6rem 0;
  position: relative;
}

.experience-list li::before {
  background: var(--canvas);
  border: 1px solid var(--text);
  border-radius: 50%;
  content: '';
  height: .6rem;
  left: -2.35rem;
  position: absolute;
  width: .6rem;
}

.experience-list .experience-current::before {
  background: var(--text);
}

.experience-list strong,
.experience-list span {
  display: block;
}

.experience-list strong {
  font-size: var(--text-sm);
}

.experience-list span {
  font-size: var(--text-xs);
  letter-spacing: .22em;
  text-transform: uppercase;
}

.experience-list time,
.experience-list p {
  font-size: var(--text-xs);
  line-height: 1.4;
  margin: 0;
}

.experience-aside {
  border-left: 1px solid var(--rule-strong);
  grid-column: 4;
  grid-row: 1 / 3;
  padding-left: 1.5rem;
}

.experience-link {
  bottom: 2.25rem;
  font-size: var(--text-xs);
  min-height: 3.2rem;
  position: absolute;
  right: var(--page-gutter);
}

@media (min-width: 68.0625rem) {
  .experience-link { bottom: 1.2rem; }
}

@media (max-width: 68rem) {
  .experience {
    grid-template-columns: 3rem 10rem 1fr;
  }

  .experience-aside { display: none; }
  .experience-heading { grid-column: 2 / -1; }
}

@media (max-width: 44rem) {
  .experience {
    gap: 2rem 1rem;
    grid-template-columns: 2.5rem 1fr;
    padding: 3rem 1.25rem 7rem;
  }

  .experience-heading,
  .experience-summary,
  .experience-list {
    grid-column: 2;
  }

  .experience-marker { grid-row: 1 / 4; }

  .experience-list li {
    align-items: start;
    grid-template-columns: 1fr;
    padding: 1rem 0;
  }
}
</style>
