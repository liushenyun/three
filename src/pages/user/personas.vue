<template>
  <div class="user-personas-outer">
    <h3 class="s-title">设备概述</h3>
    <div class="static">
      <top cl = 'active' name="用户总量" :num='userOverview.total'></top>
      <top cl = 'online' name="今日新增" :num='userOverview.today_fresh'></top>
      <top cl = 'water' name="本周新增" :num='userOverview.week_fresh'></top>
      <top cl = 'lively' name="本月新增" :num='userOverview.month_fresh'></top>
    </div>
    <div class="same-wrp">
      <div class="con-same per-chart1">
        <h3>用户地区分布</h3>
        <div id="map-distrbute-container">
          
        </div>
      </div>

      <div class="con-same per-chart2">
        <h3>累计净水时长</h3>
        <ul class="pur-time-ul">
          <li class="pur-time-li" v-for="(val,index) in purTimeData" :key="index">
            <span>{{val.name}}</span>
            <span>
              <i></i>
              <i class="pur-time-process" :style="{'width':val.percent}"></i>
            </span>
            <span>{{val.percent}}</span>
          </li>
        </ul>
      </div>

    </div>

    <div class="same-wrp">
      <div class="con-same per-chart3">
        <h3>用户年龄分布</h3>
        <div id="age-distrbute-container"></div>
      </div>
      <div class="con-same per-chart4">
        <h3>用户终端分布</h3>
        <div id="terminal-distrbute-container"></div>
      </div>
      <div class="con-same per-chart5">
        <h3>用户性别分布</h3>
        <div id="sex-distrbute-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "./personas-top";
import { pieCircleChart } from '../../global/highcharts-config';
export default {
  data() {
    return {
      purTimeData: [
        { name: '0~30小时', percent: '20%' },
        { name: '30~100小时', percent: '3%' },
        { name: '100~200小时', percent: '20%' },
        { name: '200小时以上', percent: '4%' }
      ],
      userOverview: {
        total: '0',
        today_fresh: '0',
        week_fresh: '0',
        month_fresh: '0'
      },
      mapIndex: 0,
      mapObj: ''
    }
  },
  mounted() {
    this.getUserOverview();
    this.getAgeMap();
    this.getSexMap();
    let chartTerminalData = {
      'container': document.getElementById('terminal-distrbute-container'),
      'color': ['#008DFB', '#00DA6D'],
      'ratio': '50%',
      'name': '用户终端',
      // 'data': [['ios', 56.0], ['android', 44.0]]
      'data': [['微信', 100.0]]
    }
    pieCircleChart(chartTerminalData);

    // 设备地图
    this.getMapData();
    /* eslint-disable */
    //创建地图
    let map = new AMap.Map('map-distrbute-container', {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 6
    });
    // map.setFeatures(['bg', 'road', 'building', 'point']);
    // 要素显示
    map.setFeatures(['bg', 'point']);
    this.mapObj = map;
  },
  methods: {
    getMapData() {
      this.$http.UserUserMap(msg => {
        let _msg = msg.data;
        this.mapSetMarks(this.mapObj, _msg);
      })
    },
    choiceMapData(index) {
      this.mapIndex = index;
    },
    // 组件内的工具函数
    getUserOverview() {
      this.$http.UserUserStatistics(msg => {
        let _data = msg.data;
        this.userOverview = Object.assign(this.userOverview, _data);
      })
    },
    getAgeMap() {
      this.$http.UserAgeMap(msg => {
        let _data = msg.data;
        let _dataArr = []
        _data.forEach(val => {
          _dataArr.push([val.name, Number(val.num)])
        });
        let ageData = {
          'container': document.getElementById('age-distrbute-container'),
          'color': ['#676BDE', '#FF9A00', '#008DFB', '#00DA6D', '#FF3C2E'],
          'ratio': '0%',
          'name': '用户年龄分布',
          'data': _dataArr
          // 'data': [['20岁以下', 40.0], ['20~30岁', 20.0], ['30~40岁', 18.0], ['40~50岁', 11.0], ['50岁以上', 9.0]]
        }
        pieCircleChart(ageData);
      })
    },
    getSexMap() {
      this.$http.UserSexMap(msg => {
        let _data = msg.data;
        let _male = Number(_data.male); // 男
        let _female = Number(_data.female); // 女
        let sexData = {
          'container': document.getElementById('sex-distrbute-container'),
          'color': ['#008DFB', '#00DA6D'],
          'ratio': '50%',
          'name': '男女比例',
          'data': [['男', _male], ['女', _female]]
        }
        pieCircleChart(sexData);
      })
    },
    // 组件内的功能函数
    mapSetMarks(map, data) {
      // 使用是高德地图的 自适应现实多个点标记
      let _data = data;
      // let _subCount = _data.sub_count;
      let _markers = [];
      _data.forEach(val => {
          _markers.push({
            position: [val.lng, val.lat],
            name: val.name,
            total: val.total
          })
      });
      
      map.clearMap(); // 清除地图覆盖物
      // map.setCenter([_data.lng, _data.lat]); // 设置缩放级别和中心点
      let markers = _markers;
      markers.forEach(function(marker) {
        new AMap.Marker({ // 循环描点
            map: map,
            // icon: marker.icon,
            content: `<div class = 'map-content-outer'><i class='map-name'>${marker.name}：</i><i class='map-total'>${marker.total}</i></div>`,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-12, -36)
        });
      });
      map.setFitView();
    }
  },
  components: {
    top
  }
}
</script>


<style lang="scss" scoped>
@import '../../scss/constant.style.scss';
@import '../../scss/mixin.scss';
.user-personas-outer {
  // height: 100%;
  // overflow-y: auto;
  .s-title {
    height: 22px;
    line-height: 22px;
    padding-left: 24px;
    margin-bottom: 16px;
    font-size: $size-two;
    background: url('../../assets/img/icon_message.png') no-repeat left center / auto 16px;
  }
  .static {
    height: 150px;
    display: flex;
    justify-content: space-between
  }
  .same-wrp {
    height: 450px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between
  }
  .con-same {
    @include shadow;
    height: 100%;
    padding: 30px 30px;
    background: #FFF;
    h3 {
      font-size: 16px;
      line-height: 28px;
      color: #676767;
      font-weight: 600
    }
    &.per-chart1,
    &.per-chart2 {
      width: 49%;
    }
    &.per-chart3,
    &.per-chart4,
    &.per-chart5 {
      width: 32.3%;
    }
    #terminal-distrbute-container,
    #age-distrbute-container,
    #map-distrbute-container,
    #sex-distrbute-container {
      height: 360px;
    }
  }
  // .per-chart1>h3 {
  //   position: relative;
  //   i {
  //     font-weight: 600
  //   }
  // }

  .pur-time-ul {
    height: auto;
    overflow: hidden;
  }
  .pur-time-li {
    height: 26px;
    line-height: 26px;
    margin: 52px 0;
    display: flex;
    span {
      vertical-align: middle;
      display: inline-block;
      height: 26px;
      &:nth-of-type(1) {
        width: 116px;
      }
      &:nth-of-type(2) {
        flex: 1;
        position: relative;
        i {
          position: absolute;
          top: 50%;
          left: 0;
          z-index: 5;
          transform: translateY(-50%);
          display: inline-block;
          width: 100%;
          height: 4px;
          background: #E6E6E6;
          border-radius: 2px;
        }
        i.pur-time-process {
          background: #49AFF5;
          width: 20%;
          z-index: 10;
        }
      }
      &:nth-of-type(3) {
        width: 60px;
        text-align: center
      }
    }
  }
  // .per-chart1>h3 {
  //   span {
  //     display: inline-block;
  //     position: absolute;
  //     right: 0;
  //     top: -2px;
  //     height: 32px;
  //     width: 180px;
  //     b {
  //       display: inline-block;
  //       height: 100%;
  //       width: 56px;
  //       text-align: center;
  //       border-radius: 40px;
  //       margin: 0;
  //       padding: 0;
  //       cursor: pointer;
  //     }
  //     b.pur-time-checked {
  //       background: #49AFF5;
  //       color: #FFF
  //     }
  //   }
  // }
}
</style>