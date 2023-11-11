<script lang="ts">
	import Forecast from '../../components/Forecast.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let date = new Date();
</script>

<div class="container">
	<Forecast forecast={data.smhi} {date} />
	<Forecast forecast={data.yr} {date} />
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
