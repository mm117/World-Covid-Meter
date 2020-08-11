import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import {showDataOnMap} from '../util';
import {Context} from '../store/context/AppContext';
function Map() {
  const {state } = React.useContext(Context);
    return (
    <div className="map">
      <LeafletMap center={state.mapCenter} zoom={state.mapZoom}>
        <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        { state.mapCountries?.length > 0 && showDataOnMap(state.mapCountries, state.casesType)}
         </LeafletMap>
    </div>
  );
}

export default Map;
