<template>
    <a-spin :spinning="false">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        <div class="description-detail">
            <div v-if="valueBy(product, 'specifications')" class="box-title-content">
                <div class="title">CHI TIẾT SẢN PHẨM</div>
                <div class="content tskt" v-html="valueBy(product, 'specifications')"></div>
            </div>
            <div v-if="valueBy(product, 'description')" class="box-title-content">
                <div class="title">MÔ TẢ SẢN PHẨM</div>
                <div class="content" v-html="valueBy(product, 'description')"></div>
            </div>
        </div>
    </a-spin>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        product: {
            type: Array | Object,
            default: []
        }
    },
    methods: {
        valueBy(o, path, d = "") {
            return _.get(o, path, d);
        }
    }
};
</script>

<style scoped></style>
