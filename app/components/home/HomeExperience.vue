<script setup lang="ts">
import CButton from '~/components/ui/CButton/CButton.vue'
import CSectionMarker from '~/components/ui/CSectionMarker/CSectionMarker.vue'
import CTimeline from '~/components/ui/CTimeline/CTimeline.vue'
import type { ExperienceRole } from '~/types/content'

defineProps<{
  experienceLabel: string
  roles: ExperienceRole[]
}>()

const roleKey = (role: ExperienceRole) => `${role.company}-${role.title}`
const isCurrentRole = (role: ExperienceRole) => Boolean(role.current)
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
    <CTimeline
      v-slot="{ item: role }"
      class="experience-list"
      :items="roles"
      :item-key="roleKey"
      :is-current="isCurrentRole"
    >
      <div class="experience-role">
        <div>
          <strong>{{ role.title }}</strong>
          <span>{{ role.company }}</span>
        </div>
        <time>{{ role.shortPeriod }}</time>
        <p>{{ role.skills.join(' · ') }}</p>
      </div>
    </CTimeline>
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
  --timeline-content-inset: 2rem;
  --timeline-axis-position: 0rem;
  --timeline-item-min-size: 4.4rem;
  --timeline-marker-block-offset: 50%;

  grid-column: 3;
}

.experience-role {
  align-items: center;
  border-bottom: 1px solid var(--rule);
  display: grid;
  gap: 1.2rem;
  grid-template-columns: 1.1fr .65fr 1fr;
  min-height: inherit;
  padding: .6rem 0;
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
  font-size: var(--text-xs);
  grid-column: 2;
  justify-self: start;
  min-height: 3.2rem;
}

.experience {
  column-gap: .5rem;
  grid-template-columns: 1.5rem minmax(0, 1fr);
  padding: 3rem 1.25rem;
}

.experience-aside { display: none; }
.experience-marker { grid-column: 1; grid-row: 1 / 4; }

.experience-heading,
.experience-summary,
.experience-list { grid-column: 2; }

.experience-role {
  align-items: start;
  grid-template-columns: 1fr;
  padding: 1rem 0;
}

@media (min-width: 40rem) {
  .experience {
    column-gap: 1rem;
    grid-template-columns: 2.5rem 1fr;
  }
}

@media (min-width: 48rem) {
  .experience {
    gap: 1.5rem 2.5rem;
    grid-template-columns: 3rem 10rem 1fr;
    padding: 3.5rem var(--page-gutter);
  }

  .experience-marker { grid-row: 1 / 3; }
  .experience-heading { grid-column: 2 / -1; }
  .experience-summary { grid-column: 2; }
  .experience-list { grid-column: 3; }
  .experience-link {
    grid-column: 3;
    justify-self: end;
  }

  .experience-role {
    align-items: center;
    grid-template-columns: 1.1fr .65fr 1fr;
    padding: .6rem 0;
  }
}

@media (min-width: 80rem) {
  .experience {
    grid-template-columns: 3rem 14rem 1fr 8rem;
  }

  .experience-aside { display: block; }
  .experience-heading { grid-column: 2 / 4; }
  .experience-link { grid-column: 3 / 5; }
}
</style>
