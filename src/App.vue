<template>
  <div>
    <button @click="test()"></button>
    <router-view />
  </div>
</template>
<script>
export default {
  components: {},
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
