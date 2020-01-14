import React, { Component } from 'react';
import CountryList from './CountryList';
import RegionDropDown from './RegionDropDown';
import CountryDropDown from './CountryDropDown';
import '../styles/FilterResults.scss';

class FilterResults extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickAddCountry = this.handleClickAddCountry.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.countries !== this.props.countries) {
      this.scrollToBottom();
    }
    if (this.props.clickedSorting === false && prevProps.clickedSorting === true) {
      this.props.updateSortType('asc');
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.resultsEnd.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }

  handleClick(e) {
    const sortType = this.props.sortType === 'asc' ? 'desc' : 'asc';
    const countries = [...this.props.countries];
    const sortedCountries = countries.sort((a, b) => {
      if (this.props.sortType === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
      
    });
    this.props.updateSortedCountryList(sortedCountries);
    this.props.clickSorting(true);
    this.props.updateSortType(sortType);
  }

  handleClickAddCountry(e) {
    this.props.addCountryToChart(this.props.selectedCountry);
  }

  render() {

    return (
      <div className='FilterResults container'>
        <div className='FilterResults-head row'>
          <div className='col-md-1 col-sm-1 d-none d-sm-block'>#</div>
          <div className='col-md-6 col-sm-6 d-none d-sm-block'>Flag</div>
          <div onClick={this.handleClick} className={`FilterResults-head-name col-md-5 col-sm-5 ${this.props.sortType}`}>Name</div>
        </div>

        <CountryList countries={this.props.clickedSorting ? 
          this.props.sortedCountries : 
          this.props.countries} 
        />

        <div className='row mb-4'>
          <RegionDropDown 
            regions={this.props.regions}
            updateSelectedRegion={this.props.updateSelectedRegion}
            selectedRegion={this.props.selectedRegion}
          />
          <CountryDropDown 
            countries={this.props.countriesDropDown}  
            updateSelectedCountry={this.props.updateSelectedCountry}
            selectedRegion={this.props.selectedRegion}
            selectedCountry={this.props.selectedCountry}
          />
          {this.props.selectedCountry !== 'default' &&
            <div className='col-12 col-md-2 col-sm-2'>
              < button onClick={this.handleClickAddCountry} type="submit" className="btn btn-block btn-lg btn-primary">Add</button> 
            </div>
          }
        </div>
        {/* dummy div */}
        <div style={{ float:"left", clear: "both" }} ref={(el) => { this.resultsEnd = el; }}></div>
      </div>
    );
  }
}

export default FilterResults;