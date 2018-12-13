<template>
  <div class="sign tc">
    <!-- <div class="logo">
      <img src="../assets/login_bg.png" alt="" :style="{backgroundImage:`url(${require(../path)})`}">
    </div> -->
    <DtWaves/>
    <transition name="fade" mode="out-in">
      <router-view class="form_box"></router-view>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
    .sign{
        width: 100%;
        height: 100%;
        // background: #0097FF;
        background: #FE9060;
        background: linear-gradient(90deg,#39B5B5, #55CCC2, #39B5B5)
    }
</style>

<script>
import DtParticles from "../components/particles/index.vue";
import DtWaves from '../components/Wave/Wave.vue';
export default {
  components: {
    DtParticles,
    DtWaves
  }
}
</script>

