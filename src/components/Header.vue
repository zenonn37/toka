<template>
  <header>
    <div class="container">
      <nav>
        <div class="search">
          <LocationForm @location="getLocation" />
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

          <div class="summary">{{current.summary}}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import moment from "moment";
import LocationForm from "@/components/LocationForm";
export default {
  name: "Header",
  components: {
    LocationForm
  },
  data() {
    return {
      base: ""
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
    },
    icons() {
      const icon = this.current.icon;
      console.log(icon);

      switch (icon) {
        case "clear-day":
          return "icon_clear_sky_day";
          break;
        case "clear-night":
          return "icon_clear_sky_day";
          break;
        case "partly-cloudy-day":
          return "few_clouds_day";
          break;
        case "partly-cloudy-night":
          return "few_clouds_day";
          break;
        case "cloudy":
          return "broken";
          break;
        case "rain":
          return "rain";
          break;
        case "sleet":
          return "icon_clear_sky_day";
          break;
        case "snow":
          return "icon_snow";
          break;
        case "wind":
          return "icon_clear_sky_day";
          break;
        case "fog":
          return "icon_mist";
          break;

        default:
          return "sun_rain";
          break;
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