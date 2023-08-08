function blocksToContent (blocks) {
  return blocks.map(block => {
    let headerLine = ''

    if (block.level > 0) {
      headerLine = `${'#'.repeat(block.level)} ${block.header}\n`
    }

    return `${headerLine}${block.lines.join('\n')}`
  }).join('\n')
}

const multiBlock = (() => {
  const blocks = [{
    header: 'Header 1',
    level: 1,
    lines: [
      'First line of the body of header 1',
      'Second line of the body of header 1'
    ]
  }, {
    header: 'Header 1.1',
    level: 2,
    lines: [
      'First line of the body of header 1.1',
      'Second line of the body of header 1.1'
    ]
  }]

  return {
    blocks,
    content: blocksToContent(blocks)
  }
})()

const multiImports = (() => {
  const blocks = [
    ...multiBlock.blocks,
    {
      header: 'Header 2',
      level: 1,
      lines: [
        'First line of the body of header 2',
        'Second line of the body of header 2'
      ]
    }, {
      header: 'Header 2.1',
      level: 2,
      lines: [
        'First line of the body of header 2.1',
        'Second line of the body of header 2.1'
      ]
    }]

  return {
    blocks,
    content: blocksToContent(blocks)
  }
})()

const importDeep = multiImports

const importDeepChangeMinus = (() => {
  const blocks = [
    {
      level: 0,
      lines: [
        'First line of the body of header 1',
        'Second line of the body of header 1'
      ]
    }, {
      header: 'Header 1.1',
      level: 1,
      lines: [
        'First line of the body of header 1.1',
        'Second line of the body of header 1.1'
      ]
    },
    importDeep.blocks[2],
    importDeep.blocks[3]
  ]

  return {
    blocks,
    content: blocksToContent(blocks)
  }
})()

const importDeepChangePlus = (() => {
  const blocks = [
    {
      header: 'Header 1',
      level: 3,
      lines: [
        'First line of the body of header 1',
        'Second line of the body of header 1'
      ]
    }, {
      header: 'Header 1.1',
      level: 4,
      lines: [
        'First line of the body of header 1.1',
        'Second line of the body of header 1.1'
      ]
    },
    importDeep.blocks[2],
    importDeep.blocks[3]
  ]

  return {
    blocks,
    content: blocksToContent(blocks)
  }
})()

export {
  importDeep,
  importDeepChangeMinus,
  importDeepChangePlus,
  multiBlock,
  multiImports
}
