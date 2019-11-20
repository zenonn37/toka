<template>
  <div class="Map"></div>
</template>

<script>
import gmapsInit from "@/utils/gmap";
export default {
  name: "Map",
  props: ["location"],
  data() {
    return {
      lat: "",
      lng: ""
    };
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el, {
        zoom: 12,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ]
      });

      geocoder.geocode({ address: this.location }, (results, status) => {
        if (status !== "OK" || !results[0]) {
          throw new Error(status);
        }
        // console.log(results[0].geometry.location.lat());
        // console.log(results[0].geometry.location.lng());
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
        const pos = {
          lat: lat,
          lng: lng
        };
        // console.log(pos);

        // const markers = locations.map(x => new google.maps.Marker({ ...x, map }));
        let marker = new google.maps.Marker({
          position: pos,
          map: map
        });
      });
    } catch (error) {
      this.$store.dispatch("set_errors", error);
      console.error(error);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>