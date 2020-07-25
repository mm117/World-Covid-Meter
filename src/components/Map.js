import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import {showDataOnMap} from '../util';
import {Context} from '../store/context/AppContext';
function Map() {
  const {mapCountries, mapCenter,
    mapZoom,casesType } = React.useContext(Context);
     console.log(mapCountries);
     return (
    <div className="map">
      <LeafletMap center={mapCenter} zoom={mapZoom}>
        <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { mapCountries?.length > 0 && showDataOnMap(mapCountries, casesType)}
         </LeafletMap>
    </div>
  );
}

export default Map;
