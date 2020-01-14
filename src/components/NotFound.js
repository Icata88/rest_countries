import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
  }

  componentDidMount() {
    window.scrollTo({ top: this.myRef.current.offsetTop, behavior: 'smooth' });
  }

  render() {
    return (
      <div className='NotFound row mb-5' ref={this.myRef}>
        <div className='text-center col'>No countries found based on your search</div>
      </div>
    );
  }
}

export default NotFound;