import L from 'leaflet';
import { useEffect, useRef } from 'react';
import iconSvg from "../Map/marker.svg";

export const MyRoutes = () => {
  const map = useRef<L.Map | undefined>();
  
  useEffect(() => {
    if (!map.current) {
      map.current = L.map('map').setView([64.505, 10.09], 5);
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

      map.current.on('click', function(e) {        
        var popLocation= e.latlng;
        // L.popup()
        //   .setLatLng(popLocation)
        //   .setContent('<p>Hello world!<br />This is a nice popup.</p>')
        //   .openOn(map.current!);
          const icon = L.icon({
            className: "marker",
            iconUrl: iconSvg,
            iconSize: [50, 50],
            iconAnchor: [25, 25]
        });
        L.marker(popLocation, {icon: icon}).addTo(map.current!)
    });
    }
  }, [])

  

  return <div id="map" style={{ height: '100vh' }}></div>;
};
