import { deepStrictEqual, strictEqual } from 'node:assert'
import { describe, it } from 'mocha'
import Markdown from '../lib/Markdown.js'
import * as examples from './support/examples.js'

describe('Markdown', () => {
  it('should be a constructor', () => {
    strictEqual(typeof Markdown, 'function')
  })

  it('should have an empty array property named blocks', () => {
    const markdown = new Markdown()

    strictEqual(Array.isArray(markdown.blocks), true)
    strictEqual(markdown.blocks.length, 0)
  })

  describe('.isEmpty', () => {
    it('should be a boolean property', () => {
      const markdown = new Markdown()

      strictEqual(typeof markdown.isEmpty, 'boolean')
    })
  })

  describe('.last', () => {
    it('should be a property pointing to the last block', () => {
      const markdown = new Markdown().append({}).append({})

      strictEqual(markdown.last, markdown.blocks[1])
    })

    it('should be undefined if the object is empty', () => {
      const markdown = new Markdown()

      strictEqual(typeof markdown.last, 'undefined')
    })
  })

  describe('.append', () => {
    it('should be a method', () => {
      const markdown = new Markdown()

      strictEqual(typeof markdown.append, 'function')
    })

    it('should append a new block with the given header and level', () => {
      const header = 'test'
      const level = '###'
      const markdown = new Markdown()

      markdown.append({ header, level })

      strictEqual(markdown.blocks.length, 1)
      strictEqual(markdown.blocks[0].header, header)
      strictEqual(markdown.blocks[0].level, level)
    })

    it('should return this', () => {
      const markdown = new Markdown()

      const result = markdown.append({})

      strictEqual(result, markdown)
    })
  })

  describe('.get', () => {
    it('should be a method', () => {
      const markdown = new Markdown()

      strictEqual(typeof markdown.get, 'function')
    })

    it('should return the block with the matching header', () => {
      const markdown = new Markdown()
        .append({ header: 'abc' })
        .append({ header: 'def' })

      const result = markdown.get('def')

      strictEqual(result.header, 'def')
    })

    it('should return undefined if no matching block was found', () => {
      const markdown = new Markdown()

      const result = markdown.get('def')

      strictEqual(typeof result, 'undefined')
    })
  })

  describe('.getAll', () => {
    it('should be a method', () => {
      const markdown = new Markdown()

      strictEqual(typeof markdown.getAll, 'function')
    })

    it('should return all blocks linked to the matching header', () => {
      const markdown = new Markdown()
        .append({ header: 'abc' })
        .append({ header: 'def', level: 1 })
        .append({ header: 'def 1', level: 2 })
        .append({ header: 'def 1.1', level: 3 })
        .append({ header: 'def 2', level: 2 })
        .append({ header: 'ghi' })

      const result = markdown.getAll('def', { deep: true })

      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 4)
      strictEqual(result[0].header, 'def')
      strictEqual(result[1].header, 'def 1')
      strictEqual(result[2].header, 'def 1.1')
      strictEqual(result[3].header, 'def 2')
    })

    it('should return an empty Array no matching block was found', () => {
      const markdown = new Markdown()

      const result = markdown.getAll('def')

      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })
  })

  describe('.parse', () => {
    it('should be a method', () => {
      const markdown = new Markdown()

      strictEqual(typeof markdown.parse, 'function')
    })

    it('should parse the given content', () => {
      const markdown = new Markdown()

      markdown.parse(examples.multiBlock.content)

      strictEqual(markdown.blocks[0].header, examples.multiBlock.blocks[0].header)
      strictEqual(markdown.blocks[0].level, examples.multiBlock.blocks[0].level)
      deepStrictEqual(markdown.blocks[0].lines, examples.multiBlock.blocks[0].lines)

      strictEqual(markdown.blocks[1].header, examples.multiBlock.blocks[1].header)
      strictEqual(markdown.blocks[1].level, examples.multiBlock.blocks[1].level)
      deepStrictEqual(markdown.blocks[1].lines, examples.multiBlock.blocks[1].lines)
    })
  })

  describe('static .load', () => {
    it('should be a static method', () => {
      strictEqual(typeof Markdown.load, 'function')
    })

    it('should parse the given file', async () => {
      const markdown = await Markdown.load('./test/support/multiBlock.md')

      strictEqual(markdown.blocks[0].header, examples.multiBlock.blocks[0].header)
      strictEqual(markdown.blocks[0].level, examples.multiBlock.blocks[0].level)
      deepStrictEqual(markdown.blocks[0].lines, examples.multiBlock.blocks[0].lines)

      strictEqual(markdown.blocks[1].header, examples.multiBlock.blocks[1].header)
      strictEqual(markdown.blocks[1].level, examples.multiBlock.blocks[1].level)
      deepStrictEqual(markdown.blocks[1].lines, examples.multiBlock.blocks[1].lines)
    })
  })
})
