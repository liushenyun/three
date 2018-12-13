<template>
  <div calss="feedback-outer">
    <div class="dt-search-top">
      <!-- 反馈类型 -->
      <dt-select-option ref='feedbackTypeSearchRef' :optiosTitle='$ElSelectName.feedbackType.title' :optionsName ='$ElSelectName.feedbackType.name' :conWidth = '$ElSelectName.feedbackType.width'></dt-select-option>

      <!-- 处理状态 -->
      <dt-select-option ref='handleStatusSearchRef' :optiosTitle='$ElSelectName.handleStatus.title' :optionsName ='$ElSelectName.handleStatus.name' :conWidth = '$ElSelectName.handleStatus.width'></dt-select-option>

      <!-- 处理方式 -->
      <dt-select-option ref='handleWaySearchRef' :optiosTitle='$ElSelectName.handleWay.title' :optionsName ='$ElSelectName.handleWay.name' :conWidth = '$ElSelectName.handleWay.width'></dt-select-option>

      <!-- 反馈来源 -->
      <dt-select-option ref='feedbackFromSearchRef' :optiosTitle='$ElSelectName.feedbackFrom.title' :optionsName ='$ElSelectName.feedbackFrom.name' :conWidth = '$ElSelectName.feedbackFrom.width'></dt-select-option>


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
                <th class="tw-user-name">客户名称</th>
                <th class="tw-telephone">联系电话</th>
                <th class="tw-whole-address">通讯地址</th>
                <th class="tw-feedback-type">反馈类型</th>
                <th class="tw-feedback-handle-status">处理状态</th>
                <!-- <th class="tw-feedback-title">标题</th> -->
                <th class="tw-feedback-con">内容</th>
                <th class="tw-time-ss">反馈时间</th>
                <th class="tw-handle-edit">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in listArr" :key="index">
                <td>{{item.realname}}</td>
                <td>{{item.mobile}}</td>
                <td>{{item.province + item.city +item.district +item.address }}</td>
                <td>{{item.query_type|FilterFeedbackType}}</td>
                <td>{{item.state|FilterFeedbackHandleStatus}}</td>
                <!-- <td>{{item.realname}}</td> -->
                <td>{{item.description}}</td>
                <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                <td class="dt-table-edit">
                  <b @click="tableEditActive(item)">{{(item.state == '0'||item.state == '1')?'处理':'查看'}}</b>
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
      <dt-slide-page :slideTitle='slideTopTilte' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul class="order-ul">
          <!-- 模板名称 -->
          <li class="order-li-info order-li-title">
            <label>反馈时间</label><label>反馈类型</label><label>处理状态</label>
          </li>
          <li class="order-li-info">
            <label>{{itemDetailInfo.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</label><label>{{itemDetailInfo.query_type|FilterFeedbackType}}</label><label>{{itemDetailInfo.state|FilterFeedbackHandleStatus}}</label>
          </li>

          <li class="order-li-info order-li-title">
            <label>客户姓名</label><label>联系电话</label><label>客户地址</label>
          </li>
          <li class="order-li-info">
            <label>{{itemDetailInfo.realname}}</label><label>{{itemDetailInfo.mobile}}</label><label>{{itemDetailInfo.province + itemDetailInfo.city + itemDetailInfo.district + itemDetailInfo.address}}</label>
          </li>

          <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>其他要求</h6>
              <div class="od-con od-con-img"> 
                <section>{{itemDetailInfo.description}} </section>
                <label v-if="itemDetailInfo.images"><img @mouseenter = "imgShowBig = true" @mouseleave = "imgShowBig = false" :src="itemDetailInfo.images[0]" alt=""></label>
                <transition name="fade" mode="out-in">
                  <label v-if="imgShowBig" :class="{'img-bigger': 1 === 1}"><img :src="itemDetailInfo.images[0]" alt=""></label>
                </transition>
              </div>
            </div>
          </li>
          <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>处理记录</h6>
              <div class="od-con od-con-record">
                <p v-for="(item, index) in recoredListArr" :key="index">
                  <span>
                      <b>{{item.remark}}</b>
                      <b>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</b>
                  </span>
                  <span>{{item.state|FilterFeedbackHandleStatus}}</span>
                </p>
                <div class="no-data-tip" v-show="!recoredListArr.length">暂无数据</div>
              </div>
            </div>
          </li>

          <!-- 运营处理(用户反馈) -->
          <li v-show="isEditSlideFlag">
            <dt-select-option ref='operationSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.feeddbackOperationHandle.title' :optionsName ='$ElSelectName.feeddbackOperationHandle.name'></dt-select-option>
          </li>

          <!-- 信息内容(用户反馈)  -->
          <li v-show="isEditSlideFlag">
            <dt-search-textarea  ref="remarkSlideRef" inputHeight = '96' :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateInformCon.title" :placeholder ='$SearchInputConfig.templateInformCon.placeholder' :maxLength = '$SearchInputConfig.templateInformCon.length'  defaultValue = ''></dt-search-textarea>
          </li>
        </ul>

        <div class="slide-btn-wrap" v-show="isEditSlideFlag">
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
import { topSearchActive, paginationChangeActive } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive],
  data: () => ({
    SlidePageConfig,
    currentPage: 1,
    prePage: 1,
    isEditSlideFlag: false,
    slideShow: false,
    pageNumber: 1,
    listArr: [],
    listTotal: 0,
    slideSubmitId: 0,
    slideTopTilte: '用户反馈详情',
    recoredListArr: [],
    itemDetailInfo: {},
    imgShowBig: false
  }),
  mounted() {
    this.getMainList(this.getUrlData())
  },
  methods: {
    getMainList(params) {
      this.$http.FeedbackGetFeedbackList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      });
    },
    tableEditActive(item) {
      let _info = item;
      let _state = Number(_info.state);
      if (_state === 0 || _state === 1) {
        this.isEditSlideFlag = true;
        this.editSlide(_info);
        this.slideTopTilte = '用户反馈管理';
      } else {
        this.isEditSlideFlag = false;
        this.slideTopTilte = '用户反馈详情';
      }
      this.slideShow = true;
      this.slideSubmitId = _info.id;
      this.recoredListArr = [];
      // 获取订单详情
      this.getFeedbackDetails(this.slideSubmitId);
      // 获取派单记录
      this.getFeedbackRecordList(this.slideSubmitId);
    },
    slideSureActive() {
      let _urlData = {
        'id': this.slideSubmitId,
        'state': this.$refs.operationSlideRef.value,
        'remark': this.$refs.remarkSlideRef.value
      }
      this.$http.FeedbackDealFeedback(_urlData, msg => {
        this.slideShow = false;
        this.getMainList(this.getUrlData());
      });
    },
    slideCancelActive() {
      this.slideShow = false;
    },
    // 组件内的功能函数
    getUrlData() { // 获取列表方法
      return {
        'page': this.pageNumber,
        'query_type': this.$refs.feedbackTypeSearchRef.value,
        'state': this.$refs.handleStatusSearchRef.value,
        'method': this.$refs.handleWaySearchRef.value,
        'channel': this.$refs.feedbackFromSearchRef.value
      }
    },
    editSlide(msg) {
      let _msg = msg;
      // input 赋值
      this.$refs.operationSlideRef.value = _msg.state;
      this.$refs.remarkSlideRef.value = '';
    },
    getFeedbackDetails(id) { // 获取反馈详情
      this.$http.FeedbackGetFeedbackDetail(id, msg => {
        let _msg = msg.data.list;
        this.itemDetailInfo = _msg;
      })
    },
    getFeedbackRecordList(id) { // 获取反馈记录列表
      this.$http.FeedbackGetFeedbackLogList(id, msg => {
        let _msg = msg.data;
        this.recoredListArr = _msg.list;
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

