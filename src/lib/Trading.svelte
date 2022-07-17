<script>
	import Search from 'svelte-search';
	import Chart from './Chart.svelte';
	
	let symbol = '';
	let hideLabel = true;
</script>

<div>
	<Search bind:value={symbol} {hideLabel} />
	{#if symbol}
		<Chart {symbol} />
	{/if}
</div>

<style>
	
</style>
