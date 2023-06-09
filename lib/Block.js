class Block {
  constructor ({ header = null, level = 0 } = {}) {
    this.header = header
    this.level = level
    this.lines = []
  }

  append (line) {
    this.lines.push(line)
  }

  toString () {
    return this.lines.join('\n')
  }
}

export default Block
