'use client';

import { useEffect, useState } from 'react';
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  pickup: LatLngTuple;
  destination: LatLngTuple;
  from: string;
  to: string;
};

type RouteResponse = {
  code: string;
  routes?: Array<{
    distance: number;
    duration: number;
    geometry: { coordinates: [number, number][] };
  }>;
};

function ZoomToRoute({ points }: { points: LatLngTuple[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 1) map.fitBounds(points, { padding: [35, 35] });
  }, [map, points]);
  return null;
}

export default function RideRouteMap({ pickup, destination, from, to }: Props) {
  const [route, setRoute] = useState<LatLngTuple[]>([]);
  const [details, setDetails] = useState<{ miles: number; minutes: number } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const url = `https://router.project-osrm.org/route/v1/driving/${pickup[1]},${pickup[0]};${destination[1]},${destination[0]}?overview=full&geometries=geojson`;

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Routing service unavailable');
        return response.json() as Promise<RouteResponse>;
      })
      .then((data) => {
        const first = data.routes?.[0];
        if (data.code !== 'Ok' || !first) throw new Error('No driving route found');
        setRoute(first.geometry.coordinates.map(([lon, lat]) => [lat, lon]));
        setDetails({ miles: first.distance / 1609.344, minutes: first.duration / 60 });
      })
      .catch((err: unknown) => {
        if (!(err instanceof Error && err.name === 'AbortError')) setError(true);
      });
    return () => controller.abort();
  }, [pickup, destination]);

  const bounds = route.length ? route : [pickup, destination];

  return (
    <div>
      <MapContainer center={pickup} zoom={11} scrollWheelZoom={false} style={{ height: 380, width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CircleMarker center={pickup} radius={9} pathOptions={{ color: '#07583b', fillColor: '#38a56a', fillOpacity: 1 }}>
          <Popup>Pickup: {from}</Popup>
        </CircleMarker>
        <CircleMarker center={destination} radius={9} pathOptions={{ color: '#144a78', fillColor: '#58a8e1', fillOpacity: 1 }}>
          <Popup>Drop-off: {to}</Popup>
        </CircleMarker>
        {route.length > 0 && <Polyline positions={route} pathOptions={{ color: '#16814f', weight: 5 }} />}
        <ZoomToRoute points={bounds} />
      </MapContainer>
      <div className="px-4 py-3 small">
        {details && <strong>Estimated route: {details.miles.toFixed(1)} miles · {Math.round(details.minutes)} minutes</strong>}
        {!details && !error && <span className="text-muted">Loading driving route...</span>}
        {error && <span className="text-muted">Route unavailable right now. Pickup and destination markers are still shown.</span>}
        <div className="text-muted mt-1">Demo route only. Traffic and travel times may vary.</div>
      </div>
    </div>
  );
}
