<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <cl-alert type="success">Success alert</cl-alert>
    <cl-alert type="info">Info alert</cl-alert>
    <cl-alert type="warning">Warning alert</cl-alert>
    <cl-alert type="danger">Error alert</cl-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <cl-alert type="success" title="Success alert" />
    <cl-alert type="info" title="Info alert" />
    <cl-alert type="warning" title="Warning alert" />
    <cl-alert type="danger" title="Error alert" />
  </div>
</template>
