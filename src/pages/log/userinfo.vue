<template>
  <div class="push-record">
    <div class="dt-search-top">
      <!-- 登录时间 -->
      <dt-date-range title='登录时间' @startDateChange='startDateSearchChange' @endDateChange='endDateSearchChange'></dt-date-range>

      <!-- 登录账号 -->
      <dt-search-input  ref="loginAccountRef" :inputWidth='$SearchInputConfig.loginAccount.width' :title="$SearchInputConfig.loginAccount.title" :placeholder ='$SearchInputConfig.loginAccount.placeholder' :maxLength = '$SearchInputConfig.loginAccount.length' defaultValue = ''></dt-search-input>

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
                    <th>登录账号</th>
                    <th>联系人</th>
                    <th>联系人电话</th>
                    <th>登录时间</th>
                    <th>登录地区</th>
                    <th>登录ip</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.username}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.province + item.city}}</td>
                  <td>{{item.ip}}</td>
                </tr>
              </tbody>
          </table>
          <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset" :page-size="10"  @current-change="paginationChangeActive" :current-page="currentPage" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

  </div>
</template>

<script>
import { dtDateRange } from '../../global/searchComponents';
// import dateFormat from "../../utils/dateFormat";
import { topSearchActive, paginationChangeActive, dateSearchChange } from '../../global/mixin.js'
export default {
  mixins: [topSearchActive, paginationChangeActive, dateSearchChange],
  data() {
    return {
      currentPage: 1,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      searchDate: {
        start: '',
        end: ''
      }
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getMainList(params) {
      this.$http.LoginLogGetLoginLog(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      });
    },
    // 组件内使用的功能函数
    getUrlData() {
      return {
        'page': this.pageNumber,
        'username': this.$refs.loginAccountRef.value,
        'endtime': this.searchDate.end,
        'starttime': this.searchDate.start
      }
    }
  },
  components: {
    dtDateRange
  }
}
</script>

<style lang="scss" scoped>
.dt-search-con .el-date-editor.el-input {
  width: 100%;
}
</style>

