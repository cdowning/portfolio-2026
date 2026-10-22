<script setup lang="ts">
import CTag from '~/components/ui/CTag/CTag.vue'
import type { WorkItem } from '~/types/content'

defineProps<{
  items: WorkItem[]
}>()
</script>

<template>
  <section id="work" class="work" aria-labelledby="work-title" data-reveal>
    <header class="work-heading">
      <div class="section-index"><span>Next</span><strong>02</strong></div>
      <div>
        <h2 id="work-title">Selected work</h2>
        <p>Real problems. Thoughtful solutions.</p>
      </div>
      <span class="work-rule" aria-hidden="true" />
      <p class="work-note" aria-hidden="true">Created<br>with care</p>
    </header>

    <div class="work-grid">
      <article v-for="item in items" :key="item.index" class="work-card">
        <div class="specimen" :class="`specimen--${item.specimen}`" aria-hidden="true">
          <template v-if="item.specimen === 'components'">
            <div class="specimen-sidebar"><i v-for="n in 6" :key="n" /></div>
            <div class="specimen-canvas">
              <small>Buttons</small><b>Component states</b>
              <div class="specimen-buttons"><i /><i /><i /></div>
              <div class="specimen-rows"><span v-for="n in 3" :key="n" /></div>
            </div>
          </template>
          <template v-else-if="item.specimen === 'interaction'">
            <div class="flow"><i class="flow-active" /><i /><i /><i /></div>
            <b>Profile flow</b><small>Clear steps. Less friction.</small>
            <div class="form-lines"><i /><i /><i /></div>
            <span class="specimen-button">Continue</span>
          </template>
          <template v-else>
            <div class="system-top"><i /><i /><i /></div>
            <b>Frontend system</b><small>Reusable patterns in production.</small>
            <div class="system-map"><i /><i /><i /><i /><i /></div>
          </template>
        </div>

        <div class="work-card-body">
          <div class="work-card-index">{{ item.index }}</div>
          <div>
            <h3>{{ item.title }}</h3>
            <p class="work-card-eyebrow">{{ item.eyebrow }}</p>
            <p class="work-card-description">{{ item.description }}</p>
            <ul class="work-card-tags" aria-label="Technologies and disciplines">
              <CTag v-for="tag in item.tags" :key="tag" :label="tag" />
            </ul>
            <a
              class="work-card-link"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noreferrer' : undefined"
              :aria-label="`View ${item.title}`"
            >
              View project <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.work {
  border-bottom: 1px solid var(--rule);
  padding: 2.5rem var(--page-gutter) 4.5rem;
}

.work-heading {
  align-items: center;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 5rem auto 1fr 7rem;
  margin-bottom: 2.75rem;
}

.section-index {
  border-right: 1px solid var(--rule-strong);
  display: grid;
  gap: .45rem;
  min-height: 4.5rem;
}

.section-index span {
  font-size: var(--text-xs);
  letter-spacing: .3em;
  text-transform: uppercase;
}

.section-index strong {
  font-size: var(--text-md);
  font-weight: 400;
}

.work-heading h2 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .65rem;
}

.work-heading p {
  font-size: var(--text-xs);
  letter-spacing: .3em;
  margin: 0;
  text-transform: uppercase;
}

.work-rule {
  background: var(--rule-strong);
  height: 1px;
}

.work-note {
  line-height: 1.8;
}

.work-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.work-card {
  border-right: 1px solid var(--rule);
  min-width: 0;
  padding-right: 1rem;
}

.work-card:last-child {
  border-right: 0;
  padding-right: 0;
}

.specimen {
  aspect-ratio: 1.28;
  background: var(--surface-raised);
  border: 1px solid var(--rule);
  box-shadow: 0 1.25rem 2.5rem var(--shadow);
  overflow: hidden;
  padding: 1.25rem;
  position: relative;
}

.specimen::before {
  background: var(--text);
  box-shadow: .7rem 0 var(--rule-strong), 1.4rem 0 var(--rule-strong);
  content: '';
  height: .25rem;
  left: .75rem;
  opacity: .45;
  position: absolute;
  top: .6rem;
  width: .25rem;
}

.specimen b,
.specimen small {
  display: block;
}

.specimen b {
  font-size: var(--text-sm);
  margin-bottom: .45rem;
}

.specimen small {
  font-size: var(--text-xs);
  letter-spacing: .08em;
  margin-bottom: 1.1rem;
}

.specimen-components {
  display: grid;
  grid-template-columns: 23% 1fr;
  padding: 0;
}

.specimen-sidebar {
  background: var(--support-wash);
  display: grid;
  gap: .75rem;
  padding: 2.5rem .85rem 1rem;
}

.specimen-sidebar i {
  background: color-mix(in srgb, var(--support) 45%, transparent);
  height: .32rem;
  width: 80%;
}

.specimen-canvas {
  padding: 2.5rem 1.1rem 1rem;
}

.specimen-buttons {
  display: flex;
  gap: .5rem;
  margin: 1.5rem 0;
}

.specimen-buttons i {
  background: var(--support);
  border-radius: .15rem;
  height: 1.5rem;
  width: 3.6rem;
}

.specimen-buttons i:nth-child(2) { background: transparent; border: 1px solid var(--support); }
.specimen-buttons i:nth-child(3) { background: var(--surface-muted); }

.specimen-rows {
  display: grid;
  gap: .65rem;
}

.specimen-rows span {
  background: linear-gradient(90deg, var(--support-highlight) 0 20%, var(--surface-muted) 20% 100%);
  height: .8rem;
}

.specimen-interaction {
  padding-top: 2.5rem;
}

.flow {
  display: flex;
  justify-content: space-between;
  margin: .15rem 0 1.5rem;
  position: relative;
}

.flow::before {
  background: var(--rule-strong);
  content: '';
  height: 1px;
  left: .5rem;
  position: absolute;
  right: .5rem;
  top: .45rem;
}

.flow i {
  background: var(--surface-raised);
  border: 1px solid var(--support);
  border-radius: 50%;
  height: .9rem;
  position: relative;
  width: .9rem;
}

.flow .flow-active { background: var(--support); }

.form-lines {
  display: grid;
  gap: .7rem;
  width: 72%;
}

.form-lines i {
  border: 1px solid var(--rule);
  height: 1.35rem;
}

.specimen-button {
  background: var(--support);
  color: var(--canvas);
  display: block;
  font-size: var(--text-xs);
  margin-top: .7rem;
  padding: .45rem;
  text-align: center;
  width: 4.5rem;
}

.specimen-systems {
  padding-top: 2.5rem;
}

.system-top {
  display: flex;
  gap: .4rem;
  position: absolute;
  right: 1rem;
  top: .65rem;
}

.system-top i {
  background: var(--support-highlight);
  border-radius: 50%;
  height: .4rem;
  width: .4rem;
}

.system-map {
  display: grid;
  gap: .6rem;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1.4rem;
}

.system-map i {
  background: var(--surface-muted);
  border-left: 1px solid var(--support);
  height: 2.2rem;
}

.system-map i:first-child {
  background: var(--support-wash);
  grid-column: 1 / -1;
}

.work-card-body {
  display: grid;
  gap: 1rem;
  grid-template-columns: 2.4rem 1fr;
  padding-top: 1.5rem;
}

.work-card-index {
  border-right: 1px solid var(--rule-strong);
  font-size: var(--text-xs);
}

.work-card h3 {
  font-size: var(--text-lg);
  font-weight: 500;
  margin: 0 0 .35rem;
}

.work-card-eyebrow {
  font-size: var(--text-xs);
  letter-spacing: .25em;
  text-transform: uppercase;
}

.work-card-description {
  font-size: var(--text-sm);
  line-height: 1.45;
  max-width: 34ch;
}

.work-card-tags {
  --tag-font-size: var(--text-xs);
  --tag-min-height: 0;
  --tag-padding: .3rem .45rem;

  display: flex;
  flex-wrap: wrap;
  gap: .4rem;
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}

.work-card-link {
  font-size: var(--text-xs);
  text-decoration-color: var(--rule-strong);
  text-underline-offset: .3rem;
}

.work-card-link span {
  display: inline-block;
  font-size: var(--text-base);
  margin-left: .5rem;
}

.work { padding: 2.5rem 1.25rem; }

.work-heading {
  align-items: start;
  gap: 1rem;
  grid-template-columns: 3.4rem 1fr;
}

.work-rule,
.work-note { display: none; }

.work-grid { grid-template-columns: 1fr; }

.work-card {
  border-bottom: 1px solid var(--rule);
  border-right: 0;
  padding: 0 0 2.5rem;
}

.specimen { max-height: 32rem; }

@media (min-width: 40rem) {
  .work { padding: 2.5rem var(--page-gutter) 4.5rem; }
  .work-heading {
    align-items: center;
    gap: 2.5rem;
    grid-template-columns: 5rem auto 1fr 7rem;
  }

  .work-rule,
  .work-note { display: block; }
}

@media (min-width: 64rem) {
  .work-grid { grid-template-columns: repeat(3, 1fr); }

  .work-card {
    border-bottom: 0;
    border-right: 1px solid var(--rule);
    padding: 0 1rem 0 0;
  }

  .work-card:last-child { border-right: 0; padding-right: 0; }
  .specimen { max-height: none; }
}
</style>
