<script lang="ts">
	import type { PageData } from './$types';

	import Forecast from '../components/Forecast.svelte';

	export let data: PageData;
</script>

<div class="container">
	<Forecast forecast={data.smhi} />
</div>

<style>
	.container {
		align-self: center;
		width: fit-content;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		flex-wrap: wrap;
	}
</style>
