<template>
    <section class="product-detail-wrapper">
        <loading :active.sync="$fetchState.pending" :opacity="1" :width="40" :height="40" :z-index="100" color="#ee4d2d" :is-full-page="true"></loading>
        <div v-if="!$fetchState.pending">
            <div class="page-breadcrumb d-none d-lg-block">
                <div class="container">
                    <template v-if="product">
                        <a-breadcrumb>
                            <a-breadcrumb-item><NuxtLink :to="{ name: 'index' }">Home</NuxtLink></a-breadcrumb-item>
                            <a-breadcrumb-item>
                                <NuxtLink :to="{ name: 'category', params: { category: valueBy(product, 'categories[0].slug') } }">{{ valueBy(product, "categories[0].name") }}</NuxtLink>
                            </a-breadcrumb-item>
                            <a-breadcrumb-item>{{ valueBy(product, "name") }}</a-breadcrumb-item>
                        </a-breadcrumb>
                    </template>
                    <template v-else>
                        <a-skeleton active :paragraph="{ rows: 1 }" />
                    </template>
                </div>
            </div>
            <div class="product-info">
                <div class="container">
                    <div class="info-content card">
                        <a-row class="pic">
                            <a-col class="overflow-hidden pic-left">
                                <ProductImage :variation="variation" />
                            </a-col>
                            <a-col class="overflow-hidden pic-right">
                                <ProductInfo @attributeChange="handleAttributeChange" />
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </div>
            <div class="description-box">
                <div class="container">
                    <div class="description-box-content">
                        <div class="description-box-left">
                            <ProductDescription />
                        </div>
                        <div class="description-box-right">
                            <SellingProducts />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedProducts />
        </div>
    </section>
</template>

<script>
import ProductImage from "~/components/Product/ProductImage";
import ProductInfo from "~/components/Product/ProductInfo";
import ProductDescription from "~/components/Product/ProductDescription";
import SellingProducts from "~/components/Product/SellingProducts";
import RelatedProducts from "~/components/Product/RelatedProducts";
import { mapActions, mapMutations, mapGetters } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    components: {
        Loading,
        ProductImage,
        ProductInfo,
        ProductDescription,
        SellingProducts,
        RelatedProducts
    },
    data() {
        return {
            processing: false,
            variation: ""
        };
    },
    async fetch() {
        const { slug } = this.$route.params;
        const response = await this.$store.dispatch("productDetail/getProduct", slug);
        const product = _.get(response.data, "product");
        this.$store.commit("productDetail/setProductItem", product);
    },
    computed: {
        ...mapGetters({
            product: "productDetail/getProductItem"
        })
    },
    methods: {
        ...mapActions("productDetail", ["getProduct", "getProductVariation"]),
        ...mapActions("baseComponents", ["setLoadingState"]),
        ...mapMutations({
            setProductItem: "productDetail/setProductItem"
        }),
        async fetchProduct(slug) {
            try {
                if (!!slug) {
                    const response = await this.getProduct(slug);
                    const product = _.get(response.data, "product");
                    if (!!product) {
                        this.product = product;
                    }
                }
            } catch (e) {
                console.log(e.message);
            }
        },
        async fetchProductVariation(id, attributes = []) {
            try {
                const response = await this.getProductVariation({ id, attributes });
                const product = _.get(response.data, "product");
                if (!!product) {
                    this.variation = product;
                }
            } catch (e) {
                console.log(e.message);
            }
        },
        handleAttributeChange(attrs = []) {
            const productId = _.get(this.product, "id", 0);
            this.fetchProductVariation(productId, attrs);
        },
        valueBy(o, path, d = "") {
            return _.get(o, path, d);
        }
    }
};
</script>

<style scoped></style>
