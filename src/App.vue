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
    success(position) {
      console.log(position.coords.latitude, position.coords.longitude);

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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
      //console.log(position.coords.latitude, position.coords.longitude);
    } else {
      console.log("oops enter your city manually!");
    }
  }
};
</script>

<style>
</style>
