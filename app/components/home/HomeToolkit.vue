<script setup lang="ts">
import SectionMarker from '~/components/ui/SectionMarker.vue'
import SkillTag from '~/components/ui/SkillTag.vue'
defineProps<{
  items: string[]
}>()
</script>

<template>
  <section class="toolkit" aria-labelledby="toolkit-title" data-reveal>
    <SectionMarker class="toolkit__marker" number="05" />
    <header>
      <h2 id="toolkit-title">Toolkit</h2>
      <p>The tools that help ideas take shape.</p>
    </header>
    <ul>
      <SkillTag v-for="item in items" :key="item" :label="item" variant="ruled" />
    </ul>
    <aside aria-hidden="true"><span>06</span><p>Tools<br>people<br>possibilities</p></aside>
  </section>
</template>

<style scoped>
.toolkit {
  align-items: center;
  border-bottom: 1px solid var(--rule);
  display: grid;
  gap: 2rem;
  grid-template-columns: 3rem 15rem 1fr 8rem;
  padding: 2.5rem var(--page-gutter);
}

.toolkit__marker { align-self: stretch; }

.toolkit h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .7rem;
}

.toolkit header p,
.toolkit aside p {
  font-size: .55rem;
  letter-spacing: .25em;
  line-height: 1.65;
  margin: 0;
  text-transform: uppercase;
}

.toolkit ul {
  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
}

.toolkit :deep(.skill-tag) { font-size: .67rem; min-height: 3rem; padding: .25rem .65rem; text-align: left; }

.toolkit aside {
  align-self: stretch;
  border-left: 1px solid var(--rule-strong);
  padding-left: 1.5rem;
}

.toolkit aside span {
  font-size: .65rem;
}

.toolkit aside p {
  margin-top: .5rem;
}

@media (max-width: 72rem) {
  .toolkit {
    grid-template-columns: 3rem 12rem 1fr;
  }

  .toolkit aside { display: none; }
  .toolkit ul { grid-template-columns: repeat(3, 1fr); }
  .toolkit li { padding-block: .7rem; }
}

@media (max-width: 42rem) {
  .toolkit {
    align-items: start;
    gap: 1.5rem 1rem;
    grid-template-columns: 2.5rem 1fr;
    padding: 3rem 1.25rem;
  }

  .toolkit__marker { grid-row: 1 / 3; }
  .toolkit ul { grid-column: 2; grid-template-columns: repeat(2, 1fr); }
}
</style>
