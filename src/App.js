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
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
            hightTextClass="red"
          />
          <InfoBox
           activeClass="infoBox--selected-green"
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
            hightTextClass="green"
          />
          <InfoBox
           activeClass="infoBox--selected-black"
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
            hightTextClass="black"

          />
        </div>
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table />
          <h3 className="app_graphTitle">{country === 'worldwide' ? 'WorldWide' : `${countryInfo.country}`} New {casesType}</h3>
          <LineGraph className="app_graph" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
