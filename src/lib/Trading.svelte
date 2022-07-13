<script>
	import Search from 'svelte-search';
	import Chart from '../routes/charts/[symbol].svelte'

	let value = '';
	let hideLabel = true;
	$: symbol = value;
	/**
	 * @type {*}
	 */
	let symbolData;

	function logSymbol() {
		console.log(symbol);
	}
</script>

<div>
	<Search bind:value debounce={100} {hideLabel} />
	{#if value}
		<button class="button-41" on:click={logSymbol}> fetch stonk chart data </button>
	{/if}
	{#await symbolData}
		<p>choose a stonk</p>
	{:then}
		<Chart chartData={symbolData} />
	{:catch}
		alert('error getting chart data')
	{/await}
</div>

<style>
	/* CSS */
	.button-41 {
		background-color: initial;
		background-image: linear-gradient(-180deg, #00d775, #00bd68);
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
		color: #ffffff;
		cursor: pointer;
		display: inline-block;
		font-family: Inter, -apple-system, system-ui, Roboto, 'Helvetica Neue', Arial, sans-serif;
		height: 44px;
		line-height: 44px;
		outline: 0;
		overflow: hidden;
		padding: 0 20px;
		pointer-events: auto;
		position: relative;
		text-align: center;
		touch-action: manipulation;
		user-select: none;
		-webkit-user-select: none;
		vertical-align: top;
		white-space: nowrap;
		width: 100%;
		z-index: 9;
		border: 0;
	}

	.button-41:hover {
		background: #00bd68;
	}
</style>
