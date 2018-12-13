<template>
  <div id="filterManage">
    <div class="dt-search-top">
      <!-- 版本号： -->
      <!-- <dt-search-input  ref="versionNoSearchRef" :inputWidth='$SearchInputConfig.versionNo.width' :title="$SearchInputConfig.versionNo.title" :placeholder ='$SearchInputConfig.versionNo.placeholder' :maxLength = '$SearchInputConfig.versionNo.length'  defaultValue = ''></dt-search-input> -->

      <!-- 版本说明： -->
      <dt-search-input  ref="dessciptionSearchRef" :inputWidth='$SearchInputConfig.versionDescription.width' :title="$SearchInputConfig.versionDescription.title" :placeholder ='$SearchInputConfig.versionDescription.placeholder' :maxLength = '$SearchInputConfig.versionDescription.length'  defaultValue = ''></dt-search-input>

       <!-- 选择文件 -->
      <div class="dt-search-cell">
        <a href="javascript:;" class="dt-upload-file">
            <i id="filter-file1-name">
              {{fileName}}
            </i>
            <span>选择</span>
            <input type="file" accept=".bin" placeholder="请选择你 .bin 文件" @change="inputChangeActive" name="" id="filter-file-version">
        </a>
      </div>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-upload" @click="topUPloadActive">开始上传</button>
      </div>
    </div>

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="tw-version-name">固件版本名称</th>
                    <th class="tw-version-type">固件版本类型</th>
                    <th class="tw-device-brand">品牌</th>
                    <th class="tw-device-type">系列</th>
                    <th class="tw-device-model">型号</th>
                    <th class="tw-device-model">模块型号</th>
                    <th class="tw-version-no">上传版本号</th>
                    <th class="tw-user-name">操作人</th>
                    <th class="tw-handle-account">操作账号</th>
                    <th class="tw-time-ss">上传日期</th>
                    <th class="tw-handle-edit">更多</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                  <td>{{item.name}}</td>
                  <td>{{item.type}}</td>
                  <td>{{item.brand_name}}</td>
                  <td>{{item.series_name}}</td>
                  <td>{{item.model_name}}</td>
                  <td>{{item.module_model}}</td>
                  <td>{{item.version}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.username}}</td>
                  <td>{{item.ctime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td class="dt-table-edit"><b @click="tableEditActive(item)">查看</b></td>
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

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='版本详细' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul class="order-ul">
          <!-- 模板名称 -->
          <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>本版本</h6>
              <div class="od-con">
                <p>
                  <b>版本名称：{{upgradeDetailInfo.name}}</b>
                  <b>版本说明：{{upgradeDetailInfo.description}}</b>
                </p>
              </div>
            </div>
          </li>

          <!-- <li class="order-show-li">
            <div class="order-show-wrap">
              <h6>历史版本</h6>
              <div class="od-con od-con-record">
                <p v-for="(item, index) in 10" :key="index">
                  <b>版本号：5454</b>
                  <b>版本说明：说明
                  </b>
                </p>
                <div class="no-data-tip" v-show="!versionListArr.length">暂无数据</div>
              </div>
            </div>
          </li> -->
        </ul>
      </dt-slide-page>
      <!-- 侧滑 end -->
      
  </div>
</template>

<script>
import { SlidePageConfig } from "../../global/constant.js"
import { dtSlidePage } from '../../global/searchComponents';
import { paginationChangeActive } from "../../global/mixin.js";
export default {
  mixins: [paginationChangeActive],
  data() {
    return {
      slideShow: false,
      SlidePageConfig,
      currentPage: 1,
      pageNumber: 1,
      fileName: '请选择你 .bin 文件',
      listArr: [],
      listTotal: 0,
      ossParams: {
        accessid: '',
        callback: '',
        dir: '',
        expire: '',
        host: '',
        policy: '',
        signature: '',
        addminId: ''
      },
      upgradeDetailInfo: {
      },
      versionListArr: []
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getMainList(params) {
      this.$http.FirmwareLists(params.page, msg => {
        let _msg = msg.data;
        this.listArr = _msg.list;
        this.currentPage = this.pageNumber;
        this.listTotal = Number(_msg.total);
      });
    },
    topUPloadActive() {
      let _soundFile = document.getElementById("filter-file-version").files[0];
      // let _version = this.$refs.versionNoSearchRef.value;
      let _description = this.$refs.dessciptionSearchRef.value;
      // if (!_version) { this.$message.warning('版本号为必选参数'); return };
      if (!_description) { this.$message.warning('版本说明为必选参数'); return };
      if (!_soundFile) {
        this.$message({
          showClose: true,
          message: '请选择文件',
          type: 'error'
        });
        return;
      }
      this.getOssParams();
    },
    inputChangeActive(e) {
      this.fileName = e.target.files[0].name;
    },
    tableEditActive(item) {
      this.slideShow = true;
      this.getUpgradeDetail(item.id);
    },
    // 组件内的功能函数
    getUrlData() {
      return { 'page': this.pageNumber }
    },
    getUpgradeDetail(id) {
      this.$http.FirmwareDetail(id, msg => {
        this.upgradeDetailInfo = Object.assign({}, msg.data)
      })
    },
    getOssParams() {
      this.$http.OssUploadGetPostObjectParams(msg => {
        let _res = msg.res;
        this.ossParams = Object.assign({}, _res);
        this.toUploadActive()
      })
    },
    toUploadActive() {
      let vm = this;
      let _OssParams = this.ossParams;
      let _versionObj = {
        // version: this.$refs.versionNoSearchRef.value,
        description: this.$refs.dessciptionSearchRef.value,
        account_id: localStorage.getItem('Three-Apply_Id')
      };
      let soundFile = document.getElementById("filter-file-version").files[0];
      let uploadData = new FormData();
      uploadData.append('OSSAccessKeyId', _OssParams.accessid);
      uploadData.append('policy', _OssParams.policy);
      uploadData.append('signature', _OssParams.signature);
      uploadData.append('callback', _OssParams.callback);
      uploadData.append('success_action_status:', '200');
      // eslint-disable-next-line
      uploadData.append('key', _OssParams.dir + '${filename}');
      uploadData.append('x:account_id', _versionObj.account_id);
      // uploadData.append('x:version', _versionObj.version);
      uploadData.append('x:description', _versionObj.description);
      uploadData.append('x:type', 1);
      uploadData.append('file', soundFile);
      let _url = _OssParams.host
      var oReq = new XMLHttpRequest();
      setTimeout(() => {
        oReq.open("POST", _url);
        oReq.send(uploadData);
        vm.$store.dispatch('showLoading', true)
      }, 500);
      oReq.onreadystatechange = function(e) {
        if (oReq.readyState === 4) {
          vm.$store.dispatch('showLoading', false);
          if (oReq.status === 200) {
            let _response = JSON.parse(oReq.response);
            if (_response.errcode === 0) {
              vm.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
              });
              setTimeout(() => {
                vm.pageNumber = 1;
                vm.$refs.dessciptionSearchRef.value = '';
                vm.fileName = '请选择你 .bin 文件';
                vm.getMainList(vm.getUrlData());
              }, 1400);
            } else {
              vm.$message({
                showClose: true,
                message: _response.errmsg,
                type: 'error'
              });
            }
          } else {
            vm.$message({
              showClose: true,
              message: '上传失败,请检查是否选择了文件或网络等问题',
              type: 'error'
            });
          }
        }
      };
    }
  },
  components: {
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/constant.style.scss';
.order-ul{
  width: 500px;
}
.order-show-li{
  .order-show-wrap{
    min-height: 170px;
    border: 1px solid #DDDDDD;
    h6{
      padding-left: 16px;
      height: 40px;
      line-height: 40px; 
    }
    .od-con{
      padding: 8px 16px;
      border-top: 1px solid #DDDDDD;
      height: 130px;
      line-height: 20px;
      overflow-y: auto;
      p{
        min-height: 50;
        margin-top: 8px;
        padding: 4px 0;
        b{
          display: block;
        }
        b:nth-of-type(1){
          height: 20px;
          line-height: 20px;
        }
        b:nth-of-type(2){
          font-size: $size-one;
          height: 18px;
          line-height: 18px;
          color: #999;
        }
      }
    }
    .od-con.od-con-record{
      height: 320px;
      p{
        border-bottom: 1px solid #DDDDDD;
      }
    }
  }
}
</style>

