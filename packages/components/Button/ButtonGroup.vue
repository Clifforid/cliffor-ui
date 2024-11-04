<script setup lang="ts">
import type { ButtonGroupProps } from "./types";
import { reactive, provide, toRef } from "vue";
import { BUTTON_GROUP_CTX_KEY } from "./constants";

defineOptions({
  name: "ClButtonGroup",
});
const props = defineProps<ButtonGroupProps>();
provide(
  BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, "size"),
    type: toRef(props, "type"),
    disabled: toRef(props, "disabled"),
  })
);
</script>

<template>
  <div class="cl-button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
./constants
