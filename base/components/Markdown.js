import React, {Component} from 'react';
import {highlightAuto} from 'highlight.js';
import cx from 'classnames';
import marked from 'marked';

import demos from 'demos';

marked.setOptions({
  highlight: code => highlightAuto(code).value,
});

const INJECTION_REG = /<!-- INJECT:"(.+)\"( heading| fullscreen)? -->/g;

const renderer = new marked.Renderer();

const renderMd = content =>
  marked(content, {renderer}).replace(/\/demo\/src\/static\/images/g, 'images');

const tags = {inline: true, heading: true, fullscreen: true};

class Markdown extends Component {

  static defaultProps = {
    markdown: '',
  }

  componentDidMount() {
    this.scrollTop();
  }

  componentDidUpdate() {
    this.scrollTop();
  }

  scrollTop = () => {
    window.scrollTo(0, 0);
  }

  render() {
    const html = renderMd(this.props.markdown);

    const splits = html.split(INJECTION_REG);

    const out = splits
      .reduce((o, cur, i) => {
        const isTag = !cur || tags[cur.trim()];
        if (isTag) { return o; }

        const Demo = demos[cur];
        if (!Demo) {
          /* eslint-disable react/no-danger */
          return o.concat(
            <div
              key={i}
              className="markdown-body container p2"
              dangerouslySetInnerHTML={{__html: cur}}
            />
          );
          /* eslint-enable react/no-danger */
        }

        const next = !splits[i + 1] ? 'inline' : (splits[i + 1] || '').trim();
        const tag = next && tags[next] && next;

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
          </div>
        );

      }, []);

    return (
      <div className="fg markdown">

        {out}

      </div>
    );
  }

}

export default Markdown;
