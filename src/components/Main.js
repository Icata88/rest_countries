import React, { Component } from 'react';
import Filters from './Filters';
import FilterResults from './FilterResults';
import NotFound from './NotFound';
import Loader from './Loader';
import BarChart from './BarChart';

class Main extends Component {

  render() {
    return (
      <div className='Main'>
        <header className='masthead mb-5 text-white text-center'>
          <div className='overlay'></div>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-9 mx-auto'>
                <h1 className='mb-5'>Use any of the filters below to search countries</h1>
              </div>
            </div>
            <Filters
              allCountries={this.props.allCountries}
              updateCountryList={this.props.updateCountryList}
              loading={this.props.loading} 
              clickSorting={this.props.clickSorting}
              updateFilterByName={this.props.updateFilterByName}
              updateFilterByCurr={this.props.updateFilterByCurr}
              updateFilterByLang={this.props.updateFilterByLang}
              filterByNameVal={this.props.filterByNameVal}
              filterByCurrVal={this.props.filterByCurrVal}
              filterByLangVal={this.props.filterByLangVal}
            />
          </div>
        </header>
        {this.props.filteredCountries.length > 0 && 
          <FilterResults 
            countries={this.props.filteredCountries} 
            regions={this.props.regions}
            clickSorting={this.props.clickSorting}
            clickedSorting={this.props.clickedSorting}
            updateSelectedRegion={this.props.updateSelectedRegion}
            updateSelectedCountry={this.props.updateSelectedCountry}
            countriesDropDown={this.props.countriesDropDown}
            selectedRegion={this.props.selectedRegion}
            selectedCountry={this.props.selectedCountry}
            sortedCountries={this.props.sortedCountries}
            updateSortedCountryList={this.props.updateSortedCountryList}
            updateSortType={this.props.updateSortType}
            sortType={this.props.sortType}
            addCountryToChart={this.props.addCountryToChart}
          />
        }
        {this.props.noCountriesFound &&
          <NotFound />
        }
        {this.props.countriesToChart.length > 0 && <BarChart countries={this.props.countriesToChart} />}
        <Loader loading={this.props.isLoading} />
      </div>
    );
  }
}

export default Main;