<template>
  <div id="dynamic-component-demo" class="app-container">
    <el-button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-on:click="currentTab = tab"
        :type="buttonType[tab]"
    >{{ buttonName[tab] }}</el-button>

    <component
        v-bind:is="currentTabComponent"
    ></component>
  </div>
</template>

<script>
import searchCourt from './components/searchCourt';
import addCourt from './components/addCourt';

export default {
  components: {
    searchCourt,
    addCourt
  },
  data() {
    return {
      currentTab: 'searchCourt',
      tabs: ['searchCourt', 'addCourt'],
      buttonName: { 'searchCourt': '所有球场', 'addCourt': '添加球场' },
      buttonType: { 'searchCourt': 'primary', 'addCourt': 'success' }
    };
  },
  computed: {
    currentTabComponent: function() {
      return this.currentTab;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  background: #fff;
  padding: 16px 16px 16px 16px; 
  margin: 32px;
}
</style>