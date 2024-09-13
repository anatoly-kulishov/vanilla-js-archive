import { load } from '@2gis/mapgl';
import { Map as TMap } from '@2gis/mapgl/types';
import { Clusterer } from '@2gis/mapgl-clusterer';
import { useEffect, useState } from 'react';
import { MapWrapper } from './MapWrapper';
import styles from './Map.module.scss';
import { CORDS, MAP_API_KEY, ZOOM } from './const';
import locationIcon from '../../ui/icon/assets/images/location.svg';
import mapCircle from '../../ui/icon/assets/images/mapCircle.svg';
import { CityBranch, ICity } from '../..';

type Mapgl = typeof import('@2gis/mapgl/types/index');

interface Props {
  cityBranches?: CityBranch[] | null;
  currentCity?: ICity;
}

export const Map = ({ cityBranches, currentCity }: Props) => {
  const [mapgl, setMapgl] = useState<Mapgl>();
  const [map, setMap] = useState<TMap>();
  const [clusterer, setClusterer] = useState<Clusterer>();

  const markers = cityBranches?.map(({ branchLongitude, branchLatitude }) => ({
    coordinates: [+branchLongitude, +branchLatitude],
    icon: locationIcon,
    size: [48, 48],
  }));

  useEffect(() => {
    load().then(setMapgl);

    return () => {
      clusterer && clusterer.destroy();
      map && map.destroy();
    };
  }, []);

  useEffect(() => {
    if (mapgl) {
      const cords = CORDS.find(([city]) => currentCity?.cityName === city)?.[1];

      setMap(
        new mapgl.Map('map-container', {
          center: (cords && [...cords].reverse()) || [37.615306, 55.755606],
          zoom: ZOOM,
          key: MAP_API_KEY,
          zoomControl: false,
        }),
      );
    }
  }, [mapgl]);

  useEffect(() => {
    if (map)
      setClusterer(
        new Clusterer(map, {
          radius: 120,
          clusterStyle: {
            icon: mapCircle,
            size: [48, 48],
            labelColor: '#001A34',
            labelFontSize: 20,
          },
        }),
      );
  }, [map]);

  useEffect(() => {
    if (clusterer && markers) {
      clusterer.load(markers);
    }
  }, [clusterer, markers]);

  useEffect(() => {
    const cords = CORDS.find(([city]) => currentCity?.cityName === city)?.[1];
    if (cords && map) {
      map.setCenter([...cords].reverse());
      map.setZoom(ZOOM);
    }
  }, [currentCity, map]);

  return (
    <div className={styles['map']}>
      <MapWrapper />
    </div>
  );
};
