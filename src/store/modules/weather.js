import axios from 'axios';


const state = {
    current: [],
    daily: [],
    hourly: [],
    minute: [],
    meta: {},
    city: "",


}

const mutations = {

    set_current(state, payload) {
        state.current = payload
    },
    set_daily(state, payload) {
        state.daily = payload
    },
    set_hourly(state, payload) {
        state.hourly = payload
    },
    set_minute(state, payload) {
        state.minute = payload
    },







    set_meta(state, payload) {
        state.meta = payload
    }

}

const getters = {


    get_current(state) {
        return state.current
    },
    get_daily(state) {
        return state.daily
    },
    get_hourly(state) {
        return state.hourly
    },
    get_minute(state) {
        return state.minute
    }

}

const actions = {

    SET_LOCATION({ commit }, location) {
        return new Promise((resolve, reject) => {
            axios.post('http://apps.test/api/geosky', location)
                .then(res => {
                    console.log(res.data.currently);
                    console.log(res.data.daily);
                    commit('set_current', res.data.currently)
                    commit('set_daily', res.data.daily.data)
                    commit('set_hourly', res.data.hourly.data)
                    commit('set_minute', res.data.minutely.data)

                    const meta = {
                        lat: res.data.latitude,
                        long: res.data.longitude,
                        zone: res.data.timezone
                    }
                    commit('set_meta', meta)
                    resolve(res)

                }).catch(err => {
                    console.log(err);
                    reject(err)

                })



        })




    },

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