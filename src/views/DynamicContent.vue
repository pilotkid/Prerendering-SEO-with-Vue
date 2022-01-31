<template>
	<div>
		<h1>Departures:</h1>
		<FlightTable :value="denFlightsDepart" :loading="loading" />
	</div>
</template>

<script>
import axios from 'axios';
import FlightTable from '../components/FlightTable.vue';
export default {
	components: { FlightTable },

	data() {
		return {
			loading: true,
			denFlightsDepart: [],
			denFlightsArrive: [],
		};
	},
	mounted() {
		axios
			.get(
				`http://api.aviationstack.com/v1/flights?access_key=${process.env.VUE_APP_APIKEY}&dep_icao=KDEN`
			)
			.then(({ data }) => {
				this.denFlightsDepart = data.data;
				this.$nextTick(() => {
					this.loading = false;
					document.dispatchEvent(new Event('render-complete'));
				});
			});
	},
};
</script>

<style></style>
