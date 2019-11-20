<template>
  <div class="Map"></div>
</template>

<script>
import gmapsInit from "@/utils/gmap";
export default {
  name: "Map",
  props: ["location"],
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: this.location }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>