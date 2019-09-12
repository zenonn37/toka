<template>
  <div>
    <modal name="hello-world">
      <div class="container">
        <form @submit.prevent="onSubmit">
          <input class="input" type="text" placeholder="enter city" v-model="city" />
          <input type="submit" value="GO" />
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: ""
    };
  },
  methods: {
    onSubmit() {
      console.log(this.city);
      this.$store
        .dispatch("GET_WEATHER", this.city)
        .then(() => {
          this.$modal.hide("hello-world");
          // this.$store
          //   .dispatch("GET_WEATHER")
          //   .then(() => {
          //     this.$modal.hide("hello-world");
          //   })
          //   .catch(err => {});
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
</style>