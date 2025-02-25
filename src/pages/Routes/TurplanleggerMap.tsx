import L from 'leaflet';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface Props {
  setDistance: Dispatch<SetStateAction<number>>
}

export const TurplanleggerMap = ({setDistance}: Props) => {
  const [points, setPoints] = useState<L.LatLng[]>([]);
  const [editing, setEditing] = useState(true);
  const [layer] = useState(L.layerGroup());
  const [pathLayer] = useState(L.layerGroup());
  const map = useRef<L.Map | undefined>();
  
  useEffect(() => {
    if (!map.current) {
      map.current = L.map('map').setView([64.505, 10.09], 5);
      const id = 'topo';
      const layer = L.tileLayer(`https://cache{s}.kartverket.no/v1/wmts/1.0.0/${id}/default/webmercator/{z}/{y}/{x}.png`,
        {
            minZoom: 5,
            maxZoom: 18,
            detectRetina: true,
            attribution: '<a href="https://www.kartverket.no/">Kartverket</a>',
            subdomains: ['', '2', '3', '4']
        });
      layer.addTo(map.current);

      

      
    }
  }, [])

  useEffect(() => {
    map.current?.removeEventListener('click')
    map.current!.on('click', function(e) {        
      if (!editing) return;
      var popLocation= e.latlng;
      if (points.length > 0) {
        const start = popLocation;
        const end = points[points.length - 1]
        const distanceInMeters = start.distanceTo(end);
        // Disable editing if last click was less than 10meters away from prior point
        if (distanceInMeters < 10) {
          setEditing(false);
          return;
        }
      }

      setPoints(points => [...points, popLocation])
    });
  }, [points, editing])

  useEffect(() => {
    map.current?.removeEventListener('mousemove')
    map.current!.on('mousemove', function(e) {        
      var popLocation= e.latlng;
      if (points.length > 0) {
        pathLayer.clearLayers()

        if (!editing) {
          return;
        }

        const lastPoint = points[points.length - 1];
        L.polyline([lastPoint, popLocation]).addTo(pathLayer);
        pathLayer.addTo(map.current!)
      }
    });
  }, [points, editing])

  useEffect(() => {
    layer.clearLayers();

    // Markers
    points.map(point => {
      L.marker(point)
      .addTo(layer).on('click', () => {setEditing(false)});})
      
      // Line
      const coordinates = points.map(p => L.latLng([p.lat, p.lng]));
      let distance = 0;
      coordinates.forEach((_, index) => {
        if (index > 0 && index < coordinates.length) {
          const start = coordinates[index - 1];
          const end = coordinates[index];
          const distanceKm = (end.distanceTo(start) / 1000);
          distance += distanceKm;
          L.polyline([start, end]).bindTooltip(distanceKm.toFixed(2) + "km", {permanent: true}).addTo(layer);
        }
      })
      
      setDistance(distance);
      layer.addTo(map.current!)
  }, [points])
  

  return <div id="map" style={{ height: '60vh' }}></div>;
};
