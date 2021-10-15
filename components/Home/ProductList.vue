<template>
    <section class="product-list">
        <div class="container">
            <a-spin :spinning="$fetchState.pending || processing">
                <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                <div class="product-list-content">
                    <template v-if="products.length">
                        <div class="section-header-underline">Danh sách sản phẩm</div>
                        <div class="products">
                            <a-row :gutter="[10, 10]">
                                <a-col v-for="(item, index) in products" :key="index" :xs="{ span: 12 }" :md="{ span: 6 }" :lg="{ span: 4 }">
                                    <ProductItem :item="item" :key="index" />
                                    <!--                                    <NuxtLink class="d-block product-item" :to="{ name: 'product-slug', params: { slug: valueBy(item, 'slug') } }">-->
                                    <!--                                        <div class="product-item__content">-->
                                    <!--                                            <div class="product-item__content&#45;&#45;image">-->
                                    <!--                                                <img alt="Product" class="img-fluid w-100" :src="valueBy(item, 'image')" />-->
                                    <!--                                                <div class="percent-discount" v-if="valueBy(item, 'percentage_off', 0) !== 0">-->
                                    <!--                                                    <div class="percent-discount-content">-->
                                    <!--                                                        <span class="percent">{{ valueBy(item, "percentage_off", 0) }}%</span>-->
                                    <!--                                                        <span class="text">Giảm</span>-->
                                    <!--                                                    </div>-->
                                    <!--                                                </div>-->
                                    <!--                                            </div>-->
                                    <!--                                            <div class="product-item__content&#45;&#45;name">-->
                                    <!--                                                <span>{{ valueBy(item, "name") }}</span>-->
                                    <!--                                            </div>-->
                                    <!--                                            <div class="rate-discount">-->
                                    <!--                                                <div class="discount-text">-->
                                    <!--                                                    <div class="discount-text-content" v-show="valueBy(item, 'discount_text')">-->
                                    <!--                                                        <svg class="svg_icon" viewBox="-0.5 -0.5 4 16">-->
                                    <!--                                                            <path-->
                                    <!--                                                                d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"-->
                                    <!--                                                                stroke-width="1"-->
                                    <!--                                                                transform=""-->
                                    <!--                                                                stroke="currentColor"-->
                                    <!--                                                                fill="#f69113"-->
                                    <!--                                                            ></path>-->
                                    <!--                                                        </svg>-->
                                    <!--                                                        <div class="text">Giảm {{ valueBy(item, "discount_text") }}</div>-->
                                    <!--                                                        <svg class="svg_icon" viewBox="-0.5 -0.5 4 16">-->
                                    <!--                                                            <path-->
                                    <!--                                                                d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3"-->
                                    <!--                                                                stroke-width="1"-->
                                    <!--                                                                transform="rotate(180) translate(-3 -15)"-->
                                    <!--                                                                stroke="currentColor"-->
                                    <!--                                                                fill="#f69113"-->
                                    <!--                                                            ></path>-->
                                    <!--                                                        </svg>-->
                                    <!--                                                    </div>-->
                                    <!--                                                </div>-->
                                    <!--                                                <div class="rate">-->
                                    <!--                                                    <a-rate :defaultValue="valueBy(item, 'rate_start', 0)" disabled allow-half />-->
                                    <!--                                                </div>-->
                                    <!--                                            </div>-->
                                    <!--                                            <div class="product-item__content&#45;&#45;price">-->
                                    <!--                                                <div class="price">{{ valueBy(item, "price_formated") }}</div>-->
                                    <!--                                            </div>-->
                                    <!--                                        </div>-->
                                    <!--                                    </NuxtLink>-->
                                </a-col>
                            </a-row>
                            <Pagination
                                @onSizeChange="handleSizeChange"
                                @onPageChange="handlePageChange"
                                :size-options="pageSizeOptions"
                                :current-page="currentPage"
                                :page-size="perPage"
                                :total="total"
                            />
                        </div>
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
import { mapActions } from "vuex";
import Pagination from "~/components/Base/Pagination";
import ProductItem from "~/components/Sub/ProductItem";

export default {
    components: {
        Pagination,
        ProductItem
    },
    data() {
        return {
            pageSizeOptions: ["12", "24", "48"],
            processing: false,
            products: [],
            currentPage: 1,
            perPage: 12,
            total: 0
        };
    },
    async fetch() {
        try {
            const { currentPage, perPage } = this;
            await this.fetchProducts(currentPage, perPage);
        } catch (e) {
            console.log(e.message);
        }
    },
    methods: {
        ...mapActions("home", ["getProducts"]),
        async fetchProducts(page, pageSize) {
            try {
                this.processing = true;
                const response = await this.getProducts({ page, perPage: pageSize });
                this.products = _.get(response.data, "products");
                const { currentPage, perPage, total } = _.get(response.data, "pagination");
                this.currentPage = currentPage;
                this.perPage = perPage;
                this.total = total;
            } catch (e) {
                console.log(e.message);
            }
            this.processing = false;
        },
        async handleSizeChange(current, pageSize) {
            try {
                await this.fetchProducts(current, pageSize);
                this.currentPage = current;
                this.perPage = pageSize;
            } catch (e) {
                console.log(e.message);
            }
        },
        async handlePageChange(page) {
            try {
                const { perPage } = this;
                await this.fetchProducts(page, perPage);
            } catch (e) {
                console.log(e.message);
            }
        },
        valueBy(o, path, d = "") {
            return _.get(o, path, d);
        }
    }
};
</script>

<style scoped></style>
