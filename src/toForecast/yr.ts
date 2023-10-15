import type { YrForecast } from '../api/responseTypes';
import type { Forecast } from '../types';

export const yrToForecast = (yrData: YrForecast): Forecast => {
	return {
		supplierName: 'Yr',
		coordinates: {
			latitude: yrData.geometry.coordinates[0][0],
			longitude: yrData.geometry.coordinates[0][1]
		},
		time: new Date(yrData.properties.meta.updated_at),
		forecast: yrData.properties.timeseries.map((t) => ({
			time: new Date(t.time),
			percipitation: {
				min: t.data.next_1_hours?.details.precipitation_amount_min || 0,
				max: t.data.next_1_hours?.details.precipitation_amount_max || 0,
				mean: t.data.next_1_hours?.details.precipitation_amount || 0,
				median: t.data.next_1_hours?.details.precipitation_amount || 0
			},
			temperature: t.data.instant.details?.air_temperature || 0,
			windSpeed: t.data.instant.details?.wind_speed || 0,
			windDirection: t.data.instant.details?.wind_from_direction || 0
		}))
	};
};
