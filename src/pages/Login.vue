<template>
  <div id="login-outer">
    <div class="login-con">
      <div class="log-img"></div>
      <div class="login-con-inner">
        <!-- <p>账号：</p> -->
        <div class="log-account">
          <i></i>
          <span><input type="text" class="dt-input" placeholder="请输入账号" v-model="username"></span>
        </div>
        <!-- <p>密码：</p> -->
        <div class="log-psd">
          <i></i>
          <span><input type="password" class="dt-input" placeholder="请输入密码" @keyup.enter="submit" v-model="password"></span>
        </div>
        <!-- <p class="log-err-tip">{{errWord}}</p> -->
        <button type="button" class="dt-btn" style="width:100%" @click="submit">登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
const USER_NAME_REG = /^[a-zA-Z0-9]{3,15}$/;
// import _MenuList from "../global/menulist";
import { aesEncrypt } from "../utils/dtAes";
export default {
  data() {
    return {
      username: "",
      password: "",
      errWord: ""
    };
  },
  methods: {
    submit() {
      if (!USER_NAME_REG.test(this.username)) {
        this.errWord = '账号格式不正确';
        return;
      }
      if (this.password.length > 18 || this.password.length < 6) {
        this.errWord = '密码格式不正确';
        return;
      }
      this.errWord = "";
      this.$http.accountLogin(this.username, this.password, msg => {
        let _accessToken = msg.data.access_token;
        let _applyId = msg.data.id;
        localStorage.setItem('Three-Access_Token', _accessToken);
        localStorage.setItem('Three-Apply_Id', _applyId);
        localStorage.removeItem('ku_wa_Menu_list');
        this.getMenuList();
      })
    },
    getMenuList() { // 获取左侧测单列表
      this.$http.menuGetList(msg => {
        let _menuList = msg.data;
        localStorage.setItem('ku_wa_Menu_list', aesEncrypt(JSON.stringify(_menuList)));
        let _href = '';
        if (_menuList[0].child.length > 0) {
          _href = _menuList[0].child[0].href;
        } else {
          _href = _menuList[0].href;
        };
        this.$router.push({ name: _href });
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/constant.style.scss";
@import "../scss/mixin";
#login-outer {
  height: 100%;
  // position: relative;
}
.log-img {
  height: 110px;
  font-size: 36px;
  color: #333333;
  text-align: center;
  background: url("../assets/img/sign_login.png") no-repeat center center / 100% 100%;
}
.login-con {
  @include center-position;
  width: 440px;
  min-height: 440px;
  background: #fff;
  border-radius: 8px;
  margin-top: -24px;
}
.login-con-inner{
  height: auto;
  padding: 30px 60px 60px 60px;
}


.log-account,
.log-psd {
  height: 48px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin: 10px 0 30px 0;
  display: flex;
}

.log-account > i,
.log-psd > i {
  display: inline-block;
  width: 64px;
}

.log-account > i {
  background: url("../assets/img/icon_user.png") no-repeat center center / auto;
}

.log-psd > i {
  background: url("../assets/img/icon_password.png") no-repeat center center /
    auto;
}

.log-account > span,
.log-psd > span {
  flex: 1;
  input {
    border: 0;
    background: #fff;
  }
}

.log-account {
  margin: 24px 0 30px 0;
}

.log-err-tip {
  line-height: 20px;
  height: 20px;
  text-align: left;
  margin-bottom: 20px;
  font-size: 14px;
  color: #f58522;
}

.login-con {
  .dt-btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px; // letter-spacing: 6px;
  }
}
</style>
