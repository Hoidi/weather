import type { PageLoad } from '../$types';
import { getSmhiForecast, getYrForecast } from '../../api';
import { smhiToForecast, yrToForecast } from '../../toForecast';
import type { Coordinates } from '../../types';

export const load: PageLoad = async ({ fetch, url }) => {
	const coords: Coordinates = validateAndgetCoords(url);

	const shmiReponse = await getSmhiForecast(coords, fetch);
	const yrReponse = await getYrForecast(coords, fetch);

	return {
		smhi: smhiToForecast(shmiReponse),
		yr: yrToForecast(yrReponse)
	};
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
