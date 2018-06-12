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
import BasisInfo from './components/BasicInfo';
import UpdatePassword from './components/UpdatePassword';

export default {
  components: {
    BasisInfo,
    UpdatePassword
  },
  data() {
    return {
      currentTab: 'BasisInfo',
      tabs: ['BasisInfo', 'UpdatePassword'],
      buttonName: { 'BasisInfo': '基本信息', 'UpdatePassword': '修改密码' }
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