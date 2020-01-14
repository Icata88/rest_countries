import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class BarChart extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.countries !== this.props.countries) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.chartEnd.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }
  
  getCountryNameAndPopulation() {
    let totalPopulation = 0;
    const fillCountries = [['Country', 'Population', { role: 'style' }]];
    const countries = this.props.countries.map(c => {
      totalPopulation += c.population;
      return [c.name, parseFloat(c.population), 'color: #007bff'];  
    });  
    const totalPopulationArr = ['Total Population', parseFloat(totalPopulation), 'color: #dc3545'];
    return fillCountries.concat(countries, [totalPopulationArr]);
  }
  
  render() {
    return (
      <div className='BarChart container'>
        <Chart
          width={'100%'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={ this.getCountryNameAndPopulation() }
          options={{
            title: 'Population of Countries',
            colors: ['#007bff'],
            chartArea: { width: '50%' },
            hAxis: {
              minValue: 0,
            },
            vAxis: {
              title: 'Country',
            },
          }}
        />
        {/* dummy div */}
        <div style={{ float:"left", clear: "both" }} ref={(el) => { this.chartEnd = el; }}></div>
      </div>
    );
  }
}

export default BarChart;