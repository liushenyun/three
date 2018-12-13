<template>
  <div class="chart_line_wrap">
    <nav class="chart_title">
      <span class="title_con">{{title}}</span>
      <!-- 统计类型: 1 日 2 周 3 月 -->
      <i class="title_day" :class="{'title_checked': dateName === '1'}" @click="choiceDateActive('1')">日</i>
       <i class="title_wek" :class="{'title_checked': dateName === '2'}" @click="choiceDateActive('2')">周</i>
      <i class="title_mon" :class="{'title_checked': dateName === '3'}" @click="choiceDateActive('3')">月</i>
    </nav>
    <div class="chart_line_container" :id="container">
        <div class="no-data-tip">暂无数据</div>
    </div>
  </div>  
</template>

<script>
import { lineChart } from '../../global/highcharts-config'
export default {
  name: 'ChartLine',
  data() {
    return {
      dateName: '1'
    }
  },
  mounted() {
    this.toMakeChartActive(this.chartData)
  },
  props: {
    chartData: {
      default() {
        return {
          color: '#4BB0F5',
          xAxis: [],
          data: [],
          name: '大哭三句话',
          unit: '个',
          rgb: '79,177,245'
        }
      },
      type: Object
    },
    container: { // 表容器
      require: true,
      type: String
    },
    lineColor: { // 线条颜色
      require: true,
      default: '#6CF4D6',
      type: String
    },
    popName: { // 弹框标题
      default: '',
      type: String
    },
    title: {
      type: String,
      default: ''
    },
    popUnit: { // 单位
      default: '',
      type: String
    },
    linearGradientRGB: {
      default: '',
      type: String
    }
  },
  methods: {
    toMakeChartActive(val) {
      // {
      //   container: 'container', // 容器
      //   color: '#4BB0F5', // 线条颜色
      //   xAxis: [1, 2, 3, 45], // x data
      //   data: [15, 56, 17, 18], // y data
      //   name: '大哭三句话', // 弹框标题
      //   unit: '个', // 弹框单位
      //   rgb: '79,177,245' // 渐变颜色
      // }
      let _chartData = Object.assign({}, val);
      _chartData.container = this.container;
      _chartData.color = this.lineColor;
      _chartData.name = this.popName;
      _chartData.unit = this.popUnit;
      _chartData.rgb = this.linearGradientRGB;
      lineChart(_chartData);
    },
    choiceDateActive(val) {
      if (val === this.dateName) {
        return;
      }
      this.dateName = val;
      this.$emit('dateChange', val)
    }
  },
  watch: {
    chartData(newVal, oldVal) {
      this.toMakeChartActive(newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
@import "../../scss/mixin.scss";
.chart_line_wrap{
  background: #FFF;
  padding: 20px 30px;
  @include shadow;
  .chart_title{
    height: 26px;
    display: flex;
    .title_con{
      flex: 1;
      line-height: 26px;
      color: $color-chart-line-title;
      font-size: $size-chart-line-title;
    }
    .title_day,
    .title_mon,
    .title_wek{
      line-height: 24px;
      text-align: center;
      cursor: pointer;
      width: 54px;
      color: $color-day;
      font-size: $size-day;
      border: 1px solid $color-day;
      border-radius: 30px;
      margin-left: 20px;
      &.title_checked{
        color: $color-day-checked;
        border: 1px solid $color-day-checked;
      }
    }
  }
  .chart_line_container{
      height: 290px;
      width: 100%;
  }
}
</style>
