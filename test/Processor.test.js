import { strictEqual } from 'node:assert'
import { describe, it } from 'mocha'
import Processor from '../lib/Processor.js'
import * as examples from './support/examples.js'

describe('Processor', () => {
  it('should be a constructor', () => {
    strictEqual(typeof Processor, 'function')
  })

  it('should assign the given path argument', () => {
    const path = {}
    const processor = new Processor({ path })

    strictEqual(processor.path, path)
  })

  it('should assign process.cwd() to the path property if no argument is given', () => {
    const processor = new Processor()

    strictEqual(processor.path, process.cwd())
  })

  describe('.process', () => {
    it('should be a method', () => {
      const processor = new Processor()

      strictEqual(typeof processor.process, 'function')
    })

    it('should process all imports', async () => {
      const processor = new Processor()

      const result = await processor.process('./test/support/multi-imports.md')

      strictEqual(result, examples.multiImports.content)
    })

    it('should process deep imports', async () => {
      const processor = new Processor()

      const result = await processor.process('./test/support/import-deep.md')

      strictEqual(result, examples.importDeep.content)
    })

    it('should process deep with decreasing depth change', async () => {
      const processor = new Processor()

      const result = await processor.process('./test/support/import-deep-change-minus.md')

      strictEqual(result, examples.importDeepChangeMinus.content)
    })

    it('should process deep with increasing depth change', async () => {
      const processor = new Processor()

      const result = await processor.process('./test/support/import-deep-change-plus.md')

      strictEqual(result, examples.importDeepChangePlus.content)
    })
  })
})
