import React, { useState, useEffect, useReducer} from "react";
import initialState from "../InitialState";
import reducers from "../reducers/AppReducer";
import actions from "../actions/Action";
import { sortData, prettyPrintStat } from "../../util";
export const Context = React.createContext();

export const AppContext = ({ children }) => {
   const [state,dispatch] = useReducer(reducers, initialState);
  // const [countries, setCountries] = useState([]);
  // const [country, setCountry] = useState("worldwide");
  // const [countryInfo, setCountryInfo] = useState({});
  // const [tableData, setTableData] = useState([]);
  // const [mapCountries, setMapCountries] = useState([]);
  // const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  // const [mapZoom, setMapZoom] = useState(3);
  // const [casesType, setCasesType] = useState("cases");
  // const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const getCountryInfo = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          // setCountryInfo(data);
          dispatch({type:actions.SET_COUNTRYINFO, value:data});
        });
    };
    getCountryInfo();
  }, []);
  useEffect(() => {
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
          dispatch({type:actions.SET_COUNTRIES, value:countries});
          dispatch({type:actions.SET_TABLEDATA, value:sortData(data)});
          dispatch({type:actions.SET_MAPCOUNTRIES, value:data});
          // setCountries(countries);
          // setTableData(sortData(data));
          // setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);
  // const value = {
  //   countries,
  //   country,
  //   countryInfo,
  //   tableData,
  //   mapCountries,
  //   mapCenter,
  //   mapZoom,
  //   casesType,
  //   setCountries,
  //   setCountry,
  //   setCountryInfo,
  //   setTableData,
  //   setMapCountries,
  //   setMapCenter,
  //   setMapZoom,
  //   setCasesType,
  //   chartData,
  //   setChartData,
  // };
  const value = {
    state,
    dispatch
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
