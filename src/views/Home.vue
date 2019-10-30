<template>
  <div class="hourly">
    <ul>
      <li v-for="day in daily" :key="day.apparentTemperatureHighTime">
        <div class="weather-list">
          <div class="weather-list-title">
            <h2>{{day.apparentTemperatureHighTime | day_unix}}</h2>
          </div>

          <div>
            <img width="40px" :src="`/images/${day.icon}.png`" :alt="`${day.icon}`" />
          </div>
          <div class="temp-range">
            <div>{{day.apparentTemperatureMax | numWHOLE}}</div>
            <div>{{day.apparentTemperatureLow | numWHOLE}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  computed: {
    daily() {
      return this.$store.getters.get_daily;
    }
  }
};
</script>
