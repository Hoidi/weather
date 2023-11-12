import { getSmhiForecast, getYrForecast } from '../api';
import { smhiToForecast, yrToForecast } from '../toForecast';
import type { Coordinates, Forecast, Weather } from '../types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const coords: Coordinates = validateAndgetCoords(url);

	const shmiRequest = getSmhiForecast(coords, fetch);
	const yrRequest = getYrForecast(coords, fetch);

	return {
		forecasts: unifyForecasts([smhiToForecast(await shmiRequest), yrToForecast(await yrRequest)])
	};
};

const unifyForecasts = (forecasts: Forecast[]): Forecast | undefined => {
	if (forecasts.length <= 0) {
		return;
	}

	const times = getAllTimes(forecasts);

	return {
		supplierName: 'Weather',
		coordinates: forecasts[0].coordinates,
		time: forecasts[0].time,
		forecast: times.map((t) => getAverageWeather(t, forecasts))
	};
};

const getAverageWeather = (time: Date, forecasts: Forecast[]): Weather => {
	const weathers: Weather[] = [];

	forecasts.forEach((forecast) => {
		const forecastsForGivenTime = forecast.forecast.filter(
			(a) => a.time.getTime() == time.getTime()
		);

		if (forecastsForGivenTime.length >= 1) {
			weathers.push(forecastsForGivenTime[0]);
			return;
		}
	});

	return {
		time: time,
		percipitation: {
			min: getAvg(weathers.map((w) => w.percipitation.min)),
			max: getAvg(weathers.map((w) => w.percipitation.max)),
			mean: getAvg(weathers.map((w) => w.percipitation.mean)),
			median: getAvg(weathers.map((w) => w.percipitation.median))
		},
		temperature: getAvg(weathers.map((w) => w.temperature)),
		windSpeed: getAvg(weathers.map((w) => w.windSpeed)),
		windDirection: getAvg(weathers.map((w) => w.windDirection))
	};
};

const getAllTimes = (forecasts: Forecast[]): Date[] => {
	const allTimes = new Set<number>();

	forecasts.forEach((forecast) =>
		forecast.forecast.forEach((weather) => allTimes.add(weather.time.getTime()))
	);

	return Array.from(allTimes)
		.sort()
		.map((unix) => new Date(unix));
};

const getAvg = (list: number[], precision: number = 1): number => {
	if (list.length <= 0) {
		return -1;
	}

	return Number((list.reduce((sum, current) => sum + current) / list.length).toFixed(precision));
};

const validateAndgetCoords = (url: URL): Coordinates => {
	const latString = url.searchParams.get('lat') || '';
	const lonString = url.searchParams.get('lon') || '';

	let latNum = parseFloat(latString);
	let lonNum = parseFloat(lonString);

	if (isNaN(latNum)) {
		latNum = 57.6969;
	}
	if (isNaN(lonNum)) {
		lonNum = 11.9994;
	}

	// keep coordinate to 4 decimals, otherwise yr gets angry
	return {
		latitude: parseFloat(latNum.toFixed(4)),
		longitude: parseFloat(lonNum.toFixed(4))
	};
};
