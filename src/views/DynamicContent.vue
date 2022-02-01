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
	metaInfo() {
		return {
			title: 'Flights out of Denver',
			meta: [
				{
					vmid: 'description',
					name: 'description',
					content:
						'This is a list of all the flights coming out of denver Today.',
				},
				{
					name: 'keywords',
					content:
						'DIA, Denver airport, Denver International, Flight status, all flights, united, american, frontier',
				},
				{
					vmid: 'robots',
					name: 'robots',
					content: 'all',
				},
			],
		};
	},
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
				});
			});
	},
};
</script>

<style></style>
