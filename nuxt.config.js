const errortracky = require('errortracky')('123');
const path = require('path');
const sander = require('sander');
require('dotenv').config({
  silent: true
});

let package = JSON.parse(sander.readFileSync('./package.json'));

module.exports = {
  serverMiddleware:[
    { path: '/webhooks/errortracky', handler: errortracky.nuxtWebhookMiddleware() },
  ],
  /*
   ** Headers of the page
   */
  head: {
    title: 'JavaScript Error Tracking',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'description',
      content: 'Real-time error tracking for Javascript. Fix and prevent javascript errors.'
    }, {
      hid: 'og:description',
      name: 'og:description',
      content: 'Real-time error tracking for Javascript. Fix and prevent javascript errors.'
    }, {
      hid: `og:image`,
      property: 'og:image',
      content: `/img/logo_1200x630.jpg`
    }],
    link: [
      /*{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico?v3'
          }*/
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.8/css/all.css'
      }, {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat|Gaegu'
      }, {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'
      }
    ],
    script: [{
      src: 'https://cdnjs.cloudflare.com/ajax/libs/rellax/1.6.2/rellax.min.js'
    }, {
      src: 'https://js.stripe.com/v3/'
    }, {
      src: 'https://www.gstatic.com/firebasejs/4.12.1/firebase.js'
    },{
      src:"https://code.jquery.com/jquery-3.2.1.slim.min.js"
    },{
      src:"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  modules: [
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt',
    '@nuxtjs/font-awesome', ['nuxt-sass-resources-loader', {
      resources: path.join(process.cwd(), 'assets/scss/main.scss')
    }],
    ['~/modules/analytics', {}]
  ],
  analytics:{
      fb: true,
      ga: true,
      mixins: {}
    },
  env: {
    ANALYTICS_GA_UA_ID: process.env.ANALYTICS_GA_UA_ID || 'UA-60303213-8',
    ANALYTICS_FB_PAGE_ID: process.env.ANALYTICS_FB_PAGE_ID || '172735413543583',
    ANALYTICS_FB_APP_ID: process.env.ANALYTICS_FB_APP_ID || '1958620154410063',
    ANALYTICS_APP_VERSION: package.version,
    appName: package.name,
    appVersion: package.version,
    FIREBASE_KEY: process.env.FIREBASE_KEY || '',
    basicAuthPassword: process.env.basicAuthPassword || 'secret',
    RPC_ENDPOINT: process.env.RPC_ENDPOINT || 'http://localhost:3002/',
    nuxtHome: process.env.NUXTHOME,
    loginSalt: '$2a$10$67Bn8fXfK0peYFBhAKCctequ/QSkwtX4DWE5UmG0DQOieGdGysR8S',
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    loginEmail: process.env.NODE_ENV === 'production' ? '' : 'arancibiajav@gmail.com',
    loginPwd: process.env.NODE_ENV === 'production' ? '' : '',
    isProduction: process.env.NODE_ENV === 'production',
    implementation: process.env.IMPLEMENTATION || 'tae',
    NODE_ENV: process.env.NODE_ENV || 'development'
  },
  plugins: [{
      src: '@/plugins/vue-disable-autocomplete'
    }, {
      src: '@/plugins/vuejs-noty',
      ssr: false
    }, {
      src: '@/plugins/vuex-router-sync.js',
      ssr: false
    }, {
      src: '@/plugins/vue-cookie',
      ssr: false
    }, {
      src: '@/plugins/codemirror',
      ssr: false
    }, {
      src: '@/plugins/vue-good-table',
      ssr: false
    }, {
      src: '@/plugins/vue-toggle-button',
      ssr: false
    }, {
      src: '@/plugins/errortracky',
      ssr: false
    }, {
        src: '@/plugins/analytics',
        ssr: false
      }, {
        src: '@/plugins/logging',
        ssr: false
      }, {
        src: '@/plugins/vue-select',
        ssr: false
      }
  ],
  css: [
    'vuejs-noty/dist/vuejs-noty.css',
    // lib css
    'codemirror/lib/codemirror.css',
    // merge css
    'codemirror/addon/merge/merge.css',
    // theme css
    'codemirror/theme/base16-dark.css'
  ],
  workbox: {
    runtimeCaching: [{
      // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
      urlPattern: 'https://my-cdn.com/.*',
      // Defaults to `networkFirst` if omitted
      //handler: 'cacheFirst',
      // Defaults to `GET` if omitted
      method: 'GET'
    }]
  },
  manifest: {
    display: 'standalone',
    name: 'errortracky',
    lang: 'en'
  },
  render: {
    ssr: true
  },
  //generate: {
  /*
  routes: function() {
    return new Promise((resolve, reject) => {
      resolve(getStaticRoutes());
    })
  }*/
  //},
  /*
   ** Build configuration
   */
  build: {
    vendor: ['lodash'],
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}