<script setup lang="ts">
import { ref, computed } from "vue";
import { addUnit } from "@cliffor-ui/utils";
import type { PopconfirmProps, PopconfirmEmits } from "./types";
import type { TooltipInstance } from "../Tooltip/types";

import ClTooltip from "../Tooltip/Tooltip.vue";
import ClButton from "../Button/Button.vue";

defineOptions({
  name: "ClPopconfirm",
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: "",
  confirmButtonType: "primary",
  confirmButtonText: "Yes",
  cancelButtonText: "No",
  icon: "question-circle",
  iconColor: "#f90",
  hideAfter: 200,
  width: 150,
});
const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
const style = computed(() => ({ width: addUnit(props.width) }));

function hidePopper() {
  tooltipRef.value?.hide();
}
function confirm(e: MouseEvent) {
  emits("confirm", e);
  hidePopper();
}
function cancel(e: MouseEvent) {
  emits("cancel", e);
  hidePopper();
}
</script>
<template>
  <cl-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <template #content>
      <div class="cl-popconfirm" :style="style">
        <div class="cl-popconfirm__main">
          <cl-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
      </div>
      <div class="cl-popconfirm__action">
        <cl-button size="small" :type="cancelButtonType" @click="cancel">{{
          cancelButtonText
        }}</cl-button>
        <cl-button size="small" :type="confirmButtonType" @click="confirm">{{
          confirmButtonText
        }}</cl-button>
      </div>
    </template>
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </cl-tooltip>
</template>

<style lang="scss">
@import "./style.css";
</style>
