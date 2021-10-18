<template>
    <div class="product-category-wrapper">
        <div class="container">
            <div class="pc-content">
                <div class="pc-content-header">
                    <div class="left">
                        <a-space>
                            Sắp xếp theo
                            <a-select v-model="priceSort" style="width: 130px">
                                <a-select-option value="">Mặc định</a-select-option>
                                <a-select-option value="price_asc">Giá thấp đến cao</a-select-option>
                                <a-select-option value="price_desc">Giá cao đến thấp</a-select-option>
                                <a-select-option value="date_desc">Mới nhất</a-select-option>
                                <a-select-option value="date_asc">Cũ nhất</a-select-option>
                                <a-select-option value="name_asc">Tên: A-Z</a-select-option>
                                <a-select-option value="name_desc">Tên: Z-A</a-select-option>
                            </a-select>
                        </a-space>
                    </div>
                </div>
                <div class="pc-content-list">
                    <a-spin :spinning="processing">
                        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                        <div class="product-list-content">
                            <template v-if="products.length">
                                <div class="products">
                                    <a-row :gutter="[10, 10]">
                                        <a-col v-for="(item, index) in products" :key="index" :xs="{ span: 12 }" :md="{ span: 6 }" :lg="{ span: 4 }">
                                            <ProductItem :item="item" :key="index" />
                                        </a-col>
                                    </a-row>
                                    <Pagination
                                        @onSizeChange="handleSizeChange"
                                        @onPageChange="handlePageChange"
                                        :size-options="pageSizeOptions"
                                        :current-page="query.page"
                                        :page-size="query.num"
                                        :total="total"
                                    />
                                </div>
                            </template>
                            <template v-else>
                                <a-empty style="min-height: 400px; display: flex; justify-content: center; align-items: center"></a-empty>
                            </template>
                        </div>
                    </a-spin>
                </div>
            </div>
        </div>
    </div>
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
            processing: false,
            pageSizeOptions: ["18", "36"],
            products: [],
            category: "",
            priceSort: "",
            total: 0,
            query: {
                page: 1,
                num: 18,
                sortBy: ""
            }
        };
    },
    async asyncData({ store, params }) {
        const category = params.category;
        const response = await store.dispatch("productCategories/getCategory", { slug: category, query: {} });
        return {
            products: _.get(response.data, "products"),
            category: _.get(response.data, "category", []),
            currentPage: _.get(response.data, "pagination.currentPage", 1),
            total: _.get(response.data, "pagination.total", 0)
        };
    },
    methods: {
        ...mapActions("productCategories", ["getCategory"]),
        valueBy(o, path, d = "") {
            return _.get(o, path, d);
        },
        async fetchCategory(slug, query = {}) {
            try {
                this.processing = true;
                const response = await this.getCategory({ slug, query });
                this.products = _.get(response.data, "products", []);
                this.category = _.get(response.data, "category");
                this.currentPage = _.get(response.data, "pagination.currentPage", 1);
                this.total = _.get(response.data, "pagination.total", 0);
            } catch (e) {
                console.log(e.message);
            }
            this.processing = false;
        },
        async handleSizeChange(current, pageSize) {
            try {
                this.query.page = current;
                this.query.num = pageSize;
                await this.fetchCategory(this.category.slug, this.query);
            } catch (e) {
                console.log(e.message);
            }
        },
        async handlePageChange(page) {
            try {
                this.query.page = page;
                await this.fetchCategory(this.category.slug, this.query);
            } catch (e) {
                console.log(e.message);
            }
        }
    },
    watch: {
        priceSort: function (after, before) {
            this.query.sortBy = after;
            this.fetchCategory(this.category.slug, this.query);
        }
    }
};
</script>

<style scoped></style>
