<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <!-- 账号 -->
      <dt-search-input  ref="userNameSearchRef" :inputWidth='$SearchInputConfig.accountSingle.width' :title="$SearchInputConfig.accountSingle.title" :placeholder ='$SearchInputConfig.accountSingle.placeholder' :maxLength = '$SearchInputConfig.accountSingle.length' defaultValue = ''></dt-search-input>

      <!-- 姓名 -->
      <dt-search-input  ref="fullNameSearchRef" :inputWidth='$SearchInputConfig.nameSingle.width' :title="$SearchInputConfig.nameSingle.title" :placeholder ='$SearchInputConfig.nameSingle.placeholder' :maxLength = '$SearchInputConfig.nameSingle.length' defaultValue = ''></dt-search-input>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
      </div>
    </div>
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-add"  @click="topAddActive">新 增</button>
        <button type="button" class="dt-btn dt-btn-delete" @click="topDeleteActive">删 除</button>
      </div>
    </div>

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th class="dt-table-check" :class="{'dt-table-checked': allItemChecked}" @click="checkAllItemActive(allItemChecked)"></th>
                    <th class="tw-handle-account">账号</th>
                    <th class="tw-user-name">姓名</th>
                    <th class="tw-telephone">手机号码</th>
                    <th class="tw-agent-grade">代理商级别</th>
                    <th class="tw-staff-position">职务</th>
                    <th class="tw-company-name">公司名称</th>
                    <th class="tw-use-status">账号状态</th>
                    <th class="tw-time-ss">最近登录时间</th>
                    <th class="tw-address">联系地址</th>
                    <th class="tw-handle-edit2">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in listArr" :key="index">
                   <td class="dt-table-check" :class="{'dt-table-checked': item.checked}" @click="checkItemActive(item)"></td>
                  <td>{{item.username}}</td>
                  <td>{{item.fullname}}</td>
                  <td>{{item.mobile}}</td>
                  <td>{{item.level_type|FilterAgentLevelType}}</td>
                  <td>{{item.company_position}}</td>
                  <td>{{item.company}}</td>
                  <td>{{item.state == 1 ? '正常' : '禁用'}}</td>
                  <td>{{item.last_login_time*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</td>
                  <td>{{item.address}}</td>
                  <td class="dt-table-edit"><b @click="tableEditActive(item)">编 辑</b><b class="dt-table-detele" @click="initPasswordActive(item)">初始化密码</b></td>
                </tr>
              </tbody>
          </table>
          <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset"  :page-size="10"  @current-change="paginationChangeActive" :current-page="pageNumber" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='新增代理商账号' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <!-- 账号 -->
          <li>
            <dt-search-input ref="userNameSlideRef"  :disabled ='isEditSlideFlag':inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.accountSingle.title" :placeholder ='$SearchInputConfig.accountSingle.placeholder' :maxLength = '$SearchInputConfig.accountSingle.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 密码 -->
          <li v-show="!isEditSlideFlag">
            <dt-search-input  ref="passwordSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.passwordSingle.title" :placeholder ='$SearchInputConfig.passwordSingle.placeholder' :maxLength = '$SearchInputConfig.passwordSingle.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 用户姓名 -->
          <li>
            <dt-search-input  ref="fullNameSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.userName.title" :placeholder ='$SearchInputConfig.userName.placeholder' :maxLength = '$SearchInputConfig.userName.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 手机号码 -->
          <li>
            <dt-search-input  ref="mobileSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.moblie.title" :placeholder ='$SearchInputConfig.moblie.placeholder' :maxLength = '$SearchInputConfig.moblie.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 公司名称 -->
          <li>
            <dt-search-input  ref="companyNameSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.companyName.title" :placeholder ='$SearchInputConfig.companyName.placeholder' :maxLength = '$SearchInputConfig.companyName.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 联系地址 -->
          <li>
            <dt-search-input  ref="addressSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.detailAddress.title" :placeholder ='$SearchInputConfig.detailAddress.placeholder' :maxLength = '$SearchInputConfig.detailAddress.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 账号状态 -->
          <li>
            <dt-select-option ref='accountStatusSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.accountStatus.title' :optionsName ='$ElSelectName.accountStatus.name' defaultValue=''></dt-select-option>
          </li>

          <!-- 服务地区 -->
          <li>
            <dt-search-area :defaultOptions = 'slideAreaDefault' :inputWidth='SlidePageConfig.selectWidthA' needAll= 1  @areaUpdate='slideAreaChange' ></dt-search-area>
          </li>
          <li class="slide-checked-area" v-show="areaChoiceTags.length">
            <div class="show-area">
              <i>您选择的区域:</i>
              <i>
                <el-tag
                  v-for="(tag, index) in areaChoiceTags"
                  :key="index"
                  size="small"
                  closable
                  @close="handleClose(tag ,index)">
                  {{(tag.text[0]||'') + (tag.text[1]||'') + (tag.text[2]||'')}}
                </el-tag>
              </i>
            </div>
          </li>

          <!-- 所属等级 -->
          <li>
            <dt-select-option ref='agentLevelSlideRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.agentLevel.title' :optionsName ='$ElSelectName.agentLevel.name'></dt-select-option>
          </li>
          <!-- 权限管理 start -->
          <li class="slide-first-title">
            <span>权限管理</span>
          </li>
          <li>
            <div>
              <el-tree
                :data="rightData"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-expanded-keys="[]"
                :default-checked-keys="defaultCheckedRight"
                :props="defaultProps">
              </el-tree>
            </div>
          </li>
          <!-- 权限管理 end -->  
        </ul>

        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="slideSureActive">确定</button>
          <button class="dt-btn dt-btn-cancel" @click="slideCancelActive">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js";
import { paginationChangeActive, topSearchActive, checkAllItemActive, checkItemActive } from "../../global/mixin";
export default {
  mixins: [paginationChangeActive, topSearchActive, checkAllItemActive, checkItemActive],
  data() {
    return {
      SlidePageConfig,
      currentPage: 1,
      isEditSlideFlag: false,
      slideShow: false,
      pageNumber: 1,
      listArr: [],
      listTotal: 0,
      slideSubmitId: 0,
      allItemChecked: false,
      slideAreaData: [0, 0, 0],
      slideAreaDefault: ['', '', ''],
      rightData: [],
      defaultCheckedRight: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      areaChoiceTags: []
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
    this.getMenuList();
  },
  methods: {
    initPasswordActive(info) {
      this.$projectUtils.ConfirmTip('是否确认初始化密码', msg => {
        if (msg === 'confirm') { this.$http.accountInitPwd(info.id, msg => {}) }
      })
    },
    topAddActive() {
      this.slideShow = !this.slideShow;
      this.isEditSlideFlag = false;
      this.setRefsEmpty();
      this.$refs.tree.setCheckedKeys([]); // tree全向置空
    },
    topDeleteActive() {
      this.$projectUtils.ConfirmTip('确定删除账号？', msg => {
        let _idArr = this.$projectUtils.GetCheckedItemIds(this.listArr);
        this.$http.accountDel(_idArr, msg => {
          this.getMainList(this.getUrlData());
        });
      })
    },
    tableEditActive(item) {
      this.setRefsEmpty();
      let _info = item;
      this.isEditSlideFlag = true;
      this.slideShow = true;
      this.slideSubmitId = _info.id;
      this.$http.accountAgentGetDetail(_info.id, msg => {
        this.editSlide(msg.data);
      });
    },
    slideSureActive() {
      let _refsValue = this.getRefs();
      let _menuIdArr = this.$refs.tree.getCheckedKeys();
      let _menuIds = _menuIdArr.join(',');
      let _tags = this.areaChoiceTags;
      let _areaIds = [];
      _tags.forEach(val => {
        _areaIds.push(val.code[val.code.length - 1]);
      });
      let _addUrlData = {
        'username': _refsValue.username,
        'password': _refsValue.password,
        'fullname': _refsValue.fullname,
        'state': _refsValue.state,
        'mobile': _refsValue.mobile,
        'company': _refsValue.company,
        'level_type': _refsValue.level_type,
        'address': _refsValue.address,
        'area_ids': _areaIds.join(','),
        'menu_ids': _menuIds
      };
      if (this.isEditSlideFlag) {
        let _editUrlData = Object.assign({}, _addUrlData);
        _editUrlData.id = this.slideSubmitId;
        this.$http.accountAgentEdit(_editUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        this.$http.accountAgentAdd(_addUrlData, msg => {
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      }
    },
    slideCancelActive() {
      this.slideShow = false;
      this.setRefsEmpty();
    },
    handleClose(tag, index) {
      this.areaChoiceTags.splice(index, 1);
      this.slideAreaDefault = this.setAreaDefault(this.areaChoiceTags);
    },
    searchAreaChange(value) {
      let _changeArea = this.$projectUtils.AreaDateChange(value);
      this.searchAreaData[0] = _changeArea.code[0];
      this.searchAreaData[1] = _changeArea.code[1];
      this.searchAreaData[2] = _changeArea.code[2];
    },
    slideAreaChange(value) {
      let _value = value;
      let _has = this.areaChoiceTags.some(val => {
        return val.code.join(',') === _value.code.join(',');
      });
      if (_has) { return };
      this.areaChoiceTags.push(_value);
    },
    // 组件内使用的功能函数
    getUrlData() {
      return {
        'page': this.pageNumber,
        'username': this.$refs.userNameSearchRef.value,
        'fullname': this.$refs.fullNameSearchRef.value
      }
    },
    getRefs() {
      let _refsValue = {
        'username': this.$refs.userNameSlideRef.value,
        'password': this.$refs.passwordSlideRef.value,
        'fullname': this.$refs.fullNameSlideRef.value,
        'state': this.$refs.accountStatusSlideRef.value,
        'mobile': this.$refs.mobileSlideRef.value,
        'company': this.$refs.companyNameSlideRef.value,
        'level_type': this.$refs.agentLevelSlideRef.value,
        'address': this.$refs.addressSlideRef.value
      };
      return _refsValue;
    },
    setRefsEmpty() {
      this.$refs.userNameSlideRef.value = '';
      this.$refs.passwordSlideRef.value = '';
      this.$refs.fullNameSlideRef.value = '';
      this.$refs.accountStatusSlideRef.value = '';
      this.$refs.mobileSlideRef.value = '';
      this.$refs.companyNameSlideRef.value = '';
      this.$refs.agentLevelSlideRef.value = '1';
      this.$refs.addressSlideRef.value = '';
      this.slideAreaDefault = ['', '', ''];
      this.areaChoiceTags = [];
    },
    editSlide(msg) {
      let _msg = msg;
      this.areaChoiceTags = [];
      // input 赋值
      this.$refs.userNameSlideRef.value = _msg.username;
      // this.$refs.passwordSlideRef.value = _msg.brand;
      this.$refs.fullNameSlideRef.value = _msg.fullname;
      this.$refs.accountStatusSlideRef.value = _msg.state;
      this.$refs.mobileSlideRef.value = _msg.mobile;
      this.$refs.companyNameSlideRef.value = _msg.company;
      this.$refs.agentLevelSlideRef.value = _msg.level_type;
      this.$refs.addressSlideRef.value = _msg.address;
      this.$refs.tree.setCheckedKeys(_msg.menu_ids.split(','));
      let _areaArr = _msg.area;
      let _tags = [];
      _areaArr.forEach(val => {
        let _t1 = val.name, _c1 = val.id, _data1 = val.data;
        if (_data1.length) {
          _data1.forEach(val1 => {
            let _t2 = val1.name, _c2 = val1.id, _data2 = val1.data;
            if (_data2.length) {
              _data2.forEach(val2 => {
                let _t3 = val2.name, _c3 = val2.id;
                _tags.push({
                  'code': [_c1, _c2, _c3],
                  'text': [_t1, _t2, _t3]
                })
              })
            } else {
              _tags.push({
                'code': [_c1, _c2],
                'text': [_t1, _t2]
              })
            }
          })
        } else {
          _tags.push({
            'code': [_c1],
            'text': [_t1]
          })
        }
      });
      this.areaChoiceTags = _tags;
      this.slideAreaDefault = this.setAreaDefault(this.areaChoiceTags);
    },
    getMainList(params) {
      this.allItemChecked = false;
      this.$http.accountAgentGetList(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
      });
    },
    getMenuList() {
      this.$http.menuGetList(msg => {
        let _msg = msg.data;
        this.rightData = this.$projectUtils.RightDataChange(_msg, true);
      })
    },
    setAreaDefault(data) {
      let _data = data;
      if (!_data.length) {
        return ['', '', ''];
      }
      let _code = _data[_data.length - 1].code;
      let _pCode = _code[0] ? _code[0] : '';
      let _cCode = _code[1] ? _code[1] : '';
      let _dCode = _code[2] ? _code[2] : '';
      return [_pCode, _cCode, _dCode];
    }
  },
  components: {
    dtSlidePage
  }
}
</script>

<style lang="scss" scoped>
.tw-handle-edit2{
  width: 150px;
}
.template-send-rule{
  .rule-wrap{
    display: flex;
    height: 110px;
    i{
      display: inline-block;
      line-height: 30px;
    }
    span{
      height: auto;
      width: 400px;
      p{
        height: 30px;
        line-height: 30px;
        margin-bottom: 8px;
        display: flex;
        b:nth-of-type(1){
          width: 120px;
          vertical-align: top;
          padding-left: 22px;
          background: url("../../statics/img/icon_danxuan_off.png") no-repeat left center/ 14px auto;
          &.rule-active{
            background: url("../../statics/img/icon_danxuan_on.png") no-repeat left center/ 14px auto;
          }
        }
        b:nth-of-type(2){
          flex: 1;
          text-align: right;
          input{
            width: 120px;
            margin: 0 4px;
          }
        }
      }
    }
  }
}
.slide-checked-area {
  .show-area{
    display: flex;
    width: 470px;
    i:nth-of-type(1){
      font-size: 12px;
      width: 84px;
      color: #999;
      line-height: 24px;
    }
    i:nth-of-type(2){
      flex: 1;
      .el-tag{
        margin:0 6px 6px 0;
      }
    }
  }
}
</style>

