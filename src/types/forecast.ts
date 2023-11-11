import type { Coordinates } from './coordinates';

export type Forecast = {
	supplierName: string;
	coordinates: Coordinates;
	time: Date;
	forecast: Weather[];
};

export type Weather = {
	time: Date;
	percipitation: Percipitation;
	temperature: number;
	windSpeed: number;
	windDirection: number;
};

type Percipitation = {
	min: number;
	max: number;
	mean: number;
	median: number;
};

export const emptyWeather = (): Weather => {
	return {
		time: new Date(),
		percipitation: {
			min: -1,
			max: -1,
			mean: -1,
			median: -1
		},
		temperature: -1,
		windSpeed: -1,
		windDirection: -1
	};
};

export const hasForecastAtDate = (forecast: Forecast, date: Date): boolean => {
	return (
		forecast.forecast.find(
			(f) => f.time.getDate() == date.getDate() && f.time.getMonth() == date.getMonth()
		) != undefined
	);
};
