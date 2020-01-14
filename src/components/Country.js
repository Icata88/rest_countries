import React, { Component } from 'react';
import '../styles/Country.scss';
import { Link } from 'react-router-dom';

class Country extends Component {
  render() {
    const { name, flag, index } = this.props;
    const countryName = name.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className='Country row text-center text-sm-left'>
        <div className='col-md-1 col-sm-1 d-none d-sm-block'><Link to={`/countries/${countryName}`}>{index+1}</Link></div>
        <div className='col-md-6 col-sm-6'><Link to={`/countries/${countryName}`}><img className='Country-img img-fluid' alt={name} src={flag}></img></Link></div>
        <div className='col-md-5 col-sm-5'><Link to={`/countries/${countryName}`}>{name}</Link></div>
      </div>
    );
  }
}

export default Country;