<template>
  <div id="dynamic-component-demo" class="app-container">
    <component
        v-bind:is="currentTabComponent"
        v-on:launch="launch"
        v-bind:row="row"
    ></component>
  </div>
</template>

<script>
import mailbox from './components/mailbox';
import resultForm from './components/resultForm';

export default {
  components: {
    mailbox,
    resultForm
  },
  data() {
    return {
      currentTab: 'mailbox',
      row: {}
    };
  },
  computed: {
    currentTabComponent: function() {
      return this.currentTab;
    }
  },
  methods: {
    launch(row) {
      if (row.type === 'result') {
        this.currentTab = 'resultForm';
        this.row = row;
      } else if (row.type === 'mailbox') {
        this.currentTab = 'mailbox';
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  width: 90%;
  background: #fff;
  padding: 16px 16px 16px 16px; 
  margin: 32px; 
}
</style>