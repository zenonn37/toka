<template>
  <header>
    <div class="logo">TOKA</div>
    <nav>
      <ul>
        <li>
          <i class="fas fa-calendar"></i>
          {{day}}
        </li>
        <li>
          <i class="fas fa-sign-out-alt"></i>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      base: ""
    };
  },

  methods: {},

  computed: {
    day() {
      return moment().format("dddd  Do,h:mm a");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>