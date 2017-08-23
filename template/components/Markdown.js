import React, {Component} from 'react';
import {highlightAuto} from 'highlight.js';
import marked from 'marked';

marked.setOptions({
  highlight: code => highlightAuto(code).value,
});

const INJECTION_REG = /<!-- INJECT:"(.+)\" -->/g;

const renderer = new marked.Renderer();

const renderMd = content =>
  marked(content, {renderer}).replace(/\/demo\/src\/static\/images/g, 'images');

class Markdown extends Component {

  static defaultProps = {
    markdown: '',
  }

  render() {
    const html = renderMd(this.props.markdown);

    /* eslint-disable react/no-danger */
    return (
      <div className="markdown">
        {html.split(INJECTION_REG).map((__html, index) => {
          if (!html) { return null; }
          return (
            <div key={index} className="markdown-body" dangerouslySetInnerHTML={{__html}} />
          );
        })}
      </div>
    );
    /* eslint-enable react/no-danger */
  }

}

export default Markdown;
