import React from "react";
import {
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import { Context } from "../store/context/AppContext";
import actions from "../store/actions/Action"

function AppHeader() {
   const {
    state,
    dispatch
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
        dispatch({type:actions.SET_COUNTRY, value:countryCode});
        dispatch({type:actions.SET_COUNTRYINFO, value:data});
         countryCode === "worldwide"
          ? dispatch({type:actions.SET_MAPCENTER, value:{ lat: 34.80746, lng: -40.4796 }})
          : dispatch({type:actions.SET_MAPCENTER, value:{ lat: data.countryInfo.lat,
            lng: data.countryInfo.long}});
          dispatch({type:actions.SET_MAPZOOM, value:3});
        });
  };
  return (
    <div className="app_header">
       <div>
       <h1>COVID-19 TRACKER</h1>
        </div>
       <FormControl className="app_dropdown">
        <Select variant="outlined" value={state.country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {state.countries.map((country, index) => (
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
