import React, {Component} from 'react';
import styled from 'styled-components';



// Github api has rate-limits. We want to cache the response
// as much as we can. This component gets re-mounted multiple times.
let cachedResponse = null;

const ContribLink = styled.a`
  margin: 10px;
`;

const ContribDiv = styled.div`
  width: 8rem;
  height: 10rem;
`;

const ContribImage = styled.img`
  border-radius: 50%;
  border: 4px solid #17b8be;
  box-shadow: 0 0 0 #17b8be;
  transition: border 0.5s, box-shadow 0.5s;
  opacity: 0.9;

  &:hover {
    border: 4px solid #fff;
    box-shadow: 0 0 20px #17b8be;
    opacity: 1;
  }
`;

const ContribName = styled.div`
  width: 8rem;
  text-align: center;
`;

export default class GithubContributors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: cachedResponse
    };
  }

  componentDidMount() {
    if (cachedResponse) {
      return;
    }

    const {project} = this.props;
    fetch(`https://api.github.com/repos/${project}/contributors`)
      .then(response => response.json())
      .then(response => {
        cachedResponse = response;
        this.setState({response});
      });
  }

  render() {
    const {response} = this.state;
    const contributors = Array.isArray(response) ? response : [];
    return contributors.map(contributor =>
      contributor ? (
        <ContribLink
          target="_blank"
          rel="noopener noreferrer"
          href={contributor.html_url}
          key={contributor.id}
        >
          <ContribDiv>
            <ContribImage src={contributor.avatar_url} width="100%" alt="" />
            <ContribName>{contributor.login}</ContribName>
          </ContribDiv>
        </ContribLink>
      ) : null
    );
  }
}
