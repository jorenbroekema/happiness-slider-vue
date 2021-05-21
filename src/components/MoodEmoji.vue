<template>
  <div>
    <component :is="componentName" :key="mood"></component>
  </div>
</template>

<script>
import Icon0 from '../assets/smilie-svgs/0.svg';
import Icon1 from '../assets/smilie-svgs/1.svg';
import Icon2 from '../assets/smilie-svgs/2.svg';
import Icon3 from '../assets/smilie-svgs/3.svg';
import Icon4 from '../assets/smilie-svgs/4.svg';

export default {
  name: 'MoodEmoji',
  components: {
    Icon0,
    Icon1,
    Icon2,
    Icon3,
    Icon4,
  },
  props: {
    mood: Number,
  },
  beforeUpdate() {
    this.componentName = `Icon${this.mood - 1}`;
  },
  data() {
    return {
      emojis: ['😔', '🙁', '😐', '🙂', '😀'],
      componentName: 'Icon2',
    };
  },
};
</script>
