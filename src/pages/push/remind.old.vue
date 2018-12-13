<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <!-- 通知状态 -->
      <dt-select-option ref='deviceStatusRef' :optiosTitle='$ElSelectName.informStatus.title' :optionsName ='$ElSelectName.informStatus.name' :conWidth = '$ElSelectName.informStatus.width'></dt-select-option>

      <!-- 滤芯状态 -->
      <dt-select-option ref='deviceStatusRef' :optiosTitle='$ElSelectName.filterStatus.title' :optionsName ='$ElSelectName.filterStatus.name' :conWidth = '$ElSelectName.filterStatus.width'></dt-select-option>

      <!-- 通知类型 -->
      <dt-select-option ref='deviceStatusRef' :optiosTitle='$ElSelectName.informType.title' :optionsName ='$ElSelectName.informType.name' :conWidth = '$ElSelectName.informType.width'></dt-select-option>

      <!-- 设备类型 -->
      <dt-select-option ref='deviceStatusRef' :optiosTitle='$ElSelectName.deviceType.title' :optionsName ='$ElSelectName.deviceType.name' :conWidth = '$ElSelectName.deviceType.width'></dt-select-option>

      <!-- 区域筛选 -->
      <dt-search-area @areaUpdate='areaChange'></dt-search-area>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search">查 询</button>
      </div>
    </div>
    <div class="dt-search-top">
      <!-- 模板选择 -->
      <dt-select-option-dynamic ref='communicteTypeRef' :optiosTitle='$ElSelectName.useStatus.title' :optionsData ='templateDatault' :conWidth = '$ElSelectName.useStatus.width'></dt-select-option-dynamic>

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
                    <th class="dt-table-check"></th>
                    <th class="tw-device-id">设备ID</th>
                    <th class="tw-filter-status">滤芯状态</th>
                    <th class="tw-inform-status">通知状态</th>
                    <th class="tw-inform-type">通知类型</th>
                    <th class="tw-inform-type">最近通知</th>
                    <th class="tw-device-type">设备类型</th>
                    <th class="tw-device-brand">设备品牌</th>
                    <th class="tw-device-model">设备型号</th>
                    <th class="tw-device-series">设备系列</th>
                    <th class="tw-province">所在省份</th>
                    <th class="tw-city">所在城市</th>
                    <th class="tw-district">所在地区</th>
                    <th class="tw-user-name">用户姓名</th>
                    <th class="tw-telephone">手机号码</th>
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
                  <td>正常</td>
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
import { dtSelectOptionDynamic } from '../../global/searchComponents';
export default {
  data: () => ({
    templateDatault: [
      {
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '模板1'
      }, {
        value: '选项3',
        label: '模板2'
      }
    ],
    currentPage4: 3
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
    },
    toNotice() {
      this.templateDatault = [
        {
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '模板1'
        }, {
          value: '选项3',
          label: '模板2'
        }, {
          value: '选项3',
          label: '模板3'
        }
      ]
    }
  },
  components: {
    dtSelectOptionDynamic
  }
}
</script>

<style lang="scss" scoped>

</style>

