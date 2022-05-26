import React, { useEffect, useState, useCallback, memo } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB5e_duPiyEM9Sl7b5KwbT08BSsV-QdL7o',
  });
  const { mapHeight } = useSelector((state) => state.general);
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        setClickableIcons={false}
        mapContainerStyle={{ height: mapHeight }} //400px
        center={center}
        zoom={10}
      ></GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default memo(MyComponent);
