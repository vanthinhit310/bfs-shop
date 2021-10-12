<template>
    <a-spin :spinning="processing">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        <div class="product-imgs">
            <div class="product-imgs-content">
                <div class="relative-background show-image">
                    <div v-if="isImageUrl(activeImage)" @click="lightboxIndex = activeEl" class="background-img" :style="{ backgroundImage: `url(${activeImage})` }"></div>
                    <div v-else class="video-background background-img">
                        <video width="100%" height="auto" autoplay muted loop controls>
                            <source :src="activeImage" type="video/mp4" />
                            Your browser does not support HTML video.
                        </video>
                    </div>
                </div>

                <template v-if="images.length">
                    <div class="product-imgs-thumb">
                        <CoolLightBox :items="big_images" :index="lightboxIndex" :effect="'fade'" :fullScreen="true" :useZoomBar="true" @close="lightboxIndex = null"> </CoolLightBox>
                        <VueSlickCarousel v-bind="settings">
                            <div v-for="(item, index) in images" @click="setActiveImage(item, index)" :key="index" :class="index === activeEl ? 'active product-thumb' : 'product-thumb'">
                                <div class="product-thumb-content">
                                    <div v-if="isImageUrl(item)" class="product-thumb-background" :style="{ backgroundImage: `url(${item})` }"></div>
                                    <div v-else class="product-video product-thumb-background" :style="{ backgroundImage: `url(${valueBy(product, 'thumbnail')})` }">
                                        <img alt="Play" class="img-fluid" src="~/assets/images/play.png" />
                                    </div>
                                </div>
                            </div>
                        </VueSlickCarousel>
                    </div>
                </template>

                <div class="product-share">
                    <a-space :size="15">
                        <span>Chia sẻ:</span>
                        <a class="social-item" type="button">
                            <img class="img-fluid" alt="Facebook" src="~/assets/images/facebook.png" />
                        </a>
                        <a class="social-item" type="button">
                            <img class="img-fluid" alt="Zalo" src="~/assets/images/zalo.png" />
                        </a>
                        <a class="social-item" type="button">
                            <img class="img-fluid" alt="Pinterest" src="~/assets/images/pinterest.png" />
                        </a>
                        <a class="social-item" type="button">
                            <img class="img-fluid" alt="Twitter" src="~/assets/images/twitter.png" />
                        </a>
                    </a-space>
                </div>
            </div>
        </div>
    </a-spin>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { mapGetters } from "vuex";

export default {
    name: "ProductImage",
    components: {
        VueSlickCarousel,
        CoolLightBox
    },
    props: {
        variation: String | Object
    },
    data() {
        return {
            activeEl: 0,
            activeImage: "",
            images: [],
            big_images: [],
            lightboxIndex: null,
            processing: true,
            settings: {
                infinite: false,
                speed: 800,
                slidesToShow: 5,
                slidesToScroll: 5
            }
        };
    },
    computed: {
        ...mapGetters({
            product: "productDetail/getProductItem"
        })
    },
    methods: {
        setActiveImage(src, el) {
            this.activeImage = src;
            this.activeEl = el;
        },
        isImageUrl(url) {
            return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
        },
        valueBy(o, path, d = "") {
            return _.get(o, path, d);
        }
    },
    watch: {
        product(after) {
            this.activeImage = _.get(after, "thumbnail");
            this.images = _.get(after, "images");
            this.big_images = _.get(after, "big_images");
            this.processing = false;
        },
        variation() {
            if (!!this.variation) {
                this.images = _.get(this.variation, "image_with_sizes.product-thumb");
                this.big_images = _.get(this.variation, "image_with_sizes.origin");
                this.activeImage = _.get(this.variation, "image_with_sizes.origin[0]");
                this.activeEl = 0;
            }
        }
    }
};
</script>

<style scoped></style>
