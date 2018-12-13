<template>
  <div class="push-feedback-outer">
    <div class="dt-search-top">
      <!-- 反馈类型 -->
      <dt-select-option ref='communicteTypeRef' :optiosTitle='$ElSelectName.feedbackType.title' :optionsName ='$ElSelectName.feedbackType.name' :conWidth = '$ElSelectName.feedbackType.width'></dt-select-option>

      <!-- 处理状态 -->
      <dt-select-option ref='communicteTypeRef' :optiosTitle='$ElSelectName.handleStatus.title' :optionsName ='$ElSelectName.handleStatus.name' :conWidth = '$ElSelectName.handleStatus.width'></dt-select-option>

      <!-- 处理方式 -->
      <dt-select-option ref='communicteTypeRef' :optiosTitle='$ElSelectName.handleWay.title' :optionsName ='$ElSelectName.handleWay.name' :conWidth = '$ElSelectName.handleWay.width'></dt-select-option>

      <!-- 反馈来源 -->
      <dt-select-option ref='communicteTypeRef' :optiosTitle='$ElSelectName.feedbackFrom.title' :optionsName ='$ElSelectName.feedbackFrom.name' :conWidth = '$ElSelectName.feedbackFrom.width'></dt-select-option>

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
                    <th class="tw-user-name">客户名称</th>
                    <th class="tw-telephone">联系电话</th>
                    <th class="tw-address">通讯地址</th>
                    <th class="tw-feedback-type">反馈类型</th>
                    <th class="tw-feedback-handle-status">处理状态</th>
                    <th class="tw-feedback-title">标题</th>
                    <th class="tw-feedback-con">内容</th>
                    <th class="tw-time-date">反馈时间</th>
                    <th class="tw-handle-edit">操作</th>
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
                  <td>-</td>
                  <td>广东</td>
                  <td>深圳</td>
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
      console.log(5454)
      this.$router.push({ path: 'push/push', params: { sure: '1' } })
    },
    checkDetail() {
      // this.$router.push({ name: 'pushFeedbackDetail', params: { detail: 'detail' } })
      this.$router.push({ name: 'pushFeedbackDeal', params: { deal: 'deal' } })
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>

</style>

