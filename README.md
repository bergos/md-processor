# md-processor

[![build status](https://img.shields.io/github/actions/workflow/status/bergos/md-processor/test.yaml?branch=master)](https://github.com/bergos/md-processor/actions/workflows/test.yaml)
[![npm version](https://img.shields.io/npm/v/md-processor.svg)](https://www.npmjs.com/package/md-processor)

A preprocessor for markdown files.

## Usage

You can run `md-processor` with `npx` like shown below: 

```bash
nxp md-processor input.md > output.md
```

## Features

### Imports

Sections of other markdown files can be imported like this:

```markdown
@[import{section,deep,depth=x}](filename)
```

- `section`: The full header of the section to import.
- `deep`: If given, the nested blocks will be imported.
- `depth`: Change the level of the headers by adding `x`.
  `x` can be positive or negative.
- `filename`: The path to the markdown file to import.
  The path is relative to the input file.
