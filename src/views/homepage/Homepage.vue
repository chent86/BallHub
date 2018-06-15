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
import Organize from './components/Organize';
import Join from './components/Join';

export default {
  components: {
    Organize,
    Join
  },
  data() {
    return {
      currentTab: 'Join',
      tabs: ['Join', 'Organize'],
      buttonName: { 'Join': '查询球局', 'Organize': '发起球局' }
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