import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import Markdown from './Markdown.js'

const parseImportRegex = /@\[import{([^}]*)}]\(([^)]*)\)/g

class Processor {
  constructor ({ path } = {}) {
    this.path = path || process.cwd()
  }

  async process (path) {
    path = resolve(this.path, path)

    let content = (await readFile(path)).toString()

    content = await this.processImports({ content, path })

    return content
  }

  async processImports ({ content, path }) {
    const imports = new Map()

    for (const [text, header, importPath] of [...content.matchAll(parseImportRegex)]) {
      imports.set(text, { header, importPath })
    }

    for (const [text, { header, importPath }] of imports) {
      const resolved = resolve(dirname(path), importPath)
      const markdown = await Markdown.load(resolved)

      content = content.replaceAll(text, markdown.get(header))
    }

    return content
  }
}

export default Processor
