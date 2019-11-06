import Vue from 'vue';
import numeral from 'numeral';
import moment from 'moment';


Vue.filter('numWHOLE', function (value) {
    // numeral(this.$store.getters.GET_DATA.main.temp_max).format(
    //   0.0
    return numeral(value).format(0.0);
});

Vue.filter('time', function (value) {
    return moment(value).format('h a');
});

Vue.filter('day', function (value) {
    return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
})

Vue.filter('unix', function (value) {
    return moment.unix(value).format('h a')
})
Vue.filter('day_unix', function (value) {
    return moment.unix(value).format('ddd')
})
Vue.filter('date_unix', function (value) {
    return moment.unix(value).format('D MMM')
})