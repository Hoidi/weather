<script lang="ts">
	import type { PageData } from './$types';
	import ForecastFlippable from '../components/ForecastFlippable.svelte';

	export let data: PageData;
</script>

<div class="container">
	{#if data.forecasts}
		<ForecastFlippable forecast={data.forecasts} />
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
