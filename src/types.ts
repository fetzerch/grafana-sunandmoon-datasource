import { DataSourceJsonData } from '@grafana/data';
import { DataQuery } from '@grafana/schema';

export const sunAndMoonMetrics: any = {
  moon_illumination: {
    title: 'Moon illumination',
    text: 'Percentage of the moon illuminated by the sun (0.0 - 1.0)',
    config: { unit: 'percentunit', decimals: 0 },
  },
  moon_altitude: {
    title: 'Moon altitude',
    text: 'Height of the moon in degrees (-90 - 90)',
    config: { unit: 'degree', min: 0 },
  },
  moon_azimuth: {
    title: 'Moon azimuth',
    text: 'Direction of the moon along the horizon in degrees (0 - 360)',
    config: { unit: 'degree' },
  },
  moon_distance: {
    title: 'Moon distance',
    text: 'Distance to the moon in kilometers',
    config: { unit: 'lengthkm', decimals: 0 },
  },
  sun_altitude: {
    title: 'Sun altitude',
    text: 'Height of the sun in degrees (-90 - 90)',
    config: { unit: 'degree', min: 0 },
  },
  sun_azimuth: {
    title: 'Sun azimuth',
    text: 'Direction of the sun along the horizon in degrees (0 - 360)',
    config: { unit: 'degree' },
  },
  sun_maximum_altitude: {
    title: 'Maximum sun altitude of the day',
    text: 'Maximum height of the sun of the day (at solar noon) in degrees (-90 - 90)',
    config: { unit: 'degree', min: 0 },
  },
};

export const sunAndMoonAnnotations: any = {
  sunrise: {
    title: 'Sunrise',
    text: 'Top edge of the sun appears on the horizon',
    tags: ['sun'],
  },
  sunriseEnd: {
    title: 'Sunrise ends',
    text: 'Bottom edge of the sun touches the horizon',
    tags: ['sun'],
  },
  goldenHourEnd: {
    title: 'Morning golden hour ends',
    text: 'Soft light, best time for photography',
    tags: ['sun'],
  },
  solarNoon: {
    title: 'Solar noon',
    text: 'Sun is in the highest position',
    tags: ['sun'],
  },
  goldenHour: {
    title: 'Evening golden hour starts',
    text: 'Soft light, best time for photography',
    tags: ['sun'],
  },
  sunsetStart: {
    title: 'Sunset starts',
    text: 'Bottom edge of the sun touches the horizon',
    tags: ['sun'],
  },
  sunset: {
    title: 'Sunset',
    text: 'Sun disappears below the horizon, evening civil twilight starts',
    tags: ['sun'],
  },
  dusk: {
    title: 'Dusk',
    text: 'Evening nautical twilight starts',
    tags: ['sun'],
  },
  nauticalDusk: {
    title: 'Nautical dusk',
    text: 'Evening astronomical twilight starts',
    tags: ['sun'],
  },
  night: {
    title: 'Night starts',
    text: 'Dark enough for astronomical observations',
    tags: ['sun'],
  },
  nadir: {
    title: 'Nadir',
    text: 'Darkest moment of the night, sun is in the lowest position',
    tags: ['sun'],
  },
  nightEnd: {
    title: 'Night ends',
    text: 'Morning astronomical twilight starts',
    tags: ['sun'],
  },
  nauticalDawn: {
    title: 'Nautical dawn',
    text: 'Morning nautical twilight starts',
    tags: ['sun'],
  },
  dawn: {
    title: 'Dawn',
    text: 'Morning nautical twilight ends, morning civil twilight starts',
    tags: ['sun'],
  },
  moonrise: {
    title: 'Moonrise',
    text: 'Top edge of the moon appears on the horizon',
    tags: ['moon'],
  },
  moonset: {
    title: 'Moonset',
    text: 'Moon disappears below the horizon',
    tags: ['moon'],
  },
  noon: {
    title: 'Noon',
    text: "12 o'clock in the daytime",
    tags: ['time'],
  },
  midnight: {
    title: 'Midnight',
    text: "12 o'clock in the night",
    tags: ['time'],
  },
};

export interface SunAndMoonQuery extends DataQuery {
  target?: string[];
  latitude?: string;
  longitude?: string;
}

export const sunAndMoonDefaultQuery: Partial<SunAndMoonQuery> = {
  target: ['moon_illumination'],
};

export interface SunAndMoonDataSourceOptions extends DataSourceJsonData {
  latitude?: number;
  longitude?: number;
}
