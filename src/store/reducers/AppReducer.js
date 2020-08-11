import actions from "../actions/Action";

const reducers = (state, action) => {
  switch (action.type) {
    case actions.SET_COUNTRIES:
      console.table(state);
      return { ...state, countries: action.value };
    case actions.SET_COUNTRY:
      return { ...state, country: action.value };
    case actions.SET_COUNTRYINFO:
      return { ...state, countryInfo: action.value };
    case actions.SET_TABLEDATA:
      return { ...state, tableData: action.value };
    case actions.SET_MAPCOUNTRIES:
      return { ...state, mapCountries: action.value };
    case actions.SET_MAPCENTER:
      return { ...state, mapCenter: action.value };
    case actions.SET_MAPZOOM:
      return { ...state, mapZoom: action.value };
    case actions.SET_CASESTYPE:
      return { ...state, casesType: action.value };
      case actions.SET_CHARTDATA:
        return { ...state, chartData: action.value };
    default:
      return state;
  }
};

export default reducers;
