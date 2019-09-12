import axios from 'axios';


const state = {
    data: [],
    day: [],

}

const mutations = {
    SET_DATA(state, data) {
        state.data = data;
    },
    SET_DAY(state, day) {
        state.day = day;
    },

}

const getters = {
    GET_DATA(state) {
        return state.data;
    },
    GET_DAY(state) {
        return state.day;
    }

}

const actions = {

    FORCAST({ commit }, city) {
        return new Promise((resolve, reject) => {

            axios.get('http://apps.test/api/forecast', {
                params: {
                    city: city !== '' ? 'New York' : city
                }
            }).then(res => {

                commit('SET_DAY', res.data)
                resolve(res);

            }).catch(err => {
                console.log(err);
                reject(err);

            })

        });
    },


    CURRENT_WEATHER({ commit }, city) {
        //const city = "Glens Falls"
        console.log(city);


        return new Promise((resolve, reject) => {
            axios.get('http://apps.test/api/daily', {
                params: {
                    city: city !== '' ? 'New York' : city
                }
            })
                .then(res => {
                    console.log(res.data);
                    axios.get('http://apps.test/api/forecast', {
                        params: {
                            city: city !== '' ? 'New York' : city
                        }
                    }).then(res => {

                        commit('SET_DAY', res.data)
                        //resolve(res);

                    }).catch(err => {
                        console.log(err);
                        // reject(err);

                    })
                    setTimeout(() => {
                        resolve(res);
                    }, 1000);

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
                    axios.get('http://apps.test/api/forecast', {
                        params: {
                            city: city
                        }
                    }).then(res => {

                        commit('SET_DAY', res.data)
                        //resolve(res);

                    }).catch(err => {
                        console.log(err);
                        // reject(err);

                    })

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