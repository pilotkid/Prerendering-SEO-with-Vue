<template>
	<div class="about">
		<center>
			<h1>This is a page that we do not want indexed</h1>
		</center>
		<v-divider class="my-4" />
		<v-slider v-model="sliderValue" :min="1" :max="10" />
		<div v-if="isPrerendering">
			<p v-for="i in randomWordsSequence" :key="i">
				{{ i }}
			</p>
		</div>
		<div v-else>
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
	</div>
</template>
<script>
export default {
	data() {
		return {
			sliderValue: 1,
			randomWordsSequence: [],
		};
	},
	computed: {
		isPrerendering() {
			return window && window.isPrerendering;
		},
	},
	created() {
		this.randomWordsSequence = require('@/assets/baconlorem.json');
	},
	mounted() {
		this.$nextTick(() => {
			document.dispatchEvent(new Event('render-complete'));
		});
	},
};
</script>
