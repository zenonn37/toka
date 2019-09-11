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
    return moment(value).format('dddd');
})