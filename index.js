import Processor from './lib/Processor.js'

async function main () {
  const processor = new Processor()

  console.log(await processor.process('../../rdf-ext/rdf-ext.org/template/index.md'))
}

main()
