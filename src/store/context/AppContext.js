import React, { useState,useEffect} from "react";
import initialState from "../InitialState";
import reducers from "../reducers/AppReducer";
import actions from "../actions/Action";
import { sortData, prettyPrintStat } from "../../util";
export const Context = React.createContext();


export const AppContext = ({ children }) => {
  // const [state,dispatch] = React.useReducer(reducers, initialState);
  // const value = {
  //     countries: initialState.countries,
  //     country : initialState.country,
  //     countryInfo: initialState.countryInfo,
  //     tableData : initialState.tableData,
  //     mapCountries : initialState.mapCountries,
  //     mapCenter:initialState.mapCenter,
  //     mapZoom: initialState.mapZoom,
  //     casesType: initialState.casesType,
  //     setCountries: (value) => {dispatch({type:actions.SET_COUNTRIES, value: value})},
  //     setCountry: (value) => {dispatch({type:actions.SET_COUNTRY, value: value})},
  //     setCountryInfo: (value) => {dispatch({type:actions.SET_COUNTRYINFO, value: value})},
  //     setTableData: (value) => {dispatch({type:actions.SET_TABLEDATA, value: value})},
  //     setMapCountries: (value) => {dispatch({type:actions.SET_MAPCOUNTRIES, value: value})},
  //     setMapCenter: (value) => {dispatch({type:actions.SET_MAPCENTER, value: value})},
  //     setMapZoom: (value) => {dispatch({type:actions.SET_MAPZOOM, value: value})},
  //     setCasesType: (value) => {dispatch({type:actions.SET_CASESTYPE, value: value})},
  // }
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const getCountryInfo = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
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
          setCountries(countries);
          setTableData(sortData(data));
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);
  const value = {
    countries,
    country,
    countryInfo,
    tableData,
    mapCountries,
    mapCenter,
    mapZoom,
    casesType,
    setCountries,
    setCountry,
    setCountryInfo,
    setTableData,
    setMapCountries,
    setMapCenter,
    setMapZoom,
    setCasesType,
    chartData,
    setChartData,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
