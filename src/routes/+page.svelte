<script lang="ts">
	import type { PageData } from './$types';

	import Forecast from '../components/Forecast.svelte';

	export let data: PageData;
</script>

<div class="container">
	{#if data.forecasts}
		<Forecast forecast={data.forecasts} />
	{:else}
		Error :(
	{/if}
</div>

<style>
	.container {
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
