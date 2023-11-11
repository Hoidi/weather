<script lang="ts">
	import type { Weather } from '../types';

	// logic goes here
	export let weather: Weather;
	export let compact = false;

	let time = weather.time.toLocaleTimeString().slice(0, -3);
</script>

<div class="cloud" class:compact>
	<div class="box">
		<div class="time">{time}</div>
		<div class="vl">&nbsp;</div>
		<div class="temp">{weather.temperature} °C</div>
		<div class="vl">&nbsp;</div>
		<div class="rain">{weather.percipitation.mean} mm</div>
	</div>
</div>

<style>
	.box {
		padding-left: 10px;
		padding-right: 10px;
		width: 90%;

		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		font-size: x-large;
		font-family: Roboto, Arial, Helvetica, sans-serif;

		display: flex;
		justify-content: space-around;
	}

	.cloud {
		height: 80px;
		background-color: white;
		--mask: linear-gradient(#000 0 0) 50% / calc(100% - 18.5px) calc(100% - 18.5px) no-repeat,
			radial-gradient(farthest-side, #000 98%, #0000) 0 0/20px 20px round;
		-webkit-mask: var(--mask);
		mask: var(--mask);
	}

	.compact {
		height: 50px;
	}

	.vl {
		width: 2px;
		background-color: rgba(62, 88, 97, 0.664);
		height: 20%;
		position: relative;
	}

	.time {
		width: fit-content;
	}
	.temp {
		width: fit-content;
	}
	.rain {
		width: fit-content;
	}
</style>
