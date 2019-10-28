<template>
  <div class="sub-header">
    <div class="sub-container">
      <div class="sub-icons" v-for="hour in limitBy(hourly,6)" :key="hour.time">
        <div class="time">{{hour.time | unix}}</div>
        <div class="image-icon">
          <img width="30px" :src="`images/${hour.icon}.png`" :alt="`${hour.icon}`" />
        </div>
        <div class="small-temp">65</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue2Filters from "vue2-filters";
//import { icon } from "@/mixins/icons";
export default {
  name: "SubHeader",
  mixins: [Vue2Filters.mixin],
  components: {},
  data() {
    return {};
  },
  computed: {
    hourly() {
      return this.$store.getters.get_hourly;
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