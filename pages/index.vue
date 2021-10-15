<template>
    <section class="home-wrapper">
        <div class="home-slide">
            <div class="container">
                <a-row type="flex" justify="center">
                    <a-col class="gutter-row" :lg="{ span: 16 }" :span="24">
                        <Slides :items="slides" />
                    </a-col>
                    <a-col class="gutter-row" :lg="{ span: 8 }" :span="24">
                        <BannerImage />
                    </a-col>
                </a-row>
            </div>
        </div>
        <ProductCategories />
        <SellingProducts />
        <FeaturedProducts />
        <ProductList />
    </section>
</template>

<script>
import ProductCategories from "~/components/Home/ProductCategories";
import SellingProducts from "~/components/Home/SellingProducts";
import FeaturedProducts from "~/components/Home/FeaturedProducts";
import ProductList from "~/components/Home/ProductList";
import Slides from "~/components/Home/Slides";
import BannerImage from "~/components/Home/BannerImage";

export default {
    components: {
        Slides,
        BannerImage,
        ProductCategories,
        FeaturedProducts,
        SellingProducts,
        ProductList
    },
    data() {
        return {
            slides: []
        };
    },
    async asyncData({ store }) {
        const slides = await store.dispatch("home/getHomeSlides");

        return {
            slides: _.get(slides.data, "slides", [])
        };
    }
};
</script>
