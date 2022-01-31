const plugins = [];

if (process.env.NODE_ENV === 'production') {
	const { join } = require('path');
	const PrerenderPlugin = require('prerender-spa-plugin');
	const renderer = PrerenderPlugin.PuppeteerRenderer;

	plugins.unshift(
		new PrerenderPlugin({
			staticDir: join(__dirname, 'dist'),
			routes: ['/dynamic', '/'],
			renderer: new renderer({
				renderAfterDocumentEvent: 'render-complete',
				headless: false,
				// renderAfterTime: 5 * 60 * 60 * 1000,
				maxConcurrentRoutes: 1,
			}),
		})
	);
}

module.exports = {
	transpileDependencies: ['vuetify'],
	configureWebpack(config) {
		config.plugins = [...config.plugins, ...plugins];
	},
};
