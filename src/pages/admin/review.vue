<template>
  <div calss="serve-waiting-outer">

    <!-- top Satrt -->
      <div class="dt-search-top">
        <!-- 设备状态下拉框 -->
        <dt-select-option ref='auditStatusSearchRef' :optiosTitle='$ElSelectName.auditStatus.title' :optionsName ='$ElSelectName.auditStatus.name' :conWidth = '$ElSelectName.auditStatus.width'></dt-select-option>

        <!-- 电话号码 -->
        <dt-search-input  ref="mobileSearchRef" :inputWidth='$SearchInputConfig.moblie.width' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>
    
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
                  <th class="tw-handle-account">账号</th>
                  <th class="tw-user-name">姓名</th>
                  <th class="tw-telephone">手机号码</th>
                  <th class="tw-area">服务区域</th>
                  <th class="tw-service-number">服务编号</th>
                  <th class="tw-role-type">角色类型</th>
                  <!-- <th class="tw-company-name">公司</th> -->
                  <th class="tw-time-date">申请时间</th>
                  <th class="tw-address">联系地址</th>
                  <th class="tw-handle-edit">审核结果</th>
                </tr>
              </thead>
            <tbody>
              <tr v-for="(item,index) in listArr" :key="index">
                <td>{{item.username}}</td>
                <td>{{item.fullname}}</td>
                <td>{{item.mobile}}</td>
                <td>{{item.service_area}}</td>
                <td>{{item.account_id}}</td>
                <td>{{item.role_type|FilterRoleType}}</td>
                <!-- <td>{{item.company}}</td> -->
                <td>{{item.ctime*1000 | DateFormat('yyyy-MM-dd')}}</td>
                <td>{{item.address}}</td>
                <td class="dt-table-edit">
                  <b :class="{'dt-table-edit-no-click': item.handle_state == 2 || item.handle_state == 3}" @click="toApplyDetail(item)">{{item.handle_state|FilterAccountHandleStatus}}</b>
                </td>
              </tr>
            </tbody>
        </table>
        <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
      </div>
      <div class="dt-page-wrap">
        <el-pagination class="dt-page-reset"  :page-size="10"  @current-change="paginationChangeActive" :current-page="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 表格 end -->

    <!-- 侧滑start -->
      <dt-slide-page slideTitle='派单处理' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul class="order-ul">
          <!-- 模板名称 -->
          <li class="order-li-info order-li-title">
            <label>工号</label><label>申请时间</label><label>角色类型</label>
          </li>
          <li class="order-li-info">
            <label>{{servicerInfo.account_id}}</label><label>{{servicerInfo.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</label><label>{{servicerInfo.role_type|FilterRoleType}}</label>
          </li>

          <li class="order-li-info order-li-title">
            <label>客户姓名</label><label>联系电话</label><label>身份证号</label>
          </li>
          <li class="order-li-info">
            <label>{{servicerInfo.fullname}}</label><label>{{servicerInfo.mobile}}</label><label>{{servicerInfo.idcard}}</label>
          </li>
          <li class="order-li-info order-li-title info-two">
            <label>服务区域</label><label>客户地址</label>
          </li>
          <li class="order-li-info info-two">
            <label>{{servicerInfo.service_area}}</label><label>{{servicerInfo.address}}</label>
          </li>

          <!-- <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>其他要求</h6>
              <div class="od-con">
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
                  设备无法正常运转，希望客户尽快处理。安排师傅上门维修
              </div>
            </div>
          </li> -->
          <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>审核记录</h6>
              <div class="od-con od-con-record">
                <p v-for="(item, index) in servicerHandleList" :key="index">
                  <span>
                      <b>{{item.content}}</b>
                      <b>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</b>
                  </span>
                  <span>{{item.handle_state|FilterAccountHandleStatus}}</span>
                </p>
                <div class="no-data-tip" v-show="!servicerHandleList.length">暂无数据</div>
              </div>
            </div>
          </li>
          <!-- 运营处理 -->
          <li>
            <dt-select-option ref='auditHandleSlideRef' defaultValue ='' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.auditHandle.title' :optionsName ='$ElSelectName.auditHandle.name'></dt-select-option>
          </li>

          <!-- 信息内容 -->
          <li>
            <dt-search-textarea  ref="infoConSlideRef" inputHeight = '96' :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateInformCon.title" :placeholder ='$SearchInputConfig.templateInformCon.placeholder' :maxLength = '$SearchInputConfig.templateInformCon.length'  defaultValue = ''></dt-search-textarea>
          </li>

        </ul>

        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="slideSureActive">确定</button>
          <button class="dt-btn dt-btn-cancel" @click="slideShow = false">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSearchTextarea, dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js";
import { paginationChangeActive, topSearchActive } from "../../global/mixin";
export default {
  mixins: [paginationChangeActive, topSearchActive],
  data() {
    return {
      pageNumber: 1,
      recordPageNumber: 1,
      auditHandleDefault: '',
      scrollFlag: true,
      servicerId: '',
      listArr: [],
      listTotal: 0,
      servicerInfo: {},
      servicerHandleList: [],
      servicerHandleListTotal: 0,
      SlidePageConfig,
      slideShow: false
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
    let odConRecord = document.getElementsByClassName('od-con-record')[0];
    let vm = this;
    odConRecord.addEventListener('scroll', function (params) {
      // https://www.cnblogs.com/iyitong/p/4688200.html
      let height = params.target.clientHeight; // 窗口可视范围的高度
      let theight = params.target.scrollTop; // 窗口滚动条高度
      let rheight = params.target.scrollHeight; // 窗口可视范围的高度(实际内容高度)
      // let bheight = rheight - theight - height; // 滚动条距离底部的高度
      let percent = theight / (rheight - height); // 滚动条距离底部的百分比
      if (percent > 0.95) {
        if ((Number(vm.servicerHandleListTotal) > vm.servicerHandleList.length) && vm.scrollFlag) {
          vm.scrollFlag = false;
          vm.recordPageNumber = +1;
          vm.getApplyHandleList(vm.recordPageNumber, vm.servicerId);
        }
      }
    })
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber,
        'handle_state': this.$refs.auditStatusSearchRef.value,
        'mobile': this.$refs.mobileSearchRef.value
      }
    },
    getMainList(params) {
      this.$http.serviceAccountFrontGetApplyList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      })
    },
    getApplyDetail(id) {
      this.$http.serviceAccountFrontGetApplyDetail(id, msg => {
        this.servicerInfo = msg.data;
      })
    },
    getApplyHandleList(page, id) {
      this.$http.serviceAccountFrontGetApplyHandleList(page, id, msg => {
        this.scrollFlag = true;
        let _msg = msg.data;
        this.servicerHandleListTotal = _msg.total;
        this.servicerHandleList = this.servicerHandleList.concat(_msg.list);
      })
    },
    addApplyHandle(applyId, handleState, content) {
      this.$http.serviceAccountFrontAddApplyHandle(applyId, handleState, content, msg => {
        this.slideShow = false;
        this.getMainList(this.getUrlData());
      })
    },
    toApplyDetail(info) {
      if (Number(info.handle_state) === 2 || Number(info.handle_state) === 3) {
        return;
      }
      this.servicerHandleLis = [];
      this.servicerInfo = {};
      let _id = info.id;
      this.servicerId = _id;
      this.$refs.auditHandleSlideRef.value = info.handle_state === '0' ? '1' : info.handle_state;
      this.$refs.infoConSlideRef.value = '';
      this.getApplyDetail(_id);
      this.getApplyHandleList(this.recordPageNumber, _id);
      this.slideShow = true;
    },
    slideSureActive() {
      let _handleState = this.$refs.auditHandleSlideRef.value;
      let _content = this.$refs.infoConSlideRef.value;
      let _id = this.servicerId;
      this.addApplyHandle(_id, _handleState, _content);
    }
  },
  components: {
    dtSlidePage,
    dtSearchTextarea
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
      width: 110px;
    }

    label:nth-of-type(2){
      width: 180px;
    }

    label:nth-of-type(3){
      flex: 1;
    }
    &.info-two{
      label:nth-of-type(1){
        width: 230px;
      }
      label:nth-of-type(2){
        flex: 1;
      }
    }
  }
}
.order-show-li{
  .order-show-wrap{
    min-height: 170px;
    border: 1px solid #DDDDDD;
    h6{
      padding-left: 16px;
      height: 40px;
      line-height: 40px; 
    }
    .od-con{
      padding: 8px 16px;
      border-top: 1px solid #DDDDDD;
      min-height: 130px;
      max-height: 200px;
      line-height: 20px;
      overflow-y: auto;
    }
    .od-con-record p{
      min-height: 50px;
      display: flex;
      span:nth-of-type(1){
        flex: 1;
        b{
          display: block;
          line-height: 20px;
          height: auto;
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
        line-height: 50px;
        text-align: center;
      }
    }
  }
}

</style>

