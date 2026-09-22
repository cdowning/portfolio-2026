<script setup lang="ts">
import ActionControl from '~/components/ui/ActionControl.vue'
import SectionMarker from '~/components/ui/SectionMarker.vue'
import type { ExperienceRole } from '~/types/content'

defineProps<{
  experienceLabel: string
  roles: ExperienceRole[]
}>()
</script>

<template>
  <section id="experience" class="experience" aria-labelledby="experience-title" data-reveal>
    <SectionMarker class="experience__marker" number="04" />
    <header class="experience__heading">
      <h2 id="experience-title">Experience</h2>
      <p>{{ experienceLabel }} of building, learning, and growing.</p>
    </header>
    <div class="experience__summary">
      <strong>{{ experienceLabel }}</strong>
      <span>of frontend<br>development<br>experience</span>
    </div>
    <ol class="experience__list">
      <li v-for="role in roles" :key="`${role.company}-${role.title}`">
        <div>
          <strong>{{ role.title }}</strong>
          <span>{{ role.company }}</span>
        </div>
        <time>{{ role.shortPeriod }}</time>
        <p>{{ role.skills.join(' · ') }}</p>
      </li>
    </ol>
    <div class="experience__aside" aria-hidden="true" />
    <ActionControl class="experience__link" href="/resume">View full resume</ActionControl>
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

.experience__marker { grid-row: 1 / 3; }

.experience__heading {
  grid-column: 2 / 4;
}

.experience__heading h2 {
  font-family: var(--font-display);
  font-size: 2.35rem;
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .7rem;
}

.experience__heading p,
.experience__summary span {
  font-size: .56rem;
  letter-spacing: .28em;
  line-height: 1.65;
  text-transform: uppercase;
}

.experience__summary {
  align-self: center;
  grid-column: 2;
}

.experience__summary strong,
.experience__summary span {
  display: block;
}

.experience__summary strong {
  font-size: 2.1rem;
  margin-bottom: 1rem;
}

.experience__list {
  border-left: 1px solid var(--rule-strong);
  grid-column: 3;
  list-style: none;
  margin: 0;
  padding: 0 0 0 2rem;
}

.experience__list li {
  align-items: center;
  border-bottom: 1px solid var(--rule);
  display: grid;
  gap: 1.2rem;
  grid-template-columns: 1.1fr .65fr 1fr;
  min-height: 4.4rem;
  padding: .6rem 0;
  position: relative;
}

.experience__list li::before {
  background: var(--paper);
  border: 1px solid var(--ink);
  border-radius: 50%;
  content: '';
  height: .6rem;
  left: -2.35rem;
  position: absolute;
  width: .6rem;
}

.experience__list strong,
.experience__list span {
  display: block;
}

.experience__list strong {
  font-size: .85rem;
}

.experience__list span {
  font-size: .54rem;
  letter-spacing: .22em;
  text-transform: uppercase;
}

.experience__list time,
.experience__list p {
  font-size: .68rem;
  line-height: 1.4;
  margin: 0;
}

.experience__aside {
  border-left: 1px solid var(--rule-strong);
  grid-column: 4;
  grid-row: 1 / 3;
  padding-left: 1.5rem;
}

.experience__link {
  bottom: 2.25rem;
  font-size: .75rem;
  min-height: 3.2rem;
  position: absolute;
  right: var(--page-gutter);
}

@media (max-width: 68rem) {
  .experience {
    grid-template-columns: 3rem 10rem 1fr;
  }

  .experience__aside { display: none; }
  .experience__heading { grid-column: 2 / -1; }
}

@media (max-width: 44rem) {
  .experience {
    gap: 2rem 1rem;
    grid-template-columns: 2.5rem 1fr;
    padding: 3rem 1.25rem 7rem;
  }

  .experience__heading,
  .experience__summary,
  .experience__list {
    grid-column: 2;
  }

  .experience__marker { grid-row: 1 / 4; }

  .experience__list li {
    align-items: start;
    grid-template-columns: 1fr;
    padding: 1rem 0;
  }
}
</style>
