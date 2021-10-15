<template>
    <section class="product-list">
        <div class="container">
            <a-spin :spinning="$fetchState.pending">
                <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
                <div class="product-list-content">
                    <template v-if="products.length">
                        <div class="section-header-underline">Danh sách sản phẩm</div>
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
            const page = this.currentPage;
            const size = this.perPage;
            const response = await this.getProducts({ page: page, perPage: size });
            this.products = _.get(response.data, "products");
            const { currentPage, perPage, total } = _.get(response.data, "pagination");
            this.currentPage = currentPage;
            this.perPage = perPage;
            this.total = total;
        } catch (e) {
            console.log(e.message);
        }
    },
    methods: {
        ...mapActions("home", ["getProducts"]),
        handleSizeChange(page, pageSize) {
            this.currentPage = page;
            this.perPage = pageSize;
            this.$fetch();
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.$fetch();
        }
    }
};
</script>

<style scoped></style>
