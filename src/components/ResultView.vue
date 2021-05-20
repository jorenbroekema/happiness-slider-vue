<template>
  <div>
    <p>{{ this.moodText }} {{ this.moodEmoji }}</p>
    <p>Did you change your mood?</p>
    <router-link to="/">Go back</router-link>
  </div>
</template>

<script>
export default {
  name: 'ResultView',
  computed: {
    moodText() {
      return this.$store.state.moodText;
    },
    moodEmoji() {
      return this.$store.state.moodEmoji;
    },
  },
};
</script>
