<template>
    <section class="home-wrapper">
        <TopSlide />
        <ProductCategories />
        <SellingProducts />
        <FeaturedProducts />
        <ProductList />
    </section>
</template>

<script>
import TopSlide from "~/components/Home/TopSlide";
import ProductCategories from "~/components/Home/ProductCategories";
import SellingProducts from "~/components/Home/SellingProducts";
import FeaturedProducts from "~/components/Home/FeaturedProducts";
import ProductList from "~/components/Home/ProductList";
export default {
    components: {
        TopSlide,
        ProductCategories,
        FeaturedProducts,
        SellingProducts,
        ProductList
    }
};
</script>
