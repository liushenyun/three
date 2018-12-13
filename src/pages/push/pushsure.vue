<template>
  <div class="push-push-outer">

    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn" @click='add'>确认推送</button>
      </div>
    </div>

    <!-- 表格 -->
    <div class="dt-table-outer">
      <table class="dt-table-same" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="dt-table-check">
              <i></i>
            </th>
            <th>滤芯ID</th>
            <th>导入日期</th>
            <th>使用状态</th>
            <th>使用设备ID</th>
            <th>设备品牌</th>
            <th>设备系列</th>
            <th>开始使用时间</th>
            <th>用户姓名</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in [1,2,3,4,5,6,7,8,9,0]" :key="index">
            <td class="dt-table-check">
              <i></i>
            </td>
            <td>崔希敏</td>
            <td>2017.07.01</td>
            <td>已使用</td>
            <td>WF101</td>
            <td>尚之水</td>
            <td>-</td>
            <td>2017.07.01</td>
            <td>杨鹏举</td>
          </tr>
        </tbody>
      </table>
      <div class="dt-page-wrap">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="10" layout="total, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    currentPage4: 2
  }),
  methods: {
    areaChange(msg) {
      console.log(msg);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    add() {
      console.log('确认推送')
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>

</style>

