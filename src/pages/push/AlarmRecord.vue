<template>
  <div class="push-record">
    <div class="dt-search-top">
      <!-- 报警类型 -->
      <dt-select-option ref='alarmTypeSearchRef' :optiosTitle='$ElSelectName.alarmType.title' :optionsName ='$ElSelectName.alarmType.name' :conWidth = '$ElSelectName.alarmType.width'></dt-select-option>
      <!-- 通讯方式(万福无) -->
      <!-- <dt-select-option ref='communicteTypeRef' :optiosTitle='$ElSelectName.communicte.title' :optionsName ='$ElSelectName.communicte.name' :conWidth = '$ElSelectName.communicte.width'></dt-select-option> -->

      <!-- 设备类型(万福无) -->
      <!-- <dt-select-option ref='deviceTypeRef' :optiosTitle='$ElSelectName.deviceType.title' :optionsName ='$ElSelectName.deviceType.name' :conWidth = '$ElSelectName.deviceType.width'></dt-select-option> -->

      <!-- 网络状态 -->
      <dt-select-option ref='networkStatusSearchRef' :optiosTitle='$ElSelectName.network.title' :optionsName ='$ElSelectName.network.name' :conWidth = '$ElSelectName.network.width'></dt-select-option>

      <!-- 地区 -->
      <dt-search-area @areaUpdate='topAreaChange'></dt-search-area>
      <!-- 报警时间 -->
      <dt-date-range title='报警时间' @startDateChange='startDateSearchChange' @endDateChange='endDateSearchChange'></dt-date-range>
      <!-- 设备ID -->
      <dt-search-input  ref="deviceIdSearchRef" :inputWidth='$SearchInputConfig.deviceId.width' :title="$SearchInputConfig.deviceId.title" :placeholder ='$SearchInputConfig.deviceId.placeholder' :maxLength = '$SearchInputConfig.deviceId.length' defaultValue = ''></dt-search-input>

      <!-- 设备品牌 -->
      <dt-search-input  ref="brandSearchRef" :inputWidth='$SearchInputConfig.deviceBrand.width' :title="$SearchInputConfig.deviceBrand.title" :placeholder ='$SearchInputConfig.deviceBrand.placeholder' :maxLength = '$SearchInputConfig.deviceBrand.length'  defaultValue = ''></dt-search-input>
      <!-- 设备系列 -->
      <dt-search-input  ref="seriesSearchRef" :inputWidth='$SearchInputConfig.deviceSeries.width' :title="$SearchInputConfig.deviceSeries.title" :placeholder ='$SearchInputConfig.deviceSeries.placeholder' :maxLength = '$SearchInputConfig.deviceSeries.length' defaultValue = ''></dt-search-input>
      <!-- 设备型号 -->
      <dt-search-input  ref="modelSearchRef" :inputWidth='$SearchInputConfig.deviceModel.width' :title="$SearchInputConfig.deviceModel.title" :placeholder ='$SearchInputConfig.deviceModel.placeholder' :maxLength = '$SearchInputConfig.deviceModel.length' defaultValue = ''></dt-search-input>
      
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
      </div>
    </div>
    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="tw-inform-type">报警类型</th>
                    <th class="tw-network-status">网络状态</th>
                    <th class="tw-time-ss">报警时间</th>
                    <th class="tw-device-id">设备ID</th>
                    <th class="tw-device-name">设备名称</th>
                    <th class="tw-device-brand">设备品牌</th>
                    <th class="tw-device-series">设备系列</th>
                    <th class="tw-device-model">设备型号</th>
                    <th class="tw-time-date">通讯方式</th>
                    <th class="tw-province">所在省份</th>
                    <th class="tw-city">所在城市</th>
                    <th class="tw-district">所在地区</th>
                    <th class="tw-user-name">用户姓名</th>
                    <th class="tw-telephone">手机号码</th>
                    <th class="tw-address">设备地址</th>
                    <th class="tw-device-mac">设备MAC</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.type|FilterDeviceAlarmType}}</td>
                  <td>{{item.state|FilterNetworkStatus}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.device_id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.brand_name}}</td>
                  <td>{{item.series_name}}</td>
                  <td>{{item.model_name}}</td>
                  <td>Wi-Fi</td>
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.district}}</td>
                  <td>{{item.uname}}</td>
                  <td>{{item.contact}}</td>
                  <td>{{item.address}}</td>
                  <td>{{item.mac}}</td>
                </tr>
              </tbody>
          </table>
          <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset" :page-size="10"  @current-change="paginationChangeActive" :current-page.sync="currentPage" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

  </div>
</template>

<script>
import { dtSelectOptionDynamic, dtDateRange } from '../../global/searchComponents';
import { topSearchActive, paginationChangeActive, topAreaChange, dateSearchChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, topAreaChange, dateSearchChange],
  data() {
    return {
      currentPage: 1,
      pageNumber: 1,
      searchAreaData: [0, 0, 0],
      listArr: [],
      listTotal: 0,
      searchDate: {
        start: '',
        end: ''
      }
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getMainList(params) {
      this.$http.DeviceWarningGetWarningList(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    },
    // 组件内使用的功能函数
    getUrlData() {
      return {
        'page': this.pageNumber,
        'brand_name': this.$refs.brandSearchRef.value,
        'series_name': this.$refs.seriesSearchRef.value,
        'model_name': this.$refs.modelSearchRef.value,
        'type': this.$refs.alarmTypeSearchRef.value,
        'state': this.$refs.networkStatusSearchRef.value,
        'device_id': this.$refs.deviceIdSearchRef.value,
        'province_code': this.searchAreaData[0],
        'city_code': this.searchAreaData[1],
        'district_code': this.searchAreaData[2],
        'endtime': this.searchDate.end,
        'starttime': this.searchDate.start
      }
    }
  },
  components: {
    dtSelectOptionDynamic,
    dtDateRange
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.dt-search-con .el-date-editor.el-input {
  width: 100%;
}
</style>

