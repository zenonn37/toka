<template>
  <div class="sub-header">
    <div class="sub-container">
      <div class="sub-hour">
        <div class="sub-icons" v-for="hour in limitBy(hourly,6)" :key="hour.time">
          <div class="time">{{hour.time | unix}}</div>
          <div class="image-icon">
            <img :src="`images/${hour.icon}.png`" :alt="`${hour.icon}`" />
          </div>
          <div class="small-temp">{{hour.apparentTemperature | numWHOLE}}</div>
        </div>
      </div>
      <div class="sub-details">
        <div class="sub-forcast">
          Today: {{weather.current.summary}} The high will be
          {{day.apparentTemperatureHigh}}. The low tonight will be {{day.apparentTemperatureLow}}
          <hr />
        </div>
        <div>
          <Average
            :avg="weather.rain"
            :avg2="weather.dew"
            :title="`Chance of ${day.precipType}`"
            title2="Dewpoint"
            meta="true"
          />
          <Average
            :avg="day.humidity"
            :avg2="weather.current.windSpeed"
            title="Humidity"
            title2="Wind"
            meta="humid"
          />
          <Average
            :avg="weather.current.windGust"
            :avg2="weather.current.visibility"
            title="Wind Gust"
            title2="Visibilty"
            meta="humid"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue2Filters from "vue2-filters";
import Average from "@/components/Average";
import numeral from "numeral";
//import { icon } from "@/mixins/icons";
export default {
  name: "SubHeader",
  mixins: [Vue2Filters.mixin],
  components: {
    Average
  },
  data() {
    return {};
  },
  computed: {
    weather() {
      const weather = {
        hour: this.hourly,
        day: this.day,
        rain: numeral(this.day.precipProbability).format("0%"),
        dew: numeral(this.day.dewPoint).format(0.0),
        current: this.current !== null ? this.current : ""
      };

      return weather;
    },

    hourly() {
      const hour = this.$store.getters.get_hourly;

      if (hour !== null) {
        return hour;
      } else {
        return [];
      }

      return;
    },
    current() {
      return this.$store.getters.get_current;
    },
    day() {
      const daily = this.$store.getters.get_daily;

      if (daily !== null) {
        return daily[0];
      } else {
        return [];
      }
      return;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>