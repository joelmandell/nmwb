const state = {
    token: null
}

const getters = {
    getToken: state => state.token,
}

const mutations = {
    setToken: (state,token) => {
        state.token = token
    },
}

const actions = {
    setToken: ({commit, state},token) => commit("setToken",token),
    signout: ({commit,state}) => commit("setToken",null)
}

export default {
    state,
    getters,
    actions,
    mutations
}