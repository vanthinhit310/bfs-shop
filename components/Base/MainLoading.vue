<template>
    <loading :active.sync="loading" loader="dots" :opacity="1" :width="40" :height="40" :z-index="100" color="#ee4d2d" :is-full-page="true"></loading>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
    components: {
        Loading
    },
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
};
</script>

<style scoped></style>
