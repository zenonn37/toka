<template>
  <div class="search-box">
    <form @submit.prevent="onSubmit()">
      <input
        type="text"
        class="search-text"
        v-model.trim="weather.city"
        placeholder="Enter Location"
      />
      <!-- <input type="text" v-model="weather.state" placeholder="State" /> -->

      <!-- <button type="submit">Locations</button> -->
    </form>
    <!-- <input class="search-text" type="text" placeholder="Enter city" /> -->
    <div class="search-btn">
      <i class="fas fa-search"></i>
    </div>
  </div>
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

