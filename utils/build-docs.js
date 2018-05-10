const { lstatSync, readdirSync, readFileSync } = require('fs')
const { basename, extname } = require('path')
const { camel, sentence } = require('to-case')

function listDocs(DIR_PATH) {
  const pathString = `${DIR_PATH}/src/docs/`
  const queue = readdirSync(`${pathString}`).map(fileName => ({
    fileName,
    path: ['src', 'docs']
  }))
  const docs = []
  while (queue.length) {
    const { fileName, path } = queue.pop()
    const fullPath = [DIR_PATH]
      .concat(path)
      .concat(fileName)
      .join('/')

    const componentPath = path
      .slice(1)
      .concat(fileName)
      .join('/')

    if (lstatSync(fullPath).isDirectory() === false) {
      if (extname(fileName) === '.md') {
        const docBaseNameFromFileName = basename(fileName, '.md')
        const docContents = readFileSync(fullPath, 'UTF-8')
        const docFirstLine = docContents && docContents.split('\n')[0]
        const docTitleFromContent =
          docFirstLine.startsWith('#') && docFirstLine.replace(/^#+\s*/, '')

        const docBaseName = docTitleFromContent || docBaseNameFromFileName

        const componentName = camel(
          path
            .slice(2)
            .concat(docBaseName)
            .join('-')
        )

        docs.push({
          docBaseName,
          fileName,
          componentPath,
          componentName,
          fullPath,
          path
        })
      }
      // ignore non .md files
    } else {
      const newPath = path.concat(fileName)
      const newFullPath = [DIR_PATH].concat(newPath).join('/')
      readdirSync(newFullPath).forEach(f => {
        queue.push({ fileName: f, path: newPath })
      })
    }
  }
  return docs
}

function buildMdRoutes(docs) {
  const result = {
    name: 'Documentation',
    path: '/docs',
    data: []
  }
  const output = []
  docs
    .sort((a, b) => (a.fullPath > b.fullPath ? 1 : -1))
    .forEach(({ docBaseName, fileName, componentName, componentPath, path }) => {
      const imp = `import ${componentName} from '${componentPath}'\n`
      output.push(imp)

      const pathSuffix = path.slice(2)
      let destination = result.data
      let currentPath = '/docs'

      pathSuffix.forEach(p => {
        const size = destination.length
        const pathInSentenceCase = sentence(p)
        currentPath = `${currentPath}/${p}`
        let nextLevelIdx = destination.findIndex(d => d.name === pathInSentenceCase)
        if (nextLevelIdx === -1) {
          destination.push({
            name: pathInSentenceCase,
            path: currentPath,
            children: []
          })
          nextLevelIdx = size
        }
        destination = destination[nextLevelIdx].children
      })

      destination.push({
        fileLocation: `/src${currentPath}/${fileName}`,
        name: sentence(docBaseName),
        markdown: componentName
      })
    })

  const stringifiedResult = JSON.stringify(result, null, 2)
    .replace(/("(children|data|fileLocation|name|path)")/g, '$2')
    .replace(/"markdown": "([^"]+)"/g, 'markdown: $1')

  output.push('')
  output.push(`export default [${stringifiedResult}];`)
  output.push('')

  return output.join('\n')
}

module.exports = {
  buildMdRoutes,
  listDocs
}
