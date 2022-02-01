<template>
	<div class="about">
		<center>
			<h1>This is a page that we do not want indexed</h1>
		</center>
		<v-divider class="my-4" />
		<v-slider v-model="sliderValue" :min="1" :max="10" />
		<div v-for="(i, idx) in (1, 10)" :key="i">
			<v-card class="mb-2" v-if="i == sliderValue">
				<v-card-title> Element {{ i }} showing </v-card-title>
				<v-card-text>
					<h3>
						{{ randomWordsSequence[idx] }}
					</h3>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="sliderValue++"> Next </v-btn>
				</v-card-actions>
			</v-card>
		</div>
	</div>
</template>
<script>
export default {
	metaInfo() {
		return {
			title: 'Do not show up on search',
			meta: [
				{
					vmid: 'robots',
					name: 'robots',
					content: 'none,noindex',
				},
			],
		};
	},
	data() {
		return {
			sliderValue: 1,
			randomWordsSequence: [],
		};
	},
	created() {
		this.randomWordsSequence = require('@/assets/baconlorem.json');
	},
};
</script>
