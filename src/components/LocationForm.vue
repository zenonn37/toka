<template>
  <form @submit.prevent="onSubmit()">
    <input type="text" v-model.trim="weather.city" placeholder="City" />
    <!-- <input type="text" v-model="weather.state" placeholder="State" /> -->
    <span v-if="error !== null">{{error}}</span>
    <!-- <button type="submit">Locations</button> -->
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
  computed: {
    error() {
      return this.$store.getters.get_error;
    }
  },
  methods: {
    onSubmit() {
      this.$emit("location", this.weather);
    }
  }
};
</script>

