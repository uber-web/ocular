// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { Component } from 'react'
import Prism from 'prismjs'
import cx from 'classnames'
import marked from 'marked'
import fetch from 'fetch'

import Navigation from './Navigation'
import { linkRenderer } from '../utils/markdown-rendering-utils'

import demos from 'demos'
import { PROJECT_TYPE, PROJECT_URL } from 'config'
// Shim Prism to add JSX support
import 'prismjs/components/prism-jsx'

import 'prismjs/themes/prism.css'

marked.setOptions({
  highlight: (code, language = 'markup') =>
    Prism.highlight(code, Prism.languages[language === 'js' ? 'jsx' : language])
})

const INJECTION_REG = /<!-- INJECT:"([^\[<]+)\"( heading| fullscreen)? -->/g

const renderer = new marked.Renderer()
const textRenderer = new marked.Renderer()

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

const renderMd = (content, textOnly, path, fileLocation) => {
  renderer.link = linkRenderer(path, fileLocation)
  return marked(content, { renderer: textOnly ? textRenderer : renderer }).replace(
    /\/demo\/src\/static\/images/g,
    'images'
  )
}

const tags = { inline: true, heading: true, fullscreen: true }

const fetchMarkdown = async url => {
  const r = await fetch(url)
  return r.text()
}

const makeEditMeLink = fileLocation => {
  if (!fileLocation || PROJECT_TYPE !== 'github') {
    return ''
  }
  const href = `${PROJECT_URL}/edit/master/${fileLocation}`
    .replace(/(\/+)/g, '/')
    .replace(/^https:\//, 'https://')
  return `<div class="edit-me">
      <a href="${href}">Edit me on GitHub</a>
    </div>`
}

class Markdown extends Component {
  static defaultProps = {
    markdown: '',
    textOnly: false
  }

  constructor(props) {
    super(props)

    this.state = {
      markdown: props.markdown
    }
  }

  componentDidMount() {
    const { markdownUrl } = this.props
    this.scrollTop()
    if (markdownUrl) {
      fetchMarkdown(markdownUrl).then(markdown => this.setState({ markdown }))
    }
  }

  componentDidUpdate() {
    this.scrollTop()
  }

  scrollTop = () => {
    window.scrollTo(0, 0)
  }

  render() {
    const { fileLocation, path, textOnly } = this.props
    const { markdown } = this.state
    const edit = makeEditMeLink(fileLocation)
    const html = `${edit}${renderMd(markdown, textOnly, path, fileLocation)}`

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
          />
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
            demo: tag === 'heading'
          })}
        >
          <Demo />
        </div>
      )
    }, [])

    // output of the component: markdown of the page transcribed to HTML,
    // with components if needed, and prev/next page buttons at the bottom

    return (
      <div className={cx('fg', { markdown: !textOnly })}>
        {out}
        <Navigation next={this.props.next} prev={this.props.prev} />
      </div>
    )
  }
}

export default Markdown
