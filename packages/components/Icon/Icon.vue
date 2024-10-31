<script setup lang="ts">
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";
import { computed } from "vue";

defineOptions({
  name: "ClIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();
const filterProps = computed(() => omit(props, ["type", "color"]));
const customStyle = computed(() => ({ color: props.color ?? void 0 }));
</script>
<template>
  <i
    class="cl-icon"
    :class="[`cl-icon--${props.type}`]"
    :style="customStyle"
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="filterProps" :icon="props.icon" />
  </i>
</template>
<style scoped>
.cl-icon {
  --cl-icon-color: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--er-icon-color);
  font-size: inherit;
}

@each $val in primary, info, success, warning, danger {
  .cl-icon--$(val) {
    --cl-icon-color: var(--cl-color-$(val));
  }
}
</style>
