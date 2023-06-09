#!/usr/bin/env node

import { Command } from 'commander'
import Processor from '../lib/Processor.js'

const program = new Command()

program
  .argument('<input>', 'markdown to process')
  .action(async input => {
    const processor = new Processor()
    const result = await processor.process(input)

    process.stdout.write(result)
  })

program.parse(process.argv)
