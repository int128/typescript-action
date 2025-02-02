import { expect, it } from 'vitest'
import { run } from '../src/run.js'

it('runs successfully', async () => {
  await expect(run({ name: 'foo' })).resolves.toBeUndefined()
})
