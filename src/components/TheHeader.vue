<template>
	<div>
		<v-app-bar elevation="0" dense color="transparent" scroll-off-screen>
			<v-toolbar-title class="headline">
				<span class="green--text">Prerender &amp; SEO with Vue</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn text to="/" active-class="green--text headline">Home</v-btn>
				<v-btn text to="/dynamic" active-class="green--text headline">
					Dynamic
				</v-btn>
				<v-btn text to="/noindex" active-class="green--text headline">
					No-index
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	props: {
		goDark: {
			type: Boolean,
		},
	},
	data() {
		return {
			drawer: null,
		};
	},
	methods: {
		changeTheme() {
			this.$emit('changeTheme', this.goDark);
		},
	},
};
</script>

<style></style>
