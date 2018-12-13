<template>
  <div class="pa-outer">
    <div class="dt-pagition">
      <div class="dt-pagintion-left">
        <button type="button" @click='toFirst'>11</button>
        <button type="button" @click="toPre">1</button>
        <span class="dt-pag_line"></span>
        <span>第</span>
        <span class="dt-pagition_input">
          <input type="text" placeholder="页数">
        </span>
        <span>页</span>
        <span class="dt-pag_line"></span>
        <span>，共12页</span>
        <button type="button" @click="toNext">2</button>
        <button type="button" @click="toEnd">3</button>
        <span class="dt-pag_line"></span>
        <button type="button" @clcik='toRefresh '>新</button>
      </div>

      <div class="dt-pagintion-right">
        <span>显示</span>
        <span>21-32</span>
        <span>条</span>
        <span>，共{{this.total}}条</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: '26'
    }
  }
}
</script>

<style lang="scss" scoped>
.dt-pagition {
  white-space: nowrap;
  color: #48576a;
  height: 32px;
  line-height: 32px;
  .dt-pagintion-left {
    float: left;
    height: 32px;
    line-height: 32px;
  }
  .dt-pagintion-right {
    float: right;
    height: 32px;
    line-height: 32px;
  }
}

.dt-pagintion-left {
  button[type='button'] {
    background: #49AFF5;
    /*box-shadow: 0 4px 6px 0 rgba(0,213,195,0.25);*/
    border-radius: 4px;
    border: 0;
    height: 32px;
    width: 32px;
    line-height: 32px;
    font-size: 16px;
    color: #FFF;
    border: none;
    outline: none; // min-width: 80px;
    cursor: pointer;
    vertical-align: top;
    margin-right: 8px;
  }

  span {
    display: inline-block;
    line-height: 32px;
    vertical-align: top;
    height: 32px;
    margin-right: 8px;
  }
  .dt-pag_line {
    height: 24px;
    width: 1px;
    background: #e7e6ea;
    margin: 4px 6px 0 6px;
  }
  .dt-pagition_input {
    width: 40px;

    input {
      width: 100%;
      height: 30px;
      border: 1px solid #e7e6ea;
      text-align: center;
      padding: 0 6px;
      outline: none
    }
  }
}
</style>
