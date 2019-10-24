<template>
  <form @submit.prevent="onSubmit()">
    <input type="text" v-model.trim="weather.city" placeholder="City" />
    <input type="text" v-model="weather.state" placeholder="State" />
    <button type="submit">Locations</button>
  </form>
</template>

<script>
export default {
  name: "LocationForm",
  components: {},
  data() {
    return {
      weather: {
        city: "",
        state: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$emit("location", this.weather);
    }
  }
};
</script>

