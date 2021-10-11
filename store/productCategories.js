export const actions = {
    async getCategory({ commit }, { slug, query }) {
        return await this.$axios.get(`product-categories/${slug}`, { params: query });
    }
};
