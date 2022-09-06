<template>
  <p
    v-if="msg"
    id="p"
  >
    <span>
      <span>{{ msg }}</span>
    </span>
    <span>{{ msg2 }}</span>
  </p>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
  setup() {
    const msg = ref('Hello');
    const msg2 = ref('-World!');

    setTimeout(() => {
      msg.value = 'ByeBye';
      setTimeout(() => {
        msg.value = '';
      }, 5000);
    }, 5000);

    return {
      msg,
      msg2,
    };
  },
});
</script>
