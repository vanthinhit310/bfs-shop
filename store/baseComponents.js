export const state = () => ({
    isLoading: false,
    subLoading: false
});

export const getters = {
    getLoadingState: state => {
        return state.isLoading;
    },
    getSubLoading: state => {
        return state.subLoading;
    }
};

export const mutations = {
    setLoadingState(state, status) {
        state.isLoading = status;
    },
    setSubLoading(state, status) {
        state.subLoading = status;
    }
};

export const actions = {
    setLoadingState({ commit }, status) {
        commit("setLoadingState", status);
    },
    setSubLoading({ commit }, status) {
        commit("setSubLoading", status);
    },
    async searchProduct({ commit }, q) {
        return await this.$axios.get("products/search", { params: { q } });
    }
};
