export const state = () => ({
    categories: [],
    settings: []
});

export const getters = {
    getCategories: state => {
        return state.categories;
    },
    getSettings: state => {
        return state.settings;
    }
};

export const mutations = {
    setCategories(state, categories) {
        state.categories = categories;
    },
    setSettings(state, settings) {
        state.settings = settings;
    }
};

export const actions = {
    async getHomeSlides({ commit }) {
        return await this.$axios.get("get-slides");
    },

    async getProductCategories({ commit }) {
        return await this.$axios.get("product-categories");
    },

    async getFeaturedProducts({ commit }) {
        return await this.$axios.get("feature-products");
    },

    async getSellingProducts({ commit }, pageSize = 15) {
        return await this.$axios.get("selling-products", { params: { pageSize } });
    },

    async getProducts({ commit }, { page, perPage }) {
        return await this.$axios.get("products", { params: { page, perPage } });
    },

    async postContact({ commit }, payload) {
        return await this.$axios.post("contact/send", payload);
    },

    async subscribeNewsletter({ commit }, payload) {
        return await this.$axios.post("newsletter/subscribe", payload);
    },

    async getSettings({ commit }) {
        const response = await this.$axios.get("settings/get");
        const settings = _.get(response, "settings");
        if (settings) {
            commit("setSettings", settings);
        }

        return response;
    }
};
