<template>
  <div class="add-picture-outer">
    <!-- 头部 -->
    <div class="dt-search-top">
      <!-- 反馈类型 -->
      <dt-select-option ref='addPictureTypeSearchRef' :optiosTitle='$ElSelectName.addPictureType.title' :optionsName ='$ElSelectName.addPictureType.name' :conWidth = '$ElSelectName.addPictureType.width'></dt-select-option>

      <!-- 链接地址 -->
      <dt-search-input  ref="linkAddressSearchRef" :inputWidth='$SearchInputConfig.linkAddress.width' :title="$SearchInputConfig.linkAddress.title" :placeholder ='$SearchInputConfig.linkAddress.placeholder' :maxLength = '$SearchInputConfig.linkAddress.length'  defaultValue = ''></dt-search-input>

      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-cancel dt-btn-file">
          <input type="file" accept=".png, .jpg, .jpeg, .gif" @change="inputChangeActive" name="" id="picture-file-version"> 
          添加图片
        </button>
      </div>
      <div class="dt-search-cell">
        <button type="button" class="dt-btn dt-btn-modify" @click="topSearchPublish">发 布</button>
      </div>
    </div>

    <!-- 选择的图片显示 -->
    <ul class="choice-show-ul" v-show="srcArr.length">
      <li v-for="(item, index) in srcArr" :key="index">
        <img @click="deletePictureActive(index)" class="m-del" src="../../statics/img/icon_pic_del_sel.png" alt="">
        <img class="m-img" :src="item" alt="">
      </li>
    </ul>
    <h5 class="publish-title">发布历史</h5>

    <!-- 图片显示翻页 -->
    <!-- 表格 start -->
      <div class="dt-table-outer">
        <div class="dt-table-true-wrap">
          <ul class="picture-table-show">
            <li v-for="(item, index) in listArr" :key="index">
              <h4><b>酷蛙APP</b><span>{{item.type|advertisementType}}</span></h4>
              <div class="p-list-img"><img :src="rootSrc + item.image" alt=""></div>
              <p>连接：{{item.url}}</p>
              <div class="p-list-date"><span>2017-10-22  10:00</span><b @click="deletePublishedPictureActive(item.id)">删除</b></div>
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


  </div>
</template>

<script>
import { paginationChangeActive } from "../../global/mixin.js";
export default {
  mixins: [paginationChangeActive],
  data() {
    return {
      path: '',
      listArr: [],
      listTotal: 0,
      pageNumber: 1,
      currentPage: 1,
      srcArr: [],
      pictureType: 1,
      rootSrc: ''
    }
  },
  mounted() {
    this.getMainList(this.getUrlData());
  },
  methods: {
    getUrlData() {
      return {
        'page': this.pageNumber
      }
    },
    getMainList(params) {
      this.$http.advertisementGetList(params.page, msg => {
        let _msg = msg.data;
        this.listArr = this.$projectUtils.ListAddChecked(_msg.list);
        this.listTotal = Number(_msg.total);
        this.currentPage = this.pageNumber;
        this.rootSrc = msg.domain;
      });
    },
    inputChangeActive(e) {
      this.pictureType = this.$refs.addPictureTypeSearchRef.value;
      if (Number(this.pictureType) !== 2 && this.srcArr.length > 0) {
        this.$message.warning('最多只能选择一张');
        return;
      } else if (this.srcArr.length >= 5) {
        this.$message.warning('最多只能选择五张');
        return;
      }
      let file = e.target.files[0];
      // let _fileReader = new FileReader();
      // _fileReader.readAsDataURL(file);
      // _fileReader.onload = ev => {
      //   this.path = ev.target.result;
      // };
      this.$http.UploadifyUploadImage(file, (msg) => {
        let _msg = msg;
        this.srcArr.push(_msg.filename);
        let obj = document.getElementById('picture-file-version');
        obj.value = '';
      });
    },
    topSearchPublish() {
      let type = this.$refs.addPictureTypeSearchRef.value,
        image = this.srcArr.join(','),
        url = this.$refs.linkAddressSearchRef.value;
      console.log('url', url);
      if (this.srcArr.length < 1 && url === '') {
        this.$message.warning('请选择需要上传的图片');
        return;
      }
      this.$http.advertisementAdd(type, image, url, msg => {
        // 重置选择的图片和重新请求广告图片列表
        this.srcArr = [];
        this.pageNumber = 1;
        this.getMainList(this.getUrlData());
      })
    },
    deletePictureActive(index) {
      this.srcArr.splice(index, 1);
    },
    deletePublishedPictureActive(id) {
      this.$projectUtils.ConfirmTip('是否确认删除广告图片', msg => {
        if (msg === 'confirm') {
          this.$http.advertisementDel(id, msg => {
            this.pageNumber = 1;
            this.getMainList(this.getUrlData());
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin.scss';
@import '../../scss/constant.style.scss';
.add-picture-outer{
  #picture-file-version{
    position: absolute;
    cursor: pointer;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .dt-btn-file{
    position: relative;
    cursor: pointer;
  }
  .choice-show-ul{
    height: 216px;
    display: flex;
    li{
      width: 18%;
      height: 100%;
      background: #FFF;
      padding: 20px;
      @include shadow;
      margin-right: 2%;
      position: relative;
      &:hover{
        .m-del{
          opacity: 1;
          transform: rotate(180deg);
        }
      }
      .m-img{
        width: 100%;
        max-height: 100%;
      }
      .m-del{
        position: absolute;
        cursor: pointer;
        // display: none;
        opacity: 0;
        right: -6px;
        top: -6px;
        transition: all 0.4s ease-in;
        // transform: translate(40% , -40%);
      }
    }
  }
  .publish-title{
    font-size: 14px;
    // color: #444444;
    font-weight: 600;
    line-height: 26px;
    margin: 40px 0 36px 0;
    position: relative;
    &::after{
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 26px;
      background: #FA896A;
      content: '';
    }
  }
  .dt-table-outer{
    background: none;
    box-shadow: none;
    .dt-page-wrap{
      background: #FFF;
    }
  }
  .picture-table-show{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    min-height: 260px;
    li{
      width: 18%;
      margin-right: 2.5%;
      margin-bottom: 10px;
      height: 290px;
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
        b{
          float: left;
          font-weight: 600;
        }
        span{
          float: right;
        }
      }
      .p-list-img{
        height: 130px;
        margin: 20px 0;
        text-align: center;
        img{
          height: 100%;
          max-width: 100%;
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
    }
  }
}
</style>

