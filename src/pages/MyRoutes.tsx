import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import iconSvg from "../Map/marker.svg";



export const MyRoutes = () => {
  const [points, setPoints] = useState<L.LatLng[]>([]);
  const [layer, _] = useState(L.layerGroup());
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
        setPoints(points => [...points, popLocation])
        
    });
    }
  }, [])

  useEffect(() => {
    layer.clearLayers();

    // Markers
    points.map(point => {
      L.marker(point, {
        icon: L.icon({
        className: "marker",
        iconUrl: iconSvg,
        iconSize: [50, 50],
        iconAnchor: [25, 25]
      })})
      .addTo(layer)})
      
      // Line
      const coordinates = points.map(p => L.latLng([p.lat, p.lng]));
      L.polyline(coordinates).addTo(layer);
      
      layer.addTo(map.current!)
  }, [points])
  

  return <div id="map" style={{ height: '100vh' }}></div>;
};
