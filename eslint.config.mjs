import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  name: 'project/vendor-ignores',
  ignores: [
    '.agents/skills/**',
    '.claude/skills/**',
    '.github/skills/**',
  ],
}, {
  rules: {
    'vue/multi-word-component-names': 'off',
  },
})
