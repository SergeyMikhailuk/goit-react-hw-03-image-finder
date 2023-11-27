import { Component } from 'react';
import { Audio } from 'react-loader-spinner';

class Loader extends Component<{}, {}> {
  render() {
    return (
      <div className={'LoaderWrapper'}>
        <Audio height="80" width="80" color="green" ariaLabel="three-dots-loading" />
      </div>
    );
  }
}

export default Loader;
