<template>
  <div id="filterManage">

    <div class="export-wrap">
      <a href="javascript:;" class="dt-upload-file">
        <i id="filter-file1-name">{{fileName}}</i>
        <span>浏览</span>
        <input type="file" name="myfile" id="filter-file1" accept=".xlsx, .xls" v-on:change = 'inputChangeActive($event)'>
      </a>
      <a class="dt-download-file" href="/public/file/import_filter.xls">下载滤芯批次模板</a>
    </div>

    <div class="dt-search-top">
      <!-- 使用状态 -->
      <dt-select-option ref='useStatusSearchRef' :optiosTitle='$ElSelectName.useStatus.title' :optionsName ='$ElSelectName.useStatus.name' :conWidth = '$ElSelectName.useStatus.width'></dt-select-option>

      <!-- 滤芯ID： -->
      <dt-search-input  ref="filterIdSearchRef" :inputWidth='$SearchInputConfig.filterId.width' :title="$SearchInputConfig.filterId.title" :placeholder ='$SearchInputConfig.filterId.placeholder' :maxLength = '$SearchInputConfig.filterId.length'  defaultValue = ''></dt-search-input>

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
                    <th class="tw-filter-id">滤芯ID</th>
                    <th class="tw-time-date">导入日期</th>
                    <th class="tw-use-status">使用状态</th>
                    <th class="tw-device-id">设备ID</th>
                    <th class="tw-device-brand">设备品牌</th>
                    <th class="tw-device-type">设备类型</th>
                    <th class="tw-device-model">设备型号</th>
                    <th class="tw-time-ss">开始使用时间</th>
                    <th class="tw-user-name">用户姓名</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.serial_no}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.state == 0 ? '未使用': '已使用'}}</td>
                  <td>{{item.device_id}}</td>
                  <td>{{item.brand}}</td>
                  <td>{{item.series}}</td>
                  <td>{{item.model}}</td>
                  <td>{{item.utime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.username}}</td>
                </tr>
              </tbody>
          </table>
          <div class="no-data-tip" v-show="!listArr.length">暂无数据</div>
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
import { topSearchActive, paginationChangeActive } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive],
  data() {
    return {
      currentPage: 1,
      pageNumber: 1,
      fileName: '请选择你要上传的文件',
      listArr: [],
      listTotal: 0
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getMainList(params) {
      this.$http.FilterGetFilterList(params, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.listTotal = Number(_msg.total);
      });
    },
    inputChangeActive(e) {
      this.fileName = e.target.files[0].name;
      this.$http.UploadifyUploadFile(e.target.files[0], msg => {
        this.$http.FilterImportFilter(msg.filename, msg1 => {
          this.pageNumber = 1;
          this.getMainList(this.getUrlData());
        });
      })
    },
    // 组件内的功能函数
    getUrlData() { // 获取列表方法
      return {
        'page': this.pageNumber,
        'state': this.$refs.useStatusSearchRef.value,
        'id': this.$refs.filterIdSearchRef.value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.export-wrap {
  height: 36px; // background: red;
  margin-bottom: 20px;
}

.export-wrap .dt-download-file {
  float: right;
  height: 36px;
  line-height: 36px;
}

.export-wrap .dt-upload-file {
  height: 36px;
  line-height: 36px;
}
</style>

