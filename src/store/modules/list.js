import {
    RECEIVE_USER
} from '../mutation-types'

const state = {
    list: {}
}

const mutations = {
    [RECEIVE_USER](state, { data }) {
        state.list = data
    },
}

export default {
    state,
    mutations
}
