import React, { Component } from 'react';
import '../styles/Loader.scss';

class Loader extends Component {
  render() {
    return (
    <div className={`loader ${this.props.loading === true ? 'show' : ''}`}>
      <div className='spinner'>
        <div className='double_bounce1' />
        <div className='double_bounce2' />
      </div>
      <h1>Loading...</h1>
    </div>
    );
  }
}

export default Loader;