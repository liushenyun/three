<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <div class="dt-search-top">
        <!-- 设备状态下拉框 -->
        <dt-select-option ref='deviceStatusSearchRef' :optiosTitle='$ElSelectName.deviceStatus.title' :optionsName ='$ElSelectName.deviceStatus.name' :conWidth = '$ElSelectName.deviceStatus.width'></dt-select-option>
        <!-- 通讯方式 
        <dt-select-option ref='communicteTypeRef' :optiosTitle='$ElSelectName.communicte.title' :optionsName ='$ElSelectName.communicte.name' :conWidth = '$ElSelectName.communicte.width'></dt-select-option> -->
        <!-- 设备类型  -->
        <!-- <dt-select-option ref='deviceTypeRef' :optiosTitle='$ElSelectName.deviceType.title' :optionsName ='$ElSelectName.deviceType.name' :conWidth = '$ElSelectName.deviceType.width'></dt-select-option> -->
        <!-- 网络状态  -->
        <dt-select-option ref='networkSearchRef' :optiosTitle='$ElSelectName.network.title' :optionsName ='$ElSelectName.network.name' :conWidth = '$ElSelectName.network.width'></dt-select-option>
        <!-- 地区 -->
        <dt-search-area @areaUpdate='topAreaChange'></dt-search-area>
        <!-- 设备ID -->
        <dt-search-input  ref="deviceIdSearchRef" :inputWidth='$SearchInputConfig.deviceId.width' :title="$SearchInputConfig.deviceId.title" :placeholder ='$SearchInputConfig.deviceId.placeholder' :maxLength = '$SearchInputConfig.deviceId.length' defaultValue = ''></dt-search-input>
        <!-- 电话号码 -->
        <dt-search-input  ref="mobileSearchRef" :inputWidth='$SearchInputConfig.moblie.width' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>
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
      <div class="dt-search-top">
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-export" @click="topExportActive">导 出</button>
        </div>
      </div>

      <!-- <div class="dt-search-top">
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-add">新 增</button>
          <button type="button" class="dt-btn dt-btn-search">查 询</button>
          <button type="button" class="dt-btn dt-btn-modify">编 辑</button>
          <button type="button" class="dt-btn dt-btn-export">导 出</button>
          <button type="button" class="dt-btn dt-btn-delete">删 除</button>
          <button type="button" class="dt-btn dt-btn-danger">警 告</button>
          <button type="button" class="dt-btn dt-btn-cancel">取  消</button>
          <button type="button" class="dt-btn dt-btn-upload">上  传</button>
        </div>
      </div> -->
       <!-- top end -->

      <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
            <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="dt-table-check" :class="{'dt-table-checked': allItemChecked}" @click="checkAllItemActive(allItemChecked)"></th>
                    <th class="tw-device-id">设备ID</th>
                    <th class="tw-device-name">设备名称</th>
                    <th class="tw-communicate-type">通讯方式</th>
                    <th class="tw-device-brand">设备品牌</th>
                    <th class="tw-device-series">设备系列</th>
                    <th class="tw-device-model">设备型号</th>
                    <th class="tw-province">所在省份</th>
                    <th class="tw-city">所在城市</th>
                    <th class="tw-district">所在地区</th>
                    <th class="tw-time-date">激活日期</th>
                    <th class="tw-device-status">设备状态</th>
                    <th class="tw-network-status">网络状态</th>
                    <th class="tw-user-name">用户姓名</th>
                    <th class="tw-telephone">手机号码</th>
                    <th class="tw-address">设备地址</th>
                    <th class="tw-device-mac">设备MAC</th>
                    <th class="tw-handle-edit">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>
                  <td>{{item.license_id}}</td>
                  <td>{{item.device_name}}</td>
                  <td>WI-FI</td>
                  <td>{{item.brand}}</td>
                  <td>{{item.series}}</td>
                  <td>{{item.model}}</td>
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.district}}</td>
                  <td>{{item.atime*1000|DateFormat('yyyy-MM-dd')}}</td>
                  <td>{{item.state|FilterDevice1Status}}</td>
                  <td>{{item.netstate|FilterNetworkStatus}}</td>
                  <td>{{item.realname}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.addr}}</td>
                  <td>{{item.mac}}</td>
                  <td class="dt-table-edit" @click="toLookDetailActive(item)"><b>查看</b></td>
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
          <li class="slide-first-title">
            <span>设备信息1</span>
          </li>
          <li class="order-li-info order-li-title">
            <label>设备名称</label><label>设备ID</label><label>设备MAC</label>
          </li>
          <li class="order-li-info">
            <label>{{deviceDetail.device_name ? deviceDetail.device_name : '--'}}</label><label>{{deviceDetail.device_id ? deviceDetail.device_id : '--'}}</label><label>{{deviceDetail.mac ? deviceDetail.mac : '--'}}</label>
          </li>
          <!-- <li class="order-li-info order-li-title">
            <label>通讯方式</label>
          </li>
          <li class="order-li-info">
            <label>WI-FI</label>
          </li> -->

          <li class="slide-first-title">
            <span>设备信息2</span>
          </li>
          <li class="order-li-info order-li-title order-li-address">
            <label>设备品牌</label><label>设备系列</label><label>设备型号</label>
          </li>
          <li class="order-li-info">
            <label>{{deviceDetail.brand ? deviceDetail.brand : '--'}}</label><label>{{deviceDetail.series ? deviceDetail.series : '--'}}</label><label>{{deviceDetail.model ? deviceDetail.model : '--'}}</label>
          </li>
          <li class="order-li-info order-li-title order-li-address">
            <label>通讯方式</label><label>所在地区</label><label>详细地址</label>
          </li>
          <li class="order-li-info">
            <label>WI-FI</label><label>{{deviceDetail.province+deviceDetail.city+deviceDetail.district}}</label><label>{{deviceDetail.device_addr}}</label>
          </li>

          
          <li class="slide-first-title">
            <span>设备状态</span>
          </li>
          <li class="order-li-info order-li-title">
            <label>网络状态</label><label>设备状态</label><label>激活日期</label>
          </li>
          <li class="order-li-info">
            <label>{{deviceDetail.netstate ? deviceDetail.netstate : '--'}}</label><label>正常</label><label>{{deviceDetail.atime}}</label>
          </li>
          <li class="order-li-info order-li-title">
            <label>总出水量</label><label>今日出水</label>
          </li>
          <li class="order-li-info">
            <label>{{deviceDetail.water}}</label><label>{{deviceDetail.today_water}}</label>
          </li>

          <li class="slide-first-title">
            <span>用户信息</span>
          </li>
          <li class="order-li-info order-li-title">
            <label>用户姓名</label><label>用户电话</label><label>客户地址</label>
          </li>
          <li class="order-li-info">
            <label>{{deviceDetail.realname ? deviceDetail.realname : '--'}}</label><label>{{deviceDetail.mobile ? deviceDetail.mobile : '--'}}</label><label>{{deviceDetail.user_addr ? deviceDetail.user_addr : '--'}}</label>
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
              <h6>设备工作历史数据</h6>
              <div class="od-con od-con-record od-operate-container">
                <p v-for="(item, index) in operate.listArr" :key="index">
                  <span>
                      <b>复位第 {{item.operate_type}} 根滤芯</b>
                      <b>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</b>
                  </span>
                  <span></span>
                </p>
              </div>
            </div>
          </li>

          <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>设备告警历史数据</h6>
              <div class="od-con od-con-record od-alarm-container">
                <p v-for="(item, index) in warn.listArr" :key="index">
                  <span>
                      <b>{{item.warning_type|FilterFaultAlarmType}}</b>
                      <b>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</b>
                  </span>
                  <span></span>
                </p>
              </div>
            </div>
          </li>

          <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>设备滤芯使用数据</h6>
              <div class="od-con od-con-filter">
                <p v-for="(item, index) in deviceDetail.filterLifetime" :key="index">
                  <span>滤芯{{index + 1}} </span>
                  <span>
                      <label>
                        <label class="filter-line" :class="{'filter-alarm': Number(item) < 50}" :style="{'width': item + '%'}"></label>
                      </label>
                  </span>
                  <span> {{item}}% </span>
                </p>
              </div>
            </div>
          </li>

          <!-- 运营处理 -->
          <!-- <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.operationHandle.title' :optionsName ='$ElSelectName.operationHandle.name'></dt-select-option>
          </li> -->

          <!-- 信息内容 -->
          <!-- <li>
            <dt-search-textarea  ref="telNum" inputHeight = '96' :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateInformCon.title" :placeholder ='$SearchInputConfig.templateInformCon.placeholder' :maxLength = '$SearchInputConfig.templateInformCon.length'  defaultValue = ''></dt-search-textarea>
          </li> -->

        </ul>

        <!-- <div class="slide-btn-wrap">
          <button class="dt-btn">确定</button>
          <button class="dt-btn dt-btn-cancel">取消</button>
        </div> -->
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSlidePage, dtSearchTextarea } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js";
import { topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange } from "../../global/mixin.js";
// import dtPagination from '../../components/pagination/dtPagination';
export default {
  mixins: [topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange],
  data() {
    return {
      SlidePageConfig,
      currentPage: 1,
      isEditSlideFlag: false,
      slideShow: false,
      pageNumber: 1,
      warn: {
        pageNumber: 1,
        listArr: [],
        listTotal: 0,
        scrollFlag: true
      },
      operate: {
        pageNumber: 1,
        listArr: [],
        listTotal: 0,
        scrollFlag: true
      },
      deviceDetail: {
        filterLifetime: []
      },
      lookDetailDeviceId: 0,
      listArr: [],
      listTotal: 0,
      slideSubmitId: 0,
      allItemChecked: false,
      searchAreaData: [0, 0, 0],
      vParams: {
        a: 12,
        c: 15
      }
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
    let odOperateContainer = document.getElementsByClassName('od-operate-container')[0];
    let odWarnContainer = document.getElementsByClassName('od-alarm-container')[0];
    let vm = this;
    odOperateContainer.addEventListener('scroll', function (params) {
      // https://www.cnblogs.com/iyitong/p/4688200.html
      let height = params.target.clientHeight; // 窗口可视范围的高度
      let theight = params.target.scrollTop; // 窗口滚动条高度
      let rheight = params.target.scrollHeight; // 窗口可视范围的高度(实际内容高度)
      // let bheight = rheight - theight - height; // 滚动条距离底部的高度
      let percent = theight / (rheight - height); // 滚动条距离底部的百分比
      if (percent > 0.95) {
        if ((Number(vm.operate.listTotal) > vm.operate.listArr.length) && vm.operate.scrollFlag) {
          vm.operate.scrollFlag = false;
          vm.operate.pageNumber = +1;
          vm.getOperateList(vm.operate.pageNumber, vm.lookDetailDeviceId);
        }
      }
    });
    odWarnContainer.addEventListener('scroll', function (params) {
      // https://www.cnblogs.com/iyitong/p/4688200.html
      let height = params.target.clientHeight; // 窗口可视范围的高度
      let theight = params.target.scrollTop; // 窗口滚动条高度
      let rheight = params.target.scrollHeight; // 窗口可视范围的高度(实际内容高度)
      // let bheight = rheight - theight - height; // 滚动条距离底部的高度
      let percent = theight / (rheight - height); // 滚动条距离底部的百分比
      if (percent > 0.95) {
        if ((Number(vm.warn.listTotal) > vm.warn.listArr.length) && vm.warn.scrollFlag) {
          vm.warn.scrollFlag = false;
          vm.warn.pageNumber = +1;
          vm.getWranList(vm.warn.pageNumber, vm.lookDetailDeviceId);
        }
      }
    });
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber,
        'state': this.$refs.deviceStatusSearchRef.value,
        'netstate': this.$refs.networkSearchRef.value,
        'brand': this.$refs.brandSearchRef.value,
        'series': this.$refs.seriesSearchRef.value,
        'model': this.$refs.modelSearchRef.value,
        'province_code': this.searchAreaData[0],
        'city_code': this.searchAreaData[1],
        'district_code': this.searchAreaData[2],
        'mobile': this.$refs.mobileSearchRef.value,
        'license_id': this.$refs.deviceIdSearchRef.value,
        'mac': this.$refs.macSearchRef.value
      }
    },
    getMainList(params) {
      this.$http.DeviceDeviceList(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    },
    // paginationChangeActive(val) {
    //   this.pageNumber = val;
    //   this.getMainList(this.getUrlData());
    // },
    getWranList(deviceId, page) {
      this.$http.DeviceDeviceWarningLog(deviceId, page, msg => {
        let _msg = msg.data;
        this.warn.listArr = this.warn.listArr.concat(_msg.list);
        this.warn.listTotal = Number(_msg.total);
      });
    },
    getOperateList(deviceId, page) {
      this.$http.DeviceDeviceOperateLog(deviceId, page, msg => {
        let _msg = msg.data;
        this.operate.listArr = this.operate.listArr.concat(_msg.list);
        this.operate.listTotal = Number(_msg.total);
      });
    },
    getDeviceDetail(deviceId) {
      this.$http.DeviceDeviceDetail(deviceId, msg => {
        let _msg = msg;
        this.deviceDetail = _msg.data;
        this.deviceDetail.filterLifetime = _msg.data.filter_lifetime;
      })
    },
    topExportActive() {
      this.vParams.a += 1;
      this.$projectUtils.ConfirmTip('确定导出设备？', msg => {
        let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'device_id');
        if (_idArr.length) {
          this.$http.exportDevice(_idArr.join(','), msg => {
            window.location.href = msg.file;
          })
        } else {
          this.$message.warning('请选择需要导出的设备');
        }
      })
    },
    // topSearchActive() {
    //   this.pageNumber = 1;
    //   this.getMainList(this.getUrlData());
    // },
    toLookDetailActive(item) {
      this.slideShow = !this.slideShow;
      let _deviceId = item.device_id;
      this.lookDetailDeviceId = _deviceId;
      this.warn.pageNumber = 1;
      this.warn.listArr = [];
      this.operate.pageNumber = 1;
      this.deviceDetail = { filterLifetime: [] }
      this.operate.listArr = [];
      this.getWranList(_deviceId, this.warn.pageNumber);
      this.getOperateList(_deviceId, this.operate.pageNumber);
      this.getDeviceDetail(_deviceId);
    }
    // checkAllItemActive(x) {
    //   this.allItemChecked = !x;
    //   if (this.allItemChecked) {
    //     this.listArr = this.$projectUtils.ListItemAllChecked(this.listArr);
    //   } else {
    //     this.listArr = this.$projectUtils.ListItemAllNoChecked(this.listArr);
    //   }
    // },
    // checkItemActive(x) {
    //   x.checked = !x.checked;
    //   this.allItemChecked = this.$projectUtils.ListItemJudegeAllChecked(this.listArr);
    // },
    // topAreaChange(value) {
    //   let _valueCode = value.code;
    //   let _pCode = _valueCode[0] ? ((_valueCode[0] === 'all') ? '0' : (_valueCode[0])) : '0';
    //   let _cCode = _valueCode[1] ? ((_valueCode[1] === 'all') ? '0' : (_valueCode[1])) : '0';
    //   let _dCode = _valueCode[2] ? ((_valueCode[2] === 'all') ? '0' : (_valueCode[2])) : '0';
    //   this.searchAreaData[0] = _pCode;
    //   this.searchAreaData[1] = _cCode;
    //   this.searchAreaData[2] = _dCode;
    // }
  },
  components: {
    dtSearchTextarea,
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
.order-ul{
  width: 500px;
  .order-li-info{
    display: flex;
    line-height: 20px;
    font-size: $size-two;
    &.order-li-title{
      margin-bottom:0px; 
      label{
        color: #B3B3B3;
        font-size: $size-one;
      }
    }
    label:nth-of-type(1){
      width: 130px;
    }

    label:nth-of-type(2){
      width: 150px;
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
    }
    .od-con-filter p{
      height: 50px;
      line-height: 50px;
      display: flex;
      padding: 0 20px;
      span:nth-of-type(1){
        width: 50px;
      }
      span:nth-of-type(2){
        flex: 1;
        position: relative;
        label{
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 4px;
          background: #F9ECFF;
          transform: translateY(-50%);
          border-radius: 20px;
          .filter-line{
            height: 100%;
            width: 20%;
            background: #CF6EFD;
            &.filter-alarm{
              background: #70DA66;
            }
          }
        }
      }
      span:nth-of-type(3){
        width: 50px;
        text-align: right;
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


