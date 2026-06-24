import { strictEqual } from 'node:assert'
import { spawn } from 'node:child_process'
import { describe, it } from 'mocha'
import * as examples from './support/examples.js'

function runCli (args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['./bin/md-processor.js', ...args])
    const stdout = []
    const stderr = []

    child.stdout.on('data', chunk => stdout.push(chunk))
    child.stderr.on('data', chunk => stderr.push(chunk))

    child.on('close', code => {
      resolve({
        stdout: Buffer.concat(stdout).toString(),
        stderr: Buffer.concat(stderr).toString(),
        code
      })
    })

    child.on('error', reject)
  })
}

describe('cli', () => {
  it('should process all imports', async () => {
    const { code, stdout } = await runCli(['./test/support/multi-imports.md'])

    strictEqual(code, 0)
    strictEqual(stdout, examples.multiImports.content)
  })

  it('should process deep imports', async () => {
    const { code, stdout } = await runCli(['./test/support/import-deep.md'])

    strictEqual(code, 0)
    strictEqual(stdout, examples.importDeep.content)
  })

  it('should exit with an error when no input is given', async () => {
    const { code } = await runCli([])

    strictEqual(code, 1)
  })

  it('should exit with an error when the input file does not exist', async () => {
    const { code } = await runCli(['./test/support/does-not-exist.md'])

    strictEqual(code !== 0, true)
  })
})
