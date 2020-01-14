import React, { Component } from 'react';
import axios from 'axios';

class FilterLang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.filterByLangVal,
      isEmpty: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLangValue() {
    this.props.updateFilterByLang(this.state.selectedValue);
  }

  handleChange(e) {
    this.setState({ selectedValue: e.target.value, isEmpty: false }, this.handleLangValue);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.selectedValue !== 'default') {
      const code = this.state.selectedValue;
      const endpointURL = `https://restcountries.eu/rest/v2/lang/${code}`;
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
    } else {
      this.setState({ isEmpty: true });
    }
  }

  render() {
    const languages = this.props.languages.map(lang => (
      <option key={lang.code} value={lang.code}>{`${lang.code} (${lang.name})`}</option>
    ));

    return (
      <div className='FilterLang col-md-10 col-lg-8 col-xl-7 mx-auto'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-row mb-4'>
            <div className='col-12 col-md-9'>
              <select 
                onChange={this.handleChange} 
                value={this.state.selectedValue} 
                className={`custom-select custom-select-lg ${this.state.isEmpty && 'empty'}`}>
                <option value='default'>Filter by language...</option>
                {languages}
              </select> 
              <div className={`empty-form ${this.state.isEmpty && 'show'}`}>Please select a language.</div>
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

export default FilterLang;