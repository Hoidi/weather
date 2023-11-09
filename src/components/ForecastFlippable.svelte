<script lang="ts">
	import type { Forecast as ForecastType } from '../types';
	import Forecast from './Forecast.svelte';

	export let forecast: ForecastType;
	export let date: Date;

	let flipped = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card" class:flip-it={flipped} on:click={(e) => (flipped = !flipped)}>
	<Forecast {forecast} {date} wholeDay={flipped} />
</div>

<style>
	.card {
		width: fit-content;
		height: fit-content;
		position: relative;
		perspective: 1000px;
		transition: transform 0.4s;
	}

	.flip-it {
		transform: rotateY(180deg);
		transform-style: preserve-3d;
	}
</style>
