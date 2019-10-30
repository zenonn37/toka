<template>
  <div class="main-content">
    <div class="child-content">
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
export default {
  components: {
    Header,
    SubHeader
  },
  methods: {
    test() {
      this.$store.dispatch("SET_LOCATION");
    },
    //callback sucess
    success(position) {
      //console.log(position.coords.latitude, position.coords.longitude);

      const geo = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.$store.dispatch("SET_LOCATION", geo);
    },
    error() {
      console.log("error");
    }
  },
  created() {
    //check if browswer allows location service
    if ("geolocation" in navigator) {
      //get position and pass data to callback success function otherwise, pass
      //errors to error callback function
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    } else {
      //as user to manually enter location, use reverse geocode api call on server
      console.log("oops enter your city manually!");
    }
  }
};
</script>

<style>
</style>
