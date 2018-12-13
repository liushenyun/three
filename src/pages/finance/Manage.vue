<template>
  <div class="finance-manage-outer">
    <div class="dt-search-top">
      <!-- 时间选择 -->
      <dt-select-option ref='financeTimeSearchRef' :optiosTitle='$ElSelectName.financeTime.title' :optionsName ='$ElSelectName.financeTime.name' :conWidth = '$ElSelectName.financeTime.width'></dt-select-option>

      <!-- 收支类型 -->
      <dt-select-option ref='financeTypeSearchRef' :optiosTitle='$ElSelectName.financeType.title' :optionsName ='$ElSelectName.financeType.name' :conWidth = '$ElSelectName.financeType.width'></dt-select-option>

      <!-- 操作时间 -->
      <dt-date-range title='时间选择' @startDateChange='startDateSearchChange' @endDateChange='endDateSearchChange'></dt-date-range>
    </div>

    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
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
                    <th>交易流水账号</th>
                    <th>商户订单号</th>
                    <th>交易金额</th>
                    <th>交易方式</th>
                    <th>商品支出说明</th>
                    <th>交易时间</th>
                    <th>收支类型</th>
                    <th>创建时间</th>
                    <th>交易状态</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>
                  <td>{{item.trade_code}}</td>
                  <td>{{item.order_code}}</td>
                  <td>{{item.fee}}</td>
                  <td>{{item.pay_type|FilterAccountType}}</td>
                  <td>{{item.description}}</td>
                  <td>{{item.pay_time}}</td>
                  <td>{{item.type == 1?'收入':'支出'}}</td>
                  <td>{{item.create_time*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
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
import { dtDateRange } from '../../global/searchComponents';
// import dateFormat from "../../utils/dateFormat";
import { topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, dateSearchChange } from '../../global/mixin.js'
export default {
  mixins: [topSearchActive, paginationChangeActive, checkAllItemActive, checkItemActive, dateSearchChange],
  data() {
    return {
      currentPage: 1,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      allItemChecked: false,
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
      this.$http.financeIndex(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        // this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      });
    },
    // 组件内使用的功能函数
    getUrlData() {
      return {
        'page': this.pageNumber,
        'type': this.$refs.financeTimeSearchRef.value,
        'balance_type': this.$refs.financeTypeSearchRef.value,
        'endtime': this.searchDate.end,
        'starttime': this.searchDate.start
      }
    },
    topExportActive() {
      this.$projectUtils.ConfirmTip('确定导出财务列表？', msg => {
        let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr, 'id');
        if (_idArr.length) {
          this.$http.financeExportData(_idArr.join(','), msg => {
            window.location.href = msg.file;
          })
        } else {
          this.$message.warning('请选择需要导出财务列表');
        }
      })
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

