<template>
  <div class="device-map-outer">
    <div class="dt-search-top">
      <!-- 地区 -->
      <dt-search-area @areaUpdate='searchAreaChange'></dt-search-area>
      
      <div class="dt-search-cell">
        <button type="button" class="dt-btn" @click='toSearch'>查 询</button>
      </div>
    </div>
    <div class="map-con" id="map-container"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    areaId: '100000',
    mapObj: ''
  }),
  mounted() {
    this.getMapData(this.areaId);
    /* eslint-disable */
    //创建地图
    let map = new AMap.Map('map-container', {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 6
    });
    // map.setFeatures(['bg', 'road', 'building', 'point']);
    // 要素显示
    map.setFeatures(['bg', 'point']);
    this.mapObj = map;
  },
  methods: {
    getMapData(areaId) {
      this.$http.DeviceDeviceMapOverview(areaId, msg => {
        let _msg = msg.data;
        this.mapSetMarks(this.mapObj, _msg.sub_count);
      })
    },
    searchAreaChange(value) {
      let _changeArea = this.$projectUtils.AreaDateChange(value);
      let _code = _changeArea.code;
      if (_code[2] !== '0') {
        this.areaId = _code[2];
      } else if (_code[1] !== '0') {
        this.areaId = _code[1]
      } else if (_code[0] !== '0') {
        this.areaId = _code[0]
      } else {
        this.areaId = '100000'
      }
    },
    toSearch() {
      this.getMapData(this.areaId);     
    },
    // 组件内的功能函数
    mapSetMarks(map, data) {
      // 使用是高德地图的 自适应现实多个点标记
      let _data = data;
      // let _subCount = _data.sub_count;
      let _markers = [];
      // _subCount.forEach(val => {
      _data.forEach(val => {
          _markers.push({
            position: [val.lng, val.lat],
            name: val.name,
            total: val.total
          })
      });
      
      map.clearMap(); // 清除地图覆盖物
      // map.setCenter([_data.lng, _data.lat]); // 设置缩放级别和中心点
      let markers = _markers;
      markers.forEach(function(marker) {
        new AMap.Marker({ // 循环描点
            map: map,
            // icon: marker.icon,
            content: `<div class = 'map-content-outer'><i class='map-name'>${marker.name}：</i><i class='map-total'>${marker.total}</i></div>`,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-12, -36)
        });
      });
      map.setFitView();
    } 
  }
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixin.scss';
.device-map-outer {
  .map-con {
    height: 720px;
    margin-bottom: 2px;
    @include shadow
  }
}
</style>

