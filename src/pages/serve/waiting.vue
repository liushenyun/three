<template>
  <div calss="serve-waiting-outer">
    <div class="dt-search-top">
      <!-- 服务单号 -->
      <dt-search-input  ref="serviceIdSearchRef" :inputWidth='$SearchInputConfig.serviceNumber.width' :title="$SearchInputConfig.serviceNumber.title" :placeholder ='$SearchInputConfig.serviceNumber.placeholder' :maxLength = '$SearchInputConfig.serviceNumber.length' defaultValue = ''></dt-search-input>

      <!-- 服务分类 -->
      <dt-select-option ref='sericeCategorySearchRef' :optiosTitle='$ElSelectName.serviceCategory.title' :optionsName ='$ElSelectName.serviceCategory.name' :conWidth = '$ElSelectName.serviceCategory.width'></dt-select-option>

      <!-- 问题分类 -->
      <dt-select-option ref='questionCategorySearchRef' :optiosTitle='$ElSelectName.questionCategory.title' :optionsName ='$ElSelectName.questionCategory.name' :conWidth = '$ElSelectName.questionCategory.width'></dt-select-option>

      <!-- 地区 -->
      <dt-search-area @areaUpdate='topAreaChange'></dt-search-area>

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
                <th class="tw-service-number">服务单号</th>
                <th class="tw-service-type">服务类型</th>
                <th class="tw-question-category">问题分类</th>
                <th class="tw-time-ss">申请时间</th>
                <th class="tw-device-brand">设备品牌</th>
                <th class="tw-device-series">设备系列</th>
                <th class="tw-device-model">设备型号</th>
                <th class="tw-province">所在省份</th>
                <th class="tw-city">所在城市</th>
                <th class="tw-district">所在地区</th>
                <th class="tw-handle-edit">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in listArr" :key="index">
                <td>{{item.service_id}}</td>
                <td>{{item.service_type|FilterServiceType}}</td>
                <td>{{item.query_type|FilterQuestionCategory}}</td>
                <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                <td>{{item.brand||'--'}}</td>
                <td>{{item.series||'--'}}</td>
                <td>{{item.model||'--'}}</td>
                <td>{{item.province}}</td>
                <td>{{item.city}}</td>
                <td>{{item.district}}</td>
                <td class="dt-table-edit">
                  <b @click="tableEditActive(item)">{{item.status|FilterServiceOrderStatus}}</b>
                </td>
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

    <!-- 侧滑start -->
      <dt-slide-page slideTitle='派单处理' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul class="order-ul">
          <!-- 模板名称 -->
          <li class="order-li-info order-li-title">
            <label>申请时间</label><label>服务类型</label><label>问题类型</label>
          </li>
          <li class="order-li-info">
            <label>{{serviceDetailInfo.utime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</label><label>{{serviceDetailInfo.service_type|FilterServiceType}}</label><label>{{serviceDetailInfo.query_type|FilterQuestionCategory}}</label>
          </li>

          <li class="order-li-info order-li-title">
            <label>客户姓名</label><label>联系电话</label><label>客户地址</label>
          </li>
          <li class="order-li-info">
            <label>{{serviceDetailInfo.nickname}}</label><label>{{serviceDetailInfo.mobile}}</label><label :title="serviceDetailInfo.province + serviceDetailInfo.city + serviceDetailInfo.district">{{serviceDetailInfo.province + serviceDetailInfo.city + serviceDetailInfo.district}}</label>
          </li>

          <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>其他要求</h6>
              <div class="od-con od-con-img"> 
                <section>{{serviceDetailInfo.description}} </section>
                <label v-if="serviceDetailInfo.images"><img @mouseenter = "imgShowBig = true" @mouseleave = "imgShowBig = false" :src="serviceDetailInfo.images" alt=""></label>
                <transition name="fade" mode="out-in">
                  <label v-if="imgShowBig" :class="{'img-bigger': 1 === 1}"><img :src="serviceDetailInfo.images" alt=""></label>
                </transition>
              </div>
            </div>
          </li>
          <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>{{'审核记录'}}</h6>
              <div class="od-con od-con-record">
                <p v-for="(item, index) in recoredListArr" :key="index">
                  <span>
                      <b>{{item.remark}}</b>
                      <b>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</b>
                  </span>
                  <span>{{item.mark|FilterCheckState}}</span>
                </p>
                <div class="no-data-tip" v-show="!recoredListArr.length">暂无数据</div>
              </div>
            </div>
          </li>

          <!-- 运营处理(订单审核) -->
          <li v-show="serviceHandleStatusFlag == 1">
            <dt-select-option ref='operationSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.operationHandle.title' :optionsName ='$ElSelectName.operationHandle.name'></dt-select-option>
          </li>

          <!-- 信息内容(订单审核)  -->
          <li v-show="serviceHandleStatusFlag == 1">
            <dt-search-textarea  ref="remarkSlideRef" inputHeight = '96' :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateInformCon.title" :placeholder ='$SearchInputConfig.templateInformCon.placeholder' :maxLength = '$SearchInputConfig.templateInformCon.length'  defaultValue = ''></dt-search-textarea>
          </li>

          <!-- 派单处理(派单) -->
          <li v-show="serviceHandleStatusFlag == 2">
            <!-- <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.operationHandle.title' :optionsName ='$ElSelectName.operationHandle.name'></dt-select-option> -->
            <dt-select-option-dynamic ref='servicerSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.dispatchOrder.title' :optionsData ='dispactchDataDatault'></dt-select-option-dynamic>
          </li>

          <!-- 紧急程度(派单) -->
          <li v-show="serviceHandleStatusFlag == 2">
            <dt-select-option ref='emergencySlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.emergencyLevel.title' :optionsName ='$ElSelectName.emergencyLevel.name'></dt-select-option>
          </li>
        </ul>

        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="slideSureActive">确定</button>
          <button class="dt-btn dt-btn-cancel" @click="slideCancelActive">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSearchTextarea, dtSlidePage, dtSelectOptionDynamic } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js";
import { topSearchActive, paginationChangeActive, topAreaChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, topAreaChange],
  data: () => ({
    SlidePageConfig,
    currentPage: 1,
    prePage: 1,
    isEditSlideFlag: false,
    slideShow: false,
    pageNumber: 1,
    imgShowBig: false,
    listArr: [],
    listTotal: 0,
    slideSubmitId: 0,
    searchAreaData: ['0', '0', '0'],
    dispactchDataDatault: [],
    serviceHandleStatusFlag: 0,
    dispatchListArr: [],
    checkListArr: [],
    recoredListArr: [],
    serviceDetailInfo: {}
  }),
  mounted() {
    this.getMainList(this.getUrlData())
  },
  methods: {
    getMainList(params) {
      this.$http.FaultRepairGetServiceList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      });
    },
    // topSearchActive() {
    //   this.pageNumber = 1;
    //   this.getMainList(this.getUrlData());
    // },
    tableEditActive(item) {
      let _info = item;
      this.slideShow = !this.slideShow;
      this.slideSubmitId = _info.service_id;
      this.serviceHandleStatusFlag = Number(_info.status);
      this.recoredListArr = [];
      // 获取订单详情
      this.getServiceDetails(this.slideSubmitId);
      // 获取审核记录
      this.getCheckList(this.slideSubmitId);
      if (this.serviceHandleStatusFlag === 1) {
      } else {
        // 获取派单记录
        // this.getDispatchList(this.slideSubmitId);
        // 获取服务人员列表
        this.getServersList(_info.service_id, _info.district_code);
      }
    },
    slideSureActive() {
      let _urlData;
      if (this.serviceHandleStatusFlag === 1) {
        _urlData = {
          'service_id': this.slideSubmitId,
          'state': this.$refs.operationSlideRef.value,
          'remark': this.$refs.remarkSlideRef.value
        }
        this.$http.FaultRepairServiceCheck(_urlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        _urlData = {
          'service_id': this.slideSubmitId,
          'executor_id': this.$refs.servicerSlideRef.value,
          'emergency': this.$refs.emergencySlideRef.value
        };
        this.$http.FaultRepairServiceSendOut(_urlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      }
    },
    slideCancelActive() {
      this.slideShow = false;
    },
    // paginationChangeActive(val) {
    //   this.pageNumber = val;
    //   this.getMainList(this.getUrlData());
    // },
    // searchAreaChange(value) {
    //   let _changeArea = this.$projectUtils.AreaDateChange(value);
    //   this.searchAreaData[0] = _changeArea.code[0];
    //   this.searchAreaData[1] = _changeArea.code[1];
    //   this.searchAreaData[2] = _changeArea.code[2];
    // },
    // 组件内的功能函数
    getUrlData() { // 获取列表方法
      return {
        'page': this.pageNumber,
        'service_id': this.$refs.serviceIdSearchRef.value,
        'service_type': this.$refs.sericeCategorySearchRef.value,
        'query_type': this.$refs.questionCategorySearchRef.value,
        'province_code': this.searchAreaData[0],
        'city_code': this.searchAreaData[1],
        'district_code': this.searchAreaData[2]
      }
    },
    editSlide(msg) {
      let _msg = msg;
      // input 赋值
      this.$refs.operationSlideRef.value = '1';
      this.$refs.remarkSlideRef.value = '';
      // this.$refs.servicerSlideRef.value = _msg.mobile;
      this.$refs.emergencySlideRef.value = _msg.emergency;
    },
    getServiceDetails(id) { // 获取服务详情
      this.$http.FaultRepairGetDetails(id, msg => {
        let _msg = msg.data;
        this.serviceDetailInfo = _msg;
        this.editSlide(_msg);
      })
    },
    getDispatchList(id) { // 获取派单记录
      this.$http.FaultRepairGetDispatchList(id, msg => {
        let _msg = msg.data;
        this.recoredListArr = _msg.list;
      })
    },
    getCheckList(id) { // 获取审核记录
      this.$http.FaultRepairGetCheckList(id, msg => {
        let _msg = msg.data;
        this.recoredListArr = _msg.list;
      })
    },
    getServersList(serviceId, districtCode) { // Fault_repair - 获取服务详情
      this.$http.FaultRepairGetServers(serviceId, districtCode, msg => {
        let _msg = msg;
        let _arr = []
        _msg.data.forEach(val => {
          _arr.push({
            value: val.id,
            label: val.fullname
          })
        });
        this.dispactchDataDatault = _arr
      })
    }
  },
  components: {
    dtSlidePage,
    dtSearchTextarea,
    dtSelectOptionDynamic
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/constant.style.scss';
.order-ul{
  width: 500px;
  .order-li-info{
    display: flex;
    line-height: 20px;
    font-size: $size-three;
    &.order-li-title{
      margin-bottom:0px; 
      label{
        color: #B3B3B3;
        font-size: $size-two;
      }
    }
    label:nth-of-type(1){
      width: 180px;
    }

    label:nth-of-type(2){
      width: 126px;
    }

    label:nth-of-type(3){
      flex: 1;
    }
  }
}
.order-show-li{
  .order-show-wrap{
    height: 170px;
    border: 1px solid #DDDDDD;
    h6{
      padding-left: 16px;
      height: 40px;
      line-height: 40px; 
    }
    .od-con{
      padding: 8px 16px;
      border-top: 1px solid #DDDDDD;
      height: 130px;
      line-height: 20px;
      overflow-y: auto;
      &.od-con-img{
        display: flex;
        position: relative;
        section{
          flex: 1;
        }
        label{
          width: 140px;
          line-height: 112px;
          text-align: center;
          img{
            width: 60%;
            max-height: 100%;
            vertical-align: middle;
            cursor: pointer;
          }
        }
        .img-bigger{
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 700px;
          z-index: 1000;
        }
      }
    }
    .od-con-record p{
      height: 50px;
      line-height: 50px;
      display: flex;
      span:nth-of-type(1){
        flex: 1;
        b{
          display: block;
          line-height: 20px;
          height: 20px;
        }
        b:nth-of-type(1){
          margin-top: 5px;
        }
        b:nth-of-type(2){
          font-size: $size-one;
          color: #999;
        }
      }
      span:nth-of-type(2){
        width: 80px;
        text-align: center;
      }
    }
  }
}
</style>

