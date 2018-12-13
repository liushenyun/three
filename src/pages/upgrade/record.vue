<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <div class="dt-search-top">
        <!-- 网络状态  -->
        <dt-select-option ref='networkSearchRef' :optiosTitle='$ElSelectName.network.title' :optionsName ='$ElSelectName.network.name' :conWidth = '$ElSelectName.network.width'></dt-select-option>
        <!-- 地区 -->
        <dt-search-area @areaUpdate='topAreaChange'></dt-search-area>
        <!-- 设备ID -->
        <dt-search-input  ref="deviceIdSearchRef" :inputWidth='$SearchInputConfig.deviceId.width' :title="$SearchInputConfig.deviceId.title" :placeholder ='$SearchInputConfig.deviceId.placeholder' :maxLength = '$SearchInputConfig.deviceId.length' defaultValue = ''></dt-search-input>
        <!-- 设备mac -->
        <dt-search-input  ref="macSearchRef" :inputWidth='$SearchInputConfig.mac.width' :title="$SearchInputConfig.mac.title" :placeholder ='$SearchInputConfig.mac.placeholder' :maxLength = '$SearchInputConfig.mac.length' defaultValue = ''></dt-search-input>
        <!-- 设备品牌 -->
        <dt-search-input  ref="brandSearchRef" :inputWidth='$SearchInputConfig.deviceBrand.width' :title="$SearchInputConfig.deviceBrand.title" :placeholder ='$SearchInputConfig.deviceBrand.placeholder' :maxLength = '$SearchInputConfig.deviceBrand.length'  defaultValue = ''></dt-search-input>
        <!-- 设备系列 -->
        <dt-search-input  ref="seriesSearchRef" :inputWidth='$SearchInputConfig.deviceSeries.width' :title="$SearchInputConfig.deviceSeries.title" :placeholder ='$SearchInputConfig.deviceSeries.placeholder' :maxLength = '$SearchInputConfig.deviceSeries.length' defaultValue = ''></dt-search-input>
        <!-- 设备型号 -->
        <dt-search-input  ref="modelSearchRef" :inputWidth='$SearchInputConfig.deviceModel.width' :title="$SearchInputConfig.deviceModel.title" :placeholder ='$SearchInputConfig.deviceModel.placeholder' :maxLength = '$SearchInputConfig.deviceModel.length' defaultValue = ''></dt-search-input>
        <!-- selsetmodel -->
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
        </div>
      </div>
       <!-- top end -->

      <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="tw-device-id">设备ID</th>
                    <th class="tw-device-name">设备名称</th>
                    <th class="tw-communicate-type">通讯方式</th>
                    <th class="tw-device-brand">设备品牌</th>
                    <th class="tw-device-model">设备型号</th>
                    <th class="tw-device-series">设备系列</th>
                    <th class="tw-province">所在省份</th>
                    <th class="tw-city">所在城市</th>
                    <th class="tw-district">所在地区</th>
                    <th class="tw-network-status">网络状态</th>
                    <th class="tw-device-mac">设备MAC</th>
                    <th class="tw-inform-status">升级状态</th>
                    <th class="tw-version-no">升级前版本</th>
                    <th class="tw-version-no">升级后版本</th>
                    <th class="tw-time-ss">升级时间</th>
                    <th class="tw-upgrade-description">升级说明</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.device_id}}</td>
                  <td>{{item.name}}</td>
                  <td>WIFI</td>
                  <td>{{item.brand_name}}</td>
                  <td>{{item.model_name}}</td>
                  <td>{{item.series_name}}</td>
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.district}}</td>
                  <td>{{item.is_online}}</td>
                  <td>{{item.mac}}</td>
                  <td>{{item.state}}</td>
                  <td>{{item.before_version}}</td>
                  <td>{{item.after_version}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.description}}</td>
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
import { dtSlidePage, dtSearchTextarea } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js"
import { topSearchActive, paginationChangeActive, topAreaChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, topAreaChange],
  data() {
    return {
      SlidePageConfig,
      currentPage: 1,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      searchAreaData: [0, 0, 0]
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber,
        'is_online': this.$refs.networkSearchRef.value,
        'province_code': this.searchAreaData[0],
        'city_code': this.searchAreaData[1],
        'district_code': this.searchAreaData[2],
        'device_id': this.$refs.deviceIdSearchRef.value,
        'mac': this.$refs.macSearchRef.value,
        'brand_name': this.$refs.brandSearchRef.value,
        'series_name': this.$refs.seriesSearchRef.value,
        'model_name': this.$refs.modelSearchRef.value
      }
    },
    getMainList(params) {
      this.$http.UpgradeLogLists(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    }
  },
  components: {
    dtSearchTextarea,
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>
</style>


