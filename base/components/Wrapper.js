import React, { Component } from 'react'

import Markdown from 'components/Markdown'
import Page from 'components/Page'

class Wrapper extends Component {
  componentReceiveProps() {
    if (this.props.onUpdate) {
      this.props.onUpdate()
    }
  }

  render() {
    const { markdown } = this.props
    const Comp = markdown ? Markdown : Page

    return (
      <div className="fg">
        <div className="f container page">
          <Comp {...this.props} />
        </div>
      </div>
    )
  }
}

export default Wrapper
