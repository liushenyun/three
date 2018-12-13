<template>
  <div id="filterManage">

    <div class="export-wrap">
      <a href="javascript:;" class="dt-upload-file">
        <i id="filter-file1-name">进销存文件选择</i>
        <span>浏览</span>
        <input type="file" name="" id="filter-file1">
      </a>

      <a class="dt-download-file" href="public/file/import_filter.xls">下载进销存模板</a>
      <button type="button" class="dt-btn">导出</button>
    </div>

    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn">查 询</button>
        <button type="button" class="dt-btn">添 加</button>
        <button type="button" class="dt-btn">编 辑</button>
        <button type="button" class="dt-btn" style="background:#E65545;">删 除</button>
      </div>
    </div>

    <!-- 表格 -->
    <div class="dt-table-outer">
      <table class="dt-table-same" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>产品编号</th>
            <th>供货商名称</th>
            <th>产品</th>
            <th>产品数量</th>
            <th>单价</th>
            <th>总价</th>
            <th>产品状态</th>
            <th>操作时间</th>
            <th>操作账号</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in [1,2,3,4,5,6,7,8,9,0]" :key="index">
            <td>511</td>
            <td>Blake Chavez</td>
            <td>North Ferne</td>
            <td>90</td>
            <td>298</td>
            <td>16067</td>
            <td>现存</td>
            <td>2017.07.01</td>
            <td>159-1293-7857</td>
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
    telNum: '',
    currentPage4: 2,
    idValue: '4545'
  }),
  components: {
  },
  methods: {
    areaChange(msg) {
      console.log(msg);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.export-wrap {
  height: 36px; // background: red;
  margin-bottom: 20px;
  .dt-btn {
    vertical-align: top;
    float: right;
    margin-right: 30px;
  }
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

