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
import { async } from "q";
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
        console.log(geo);

        const latlng = geo.lat + "," + geo.lng;
        console.log(latlng);

        geocoder.geocode({ location: geo }, (results, status) => {
          if (status !== "OK" || !results[0]) {
            console.log(status);

            throw new Error(status);
          }
          // console.log(results[0].geometry.location.lat());
          // console.log(results[0].geometry.location.lng());
          console.log(results[0].formatted_address);

          this.$store.dispatch("set_areas", results[0].formatted_address);
          // const loc = {
          //   lat: results[0].geometry.location.lat(),
          //   lng: results[0].geometry.location.lng()
          // };
          // this.$store.dispatch("get_current", loc).then(() => {
          //   this.loading = false;
          // });

          // map.setCenter(results[0].geometry.location);
          // map.fitBounds(results[0].geometry.viewport);
        });
      } catch (error) {
        console.log(error);
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
      console.log("error");
    }
  },
  created() {
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
      console.log("oops enter your city manually!");
    }
  },
  async mounted() {
    // try {
    //   const google = await gmapsInit();
    //   const geocoder = new google.maps.Geocoder();
    //   console.log(this.area);
    //   const latlng = new google.maps.LatLng(
    //     this.area.latitude,
    //     this.area.longitude
    //   );
    //   geocoder.geocode({ location: latlng }, (results, status) => {
    //     if (status !== "OK" || !results[0]) {
    //       console.log(status);
    //       throw new Error(status);
    //     }
    //     // console.log(results[0].geometry.location.lat());
    //     // console.log(results[0].geometry.location.lng());
    //     console.log(results[0]);
    //     this.area = results[0].formatted_address;
    //     // const loc = {
    //     //   lat: results[0].geometry.location.lat(),
    //     //   lng: results[0].geometry.location.lng()
    //     // };
    //     // this.$store.dispatch("get_current", loc).then(() => {
    //     //   this.loading = false;
    //     // });
    //     // map.setCenter(results[0].geometry.location);
    //     // map.fitBounds(results[0].geometry.viewport);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }
};
</script>

<style>
</style>
