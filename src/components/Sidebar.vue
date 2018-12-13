<template>
  <div id="slider-wrap">
    <el-menu 
    :router="true" 
    class="sidebar" 
    :default-active="routerName" 
    @open="handleOpen" 
    @close="handleClose"
    theme="dark"
    >
      <el-menu-item index="home" :route="{name: 'home'}" v-if="MenuList[0].href == 'home'">
        <!-- <i class="dt-icon-home"></i> -->
        <i class="iconfont icon-dt_home_home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu v-for="(menuItem, menuIndex) in MenuList" :key="menuIndex" :index="menuItem.href" v-if="menuItem.href !== 'home'">
        <template slot="title">
          <i class="iconfont" :class="'icon-dt_'+menuItem.icon"></i>
          <!-- <i class="iconfont icon-dt_finance_mage"></i> -->
          <span slot="title">{{menuItem.name}}</span>
        </template>
        <el-menu-item v-for="(subMenuItem, subMenuIndex) in menuItem.child" :key="subMenuIndex" :index="subMenuItem.href" :route="{name: subMenuItem.href}">{{subMenuItem.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// import _MenuList from "../global/menulist";
import { mapGetters } from "vuex";
import { aesDecrypt } from "../utils/dtAes";
export default {
  data() {
    return {
      tree: "tree",
      MenuList: [{'href': ''}],
      isCollapse: true
    }
  },
  created() {
    // this.MenuList = MenuList.data;
    let _menuList = aesDecrypt(localStorage.getItem('ku_wa_Menu_list'));
    this.MenuList = JSON.parse(_menuList);
    // this.MenuList = _MenuList.data;
  },
  computed: {
    ...mapGetters(["routerL"]),
    routerName: function() {
      return this.routerL.name;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  mounted() {
    // this.routerName = this.routerL.name
  }
};
</script>
<style lang="scss">
@import "../scss/constant.style.scss";
@import "../scss/mixin";
@keyframes heightChange {
    0% {  transform: scaleY(0); }
    100% {   transform: scaleY(1); }
}

#slider-wrap{
  background-color: $color-slide-bg;
  height: auto;
  position: fixed;
  z-index: 8;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 2px 0 10px 0 rgba(160,160,160,0.20);
}
.sidebar {
  width: 200px;
  .el-submenu .el-menu-item {
    font-size: 12px;
    padding-left: 60px !important;
    height: 40px;
    line-height: 40px;
  }
  .el-menu-item{
    height: 40px;
    line-height: 40px;
   }
  .el-submenu__title { // 一级菜单字体颜色
    color: $color-slide-word;
  }
  .el-menu-item{ // 二级菜单字体颜色
    color:$color-slide-subword
  }

  .el-submenu__title:hover,
  .el-menu-item:hover {
    background: $color-slide-li-hover;
  }
  &.el-menu {
    background-color: $color-slide-bg;
    border-right: 0;
  }
  &.el-menu .el-submenu .el-menu {
    background-color: $color-slide-bg;
  }
  .el-submenu.is-active .el-submenu__title i,
  .el-submenu.is-active .el-submenu__title {
    color: $color-slide-wrod-active;
  }
  .el-menu-item.is-active {
    background-color: $color-slide-li-hover;
    color: $color-slide-wrod-active;
    position: relative;
    &::after{
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      height: 100%;
      width: 5px;
      background:  $color-slide-wrod-active;
      animation: heightChange 0.2s linear;
    }
  }
  
  .el-submenu__title {
    font-size: 14px;
  }
  & .iconfont{
    display: inline-block;
    margin-right: 5px;
    font-size: 22px;
    vertical-align: middle;
  }
}
</style>
