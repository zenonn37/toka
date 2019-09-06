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
            <img :src="`images/${visual}.png`" alt="Weather Logo" />
          </div>
        </div>
        <!--card day-->
        <div class="day">
          <div class="report">
            <img src="../assets/sun_rain.png" alt="sun with rain" />
            <div class="current">
              <span>55</span>
            </div>
            <div class="time">12AM</div>
          </div>
          <div class="report">
            <img src="../assets/sun_rain.png" alt="sun with rain" />
            <div class="current">
              <span>50</span>
            </div>
            <div class="time">3AM</div>
          </div>
          <div class="report">
            <img src="../assets/sun_rain.png" alt="sun with rain" />
            <div class="current">
              <span>48</span>
            </div>
            <div class="time">6AM</div>
          </div>
          <div class="report">
            <img src="../assets/sun_rain.png" alt="sun with rain" />
            <div class="current">
              <span>55</span>
            </div>
            <div class="time">9AM</div>
          </div>
          <div class="report">
            <img src="../assets/sun_rain.png" alt="sun with rain" />
            <div class="current">
              <span>75</span>
            </div>
            <div class="time">12PM</div>
          </div>

          <div class="report">
            <img src="../assets/sun_rain.png" alt="sun with rain" />
            <div class="current">
              <span>77</span>
            </div>
            <div class="time">3PM</div>
          </div>
          <div class="report">
            <img src="../assets/sun_rain.png" alt="sun with rain" />
            <div class="current">
              <span>70</span>
            </div>
            <div class="time">6PM</div>
          </div>
          <div class="report">
            <img src="../assets/sun_rain.png" alt="sun with rain" />
            <div class="current">
              <span>68</span>
            </div>
            <div class="time">9PM</div>
          </div>
          <div class="report">
            <img src="../assets/sun_rain.png" alt="sun with rain" />
            <div class="current">
              <span>60</span>
            </div>
            <div class="time">12AM</div>
          </div>
        </div>

        <!--card body-->
        <div class="daily">
          <ul>
            <li>
              <div class="day-line">
                <div class="week-day">Sunday</div>
                <div class="image">
                  <img src="../assets/sun_rain.png" alt="sun with rain" />
                </div>
                <div class="temp-range">
                  <span>65</span>
                  <span>/</span>
                  <span>50</span>
                </div>
              </div>
              <div class="day-line">
                <div class="week-day">Monday</div>
                <div class="image">
                  <img src="../assets/sun_rain.png" alt="sun with rain" />
                </div>
                <div class="temp-range">
                  <span>65</span>
                  <span>/</span>
                  <span>50</span>
                </div>
              </div>
              <div class="day-line">
                <div class="week-day">Tuesday</div>
                <div class="image">
                  <img src="../assets/sun_rain.png" alt="sun with rain" />
                </div>
                <div class="temp-range">
                  <span>65</span>
                  <span>/</span>
                  <span>50</span>
                </div>
              </div>
              <div class="day-line">
                <div class="week-day">Wednesday</div>
                <div class="image">
                  <img src="../assets/sun_rain.png" alt="sun with rain" />
                </div>
                <div class="temp-range">
                  <span>65</span>
                  <span>/</span>
                  <span>50</span>
                </div>
              </div>
              <div class="day-line">
                <div class="week-day">Thursday</div>
                <div class="image">
                  <img src="../assets/sun_rain.png" alt="sun with rain" />
                </div>
                <div class="temp-range">
                  <span>65</span>
                  <span>/</span>
                  <span>50</span>
                </div>
              </div>
              <div class="day-line">
                <div class="week-day">Friday</div>
                <div class="image">
                  <img src="../assets/sun_rain.png" alt="sun with rain" />
                </div>
                <div class="temp-range">
                  <span>65</span>
                  <span>/</span>
                  <span>50</span>
                </div>
              </div>
              <div class="day-line">
                <div class="week-day">Saturday</div>
                <div class="image">
                  <img src="../assets/sun_rain.png" alt="sun with rain" />
                </div>
                <div class="temp-range">
                  <span>65</span>
                  <span>/</span>
                  <span>50</span>
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
    visual() {
      const detail = this.$store.getters.GET_DATA.weather[0];

      switch (detail.main) {
        case "Clouds":
          console.log("clounds");
          return "part_sun";

          break;
        case "Clear":
          console.log("clear sky");
          return "sun";
          break;

        default:
          break;
      }
    },
    local() {
      const temp = numeral(this.$store.getters.GET_DATA.main.temp).format(0.0);
      return temp;
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
  }
};
</script>

