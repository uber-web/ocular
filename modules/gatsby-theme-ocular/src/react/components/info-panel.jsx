import React, {PureComponent} from 'react';
import {
  PanelContainer,
  PanelContent,
  PanelTitle,
  SourceLink
} from '../styled/example';

export default class InfoPanel extends PureComponent {
  render() {
    const { title, children, sourceLink} = this.props;

    return (
      <PanelContainer>
        <PanelTitle>{title}</PanelTitle>
        <PanelContent>{children}</PanelContent>
        <SourceLink href={sourceLink} target="_new" >
          View Code ↗
        </SourceLink>
      </PanelContainer>
    );
  }
}
