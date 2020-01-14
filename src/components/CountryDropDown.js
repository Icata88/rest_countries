import React, { Component } from 'react';

class CountryDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: props.selectedCountry
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ country: e.target.value }, this.handleSelectedCountry);
  }

  handleSelectedCountry() {
    this.props.updateSelectedCountry(this.state.country);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedRegion !== this.props.selectedRegion) {
      this.setState({ country: 'default' }, this.handleSelectedCountry);
    }
  }

  render() {
    const countries = this.props.countries.map((country, index) => (
      <option key={index} value={country}>{country}</option>
    ));
    return (
      <div className='CountryDropDown col-12 col-md-5 col-sm-5 mb-3'>
        <select 
          onChange={this.handleChange} 
          value={this.state.country} 
          className='custom-select custom-select-lg'>
          <option value='default'>Select a country...</option>
          {countries}
        </select> 
      </div>
    );
  }
}

export default CountryDropDown;