import React, { Component } from 'react';

class RegionDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: props.selectedRegion
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ region: e.target.value }, this.handleSelectedRegion);
  }

  handleSelectedRegion() {
    this.props.updateSelectedRegion(this.state.region);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.regions !== this.props.regions) {
      this.setState({ region: 'default' }, this.handleSelectedRegion);
    }
  }

  render() {
    const regions = this.props.regions.map((region, index) => {
      return (
        <option key={index} value={region}>{region}</option>
      );
    });
    return (
      <div className='RegionDropDown col-12 col-md-5 col-sm-5 mb-3'>
        <select 
          onChange={this.handleChange} 
          value={this.state.region} 
          className='custom-select custom-select-lg'>
          <option value='default'>Select a region...</option>
          {regions}
        </select> 
      </div>
    );
  }
}

export default RegionDropDown;