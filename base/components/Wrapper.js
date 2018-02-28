import React, { Component } from 'react'

import Markdown from 'components/Markdown'

class Wrapper extends Component {
  componentWillMount() {
    if (this.props.onUpdate) {
      this.props.onUpdate()
    }
  }

  componentWillReceiveProps() {
    if (this.props.onUpdate) {
      this.props.onUpdate()
    }
  }

  render() {
    const { markdown, markdownUrl, component } = this.props
    const Comp = markdown || markdownUrl ? Markdown : component

    return (
      <div className="f fg">
        <div className="f fg container page">
          <Comp {...this.props} />
        </div>
      </div>
    )
  }
}

export default Wrapper
