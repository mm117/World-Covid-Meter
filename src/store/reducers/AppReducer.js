import actions from "../actions/Action";

const reducers = (state, action) => {
  let newState = {};
  if (!navigator.onLine) {
    state = JSON.parse(localStorage.getItem("state"));
  }
  switch (action.type) {
    case actions.SET_COUNTRIES:
      newState = { ...state, countries: action.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case actions.SET_COUNTRY:
      newState = { ...state, country: action.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case actions.SET_COUNTRYINFO:
      newState = { ...state, countryInfo: action.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case actions.SET_TABLEDATA:
      newState = { ...state, tableData: action.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case actions.SET_MAPCOUNTRIES:
      newState = { ...state, mapCountries: action.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case actions.SET_MAPCENTER:
      newState = { ...state, mapCenter: action.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case actions.SET_MAPZOOM:
      newState = { ...state, mapZoom: action.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case actions.SET_CASESTYPE:
      newState = { ...state, casesType: action.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    case actions.SET_CHARTDATA:
      newState = { ...state, chartData: action.value };
      localStorage.setItem("state", JSON.stringify(newState));
      return newState;
    default:
      localStorage.setItem("state", JSON.stringify(state));
      return state;
  }
};

export default reducers;
