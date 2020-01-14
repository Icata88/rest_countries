import React, { Component } from 'react';
import Country from './Country';


class CountryList extends Component {
  render() {
    const countries = this.props.countries.map((res, index) => (
      <Country key={res.numericCode} index={index} name={res.name} flag={res.flag} />
    ));
    return (
      <div className='CountryList mb-5'>
        {countries}
      </div>
    );
  }
}

export default CountryList;