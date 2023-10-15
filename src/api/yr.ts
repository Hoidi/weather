import type { Coordinates } from '../types';
import type { YrForecast } from './responseTypes';

const base = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';

export const getYrForecast = async (coordinates: Coordinates): Promise<YrForecast> => {
	const requestString = `?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;

	const response = fetch(base + requestString).then((response) => {
		if (!response.ok) {
			throw new Error(response.status + ': ' + response.statusText);
		}

		return response.json() as Promise<YrForecast>;
	});

	return response;
};
