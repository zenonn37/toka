<template>
  <div class="daily-chart">
    <div class="avg-temps">
      <h6>{{title}}</h6>
      <h2 :class="[meta === 'true'  ? 'degree' : 'empty']">{{avg}}</h2>
    </div>
    <div class="avg-temps">
      <h6>{{title2}}</h6>
      <h2 :class="[meta2 === 'true'  ? 'degree' : 'empty']">{{avg2}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Average",
  props: ["avg", "avg2", "title", "title2", "meta", "meta2"],
  data() {
    return {
      high: 0,
      low: 0,
      vis: 0,
      wind: 0,
      humid: 0,
      dew: 0,
      cloud: 0,
      gust: 0
    };
  }
};
</script>

