import axios from 'axios';


const state = {
    data: []
}

const mutations = {
    SET_DATA(state, data) {
        state.data = data;
    }
}

const getters = {
    GET_DATA(state) {
        return state.data;
    }

}

const actions = {


    CURRENT_WEATHER({ commit }, city) {
        //const city = "Glens Falls"
        console.log(city);


        return new Promise((resolve, reject) => {
            axios.get('http://apps.test/api/daily', {
                params: {
                    city: city !== '' ? 'Paris' : city
                }
            })
                .then(res => {
                    console.log(res.data);

                    resolve(res);
                    commit("SET_DATA", res.data)
                }).catch(err => {
                    console.log(err);
                    reject(err)

                })
        })
    },

    GET_WEATHER({ commit }, city) {
        //const city = "Glens Falls"
        console.log(city);


        return new Promise((resolve, reject) => {
            axios.get('http://apps.test/api/daily', {
                params: {
                    city: city
                }
            })
                .then(res => {
                    console.log(res.data);

                    resolve(res);
                    commit("SET_DATA", res.data)
                }).catch(err => {
                    console.log(err);
                    reject(err)

                })
        })
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}