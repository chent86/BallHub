<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">birthday or founded day:{{birthday}}</div>
    <div class="dashboard-text" v-if="sex_seen">sex:{{sex}}</div>
    <div class="dashboard-text">free time1:{{free_time_1}}</div>
    <div class="dashboard-text">free time2:{{free_time_2}}</div>
    <div class="dashboard-text">role:{{role}}</div>
    <div class="dashboard-text" v-if="price_seen">price:{{price}}</div>
    <div class="dashboard-text" v-if="motto_seen">team motto:{{motto}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'birthday',
      'sex',
      'free_time_1',
      'free_time_2',
      'role',
      'price',
      'motto'
    ]),
    motto_seen: function() {
      return this.role === 'team';
    },
    price_seen: function() {
      return this.role === 'referee';
    },
    sex_seen: function() {
      return this.role !== 'team';
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
