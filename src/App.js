import React from "react";
import "./App.css";
import { Card, CardContent } from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { prettyPrintStat } from "./util";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import { Context } from "./store/context/AppContext";
import AppHeader from "./components/AppHeader";
import actions from './store/actions/Action'

function App() {
  const { state, dispatch} = React.useContext(Context);
   return (
     <>
    <div className="app">
      <div className="app_left">
        <AppHeader />
        <h5 className="app_last-updated">last updated on {new Date(state.countryInfo.updated).toLocaleString()}</h5>
        <div className="app_stats">
          <InfoBox
             activeClass="infoBox--selected-red"
            active={state.casesType === "cases"}
            onClick={(e) =>  dispatch({type:actions.SET_CASESTYPE, value:"cases"})}
            title="Confirmed"
            cases={state.countryInfo.todayCases ? state.countryInfo.todayCases: 0 }
            total={state.countryInfo.cases ? state.countryInfo.cases: 0 }
            casesPerOneMillion={state.countryInfo.casesPerOneMillion ? state.countryInfo.casesPerOneMillion: 0 }
            hightTextClass="red"
          />
           <InfoBox
           activeClass="infoBox--selected-blue"
            active={state.casesType === "active"}
            onClick={(e) => dispatch({type:actions.SET_CASESTYPE, value:"active"})}
            title="Active"
            cases={state.countryInfo.todayCases ? (state.countryInfo.todayCases -(state.countryInfo.todayRecovered +  state.countryInfo.todayDeaths )): 0} 
            total={state.countryInfo.active ? state.countryInfo.active: 0}
            hightTextClass="blue"
            casesPerOneMillion={state.countryInfo.activePerOneMillion ? state.countryInfo.activePerOneMillion: 0 }

          />
          <InfoBox
           activeClass="infoBox--selected-green"
            active={state.casesType === "recovered"}
            onClick={(e) => dispatch({type:actions.SET_CASESTYPE, value:"recovered"})}
            title="Recovered"
            cases={state.countryInfo.todayRecovered ? state.countryInfo.todayRecovered: 0}
            total={state.countryInfo.recovered ? state.countryInfo.recovered: 0}
            hightTextClass="green"
            casesPerOneMillion={state.countryInfo.recoveredPerOneMillion ? state.countryInfo.recoveredPerOneMillion: 0 }
          />
          <InfoBox
           activeClass="infoBox--selected-black"
            active={state.casesType === "deaths"}
            onClick={(e) => dispatch({type:actions.SET_CASESTYPE, value:"deaths"})}
            title="Deaths"
            cases={state.countryInfo.todayDeaths ? state.countryInfo.todayDeaths: 0} 
            total={state.countryInfo.deaths ? state.countryInfo.deaths: 0}
            hightTextClass="black"
            casesPerOneMillion={state.countryInfo.deathsPerOneMillion ? state.countryInfo.deathsPerOneMillion: 0 }

          />
          
        </div>
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table />
          <h3 className="app_graphTitle">{state.country === 'worldwide' ? 'WorldWide' : `${state.countryInfo.country}`} {state.casesType} Trends</h3>
          <LineGraph className="app_graph" />
        </CardContent>
      </Card>
     </div>
      <div className="app_footer">
      <h5>
         © 2020 Copyright: <a className="app_copyright" href="mailto:Mukeshmishra117@gmail.com">Mukesh Mishra</a> 
      </h5>
      </div>
    </>
  );
}

export default App;
