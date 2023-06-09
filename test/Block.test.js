import { strictEqual } from 'node:assert'
import { describe, it } from 'mocha'
import Block from '../lib/Block.js'

describe('Block', () => {
  it('should be a constructor', () => {
    strictEqual(typeof Block, 'function')
  })

  it('should assign the given header argument', () => {
    const header = {}
    const block = new Block({ header })

    strictEqual(block.header, header)
  })

  it('should assign the given level argument', () => {
    const level = {}
    const block = new Block({ level })

    strictEqual(block.level, level)
  })

  it('should have an empty array property named lines', () => {
    const block = new Block()

    strictEqual(Array.isArray(block.lines), true)
    strictEqual(block.lines.length, 0)
  })

  describe('.append', () => {
    it('should be a method', () => {
      const block = new Block()

      strictEqual(typeof block.append, 'function')
    })

    it('should append the given line', () => {
      const line = 'test'
      const block = new Block()

      block.append(line)

      strictEqual(block.lines.length, 1)
      strictEqual(block.lines[0], line)
    })
  })

  describe('.toString', () => {
    it('should return all lines joined by a line break', () => {
      const lines = ['abc', 'def']
      const block = new Block()

      block.append(lines[0])
      block.append(lines[1])

      strictEqual(block.toString(), lines.join('\n'))
    })
  })
})
