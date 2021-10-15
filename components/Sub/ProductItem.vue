<template>
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
</template>

<script>
export default {
    props: {
        item: {
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
