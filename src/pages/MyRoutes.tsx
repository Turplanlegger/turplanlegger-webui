import L from 'leaflet';
import { useEffect, useRef } from 'react';

export const MyRoutes = () => {
  const map = useRef<L.Map | undefined>();
  
  useEffect(() => {
    if (!map.current) {
      map.current = L.map('map').setView([64.505, 10.09], 5);
      if (map) {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map.current);
      }
    }
  }, [])

  

  return <div id="map" style={{ height: '100vh' }}></div>;
};
