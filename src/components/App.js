import React, { Component } from 'react';
import Main from './Main';
import CountryDetails from './CountryDetails';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCountries: [],
      filteredCountries: [],
      sortedCountries: [],
      regions: [],
      countriesDropDown: [],
      selectedRegion: 'default',
      selectedCountry: 'default',
      noCountriesFound: false,
      isLoading: false,
      clickedSorting: false,
      sortType: 'asc',
      filterByNameVal: '',
      filterByCurrVal: 'default',
      filterByLangVal: 'default',
      countriesToChart: []
    }
    this.updateCountryList = this.updateCountryList.bind(this);
    this.loading = this.loading.bind(this);
    this.updateSelectedRegion = this.updateSelectedRegion.bind(this);
    this.updateSelectedCountry = this.updateSelectedCountry.bind(this);
    this.clickSorting = this.clickSorting.bind(this);
    this.setCountriesDropDown = this.setCountriesDropDown.bind(this);
    this.updateSortedCountryList = this.updateSortedCountryList.bind(this);
    this.updateSortType = this.updateSortType.bind(this);
    this.updateFilterByName = this.updateFilterByName.bind(this);
    this.updateFilterByCurr = this.updateFilterByCurr.bind(this);
    this.updateFilterByLang = this.updateFilterByLang.bind(this);
    this.addCountryToChart = this.addCountryToChart.bind(this);
  }

  componentDidMount() {
    const endpointURL = 'https://restcountries.eu/rest/v2/all';
    axios.get(endpointURL)
    .then(response => {
      const countries = response.data;
      this.setState({ allCountries: countries });
    })
    .catch(error => console.log(error));
  }

  updateCountryList(countries) {
    if (countries.length < 1) {
      this.setState({ noCountriesFound: true });
    } else {
      this.setState({ noCountriesFound: false });
    }
    this.setState({ filteredCountries: countries });
    this.extractRegions(countries);
  }

  updateSortedCountryList(countries) {
    this.setState({ sortedCountries: countries });
  }

  extractRegions(countries) {
    const regions = countries.reduce((acc, curr) => {
      if (acc.indexOf(curr.region) === -1 && curr.region !== '') {
        acc.push(curr.region);
      }
      return acc;
    }, []);

    this.setState({ regions: regions });
  }

  loading(isLoading) {
    this.setState({ isLoading: isLoading });
  }

  updateSelectedRegion(region) {
    this.setState({ selectedRegion: region }, this.setCountriesDropDown);
  }

  updateSelectedCountry(country) {
    this.setState({ selectedCountry: country });
  }

  updateFilterByName(value) {
    this.setState({ filterByNameVal: value });
  }

  updateFilterByCurr(value) {
    this.setState({ filterByCurrVal: value });
  }

  updateFilterByLang(value) {
    this.setState({ filterByLangVal: value });
  }

  clickSorting(value) {
    this.setState({ clickedSorting: value });
  }

  updateSortType(type) {
    this.setState({ sortType: type });
  }

  setCountriesDropDown() {
    const countriesDropDown = this.state.filteredCountries.filter(country => {
      return country.region === this.state.selectedRegion;
    }).reduce((acc, curr) => {
      return [...acc, curr.name];
    }, []);
    this.setState({ countriesDropDown: countriesDropDown });
  }

  addCountryToChart(country) {
    const countryToBeAdded = this.state.filteredCountries.filter(c => c.name === country);
    if (this.state.countriesToChart.findIndex(c => c.name === countryToBeAdded[0].name) === -1) {
      this.setState({ countriesToChart: [...this.state.countriesToChart, countryToBeAdded[0]] });
    } 
  }

  getCountryDetails(props) {
    const name = props.match.params.name;
    const countries = !this.state.filteredCountries.length > 0 ? this.state.allCountries : this.state.filteredCountries;
    const currentCountry = countries.filter(country => {
      return country.name.replace(/\s+/g, '-').toLowerCase() === name.toLowerCase();
    });
    return <CountryDetails {...props} country={currentCountry} />
  }

  render() {
    return (
      <div className='App'>
        {this.state.allCountries.length > 0 ? 
        <Switch>
          <Route exact path='/' render={() => <Main 
            allCountries={this.state.allCountries}
            filteredCountries={this.state.filteredCountries}
            regions={this.state.regions}
            noCountriesFound={this.state.noCountriesFound}
            isLoading={this.state.isLoading}
            clickedSorting={this.state.clickedSorting}
            selectedCountry={this.state.selectedCountry}
            selectedRegion={this.state.selectedRegion}
            sortedCountries={this.state.sortedCountries}
            filterByNameVal={this.state.filterByNameVal}
            filterByCurrVal={this.state.filterByCurrVal}
            filterByLangVal={this.state.filterByLangVal}
            loading={this.loading}
            updateCountryList={this.updateCountryList}
            updateSelectedRegion={this.updateSelectedRegion}
            updateSelectedCountry={this.updateSelectedCountry}
            clickSorting={this.clickSorting}
            sortType={this.state.sortType}
            countriesDropDown={this.state.countriesDropDown}
            updateSortedCountryList={this.updateSortedCountryList}
            updateSortType={this.updateSortType}
            updateFilterByName={this.updateFilterByName}
            updateFilterByCurr={this.updateFilterByCurr}
            updateFilterByLang={this.updateFilterByLang}
            addCountryToChart={this.addCountryToChart}
            countriesToChart={this.state.countriesToChart}
          />} />
          <Route exact path='/countries/:name' render={(props) => this.getCountryDetails(props)} />
        </Switch>
        : null }
      </div>
    );
  }

}

export default App;
