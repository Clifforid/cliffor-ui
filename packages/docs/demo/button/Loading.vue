<template>
  <div>
    <cl-button type="primary" loading>Loading</cl-button>
    <cl-button type="primary" loading-icon="circle-notch" loading
      >Loading</cl-button
    >
    <cl-button type="primary" loading>
      <template #loading>
        <cl-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </cl-button>
  </div>
</template>
