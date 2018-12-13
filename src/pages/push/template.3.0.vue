<template>
  <div calss="push-remind-outer">
    <div class="dt-search-top">
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-add" @click="AddActive">新 增</button>
        <button type="button" class="dt-btn dt-btn-add" @click="AddActive1">新 增1</button>
      </div>
    </div>

    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <table class="dt-table-same" cellspacing="0" cellpadding="0">
                <thead>
                  <tr>
                    <th>模板名称</th>
                    <th>信息类型</th>
                    <th>模板类型</th>
                    <th>推送渠道</th>
                    <th>推送类型</th>
                    <th class="tw-handle-edit2">操作</th>
                  </tr>
                </thead>
              <tbody>
                <tr v-for="(item,index) in [1,2,3,4,5,6,7,8,9,0]" :key="index">
                  <td>33918115</td>
                  <td>净水器1</td>
                  <td>WiFi</td>
                  <td>零售</td>
                  <td>尚之水</td>
                  <td class="dt-table-edit"><b>编 辑</b><b class="dt-table-detele">删 除</b></td>
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

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='新增消息模版1' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <!-- 模板名称 -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateName.title" :placeholder ='$SearchInputConfig.templateName.placeholder' :maxLength = '$SearchInputConfig.templateName.length'  defaultValue = ''></dt-search-input>
          </li>

          <!-- 模板类型 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.templateType.title' :optionsName ='$ElSelectName.templateType.name'></dt-select-option>
          </li>

          <!-- 信息类型 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.templateInformType.title' :optionsName ='$ElSelectName.templateInformType.name'></dt-select-option>
          </li>

          <!-- 推送渠道 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.templatePushChannel.title' :optionsName ='$ElSelectName.templatePushChannel.name'></dt-select-option>
          </li>

          <!-- 推送类型 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.templatePushType.title' :optionsName ='$ElSelectName.templatePushType.name'></dt-select-option>
          </li>

          <!-- 信息内容 -->
          <li>
            <dt-search-textarea  ref="telNum" inputHeight = '96' :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateInformCon.title" :placeholder ='$SearchInputConfig.templateInformCon.placeholder' :maxLength = '$SearchInputConfig.templateInformCon.length'  defaultValue = ''></dt-search-textarea>
          </li>

          <!-- 信息链接 -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateInfoLink.title" :placeholder ='$SearchInputConfig.templateInfoLink.placeholder' :maxLength = '$SearchInputConfig.templateInfoLink.length'  defaultValue = ''></dt-search-input>
          </li>
        </ul>

        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="defaultChange">确定</button>
          <button class="dt-btn dt-btn-cancel">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

      <!-- 侧滑start -->
      <dt-slide-page slideTitle='新增消息模版2' :class="{'slide-page-show': slideShow1}" @hideSlidePage='slideShow1 = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          <!-- 模板名称 -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateName.title" :placeholder ='$SearchInputConfig.templateName.placeholder' :maxLength = '$SearchInputConfig.templateName.length'  defaultValue = ''></dt-search-input>
          </li>

          <!-- 模板类型 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.templateType.title' :optionsName ='$ElSelectName.templateType.name'></dt-select-option>
          </li>

          <!-- 信息类型 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.templateInformType.title' :optionsName ='$ElSelectName.templateInformType.name'></dt-select-option>
          </li>

          <!-- 推送渠道 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.templatePushChannel.title' :optionsName ='$ElSelectName.templatePushChannel.name'></dt-select-option>
          </li>

          <!-- 推送类型 -->
          <li>
            <dt-select-option ref='communicteTypeRef' :conWidth = 'SlidePageConfig.inputWidthA' :optiosTitle='$ElSelectName.templatePushType.title' :optionsName ='$ElSelectName.templatePushType.name'></dt-select-option>
          </li>

          <!-- 触发规则 -->
          <li class="template-send-rule">
            <div class="rule-wrap">
              <i>规则触发：</i>
              <span>
                <p><b>滤芯剩余百分百</b><b><em>少于</em><input class="dt-input" type="text" placeholder="请输入整数1~10"> <em>天</em></b></p>
                <p><b class="rule-active">滤芯剩余天数</b><b><em>少于</em><input class="dt-input" type="text" placeholder="请输入整数1~10"> <em>天</em></b></p>
                <p><b>滤芯剩余流量</b><b><em>少于</em><input class="dt-input" type="text" placeholder="请输入整数1~10"> <em>天</em></b></p>
              </span>
            </div>
          </li>

          <!-- 信息内容 -->
          <li>
            <dt-search-textarea  ref="telNum" inputHeight = '96' :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateInformCon.title" :placeholder ='$SearchInputConfig.templateInformCon.placeholder' :maxLength = '$SearchInputConfig.templateInformCon.length'  defaultValue = ''></dt-search-textarea>
          </li>

          <!-- 信息链接 -->
          <li>
            <dt-search-input  ref="telNum" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.templateInfoLink.title" :placeholder ='$SearchInputConfig.templateInfoLink.placeholder' :maxLength = '$SearchInputConfig.templateInfoLink.length'  defaultValue = ''></dt-search-input>
          </li>
        </ul>
        
        <div class="slide-btn-wrap">
          <button class="dt-btn" @click="defaultChange1">确1定</button>
          <button class="dt-btn dt-btn-cancel">取消</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { dtSlidePage, dtSearchTextarea } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js"
export default {
  data() {
    return {
      SlidePageConfig,
      slideShow: false,
      slideShow1: true,
      currentPage4: 3
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
    },
    AddActive() {
      this.slideShow = true;
      this.slideShow1 = false;
    },
    AddActive1() {
      this.slideShow = false;
      this.slideShow1 = true;
    },
    defaultChange() {
      console.log("确定");
    },
    defaultChange1() {
      console.log("确定");
    }
  },
  components: {
    dtSearchTextarea,
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
</style>

