<template>
    <section class="main-wrapper">
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
export default {
    components: {
        Header,
        Footer
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

<style>
.page-enter-active,
.page-leave-active {
    transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
    opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
    transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-to {
    opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-bottom-enter,
.slide-bottom-leave-to {
    opacity: 0;
    transform: translate3d(0, 15px, 0);
}
.bounce-enter-active {
    transform-origin: top;
    animation: bounce-in 0.8s;
}
.bounce-leave-active {
    transform-origin: top;
    animation: bounce-out 0.5s;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes bounce-out {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(0);
    }
}
</style>
