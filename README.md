# Pre-rendering

## Configure

First we need to install the pre-rendering library.
```
npm i prerender-spa-plugin --save-dev
```

Then we need to configure webpack to use the pre-rendering library. I personally like to setup my plugins externally from the webpack config section, so I will use a variable called `plugins` to store the plugins.

```js
const plugins = [];
```

We will then configure webpack to use the plugin. By modifying the `module.exports` to `configureWebpack`.

```js
module.exports = {
	transpileDependencies: ['vuetify'],
	configureWebpack(config) {
		config.plugins = [...config.plugins, ...plugins];
	},
};
```
or
```js

module.exports = {
	transpileDependencies: ['vuetify'],
	configureWebpack:{
        plugins
    }
};
```
Depending on your preference.

---

Now we can create and configure the plugin, if we are in production.

```js
if (process.env.NODE_ENV === 'production') {
	// Only import when needed
    const { join } = require('path');
	const PrerenderPlugin = require('prerender-spa-plugin');
	const renderer = PrerenderPlugin.PuppeteerRenderer;

    //Add the prerender plugin to the plugins array
	plugins.unshift(
		new PrerenderPlugin({
			staticDir: join(__dirname, 'dist'), //Vue's build folder
			routes: ['/'], //Only render the homepage
			renderer: new renderer({}), //Configure the renderer with all default options
		})
	);
}
```

Now we can test to see if the plugin is working.

```
npm run build
```

---

## Checking to see if it worked

To see if it worked we can either check the output of the `dist` folder or we can look at our network tab in the browser.

### Check `dist` folder
Since `/` is the same as `/dist/index.html` we can check to see if there is anything under `<div id="app"></div>` if there is it worked! Otherwise we need to go back and check our configuration.

---

### Inspect browser

Since we are in development, we need to first setup an HTTP environment. We can use the npm package `http-server` to do this.

```
npm i -g http-server
```

Then we can run the server by calling

```
http-server ./dist
```

Now we can open the browser, and goto the URL provided.

Once there, open the network tab, and reload. Make sure you have the filter set to `doc`
![image](https://user-images.githubusercontent.com/6385285/151892365-a1e467b8-4ad1-4324-9404-1920e1341aab.png)
![image](https://user-images.githubusercontent.com/6385285/151892718-2674566f-2bc6-464e-8e6f-871f8ee68eec.png)

__Note:__ You will need to reload to get a fresh copy of the document.

---

## Waiting for asynchronous data / server request

There are two ways to wait for data to be loaded. The first is to wait a certain amount of time before capturing the render, however this method is not recommended. The second is to wait for a document event, which is the recommended way, and is also my preferred method. However, the downside to this approach is that it will require you to add a line of code to every page you want pre-rendered.

### Wait `x` milliseconds before capturing the render

We will need to modify our pre-renderer plugin's renderer to wait `x` milliseconds before capturing the render. By setting the `renderAfterTime` property.
```js
//Add the prerender plugin to the plugins array
plugins.unshift(
    new PrerenderPlugin({
        staticDir: join(__dirname, 'dist'), //Vue's build folder
        routes: ['/'], //Only render the homepage
        renderer: new renderer({
            renderAfterTime: 5 * 1000, //Wait 5 second before capturing the render
        }),
    })
);
```

---

### Wait for the document event

First we need to modify our pre-renderer plugin's renderer to wait for the document event. By setting the `renderAfterDocumentEvent` property to be the name of the event we are waiting for.

```js
plugins.unshift(
    new PrerenderPlugin({
        staticDir: join(__dirname, 'dist'), //Vue's build folder
        routes: ['/'], //Only render the homepage
        renderer: new renderer({
            renderAfterDocumentEvent: 'render-complete', //Wait for render-complete before capturing the render
        }),
    })
);
```

Now we need to configure the views that will be pre-rendered to emit the `render-complete` event. I suggest you only do this in or after the `mounted` lifecycle hook, and after `$nextTick`.

We do this by dispatching a document event like so

```js
document.dispatchEvent(new Event('render-complete'));
```

For example if we wanted to wait for the API to load the message we would do this:
```vue
<template>
 <div>
   {{ message }}
 </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            message: null,
        }
    },
    mounted() {
        axios.get('/api/message').then(response => {
            this.message = response.data;

            //Wait for vue to reload the DOM
            this.$nextTick(()=>{
                //Notify renderer that we are ready for a snapshot
                document.dispatchEvent(new Event('render-complete'));
            })
        });
    },
}
</script>
```
---
## Pre-render different content

Let's say that for some reason you need to prerender your pages differently to maximize SEO performance. You can do this by adding an injected property into the window and check to see if it is set to `true`. Then you can change the way your content is loaded.

### Configure the renderer
First, we need to configure our plugin to add an inject property by setting `injectProperty` to be the name of the property to be injected. Then we need to set the value of that property, in this case I am just going to set it to true. By setting `inject` to be `true`.

```js
plugins.unshift(
    new PrerenderPlugin({
        staticDir: join(__dirname, 'dist'), //Vue's build folder
        routes: ['/'], //Only render the homepage
        renderer: new renderer({
            injectProperty: 'isPrerender', //Inject a property into the window
			inject: true // Set the property to true
        }),
    })
);
```

### Configure the view
Now we need to configure the view to check to see if the property is set to true. If it is, we will load the pre-rendered content. You will need to create a computed property that returns `window.isPrerender` and then use that in your template. I personally like to also make sure the `window` object is there first by using `window && window.isPrerender`, since I have had issues in the past.
```vue
<template>
 <div>
   <v-slider v-model="e1" min="1" max="4" />
   <div v-for="(message, idx) in messages" :key="idx">
    <!-- Show all objects if isPrerender is true -->
    <p v-if="isPrerender"> {{message}} </p>
    <p v-else-if="e1 == idx+1"> {{message}} </p>
   </div>
 </div>
</template>
<script>

export default {
    data() {
        return {
            e1: 0,
            messages: ['Hi', 'Hello', 'Hey', 'Howdy'],
        }
    },
    computed:{
        isPrerender() {
            return window && window.isPrerender;
        }
    }
}
</script>
```
---
## Debugging the pre-rendering process

Sometimes thing do not go as expected. For example, if you are pre-rendering a page and you are not getting the correct content, you can modify the render's properties to see what is happening.

First thing I always do is set `headless` to `false` so that I can see the browser window.
Next, I disable `renderAfterDocumentEvent` and replace it with `renderAfterTime`. This will allow me to see the render process.
I also set the first route in `routes` to be the route I am debugging.
Finally I set `maxConcurrentRoutes` to 1 so that I can see the render process. in real time.

```js
plugins.unshift(
    new PrerenderPlugin({
        staticDir: join(__dirname, 'dist'), //Vue's build folder
        routes: ['/noindex','/'], //Render noindex first since I am having trouble with it
        renderer: new renderer({
            headless: false, //Show the browser window
            renderAfterTime: 1 * 60 * 60 * 1000, //Wait 1 hour before capturing the render
            maxConcurrentRoutes: 1, //Render in real time
            // renderAfterDocumentEvent: 'render-complete', //Disable this since I am debugging
        }),
    })
);
```

Now when I run
```
npm run build
```
I will see a chromium window appear with my site's content. I can interact with the console, and see the render process. Once I am satisfied I remove all the debugging code and run the build again.