<template>
  <div class="device-summary-outer">
    <h3 class="s-title">设备概述</h3>
    <div class="static">
      <top cl = 'active' name="激活总量" :num='deviceOverview.avtive_total'></top>
      <top cl = 'online' name="在线总量" :num='deviceOverview.online_total'></top>
      <top cl = 'water' name="总净水量" :num='deviceOverview.water_total'></top>
      <top cl = 'lively' name="活跃设备量" :num='deviceOverview.lively_total'></top>
    </div>
    <div class="chart-wrap">
      <chart-line title='激活总量统计曲线' container ='summary-container1' @dateChange='deviceActiveChange' popName = '激活数' lineColor = '#6CF4D6' popUnit = '台' :chartData = 'activeChartData' class="line-same line-left"></chart-line>
      <chart-line title='总净水量统计曲线' container ='summary-container2' @dateChange='waterTotalChange' popName = '净水量' lineColor = '#1CAFF4' popUnit = 'L' :chartData = 'waterChartData'  class="line-same line-right"></chart-line>
    </div>
    <div class="chart-wrap">
      <chart-line title='在线总量统计曲线' container ='summary-container3' @dateChange='onlineDeviceChange' popName = '在线数' lineColor = '#CDE74B' popUnit = '台' :chartData = 'onlineChartData'  class="line-same line-left"></chart-line>
      <chart-line title='活跃设备量统计曲线' container ='summary-container4' @dateChange='livelyDeviceChange' popName = '活跃数' lineColor = '#2BCF78' popUnit = '台' :chartData = 'livelyChartData'  class="line-same line-right"></chart-line>
    </div>
  </div>
</template>

<script>
import top from "./summary-top";
import ChartLine from './chart-line';
export default {
  data: () => ({
    deviceOverview: {
      avtive_total: '0',
      lively_total: '0',
      online_total: '0',
      water_total: '0'
    },
    activeChartData: { xAxis: [], data: [] },
    onlineChartData: { xAxis: [], data: [] },
    waterChartData: { xAxis: [], data: [] },
    livelyChartData: { xAxis: [], data: [] }
  }),
  mounted () {
    // 头部四个概览
    this.getDeviceOverview();
    this.getDeviceActiveData(1);
    this.getWaterTotalData(1);
    this.getOnlineTotalData(1);
    this.getLivelyDeviceData(1);
  },
  methods: {
    deviceActiveChange(val) {
      this.getDeviceActiveData(val);
    },
    waterTotalChange(val) {
      this.getWaterTotalData(val);
    },
    onlineDeviceChange(val) {
      this.getOnlineTotalData(val);
    },
    livelyDeviceChange(val) {
      this.getLivelyDeviceData(val);
    },
    // 组件内的工具函数
    getDeviceOverview() {
      this.$http.DeviceOverview(msg => {
        let _data = msg.data;
        this.deviceOverview = Object.assign(this.deviceOverview, _data);
      })
    },
    getDeviceActiveData(type) { // 获取激活总量统计曲线  type:// 1日 2月 3周
      this.$http.DeviceActiveGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        // 解决不能更新的问题
        this.activeChartData = Object.assign({}, this.activeChartData, {'data': _dealData.yAxis, 'xAxis': _dealData.xAxis})
      })
    },
    getWaterTotalData(type) { // 总进水量统计曲线
      this.$http.DeviceWaterGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        // 解决不能更新的问题
        this.waterChartData = Object.assign({}, this.waterChartData, {'data': _dealData.yAxis, 'xAxis': _dealData.xAxis})
      })
    },
    getOnlineTotalData(type) { // 在线总量统计曲线
      this.$http.DeviceOnlineGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        // 解决不能更新的问题
        this.onlineChartData = Object.assign({}, this.onlineChartData, {'data': _dealData.yAxis, 'xAxis': _dealData.xAxis})
      })
    },
    getLivelyDeviceData(type) { // 活跃设备量统计曲线
      this.$http.DeviceLivelyGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        // 解决不能更新的问题(传入的是对象)
        this.livelyChartData = Object.assign({}, this.livelyChartData, {'data': _dealData.yAxis, 'xAxis': _dealData.xAxis})
      })
    },
    // 组件内的工具函数
    dealData(list, type) {
      let _data = list, _type = Number(type), _xAxis = [], _yAxis = [];
      _data.forEach(val => {
        if (_type === 1) {
          _xAxis.push(this.$projectUtils.ChartDateChange(val.date));
          _yAxis.push(Number(val.num));
        } else if (_type === 2) {
          _xAxis.push(this.$projectUtils.ChartDateChange(val.mon_date, '/') + ' ~ ' + this.$projectUtils.ChartDateChange(val.sun_date, '/'));
          _yAxis.push(Number(val.num));
        } else if (_type === 3) {
          _xAxis.push(this.$projectUtils.ChartMonthChange(val.month));
          _yAxis.push(Number(val.num));
        }
      });
      return { 'xAxis': _xAxis, 'yAxis': _yAxis }
      // {
      //   xAxis: [1, 2, 3, 45],
      //   data: [15, 56, 17, 18]
      // };
    }
  },
  components: { top, ChartLine }
};
</script>
<style lang="scss">
@import "../../scss/constant.style.scss";
.device-summary-outer {
  // height: 100%;
  // overflow-y: auto;
  .s-title {
    height: 22px;
    line-height: 22px;
    padding-left: 24px;
    margin-bottom: 16px;
    font-size: $size-two;
    background: url("../../assets/img/icon_message.png") no-repeat left center /
      auto 16px;
  }
  .static {
    height: 150px;
    display: flex;
    justify-content: space-between;
  }
  .chart-wrap {
    height: auto;
    margin-top: 30px;
    margin-bottom: 20px;
    overflow: hidden;
    .line-same{
      width: 49%;
      height: 360px;
    }
    .line-left{
      float: left;
    }
    .line-right{
      float: right;
    }
  }
}
</style>

