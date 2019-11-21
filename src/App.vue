<template>
  <div class="main-content">
    <div class="child-content">
      <div></div>
      <!-- <img src="/images/storm.jpg" alt /> -->
      <Header />
    </div>

    <SubHeader />
    <div class="content">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import gmapsInit from "@/utils/gmap";

export default {
  components: {
    Header,
    SubHeader
  },
  data() {
    return {
      area: ""
    };
  },
  methods: {
    async setArea(geo) {
      try {
        const google = await gmapsInit();
        const geocoder = new google.maps.Geocoder();
        const lat = geo.latitude;
        const lng = geo.longitude;
        // console.log(geo);

        const latlng = geo.lat + "," + geo.lng;
        // console.log(latlng);

        geocoder.geocode({ location: geo }, (results, status) => {
          if (status !== "OK" || !results[0]) {
            console.log(status);
            this.$toast.open({
              message: "Location error refresh the page",
              type: "warning",
              position: "top"
            });
            //throw new Error(status);
          }

          //console.log(results[0].formatted_address);

          this.$store.dispatch("set_areas", results[0].formatted_address);
        });
      } catch (error) {
        this.$toast.open({
          message: "Internal Error, please refresh the page",
          type: "error",
          position: "top"
        });
      }
    },
    //callback sucess
    success(position) {
      const geo = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.setArea(geo);
      this.$store.dispatch("SET_LOCATION", geo);
    },
    error() {
      //console.log("error");
      const geo = {
        lat: 40.7127753,
        lng: -74.0059728
      };
      this.setArea(geo);
      this.$store.dispatch("SET_LOCATION", geo);
    }
  },
  created() {
    console.log(process.env.VUE_APP_GOOGLE);

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    //check if browswer allows location service
    if ("geolocation" in navigator) {
      //get position and pass data to callback success function otherwise, pass
      //errors to error callback function
      navigator.geolocation.getCurrentPosition(
        this.success,
        this.error,
        options
      );
    } else {
      //as user to manually enter location, use reverse geocode api call on server
      //console.log("oops enter your city manually!");
    }
  }
};
</script>

<style>
</style>
