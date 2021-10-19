<template>
    <section class="main-wrapper">
        <div id="fb-root"></div>
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
        <FacebookCustomerChat />
        <FacebookPage />
    </section>
</template>

<script>
import Header from "@/components/Partials/Header";
import Footer from "@/components/Partials/Footer";
import { mapActions, mapGetters, mapMutations } from "vuex";
import FacebookCustomerChat from "~/components/Sub/FacebookCustomerChat";
import FacebookPage from "~/components/Sub/FacebookPage";
export default {
    components: {
        Header,
        Footer,
        FacebookCustomerChat,
        FacebookPage
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

        await this.fetchProductCategories();
    },
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
                const response = await this.getProductCategories();
                const categories = _.get(response.data, "categories", []);
                if (!!categories) {
                    this.setCategories(categories);
                }
            } catch (e) {
                console.log(e.message);
            }
        }
    }
};
</script>

<style></style>
