<template>
  <div class="userlist-outer">
    <div class="dt-search-top">
      <!-- 区域筛选 -->
      <dt-search-area @areaUpdate='areaChange'></dt-search-area>

      <!-- 手机号码 -->
      <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.moblie.width' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>

      <!-- 设备品牌 -->
     <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.deviceBrand.width' :title="$SearchInputConfig.deviceBrand.title" :placeholder ='$SearchInputConfig.deviceBrand.placeholder' :maxLength = '$SearchInputConfig.deviceBrand.length'  defaultValue = ''></dt-search-input>

      <!-- 设备系列 -->
      <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.deviceSeries.width' :title="$SearchInputConfig.deviceSeries.title" :placeholder ='$SearchInputConfig.deviceSeries.placeholder' :maxLength = '$SearchInputConfig.deviceSeries.length' defaultValue = ''></dt-search-input>

      <!-- 设备型号 -->
      <dt-search-input  ref="telNum" :inputWidth='$SearchInputConfig.deviceModel.width' :title="$SearchInputConfig.deviceModel.title" :placeholder ='$SearchInputConfig.deviceModel.placeholder' :maxLength = '$SearchInputConfig.deviceModel.length' defaultValue = ''></dt-search-input>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn" @click="clickss">查 询</button>
      </div>
    </div>

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="dt-table-check"></th>
                    <th class="tw-user-name">用户姓名</th>
                    <th class="tw-telephone">手机号码</th>
                    <th class="tw-device-brand">设备品牌</th>
                    <th class="tw-device-series">设备系列</th>
                    <th class="tw-device-model">设备型号</th>
                    <th class="tw-province">所在省份</th>
                    <th class="tw-city">所在城市</th>
                    <th class="tw-district">所在地区</th>
                    <th class="tw-address">通讯地址</th>
                    <th class="tw-time-date">注册日期</th>
                    <th class="tw-time-ss">最后活跃</th>
                    <th class="tw-device-terminal">设备终端</th>
                    <th class="tw-device-mac">设备MAC</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in [1,2,3,4,5,6,7,8,9,0]" :key="index">
                  <td class="dt-table-check dt-table-checked"></td>
                  <td>33918115</td>
                  <td>净水器1</td>
                  <td>WiFi</td>
                  <td>零售</td>
                  <td>尚之水</td>
                  <td>WF101</td>
                  <td>-</td>
                  <td>广东</td>
                  <td>深圳</td>
                  <td>宝安</td>
                  <td>2017.07.01</td>
                  <td>在线</td>
                  <td>秦亦新</td>
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
    telNum: '',
    currentPage4: 2
  }),
  components: {
  },
  methods: {
    areaChange(msg) {
      console.log(msg);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    clickss() {
      this.$router.push({ name: 'deviceManage' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

