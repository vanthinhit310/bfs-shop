<template>
    <section class="featured-products">
        <div class="container">
            <a-spin :spinning="$fetchState.pending">
                <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                <div class="featured-products-content">
                    <template v-if="products.length">
                        <div class="section-header">Sản phẩm nổi bật</div>
                        <VueSlickCarousel v-bind="settings">
                            <div v-for="(item, index) in products" :key="index" class="featured-slide-item">
                                <ProductItem :item="item" :key="index" />
                            </div>
                        </VueSlickCarousel>
                    </template>
                    <template v-else>
                        <a-empty></a-empty>
                    </template>
                </div>
            </a-spin>
        </div>
    </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapActions } from "vuex";
import ProductItem from "~/components/Sub/ProductItem";

export default {
    components: {
        VueSlickCarousel,
        ProductItem
    },
    name: "FeaturedProducts",
    data() {
        return {
            settings: {
                dots: false,
                focusOnSelect: false,
                infinite: false,
                speed: 800,
                slidesToShow: 6,
                slidesToScroll: 6,
                touchThreshold: 5,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 414,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            },
            products: []
        };
    },
    async fetch() {
        try {
            const response = await this.getFeaturedProducts();
            const products = _.get(response.data, "products", []);
            if (products && products.length) {
                this.products = products;
            }
        } catch (e) {
            console.log(e.message);
        }
    },
    methods: {
        ...mapActions("home", ["getFeaturedProducts"])
    }
};
</script>

<style scoped></style>
