export type YrForecast = {
	geometry: Geometry;
	properties: Forecast;
	type: string;
};

type Geometry = {
	type: string;
	coordinates: [number, number, number][];
};

type Forecast = {
	meta: InlineModel;
	timeseries: Timeseries[];
};

type InlineModel = {
	unit: ForecastUnits;
	updated_at: string;
};

type ForecastUnits = {
	air_pressure_at_sea_level?: string;
	air_temperature?: string;
	air_temperature_max?: string;
	air_temperature_min?: string;
	cloud_area_fraction?: string;
	cloud_area_fraction_high?: string;
	cloud_area_fraction_low?: string;
	cloud_area_fraction_medium?: string;
	dew_point_temperature?: string;
	fog_area_fraction?: string;
	precipitation_amount?: string;
	precipitation_amount_max?: string;
	precipitation_amount_min?: string;
	probability_of_precipitation?: string;
	probability_of_thunder?: string;
	relative_humidity?: string;
	ultraviolet_index_clear_sky_max?: string;
	wind_from_direction?: string;
	wind_speed?: string;
	wind_speed_of_gust?: string;
};

type Timeseries = {
	data: Inline_model_0;
	time: string;
};

type Inline_model_0 = {
	instant: { details?: ForecastTimeInstant };
	next_1_hours?: { details: ForecastTimePeriod };
	next_6_hours?: { details: ForecastTimePeriod };
	next_12_hours?: { details: ForecastTimePeriod };
};

type ForecastTimeInstant = {
	air_pressure_at_sea_level?: number;
	air_temperature?: number;
	cloud_area_fraction?: number;
	cloud_area_fraction_high?: number;
	cloud_area_fraction_low?: number;
	cloud_area_fraction_medium?: number;
	dew_point_temperature?: number;
	fog_area_fraction?: number;
	relative_humidity?: number;
	wind_from_direction?: number;
	wind_speed?: number;
	wind_speed_of_gust?: number;
};

type ForecastTimePeriod = {
	air_temperature_max?: number;
	air_temperature_min?: number;
	precipitation_amount?: number;
	precipitation_amount_max?: number;
	precipitation_amount_min?: number;
	probability_of_precipitation?: number;
	probability_of_thunder?: number;
	ultraviolet_index_clear_sky_max?: number;
};
