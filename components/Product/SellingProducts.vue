<template>
    <section class="product-detail-selling featured-products">
        <a-spin :spinning="processing">
            <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
            <div class="featured-products-content d-none d-lg-block">
                <template v-if="products.length">
                    <div class="selling-product-content">
                        <div class="selling-product-title">Top sản phẩm bán chạy</div>
                        <div class="selling-product-list">
                            <div v-for="(item, index) in products" :key="index" class="selling-product-item">
                                <NuxtLink class="d-block product-item" :to="{ name: 'product-slug', params: { slug: valueBy(item, 'slug') } }">
                                    <div class="product-item__content">
                                        <div class="product-item__content--image">
                                            <img alt="Product" class="img-fluid w-100" :src="valueBy(item, 'image')" />
                                        </div>
                                        <div class="product-item__content--name">
                                            <span>{{ valueBy(item, "name") }}</span>
                                        </div>
                                        <div class="product-item__content--price">
                                            <div class="price">{{ valueBy(item, "price_formated") }}</div>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <a-empty></a-empty>
                </template>
            </div>
            <!--Mobile-->
            <div class="featured-products-content d-block d-lg-none">
                <template v-if="products.length">
                    <div class="section-header">Sản phẩm bán chạy</div>
                    <VueSlickCarousel v-bind="settings">
                        <div v-for="(item, index) in products" :key="index" class="featured-slide-item">
                            <NuxtLink class="d-block product-item" :to="{ name: 'product-slug', params: { slug: valueBy(item, 'slug') } }">
                                <div class="product-item__content">
                                    <div class="product-item__content--image">
                                        <img alt="Product" class="img-fluid w-100" :src="valueBy(item, 'image')" />
                                        <div class="percent-discount" v-if="valueBy(item, 'percentage_off', 0) !== 0">
                                            <div class="percent-discount-content">
                                                <span class="percent">{{ valueBy(item, "percentage_off", 0) }}%</span>
                                                <span class="text">Giảm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="product-item__content--name">
                                        <span>{{ valueBy(item, "name") }}</span>
                                    </div>
                                    <div class="rate-discount">
                                        <div class="discount-text">
                                            <div class="discount-text-content" v-show="valueBy(item, 'discount_text')">
                                                <svg class="svg_icon" viewBox="-0.5 -0.5 4 16">
                                                    <path
                                                        d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
                                                        stroke-width="1"
                                                        transform=""
                                                        stroke="currentColor"
                                                        fill="#f69113"
                                                    ></path>
                                                </svg>
                                                <div class="text">Giảm {{ valueBy(item, "discount_text") }}</div>
                                                <svg class="svg_icon" viewBox="-0.5 -0.5 4 16">
                                                    <path
                                                        d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"
                                                        stroke-width="1"
                                                        transform="rotate(180) translate(-3 -15)"
                                                        stroke="currentColor"
                                                        fill="#f69113"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="rate">
                                            <a-rate :defaultValue="valueBy(item, 'rate_start', 0)" disabled allow-half />
                                        </div>
                                    </div>
                                    <div class="product-item__content--price">
                                        <div class="price">{{ valueBy(item, "price_formated") }}</div>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                    </VueSlickCarousel>
                </template>
                <template v-else>
                    <a-empty></a-empty>
                </template>
            </div>
        </a-spin>
    </section>
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
            processing: false,
            products: []
        };
    },
    async fetch() {
        await this.fetchSellingProducts();
    },
    methods: {
        ...mapActions("home", ["getSellingProducts"]),
        async fetchSellingProducts() {
            try {
                this.processing = true;
                const response = await this.getSellingProducts(8);
                const products = _.get(response.data, "products", []);
                if (products && products.length) {
                    this.products = products;
                }
            } catch (e) {
                console.log(e.message);
            }
            this.processing = false;
        },
        valueBy(o, path, d = "") {
            return _.get(o, path, d);
        }
    }
};
</script>

<style scoped></style>
