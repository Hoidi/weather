<script lang="ts">
	import { emptyWeather, type Forecast, type Weather } from '../types';

	import WeatherBox from './WeatherBox.svelte';

	export let forecast: Forecast;
	export let date: Date;
	export let wholeDay = false;

	const getForecast = (hour: number): Weather => {
		return (
			forecast.forecast.find(
				(weather) => weather.time.getDate() == date.getDate() && weather.time.getHours() == hour
			) || emptyWeather()
		);
	};

	const startHour = date.getDate() == new Date().getDate() ? date.getHours() + 2 : 8;
	const updatedTime = forecast.time.toLocaleTimeString().slice(0, -3);

	const wholeDayHours = [6, 9, 12, 15, 18, 21].filter((hour) => hour >= startHour);
</script>

<div class:flipped={wholeDay}>
	<div class="forecast">
		<div class="title">
			<div class="supplierName">
				{forecast.supplierName}
			</div>
			<div class="date">
				{date.toLocaleString('sv', { month: 'long', day: 'numeric' })}
			</div>
		</div>
		<div class="weathers" class:wholeDay>
			{#if wholeDay}
				{#each wholeDayHours as hour}
					<WeatherBox compact weather={getForecast(hour)} />
				{/each}
			{:else}
				<WeatherBox weather={getForecast(startHour)} />
				{#if startHour < 17}
					<WeatherBox weather={getForecast(17)} />
				{/if}
			{/if}
		</div>
		<div class="updated">
			<div class="updatedTime">
				updated: {updatedTime}
			</div>
		</div>
	</div>
</div>

<style>
	.forecast {
		display: flex;
		justify-content: space-between;
		flex-direction: column;

		padding: 10px;
		margin: 20px;
		width: 300px;
		height: 500px;

		background-color: lightblue;
		border-radius: 10px;
		box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s;
	}

	.forecast:hover {
		transform: scale(1.03);
	}

	.title {
		margin-right: auto;
		margin-left: auto;
		width: fit-content;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		font-weight: lighter;
		line-height: 100%;

		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.supplierName {
		display: inline;
		font-size: xx-large;
		text-align: center;
	}

	.date {
		display: inline;
		font-size: large;
		text-align: center;
	}

	.weathers {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.wholeDay {
		gap: 10px;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.updated {
		width: 100%;
		text-align: right;
	}

	.updatedTime {
		font-weight: lighter;
		font-size: small;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
</style>
