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

    for (const [text, args, importPath] of [...content.matchAll(parseImportRegex)]) {
      const [header, ...others] = args.split(',')
      const deep = others.includes('deep')
      const depth = others
        .filter(other => other.startsWith('depth='))
        .map(raw => parseInt(raw.split('=')[1]))[0]

      imports.set(text, { deep, depth, header, importPath })
    }

    for (const [text, { deep, depth = 0, header, importPath }] of imports) {
      const resolved = resolve(dirname(path), importPath)
      const markdown = await Markdown.load(resolved)

      let imported

      if (deep) {
        imported = markdown.getAll(header)
          .map(block => block.changeLevel(depth).toString())
          .join('\n')
      } else {
        imported = markdown.get(header)
      }

      content = content.replaceAll(text, imported)
    }

    return content
  }
}

export default Processor
