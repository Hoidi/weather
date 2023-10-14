import { getForecast } from '../api';
import { toForecast } from '../toForecast/smhi';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	// TODO: Fetch all the different data

	// keep coordinate to 5 decimals
	const lat = 57.68013;
	const lon = 11.99678;

	const shmiReponse = await getForecast({ latitude: lat, longitude: lon });

	return {
		smhi: toForecast(shmiReponse)
	};
};
