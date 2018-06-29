<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import { debounce } from '@/utils';

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener('resize', this.__resizeHanlder);
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder);
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder);

    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    setOptions({ scoreData, assistData, defendData, reboundData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['1', '2', '3', '4', '5', '6', '7'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['得分', '助攻', '盖帽', '篮板']
        },
        series: [{
          name: '得分', itemStyle: {
            normal: {
              color: '#40c9c6',
              lineStyle: {
                color: '#40c9c6',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: scoreData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '助攻',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#36a3f7',
              lineStyle: {
                color: '#36a3f7',
                width: 2
              }
            }
          },
          data: assistData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '盖帽',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#f4516c',
              lineStyle: {
                color: '#f4516c',
                width: 2
              }
            }
          },
          data: defendData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '篮板',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#d39cf5',
              lineStyle: {
                color: '#d39cf5',
                width: 2
              }
            }
          },
          data: reboundData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData);
    }
  }
};
</script>
