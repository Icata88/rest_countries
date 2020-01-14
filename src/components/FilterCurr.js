import React, { Component } from 'react';
import axios from 'axios';

class FilterCurr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.filterByCurrVal,
      isEmpty: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCurrValue() {
    this.props.updateFilterByCurr(this.state.selectedValue);
  }

  handleChange(e) {
    this.setState({ selectedValue: e.target.value, isEmpty: false }, this.handleCurrValue);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.selectedValue !== 'default') {
      const code = this.state.selectedValue;
      const endpointURL = `https://restcountries.eu/rest/v2/currency/${code}`;
      axios.get(endpointURL)
      .then(response => {
        this.props.handleLoading(true);
        const countries = response.data;
        setTimeout(() => {
          this.props.handleUpdateCountryList(countries);
          this.props.handleLoading(false);
          this.props.clickSorting(false);
        }, 2000);
      })
      .catch(error => {
        this.props.handleLoading(true);
        // pass an empty array in case the country is not found -> error status code 404
        setTimeout(() => {
          this.props.handleUpdateCountryList([]);
          this.props.handleLoading(false);
          this.props.clickSorting(false);
        }, 1000);
        console.log(error);
      });
    } else {
      this.setState({ isEmpty: true });
    }
  }

  render() {
    const currencies = this.props.currencies.map(curr => (
      <option key={curr.code} value={curr.code}>{`${curr.name} (${curr.symbol !== null ? curr.symbol : curr.code })`}</option>
    )
 );

    return (
      <div className='FilterCurr col-md-10 col-lg-8 col-xl-7 mx-auto'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-row mb-4'>
            <div className='col-12 col-md-9'>
              <select 
                onChange={this.handleChange} 
                value={this.state.selectedValue} 
                className={`custom-select custom-select-lg ${this.state.isEmpty && 'empty'}`}>
                <option value='default'>Filter by currency...</option>
                {currencies}
              </select> 
              <div className={`empty-form ${this.state.isEmpty && 'show'}`}>Please select a currency.</div>
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

export default FilterCurr;