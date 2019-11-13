<template>
  <div class="sub-header">
    <div class="sub-container">
      <div class="sub-hour">
        <div class="sub-icons" v-for="hour in limitBy(hourly,6)" :key="hour.time">
          <div class="time">{{hour.time | unix}}</div>
          <div class="image-icon">
            <img width="30px" :src="`images/${hour.icon}.png`" :alt="`${hour.icon}`" />
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
        <div class="">
          <Average
            :avg="day.precipProbability"
            :avg2="day.dewPoint"
            :title="`Chance of ${day.precipType}`"
            title2="Dewpoint"
            classes="subdetails"
            meta="humid"
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
    },
    icons(icon) {
      //const icon = this.hourly.icon;
      console.log(icon);

      switch (icon) {
        case "clear-day":
          return "icon_clear_sky_day";

        case "clear-night":
          return "icon_clear_sky_day";

        case "partly-cloudy-day":
          return "few_clouds_day";

        case "partly-cloudy-night":
          return "few_clouds_day";

        case "cloudy":
          return "broken";

        case "rain":
          return "rain";

        case "sleet":
          return "icon_clear_sky_day";

        case "snow":
          return "icon_snow";

        case "wind":
          return "icon_clear_sky_day";

        case "fog":
          return "icon_mist";

        default:
          return "sun_rain";
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>