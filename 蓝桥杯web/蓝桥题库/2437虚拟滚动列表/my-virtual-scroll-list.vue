<!-- 能用就行() -->
<template>
  <div id="virtual-list" class="virtual-list">
    <div id="scroll-container" :style="{ height: totalHeight + 'px' }"></div>
    <ul id="list" class="list" @mousewheel="wheelFunc" :style="'overflow:hidden;;; '">
      <li v-for="item in showingList" :key="item" :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style>
.virtual-list {
  position: relative;
  width: 360px;
  height: 600px;
  border: 1px solid;
  overflow-y: auto;
  border-radius: 2px;
  display: inline-block;
}

.list {
  position: absolute;
  list-style: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
}
.list li {
  width: 100%;
  padding: 0 10px;
  background-color: #cde3cb;
}
.list li:not(:last-of-type) {
  border-bottom: 2px solid #768b74;
}
</style>

<script>
module.exports = {
  data() {
    return {
      itemHeight: 60, // 每个列表项的高度，请勿更改
      length: 10, // 列表项可视范围内的个数，请勿更改
      buffer: 5, // 列表项可视范围外，
      // 防止出现白屏的 buffer 个数，上方 5 个，下方 5 个，可作为优化项实现
      list: [],
      totalHeight: 0,
      scrollTop: 0,
      start: 0
    }
  },
  computed: {
    showingList() {
      // return this.list.slice(-this.scrollTop, -this.scrollTop + this.length)

      return this.list.slice(-this.scrollTop, -this.scrollTop + this.length)
    }
  },
  methods: {
    // TODO: 完成事件处理
    wheelFunc(e) {
      if (e.wheelDelta > 0) {
        if (this.scrollTop < 0) this.scrollTop++
        return
      }
      this.scrollTop--
    }
  },
  mounted() {
    // TODO: 完成数据请求
    axios.get('./data.json').then(res => {
      // console.log(res.data)
      this.list = res.data
    })
  }
}
</script>
