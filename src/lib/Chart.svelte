<script context="module">
	import Line from 'svelte-chartjs/src/Line.svelte';
</script>

<script>
	export let symbol = '';
	let assetData = null;
	/**
	 * @type {{ labels: string[]; datasets: { label: any; fill: boolean; data: number[]; }[]; } | null}
	 */
	let chartData = null;

	async function populateChartData() {
		assetData = await getAssetData();
		chartData = assetToChartJS(assetData);
	}

	/* Returns a promise with the asset data from yahoo finance */
	function getAssetData() {
		return fetch(`/assets/${symbol}`)
			.then((res) => res.json())
			.then(({ chartData }) => {
				assetData = chartData;
				return assetData;
			})
			.catch((e) => {
				console.log(e);
			});
	}

	/**
	 * @param {*} assetData
	 */
	function assetToChartJS(assetData) {
		console.log('converting asset to chart');
		console.log(assetData);
		const chartJSFormatted = {
			labels: assetData.quotes.map((/** @type {{ date: any; }} */ quote) =>
				new Date(quote.date).toLocaleDateString('en-US', {
					month: 'numeric',
					year: 'numeric',
					hour12: true
				})
			),
			datasets: [
				{
					label: assetData.meta.symbol,
					fill: false,
					data: assetData.quotes.map((/** @type {{ close: any; }} */ quote) => quote.close),
					pointRadius: 1
				}
			]
		};
		return chartJSFormatted;
	}
</script>

<!--component to fetch, format, load into generic chart implementation. 
    But chart implementations arent generic so, what would be the contract
	  for interacting with -->

<div>
	{#if symbol}
		<button class="button-41" on:click={populateChartData}> fetch stonk chart data </button>
	{/if}
	{#await chartData then}
		<Line data={chartData} options={{ responsive: true }} />
	{:catch}
		<p>waiting for stonk data</p>
	{/await}
</div>
