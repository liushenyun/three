<template>
  <div class="home-page-outer">
    <!-- 通知 -->
    <div class="top">
      <i></i>
      <span>提示：客户13838389438在手机客户端请求上门服务，工单号为</span>
    </div>

    <!-- 统计图 -->
    <div class="sta-wrap-outer">
      
      <div class="no-data-t" @click="$router.push({'name': 'SystemSetting'})" v-if="!setParamsArrLength">去配置显示参数</div>

      <!-- 激活设备日曲线图  -->
      <div class="sta-wrap-same" v-if="config['1'].isShow">
        <survey-top :title="config['1'].title" :routerName ="config['1'].routerName"></survey-top>
        <div class="sta-inner" id="device-active-container">
          <div class="no-data-tip">暂无数据</div>
        </div>
      </div>

      <!-- 总净水量日曲线图 -->
      <div class="sta-wrap-same" v-if="config['2'].isShow">
        <survey-top :title="config['2'].title" :routerName ="config['3'].routerName"></survey-top>
        <div class="sta-inner" id="water-total-containter">
        </div>
      </div>

      <!-- 在线总量日曲线图 -->
      <div class="sta-wrap-same" v-if="config['3'].isShow">
        <survey-top :title="config['3'].title" :routerName ="config['3'].routerName"></survey-top>
        <div class="sta-inner" id="online-total-container">
        </div>
      </div>

      <!-- 活跃设备统计曲线 -->
      <div class="sta-wrap-same" v-if="config['4'].isShow">
        <survey-top :title="config['4'].title" :routerName ="config['4'].routerName"></survey-top>
        <div class="sta-inner" id="lively-device-container">
        </div>
      </div>

      <!-- 设备地图 -->
      <div class="sta-wrap-same" v-if="config['5'].isShow">
        <survey-top :title="config['5'].title" :routerName ="config['5'].routerName"></survey-top>
        <div class="sta-inner" id="sta-device-map"></div>
      </div>

      <!-- 用户地区分布 -->
      <div class="sta-wrap-same" v-if="config['6'].isShow">
        <survey-top :title="config['6'].title" :routerName ="config['6'].routerName"></survey-top>
        <div class="sta-inner" id="sta-user-map"></div>
      </div>
      <!-- 累计净水时长 -->
      <div class="sta-wrap-same" v-if="config['7'].isShow">
        <survey-top :title="config['7'].title" :routerName ="config['7'].routerName"></survey-top>
        <div class="sta-inner sta-pure-time">
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

      <!-- 用户年龄分布 -->
      <div class="sta-wrap-same" v-if="config['8'].isShow">
        <survey-top :title="config['8'].title" :routerName ="config['8'].routerName"></survey-top>
        <div class="sta-inner" id="user-age-container"></div>
      </div>

      <!-- 待处理订单 -->
      <div class="sta-wrap-same" v-if="config['9'].isShow">
        <survey-top :title="config['9'].title" :routerName ="config['9'].routerName"></survey-top>
        <div class="sta-inner sta-unhandle-order">
          <!-- <survey-table :tableHeadKeys = "config['9'].tableHeadArr" :tableBody = "config['9'].tableBodyArr"></survey-table> -->

          <div class="dt-table-true-wrap">
            <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                      <th class="tw-service-number">服务单号</th>
                      <th class="tw-service-type">服务类型</th>
                      <th class="tw-question-category">问题分类</th>
                      <th class="tw-time-ss">请求时间</th>
                      <th class="tw-province">所在省份</th>
                      <th class="tw-city">所在城市</th>
                      <th class="tw-district">所在地区</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,bIndex) in config['9'].tableBodyArr" :key="bIndex">
                     <td>{{item.service_id}}</td>
                    <td>{{item.service_type}}</td>
                    <td>{{item.query_type}}</td>
                    <td>{{item.ctime}}</td>
                    <td>{{item.province}}</td>
                    <td>{{item.city}}</td>
                    <td>{{item.district}}</td>
                  </tr>
                </tbody>
            </table>
          </div>

        </div>
      </div>

      <!-- 用户终端分布 -->
      <div class="sta-wrap-same" v-if="config['10'].isShow">
        <survey-top :title="config['10'].title" :routerName ="config['10'].routerName"></survey-top>
        <div class="sta-inner" id="user-terminal-container"></div>
      </div>
      <!-- 用户性别分布 -->
      <div class="sta-wrap-same" v-if="config['11'].isShow">
        <survey-top :title="config['11'].title" :routerName ="config['11'].routerName"></survey-top>
        <div class="sta-inner" id="user-sex-container"></div>
      </div>

      <!-- 未通知滤芯列表 -->
      <div class="sta-wrap-same" v-if="config['12'].isShow">
        <survey-top :title="config['12'].title" :routerName ="config['12'].routerName"></survey-top>
        <div class="sta-inner sta-unnote-filter">
          <!-- <survey-table :tableHeadKeys = "config['12'].tableHeadArr" :tableBody = "config['12'].tableBodyArr"></survey-table> -->

          <div class="dt-table-true-wrap">
            <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                      <th class="tw-device-id">设备ID</th>
                      <th class="tw-filter-status">滤芯状态</th>
                      <th class="tw-inform-status">通知状态</th>
                      <th class="tw-inform-type">最近通知</th>
                      <th class="tw-device-type">设备型号</th>
                      <th class="tw-user-name">用户姓名</th>
                      <th class="tw-telephone">手机号码</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,bIndex) in config['12'].tableBodyArr" :key="bIndex">
                    <td>{{item.device_id}}</td>
                    <td>{{item.filter_type|FilterFilterStatus}}</td>
                    <td>{{item.notice_type|FilterFilterNoticeStatus}}</td>
                    <td>{{item.notice_time*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                    <td>{{item.model_id}}</td>
                    <td>{{item.realname}}</td>
                    <td>{{item.contact}}</td>
                  </tr>
                </tbody>
            </table>
          </div>

        </div>
      </div>
      <!-- 设备报警记录 -->
      <div class="sta-wrap-same" v-if="config['13'].isShow">
        <survey-top :title="config['13'].title" :routerName ="config['13'].routerName"></survey-top>
        <div class="sta-inner sta-alarm-record">
          <!-- <survey-table :tableHeadKeys = "config['13'].tableHeadArr" :tableBody = "config['13'].tableBodyArr"></survey-table> -->

          <div class="dt-table-true-wrap">
            <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                      <th class="tw-inform-type">报警类型</th>
                      <th class="tw-network-status">网络状态</th>
                      <th class="tw-time-ss">报警时间</th>
                      <th class="tw-device-id">设备ID</th>
                      <th class="tw-device-name">设备名称</th>
                      <th class="tw-time-date">通讯方式</th>
                      <!-- <th class="tw-province">所在省份</th>
                      <th class="tw-city">所在城市</th>
                      <th class="tw-district">所在地区</th> -->
                      <th class="tw-user-name">用户姓名</th>
                      <th class="tw-telephone">手机号码</th>
                      <th class="tw-address">设备地址</th>
                      <th class="tw-device-mac">设备MAC</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,bIndex) in config['13'].tableBodyArr" :key="bIndex">
                    <td>{{item.type|FilterDeviceAlarmType}}</td>
                    <td>{{item.state|FilterNetworkStatus}}</td>
                    <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                    <td>{{item.device_id}}</td>
                    <td>{{item.name}}</td>
                    <td>Wi-Fi</td>
                    <!-- <td>{{item.province}}</td>
                    <td>{{item.city}}</td>
                    <td>{{item.district}}</td> -->
                    <td>{{item.uname}}</td>
                    <td>{{item.contact}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.mac}}</td>
                  </tr>
                </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import { lineChart, pieCircleChart } from '../../global/highcharts-config';
import SurveyTop from './SurveyTop';
// import SurveyTable from './SurveyTable';
export default {
  data() {
    return {
      setParamsArrLength: 1,
      purTimeData: [
        { name: '0~30小时', percent: '20%' },
        { name: '30~100小时', percent: '3%' },
        { name: '100~200小时', percent: '20%' },
        { name: '200小时以上', percent: '4%' }
      ],
      // tableHeadArr: ['设备id', '设备名称'],
      tableHeadArr: [{'name': '设备id', 'key': 'device_id'}, {'name': '设备名称', 'key': 'deivce_name'}],
      tableBodyArr: [
        {'deivce_name': '净水器1', 'device_id': '5664'},
        {'deivce_name': '净水器2', 'device_id': '1122'}
      ],
      config: {
        '1': {
          title: '激活设备日曲线图',
          routerName: 'deviceSummary',
          isShow: false,
          id: '1',
          getDataFun(vm) {
            vm.getDeviceActiveData(1);
          }
        },
        '2': {
          title: '净水量日曲线图',
          routerName: 'deviceSummary',
          isShow: false,
          id: '2',
          getDataFun(vm) {
            vm.getWaterTotalData(1);
          }
        },
        '3': {
          title: '在线设备日曲线图',
          routerName: 'deviceSummary',
          isShow: false,
          id: '3',
          getDataFun(vm) {
            vm.getOnlineTotalData(1);
          }
        },
        '4': {
          title: '活跃设备日曲线图',
          routerName: 'deviceSummary',
          isShow: false,
          id: '4',
          getDataFun(vm) {
            vm.getLivelyDeviceData(1);
          }
        },
        '5': {
          title: '设备地图',
          routerName: 'deviceMap',
          isShow: false,
          id: '5',
          getDataFun(vm) {
            vm.createDeviceMap();
          }
        },
        '6': {
          title: '用户地区分布',
          routerName: 'userPersonas',
          isShow: false,
          id: '6',
          getDataFun(vm) {
            vm.createUserMap();
          }
        },
        '7': {
          title: '累计净水时长',
          routerName: 'userPersonas',
          isShow: false,
          id: '7',
          getDataFun(vm) {
            // vm.getDeviceActiveData(1);
          }
        },
        '8': {
          title: '用户年龄分布',
          routerName: 'userPersonas',
          isShow: false,
          id: '8',
          getDataFun(vm) {
            vm.getAgeMap();
          }
        },
        '9': {
          title: '待处理订单列表',
          routerName: 'serveWaiting',
          isShow: false,
          id: '9',
          tableHeadArr: [
            {'name': '订单id', 'key': 'service_id'},
            {'name': '设备名称', 'key': 'deivce_name'}
          ],
          tableBodyArr: [
            {'deivce_name': '净水器1', 'device_id': '5664'},
            {'deivce_name': '净水器2', 'device_id': '1122'}
          ],
          getDataFun(vm) {
            vm.getUnhandleOrderData();
          }
        },
        '10': {
          title: '用户终端分布',
          routerName: 'userPersonas',
          isShow: false,
          id: '10',
          getDataFun(vm) {
            vm.getTerminalMap();
          }
        },
        '11': {
          title: '用户性别分布',
          routerName: 'userPersonas',
          isShow: false,
          id: '11',
          getDataFun(vm) {
            vm.getSexMap();
          }
        },
        '12': {
          title: '未通知滤芯列表',
          routerName: 'pushRemind',
          isShow: false,
          id: '12',
          tableHeadArr: [],
          tableBodyArr: [],
          getDataFun(vm) {
            vm.getUnnoticeFilterData();
          }
        },
        '13': {
          title: '设备报警记录',
          routerName: 'PushAlarmRecord',
          isShow: false,
          id: '13',
          tableHeadArr: [],
          tableBodyArr: [],
          getDataFun(vm) {
            vm.getAlaramRecord();
          }
        }
      }
    }
  },
  mounted() {
    // this.config['1'].getDataFun(this);
    // this.config['2'].getDataFun(this);
    // this.config['3'].getDataFun(this);
    // this.config['4'].getDataFun(this);
    // this.config['5'].getDataFun(this);
    // this.config['6'].getDataFun(this);
    // this.config['8'].getDataFun(this);
    // this.config['9'].getDataFun(this);
    // this.config['10'].getDataFun(this);
    // this.config['11'].getDataFun(this);
    // this.config['12'].getDataFun(this);
    // this.config['13'].getDataFun(this);
    this.getBoardsShow();
  },
  methods: {
    getDeviceActiveData(type) { // id:1 获取激活总量统计曲线  type:// 1日 2月 3周
      this.$http.DeviceActiveGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        let _param = {
          'container': 'device-active-container',
          'color': '#6CF4D6',
          'xAxis': _dealData.xAxis,
          'data': _dealData.yAxis,
          'name': '激活数',
          'unit': '台',
          'rgb': '79,177,245'
        };
        lineChart(_param);
      })
    },
    getWaterTotalData(type) { // id:2 总进水量统计曲线
      this.$http.DeviceWaterGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        let _param = {
          'container': 'water-total-containter',
          'color': '#1CAFF4',
          'xAxis': _dealData.xAxis,
          'data': _dealData.yAxis,
          'name': '净水量',
          'unit': 'L',
          'rgb': '79,177,245'
        }
        lineChart(_param);
      })
    },
    // water-total-containter  online-total-container lively-device-container
    getOnlineTotalData(type) { // id:3 在线总量统计曲线
      this.$http.DeviceOnlineGraph(type, msg => {
        let _data = msg.data,
          _dealData = this.dealData(_data, type);
        let _param = {
          'container': 'online-total-container',
          'color': '#CDE74B',
          'xAxis': _dealData.xAxis,
          'data': _dealData.yAxis,
          'name': '在线数',
          'unit': '台',
          'rgb': '79,177,245'
        }
        lineChart(_param);
      })
    },
    getLivelyDeviceData(type) { // id:4 活跃设备量统计曲线
      this.$http.DeviceLivelyGraph(type, msg => {
        let _data = msg.data, _dealData = this.dealData(_data, type);
        let _param = {
          'container': 'lively-device-container',
          'color': '#2BCF78',
          'xAxis': _dealData.xAxis,
          'data': _dealData.yAxis,
          'name': '活跃数',
          'unit': '台',
          'rgb': '79,177,245'
        }
        lineChart(_param);
      })
    },
    createDeviceMap() { // id: 5 设备地图
      /* eslint-disable */
      let map = new AMap.Map('sta-device-map', { // 创建地图
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 6
      });
      // map.setFeatures(['bg', 'road', 'building', 'point']);
      map.setFeatures(['bg', 'point']); // 要素显示
      this.getDeviceMapData(map);
    },
    createUserMap() { // id: 6 用户地区分布  userMapObj
      /* eslint-disable */
      let map = new AMap.Map('sta-user-map', { // 创建地图
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 6
      });
      // map.setFeatures(['bg', 'road', 'building', 'point']);
      map.setFeatures(['bg', 'point']); // 要素显示
      this.getUserMapData(map);
    },
    getAgeMap() { // id: 8 用户年龄分布 user-age-container
      this.$http.UserAgeMap(msg => {
        let _data = msg.data, _dataArr = [];
        _data.forEach(val => {
          _dataArr.push([val.name, Number(val.num)])
        });
        let ageData = {
          'container': document.getElementById('user-age-container'),
          'color': ['#676BDE', '#FF9A00', '#008DFB', '#00DA6D', '#FF3C2E'],
          'ratio': '0%',
          'name': '用户年龄分布',
          'data': _dataArr
          // 'data': [['20岁以下', 40.0], ['20~30岁', 20.0], ['30~40岁', 18.0], ['40~50岁', 11.0], ['50岁以上', 9.0]]
        }
        pieCircleChart(ageData);
      })
    },
    getTerminalMap() { // id: 10 用户终端分布
      let chartTerminalData = {
        'container': document.getElementById('user-terminal-container'),
        'color': ['#008DFB', '#00DA6D'],
        'ratio': '50%',
        'name': '用户终端',
        // 'data': [['ios', 56.0], ['android', 44.0]]
        'data': [['微信', 100.0]]
      }
      pieCircleChart(chartTerminalData);
    },
    getSexMap() { // id:11 用户性别分布  user-sex-container
      this.$http.UserSexMap(msg => {
        let _data = msg.data, _male = Number(_data.male), // 男
          _female = Number(_data.female); // 女
        let sexData = {
          'container': document.getElementById('user-sex-container'),
          'color': ['#008DFB', '#00DA6D'],
          'ratio': '50%',
          'name': '男女比例',
          'data': [['男', _male], ['女', _female]]
        }
        pieCircleChart(sexData);
      })
    },
    getUnhandleOrderData() { // 获取待处理订单列表
      this.$http.FaultRepairGetServiceList({ 'page': 1 }, msg => {
        // tableHeadArr: [{'name': '设备id', 'key': 'device_id'}, {'name': '设备名称', 'key': 'deivce_name'}],
        //   tableBodyArr: [
        //     {'deivce_name': '净水器1', 'device_id': '5664'},
        //     {'deivce_name': '净水器2', 'device_id': '1122'}
        //   ],
        let _list = msg.data.list;
        this.config['9'].tableBodyArr = _list
      })
    },
    getUnnoticeFilterData() { // 获取未通知滤芯列表
      this.$http.FilterWarningGetUserDevice({ 'page': 1, 'notice_type': 3 }, msg => {
        let _list = msg.data.list;
        this.config['12'].tableBodyArr = _list
      })
    },
    getAlaramRecord() { // 设备报警记录
      this.$http.DeviceWarningGetWarningList({'page': 1}, msg => {
        let _list = msg.data.list;
        this.config['13'].tableBodyArr = _list
      })
    },
    // 组件内的工具函数
    getBoardsShow() {
      this.$http.SystemAccountBoards(msg => {
        let _data = msg.data;
        this.setParamsArrLength = _data.length;
        _data.forEach(val => {
          this.config[val.id].isShow = true;
          setTimeout(() => {
            this.config[val.id].getDataFun(this);
          }, 10);
        })
      })
    },
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
    },
    getDeviceMapData(map) {
      this.$http.DeviceDeviceMapOverview('100000', msg => {
        let _msg = msg.data;
        this.mapSetMarks(map, _msg.sub_count);
      })
    },
    getUserMapData(map) {
      this.$http.UserUserMap(msg => {
        let _msg = msg.data;
        this.mapSetMarks(map, _msg);
      })
    },
    mapSetMarks(map, data) {
      // 使用是高德地图的 自适应现实多个点标记
      let _data = data, _markers = [];
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
    SurveyTop
    // SurveyTable
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin.scss';
@import '../../scss/constant.style.scss';
.home-page-outer {
  .top {
    width: 100%;
    height: 60px;
    @include shadow;
    border-radius: 2px;
    margin-bottom: 20px;
    display: flex;
    background: #FFF;
    & i,
    & span {
      display: inline-bloc;
    }
    i {
      width: 70px;
      background: url('../../assets/img/icon_user.png') no-repeat right center/auto 30px;
    }
    span {
      padding-left: 10px;
      line-height: 60px;
    }
  }
}

.sta-wrap-outer{
  width: 100%;
  min-height: 720px;
  overflow-y: auto;
  // background: #FFF;
  .no-data-t{
    margin-top: 160px;
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    color: #0097FF;
    cursor: pointer;
    padding: 0;
  }
}
.sta-wrap-same{
  width: 49%;
  min-height: 480px;
  background: #FFF;
  padding: 10px 30px 20px 30px;
  float: left;
  margin-bottom: 20px;
  @include shadow;
  .sta-inner{
      min-height: 390px;
  }
  &:nth-child(odd){
    margin-right: 2%;
  }
  .dt-table-true-wrap{
    min-height: 390px;
    .dt-table-same tbody td{
      height: 36px;
      font-size: 12px;
    }
    .dt-table-same thead th{
      height: 32px;
      font-size: 12px;
    }
  }
}


  .pur-time-ul {
    height: auto;
    overflow: hidden;
    padding: 0 10px;
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
</style>

