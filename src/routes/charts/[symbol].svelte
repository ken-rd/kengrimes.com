<script>
	import Line from 'svelte-chartjs/src/Line.svelte';

	export let chartData;
	let dataLine = {};

	async function fetchChartData() {
		const res = await fetch(`/chart/${value}`);
		({ chartData } = await res.json());
		console.log(chartData);
	}

	function formatChartData() {
		dataLine = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: chartData.meta.symbol,
					fill: true,
					data: [65, 59, 80, 81, 56, 55, 40]
				}
			]
		};
	}
</script>

<div>
	{#if chartData}
		{formatChartData()}
		<Line data={dataLine} options={{ responsive: true }} />
	{:else}
		<p>waiting for stonk data</p>
	{/if}
</div>
