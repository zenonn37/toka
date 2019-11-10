<template>
  <header :style="cssProps">
    <div class="container">
      <template v-if="current === null">
        <div class="loader_parent">
          <div class="weather_loader">
            <half-circle-spinner :animation-duration="1000" :size="50" color="#000000" />
          </div>

          <div class="loader-text">loading weather data...</div>
        </div>
      </template>

      <template v-else>
        <nav>
          <div class="search-box">
            <LocationForm @location="getLocation" />
            <i class="fas fa-search"></i>
          </div>
        </nav>

        <div class="weather">
          <div class="weather-header">
            <div v-if="location !== undefined" class="city">{{location.city}}, {{ location.state}}</div>
            <div v-else class="city">Loading City</div>

            <div class="temp-icon">
              <div class="weather-icon">
                <img :src="`images/${icons}.png`" alt="few clouds" />
              </div>
              <div class="temp">{{current.temperature | numWHOLE}}</div>
            </div>
            <div>{{current.time | unix}}</div>
            <div class="summary">{{current.summary}}</div>
          </div>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
import moment from "moment";
import LocationForm from "@/components/LocationForm";
import { HalfCircleSpinner } from "epic-spinners";
export default {
  name: "Header",
  components: {
    LocationForm,
    HalfCircleSpinner
  },
  data() {
    return {
      base: "",
      cssProps: {
        backgroundImage: `url(${require("@/assets/clouds.png")})`
      }
    };
  },

  methods: {
    getLocation(value) {
      this.loading = true;
      console.log(value);
      this.$store.dispatch("get_current", value).then(() => {
        this.loading = false;
      });
    }
  },

  computed: {
    location() {
      return this.$store.getters.get_city;
    },
    current() {
      return this.$store.getters.get_current;
      // return null;
    },
    icons() {
      const icon = this.current.icon;
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
    },

    day() {
      return moment().format("dddd  Do,h:mm a");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>