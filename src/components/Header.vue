<template>
  <div id="header">
    <div class="logo">
      <img src="../statics/img/header_logo.png" alt="">
    </div>
    <div class="title">
      美淳净水智能平台
    </div>
    <div class="msg">
      <img src="../statics/img/icon_message_tip.png" alt="">
    </div>
    <div class="info" @mouseleave="showHandel(false)">
      <img src="../statics/img/bg_header.png" alt="" @mouseenter.stop="showHandel(true)">
      <!-- <p>{{accountInfo.fullname}}</p> -->
      <transition name="fade">
        <ul class="down-handle" v-show="isShowHandle">
          <li @click="psdModifyActive">修改密码</li>
          <li @click="logOutActive">退 出</li>
        </ul>
      </transition>
    </div>

    <!-- 侧滑start -->
      <dt-slide-page slideTitle='修改密码' :class="{'slide-page-show': slideShow}" @hideSlidePage='slideShow = false' :slideWidth='SlidePageConfig.slideWidthA'>
        <ul>
          
          <!-- 旧密码 -->
          <li>
            <dt-search-input inputType ='password' ref="oldPsdSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.oldPassword.title" :placeholder ='$SearchInputConfig.oldPassword.placeholder' :maxLength = '$SearchInputConfig.oldPassword.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 新密码 -->
          <li>
            <dt-search-input inputType ='password' ref="newPsdSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.newPassword.title" :placeholder ='$SearchInputConfig.newPassword.placeholder' :maxLength = '$SearchInputConfig.newPassword.length' defaultValue = ''></dt-search-input>
          </li>

          <!-- 确认新密码 -->
          <li>
            <dt-search-input inputType ='password' ref="reNewPsdSlideRef" :inputWidth='SlidePageConfig.inputWidthA' :title="$SearchInputConfig.reNewPassword.title" :placeholder ='$SearchInputConfig.reNewPassword.placeholder' :maxLength = '$SearchInputConfig.reNewPassword.length' defaultValue = ''></dt-search-input>
          </li>
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
import { mapGetters } from "vuex";
import { dtSlidePage } from '../global/searchComponents';
import { SlidePageConfig } from "../global/constant.js";
export default {
  data() {
    return {
      isShowHandle: false,
      slideShow: false,
      SlidePageConfig
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters(["accountInfo"])
  },
  methods: {
    showHandel: function(flag) {
      this.isShowHandle = flag
    },
    logOutActive() {
      this.$http.accountLogout(msg => {
        localStorage.removeItem('Three-Access_Token');
        this.$router.push({'name': 'login'})
      })
    },
    psdModifyActive() {
      this.slideShow = true;
      this.$refs.oldPsdSlideRef.value = '';
      this.$refs.newPsdSlideRef.value = '';
      this.$refs.reNewPsdSlideRef.value = '';
    },
    slideSureActive() {
      let _urlData = {
        'old_pwd': this.$refs.oldPsdSlideRef.value,
        'new_pwd': this.$refs.newPsdSlideRef.value,
        're_pwd': this.$refs.reNewPsdSlideRef.value
      };
      this.$http.accountChangePwd(_urlData, msg => {
        this.$message({
          showClose: true,
          message: '修改密码成功，将跳回首页重新登录',
          duration: 2000,
          type: 'success'
        });
        setTimeout(() => {
          this.$router.replace({'name': 'login'})
        }, 2000);
      })
    },
    slideCancelActive() {
      this.slideShow = false;
    }
  },
  components: {
    dtSlidePage
  }
}

</script>

<style lang="scss">
@import "../scss/constant.style.scss";
#header {
  position: fixed;
  top: 0;
  box-shadow: 0 0 9px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease-in-out;
  background-color: #fff;
  width: 100%;
  min-width: 1200px;
  height: 64px;
  z-index: 99;
  display: flex;
  .logo {
    height: 100%;
    width: 200px;
    line-height: 64px;
    background: $color-header-logo-bg;
    text-align: center;
    // 正式不要
    color: #FFF;
    font-size: 20px;
    // 正式不要
    img {
      width: 80%;
      vertical-align: middle;
      // height: 44px;
    }
  }
  .title {
    flex: 1;
    line-height: 61px;
    text-align: center;
    position: relative;
    font-size: $size-four;
  }
  .info,
  .msg {
    text-align: center;
    line-height: 60px;
    img {
      width: 32px;
      height: auto;
      vertical-align: middle;
    }
  }

  // .info {
  //   text-align: center;
  //   // line-height: 60px;
  //   img {
  //     width: 30px;
  //     height: auto;
  //     margin-top: 5px;
  //   }
  //   p{
  //     line-height: 20px;
  //   }
  // }

  .msg {
    width: 60px;
  }
  .info {
    width: 100px;
    position: relative;
    .down-handle {
      position: absolute;
      background: #FFF;
      width: 100px;
      height: auto;
      top: 60;
      right: 0;
      border: 1px solid #E6E6E6;
      box-shadow: -2px 2px 8px 0 rgba(0, 0, 0, 0.10);
      border-radius: 2px;
      li {
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
