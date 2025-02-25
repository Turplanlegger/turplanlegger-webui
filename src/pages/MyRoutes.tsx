import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';

export const MyRoutes = () => {
  const [points, setPoints] = useState<L.LatLng[]>([]);
  const [layer] = useState(L.layerGroup());
  const [pathLayer] = useState(L.layerGroup());
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
    map.current!.on('mousemove', function(e) {        
      var popLocation= e.latlng;
      if (points.length > 0) {
        pathLayer.clearLayers()
        const lastPoint = points[points.length - 1];
        L.polyline([lastPoint, popLocation]).addTo(pathLayer);
        pathLayer.addTo(map.current!)
      }
    });
  }, [points])

  useEffect(() => {
    layer.clearLayers();

    // Markers
    points.map(point => {
      L.marker(point)
      .addTo(layer)})
      
      // Line
      const coordinates = points.map(p => L.latLng([p.lat, p.lng]));
      coordinates.forEach((_, index) => {
        if (index > 0 && index < coordinates.length) {
          const start = coordinates[index - 1];
          const end = coordinates[index];
          L.polyline([start, end]).bindTooltip((end.distanceTo(start) / 1000).toFixed(2) + "km", {permanent: true}).addTo(layer);
        }
      })
      
      layer.addTo(map.current!)
  }, [points])
  

  return <div id="map" style={{ height: '100vh' }}></div>;
};
