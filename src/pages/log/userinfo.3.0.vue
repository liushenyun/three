<template>
  <div calss="log-userinfo-outer">
    <div class="dt-search-top">
      <!-- 操作日期 dtDateRange -->
      <dt-date-range title="操作时间"></dt-date-range>
      <!-- 操作类型 -->
      <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.handleType.width' :title="$SearchInputConfig.handleType.title" :placeholder ='$SearchInputConfig.handleType.placeholder' :maxLength = '$SearchInputConfig.handleType.length'  defaultValue = ''></dt-search-input>
      <!-- 操作人 -->
      <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.handlePerson.width' :title="$SearchInputConfig.handlePerson.title" :placeholder ='$SearchInputConfig.handlePerson.placeholder' :maxLength = '$SearchInputConfig.handlePerson.length'  defaultValue = ''></dt-search-input>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn">查 询</button>
      </div>
    </div>
    
    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th>操作模块</th>
                    <th>操作类型</th>
                    <th>操作帐号</th>
                    <th>操作人员</th>
                    <th>操作时间</th>
                    <th>操作IP</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in [1,2,3,4,5,6,7,8,9,0]" :key="index">
                  <td>33918115</td>
                  <td>净水器1</td>
                  <td>WiFi</td>
                  <td>零售</td>
                  <td>尚之水</td>
                  <td>WF101</td>
                </tr>
              </tbody>
          </table>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset"  :page-size="10"  @current-change="handleCurrentChange" :current-page="currentPage4" layout="total, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

  </div>
</template>

<script>
import { dtDateRange } from '../../global/searchComponents';
export default {
  data: () => ({
    currentPage4: 2
  }),
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    areaChange(value) {
      console.log(41, value);
    }
  },
  components: {
    dtDateRange
  }
}
</script>
