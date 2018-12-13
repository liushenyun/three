<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <div class="dt-search-top">
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-add" @click="addActive">新 增</button>
        </div>
      </div>
       <!-- top end -->

      <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="tw-device-id">企业ID</th>
                    <th class="tw-device-name">产品ID</th>
                    <th class="tw-communicate-type">品牌</th>
                    <th class="tw-device-type">系列</th>
                    <th class="tw-device-brand">型号</th>
                    <th class="tw-device-model">通讯方式</th>
                    <th class="tw-device-series">滤芯个数</th>
                    <th class="tw-province">滤芯寿命</th>
                    <th class="tw-handle-edit">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in [1,2,3,4,5,6,7,8,9,0]" :key="index">
                  <td>33918115</td>
                  <td>净水器1</td>
                  <td>WiFi</td>
                  <td>零售</td>
                  <td>尚之水</td>
                  <td>WF101</td>
                  <td>-</td>
                  <td>广东</td>
                  <td class="dt-table-edit"><b>操作</b><b class='dt-table-detele'>删除</b></td>
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
      <dt-slide-page slideTitle='新增产品型号' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <!-- 设备品牌 -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.deviceBrand.title" :placeholder ='$SearchInputConfig.deviceBrand.placeholder' :maxLength = '$SearchInputConfig.deviceBrand.length'  defaultValue = ''></dt-search-input>
          </li>
          <!-- 设备系列 -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.deviceSeries.title" :placeholder ='$SearchInputConfig.deviceSeries.placeholder' :maxLength = '$SearchInputConfig.deviceSeries.length' defaultValue = ''></dt-search-input>
          </li>
          <!-- 设备型号 -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.deviceModel.title" :placeholder ='$SearchInputConfig.deviceModel.placeholder' :maxLength = '$SearchInputConfig.deviceModel.length' defaultValue = ''></dt-search-input>
          </li>
          <!-- liceseID -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.liceseID.title" :placeholder ='$SearchInputConfig.liceseID.placeholder' :maxLength = '$SearchInputConfig.liceseID.length' defaultValue = ''></dt-search-input>
          </li>
          <!-- 通讯方式 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.communicte.title' :optionsName ='$ElSelectName.communicte.name'></dt-select-option>
          </li>
          <!-- 滤芯个数 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.filterNumber.title' :optionsName ='$ElSelectName.filterNumber.name'></dt-select-option>
          </li>
          <li class="filter-life-rule">
             <div class="rule-wrap">
              <i>寿命设置：</i>
              <span>
                <p v-for="(item, index) in 5" :key='index'><b>第二根</b><b><input class="dt-input" type="text" placeholder="请输入整数1~10"> <em>L</em></b></p>
              </span>
            </div>
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
.filter-life-rule{
  .rule-wrap{
    display: flex;
    height: auto;
    i{
      display: inline-block;
      line-height: 30px;
    }
    span{
      height: auto;
      width: 400px;
      p{
        height: 30px;
        line-height: 30px;
        margin-bottom: 8px;
        display: flex;
        b:nth-of-type(1){
          width: 60px;
          vertical-align: top;
          padding-left: 2px;
        }
        b:nth-of-type(2){
          flex: 1;
          text-align: right;
          input{
            width: 260px;
            margin: 0 4px;
          }
        }
      }
    }
  }
  
}
</style>


