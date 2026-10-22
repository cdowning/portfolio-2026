<script setup lang="ts">
const primitiveTokens = [
  { name: '--text-xs', value: '0.75rem', nominal: '12px' },
  { name: '--text-sm', value: '0.833rem', nominal: '13.33px' },
  { name: '--text-base', value: '1rem', nominal: '16px' },
  { name: '--text-md', value: '1.2rem', nominal: '19.2px' },
  { name: '--text-lg', value: '1.44rem', nominal: '23.04px' },
  { name: '--text-xl', value: '1.728rem', nominal: '27.65px' },
  { name: '--text-2xl', value: '2.074rem', nominal: '33.18px' },
  { name: '--text-3xl', value: '2.488rem', nominal: '39.81px' },
  { name: '--text-4xl', value: '2.986rem', nominal: '47.78px' },
  { name: '--text-5xl', value: '3.583rem', nominal: '57.33px' },
  { name: '--text-6xl', value: '4.3rem', nominal: '68.8px' },
  { name: '--text-7xl', value: '5.16rem', nominal: '82.56px' },
  { name: '--text-8xl', value: '6.192rem', nominal: '99.07px' },
  { name: '--text-9xl', value: '7.43rem', nominal: '118.88px' },
] as const

const semanticRoles = [
  { name: '--text-body', value: 'var(--text-base)', sample: 'Thoughtful interfaces begin with readable body copy.' },
  { name: '--text-body-large', value: 'var(--text-md)', sample: 'A larger introduction creates a gentle shift in emphasis.' },
  { name: '--text-label', value: 'var(--text-sm)', sample: 'Drafting label' },
  { name: '--text-section-title', value: 'clamp(--text-2xl → --text-4xl)', sample: 'Section title' },
  { name: '--text-page-title', value: 'clamp(--text-5xl → --text-8xl)', sample: 'Page title' },
] as const
</script>

<template>
  <main class="type-specimen">
    <header class="type-intro">
      <p class="type-kicker">Foundation</p>
      <h1 class="type-heading">Typography</h1>
      <p class="type-description">A 1.2 minor-third screen scale with a 12px readability floor.</p>
    </header>

    <section class="type-section" aria-labelledby="primitive-title">
      <h2 id="primitive-title" class="type-section-title">Primitive scale</h2>
      <ol class="type-list">
        <li v-for="token in primitiveTokens" :key="token.name" class="type-row">
          <div class="type-meta">
            <code>{{ token.name }}</code>
            <span>{{ token.value }}</span>
            <span>{{ token.nominal }}</span>
          </div>
          <p class="type-sample" :style="{ fontSize: `var(${token.name})` }">Aa</p>
        </li>
      </ol>
    </section>

    <section class="type-section" aria-labelledby="semantic-title">
      <h2 id="semantic-title" class="type-section-title">Semantic roles</h2>
      <ul class="type-list">
        <li v-for="role in semanticRoles" :key="role.name" class="type-role">
          <div class="type-meta">
            <code>{{ role.name }}</code>
            <span>{{ role.value }}</span>
          </div>
          <p class="type-role-sample" :style="{ fontSize: `var(${role.name})` }">{{ role.sample }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.type-specimen {
  width: min(100%, 90rem);
  padding: clamp(2rem, 5vw, 5rem);
  background: var(--canvas);
  color: var(--text);
  font-family: var(--font-body);
}

.type-intro {
  display: grid;
  gap: 1rem;
  padding-bottom: clamp(2rem, 5vw, 4rem);
  border-bottom: 1px solid var(--rule-strong);
}

.type-kicker,
.type-description,
.type-heading,
.type-section-title,
.type-sample,
.type-role-sample {
  margin: 0;
}

.type-kicker,
.type-section-title {
  color: var(--text-secondary);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
}

.type-heading {
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: var(--text-section-title);
  line-height: 1;
}

.type-description {
  max-width: 42rem;
  color: var(--text-secondary);
  font-size: var(--text-body);
}

.type-section {
  display: grid;
  grid-template-columns: minmax(8rem, .65fr) minmax(0, 3.35fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  padding-block: clamp(2rem, 5vw, 4rem);
  border-bottom: 1px solid var(--rule-strong);
}

.type-section-title {
  padding-top: .25rem;
}

.type-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.type-row,
.type-role {
  display: grid;
  grid-template-columns: minmax(13rem, .8fr) minmax(0, 2.2fr);
  gap: 1.5rem;
  align-items: center;
  min-height: 5rem;
  padding-block: 1rem;
  border-bottom: 1px solid var(--rule);
}

.type-row:last-child,
.type-role:last-child {
  border-bottom: 0;
}

.type-meta {
  display: grid;
  grid-template-columns: minmax(7rem, 1fr) auto auto;
  gap: 1rem;
  align-items: baseline;
  color: var(--text-muted);
  font-size: var(--text-xs);
}

.type-meta code {
  color: var(--text);
  font: inherit;
  font-weight: 700;
}

.type-sample,
.type-role-sample {
  min-width: 0;
  color: var(--text-strong);
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.type-role .type-meta {
  grid-template-columns: minmax(9rem, 1fr) minmax(0, 1.5fr);
}

.type-role-sample {
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.15;
}

.type-section,
.type-row,
.type-role { grid-template-columns: 1fr; }

.type-row,
.type-role { gap: .75rem; }

.type-meta,
.type-role .type-meta { gap: .25rem; grid-template-columns: 1fr; }

@media (min-width: 40rem) {
  .type-meta { gap: 1rem; grid-template-columns: minmax(7rem, 1fr) auto auto; }
  .type-role .type-meta { gap: 1rem; grid-template-columns: minmax(9rem, 1fr) minmax(0, 1.5fr); }
}

@media (min-width: 48rem) {
  .type-section { grid-template-columns: minmax(8rem, .65fr) minmax(0, 3.35fr); }
  .type-row,
  .type-role { gap: 1.5rem; grid-template-columns: minmax(13rem, .8fr) minmax(0, 2.2fr); }
}
</style>
