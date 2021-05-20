<template>
  <div>{{ emojis[mood - 1] }}</div>
</template>

<script>
export default {
  name: 'MoodEmoji',
  props: {
    mood: Number,
  },
  data() {
    return {
      emojis: ['😔', '🙁', '😐', '🙂', '😀'],
    };
  },
};
</script>
