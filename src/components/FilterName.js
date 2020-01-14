import React, { Component } from 'react';
import axios from 'axios';

class FilterName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: this.props.filterByNameVal,
      isEmpty: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameValue() {
    this.props.updateFilterByName(this.state.country);
  }

  handleChange(e) {
    this.setState({ country: e.target.value, isEmpty: false }, this.handleNameValue);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.country === '') {
      this.setState({ isEmpty: true });
    } else {
      const country = this.state.country;
      const endpointURL = `https://restcountries.eu/rest/v2/name/${country}`;
      axios.get(endpointURL)
      .then(response => {
        this.props.handleLoading(true);
        const countries = response.data;
        setTimeout(() => {
          this.props.handleUpdateCountryList(countries);
          this.props.handleLoading(false);
          this.props.clickSorting(false);
        }, 1000);
      })
      .catch(error => {
        this.props.handleLoading(true);
        // pass an empty array in case the country is not found -> error status code 404
        setTimeout(() => {
          this.props.handleUpdateCountryList([]);
          this.props.handleLoading(false);
          this.props.clickSorting(false);
        }, 2000);
        console.log(error);
      });
    }
  }

  render() {
    return (
      <div className='FilterName col-md-10 col-lg-8 col-xl-7 mx-auto'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-row mb-4'>
            <div className='col-12 col-md-9'>
              <input 
                className={`form-control form-control-lg ${this.state.isEmpty && 'empty'}`} 
                type='text' 
                name='country' 
                placeholder='Search by country name...'
                onChange={this.handleChange}
                value={this.state.country}>
              </input>
              <div className={`empty-form ${this.state.isEmpty && 'show'}`}>Please provide a country name.</div>
            </div> 
            <div className='col-12 col-md-3'>
              <button type="submit" className="btn btn-block btn-lg btn-primary">Search</button> 
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FilterName;