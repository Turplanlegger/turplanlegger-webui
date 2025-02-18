import L from 'leaflet';
import { useEffect, useRef } from 'react';

export const MyRoutes = () => {
  const map = useRef<L.Map | undefined>();
  
  useEffect(() => {
    if (!map.current) {
      map.current = L.map('map').setView([64.505, 10.09], 5);
      if (map) {
        const id = 'topo';
        const layer = L.tileLayer(`https://cache{s}.kartverket.no/v1/wmts/1.0.0/${id}/default/webmercator/{z}/{y}/{x}.png`,
          {
              // format: 'image/png',
              minZoom: 5,
              maxZoom: 18,
              detectRetina: true,
              attribution: '<a href="https://www.kartverket.no/">Kartverket</a>',
              subdomains: ['', '2', '3', '4']
          });
        layer.addTo(map.current);
      }
    }
  }, [])

  

  return <div id="map" style={{ height: '100vh' }}></div>;
};
