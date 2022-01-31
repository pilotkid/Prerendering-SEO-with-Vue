const plugins = [];

if (process.env.NODE_ENV === 'production') {
	const { join } = require('path');
	const PrerenderPlugin = require('prerender-spa-plugin');
	const renderer = PrerenderPlugin.PuppeteerRenderer;

	plugins.unshift(
		new PrerenderPlugin({
			staticDir: join(__dirname, 'dist'),
			routes: ['/noindex', '/dynamic', '/'],
			renderer: new renderer({
				injectProperty: 'isPrerendering',
				inject: true,

				renderAfterDocumentEvent: 'render-complete',
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
