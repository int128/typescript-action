import * as core from '@actions/core'
import { run } from './run.js'
import { getContext, getOctokit } from './github.js'

try {
  await run(
    {
      name: core.getInput('name', { required: true }),
    },
    getOctokit(),
    await getContext(),
  )
} catch (e) {
  core.setFailed(e instanceof Error ? e : String(e))
  console.error(e)
}
