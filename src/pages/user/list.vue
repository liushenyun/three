<template>
  <div class="userlist-outer">
    <div class="dt-search-top">
      <!-- 区域筛选 -->
      <dt-search-area @areaUpdate='topAreaChange'></dt-search-area>

      <!-- 手机号码 -->
      <dt-search-input  ref="telSearchRef" :inputWidth='$SearchInputConfig.moblie.width' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
      </div>
    </div>

    <!-- 导出 -->
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-export" @click="topExportActive">导 出</button>
      </div>
    </div>

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="dt-table-check" :class="{'dt-table-checked': allItemChecked}" @click="checkAllItemActive(allItemChecked)"></th>
                    <th class="tw-user-name">用户姓名</th>
                    <th class="tw-telephone">手机号码</th>
                    <th class="tw-province">所在省份</th>
                    <th class="tw-city">所在城市</th>
                    <th class="tw-district">所在地区</th>
                    <th class="tw-address">通讯地址</th>
                    <th class="tw-time-ss">注册日期</th>
                    <th class="tw-time-ss">最后活跃</th>
                    <th class="tw-device-terminal">设备终端</th>
                    <th class="tw-handle-edit">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>
                  <td>{{item.nickname||item.realname}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.district}}</td>
                  <td>{{item.address}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd')}}</td>
                  <td>{{item.atime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>微信</td>
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
      <dt-slide-page slideTitle='用户设备' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul class="order-ul">
         <li v-for="(item, index) in userMacListArr" :key="index"><label>{{item.device_name}}：</label><label>{{item.mac}}</label></li>
         <li class="no-data-tip" v-show="!userMacListArr.length">
           暂无数据
         </li>
        </ul>
      </dt-slide-page>
      <!-- 侧滑 end -->


  </div>
</template>

<script>
import { dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js";
import { paginationChangeActive, checkAllItemActive, checkItemActive, topSearchActive } from '../../global/mixin.js'
export default {
  mixins: [paginationChangeActive, checkAllItemActive, checkItemActive, topSearchActive],
  data() {
    return {
      SlidePageConfig,
      listArr: [],
      listTotal: 0,
      allItemChecked: false,
      searchAreaData: [0, 0, 0],
      currentPage: 1,
      slideShow: false,
      userMacListArr: []
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber,
        'province_code': this.searchAreaData[0],
        'city_code': this.searchAreaData[1],
        'district_code': this.searchAreaData[2],
        'mobile': this.$refs.telSearchRef.value
      }
    },
    getMainList(params) {
      this.$http.UserUsers(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    },
    topAreaChange(value) {
      let _valueCode = value.code;
      let _pCode = _valueCode[0] ? ((_valueCode[0] === 'all') ? '0' : (_valueCode[0])) : '0';
      let _cCode = _valueCode[1] ? ((_valueCode[1] === 'all') ? '0' : (_valueCode[1])) : '0';
      let _dCode = _valueCode[2] ? ((_valueCode[2] === 'all') ? '0' : (_valueCode[2])) : '0';
      this.searchAreaData[0] = _pCode;
      this.searchAreaData[1] = _cCode;
      this.searchAreaData[2] = _dCode;
    },
    topExportActive() {
      this.$projectUtils.ConfirmTip('确定导出用户列表？', msg => {
        let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'uid');
        if (_idArr.length) {
          this.$http.UserRxportUsers(_idArr.join(','), msg => {
            window.location.href = msg.file;
          })
        } else {
          this.$message.warning('请选择需要导出的设备');
        }
      })
    },
    toLookDetailActive(item) {
      this.slideShow = true;
      this.getUserMac(item.uid);
    },
    // 组件内的功能函数
    getUserMac(uid) {
      this.$http.UserUserDevices(uid, msg => {
        this.userMacListArr = msg.data;
      })
    }
  },
  components: {
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>

</style>

