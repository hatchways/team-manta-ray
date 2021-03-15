import React, { useState } from "react";
import { Marker, StaticMap } from "react-map-gl";

import radius from "../assets/radius.svg";

const Map = ({ lat, lng }) => {
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 12.5,
  });
  return (
    <StaticMap
      {...viewport}
      zoom={12.5}
      width="100%"
      height="100%"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/rudream/ckmao12xd4xdp17lavdhug5jd"
    >
      <Marker latitude={lat} longitude={lng}>
        <img
          style={{ transform: "translate(-50%,-50%)", height: "15vh" }}
          src={radius}
          alt="map marker"
        />
      </Marker>
    </StaticMap>
  );
};

export default Map;
