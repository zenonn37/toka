<template>
  <div>
    <template v-if="daily === null">
      <div>Please wait...</div>
    </template>

    <template v-else>
      <div class="daily">
        <div class="daily-list">
          <ul>
            <!--make component-->
            <li v-for="day in daily" :key="day.apparentTemperatureHighTime">
              <div class="weather-list">
                <div class="small-icon">
                  <img width="40px" :src="`/images/${day.icon}.png`" :alt="`${day.icon}`" />
                </div>
                <div class="weather-list-title">
                  <h2>{{day.apparentTemperatureHighTime | day_unix}}</h2>
                  <div>{{day.apparentTemperatureHighTime | date_unix}}</div>
                </div>

                <div class="rain">
                  <div>Rain</div>
                  <div>{{day.precipProbability | percent}}</div>
                </div>

                <div class="temp-range">
                  <div>{{day.apparentTemperatureMax | numWHOLE}}</div>/
                  <div>{{day.apparentTemperatureLow | numWHOLE}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="details">
          <h1>7 Day Average</h1>

          <Average :avg="average.high" :avg2="average.low" title="High" title2="Low" meta="true" />
          <Average
            :avg="average.humid"
            :avg2="average.wind"
            title="Humidity"
            title2="Wind"
            meta="humid"
          />
          <Average
            :avg="average.gust"
            :avg2="average.vis"
            title="Wind Gust"
            title2="Visibilty"
            meta="gust"
          />
          <Average
            :avg="average.dew"
            :avg2="average.cloud"
            title="Dew Point"
            title2="Cloud Cover"
            meta="true"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Average from "@/components/Average";
import numeral from "numeral";
export default {
  name: "Home",
  components: {
    Average
  },
  computed: {
    daily() {
      if (
        this.$store.getters.get_daily === null ||
        this.$store.getters.get_daily === undefined
      ) {
        return [];
      } else {
        return this.$store.getters.get_daily;
      }
    },
    average() {
      const daily = this.daily;
      const high = [];
      const low = [];
      const humid = [];
      const wind = [];
      const gust = [];
      const vis = [];
      const dew = [];
      const cloud = [];

      daily.map(day => {
        high.push(day.apparentTemperatureHigh);
        low.push(day.apparentTemperatureLow);
        humid.push(day.humidity);
        wind.push(day.windSpeed);
        gust.push(day.windGust);
        vis.push(day.visibility);
        dew.push(day.dewPoint);
        cloud.push(day.cloudCover);
      });

      const dailyAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

      dailyAvg(high);

      const days = {
        high: numeral(dailyAvg(high)).format(0.0),
        low: numeral(dailyAvg(low)).format(0.0),
        humid: numeral(dailyAvg(humid)).format("0%"),
        wind: numeral(dailyAvg(wind)).format(0.0) + " mph",
        gust: numeral(dailyAvg(gust)).format(0.0) + " mph",
        vis: numeral(dailyAvg(vis)).format(0.0) + " miles ",
        dew: numeral(dailyAvg(dew)).format(0.0),
        cloud: numeral(dailyAvg(cloud)).format("0%")
      };
      //console.log(days);
      return days;
    }
  }
};
</script>
