import React, { Component } from 'react'
import Prism from 'prismjs'
import cx from 'classnames'
import marked from 'marked'

import routes from 'routes'
import demos from 'demos'
import { HISTORY } from 'config'

// Shim Prism to add JSX support
import 'prismjs/components/prism-jsx'

import 'prismjs/themes/prism.css'

marked.setOptions({
  highlight: (code, language = 'markup') =>
    Prism.highlight(code, Prism.languages[language === 'js' ? 'jsx' : language]),
})

const INJECTION_REG = /<!-- INJECT:"(.+)\"( heading| fullscreen)? -->/g

const renderer = new marked.Renderer()
const textRenderer = new marked.Renderer()

renderer.link = (href, title, text) => {
  const fallback = `<a href=${href}>${text}</a>`
  const isFull = /^(https?:\/\/)/.test(href)
  const match = href.match(/.*\/(.*)(\.md)?$/)
  if (isFull || !match) {
    return fallback
  }

  const route = routes.find(r => r.path.includes(match[1].replace(/\.md$/, '')))
  if (!route) {
    return fallback
  }

  const addPrefix = HISTORY !== 'browser' && route.path.indexOf('/#') !== 0
  return `<a useHistory href="${addPrefix ? '/#' : ''}${route.path}">${text}</a>`
}

textRenderer.heading = () => ''
textRenderer.code = () => ''
textRenderer.list = () => ''
textRenderer.listitem = () => ''
textRenderer.link = (href, title, text) => {
  if (text.toLowerCase().includes('view code')) {
    return ''
  }
  return renderer.link(href, title, text)
}

const renderMd = (content, textOnly) =>
  marked(content, { renderer: textOnly ? textRenderer : renderer }).replace(
    /\/demo\/src\/static\/images/g,
    'images',
  )

const tags = { inline: true, heading: true, fullscreen: true }

class Markdown extends Component {
  static defaultProps = {
    markdown: '',
    textOnly: false,
  }

  componentDidMount() {
    this.scrollTop()
  }

  componentDidUpdate() {
    this.scrollTop()
  }

  scrollTop = () => {
    window.scrollTo(0, 0)
  }

  render() {
    const { textOnly, markdown } = this.props
    const html = renderMd(markdown, textOnly)

    const splits = html.split(INJECTION_REG)

    const out = splits.reduce((o, cur, i) => {
      const isTag = !cur || tags[cur.trim()]
      if (isTag) {
        return o
      }

      const Demo = demos[cur]

      if (textOnly && Demo) {
        return o
      }
      if (!Demo) {
        /* eslint-disable react/no-danger */
        return o.concat(
          <div
            key={i}
            className={cx({ 'p2 markdown-body container': !textOnly })}
            dangerouslySetInnerHTML={{ __html: cur }}
          />,
        )
        /* eslint-enable react/no-danger */
      }

      const next = !splits[i + 1] ? 'inline' : (splits[i + 1] || '').trim()
      const tag = next && tags[next] && next

      return o.concat(
        <div
          key={i}
          className={cx({
            'inline-code container': tag === 'inline',
            fullscreen: tag === 'fullscreen',
            demo: tag === 'heading',
          })}
        >
          <Demo />
        </div>,
      )
    }, [])

    return <div className={cx('fg', { markdown: !textOnly })}>{out}</div>
  }
}

export default Markdown
