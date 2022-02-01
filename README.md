# Implementing SEO

SEO is a very important part of any website. It is a way to make sure that your website is indexed by search engines and is easily found. In this tutorial we will implement SEO on our website using `vue-meta`.

## Configuration
See the offical guide on [vue-meta](https://vue-meta.nuxtjs.org/guide/) for more information.

First, we need to install vue-meta
```
npm i --save vue-meta
```

Next, we need to configure our app to use vue-meta. We will do this by adding the following to our `main.js` file:

```js
import VueMeta from 'vue-meta'
Vue.use(VueMeta)
```

Next we will need to define our default meta tags. We will do this by adding the following to our `app.vue` file:

```js
metaInfo() {
    return {
        title: 'SEO Demo',
        meta: [
            {
                vmid: 'description',
                name: 'description',
                content:
                    'This is a demo site that shows off pre-rendering and SEO with vue.',
            },
            {
                name: 'keywords',
                content:
                    'vue, prerendering, seo, optimization, seo optimization, vue seo, vue seo optimization',
            },
            {
                vmid: 'robots',
                name: 'robots',
                content: 'all',
            },
        ],
    };
},
```

On any route in which we wish to modify the metadata we can do so by adding the following to any vue file in `/views/` file:

```js
metaInfo() {
    return {
        title: 'A new page',
        meta: [
            {
                vmid: 'description',
                name: 'description',
                content:
                    'This will be the description for the new page.',
            },
            {
                name: 'keywords',
                content:
                    'not, from, app.vue',
            },
            {
                vmid: 'robots',
                name: 'robots',
                content: 'deny',
            },
        ],
    };
},
```

By specifying `vmid` in the meta tag we can use the `vmid` property to specify a unique id for the meta tag. This is useful if we wish to modify the meta tag later on. Or ensure that the meta tag is only rendered once.

The `robots` meta tag is a special case. It is used to specify the robots that should be allowed to crawl the page. The value can be `all`, `noindex`, `nofollow`, or `none`. For more information see the official [Google documentation](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag).