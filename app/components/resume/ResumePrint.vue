<script setup lang="ts">
import type { EducationEntry, ExperienceRole, SiteProfile, SkillGroup } from '~/types/content'

defineProps<{
  education: EducationEntry
  profile: SiteProfile
  roles: ExperienceRole[]
  skillGroups: SkillGroup[]
  toolkit: string[]
}>()

function forPrint(value: string) {
  return value.replace(/[–—‑]/g, '-')
}
</script>

<template>
  <div class="resume-print">
    <section class="print-page print-page--profile">
      <header class="print-identity">
        <div>
          <p class="print-label">Frontend developer</p>
          <h1>{{ profile.name }}</h1>
          <p class="print-intro">{{ forPrint(profile.summary) }}</p>
        </div>
        <address>
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          <span>{{ profile.location }}</span>
          <a :href="profile.website">caitlinhawley.com</a>
          <a href="https://www.linkedin.com/in/caitlindowning/">linkedin.com/in/caitlindowning</a>
          <a href="https://github.com/cdowning">github.com/cdowning</a>
        </address>
      </header>

      <section class="print-profile">
        <p class="print-number">01</p>
        <div>
          <h2>Professional profile</h2>
          <p>{{ forPrint(profile.summary) }}</p>
        </div>
      </section>

      <section class="print-skills">
        <p class="print-number">02</p>
        <div>
          <h2>Capabilities & skills</h2>
          <div class="print-skill-groups">
            <section v-for="group in skillGroups" :key="group.title">
              <h3>{{ group.title }}</h3>
              <ul>
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section class="print-method">
        <div>
          <h2 class="print-label">How I work</h2>
          <h3>Systems, screens, and people.</h3>
          <p>{{ forPrint(profile.approach) }}</p>
        </div>
        <ul>
          <li><strong>Systems</strong><span>Solid foundations</span></li>
          <li><strong>Screens</strong><span>Meaningful experiences</span></li>
          <li><strong>People</strong><span>A more human web</span></li>
        </ul>
      </section>

      <footer class="print-page__footer">
        <strong>Caitlin Hawley</strong>
        <span>Thoughtful code for a brighter web.</span>
        <span>Page 1 / 2</span>
      </footer>
    </section>

    <section class="print-page print-page--experience">
      <header class="print-page__heading">
        <div><p class="print-label">Caitlin Hawley</p><h1>Experience</h1></div>
        <p>More than a decade turning visual ideas into accessible, reusable interfaces.</p>
      </header>

      <ol class="print-roles">
        <li v-for="role in roles" :key="`${role.company}-${role.title}`">
          <time>{{ forPrint(role.shortPeriod) }}</time>
          <article>
            <header><div><h2>{{ role.company }}</h2><p>{{ role.title }}</p></div><time>{{ forPrint(role.period) }}</time></header>
            <ul><li v-for="bullet in role.bullets" :key="bullet">{{ bullet }}</li></ul>
          </article>
        </li>
      </ol>

      <div class="print-foundation">
        <section>
          <p class="print-number">03</p>
          <div><h2>Education</h2><strong>{{ forPrint(education.school) }}</strong><span>{{ education.degree }}</span><time>{{ forPrint(education.period) }}</time></div>
        </section>
        <section>
          <p class="print-number">04</p>
          <div><h2>Toolkit</h2><p>{{ toolkit.join(' · ') }}</p></div>
        </section>
      </div>

      <footer class="print-page__footer">
        <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <a :href="profile.website">caitlinhawley.com</a>
        <span>Page 2 / 2</span>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.resume-print { display: none; }

@media print {
  @page { margin: 0; size: Letter; }

  :global(html),
  :global(body) {
    background: #fff !important;
    color: #111 !important;
    margin: 0 !important;
    min-width: 0 !important;
    print-color-adjust: economy;
  }

  .resume-print {
    display: block;
    font-family: var(--font-body);
  }

  .print-page {
    break-after: page;
    display: flex;
    flex-direction: column;
    height: 11in;
    overflow: hidden;
    padding: .48in .52in .38in;
    width: 8.5in;
  }

  .print-page:last-child { break-after: auto; }

  .print-identity {
    border-bottom: 1.5px solid #111;
    display: grid;
    gap: .42in;
    grid-template-columns: 1fr 2.25in;
    padding-bottom: .28in;
  }

  .print-label {
    font-size: 7pt;
    font-weight: 700;
    letter-spacing: .24em;
    margin: 0 0 .08in;
    text-transform: uppercase;
  }

  .print-identity h1,
  .print-page__heading h1 {
    font-family: var(--font-display);
    font-size: 37pt;
    letter-spacing: -.03em;
    line-height: .95;
    margin: 0 0 .16in;
  }

  .print-intro {
    font-size: 9.25pt;
    line-height: 1.4;
    margin: 0;
    max-width: 48ch;
  }

  .print-identity address {
    align-self: end;
    display: grid;
    font-size: 7.4pt;
    font-style: normal;
    gap: .065in;
  }

  .print-identity address a,
  .print-page__footer a {
    color: #111;
    text-decoration: none;
  }

  .print-profile,
  .print-skills {
    display: grid;
    gap: .22in;
    grid-template-columns: .35in 1fr;
  }

  .print-profile {
    border-bottom: 1px solid #bbb;
    padding: .32in 0;
  }

  .print-skills { padding-top: .3in; }

  .print-number {
    border-right: 1px solid #888;
    font-size: 7pt;
    margin: 0;
  }

  .print-page h2 {
    font-family: var(--font-display);
    font-size: 14pt;
    letter-spacing: -.02em;
    margin: 0 0 .12in;
  }

  .print-profile p:last-child {
    font-size: 9pt;
    line-height: 1.45;
    margin: 0;
    max-width: 67ch;
  }

  .print-skill-groups {
    display: grid;
    gap: .25in;
    grid-template-columns: 1fr 1fr;
  }

  .print-skill-groups section { border-top: 1px solid #888; padding-top: .12in; }
  .print-skill-groups h3 { font-size: 9pt; margin: 0 0 .1in; }
  .print-skill-groups ul { display: flex; flex-wrap: wrap; gap: .06in; list-style: none; margin: 0; padding: 0; }
  .print-skill-groups li { border: 1px solid #bbb; font-size: 7.5pt; padding: .05in .075in; }

  .print-method {
    border-bottom: 1px solid #aaa;
    border-top: 1.5px solid #111;
    display: grid;
    gap: .35in;
    grid-template-columns: 1.3fr 1fr;
    margin-top: .34in;
    padding: .24in 0;
  }

  .print-method h3 { font-size: 12pt; margin-bottom: .1in; }
  .print-method > div > p:last-child { font-size: 7.75pt; line-height: 1.4; margin: 0; }
  .print-method ul { display: grid; gap: .08in; grid-template-columns: repeat(3, 1fr); list-style: none; margin: .08in 0 0; padding: 0; }
  .print-method li { border-left: 1px solid #999; padding-left: .08in; }
  .print-method strong,
  .print-method span { display: block; }
  .print-method strong { font-size: 7.5pt; text-transform: uppercase; }
  .print-method span { font-size: 6.5pt; line-height: 1.3; margin-top: .05in; }

  .print-page__footer {
    align-items: center;
    border-top: 1px solid #111;
    display: grid;
    font-size: 7pt;
    grid-template-columns: 1fr 1fr auto;
    margin-top: auto;
    padding-top: .12in;
  }

  .print-page__footer span:nth-child(2) { text-align: center; }

  .print-page__heading {
    align-items: end;
    border-bottom: 1.5px solid #111;
    display: grid;
    gap: .4in;
    grid-template-columns: 1fr 2.8in;
    padding-bottom: .2in;
  }

  .print-page__heading h1 { font-size: 31pt; margin-bottom: 0; }
  .print-page__heading > p { font-size: 8.5pt; line-height: 1.35; margin: 0; }

  .print-roles { list-style: none; margin: .18in 0 0; padding: 0; }
  .print-roles > li {
    display: grid;
    gap: .18in;
    grid-template-columns: .72in 1fr;
    padding: .105in 0;
  }

  .print-roles > li + li { border-top: 1px solid #ccc; }
  .print-roles > li > time { font-size: 7pt; font-weight: 700; line-height: 1.35; text-transform: uppercase; }
  .print-roles article header { align-items: start; display: flex; justify-content: space-between; }
  .print-roles article h2 { font-family: var(--font-body); font-size: 10pt; margin: 0; }
  .print-roles article header p { font-size: 7.5pt; letter-spacing: .06em; margin: 0; }
  .print-roles article header time { font-size: 7pt; white-space: nowrap; }
  .print-roles article ul { font-size: 7pt; line-height: 1.3; margin: .06in 0 0; padding-left: .15in; }

  .print-foundation {
    border-top: 1.5px solid #111;
    display: grid;
    gap: .28in;
    grid-template-columns: 1fr 1fr;
    margin-top: .1in;
    padding-top: .16in;
  }

  .print-foundation > section { display: grid; gap: .12in; grid-template-columns: .3in 1fr; }
  .print-foundation > section + section { border-left: 1px solid #aaa; padding-left: .2in; }
  .print-foundation h2 { font-size: 10pt; margin-bottom: .06in; }
  .print-foundation strong,
  .print-foundation span,
  .print-foundation time { display: block; font-size: 7pt; line-height: 1.35; }
  .print-foundation p { font-size: 7pt; line-height: 1.4; margin: 0; }
}
</style>
