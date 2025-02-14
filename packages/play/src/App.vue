<script setup lang="ts">
import { ClPopconfirm } from "cliffor-ui";

function confirm() {
  console.log("confirm");
}
function cancel() {
  console.log("cancel");
}
</script>

<template>
  <cl-popconfirm title="需要删除吗" @confirm="confirm" @cancel="cancel">
    <cl-button type="primary" size="small">test</cl-button>
  </cl-popconfirm>
  <!-- <cl-button type="primary" size="small">test</cl-button>
  <cl-button type="primary" size="small" icon="search"> search </cl-button>
  <cl-button>default</cl-button>
  <cl-button>111</cl-button> -->
</template>

<style scoped></style>
