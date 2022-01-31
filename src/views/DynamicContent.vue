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
		axios;
		setTimeout(() => {
			this.denFlightsDepart = require('@/assets/flights.json');
			this.loading = false;
		}, 5000);
		// axios
		// 	.get(
		// 		`http://api.aviationstack.com/v1/flights?access_key=${process.env.VUE_APP_APIKEY}&dep_icao=KDEN`
		// 	)
		// 	.then(({ data }) => {
		// 		this.denFlightsDepart = data.data;
		// 		this.$nextTick(() => {
		// 			this.loading = false;
		// 		});
		// 	});
		// axios
		// 	.get(
		// 		`http://api.aviationstack.com/v1/flights?access_key=${process.env.VUE_APP_APIKEY}&arr_icao=KDEN`
		// 	)
		// 	.then(({ data }) => {
		// 		this.denFlightsArrive = data.data;
		// 		data;
		// 	});
	},
};
</script>

<style></style>
