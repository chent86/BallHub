<template>
  <div id="dynamic-component-demo" class="app-container">
    <el-button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-on:click="currentTab = tab"
    >{{ buttonName[tab] }}</el-button>

    <component
        v-bind:is="currentTabComponent"
    ></component>
  </div>
</template>

<script>
import organizeGame from './components/organizeGame';
import searchGame from './components/searchGame';

export default {
  components: {
    organizeGame,
    searchGame
  },
  data() {
    return {
      currentTab: 'searchGame',
      tabs: ['searchGame', 'organizeGame'],
      buttonName: { 'searchGame': '所有球局', 'organizeGame': '发起球局' }
    };
  },
  computed: {
    currentTabComponent: function() {
      return this.currentTab;
    }
  }
};
</script>

<style scoped>
</style>