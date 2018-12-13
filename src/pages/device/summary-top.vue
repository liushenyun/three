<template>
  <!-- <div class="static-plate" v-bind:class="'plate'+num">
    <h3>{{name}}</h3>
    <div class="static-num">
      4645
    </div>
  </div> -->
  <div class="static-plate" v-bind:class="'plate-'+cl">
    <div class="left"></div>
    <div class="right">
      <span>
        <h5>{{name}}</h5>
        <p>{{num}}</p>
      </span>
      
    </div>
  </div>
</template>
 <script>
export default {
  data() {
    return {
    }
  },
  props: {
    name: {
      type: String
    },
    num: {
      type: [String, Number]
    },
    cl: { // 激活总量: active  在线总量:online  总净水量:water  活跃设备量:lively
      type: String
    }
  }
}
</script>
 
 <style lang="scss" scoped>
@import '../../scss/mixin.scss';
@import '../../scss/constant.style.scss';
.static-plate {
  height: 100%;
  width: 23%;
  @include shadow;
  padding: 12px;
  background: #FFF;
  display: flex;
  .left{
    flex: 3;
  }
  .right{
    flex: 6;
    line-height: 126px;
    color: #0097FF;
    span{
      display: inline-block;
      vertical-align: middle;
      h5{
        line-height: 20px;
        opacity: 0.9;
        font-size: 14px;
      }
      p{
        line-height: 60px;
        font-size: 36px;
      }
    }
  }
  &.plate-active{
    .left{
      background: url('../../statics/img/icon_activation.png') no-repeat center center /auto;
    }
    .right{
      // color: #2DCF76
    }
  } 
  &.plate-online {
    .left{
      background: url('../../statics/img/icon_wifi.png') no-repeat center center /auto;
    }
    .right{
      color: #2DCF76
    }
  }
  &.plate-water{
    .left{
      background: url('../../statics/img/icon_water.png') no-repeat center center /auto;
    }
    .right{
      // color: #2DCF76
    }
  } 
  &.plate-lively{
    .left{
      background: url('../../statics/img/icon_active.png') no-repeat center center /auto;
    }
    .right{
      color: #2DCF76
    }
  }

}
</style>
 