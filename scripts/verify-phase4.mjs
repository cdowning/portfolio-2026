import { spawnSync } from 'node:child_process'

const checks = [
  ['test'],
  ['lint'],
  ['typecheck'],
  ['generate'],
  ['storybook:build'],
  [
    'test:e2e',
    'tests/e2e/foundation.spec.ts',
    'tests/e2e/homepage.spec.ts',
    'tests/e2e/resume.spec.ts',
    'tests/e2e/adaptation.spec.ts',
    '--project=chromium',
  ],
]

for (const [script, ...args] of checks) {
  const result = spawnSync('pnpm', [script, ...args], {
    env: process.env,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
