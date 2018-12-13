<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <div class="dt-search-top">
        <!-- 设备ID -->
        <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.deviceId.width' :title="$SearchInputConfig.deviceId.title" :placeholder ='$SearchInputConfig.deviceId.placeholder' :maxLength = '$SearchInputConfig.deviceId.length' defaultValue = ''></dt-search-input>
        <!-- 设备品牌 -->
        <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.deviceBrand.width' :title="$SearchInputConfig.deviceBrand.title" :placeholder ='$SearchInputConfig.deviceBrand.placeholder' :maxLength = '$SearchInputConfig.deviceBrand.length'  defaultValue = ''></dt-search-input>
        <!-- 设备系列 -->
        <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.deviceSeries.width' :title="$SearchInputConfig.deviceSeries.title" :placeholder ='$SearchInputConfig.deviceSeries.placeholder' :maxLength = '$SearchInputConfig.deviceSeries.length' defaultValue = ''></dt-search-input>
        <!-- 设备型号 -->
        <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.deviceModel.width' :title="$SearchInputConfig.deviceModel.title" :placeholder ='$SearchInputConfig.deviceModel.placeholder' :maxLength = '$SearchInputConfig.deviceModel.length' defaultValue = ''></dt-search-input>
        <!-- selsetmodel -->
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-search">查 询</button>
        </div>
      </div>
       <div class="dt-search-top">
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-add" @click="addActive">新 增</button>
          <button type="button" class="dt-btn dt-btn-modify">下载MAC模版</button>
          <button type="button" class="dt-btn dt-btn-modify">导入MAC新批次</button>
          <button type="button" class="dt-btn dt-btn-delete">删 除</button>
        </div>
      </div>
       <!-- top end -->


      <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="dt-table-check"></th>
                    <th class="tw-device-id">设备ID</th>
                    <th class="tw-device-name">设备名称</th>
                    <th class="tw-communicate-type">通讯方式</th>
                    <th class="tw-device-type">设备类型</th>
                    <th class="tw-device-brand">设备品牌</th>
                    <th class="tw-device-model">设备型号</th>
                    <th class="tw-device-series">设备系列</th>
                    <th class="tw-province">所在省份</th>
                    <th class="tw-city">所在城市</th>
                    <th class="tw-district">所在地区</th>
                    <th class="tw-time-date">激活日期</th>
                    <th class="tw-device-status">设备状态</th>
                    <th class="tw-network-status">网络状态</th>
                    <th class="tw-user-name">用户姓名</th>
                    <th class="tw-telephone">手机号码</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in [1,2,3,4,5,6,7,8,9,0]" :key="index">
                  <td class="dt-table-check dt-table-checked"></td>
                  <td>33918115</td>
                  <td>净水器1</td>
                  <td>WiFi</td>
                  <td>零售</td>
                  <td>尚之水</td>
                  <td>WF101</td>
                  <td>-</td>
                  <td>广东</td>
                  <td>深圳</td>
                  <td>宝安</td>
                  <td>2017.07.01</td>
                  <td>正常</td>
                  <td>在线</td>
                  <td>秦亦新</td>
                  <td>136-3957-2345</td>
                </tr>
              </tbody>
          </table>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset"  :page-size="10"  @current-change="handleCurrentChange" :current-page="currentPage4" layout="total, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='新增维护设备id' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
           <!-- liceseID -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.liceseID.title" :placeholder ='$SearchInputConfig.liceseID.placeholder' :maxLength = '$SearchInputConfig.liceseID.length' defaultValue = ''></dt-search-input>
          </li>
          <!-- 起始号 -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.startNumber.title" :placeholder ='$SearchInputConfig.startNumber.placeholder' :maxLength = '$SearchInputConfig.startNumber.length' defaultValue = ''></dt-search-input>
          </li>
          <!-- 截至号 -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.endNumber.title" :placeholder ='$SearchInputConfig.endNumber.placeholder' :maxLength = '$SearchInputConfig.endNumber.length' defaultValue = ''></dt-search-input>
          </li>
        </ul>
        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="defaultChange">确定</button>
          <button class="dt-btn dt-btn-cancel">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js"
// import dtPagination from '../../components/pagination/dtPagination';
export default {
  data() {
    return {
      currentPage4: 1,
      selectedOptions: [],
      SlidePageConfig,
      defaultUserName: "liu1",
      telNum: '',
      slideShow: true,
      currentpages: -2
    }
  },
  mounted() {
    this.defaultUserName = 'liu2'
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    areaChange(value) {
      console.log(41, value);
    },
    handCurrentChange(val) {
      let _val = Number(val);
      console.log(`当前页: ${val}`);
      this.currentpages = _val;
    },
    serrchActive() {
      console.log(this.$refs.deviceStatusRef.value)
      console.log(this.$refs.feedbackRef.value)
    },
    addActive() {
      this.slideShow = !this.slideShow;
    },
    hideSlidePageActive() {
      this.slideShow = false;
    },
    defaultChange() {
      this.defaultUserName = 'liu3'
    }
  },
  components: {
    // dtPagination,
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
</style>


