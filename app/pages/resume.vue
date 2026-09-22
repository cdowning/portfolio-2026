<script setup lang="ts">
import ResumeContact from '~/components/resume/ResumeContact.vue'
import ResumeEducationToolkit from '~/components/resume/ResumeEducationToolkit.vue'
import ResumeExperience from '~/components/resume/ResumeExperience.vue'
import ResumeIntro from '~/components/resume/ResumeIntro.vue'
import ResumePrint from '~/components/resume/ResumePrint.vue'
import ResumeSkills from '~/components/resume/ResumeSkills.vue'
import { usePrintResume } from '~/composables/usePrintResume'
import { education, experience, profile, skillGroups, toolkit } from '~/content/site'

const { printResume } = usePrintResume()
const capabilities = ['Vue.js', 'Nuxt', 'TypeScript', 'Accessibility', 'Design systems']

useSeoMeta({
  title: 'Caitlin Hawley — Résumé',
  description: `${profile.role} experience, skills, tools, and education.`,
  ogTitle: 'Caitlin Hawley — Résumé',
  ogDescription: profile.summary,
  ogType: 'profile',
  ogUrl: `${profile.website}/resume`,
})

useHead({
  link: [{ rel: 'canonical', href: `${profile.website}/resume` }],
})
</script>

<template>
  <div class="resume-page">
    <div class="resume-web">
      <main id="resume-content">
        <ResumeIntro :profile="profile" :capabilities="capabilities" @print="printResume" />
        <ResumeSkills :groups="skillGroups" :profile="profile" />
        <ResumeExperience :roles="experience" />
        <ResumeEducationToolkit :education="education" :toolkit="toolkit" />
      </main>
      <ResumeContact :profile="profile" />
    </div>
    <ResumePrint
      :education="education"
      :profile="profile"
      :roles="experience"
      :skill-groups="skillGroups"
      :toolkit="toolkit"
    />
  </div>
</template>

<style scoped>
.resume-page {
  margin-inline: auto;
  max-width: var(--content-max);
  min-height: 100svh;
}

@media print {
  .resume-page { max-width: none; }
  .resume-web { display: none !important; }
}
</style>
