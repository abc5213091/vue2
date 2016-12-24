import {
    RECEIVE_USER
} from '../mutation-types'

const state = {
    user: {}
}

const mutations = {
    [RECEIVE_USER](state, data) {
        state.user = data.user
    },
}

export default {
    state,
    mutations
}
