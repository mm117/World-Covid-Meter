import React from "react";
import {
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import { Context } from "../store/context/AppContext";

function AppHeader() {
  const {
    countries,
    setCountries,
    country,
    setCountry,
    countryInfo,
    setCountryInfo,
    tableData,
    setTableData,
    mapCountries,
    setMapCountries,
    mapCenter,
    setMapCenter,
    mapZoom,
    setMapZoom,
    casesType,
    setCasesType,
  } = React.useContext(Context);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        countryCode === "worldwide"
          ? setMapCenter({ lat: 34.80746, lng: -40.4796 })
          : setMapCenter({
              lat: data.countryInfo.lat,
              lng: data.countryInfo.long,
            });
        setMapZoom(3);
      });
  };
  return (
    <div className="app_header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.value}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default AppHeader;