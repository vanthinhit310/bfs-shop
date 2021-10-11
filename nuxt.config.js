import webpack from "webpack";
const apiEndpoint = process.env.RUNNING_MODE === "production" ? process.env.PRODUCTION_API_ENDPOINT : process.env.DEV_API_ENDPOINT;

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "Buy First Store",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=1" },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com" },
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["@/assets/sass/app.scss", "@/assets/packages/ant.less"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["@/plugins/antd-ui", "@/plugins/axios"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        // https://go.nuxtjs.dev/pwa
        "@nuxtjs/pwa",
        // https://go.nuxtjs.dev/content
        "@nuxt/content"
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: apiEndpoint
    },

    publicRuntimeConfig: {
        axios: {
            browserBaseURL: apiEndpoint
        }
    },

    privateRuntimeConfig: {
        axios: {
            baseURL: apiEndpoint
        }
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: "en"
        }
    },

    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            less: { javascriptEnabled: true }
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: "lodash"
            })
        ]
    },
    loading: {
        color: "#ee4d2d"
    },
    pageTransition: "page"
};
