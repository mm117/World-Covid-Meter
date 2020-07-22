import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import {showDataOnMap} from './util';
const caseTypeColors = {
    cases:{
        hex:'#CC1034',
        multiplier:800
    },
    recovered:{
        hex:'#7dd71d',
        multiplier:1200
    },
    deaths:{
        hex:'#fb4443',
        multiplier:2000
    }
}


function Map({countries,casesType,center, zoom }) {
     return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { countries?.length > 0 && showDataOnMap(countries, casesType)}
         </LeafletMap>
    </div>
  );
}

export default Map;
