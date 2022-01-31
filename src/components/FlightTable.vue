<template>
	<v-data-table
		:headers="headers"
		:items="value"
		:items-per-page="-1"
		:loading="loading"
	>
		<template #item.airline.icao="{ item }">
			<span> {{ item.airline.name }} ({{ item.airline.icao }}) </span>
		</template>

		<template #item.departure.estimated="{ item }">
			<span>
				{{ item.departure.estimated | formatDate }}
			</span>
		</template>
		<template #item.departure.scheduled="{ item }">
			<span>
				{{ item.departure.scheduled | formatDate }}
			</span>
		</template>

		<template #item.arrival.estimated="{ item }">
			<span>
				{{ item.departure.estimated | formatDate }}
			</span>
		</template>
		<template #item.arrival.scheduled="{ item }">
			<span>
				{{ item.departure.scheduled | formatDate }}
			</span>
		</template>

		<template #item.flight_status="{ item }">
			<div>
				<span v-if="item.flight_status === 'scheduled'">
					<v-icon small>mdi-airplane-clock</v-icon>
					Scheduled
				</span>
				<span v-else-if="item.flight_status === 'cancelled'">
					<v-icon small color="red">mdi-airplane-off</v-icon>
					Cancelled
				</span>
				<span
					v-else-if="
						item.flight_status === 'incident' ||
						item.flight_status === 'diverted'
					"
				>
					<v-icon small color="orange">mdi-airplane-alert</v-icon>
					{{ item.flight_status | upperFirst }}
				</span>
				<span v-else-if="item.flight_status === 'landed'">
					<v-icon small color="green">mdi-airplane-landing</v-icon>
					Landed
				</span>
				<span v-else-if="item.flight_status === 'active'">
					<v-icon small color="green">mdi-airplane</v-icon>
					In Flight
				</span>
				<span v-else>
					{{ item.flight_status | upperFirst }}
				</span>
			</div>
		</template>
	</v-data-table>
</template>

<script>
import dayjs from 'dayjs';
export default {
	filters: {
		upperFirst(value) {
			return value.charAt(0).toUpperCase() + value.slice(1);
		},
		formatDate(value) {
			//with time
			return dayjs(value).format('MMM DD, YYYY hh:mm A');
		},
	},
	props: {
		value: {
			type: Array,
			default: () => ({}),
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			headers: [
				{
					text: 'Airline',
					value: 'airline.icao',
				},
				{
					text: 'Flight',
					value: 'flight.number',
				},
				{
					text: 'Status',
					value: 'flight_status',
				},
				{
					text: 'Departure',
					value: 'departure.icao',
				},
				{
					text: 'Arrival',
					value: 'arrival.icao',
				},
				{
					text: 'Departure Time',
					value: 'departure.scheduled',
				},
				{
					text: 'Departure Time (estimated)',
					value: 'departure.estimated',
				},
				{
					text: 'Arrival Time',
					value: 'arrival.scheduled',
				},
				{
					text: 'Arrival Time (estimated)',
					value: 'arrival.estimated',
				},
				{
					text: 'Registration',
					value: 'aircraft.registration',
				},
			],
		};
	},
};
</script>

<style></style>
