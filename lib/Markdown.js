import { readFile } from 'node:fs/promises'
import Block from './Block.js'

const parseHeaderRegex = /(#+) (.*)/

class Markdown {
  constructor () {
    this.blocks = []
  }

  get isEmpty () {
    return this.blocks.length === 0
  }

  get last () {
    return this.blocks[this.blocks.length - 1]
  }

  append ({ header, level } = {}) {
    this.blocks.push(new Block({ header, level }))

    return this
  }

  get (header) {
    return this.blocks.find(block => block.header === header)
  }

  parse (content) {
    const lines = content.split('\n')

    for (const line of lines) {
      const parsed = line.match(parseHeaderRegex)

      if (parsed) {
        this.append({
          header: parsed[2],
          level: parsed[1]
        })
      }

      this.last.append(line)
    }

    return this
  }

  static async load (path) {
    const content = (await readFile(path)).toString()

    return new Markdown().parse(content)
  }
}

export default Markdown
