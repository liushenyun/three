<template>
  <div class="device-manage-outer">
    <!-- top Satrt -->
      <div class="dt-search-top">
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
        </div>
      </div>
       <!-- top end -->

      <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="tw-device-id">规则名称</th>
                    <th class="tw-device-name">租赁模式</th>
                    <th class="tw-communicate-type">设备品牌</th>
                    <th class="tw-device-type">设备系列</th>
                    <th class="tw-device-brand">设备型号</th>
                    <th class="tw-device-model">所在省份</th>
                    <th class="tw-device-series">所在城市</th>
                    <th class="tw-province">所在地区</th>
                    <th class="tw-handle-edit2">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item, index) in listArr" :key="index">                 
                  <td>{{item.name}}</td>
                  <td>{{item.type == 1?'时间':'流量'}}</td>
                  <td>{{item.brand_name}}</td>
                  <td>{{item.series_name}}</td>
                  <td>{{item.model_name}}</td>
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.district}}</td>
                  <td class="dt-table-edit"><b @click="toCheckDetail(item.id)">查  看</b><b @click="topDeleteActive(item.id)">删除</b></td>
                </tr>
              </tbody>
          </table>
        </div>
        <div class="dt-page-wrap">
         <el-pagination class="dt-page-reset" :page-size="10"  @current-change="paginationChangeActive" :current-page.sync="currentPage" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

      <!-- 侧滑start -->
      <dt-slide-page slideTitle="新增租赁规则" :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthB'>
        <ul>
          <!-- 标题 -->
          <li class="rule-title-wrap">
            <button class="dt-btn dt-btn-cancel" :class="{'rule-active':ruleTitleCheck1}"><img src='../../statics/img/rule_select.png' alt=""> 1 新增基础信息模块</button>
            <button class="dt-btn dt-btn-cancel" :class="{'rule-active':ruleTitleCheck2}" @click="ruleCheckActive2()"><img src='../../statics/img/rule_select.png' alt=""> 2 新增押金规则模块</button>
            <button class="dt-btn dt-btn-cancel" :class="{'rule-active':ruleTitleCheck3}" @click="ruleCheckActive3()"><img src='../../statics/img/rule_select.png' alt=""> 3 新增试用套餐模块</button>
            <button class="dt-btn dt-btn-cancel" :class="{'rule-active':ruleTitleCheck4}"><img src='../../statics/img/rule_select.png' alt=""> 4 新增租赁套餐模块</button>
            <button class="dt-btn dt-btn-cancel" :class="{'rule-active':(ruleTitleCheck5 && !ruleTitleCheck6) }" @click="ruleCheckActive5()"><img src='../../statics/img/rule_select.png' alt=""> 5 新增超量/有效期规则模块</button>
            <button class="dt-btn dt-btn-cancel" :class="{'rule-active':(ruleTitleCheck6 && !ruleTitleCheck5)}" @click="ruleCheckActive6()"><img src='../../statics/img/rule_select.png' alt=""> 6 新增优惠规则模块</button>
            <button class="dt-btn dt-btn-cancel" :class="{'rule-active':ruleTitleCheck7}" @click="ruleCheckActive7()"><img src='../../statics/img/rule_select.png' alt=""> 7 新增送机规则模块</button>
          </li>
          <!-- 详细内容 -->
          <li class="rule-detail-wrap">
            <div class="rule-detail-con">
              <h4>1 新增基础信息模块</h4>
              <div class="dt-slide-search">
                
                <!-- 规则名称 -->
                <dt-search-input :hasSearchTitle = 'true' ref="ruleNameOneSlideRef" :inputWidth='$SearchInputConfig.ruleName.width' :title="$SearchInputConfig.ruleName.title" :placeholder ='$SearchInputConfig.ruleName.placeholder' :maxLength = '$SearchInputConfig.ruleName.length' defaultValue = ''></dt-search-input>

                <!-- 适用场景 -->
                <dt-select-option :hasSelectTitle ='true'  ref='applySceneOneSlideRef' :optiosTitle='$ElSelectName.applyScene.title' :optionsName ='$ElSelectName.applyScene.name' :conWidth = '$ElSelectName.applyScene.width'></dt-select-option>

                <!-- 租赁模式 -->
                <dt-select-option :hasSelectTitle ='true' @selectValueChange = 'rentModelSelectValueChange'  ref='rentModelOneSlideRef' :optiosTitle='$ElSelectName.rentModel.title' :optionsName ='$ElSelectName.rentModel.name' :conWidth = '$ElSelectName.rentModel.width'></dt-select-option>

                <!-- 选择产品 => 品牌、系列、型号 -->
                <dt-select-option :hasSelectTitle ='true'  ref='selectBrandOneSlideRef' optiosTitle='选择产品' :optionsName ='$ElSelectName.selectBrand.name' :conWidth = '$ElSelectName.selectBrand.width'></dt-select-option>
                <dt-select-option :hasSelectTitle ='false'  ref='selectSeriesOneSlideRef' :optiosTitle='$ElSelectName.selectSeries.title' :optionsName ='$ElSelectName.selectSeries.name' :conWidth = '$ElSelectName.selectSeries.width'></dt-select-option>
                <dt-select-option :hasSelectTitle ='false'  ref='selectModelOneSlideRef' :optiosTitle='$ElSelectName.selectModel.title' :optionsName ='$ElSelectName.selectModel.name' :conWidth = '$ElSelectName.selectModel.width'></dt-select-option>
                <!-- 适用地区 -->
                <dt-search-area needAll= 0 :defaultOptions ='areaSlideDefault' inputWidth='240'  optionsTitle='适用地区' @areaUpdate='slideAreaChange'></dt-search-area>
              </div>
            </div>
          </li>

          <li class="rule-detail-wrap" v-show="ruleTitleCheck2">
            <div class="rule-detail-con">
              <h4>2 新增押金规则模块</h4>
              <div class="dt-slide-search">
                <!-- 套餐费用 -->
                <dt-search-input :hasSearchTitle = 'true' ref="chargeTwoSlideRef" :inputWidth='$SearchInputConfig.rulePackageCharge.width' :title="$SearchInputConfig.rulePackageCharge.title" :placeholder ='$SearchInputConfig.rulePackageCharge.placeholder' :maxLength = '$SearchInputConfig.rulePackageCharge.length' defaultValue = ''></dt-search-input>
                <span class="rule-unit-spec">元</span>
              </div>
            </div>
          </li>

          <li class="rule-detail-wrap"  v-show="ruleTitleCheck3">
            <div class="rule-detail-con">
              <h4>3 新增试用套餐模块</h4>
              <!-- ruleNameThreeSlideRef  ruleNoThreeSlideRef measureUnitThreeSlideRef-->
              <div class="dt-slide-search">
                <!-- 套餐名称 -->
                <dt-search-input :hasSearchTitle = 'true' ref="ruleNameThreeSlideRef" :inputWidth='$SearchInputConfig.rulePackageName.width' :title="$SearchInputConfig.rulePackageName.title" :placeholder ='$SearchInputConfig.rulePackageName.placeholder' :maxLength = '$SearchInputConfig.rulePackageName.length' defaultValue = ''></dt-search-input>
                <!-- 适用用量 -->
                <dt-search-input :hasSearchTitle = 'true' ref="ruleNoThreeSlideRef" :inputWidth='$SearchInputConfig.ruleTryNo.width' :title="$SearchInputConfig.ruleTryNo.title" :placeholder ='$SearchInputConfig.ruleTryNo.placeholder' :maxLength = '$SearchInputConfig.ruleTryNo.length' defaultValue = ''></dt-search-input>
                <!-- 计量单位 -->
                <dt-select-option :hasSelectTitle ='true'  ref='measureUnitThreeSlideRef' :optiosTitle='$ElSelectName.measureUnit.title' :optionsName ='$ElSelectName.measureUnit.name' :conWidth = '$ElSelectName.measureUnit.width'></dt-select-option>
              </div>
            </div>
          </li>

          <li class="rule-detail-wrap">
            <div class="rule-detail-con multiple-rules">
              <h4>4 新增租赁套餐模块</h4>
              <!-- ruleNameFourSlideRef ruleNoFourSlideRef measureUnitFourSlideRef chargeFourSlideRef -->
              <div class="dt-slide-search" v-for="(item, index) in ruleComboArr" :key="index">
                <!-- 套餐名称 -->
                <dt-search-input :hasSearchTitle = 'true' ref="ruleNameFourSlideRef" :inputWidth='$SearchInputConfig.rulePackageName.width' :title="$SearchInputConfig.rulePackageName.title" :placeholder ='$SearchInputConfig.rulePackageName.placeholder' :maxLength = '$SearchInputConfig.rulePackageName.length' defaultValue = ''></dt-search-input>
                <!-- 购买用量 -->
                <dt-search-input :hasSearchTitle = 'true' @inputChange = 'ruleBuyNoFourChangeActive' ref="ruleNoFourSlideRef" :inputWidth='$SearchInputConfig.ruleBuyNo.width' :title="$SearchInputConfig.ruleBuyNo.title" :placeholder ='$SearchInputConfig.ruleBuyNo.placeholder' :maxLength = '$SearchInputConfig.ruleBuyNo.length' defaultValue = ''></dt-search-input>
                <!-- 计量单位 -->
                <dt-select-option  :hasSelectTitle ='true' @selectValueChange = 'measureUnitFourChangeActive' ref="measureUnitFourSlideRef" :optiosTitle='$ElSelectName.measureUnit.title' :optionsName ='$ElSelectName.measureUnit.name' :conWidth = '$ElSelectName.measureUnit.width'></dt-select-option>
                <!-- 套餐费用 -->
                <dt-search-input :hasSearchTitle = 'true' ref="chargeFourSlideRef" :inputWidth='$SearchInputConfig.rulePackageCharge.width' :title="$SearchInputConfig.rulePackageCharge.title" :placeholder ='$SearchInputConfig.rulePackageCharge.placeholder' :maxLength = '$SearchInputConfig.rulePackageCharge.length' defaultValue = ''></dt-search-input>
                <button class="dt-btn" v-if="((ruleComboArr.length - 1) == index)&&ruleComboArr.length>1" @click="deleteModuleActive(index)">删除套餐</button>
              </div>
              <button class="dt-btn dt-btn-cancel" v-show="!(ruleTitleCheck5 || ruleTitleCheck6) || !slideIsTimeFlag&&ruleTitleCheck5" @click="addComboActive">添加套餐</button>
            </div>
            
          </li>

          

          <li class="rule-detail-wrap" v-show="ruleTitleCheck5">
            <div class="rule-detail-con">
              <h4>5 新增超量/有效期规则模块</h4>
              <!-- chagreFlowFiveSlideRef ruleUnitFlowFiveSlideRef moreRuleUnitFiveSlideRef moreChargeFiveSlideRef  measureDayFiveSlideRef -->
              <div class="dt-slide-search" v-show="slideIsTimeFlag">
                <!-- 套餐名称 -->
                <dt-search-input :hasSearchTitle = 'true' disabled ref="unitLimitFiveSlideRef" :inputWidth='$SearchInputConfig.measureUnitLimit.width' :title="$SearchInputConfig.measureUnitLimit.title" placeholder ='限额' :maxLength = '$SearchInputConfig.measureUnitLimit.length' defaultValue = ''></dt-search-input>
                <span class="rule-unit-spec">{{ruleModule4Unit}}</span>
                <!-- 计量单位 -->
                <!-- <dt-select-option :hasSelectTitle ='false'  ref='measureUnitFiveSlideRef' :optiosTitle='$ElSelectName.measureUnit.title' :optionsName ='$ElSelectName.measureUnit.name' :conWidth = '$ElSelectName.measureUnit.width'></dt-select-option> -->
                
                <!-- 元 -->
                <dt-search-input :hasSearchTitle = 'false'  ref="chagreFlowFiveSlideRef" :inputWidth='$SearchInputConfig.ruleChargeOnly.width' :title="$SearchInputConfig.ruleChargeOnly.title" :placeholder ='$SearchInputConfig.ruleChargeOnly.placeholder' :maxLength = '$SearchInputConfig.ruleChargeOnly.length' defaultValue = ''></dt-search-input>
                <span class="rule-unit-spec">元</span>

                <!-- 升 -->
                <dt-search-input :hasSearchTitle = 'false' ref="ruleUnitFlowFiveSlideRef" :inputWidth='$SearchInputConfig.ruleUnitOnly.width' :title="$SearchInputConfig.ruleUnitOnly.title" :placeholder ='$SearchInputConfig.ruleUnitOnly.placeholder' :maxLength = '$SearchInputConfig.ruleUnitOnly.length' defaultValue = ''></dt-search-input>
                <span class="rule-unit-spec">升</span>
              </div>

              <div class="dt-slide-search" v-show="slideIsTimeFlag">
                <span class="rule-unit-spec">超出费用计算：</span>
                <!-- 升 -->
                <dt-search-input :hasSearchTitle = 'false' ref="moreRuleUnitFiveSlideRef" :inputWidth='$SearchInputConfig.ruleUnitOnly.width' :title="$SearchInputConfig.ruleUnitOnly.title" :placeholder ='$SearchInputConfig.ruleUnitOnly.placeholder' :maxLength = '$SearchInputConfig.ruleUnitOnly.length' defaultValue = ''></dt-search-input>
                <span class="rule-unit-spec">升</span>
                <!-- 元 -->
                <dt-search-input :hasSearchTitle = 'false' ref="moreChargeFiveSlideRef" :inputWidth='$SearchInputConfig.ruleChargeOnly.width' :title="$SearchInputConfig.ruleChargeOnly.title" :placeholder ='$SearchInputConfig.ruleChargeOnly.placeholder' :maxLength = '$SearchInputConfig.ruleChargeOnly.length' defaultValue = ''></dt-search-input>
                <span class="rule-unit-spec">元</span>
              </div>

              <div class="dt-slide-search" v-show="!slideIsTimeFlag" v-for="(item, index) in ruleComboArr" :key="index">
                <!-- 计量单位有效期 -->
                <dt-search-input :hasSearchTitle = 'true' ref="measureDayFiveSlideRef" :inputWidth='$SearchInputConfig.measureUnitLimitValidity.width' :title="$SearchInputConfig.measureUnitLimitValidity.title" :placeholder ='$SearchInputConfig.measureUnitLimitValidity.placeholder' :maxLength = '$SearchInputConfig.measureUnitLimitValidity.length' defaultValue = ''></dt-search-input>
                <span class="rule-unit-spec">天</span>
              </div>
            </div>
          </li>

          <li class="rule-detail-wrap"  v-show="ruleTitleCheck6">
            <div class="rule-detail-con">
              <!-- measureMoreSixSlideRef chargeSixSlideRef -->
              <h4>6 新增优惠规则模块</h4>
              <div class="dt-slide-search">
                <!-- 计量单位内满额 -->
                <dt-search-input :hasSearchTitle = 'true' ref="measureMoreSixSlideRef" :inputWidth='$SearchInputConfig.measureUnitMore.width' :title="$SearchInputConfig.measureUnitMore.title" :placeholder ='$SearchInputConfig.measureUnitMore.placeholder' :maxLength = '$SearchInputConfig.measureUnitMore.length' defaultValue = ''></dt-search-input>
                <!-- 计量单位 -->
                <span class="rule-unit-spec">{{ruleModule4Unit}}</span>
                <!-- <dt-select-option :hasSelectTitle ='false'  ref='measureUnitSixSlideRef' :optiosTitle='$ElSelectName.measureUnit.title' :optionsName ='$ElSelectName.measureUnit.name' :conWidth = '$ElSelectName.measureUnit.width'></dt-select-option> -->
              </div>

              <div class="dt-slide-search">
                <span class="rule-unit-spec">超出费用计算：</span>
                <dt-search-input  v-model="ruleModule4Value" disabled :hasSearchTitle = 'false' ref="ruleNumberSixSlideRef" :inputWidth='$SearchInputConfig.ruleNumberOnly.width' :title="$SearchInputConfig.ruleNumberOnly.title" :placeholder ='$SearchInputConfig.ruleNumberOnly.placeholder' :maxLength = '$SearchInputConfig.ruleNumberOnly.length' defaultValue = ''></dt-search-input>
                <!-- 计量单位 -->
                <span class="rule-unit-spec">{{ruleModule4Unit}}</span>
                <!-- <dt-select-option :hasSelectTitle ='false'  ref='measureUnitMoreSixSlideRef' :optiosTitle='$ElSelectName.measureUnit.title' :optionsName ='$ElSelectName.measureUnit.name' :conWidth = '$ElSelectName.measureUnit.width'></dt-select-option> -->
                <!-- 元 -->
                <dt-search-input :hasSearchTitle = 'false' ref="chargeSixSlideRef" :inputWidth='$SearchInputConfig.ruleChargeOnly.width' :title="$SearchInputConfig.ruleChargeOnly.title" :placeholder ='$SearchInputConfig.ruleChargeOnly.placeholder' :maxLength = '$SearchInputConfig.ruleChargeOnly.length' defaultValue = ''></dt-search-input>
                <span class="rule-unit-spec">元</span>
              </div>
            </div>
          </li>
          
          <li class="rule-detail-wrap" v-show="ruleTitleCheck7">
            <div class="rule-detail-con">
              <h4> 7 新增送机规则模块</h4>
              <!-- ruleNumberSevenSlideRef measureUnitSevenSlideRef -->
              <div class="dt-slide-search">
                <span class="rule-unit-spec">赠送条件：</span>
                <dt-search-input :hasSearchTitle = 'false' ref="ruleNumberSevenSlideRef" :inputWidth='$SearchInputConfig.ruleNumberOnly.width' :title="$SearchInputConfig.ruleNumberOnly.title" :placeholder ='$SearchInputConfig.ruleNumberOnly.placeholder' :maxLength = '$SearchInputConfig.ruleNumberOnly.length' defaultValue = ''></dt-search-input>
                <!-- 计量单位 -->
                <dt-select-option :hasSelectTitle ='false'  ref='measureUnitSevenSlideRef' :optiosTitle='$ElSelectName.measureUnit.title' :optionsName ='$ElSelectName.measureUnit.name' :conWidth = '$ElSelectName.measureUnit.width'></dt-select-option>
              </div>
            </div>
          </li>


        </ul>
        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="slideSureActive">保存套餐</button>
          <!-- <button class="dt-btn" @click="defaultChange">预览套餐</button> -->
          <button class="dt-btn dt-btn-cancel" @click="slideSureCancel">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='查看租赁规则' :class="{'slide-page-show': slideShow2}" @hideSlidePage='slideShow2 = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul class="order-ul">
          <!-- 模板名称 -->
          <li class="slide-first-title">
            <span>1新增基础信息模块</span>
          </li>
          <li class="order-li-info order-li-title">
            <label>规则名称</label><label>使用场景</label><label>租赁模式</label>
          </li>
          <li class="order-li-info">
            <label>{{detailLeaseInfo.name ? detailLeaseInfo.name : '--'}}</label><label>{{detailLeaseInfo.scene == 1 ? '商用' : '家庭'}}</label><label>{{detailLeaseInfo.type == 1 ? '时间' : '流量'}}</label>
          </li>

          <li class="order-li-info order-li-title">
            <label>适用产品</label><label>系列</label><label>型号</label>
          </li>
          <li class="order-li-info">
            <label>{{detailLeaseInfo.brand_name ? detailLeaseInfo.brand_name : '--'}}</label><label>{{detailLeaseInfo.series_name ? detailLeaseInfo.series_name : '--'}}</label><label>{{detailLeaseInfo.model_name ? detailLeaseInfo.model_name : '--'}}</label>
          </li>

          <li class="order-li-info order-li-title">
            <label>适用地区</label>
          </li>
          <li class="order-li-info">
            <label>{{detailLeaseInfo.province + detailLeaseInfo.city + detailLeaseInfo.district}}</label>
          </li>

          <!-- 2新增押金规则模块 -->
          <li class="slide-first-title">
            <span>2新增押金规则模块</span>
          </li>
          <li class="order-li-info order-li-title">
            <label>租赁押金</label>
          </li>
          <li class="order-li-info">
            <label>{{detailLeaseInfo.deposit ? detailLeaseInfo.deposit : '--'}} 元</label>
          </li>
          

          <!-- 3试用套餐模块 -->
          <li class="slide-first-title">
            <span>3试用套餐模块</span>
          </li>
          <li class="order-li-info order-li-title">
            <label>套餐名称</label><label>试用用量</label><label>计量单位</label>
          </li>
          <li class="order-li-info">
            <label>{{detailLeaseInfo.trial_name ? detailLeaseInfo.trial_name : '--'}}</label><label>{{detailLeaseInfo.trial_number ? detailLeaseInfo.trial_number : '--'}}</label><label>{{detailLeaseInfo.trial_unit ? detailLeaseInfo.trial_unit : '--'}}</label>
          </li>

            <!-- 4试用套餐模块 -->
            <li class="slide-first-title">
                <span>4租赁套餐模块</span>
            </li>
            <li class="order-li-info order-li-title">
              <label>套餐名称</label><label>购买用量</label><label>套餐费用</label>
            </li>
            <em v-for="(item, index) in detailPackageList" :key="index + '4'">
              <li class="order-li-info">
                <label>{{item.name}}</label><label>{{item.amount}} {{item.unit}}</label><label>{{item.money}}元</label>
              </li>
            </em>

            <!-- 5超量/有效期模块 -->
            <li class="slide-first-title">
                <span>5超量/有效期模块</span>
            </li>
            <li class="order-li-info order-li-title">
              <label>计量单位内限额</label><label>超出费用计算</label>
            </li>
            <em v-for="(item, index) in detailPackageList" :key="index + '5'">
              <li class="order-li-info">
                <label>5年 120元 10升</label><label>20升50元</label>
              </li>
            </em>

            <li class="order-li-info order-li-title">
              <label>计量单位内有效期</label>
            </li>
            <em v-for="(item, index) in [5, 7, 9]" :key="index + '5a'">
              <li class="order-li-info">
                <label>50天</label>
              </li>
            </em>

            <!-- 6超量/有效期模块 -->
            <li class="slide-first-title">
                <span>6优惠规则模块</span>
            </li>
            <li class="order-li-info order-li-title">
              <label>计量单位满额</label><label>超出费用计算</label>
            </li>
            <em v-for="(item, index) in [5, 7, 9]" :key="index + '6'">
              <li class="order-li-info">
                <label>10年</label><label>10年50元</label>
              </li>
            </em>

          <!-- 7增送条件 -->
          <li class="slide-first-title">
            <span>7赠送条件</span>
          </li>
          <li class="order-li-info order-li-title">
            <label>赠送条件</label>
          </li>
          <li class="order-li-info">
            <label>{{detailLeaseInfo.free_number ? detailLeaseInfo.free_number : '--'}}{{detailLeaseInfo.free_unit ? detailLeaseInfo.free_unit : '--'}}</label>
          </li>

        </ul>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig, ElSelectOption } from "../../global/constant.js";
import { topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange],
  data() {
    return {
      SlidePageConfig,
      currentPage: 1,
      pageNumber: 1,
      listArr: [],
      listTotal: 400,
      slideShow: false,
      slideShow2: false,
      isEditSlideFlag: false,
      selectedOptions: [],
      ruleTitleCheck1: true,
      ruleTitleCheck2: false,
      ruleTitleCheck3: false,
      ruleTitleCheck4: true,
      ruleTitleCheck5: false,
      ruleTitleCheck6: false,
      ruleTitleCheck7: false,
      areaSlideDefault: ["440000", "440300", "440305"],
      ruleSlideArea: ["440000", "440300", "440305"],
      ruleComboArr: [0],
      ruleModule4Value: '',
      ruleModule4Unit: '年',
      slideIsTimeFlag: true,
      detailObj: {},
      detailLeaseInfo: {},
      detailPackageList: []
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber
      }
    },
    getMainList(params) {
      this.$http.leaseLeaseList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.listTotal = Number(_msg.total);
      });
    },
    getRuleDetail(id) {
      this.$http.leaseOneLease(id, msg => {
        let _msg = msg.data;
        this.slideShow2 = !this.slideShow2;
        this.detailLeaseInfo = _msg.lease_info;
        this.detailPackageList = _msg.package_list;
      });
    },
    slideAreaChange(value) {
      console.log(41, value);
      this.ruleSlideArea = value.code;
    },
    topAddActive() {
      this.isEditSlideFlag = false;
      this.slideShow = !this.slideShow;
    },
    toCheckDetail(id) {
      this.isEditSlideFlag = true;
      this.getRuleDetail(id);
    },
    toEditAcount() {
      this.isEditSlideFlag = true;
      this.slideShow = !this.slideShow;
    },
    slideSureActive() {
      // ruleNameOneSlideRef || applySceneOneSlideRef  rentModelOneSlideRef
      // selectBrandOneSlideRef  selectSeriesOneSlideRef  selectModelOneSlideRef
      console.log(this.$refs.ruleNameFourSlideRef[0].value);
      let _module1 = {
        'name': this.$refs.ruleNameOneSlideRef.value, // 规则名称
        'scene': this.$refs.applySceneOneSlideRef.value, // 使用场景
        'type': this.$refs.rentModelOneSlideRef.value, // 租赁模式
        'brand_id': this.$refs.selectBrandOneSlideRef.value, // 品牌
        'series_id': this.$refs.selectSeriesOneSlideRef.value, // 系列
        'model_id': this.$refs.selectModelOneSlideRef.value, // 型号
        // 'province_code': this.ruleSlideArea[0], // 省
        // 'city_code': this.ruleSlideArea[1], // 市
        'district_code': this.ruleSlideArea[2] // 区
      };
      // chargeTwoSlideRef
      let _module2 = {
        'deposit': this.$refs.chargeTwoSlideRef.value // 租赁押金
      }
      // ruleNameThreeSlideRef  ruleNoThreeSlideRef measureUnitThreeSlideRef
      let _module3 = {
        'trial_name': this.$refs.ruleNameThreeSlideRef.value, // 套餐名称
        'trial_number': this.$refs.ruleNoThreeSlideRef.value, // 使用用量
        'trial_unit': this.$refs.measureUnitThreeSlideRef.value // 计量单位
      }
      // ruleNumberSevenSlideRef measureUnitSevenSlideRef
      let _module7 = {
        'free_number': this.$refs.ruleNumberSevenSlideRef.value, // 送机条件
        'free_unit': this.$refs.measureUnitSevenSlideRef.value // 条件单位
      };
      let _module4 = [];
      // ruleNameFourSlideRef ruleNoFourSlideRef  chargeFourSlideRef  模块4
      // chagreFlowFiveSlideRef ruleUnitFlowFiveSlideRef moreRuleUnitFiveSlideRef moreChargeFiveSlideRef  measureDayFiveSlideRef  模块4
      if (this.ruleTitleCheck5) {
        if (this.slideIsTimeFlag) { // 时间 1对1
          _module4.push({
            'name': this.$refs.ruleNameFourSlideRef[0].value, // 套餐名称
            'amount': this.$refs.ruleNoFourSlideRef[0].value, // 套餐总量
            'unit': this.$refs.measureUnitFourSlideRef[0].value, // 单位 1 2 3 4 年月日升
            'money': this.$refs.chargeFourSlideRef[0].value, // 单位 1 2 3 4 年月日升
            // 模块5
            'over_pack_money': this.$refs.chagreFlowFiveSlideRef.value, // 单位 1 2 3 4 年月日升
            'over_pack_flow': this.$refs.ruleUnitFlowFiveSlideRef.value, // 单位 1 2 3 4 年月日升
            'over_flow_amount': this.$refs.moreRuleUnitFiveSlideRef.value, // 单位 1 2 3 4 年月日升
            'over_flow_money': this.$refs.moreChargeFiveSlideRef.value // 单位 1 2 3 4 年月日升
          });
        } else {
          this.ruleComboArr.forEach((val, index) => { // 流量  多对多
            _module4.push({
              'name': this.$refs.ruleNameFourSlideRef[0].value, // 套餐名称
              'amount': this.$refs.ruleNoFourSlideRef[0].value, // 套餐总量
              'unit': this.$refs.measureUnitFourSlideRef[0].value, // 单位 1 2 3 4 年月日升
              'money': this.$refs.chargeFourSlideRef[0].value, // 单位 1 2 3 4 年月日升
              // 模块5
              'limit_time': this.$refs.measureDayFiveSlideRef[index].value // 单位 1 2 3 4 年月日升
            });
          })
        }
      } else if (this.ruleTitleCheck6) {
        _module4.push({
          'name': this.$refs.ruleNameFourSlideRef[0].value, // 套餐名称
          'amount': this.$refs.ruleNoFourSlideRef[0].value, // 套餐总量
          'unit': this.$refs.measureUnitFourSlideRef[0].value, // 单位 1 2 3 4 年月日升
          'money': this.$refs.chargeFourSlideRef[0].value, // 单位 1 2 3 4 年月日升
          // 模块5
          'discount_amount': this.$refs.measureMoreSixSlideRef.value, // 优惠条件: 大于等于 amount
          'discount_money': this.$refs.chargeSixSlideRef.value // 优惠之后该套餐的价格 xxx.xx 的格式
        });
      } else {
        this.ruleComboArr.forEach((val, index) => { // 未勾选5/6
          _module4.push({
            'name': this.$refs.ruleNameFourSlideRef[index].value, // 套餐名称
            'amount': this.$refs.ruleNoFourSlideRef[index].value, // 套餐总量
            'unit': this.$refs.measureUnitFourSlideRef[index].value, // 单位 1 2 3 4 年月日升
            'money': this.$refs.chargeFourSlideRef[index].value // 单位 1 2 3 4 年月日升
          });
        })
      };
      let _urlData = _module1;
      if (this.ruleCheckActive2) {
        _urlData = Object.assign(_urlData, _module2);
      };
      if (this.ruleCheckActive3) {
        _urlData = Object.assign(_urlData, _module3);
      };
      if (this.ruleCheckActive7) {
        _urlData = Object.assign(_urlData, _module7);
      };
      _urlData.pack_list = JSON.stringify(_module4);
      // console.log(_module1, _module2, _module3, _module7, _module4);
      this.$http.leaseAddLease(_urlData, msg => {
        this.slideShow = false;
        this.pageNumber = 1;
        this.getMainList(this.getUrlData());
        console.log(msg);
      });
    },
    topDeleteActive(id) {
      this.$projectUtils.ConfirmTip('确定删除？', msg => {
        this.$http.leaseDelLease(id, msg => {
          this.pageNumber = 1;
          this.getMainList(this.getUrlData());
        })
      })
    },
    ruleBuyNoFourChangeActive(value) {
      console.log(value);
      this.$refs.unitLimitFiveSlideRef.value = value;
      this.$refs.ruleNumberSixSlideRef.value = value;
      this.$refs.measureMoreSixSlideRef.value = value;
    },
    deleteModuleActive(index) {
      this.ruleComboArr.splice(index, 1);
    },
    measureUnitFourChangeActive(value) {
      this.ruleModule4Unit = ['年', '月', '日', '升'][Number(value - 1)];
      this.ruleComboArr.forEach((val, index) => {
        this.$refs.measureUnitFourSlideRef[index].value = value;
      })
    },
    changeUnitRef(value) {
      if (Number(value) === 1) {
        this.slideIsTimeFlag = true
      } else {
        this.slideIsTimeFlag = false
      };
      let _time = ElSelectOption.measureUnit;
      let _flow = ElSelectOption.measureUnitFlow;
      // let _refArr = ['measureUnitThreeSlideRef', 'measureUnitFiveSlideRef', 'measureUnitSixSlideRef', 'measureUnitMoreSixSlideRef', 'measureUnitSevenSlideRef'];
      let _refArr = ['measureUnitThreeSlideRef', 'measureUnitSevenSlideRef'];
      _refArr.forEach(val => {
        this.$refs[val].options = Number(value) === 1 ? _time : _flow;
      });
      this.ruleComboArr.forEach((val, index) => {
        this.$refs.measureUnitFourSlideRef[index].options = Number(value) === 1 ? _time : _flow;
      })
    },
    rentModelSelectValueChange(value) {
      this.changeUnitRef(value);
    },
    addComboActive() {
      this.ruleComboArr.push(this.ruleComboArr.length);
      console.log(427, this.ruleComboArr);
    },
    ruleCheckActive2() {
      this.ruleTitleCheck2 = !this.ruleTitleCheck2;
    },
    ruleCheckActive3() {
      this.ruleTitleCheck3 = !this.ruleTitleCheck3;
      if (this.ruleTitleCheck5 || this.ruleTitleCheck6) { this.ruleComboArr = [0]; }
    },
    ruleCheckActive5() {
      if (this.ruleComboArr.length > 1 && this.slideIsTimeFlag) {
        this.$message.warning('租赁套餐模块只有一个时才能勾选5/6模块,请删除多余模块');
        return;
      }
      this.ruleTitleCheck5 = !this.ruleTitleCheck5;
      this.ruleTitleCheck6 = false;
    },
    ruleCheckActive6() {
      if (this.ruleComboArr.length > 1) {
        this.$message.warning('租赁套餐模块只有一个时才能勾选5/6模块,请删除多余模块');
        return;
      }
      this.ruleTitleCheck6 = !this.ruleTitleCheck6;
      this.ruleTitleCheck5 = false;
    },
    ruleCheckActive7() {
      this.ruleTitleCheck7 = !this.ruleTitleCheck7;
    },
    slideSureCancel() {
      this.slideShow = false;
      this.slideShow2 = false;
    }
  },
  watch: {
  },
  components: {
    // dtPagination,
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/constant.style.scss";
.rule-title-wrap {
  padding-right: 60px;
  button{
    margin: 0 20px 20px 0;
    padding: 0 10px;
    position: relative;
    border-color: $color-none-active;
    color: $color-word-main;
    transition: all 0.4s;
    img{
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(50%, 50%);
      display: none;
    }
    &.rule-active{
      border-color: $color-active;
      color: $color-active;
      img{
        display: block;
      }
    }
  }
}
.rule-detail-wrap{
  padding-right: 60px;
}
.rule-detail-con{
  min-height: 120px;
  border: 1px solid $color-none-active;
  padding: 20px;
  h4{
    line-height: 20px;
    margin-bottom: 16px;
  }
  .dt-slide-search{
    height: auto;
    overflow: hidden;
  }
  .rule-unit-spec{
    line-height: 30px;
    height: 30px;
    float: left;
    margin-right: 10px;
  }
  &.multiple-rules{
    .dt-slide-search{
      border-bottom: 1px solid $color-none-active;
      padding-top: 10px;
    }
    .dt-slide-search:nth-last-of-type(1){
      border-bottom: 0;
    }
    // .dt-slide-search:nth-child(odd){
    //   border-top: 1px solid $color-none-active;
    //   padding-top: 10px;
    // }
    .dt-btn{
      height: 30px;
      line-height: 30px;
      background: none;
      color: #FF1767;
    }
  }
}

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
</style>


