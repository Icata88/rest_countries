import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CountryDetails.scss';

class CountryDetails extends Component {

  getDateWithUTCOffset(offset) {
    const now = new Date(); // get the current time

    const currentTzOffset = -now.getTimezoneOffset() / 60 // in hours, i.e. -4 in NY
    const deltaTzOffset = offset - currentTzOffset; // timezone diff

    const nowTimestamp = now.getTime(); // get the number of milliseconds since unix epoch 
    const deltaTzOffsetMilli = deltaTzOffset * 1000 * 60 * 60; // convert hours to milliseconds (tzOffsetMilli*1000*60*60)
    const outputDate = new Date(nowTimestamp + deltaTzOffsetMilli) // your new Date object with the timezone offset applied.

    return outputDate;
  }

  render() {
    const country = this.props.country[0];
    const languages = country.languages.map(lang => lang.name);
    const currencies = country.currencies.map(curr => curr.name);

    return (
      <div className='CountryDetails row justify-content-center mt-3 mb-3'>
        <div className='col-11 col-lg-5'>
          <div className='CountryDetails-card card'>
            <img className='card-img-top' src={country.flag} alt={country.name} />
            <div className='card-body'>
              <h2 className='card-title'>{country.name}</h2>
              <div className='card-subtitle text-muted mb-2'>Population: {country.population}</div>
              <div className='card-subtitle text-muted mb-2'>Languages: {languages.join(',')}</div>
              <div className='card-subtitle text-muted mb-2'>Currencies: {currencies.join(',')}</div>
              <div className='card-subtitle text-muted mb-2'>Region: {country.region}</div>
              <ul className='card-subtitle text-muted mb-2 list-group list-group-flush'>Current time based on time zone:
              {
                country.timezones.map((tz, i) => {
                  const regExUTC = /[+-]([01]\d|2[0-4])(:?[0-5]\d)?/;
                  const found = tz.match(regExUTC);
                  const returnValue = found ? <li className='list-group-item' key={i}><span className='font-weight-bold'>{`${tz}: `}</span>{`${this.getDateWithUTCOffset(parseInt(found[0]))}`}</li> : null;
                  return returnValue;
                })
              }
              </ul>
            </div>
            <div className='card-body'>
              <Link to='/' className='btn btn-primary'>
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CountryDetails;