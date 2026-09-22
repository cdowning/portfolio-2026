<script setup lang="ts">
import SkillTag from '~/components/ui/SkillTag.vue'
import type { WorkItem } from '~/types/content'

defineProps<{
  items: WorkItem[]
}>()
</script>

<template>
  <section id="work" class="work" aria-labelledby="work-title" data-reveal>
    <header class="work__heading">
      <div class="section-index"><span>Next</span><strong>02</strong></div>
      <div>
        <h2 id="work-title">Selected work</h2>
        <p>Real problems. Thoughtful solutions.</p>
      </div>
      <span class="work__rule" aria-hidden="true" />
      <p class="work__note" aria-hidden="true">Created<br>with care</p>
    </header>

    <div class="work__grid">
      <article v-for="item in items" :key="item.index" class="work-card">
        <div class="specimen" :class="`specimen--${item.specimen}`" aria-hidden="true">
          <template v-if="item.specimen === 'components'">
            <div class="specimen__sidebar"><i v-for="n in 6" :key="n" /></div>
            <div class="specimen__canvas">
              <small>Buttons</small><b>Component states</b>
              <div class="specimen__buttons"><i /><i /><i /></div>
              <div class="specimen__rows"><span v-for="n in 3" :key="n" /></div>
            </div>
          </template>
          <template v-else-if="item.specimen === 'interaction'">
            <div class="flow"><i class="flow__active" /><i /><i /><i /></div>
            <b>Profile flow</b><small>Clear steps. Less friction.</small>
            <div class="form-lines"><i /><i /><i /></div>
            <span class="specimen__button">Continue</span>
          </template>
          <template v-else>
            <div class="system-top"><i /><i /><i /></div>
            <b>Frontend system</b><small>Reusable patterns in production.</small>
            <div class="system-map"><i /><i /><i /><i /><i /></div>
          </template>
        </div>

        <div class="work-card__body">
          <div class="work-card__index">{{ item.index }}</div>
          <div>
            <h3>{{ item.title }}</h3>
            <p class="work-card__eyebrow">{{ item.eyebrow }}</p>
            <p class="work-card__description">{{ item.description }}</p>
            <ul class="work-card__tags" aria-label="Technologies and disciplines">
              <SkillTag v-for="tag in item.tags" :key="tag" :label="tag" />
            </ul>
            <a
              class="work-card__link"
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

.work__heading {
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
  font-size: .55rem;
  letter-spacing: .3em;
  text-transform: uppercase;
}

.section-index strong {
  font-size: 1.2rem;
  font-weight: 400;
}

.work__heading h2 {
  font-family: var(--font-display);
  font-size: 2.4rem;
  letter-spacing: -.04em;
  line-height: 1;
  margin-bottom: .65rem;
}

.work__heading p {
  font-size: .6rem;
  letter-spacing: .3em;
  margin: 0;
  text-transform: uppercase;
}

.work__rule {
  background: var(--rule-strong);
  height: 1px;
}

.work__note {
  line-height: 1.8;
}

.work__grid {
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
  background: color-mix(in srgb, var(--paper-deep) 70%, white);
  border: 1px solid var(--rule);
  box-shadow: 0 1.25rem 2.5rem color-mix(in srgb, var(--ink) 8%, transparent);
  overflow: hidden;
  padding: 1.25rem;
  position: relative;
}

.specimen::before {
  background: var(--ink);
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
  font-size: .9rem;
  margin-bottom: .45rem;
}

.specimen small {
  font-size: .56rem;
  letter-spacing: .08em;
  margin-bottom: 1.1rem;
}

.specimen--components {
  display: grid;
  grid-template-columns: 23% 1fr;
  padding: 0;
}

.specimen__sidebar {
  background: #e8ece8;
  display: grid;
  gap: .75rem;
  padding: 2.5rem .85rem 1rem;
}

.specimen__sidebar i {
  background: color-mix(in srgb, var(--teal-deep) 45%, transparent);
  height: .32rem;
  width: 80%;
}

.specimen__canvas {
  padding: 2.5rem 1.1rem 1rem;
}

.specimen__buttons {
  display: flex;
  gap: .5rem;
  margin: 1.5rem 0;
}

.specimen__buttons i {
  background: var(--teal-deep);
  border-radius: .15rem;
  height: 1.5rem;
  width: 3.6rem;
}

.specimen__buttons i:nth-child(2) { background: transparent; border: 1px solid var(--teal-deep); }
.specimen__buttons i:nth-child(3) { background: #e4e3e1; }

.specimen__rows {
  display: grid;
  gap: .65rem;
}

.specimen__rows span {
  background: linear-gradient(90deg, var(--teal) 0 20%, #e6e8e7 20% 100%);
  height: .8rem;
}

.specimen--interaction {
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
  background: var(--paper);
  border: 1px solid var(--teal-deep);
  border-radius: 50%;
  height: .9rem;
  position: relative;
  width: .9rem;
}

.flow .flow__active { background: var(--teal-deep); }

.form-lines {
  display: grid;
  gap: .7rem;
  width: 72%;
}

.form-lines i {
  border: 1px solid var(--rule);
  height: 1.35rem;
}

.specimen__button {
  background: var(--teal-deep);
  color: white;
  display: block;
  font-size: .55rem;
  margin-top: .7rem;
  padding: .45rem;
  text-align: center;
  width: 4.5rem;
}

.specimen--systems {
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
  background: var(--teal);
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
  background: #e7e8e5;
  border-left: 1px solid var(--teal-deep);
  height: 2.2rem;
}

.system-map i:first-child {
  background: color-mix(in srgb, var(--teal) 25%, white);
  grid-column: 1 / -1;
}

.work-card__body {
  display: grid;
  gap: 1rem;
  grid-template-columns: 2.4rem 1fr;
  padding-top: 1.5rem;
}

.work-card__index {
  border-right: 1px solid var(--rule-strong);
  font-size: .65rem;
}

.work-card h3 {
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0 0 .35rem;
}

.work-card__eyebrow {
  font-size: .55rem;
  letter-spacing: .25em;
  text-transform: uppercase;
}

.work-card__description {
  font-size: .85rem;
  line-height: 1.45;
  max-width: 34ch;
}

.work-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: .4rem;
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}

.work-card__tags :deep(.skill-tag) { font-size: .63rem; min-height: 0; padding: .3rem .45rem; }

.work-card__link {
  font-size: .75rem;
  text-decoration-color: var(--rule-strong);
  text-underline-offset: .3rem;
}

.work-card__link span {
  display: inline-block;
  font-size: 1rem;
  margin-left: .5rem;
}

@media (max-width: 65rem) {
  .work__grid {
    grid-template-columns: 1fr;
  }

  .work-card {
    border-bottom: 1px solid var(--rule);
    border-right: 0;
    padding: 0 0 2.5rem;
  }

  .specimen {
    max-height: 32rem;
  }
}

@media (max-width: 40rem) {
  .work {
    padding: 2.5rem 1.25rem;
  }

  .work__heading {
    align-items: start;
    gap: 1rem;
    grid-template-columns: 3.4rem 1fr;
  }

  .work__rule,
  .work__note {
    display: none;
  }
}
</style>
