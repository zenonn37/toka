<template>
  <div>
    <div class="card">
      <!--card header-->
      <template v-if="loaded">loading..</template>

      <template v-else>
        <div class="card-header">
          <div class="temperture">
            <h1 class="temp">{{ local}}</h1>
            <span>{{max}}/</span>
            <span>{{min}}</span>
            <div>{{details}}</div>
            <div class="location" @click="onName()">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{weather.name}}</span>
            </div>
          </div>
          <div class="weather-logo">
            <img :src="`images/${visual}.png`" :alt="`${visual}`" />
          </div>
        </div>

        <!--card day-->
        <div class="day">
          <div class="report" v-for="forcast in forcasts.slice(1,7)" :key="forcast.dt_text">
            <img
              :src="`http://openweathermap.org/img/wn/${forcast.weather[0].icon}@2x.png`"
              :alt="`${forcast.weather[0].description}`"
            />
            <div class="current">
              <span>{{forcast.main.temp | numWHOLE}}</span>
            </div>
            <div class="time">{{forcast.dt_txt | time}}</div>
          </div>
        </div>

        <!--card body-->
        <div class="daily">
          <ul>
            <li>
              <div class="day-line" v-for="forcast in days" :key="forcast.dt_text">
                <div class="week-day">{{forcast.dt_txt | day}}</div>
                <div class="image">
                  <img
                    :src="`http://openweathermap.org/img/wn/${forcast.weather[0].icon}@2x.png`"
                    :alt="`${forcast.weather[0].description}`"
                  />
                </div>
                <div class="temp-range">
                  <span>{{forcast.main.temp_max | numWHOLE }}</span>
                  <span>/</span>
                  <span>{{forcast.main.temp_min | numWHOLE }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </div>
    <Modal />
  </div>
</template>

<script>
import numeral from "numeral";
import Modal from "@/components/Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    weather() {
      return this.$store.getters.GET_DATA;
    },
    forcasts() {
      const list = this.$store.getters.GET_DAY.list;
      return list;
    },
    days() {
      const list = this.$store.getters.GET_DAY.list;

      const arr = list.filter((element, index) => {
        return index % 7 == 0;
      });

      console.log(arr);

      return arr;
    },
    visual() {
      const detail = this.$store.getters.GET_DATA.weather[0];

      switch (detail.description) {
        case "few clouds":
          console.log("few clouds");
          return "part_sun";

        case "clear sky":
          console.log("clear sky");
          return "icon_clear_sky_day";

        case "scattered clouds":
          console.log("scattered clouds");
          return "scat";

        case "broken clouds":
          console.log("broken clouds");
          return "broken";

        case "shower rain":
          console.log("shower rain");
          return "rain_sun";

        case "rain":
          console.log("rain");
          return "rain";

        case "thunderstorm":
          console.log("thunderstorm");
          return "thunderstorm";

        case "snow":
          console.log("snow");
          return "icon_snow";

        case "mist":
          console.log("mist");
          return "icon_mist";

        default:
          return "Issue";
          break;
      }
    },
    local() {
      const temp = numeral(this.$store.getters.GET_DATA.main.temp).format(0.0);
      return temp;
    },
    counter() {
      let num = 0;
      return (num = num + 5);
    },
    max() {
      const temp = numeral(this.$store.getters.GET_DATA.main.temp_max).format(
        0.0
      );
      return temp;
    },
    min() {
      const temp = numeral(this.$store.getters.GET_DATA.main.temp_min).format(
        0.0
      );
      return temp;
    },
    details() {
      const detail = this.$store.getters.GET_DATA.weather[0].description;
      return detail;
    }
  },
  methods: {
    onName() {
      console.log("pressed");
      this.$modal.show("hello-world");
    }
  },

  created() {
    this.loaded = true;
    this.$store.dispatch("CURRENT_WEATHER").then(() => {
      this.loaded = false;
      console.log("loaded");
    });

    // this.$store.dispatch("FORCAST").then(() => {
    //   console.log("forcast");
    // });
  }
};
</script>

