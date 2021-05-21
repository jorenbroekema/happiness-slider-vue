<template>
  <div class="container">
    <h1>Happiness Slider</h1>
    <h2>How are you feeling?</h2>
    <p>{{ ariaValueText }}</p>
    <MoodEmoji ref="emoji" :mood="mood"></MoodEmoji>
    <form @submit="submit">
      <input
        class="slider"
        aria-label="Happiness slider"
        @input="setMood"
        type="range"
        name="happiness"
        value="3"
        :aria-valuetext="ariaValueText"
        min="1"
        max="5"
        step="1"
      />
      <button class="submit-btn">Submit</button>
    </form>
    <p v-if="error" class="error">
      Something went wrong processing your request. Try again later.
    </p>
  </div>
</template>

<script>
import MoodEmoji from './MoodEmoji.vue';

export default {
  name: 'SliderView',
  components: {
    MoodEmoji,
  },
  data() {
    return {
      mood: 3,
      ariaValueText: 'I am feeling neutral',
      error: false,
    };
  },
  methods: {
    setMood(ev) {
      // Instead of reading 1 to 5, the screenreader
      // will read out these values upon changing the value
      const valueTexts = [
        'I am feeling very unhappy',
        'I am feeling somewhat unhappy',
        'I am feeling neutral',
        'I am feeling happy',
        'I am feeling very happy',
      ];
      this.mood = parseInt(ev.target.value, 10);
      this.ariaValueText = valueTexts[this.mood - 1];
    },
    async submit(ev) {
      ev.preventDefault();

      const result = await fetch(
        'https://automation.uselab.com/api/fe-test/mood',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mood: this.mood }),
        },
      );

      if (result.status === 200) {
        const response = await result.json();
        const moodText = response.data.text;
        this.$store.commit('setMoodText', moodText);
        this.$store.commit(
          'setMoodEmoji',
          this.$refs.emoji.emojis[this.mood - 1],
        );
        this.$router.push('result');
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 20px;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 4rem;
}

@media (min-width: 350px) {
  h1 {
    font-size: 3rem;
  }
}

.submit-btn {
  background-color: lightsalmon;
  color: black;
  border: none;
  font-size: 1.5rem;
  padding: 0.5em 1em;
  border-radius: 0.25em;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.33);
  transition: all 0.2s ease-in-out;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.33);
}

$track-w: 15em;
$track-h: 0.25em;
$thumb-d: 1.25em;

@mixin track() {
  box-sizing: border-box;
  border: none;
  width: $track-w;
  height: $track-h;
  background: #ccc;
}

@mixin thumb() {
  box-sizing: border-box;
  border: none;
  width: $thumb-d;
  height: $thumb-d;
  border-radius: 50%;
  background: lightsalmon;
}

[type='range'] {
  display: block;
  margin: 40px auto;
  max-width: $track-w;
  width: 100%;
  height: $thumb-d;
  background: transparent;
  font: 1em Arial, sans-serif;

  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &::-webkit-slider-runnable-track {
    @include track;
  }
  &::-moz-range-track {
    @include track;
  }
  &::-ms-track {
    @include track;
  }

  &::-webkit-slider-thumb {
    margin-top: 0.5 * ($track-h - $thumb-d);
    @include thumb;
  }
  &::-moz-range-thumb {
    @include thumb;
  }
  &::-ms-thumb {
    margin-top: 0;
    @include thumb;
  }

  &::-ms-tooltip {
    display: none;
  }
}
</style>
