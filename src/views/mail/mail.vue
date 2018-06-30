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
import attendMatch from './components/attendMatch';
import handleApplication from './components/handleApplication';
import applyResult from './components/applyResult';
import receivePigeon from './components/receivePigeon';

export default {
  components: {
    mailbox,
    resultForm,
    attendMatch,
    handleApplication,
    applyResult,
    receivePigeon
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
      this.row = row;
      if (row.type === 'result') {
        this.currentTab = 'resultForm';
      } else if (row.type === 'mailbox') {
        this.currentTab = 'mailbox';
      } else if (row.type === 'invitation') {
        this.currentTab = 'attendMatch';
      } else if (row.type === 'apply') {
        this.currentTab = 'handleApplication';
      } else if (row.type === 'refuse' || row.type === 'permit') {
        this.currentTab = 'applyResult';
      } else if (row.type === 'pigeon') {
        this.currentTab = 'receivePigeon';
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