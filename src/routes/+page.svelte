<script lang="ts">
	import type { PageData } from './$types';
	import WeatherCarousel from '../components/WeatherCarousel.svelte';

	export let data: PageData;
</script>

<div class="container">
	{#if data.forecasts}
		<WeatherCarousel forecast={data.forecasts} />
	{:else}
		Error :(
	{/if}
</div>

<style>
	:global(body) {
		background-color: rgb(57, 67, 74);
	}

	.container {
		perspective: 600;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		flex-direction: row;
		justify-content: space-around;
		gap: 30px;
	}
</style>
