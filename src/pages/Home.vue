<template>
  <div id="home">
    <dt-header></dt-header>
    <dt-sidebar></dt-sidebar>
    <transition name="fade" mode="out-in">
      <router-view class="water_main"></router-view>
    </transition>
  </div>
</template>

<script>
import DtHeader from '../components/Header'
import DtSidebar from '../components/Sidebar'

export default {
  data: () => ({}),
  components: {
    DtHeader,
    DtSidebar
  },
  mounted() {
    this.$http.accountGetAccountInfo(info => {
      let _info = info.data;
      this.$store.dispatch('storeAcconutInfo', _info);
    });
  }
}

</script>

<style  lang="scss">
@import "../scss/constant.style.scss";
#home{
  width: 100%;
  height: auto;
}
.water_main {
  position: absolute;
  top: 61px;
  padding: 20px 40px 20px 220px;
  width: 100%;
  min-width: $length-body-min-width;
  position: absolute;
  top: 61px;
  // max-height: 1080px;
  min-height: $length-body-min-height;
  // height: 100%;
  overflow-y: auto;
  background: $color-bg-main;
}
</style>
