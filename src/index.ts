import * as core from '@actions/core'
import { run } from './run.js'

try {
  await run({
    name: core.getInput('name', { required: true }),
  })
} catch (e) {
  core.setFailed(e instanceof Error ? e : String(e))
  console.error(e)
}
