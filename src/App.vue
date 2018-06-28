<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#app {
  height: 100%;
}
</style>
