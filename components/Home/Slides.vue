<template>
    <div class="home-slide-content">
        <a-spin :spinning="false">
            <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
            <template v-if="items.length">
                <VueSlickCarousel :autoplaySpeed="6000" :speed="800" :autoplay="true" :touchMove="false" :draggable="false" :arrows="true" :dots="true">
                    <div v-for="(item, index) in items" :key="index" class="slide-item">
                        <a class="d-block" :href="item.link || 'javascript:void(0);'">
                            <img class="img-fluid w-100 d-block" alt="Slide" :src="item.image || ''" />
                        </a>
                    </div>
                </VueSlickCarousel>
            </template>
            <template v-else>
                <a-empty />
            </template>
        </a-spin>
    </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapActions } from "vuex";

export default {
    components: {
        VueSlickCarousel
    },
    props: {
        items: {
            type: Array | Object,
            default: []
        }
    },
    data() {
        return {
            slides: [],
            error: ""
        };
    }
};
</script>

<style scoped></style>
