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
          <ValidationProvider
            name="Location"
            rules="required|min:2|max:50|alpha_spaces"
            v-slot="{errors}"
          >
            <div class="search-box">
              <input
                class="search-text"
                type="text"
                v-model.trim="locations.city"
                placeholder="Enter Location"
                @keydown.enter="onSend()"
              />

              <div class="search-btn" @click="onSend()">
                <i class="fas fa-search"></i>
              </div>
            </div>
            <div class="errors">{{errors[0]}}</div>
          </ValidationProvider>
        </nav>

        <div class="weather">
          <div class="weather-header">
            <div class="city">{{areas}}</div>

            <div class="temp-icon">
              <div class="weather-icon">
                <img :src="`images/${current.icon}.png`" :alt="`${current.icon}`" />
              </div>
              <div class="temp">{{current.temperature | numWHOLE}}</div>
            </div>
            <div>{{current.time | day_hour}}</div>
            <div class="summary">{{current.summary}}</div>
            <div class="header-hilo">
              <span>{{days.apparentTemperatureHigh | numWHOLE}}</span> /
              <span>{{days.apparentTemperatureLow | numWHOLE}}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
import moment from "moment";
import gmapsInit from "@/utils/gmap";

//import LocationForm from "@/components/LocationForm";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "Header",
  components: {
    // LocationForm,
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

  methods: {
    async onSend() {
      if (this.locations.city === "" || this.locations.city.length < 2) {
        this.$toast.open({
          message: "Error, enter a location",
          type: "error",
          position: "top"
        });
        return false;
      }
      this.loading = true;
      try {
        const google = await gmapsInit();
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(
          { address: this.locations.city },
          (results, status) => {
            if (status !== "OK" || !results[0]) {
              //console.log(status);
              this.$store.dispatch("set_errors", status);
              this.$toast.open({
                message: "No Results Found",
                type: "warning",
                position: "top"
              });
              //throw new Error(status);
              return false;
            }

            this.area = results[0].formatted_address;
            const loc = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };

            this.$store.dispatch("get_current", loc).then(() => {
              this.$store.dispatch("set_areas", results[0].formatted_address);
              this.loading = false;

              this.$toast.open({
                message: "Location Updated",
                type: "success",
                position: "top"
              });
            });

            // map.setCenter(results[0].geometry.location);
            // map.fitBounds(results[0].geometry.viewport);
          }
        );
      } catch (error) {
        // console.log(error);
        this.$toast.open({
          message: "Internal Error, please refresh the page",
          type: "error",
          position: "top"
        });
      }
    },
    getLocation(value) {
      this.loading = true;
      // console.log(value);
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
    days() {
      const daily = this.$store.getters.get_daily;

      if (daily !== null || daily !== undefined) {
        return daily[0];
      } else {
        return [];
      }
    },
    hourly() {
      const hour = this.$store.getters.get_hourly;

      if (hour !== null) {
        return hour;
      } else {
        return [];
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