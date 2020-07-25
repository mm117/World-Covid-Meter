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

function App() {
  const { casesType, countryInfo, setCasesType, country} = React.useContext(Context);
   return (
    <div className="app">
      <div className="app_left">
        <AppHeader />
        <div className="app_stats">
          <InfoBox
             activeClass="infoBox--selected-red"
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Confirmed"
            cases={countryInfo.todayCases ? countryInfo.todayCases: 0 }
            total={countryInfo.cases ? countryInfo.cases: 0 }
            casesPerOneMillion={countryInfo.casesPerOneMillion ? countryInfo.casesPerOneMillion: 0 }
            hightTextClass="red"
          />
           <InfoBox
           activeClass="infoBox--selected-blue"
            active={casesType === "active"}
            onClick={(e) => setCasesType("active")}
            title="Active"
            cases={countryInfo.todayCases ? (countryInfo.todayCases -(countryInfo.todayRecovered +  countryInfo.todayDeaths )): 0} 
            total={countryInfo.active ? countryInfo.active: 0}
            hightTextClass="blue"
            casesPerOneMillion={countryInfo.activePerOneMillion ? countryInfo.activePerOneMillion: 0 }

          />
          <InfoBox
           activeClass="infoBox--selected-green"
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered ? countryInfo.todayRecovered: 0}
            total={countryInfo.recovered ? countryInfo.recovered: 0}
            hightTextClass="green"
            casesPerOneMillion={countryInfo.recoveredPerOneMillion ? countryInfo.recoveredPerOneMillion: 0 }
          />
          <InfoBox
           activeClass="infoBox--selected-black"
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths ? countryInfo.todayDeaths: 0} 
            total={countryInfo.deaths ? countryInfo.deaths: 0}
            hightTextClass="black"
            casesPerOneMillion={countryInfo.deathsPerOneMillion ? countryInfo.deathsPerOneMillion: 0 }

          />
          
        </div>
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table />
          <h3 className="app_graphTitle">{country === 'worldwide' ? 'WorldWide' : `${countryInfo.country}`} {casesType} Trends</h3>
          <LineGraph className="app_graph" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
