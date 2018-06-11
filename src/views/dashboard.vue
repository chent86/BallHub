<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{username}}</div>
    <div class="dashboard-text" v-if="age_seen">age:{{age}}</div>
    <div class="dashboard-text" v-if="sex_seen">sex:{{sex}}</div>
    <div class="dashboard-text">free time:{{free_time}}</div>
    <div class="dashboard-text">role:{{role}}</div>
    <div class="dashboard-text" v-if="price_seen">price:{{price}}</div>
    <div class="dashboard-text" v-if="team_name_seen">team name:{{team_name}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'username',
      'age',
      'sex',
      'free_time',
      'role',
      'price',
      'team_name'
    ]),
    team_name_seen: function() {
      return this.role === 'team';
    },
    price_seen: function() {
      return this.role === 'referee';
    },
    age_seen: function() {
      return this.role !== 'team';
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
