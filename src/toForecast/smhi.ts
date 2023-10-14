import type { SmhiPointForecast } from '../api/responseTypes';
import type { Forecast } from '../types';

export const toForecast = (smhiData: SmhiPointForecast): Forecast => {
	return {
		supplierName: 'SMHI',
		coordinates: {
			latitude: smhiData.geometry.coordinates[0][1],
			longitude: smhiData.geometry.coordinates[0][0]
		},
		time: new Date(smhiData.approvedTime),
		forecast: smhiData.timeSeries.map((t) => ({
			time: new Date(t.validTime),
			percipitation: {
				min: t.parameters.find((p) => p.name == 'pmin')?.values[0] || 0,
				max: t.parameters.find((p) => p.name == 'pmax')?.values[0] || 0,
				mean: t.parameters.find((p) => p.name == 'pmean')?.values[0] || 0,
				median: t.parameters.find((p) => p.name == 'pmedian')?.values[0] || 0
			},
			temperature: t.parameters.find((p) => p.name == 't')?.values[0] || 0,
			windSpeed: t.parameters.find((p) => p.name == 'ws')?.values[0] || 0,
			windDirection: t.parameters.find((p) => p.name == 'wd')?.values[0] || 0
		}))
	};
};
