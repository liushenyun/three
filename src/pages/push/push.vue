<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <!-- 手机号码 -->
      <dt-search-input  ref="telSearchRef" :inputWidth='$SearchInputConfig.moblie.width' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>

      <!-- 地区 -->
      <dt-search-area @areaUpdate='topAreaChange'></dt-search-area>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
      </div>
    </div>
    <div class="dt-search-top">
      <!-- 模板选择 -->
      <dt-select-option-dynamic ref='templateSearchRef' :optiosTitle='$ElSelectName.choiceTemplate.title' :optionsData ='templateDatault' :conWidth = '$ElSelectName.choiceTemplate.width'></dt-select-option-dynamic>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn" @click="toNotice">一键通知</button>
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
                    <th class="tw-time-date">注册日期</th>
                    <th class="tw-time-date">最后活跃</th>
                    <th class="tw-device-terminal">设备终端</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>
                  <td>{{item.realname}}</td>
                  <td>{{item.contact}}</td>
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.district}}</td>
                  <td>{{item.address}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd')}}</td>
                  <td>{{item.atime*1000|DateFormat('yyyy-MM-dd')}}</td>
                  <td>微信</td>
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
import { dtSelectOptionDynamic } from '../../global/searchComponents';
import { topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, topAreaChange],
  data() {
    return {
      currentPage: 1,
      prePage: 1,
      slideShow: false,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      allItemChecked: false,
      searchAreaData: [0, 0, 0],
      templateDatault: [
        {
          value: '',
          label: ''
        }
      ]
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
    this.getTemplateList();
  },
  methods: {
    getMainList(params) {
      this.$http.UserMsgGetUserList(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    },
    toNotice() {
      let _templateId = this.$refs.templateSearchRef.value;
      let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'uid');
      this.$http.UserMsgSendMsgs(_templateId, _idArr, msg => {
        this.$refs.templateSearchRef.value = '';
      });
    },
    // 组件内的功能函数
    getUrlData() { // 获取列表方法
      return {
        'page': this.pageNumber,
        'contact': this.$refs.telSearchRef.value,
        'province_code': this.searchAreaData[0],
        'city_code': this.searchAreaData[1],
        'district_code': this.searchAreaData[2]
      }
    },
    getTemplateList() {
      this.$http.msgTemplateGetAll({ 'page': '0' }, msg => {
        let _list = msg.data;
        let _templateArr = [];
        _list.forEach(val => {
          _templateArr.push({
            value: val.id,
            label: val.name
          })
        });
        this.templateDatault = _templateArr;
      })
    }
  },
  components: {
    dtSelectOptionDynamic
  }
}
</script>

<style lang="scss" scoped>

</style>

