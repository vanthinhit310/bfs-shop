<template>
    <section class="main-wrapper">
        <loading :active.sync="isLoading" loader="dots" :opacity="1" :width="40" :height="40" :z-index="100" color="#ee4d2d" :is-full-page="true"></loading>
        <a-layout :style="{ background: '#fff' }">
            <a-layout-header :style="{ position: 'fixed', zIndex: 15, width: '100%' }">
                <Header />
            </a-layout-header>
            <a-layout-content :style="{ marginTop: '108.16px' }">
                <Nuxt />
            </a-layout-content>
            <a-layout-footer>
                <Footer />
            </a-layout-footer>
        </a-layout>
        <a-back-top />
    </section>
</template>

<script>
import Header from "@/components/Partials/Header";
import Footer from "@/components/Partials/Footer";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
    components: {
        Header,
        Footer,
        Loading
    },
    async fetch() {
        try {
            const response = await this.getSettings();
            const settings = _.get(response.data, "settings", []);
            if (!!settings) {
                this.setSettings(settings);
            }
        } catch (e) {
            console.log(e.message);
        }
    },
    // async fetch() {
    //     console.log(2234);
    //     await this.getSettings();
    //     await this.fetchProductCategories();
    // },
    computed: {
        ...mapGetters({
            isLoading: "baseComponents/getLoadingState"
        })
    },
    methods: {
        ...mapActions("home", ["getSettings"]),
        ...mapActions("home", ["getProductCategories"]),
        ...mapActions("baseComponents", ["setSubLoading"]),
        ...mapMutations({
            setCategories: "home/setCategories",
            setSettings: "home/setSettings"
        }),
        async fetchProductCategories() {
            try {
                this.setSubLoading(true);
                const response = await this.getProductCategories();
                const categories = _.get(response.data, "categories", []);
                if (!!categories) {
                    this.setCategories(categories);
                }
            } catch (e) {
                console.log(e.message);
            }
            this.setSubLoading(false);
        }
    }
};
</script>

<style scoped></style>
