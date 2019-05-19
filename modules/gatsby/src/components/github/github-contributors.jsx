import React, {Component} from 'react';

// Github api has rate-limits. We want to cache the response
// as much as we can. This component gets re-mounted multiple times.
let cachedResponse = null;

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
    const contributors = response || [];
    return contributors.map(contributor =>
      contributor ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={contributor.html_url}
          className="Contributor"
          key={contributor.id}
        >
          <img src={contributor.avatar_url} width="100%" alt="" />
          <span>{contributor.login}</span>
        </a>
      ) : null
    );
  }
}
