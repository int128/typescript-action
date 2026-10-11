import assert from 'node:assert'
import * as fs from 'node:fs/promises'
import { Octokit } from '@octokit/action'
import type { webhooks } from '@octokit/openapi-webhooks-types'
import { retry } from '@octokit/plugin-retry'

export const getOctokit = () => new (Octokit.plugin(retry))()

type Payload<Event extends keyof webhooks> = webhooks[Event]['post']['requestBody']['content']['application/json']
type PossiblePayload = Payload<keyof webhooks>

export type Context = {
  repo: {
    owner: string
    repo: string
  }
  sha: string
  payload: PossiblePayload
}

export const getContext = async (): Promise<Context> => {
  // https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#default-environment-variables
  return {
    repo: getRepo(),
    sha: getEnv('GITHUB_SHA'),
    payload: JSON.parse(await fs.readFile(getEnv('GITHUB_EVENT_PATH'), 'utf-8')) as PossiblePayload,
  }
}

const getRepo = () => {
  const [owner, repo] = getEnv('GITHUB_REPOSITORY').split('/')
  assert(owner, 'GITHUB_REPOSITORY must have an owner part')
  assert(repo, 'GITHUB_REPOSITORY must have a repo part')
  return { owner, repo }
}

const getEnv = (name: string): string => {
  assert(process.env[name], `${name} is required`)
  return process.env[name]
}
