export type SmhiPointForecast = {
	approvedTime: string;
	referenceTime: string;
	geometry: Geometry;
	timeSeries: TimeSeries[];
};

type Geometry = {
	type: string;
	coordinates: [number, number][];
};

type TimeSeries = {
	validTime: string;
	parameters: Parameters[];
};

type Parameters = {
	name: string;
	levelType: string;
	level: number;
	unit: string;
	values: [number];
};
