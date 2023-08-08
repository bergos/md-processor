class Block {
  constructor ({ header = null, level = 0, lines = [] } = {}) {
    this.header = header
    this.level = level
    this.lines = lines
  }

  append (line) {
    this.lines.push(line)
  }

  changeLevel (depth) {
    return new Block({
      header: this.header,
      level: this.level + depth,
      lines: this.lines
    })
  }

  toString () {
    let headerLine = ''

    if (this.level > 0) {
      headerLine = `${'#'.repeat(this.level)} ${this.header}\n`
    }

    return `${headerLine}${this.lines.join('\n')}`
  }
}

export default Block
