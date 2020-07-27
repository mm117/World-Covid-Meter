import React from "react";
import numeral from "numeral";
import { Circle, Popup, Marker } from "react-leaflet";
import {caseTypeColors} from './constant/Constant';
export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => b.cases - a.cases);
};

export const prettyPrintStat = (stat) => {
  return stat ? `${numeral(stat).format("0.0a")}` : "0";
};

export const showDataOnMap = (data, caseType = "cases") =>
   data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[caseType].hex}
      fillColor={caseTypeColors[caseType].hex}
      radius={
        Math.sqrt(country[caseType] < 0  ? 0 : country[caseType] ) * (caseTypeColors[caseType] < 0 ? 0 : caseTypeColors[caseType].multiplier )
      }
    >
     <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-active">
            Active:{numeral(country.active).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths:{numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

   