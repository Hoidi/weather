<script lang="ts">
	import { hasForecastAtDate, type Forecast } from '../types';
	import ForecastFlippable from './ForecastFlippable.svelte';

	export let forecast: Forecast;
	let date = new Date();

	const previousDate = () => {
		const yesterdayDate = yesterday(date);
		if (!hasForecastAtDate(forecast, yesterdayDate)) {
			return;
		}
		date = yesterdayDate;
	};
	const nextDate = () => {
		const tomorrowDate = tomorrow(date);
		if (!hasForecastAtDate(forecast, tomorrowDate)) {
			return;
		}
		date = tomorrowDate;
	};

	const tomorrow = (date: Date): Date => {
		const tomorrow = new Date(date.getTime());
		tomorrow.setDate(date.getDate() + 1);
		return tomorrow;
	};
	const yesterday = (date: Date): Date => {
		const yesterday = new Date(date.getTime());
		yesterday.setDate(date.getDate() - 1);
		return yesterday;
	};
</script>

<div class="carousel">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="button left"
		class:buttonHover={hasForecastAtDate(forecast, yesterday(date))}
		on:click={previousDate}
	>
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6 12H18M6 12L11 7M6 12L11 17"
				stroke={'#000000' + (hasForecastAtDate(forecast, yesterday(date)) ? 'FF' : '55')}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
	{#key date}
		<div class="weather">
			<ForecastFlippable {forecast} {date} />
		</div>
	{/key}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="button right"
		class:buttonHover={hasForecastAtDate(forecast, tomorrow(date))}
		on:click={nextDate}
	>
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			{#key date}
				<path
					d="M6 12H18M18 12L13 7M18 12L13 17"
					stroke={'#000000' + (hasForecastAtDate(forecast, tomorrow(date)) ? 'FF' : '55')}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			{/key}
		</svg>
	</div>
</div>

<style>
	.carousel {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}

	.weather {
		position: relative;
		max-width: 350px;
		width: 350px;
		z-index: 2;
	}

	.button {
		position: relative;
		z-index: 1;
		height: 50px;
		width: 50px;

		transition: transform 0.3s;
	}

	.buttonHover:hover {
		transform: scale(1.2);
	}
</style>
