<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { Forecast } from '../types';
	import ForecastFlippable from './ForecastFlippable.svelte';

	export let forecast: Forecast;
	let date = new Date();

	let xDistance = 0;
	const DISTANCE = 0;

	const previousDate = () => {
		if (date.getDate() === new Date().getDate()) {
			return;
		}

		xDistance = -DISTANCE;

		date.setDate(date.getDate() - 1);
		date = date;
	};
	const nextDate = () => {
		xDistance = DISTANCE;
		date.setDate(date.getDate() + 1);
		date = date;
	};
</script>

<div class="carousel">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="button left" on:click={previousDate}>
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6 12H18M6 12L11 7M6 12L11 17"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
	{#key date}
		<div class="weather">
			<!--<div
				in:fly={{ x: xDistance, duration: 200, delay: 200 }}
				out:fly={{ x: xDistance, duration: 200 }}
			>-->
			<ForecastFlippable {forecast} {date} />
			<!--</div>-->
		</div>
	{/key}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="button right" on:click={nextDate}>
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6 12H18M18 12L13 7M18 12L13 17"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
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

	.button:hover {
		transform: scale(1.1);
	}
</style>
