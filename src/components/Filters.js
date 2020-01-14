import React, { Component } from 'react';
import FilterName from './FilterName';
import FilterLang from './FilterLang';
import FilterCurr from './FilterCurr';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.handleLoading = this.handleLoading.bind(this);
    this.handleUpdateCountryList = this.handleUpdateCountryList.bind(this);
  }

  handleLanguages() {
    return this.props.allCountries.map(country => country.languages)
    .reduce((acc, curr) => acc.concat(curr), [])
    .map(code => code)
    .reduce((accumulator, currentValue) => {
      const lcode = currentValue.iso639_1 ? currentValue.iso639_1 : currentValue.iso639_2;
      const codeObj = {
        code: lcode,
        name: currentValue.name
      }
      if (accumulator.findIndex(obj => obj.code === lcode) === -1 ) {
        accumulator.push(codeObj);
      }

      return accumulator;
    }, []);
  }

  handleCurrencies() {
    return this.props.allCountries.map(country => country.currencies)
    .reduce((acc, curr) => acc.concat(curr), [])
    .map(code => code)
    .reduce((accumulator, currentValue) => {
      if (accumulator.findIndex(obj => obj.code === currentValue.code) === -1 && 
      currentValue.code !== null && 
      currentValue.code !== '(none)' ) {
        accumulator.push(currentValue);
      }

      return accumulator;
    }, []);
  }

  handleUpdateCountryList(countries) {
    this.props.updateCountryList(countries);
  }

  handleLoading(isLoading) {
    this.props.loading(isLoading);
  }

  render() {
    const languages = this.handleLanguages();
    const currencies = this.handleCurrencies();
    return (
      <div className='Filters'>
        <FilterName 
          handleUpdateCountryList={this.handleUpdateCountryList} 
          clickSorting={this.props.clickSorting}
          filterByNameVal={this.props.filterByNameVal}
          updateFilterByName={this.props.updateFilterByName}
          handleLoading={this.handleLoading} />
        <FilterLang
          languages={languages}
          handleUpdateCountryList={this.handleUpdateCountryList}
          filterByLangVal={this.props.filterByLangVal}
          updateFilterByLang={this.props.updateFilterByLang}
          clickSorting={this.props.clickSorting}
          handleLoading={this.handleLoading} />
        <FilterCurr
          currencies={currencies}
          handleUpdateCountryList={this.handleUpdateCountryList}
          updateFilterByCurr={this.props.updateFilterByCurr}
          filterByCurrVal={this.props.filterByCurrVal}
          clickSorting={this.props.clickSorting}
          handleLoading={this.handleLoading} />
      </div>
    );
  }
}

export default Filters;