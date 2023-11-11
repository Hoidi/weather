import type { Coordinates } from '../types';
import type { SmhiPointForecast } from './responseTypes';

const base = 'https://opendata-download-metfcst.smhi.se';

export const getSmhiForecast = async (
	coordinates: Coordinates,
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>
): Promise<SmhiPointForecast> => {
	const requestString = `/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.longitude}/lat/${coordinates.latitude}/data.json`;

	const response = fetch(base + requestString).then((response) => {
		if (!response.ok) {
			throw new Error(response.status + ': ' + response.statusText);
		}

		return response.json() as Promise<SmhiPointForecast>;
	});

	return response;
};
