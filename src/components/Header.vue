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
          <!-- <LocationForm @location="getLocation" /> -->
          <div class="search-box">
            <input
              class="search-text"
              type="text"
              v-model.trim="locations.city"
              placeholder="Enter city"
              @keydown.enter="onSend()"
            />
            <div class="search-btn" @click="onSend()">
              <i class="fas fa-search"></i>
            </div>
          </div>
        </nav>

        <div class="weather">
          <div class="weather-header">
            <div class="city">{{areas}}</div>

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
import gmapsInit from "@/utils/gmap";
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
      locations: {
        city: ""
      },
      area: "",
      base: "",
      cssProps: {
        backgroundImage: `url(${require("@/assets/clouds.png")})`
      }
    };
  },

  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: "Greenwich NY" }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          console.log(status);

          throw new Error(status);
        }
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());

        // map.setCenter(results[0].geometry.location);
        // map.fitBounds(results[0].geometry.viewport);
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async onSend() {
      this.loading = true;
      try {
        const google = await gmapsInit();
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
          { address: this.locations.city },
          (results, status) => {
            if (status !== "OK" || !results[0]) {
              console.log(status);

              throw new Error(status);
            }
            console.log(results[0].geometry.location.lat());
            console.log(results[0].geometry.location.lng());
            console.log(results[0]);
            this.area = results[0].formatted_address;
            const loc = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };

            this.$store.dispatch("get_current", loc).then(() => {
              this.$store.dispatch("set_areas", results[0].formatted_address);
              this.loading = false;
            });

            // map.setCenter(results[0].geometry.location);
            // map.fitBounds(results[0].geometry.viewport);
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    getLocation(value) {
      this.loading = true;
      console.log(value);
      this.$store.dispatch("get_current", value).then(() => {
        this.loading = false;
      });
    }
  },

  computed: {
    areas() {
      const area =
        this.$store.getters.get_area !== null ||
        this.$store.getters.get_area !== undefined
          ? this.$store.getters.get_area
          : "";

      return area;
    },
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