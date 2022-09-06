<template>
  <p
    v-if="msg"
    id="p"
  >
    <span
      id="span1"
      @click="onClickMsgOne"
    >{{ msg }}</span>
    <span
      id="span2"
      @click="onClickMsgTwo"
    >{{ msg2 }}</span>
  </p>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';

export default defineComponent({
  setup() {
    const msg = ref('Hello');
    const msg2 = ref('-World!');

    const onClickMsgOne = () => {
      msg.value = 'ByeBye';
    };
    const onClickMsgTwo = () => {
      msg.value = '';
    };

    return {
      msg,
      msg2,
      onClickMsgOne,
      onClickMsgTwo,
    };
  },
});
</script>
