const { existsSync, lstatSync, readdirSync, readFileSync } = require('fs')
const { basename, extname, join, normalize, relative } = require('path')
const { camel, sentence } = require('to-case')
const slug = require('slug')

const defaultDocumentationPath = '/documentation'

function listDocs(docsSrcPath) {
  const queue = readdirSync(docsSrcPath).map(fileName => ({
    fileName,
    path: []
  }))
  const docs = []
  while (queue.length) {
    const { fileName, path } = queue.pop()
    const fullPath = normalize(
      [docsSrcPath]
        .concat(path)
        .concat(fileName)
        .join('/')
    )

    if (lstatSync(fullPath).isDirectory() === false) {
      if (extname(fileName) === '.md') {
        const docBaseNameFromFileName = basename(fileName, '.md')
        const docContents = readFileSync(fullPath, 'UTF-8')
        const docFirstLine = docContents && docContents.split('\n')[0]
        const docTitleFromContent =
          docFirstLine.startsWith('#') && docFirstLine.replace(/^#+\s*/, '')

        const docBaseName = docTitleFromContent || docBaseNameFromFileName

        const componentName = `_${camel(path.concat(docBaseName).join('-'))}`

        docs.push({
          docBaseName,
          fileName,
          componentName,
          fullPath,
          path
        })
      }
      // ignore non .md files
    } else {
      const newPath = path.concat(fileName)
      const newFullPath = [docsSrcPath].concat(newPath).join('/')
      readdirSync(newFullPath).forEach(f => {
        queue.push({ fileName: f, path: newPath })
      })
    }
  }
  return docs
}

function buildMdRoutes(docs, docsSrcPath, websitePath) {
  const fileLocationBase = normalize(join(websitePath, docsSrcPath))
  const componentPathBase = relative(join(websitePath, '/src'), fileLocationBase)

  const result = {
    name: 'Documentation',
    path: defaultDocumentationPath,
    data: []
  }

  const output = []
  docs
    .sort((a, b) => (a.fullPath > b.fullPath ? 1 : -1))
    .forEach(({ docBaseName, fileName, componentName, path }) => {
      const componentPath = normalize(join(componentPathBase, path.join('/'), fileName))
      const imp = `import ${componentName} from '${componentPath}'`
      output.push(imp)

      const pathSuffix = path
      let destination = result.data
      let currentPath = '/docs'

      pathSuffix.forEach(p => {
        const size = destination.length
        currentPath = `${currentPath}/${p}`

        const name = existsSync(`src/${currentPath}/TITLE`)
          ? readFileSync(`src/${currentPath}/TITLE`, 'UTF-8')
          : sentence(p)

        let nextLevelIdx = destination.findIndex(d => d.fullPath === currentPath)
        if (nextLevelIdx === -1) {
          destination.push({
            name,
            path: p,
            fullPath: currentPath,
            children: []
          })
          nextLevelIdx = size
        }
        destination = destination[nextLevelIdx].children
      })

      destination.push({
        fileLocation: normalize(join(fileLocationBase, path.join('/'), fileName)),
        name: sentence(docBaseName),
        markdown: componentName
      })
    })

  const stringifiedResult = JSON.stringify(result, null, 2)
    .replace(/ *"fullPath".*\n/g, '')
    .replace(/("(children|data|fileLocation|name|path)")/g, '$2')
    .replace(/"markdown": "([^"]+)"/g, 'markdown: $1')

  output.push('')
  output.push(`export default [${stringifiedResult}];`)
  output.push('')

  return output.join('\n')
}

function entry(base, path, priority) {
  return ['  <url>', `    <loc>${base}/?p=/#${path}</loc>`]
    .concat(priority ? [`    <priority>${priority}</priority>`] : [])
    .concat(['  </url>'])
}

function buildSitemap(base, docs) {
  const sitemapStub = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ].concat(entry(base, '/', 1))

  const output = docs
    .reduce((prev, curr) => {
      const path = [defaultDocumentationPath]
        .concat(curr.path)
        .concat(slug(curr.docBaseName, { lower: true }))
        .join('/')
      return prev.concat(entry(base, path))
    }, sitemapStub)
    .concat(['</urlset>'])

  return output.join('\n')
}

module.exports = {
  buildMdRoutes,
  buildSitemap,
  listDocs
}
