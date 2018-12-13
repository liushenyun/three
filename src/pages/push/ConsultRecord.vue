<template>
  <div class="consult-record-outer">
    <!-- top Satrt -->
      <div class="dt-search-top">
        <!-- 标题 -->
        <dt-search-input  ref="infoTitleSearchRef" :inputWidth='$SearchInputConfig.infoTitle.width' :title="$SearchInputConfig.infoTitle.title" :placeholder ='$SearchInputConfig.infoTitle.placeholder' :maxLength = '$SearchInputConfig.infoTitle.length' defaultValue = ''></dt-search-input>
        <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-search" @click="topSearchActive">查 询</button>
        </div>
      </div>
      <div class="dt-search-top">
         <div class="dt-search-cell">
          <button type="button" class="dt-btn dt-btn-add" @click="topAddActive">新 增</button>
        </div>
      </div>
       <!-- top end -->

      <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <ul class="picture-table-show">
            <li v-for="(item, index) in listArr" :key="index" @click="tableEditActive(item)">
              <h4 class="ellipsis">{{item.title}}</h4>
              <div class="p-list-date"><span>{{item.utime*1000|DateFormat('yyyy-MM-dd hh:mm:ss')}}</span><b @click.stop="deletePublishedPictureActive(item.id)">删除</b></div>
              <div class="p-list-img"><img :src="rootSrc + item.cover_img" alt=""></div>
              <div class="p-list-status">
                <button @click.stop="tablePublishActive(item, index)" class="dt-btn" :class="{'dt-btn-cancel': item.state == 2}">{{item.state == 1?'发布':'已发布'}}</button>
              </div>
            </li>
          </ul>
          <div class="no-data-tip" v-if="!listArr.length">暂无数据</div>
        </div>
        <div class="dt-page-wrap">
          <el-pagination class="dt-page-reset" :page-size="10"  @current-change="paginationChangeActive" :current-page.sync="currentPage" layout="total, prev, pager, next, jumper" :total="listTotal">
          </el-pagination>
        </div>
      </div>
      <!-- 表格 end -->

      <!-- 侧滑start -->
      <dt-slide-page :slideTitle='slideTitle' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthB'>
        <ul>
          <!-- 设备名称 -->
          <li>
            <dt-search-input  ref="infoTitleSlideRef" :inputWidth='SlidePageConfig.inputWidthB' :title="$SearchInputConfig.infoTitle.title" :placeholder ='$SearchInputConfig.infoTitle.placeholder' :maxLength = '$SearchInputConfig.infoTitle.length'  defaultValue = ''></dt-search-input>
          </li>
          <!-- 富文本正文 -->
          <li>
            <div class="editor-wrap">
              <!-- 富文本样式重置 在 base.css -->
              <div id="editor-inner-wrap">
              </div>
            </div>
          </li>

          <!-- 上传封面图片 -->
          <li>
            <div class="cover-picture-wrap">
              <div class="cp-left">
                <img @click="deletePictureActive()" class="c-del" src="../../statics/img/icon_pic_del_sel.png" alt="">
                <img class="c-picture"  :src="coverImg" v-if="coverImg">
                <span v-else>请选择图片</span>
              </div>
              <div class="cp-right">
                <div class="cp-right-con">
                  <button type="button" class="dt-btn dt-btn-cancel dt-btn-file">
                    <input type="file" accept=".png, .jpg, .jpeg, .gif" @change="inputChangeActive" name="" id="cover-picture-file"> 
                    上传封面图片
                  </button>
                  <p>（仅支持GIF/JPG/PNG/JPEG）</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="slide-btn-wrap">
          <button class="dt-btn"  @click="slideSureActive(1)">保存</button>
          <button class="dt-btn dt-btn-cancel"  @click="slideSureActive(2)">保存并发布</button>
        </div>
      </dt-slide-page>
      <!-- 侧滑 end -->

  </div>
</template>

<script>
import { baseUrl } from "../../config/index";
import apiUrl from "../../fetch/apiUrl";
/* eslint-disable camelcase */
import WangeEditor from 'wangeditor';
import { dtSlidePage } from '../../global/searchComponents';
import { SlidePageConfig } from "../../global/constant.js"
import { topSearchActive, paginationChangeActive } from "../../global/mixin.js";
export default {
  mixins: [topSearchActive, paginationChangeActive],
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
      coverImg: ''
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
    // 富文本配置
    let editor = new WangeEditor('#editor-inner-wrap');
    this.editor = editor;
    editor.customConfig.debug = true;
    editor.customConfig.uploadImgServer = `${baseUrl + apiUrl.UploadifyUploadImageByWangEditor}`;
    editor.customConfig.uploadImgParams = { // 设置图片上传参数
      'save_dir': 'images/kuwa_wp/ad'
    };
    editor.customConfig.menus = [ // 富文本显示功能配置
      'head',  // 标题
      'bold',  // 粗体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      // 'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      // 'video',  // 插入视频
      'code' // 插入代码
      // 'undo',  // 撤销
      // 'redo'  // 重复
    ]
    editor.customConfig.uploadFileName = 'myfile'; // 自定义filename
    // editor.txt.html('<p>请输入正文</p>');
    editor.customConfig.onchange = (html) => {
      // this.form.content = html;
    };
    editor.customConfig.linkImgCallback = function (url) {
      // console.log(url); // url 即插入图片的地址
    };
    editor.create();
    editor.txt.html('<p>请输入正文</p>'); // 初始化富文本内容
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber,
        'title': this.$refs.infoTitleSearchRef.value
      }
    },
    getMainList(params) {
      this.$http.informationGetList(params, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
        this.rootSrc = msg.domain;
      });
    },
    inputChangeActive(e) {
      let file = e.target.files[0];
      this.$http.UploadifyUploadImage(file, (msg) => {
        let _msg = msg;
        this.coverImg = _msg.filename;
        let obj = document.getElementById('cover-picture-file');
        obj.value = '';
      });
    },
    deletePictureActive() {
      this.coverImg = '';
    },
    setRefsEmpty() {
      this.$refs.infoTitleSlideRef.value = '';
      this.coverImg = '';
      this.editor.txt.clear();
    },
    editSlide(msg) {
      let _msg = msg;
      this.$refs.infoTitleSlideRef.value = _msg.title;
      this.editor.txt.html(_msg.content);
      this.coverImg = _msg.cover_img;
    },
    tableEditActive(item) {
      this.slideShow = !this.slideShow;
      this.slideSubmitId = item.id;
      this.isEditSlideFlag = true;
      this.$http.informationGetDetail(item.id, msg => {
        this.editSlide(msg.data);
      })
    },
    topAddActive() {
      this.slideShow = !this.slideShow;
      this.slideSubmitId = 0;
      this.isEditSlideFlag = false;
      this.setRefsEmpty();
    },
    deletePublishedPictureActive(id) {
      this.$projectUtils.ConfirmTip('确定删除？', msg => {
        this.$http.informationDel(id, msg => {
          this.pageNumber = 1;
          this.getMainList(this.getUrlData());
        });
      });
    },
    tablePublishActive(item, index) {
      let _id = item.id, _state = Number(item.state);
      if (_state === 2) { return }
      this.$http.informationEdit({'id': _id, 'state': 2}, msg => {
        this.listArr[index].state = 2;
      }, '发布成功');
    },
    slideSureActive(state) {
      let _urlData = {
        'title': this.$refs.infoTitleSlideRef.value,
        'content': this.editor.txt.html(),
        'state': state,
        'cover_img': this.coverImg
      };
      if (!_urlData.cover_img) {
        this.$message.warning('必须选择上传图片');
        return;
      }
      if (this.isEditSlideFlag) {
        let _editUrlData = Object.assign({}, _urlData);
        _editUrlData.id = this.slideSubmitId;
        this.$http.informationEdit(_editUrlData, msg => {
          this.pageNumber = 1;
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      } else {
        let _addUrlData = Object.assign({}, _urlData);
        this.$http.informationAdd(_addUrlData, msg => {
          this.pageNumber = 1;
          this.slideShow = false;
          this.getMainList(this.getUrlData());
        });
      }
    }
  },
  components: {
    dtSlidePage
  },
  computed: {
    slideTitle() {
      return this.isEditSlideFlag ? '编辑咨询详情' : '新增咨询详情'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin.scss';
@import '../../scss/constant.style.scss';
.consult-record-outer{
  .dt-page-wrap{
    background: #FFF;
  }
  .dt-table-outer{
    background: none;
    box-shadow: none;
  }
  .picture-table-show{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    min-height: 260px;
    li{
      width: 18%;
      margin-right: 2.5%;
      margin-bottom: 20px;
      cursor: pointer;
      height: 284px;
      background: #FFF;
      padding: 20px;
      @include shadow;
      &:nth-of-type(5),
      &:nth-of-type(10){
        margin-right: 0;
      }
      h4{
        height: 22px;
        line-height: 22px;
        font-size: 12px;
      }
      .p-list-img{
        height: 130px;
        margin: 20px 0;
        img{
          width: 100%;
          max-height: 100%;
        }
      }
      p{
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .p-list-date{
        font-size: 12px;
        color: #818181;
        b{
          float: right;
          cursor: pointer;
          color: $color-active;
          &:hover{
            opacity: 0.7;
          }
        }
      }
      .p-list-status{
        height: 30px;
        text-align: center;
        .dt-btn{
          height: 100%;
          line-height: 30px;
          &:hover{
            opacity: 0.7;
          }
        }
      }
    }
  }
}

.editor-wrap{
  height: 350px;
  width: 676px;
}
.cover-picture-wrap{
  height: 130px;
  display: flex;
  margin-bottom: 20px;
  .cp-left{
    width: 240px;
    background: #FBFCFF;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 20px;
    .c-picture{
      max-width: 100%;
      max-height: 100%;
    }
    &:hover{
      .c-del{
        opacity: 1;
        transform: rotate(180deg);
      }
    }
    .c-del{
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      z-index: 10;
      opacity: 0;
      transition: all 0.4s ease-in;
    }
  }
  .cp-right{
    flex: 1;
    display: flex;
    align-items: center; 
  }
  .cp-right-con{
    p{
      font-size: 12px;
      color: #485B6D;
      height: 22px;
      line-height: 22px;
    }
  }
  .dt-btn-file{
    position: relative;
    cursor: pointer;
  }
  #cover-picture-file{
    position: absolute;
    cursor: pointer;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>


