<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from "./types";
import { typeIconMap } from "@cliffor-ui/utils";
import { ref, computed, useSlots } from "vue";
import ClIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ClAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  effect: "light",
  type: "info",
  closable: true,
});

const emits = defineEmits<AlertEmits>();

const slots = useSlots();

const visible = ref(true);

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
const withDescription = computed(() => props.description || slots.default);

function close() {
  visible.value = false;
  emits("close");
}

function open() {
  visible.value = true;
}

defineExpose<AlertInstance>({
  open,
  close,
});
</script>
<template>
  <transition name="cl-alert-fade">
    <div
      v-show="visible"
      class="cl-alert"
      role="alert"
      :class="{
        [`cl-alert__${type}`]: type,
        [`cl-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <cl-icon
        v-if="showIcon"
        class="cl-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="cl-alert__content">
        <span
          class="cl-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="cl-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="cl-alert__close" v-if="closable">
          <cl-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
@import "./style.css";
</style>
