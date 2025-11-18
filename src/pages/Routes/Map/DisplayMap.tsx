import L from 'leaflet';
import { Route } from 'models/Types';
import { useEffect, useRef } from 'react';

export const DisplayMap = ({ route }: { route: Route }) => {
  const map = useRef<L.Map | undefined>();
  const mapId = `map-${route.id}`;

  useEffect(() => {
    if (!map.current) {
      map.current = L.map(mapId).setView([64.505, 10.09], 5);
      const id = 'topo';
      const layer = L.tileLayer(
        `https://cache.kartverket.no/v1/wmts/1.0.0/${id}/default/webmercator/{z}/{y}/{x}.png`,
        {
          minZoom: 5,
          maxZoom: 18,
          detectRetina: true,
          attribution: '<a href="https://www.kartverket.no/">Kartverket</a>'
        }
      );
      layer.addTo(map.current);

      const geojsonLayer = L.geoJSON(route.route);
      geojsonLayer.addTo(map.current);

      const bounds = geojsonLayer.getBounds();
      map.current.fitBounds(bounds, {
        maxZoom: 10
      });
    }
  }, []);

  return <div id={mapId} style={{ height: '100%' }}></div>;
};
