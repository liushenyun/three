<template>
  <div class="upgrade-create-outer">
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn">查 询</button>
      </div>

    </div>
    <!-- 表格 -->
    <div class="dt-table-outer">
      <table class="dt-table-same" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>设备ID</th>
            <th>设备名称</th>
            <th>通讯方式</th>
            <th>设备类型</th>
            <th>设备品牌</th>
            <th>设备型号</th>
            <th>设备系列</th>
            <th>所在省份</th>
            <th>所在城市</th>
            <th>所在地区</th>
            <th>激活日期</th>
            <th>设备状态</th>
            <th>网络状态</th>
            <th>用户姓名</th>
            <th>手机号码</th>
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
            <td>宝安</td>
            <td>2017.07.01</td>
            <td>正常</td>
            <td>在线</td>
            <td>秦亦新</td>
            <td>136-3957-2345</td>
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
import { regionDataPlus } from 'element-china-area-data';
export default {
  data() {
    return {
      currentPage4: 1,
      optionss: regionDataPlus,
      selectedOptions: [],
      statusDefauleValue: '',
      comModeDefauleValue: '',
      deviceTypeDefauleValue: '',
      netDefaultVaule: '',
      telNum: '',
      macVaue: ''
    }
  },
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
  }
}
</script>

<style lang="scss" scoped>
.dt-search-cell {
  .dt-btn {
    height: 30px;
    line-height: 30px;
  }
}
</style>

