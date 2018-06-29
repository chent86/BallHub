<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="myResult"></line-chart>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart></raddar-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import LineChart from './components/LineChart';
import PanelGroup from './components/PanelGroup';
import RaddarChart from './components/RaddarChart';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import { mapGetters } from 'vuex';

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 140],
    actualData: [120, 82, 91, 154, 162, 140, 190],
    testData: [60, 40, 200, 100, 120, 190, 160]
  },
  messages: {
    expectedData: [300, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  },
  performance: {
    scoreData: [10, 2, 7, 0, 5, 8, 0],
    assistData: [5, 6, 8, 2, 10, 5, 7],
    defendData: [3, 9, 5, 2, 5, 10, 2],
    reboundData: [10, 8, 9, 5, 6, 4, 3]
  }
};

export default {
  name: 'dashboard-admin',
  components: {
    LineChart,
    PanelGroup,
    RaddarChart,
    PieChart,
    BarChart,
  },
  data() {
    return {
      lineChartData: lineChartData.performance
    };
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type];
    }
  },
  computed: {
    ...mapGetters([
      'myResult'
    ])
  },
  mounted() {
    // 不使用mounted，而使用路由中的beforeEnter，为了达到曲线逐渐绘制的效果
    // this.$store.dispatch('GetMyResult').then((res) => {
    //   this.loading = false;
    // }).catch((err) => {
    //   this.loading = false;
    //   console.log(err);
    // });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
