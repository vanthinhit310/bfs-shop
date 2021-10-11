import qs from "qs";

export const actions = {
    async getProduct({ commit }, slug) {
        return await this.$axios.get(`products/${slug}`);
    },
    async getRelatedProducts({ commit }, categories, pageSize = 15) {
        return await this.$axios.get(`products/relateds`, { params: { pageSize, categories } });
    },
    async getProductVariation({ commit }, { id, attributes }) {
        return await this.$axios.get(`products/variation/${id}`, {
            params: { attributes },
            paramsSerializer: params => {
                return qs.stringify(params);
            }
        });
    }
};
