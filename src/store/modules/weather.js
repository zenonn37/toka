import axios from 'axios';
import gmapsInit from "../../utils/gmap";


const state = {
    current: null,
    daily: null,
    hourly: null,
    minute: null,
    meta: {},
    city: {},
    error: null,
    area: null



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
    set_error(state, payload) {
        state.error = payload
    },

    set_city(state, payload) {
        state.city = payload
    },
    set_area(state, payload) {
        state.area = payload
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
    },
    get_city(state) {
        return state.city
    },
    get_error(state) {
        return state.error
    },
    get_area(state) {
        return state.area
    }

}

const actions = {

    set_errors({ commit }, err) {
        commit('set_error', err)
    },

    get_city({ commit }, data) {
        return new Promise((resolve, reject) => {
            axios.post('http://apps.test/api/city', data)
                .then(res => {
                    //console.log(res.data);
                    resolve(res)
                    const data = {
                        city: res.data[3].long_name,
                        state: res.data[6].short_name
                    }

                    commit('set_city', data)
                }).catch(err => {
                    commit('set_error', err.message)
                    reject(err)
                })
        })
    },
    //get location from darkskyapi no geocoding, until dispatch call to getcity
    SET_LOCATION({ commit, dispatch }, location) {
        return new Promise((resolve, reject) => {
            axios.post('http://apps.test/api/geosky', location)
                .then(res => {

                    //geocode coords to get city info
                    dispatch('get_city', location)
                    // console.log(res.data.currently);
                    // console.log(res.data.daily);
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
                    //console.log(err);
                    commit('set_error', err.message)
                    reject(err)

                })



        })




    },

    get_current({ commit, dispatch }, location) {
        return new Promise((resolve, reject) => {
            // console.log(location);

            axios.post('http://apps.test/api/darksky', {
                lat: location.lat,
                lng: location.lng
            }

            ).then(res => {
                // console.log(res.data.dark.daily.data);

                commit('set_current', res.data.currently)
                commit('set_daily', res.data.daily.data)
                commit('set_hourly', res.data.hourly.data)
                //commit('set_minute', res.data.minutely.data)
                //dispatch('get_city', location)

                const meta = {
                    lat: res.data.latitude,
                    long: res.data.longitude,
                    zone: res.data.timezone
                }
                commit('set_meta', meta)
                //console.log(res.data.address);

                commit('set_city', res.data.address)
                commit('set_error', null)
                resolve(res);

            }).catch(err => {

                const not_found = "City not found please try again."

                commit('set_error', not_found)
                // console.log(err.response);
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
                    //console.log(err);
                    commit('set_error', err.message)
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
                    // console.log(res.data);
                    axios.get('http://apps.test/api/forecast', {
                        params: {
                            city: city
                        }
                    }).then(res => {

                        commit('SET_DAY', res.data)
                        //resolve(res);

                    }).catch(err => {
                        commit('set_error', err.message)
                        //console.log(err);
                        // reject(err);

                    })

                    resolve(res);
                    commit("SET_DATA", res.data)
                }).catch(err => {
                    //console.log(err);
                    commit('set_error', err.message)
                    reject(err)

                })
        })
    },

    set_areas({ commit }, data) {
        //console.log(data);

        commit('set_area', data)
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}