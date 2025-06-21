import * as core from '@actions/core'
import { Context } from './github.js'
import { Octokit } from '@octokit/action'

type Inputs = {
  name: string
}

export const run = async (inputs: Inputs, octokit: Octokit, context: Context): Promise<void> => {
  core.info(`The name is ${inputs.name}`)

  const { data: pulls } = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
    owner: context.repo.owner,
    repo: context.repo.repo,
    commit_sha: context.sha,
  })
  for (const pull of pulls) {
    core.info(`Associated pull request: ${pull.html_url}`)
  }
}
