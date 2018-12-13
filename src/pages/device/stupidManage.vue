<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <div class="dt-search-top">
        <!-- 设备状态 -->
        <!-- <dt-select-option ref='deviceStatusSearchRef' :optiosTitle='$ElSelectName.deviceStatus.title' :optionsName ='$ElSelectName.deviceStatus.name' :conWidth = '$ElSelectName.deviceStatus.width'></dt-select-option> -->
        <!-- 通讯方式 
        <dt-select-option ref='communicteTypeRef' :optiosTitle='$ElSelectName.communicte.title' :optionsName ='$ElSelectName.communicte.name' :conWidth = '$ElSelectName.communicte.width'></dt-select-option> -->
        <!-- 设备类型  -->
        <!-- <dt-select-option ref='deviceTypeRef' :optiosTitle='$ElSelectName.deviceType.title' :optionsName ='$ElSelectName.deviceType.name' :conWidth = '$ElSelectName.deviceType.width'></dt-select-option> -->
        <!-- 网络状态  -->
        <!-- <dt-select-option ref='networkSearchRef' :optiosTitle='$ElSelectName.network.title' :optionsName ='$ElSelectName.network.name' :conWidth = '$ElSelectName.network.width'></dt-select-option> -->
        <!-- 地区 -->
        <dt-search-area @areaUpdate='topAreaChange'></dt-search-area>
        <!-- 设备ID -->
        <dt-search-input  ref="deviceIdSearchRef" :inputWidth='$SearchInputConfig.deviceId.width' :title="$SearchInputConfig.deviceId.title" :placeholder ='$SearchInputConfig.deviceId.placeholder' :maxLength = '$SearchInputConfig.deviceId.length' defaultValue = ''></dt-search-input>
        <!-- 电话号码 -->
        <dt-search-input  ref="mobileSearchRef" :inputWidth='$SearchInputConfig.moblie.width' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>
        <!-- 设备mac -->
        <!-- <dt-search-input  ref="macSearchRef" :inputWidth='$SearchInputConfig.mac.width' :title="$SearchInputConfig.mac.title" :placeholder ='$SearchInputConfig.mac.placeholder' :maxLength = '$SearchInputConfig.mac.length' defaultValue = ''></dt-search-input> -->

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
          <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
          <button type="button" class="dt-btn dt-btn-export" @click="topExportActive">导 出</button>
          <button type="button" class="dt-btn dt-btn-delete" @click="topDeleteActive">删 除</button>
        </div>
      </div>
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
                    <th class="tw-device-brand">设备品牌</th>
                    <th class="tw-device-series">设备系列</th>
                    <th class="tw-device-model">设备型号</th>
                    <th class="tw-province">所在省份</th>
                    <th class="tw-city">所在城市</th>
                    <th class="tw-district">所在地区</th>
                    <th class="tw-time-date">激活日期</th>
                    <th class="tw-user-name">用户姓名</th>
                    <th class="tw-telephone">手机号码</th>
                    <th class="tw-handle-edit">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>
                  <td>{{item.device_id}}</td>
                  <td>{{item.device_name}}</td>
                  <td>{{item.brand_name}}</td>
                  <td>{{item.series_name}}</td>
                  <td>{{item.model_name}}</td>
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.district}}</td>
                  <td>{{item.atime*1000|DateFormat('yyyy-MM-dd')}}</td>
                  <td>{{item.realname}}</td>
                  <td>{{item.mobile}}</td>
                  <td class="dt-table-edit"><b @click="tableEditActive(item)">编辑</b></td>
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
      <dt-slide-page slideTitle='新增设备' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <!-- 设备名称 -->
          <li>
            <dt-search-input  ref="deviceNameSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.deviceName.title" :placeholder ='$SearchInputConfig.deviceName.placeholder' :maxLength = '$SearchInputConfig.deviceName.length'  defaultValue = ''></dt-search-input>
          </li>
          <!-- 设备品牌 -->
          <li>
            <dt-search-input  ref="deviceBrandSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.deviceBrand.title" :placeholder ='$SearchInputConfig.deviceBrand.placeholder' :maxLength = '$SearchInputConfig.deviceBrand.length'  defaultValue = ''></dt-search-input>
          </li>
          <!-- 设备系列 -->
          <li>
            <dt-search-input  ref="deviceSeriesSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.deviceSeries.title" :placeholder ='$SearchInputConfig.deviceSeries.placeholder' :maxLength = '$SearchInputConfig.deviceSeries.length' defaultValue = ''></dt-search-input>
          </li>
          <li>
            <!-- 设备型号 -->
            <dt-search-input  ref="deviceModleSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.deviceModel.title" :placeholder ='$SearchInputConfig.deviceModel.placeholder' :maxLength = '$SearchInputConfig.deviceModel.length' defaultValue = ''></dt-search-input>
          </li>
          <li>
            <!-- 区域筛选 -->
            <dt-search-area :defaultOptions = 'slideAreaDefault' :inputWidth='SlidePageConfig.selectWidthA' needAll= 0  @areaUpdate='slideAreaChange' ></dt-search-area>
          </li>
          <li>
            <!-- 设备地址 -->
            <dt-search-input  ref="addressSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.deviceAddress.title" :placeholder ='$SearchInputConfig.deviceAddress.placeholder' :maxLength = '$SearchInputConfig.deviceAddress.length' defaultValue = ''></dt-search-input>
          </li>
          <li>
            <!-- 用户姓名 -->
            <dt-search-input  ref="fullNameSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.userName.title" :placeholder ='$SearchInputConfig.userName.placeholder' :maxLength = '$SearchInputConfig.userName.length' defaultValue = ''></dt-search-input>
          </li>
          <li>
            <!-- 手机号码 -->
            <dt-search-input  ref="mobileSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>
          </li>
        </ul>
        <div class="slide-btn-wrap">
          <button class="dt-btn"  @click="slideSureActive">确定</button>
          <button class="dt-btn dt-btn-cancel"  @click="slideCancelActive">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js"
import { topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange],
  data() {
    return {
      SlidePageConfig,
      currentPage: 1,
      isEditSlideFlag: false,
      slideShow: false,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      slideSubmitId: 0,
      allItemChecked: false,
      searchAreaData: [0, 0, 0],
      slideAreaData: [0, 0, 0],
      slideAreaDefault: ['', '', '']
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber,
        'device_id': this.$refs.deviceIdSearchRef.value,
        'brand_name': this.$refs.brandSearchRef.value,
        'series_name': this.$refs.seriesSearchRef.value,
        'model_name': this.$refs.modelSearchRef.value,
        'province_code': this.searchAreaData[0],
        'city_code': this.searchAreaData[1],
        'district_code': this.searchAreaData[2],
        'mobile': this.$refs.mobileSearchRef.value
      }
    },
    getRefs() {
      let _refsValue = {
        'device_name': this.$refs.deviceNameSlideRef.value,
        'brand': this.$refs.deviceBrandSlideRef.value,
        'series': this.$refs.deviceSeriesSlideRef.value,
        'model': this.$refs.deviceModleSlideRef.value,
        'addr': this.$refs.addressSlideRef.value,
        'realname': this.$refs.fullNameSlideRef.value,
        'mobile': this.$refs.mobileSlideRef.value
      };
      return _refsValue;
    },
    setRefsEmpty() {
      this.$refs.deviceNameSlideRef.value = '';
      this.$refs.deviceBrandSlideRef.value = '';
      this.$refs.deviceSeriesSlideRef.value = '';
      this.$refs.deviceModleSlideRef.value = '';
      this.$refs.addressSlideRef.value = '';
      this.$refs.fullNameSlideRef.value = '';
      this.$refs.mobileSlideRef.value = '';
      this.slideAreaDefault = ['', '', ''];
    },
    editSlide(msg) {
      let _msg = msg;
      // input 赋值
      this.$refs.deviceNameSlideRef.value = _msg.device_name;
      this.$refs.deviceBrandSlideRef.value = _msg.brand_name;
      this.$refs.deviceSeriesSlideRef.value = _msg.series_name;
      this.$refs.deviceModleSlideRef.value = _msg.model_name;
      this.$refs.addressSlideRef.value = _msg.addr;
      this.$refs.fullNameSlideRef.value = _msg.realname;
      this.$refs.mobileSlideRef.value = _msg.mobile;
      this.slideAreaDefault = this.$projectUtils.SetAreaDefault(_msg.province_code, _msg.city_code, _msg.district_code);
      this.slideAreaData = this.slideAreaDefault;
    },
    getMainList(params) {
      this.allItemChecked = false;
      this.$http.DeviceGetNonSmartDeviceList(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    },
    topAddActive() {
      this.slideShow = !this.slideShow;
      this.slideSubmitId = 0;
      this.isEditSlideFlag = false;
      this.setRefsEmpty();
    },
    topDeleteActive() {
      this.$projectUtils.ConfirmTip('确定删除？', msg => {
        let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'device_id');
        this.$http.DeviceDeleteNonSmartSevice(_idArr.join(','), msg => {
          this.getMainList(this.getUrlData());
        })
      })
    },
    tableEditActive(item) {
      this.slideShow = !this.slideShow;
      this.slideSubmitId = item.device_id;
      this.isEditSlideFlag = true;
      this.editSlide(item);
    },
    topExportActive() {
      this.$projectUtils.ConfirmTip('确定导出设备？', msg => {
        let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'device_id');
        if (_idArr.length) {
          this.$http.exportNonSmartDevice(_idArr.join(','), msg => {
            window.location.href = msg.file;
          })
        } else {
          this.$message.warning('请选择需要导出的设备');
        }
      })
    },
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
    slideSureActive() {
      let _refsValue = this.getRefs();
      let _addUrlData = {
        'device_name': _refsValue.device_name,
        'brand': _refsValue.brand,
        'series': _refsValue.series,
        'model': _refsValue.model,
        'province_code': this.slideAreaData[0],
        'city_code': this.slideAreaData[1],
        'district_code': this.slideAreaData[2],
        'addr': _refsValue.addr,
        'realname': _refsValue.realname,
        'mobile': _refsValue.mobile
      };
      if (this.isEditSlideFlag) {
        let _editUrlData = Object.assign({}, _addUrlData);
        _editUrlData.device_id = this.slideSubmitId;
        this.$http.DeviceUpdateNonSmartDevice(_editUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        this.$http.DeviceAddNonSmartDevice(_addUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      }
    },
    slideCancelActive() {
      this.slideShow = false;
      this.setRefsEmpty();
    },
    // paginationChangeActive(val) {
    //   this.pageNumber = val;
    //   this.getMainList(this.getUrlData());
    // },
    searchAreaChange(value) {
      let _changeArea = this.$projectUtils.AreaDateChange(value);
      this.searchAreaData[0] = _changeArea.code[0];
      this.searchAreaData[1] = _changeArea.code[1];
      this.searchAreaData[2] = _changeArea.code[2];
    },
    slideAreaChange(value) {
      let _changeArea = this.$projectUtils.AreaDateChange(value);
      this.slideAreaData[0] = _changeArea.code[0];
      this.slideAreaData[1] = _changeArea.code[1];
      this.slideAreaData[2] = _changeArea.code[2];
    }
  },
  components: {
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>
</style>


