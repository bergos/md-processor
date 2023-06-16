const multiBlock = (() => {
  const blocks = [{
    header: 'Header 1',
    level: 1,
    lines: [
      '# Header 1',
      'First line of the body of header 1',
      'Second line of the body of header 1'
    ]
  }, {
    header: 'Header 1.1',
    level: 2,
    lines: [
      '## Header 1.1',
      'First line of the body of header 1.1',
      'Second line of the body of header 1.1'
    ]
  }]

  return {
    blocks,
    content: [
      blocks[0].lines.join('\n'),
      blocks[1].lines.join('\n')
    ].join('\n')
  }
})()

const multiImports = (() => {
  const blocks = [
    ...multiBlock.blocks,
    {
      header: 'Header 2',
      level: 1,
      lines: [
        '# Header 2',
        'First line of the body of header 2',
        'Second line of the body of header 2'
      ]
    }, {
      header: 'Header 2.1',
      level: 2,
      lines: [
        '## Header 2.1',
        'First line of the body of header 2.1',
        'Second line of the body of header 2.1'
      ]
    }]

  return {
    blocks,
    content: [
      blocks[0].lines.join('\n'),
      blocks[1].lines.join('\n'),
      blocks[2].lines.join('\n'),
      blocks[3].lines.join('\n')
    ].join('\n')
  }
})()

const importDeep = multiImports

export {
  importDeep,
  multiBlock,
  multiImports
}
