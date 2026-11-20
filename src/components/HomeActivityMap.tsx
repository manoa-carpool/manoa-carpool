'use client';

import { Fragment, useEffect, useState } from 'react';
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import { divIcon } from 'leaflet';
import { demoRides } from '@/app/rides/demoRides';
import styles from './HomeActivityMap.module.css';
import 'leaflet/dist/leaflet.css';

type Area = {
  name: string;
  position: LatLngTuple;
};

const campusPosition: LatLngTuple = [21.299, -157.817];
const desktopMapCenter: LatLngTuple = [21.36, -157.92];
const mobileMapCenter: LatLngTuple = [21.47, -158];

const areas: Area[] = [
  { name: 'Haleʻiwa', position: [21.592, -158.103] },
  { name: 'Waialua', position: [21.576, -158.129] },
  { name: 'Kahuku', position: [21.68, -157.951] },
  { name: 'Lāʻie', position: [21.647, -157.922] },
  { name: 'Wahiawā', position: [21.502, -158.024] },
  { name: 'Mililani', position: [21.448, -158.015] },
  { name: 'Kāneʻohe', position: [21.399, -157.799] },
  { name: 'Kailua', position: [21.397, -157.74] },
  { name: 'Waimānalo', position: [21.335, -157.71] },
  { name: 'Hawaiʻi Kai', position: [21.278, -157.704] },
  { name: 'Honolulu', position: [21.306, -157.858] },
  { name: 'Ala Moana Center', position: [21.289, -157.844] },
  { name: 'Waikīkī', position: [21.279, -157.829] },
  { name: 'Kaimukī', position: [21.286, -157.8] },
  { name: 'UH Mānoa', position: campusPosition },
  { name: 'Aiea', position: [21.384, -157.931] },
  { name: 'Pearl City', position: [21.397, -157.973] },
  { name: 'Waiʻanae', position: [21.447, -158.186] },
  { name: 'Waipahu', position: [21.386, -158.009] },
  { name: 'ʻEwa Beach', position: [21.315, -158.007] },
  { name: 'Kapolei', position: [21.335, -158.057] },
  { name: 'Ko Olina', position: [21.333, -158.121] },
];

const areaByName = new Map(areas.map((area) => [area.name, area]));
const rideAreaNames: Record<string, string> = {
  Kaneohe: 'Kāneʻohe',
  'Ewa Beach': 'ʻEwa Beach',
};
const rides = demoRides.flatMap((ride) => {
  const from = areaByName.get(rideAreaNames[ride.from] ?? ride.from);
  const to = areaByName.get(rideAreaNames[ride.to] ?? ride.to);
  return from && to ? [{ ride, from, to }] : [];
});

type RouteGroup = {
  from: Area;
  to: Area;
  rideIndexes: number[];
};

const routeGroupsByKey = new Map<string, RouteGroup>();
const rideIndexesByOrigin = new Map<string, number[]>();
rides.forEach(({ from, to }, index) => {
  const routeKey = `${from.name} → ${to.name}`;
  const group = routeGroupsByKey.get(routeKey);
  if (group) group.rideIndexes.push(index);
  else routeGroupsByKey.set(routeKey, { from, to, rideIndexes: [index] });

  const originIndexes = rideIndexesByOrigin.get(from.name) ?? [];
  originIndexes.push(index);
  rideIndexesByOrigin.set(from.name, originIndexes);
});
const routeGroups = Array.from(routeGroupsByKey.values());
const rideOffsets = new Array<number>(rides.length).fill(0);
const originGroups = Array.from(rideIndexesByOrigin.values());
originGroups.forEach((rideIndexes, groupIndex) => {
  rideIndexes.forEach((rideIndex, indexInGroup) => {
    rideOffsets[rideIndex] = (groupIndex / originGroups.length + indexInGroup / rideIndexes.length) % 1;
  });
});
const rideColors = rides.map((_, index) => `hsl(${Math.round(index * 360 / rides.length)} 68% 38%)`);
const rideIcons = rides.map(({ from, to }, index) => {
  const angle = Math.atan2(-(to.position[0] - from.position[0]), to.position[1] - from.position[1]) * 180 / Math.PI;
  return divIcon({
    className: styles.carIcon,
    html: `<span class="${styles.carBadge}" style="--ride-color:${rideColors[index]}"><span>🚗</span><span class="${styles.directionArrow}" style="transform:rotate(${angle}deg)" aria-hidden="true">➤</span></span>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
});
const routeCountIcons = routeGroups.map((group) => divIcon({
  className: styles.routeCountIcon,
  html: `<span class="${styles.routeCountBadge}">${group.rideIndexes.length}</span>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
}));

const travelFraction = 0.88;

function interpolate(from: LatLngTuple, to: LatLngTuple, progress: number): LatLngTuple {
  return [
    from[0] + (to[0] - from[0]) * progress,
    from[1] + (to[1] - from[1]) * progress,
  ];
}

function SetInitialMapView() {
  const map = useMap();

  useEffect(() => {
    const isNarrow = map.getSize().x < 600;
    map.setView(isNarrow ? mobileMapCenter : desktopMapCenter, isNarrow ? 9 : 11.5);
  }, [map]);

  return null;
}

export default function HomeActivityMap() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      setProgress((current) => (current + 0.006) % 1);
    }, 80);
    return () => window.clearInterval(timer);
  }, []);

  const destinationCounts = rides.reduce((counts, { to }) => {
    counts.set(to.name, (counts.get(to.name) ?? 0) + 1);
    return counts;
  }, new Map<string, number>());

  return (
    <div className={styles.mapSection}>
      <p className={styles.mapDescription}>
        {rides.length} sample rides shown—not live users. Cars travel between approximate community centers, never exact addresses.
      </p>
      <MapContainer
        className={styles.map}
        center={desktopMapCenter}
        zoom={11.5}
        zoomSnap={0.5}
        scrollWheelZoom={false}
        aria-label="Demo carpool activity map of Oʻahu"
      >
        <SetInitialMapView />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {areas.map((area) => (
          <CircleMarker
            key={area.name}
            center={area.position}
            radius={area.name === 'UH Mānoa' ? 7 : 4}
            pathOptions={{
              color: area.name === 'UH Mānoa' ? '#fff' : '#397754',
              fillColor: area.name === 'UH Mānoa' ? '#07543a' : '#71b78a',
              fillOpacity: 1,
              weight: 2,
            }}
          >
            <Tooltip direction="top">
              {area.name}{destinationCounts.has(area.name) ? ` · ${destinationCounts.get(area.name)} demo ${destinationCounts.get(area.name) === 1 ? 'ride' : 'rides'}` : ''}
              {area.name === 'UH Mānoa' ? ' · campus' : ''}
            </Tooltip>
          </CircleMarker>
        ))}
        {routeGroups.map(({ from, to, rideIndexes }, groupIndex) => (
          <Fragment key={`${from.name}-${to.name}`}>
            <Polyline
              positions={[from.position, to.position]}
              pathOptions={{
                color: rideIndexes.length === 1 ? rideColors[rideIndexes[0]] : '#52665c',
                opacity: 0.75,
                weight: 3,
              }}
            />
            {rideIndexes.length > 1 && (
              <Marker
                position={interpolate(from.position, to.position, 0.5)}
                icon={routeCountIcons[groupIndex]}
                title={`${rideIndexes.length} sample rides share this route`}
                alt={`${rideIndexes.length} sample rides share the route from ${from.name} to ${to.name}`}
              >
                <Tooltip>{rideIndexes.length} sample rides on this route</Tooltip>
              </Marker>
            )}
          </Fragment>
        ))}
        {rides.map(({ from, to }, index) => {
          const routeProgress = (progress + rideOffsets[index]) % 1;
          const position = routeProgress < travelFraction
            ? interpolate(from.position, to.position, routeProgress / travelFraction)
            : null;

          return (
            <Fragment key={`${from.name}-${to.name}-${index}`}>
              {position && (
                <Marker
                  position={position}
                  icon={rideIcons[index]}
                  title={`Demo car traveling from ${from.name} to ${to.name}`}
                  alt={`Demo car from ${from.name} to ${to.name}`}
                />
              )}
            </Fragment>
          );
        })}
      </MapContainer>
      <div className={styles.mapLegend}>
        <span><i className={styles.cityNode} /> Community center</span>
        <span><i className={styles.campusNode} /> UH Mānoa</span>
        <span><i className={styles.directionArrow}>➤</i> Car arrow shows direction</span>
        <span><i className={styles.routeCountExample}>2</i> Example shared-route count</span>
        <span>Straight lines are sample routes</span>
      </div>
      <div className={styles.routeList} aria-label="Demo ride directions">
        {rides.map(({ from, to }, index) => (
          <div className={styles.routeItem} key={`${from.name}-${to.name}-${index}`}>
            <i className={styles.routeColor} style={{ backgroundColor: rideColors[index] }} />
            <span><strong>From:</strong> {from.name} <span aria-hidden="true">→</span> <strong>Arriving at:</strong> {to.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
