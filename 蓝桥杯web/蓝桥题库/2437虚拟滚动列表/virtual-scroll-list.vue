<!-- 看不懂... -->
<!-- 
// emmm 性能问题?scrollTop频繁变化
// 我认为这个实现可以参考安卓的recyclerView
// 动态回收新增显示的列表
 -->
<template>
  <div id="virtual-list" class="virtual-list" @scroll="scrollPage($event)">
    <!-- 撑开virtual-list -->
    <div id="scroll-container" :style="{ height: totalHeight + 'px' }"></div>
    <!-- 添加ref方便一会操作list的位置 -->
    <ul id="list" class="list" ref="list">
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
      // 求可视区域开始下标
      this.start = parseInt(this.scrollTop / this.itemHeight)
      let beforeStart = this.start - 5 > 0 ? this.start - 5 : 0
      let afterEnd = this.start + 15 > this.list.length ? this.list.length : this.start + 15
      return [...this.list.slice(beforeStart, afterEnd)]
    }
  },
  watch: {
    start() {
      // 每次滚动时
      // 若滚去的区域小于等于5个item，则ul与scroll-container一同滚动
      // 若滚去的区域大于5个item，则需要保持10个item在可视区域内，即用top值将ul往下顶，顶去渲染开始前的item高度即可
      this.$refs['list'].style.top = (this.start - 4 > 0 ? this.start - 4 : 0) * this.itemHeight + 'px'
    }
  },
  methods: {
    // TODO: 完成事件处理
    scrollPage(e) {
      this.scrollTop = e.currentTarget.scrollTop
    }
  },
  async mounted() {
    // TODO: 完成数据请求
    let { data: res } = await axios.get('./data.json')
    this.list = res
    // 设置滚动最大高度
    this.totalHeight = res.length * this.itemHeight
  }
}
</script>
