import React, { useState, useEffect, useReducer } from "react";
import initialState from "../InitialState";
import reducers from "../reducers/AppReducer";
import actions from "../actions/Action";
import { sortData, prettyPrintStat } from "../../util";
export const Context = React.createContext();

export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  useEffect(() => {
    if (!navigator.onLine) {
      let storageState = JSON.parse(localStorage.getItem("item"));
      dispatch({
        type: actions.SET_COUNTRYINFO,
        value: storageState.countryInfo,
      });
     } else {
      const getCountryInfo = async () => {
        await fetch("https://disease.sh/v3/covid-19/all")
          .then((response) => response.json())
          .then((data) => {
            dispatch({ type: actions.SET_COUNTRYINFO, value: data });
          });
      };
      getCountryInfo();
    }
  }, []);
  useEffect(() => {
    if (!navigator.onLine) {
      let storageState = JSON.parse(localStorage.getItem("item"));
      dispatch({
        type: actions.SET_COUNTRYINFO,
        value: storageState.countryInfo,
      });
      dispatch({ type: actions.SET_COUNTRIES, value: storageState.countries });
      dispatch({
        type: actions.SET_TABLEDATA,
        value: sortData(storageState.tableData),
      });
      dispatch({
        type: actions.SET_MAPCOUNTRIES,
        value: storageState.mapCountries,
      });
    } else {
      const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((data) => {
            const countries = data.map((country) => {
              return {
                name: country.country,
                value: country.countryInfo.iso2,
              };
            });
            dispatch({ type: actions.SET_COUNTRIES, value: countries });
            dispatch({ type: actions.SET_TABLEDATA, value: sortData(data) });
            dispatch({ type: actions.SET_MAPCOUNTRIES, value: data });
          });
      };
      getCountriesData();
    }
  }, []);

  const value = {
    state,
    dispatch,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
