<template>
  <div class="pagination">
    <!-- 点击触发自定义事件并传入参数 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <!-- 上层结构 -->
    <button
      v-if="startAndEnd.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startAndEnd.start > 2">···</button>

    <span v-for="(page, index) in startAndEnd.end" :key="index">
      <button
        v-if="page >= startAndEnd.start"
        @click="$emit('getPageNo', page)"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </span>

    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="startAndEnd.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEnd() {
      // 解构
      const { pageNo, totalPage, continues } = this;
      let start = 0,
        end = 0;
      // 第一种情况 continues大于totalPage
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 总页数大于continue
        start = pageNo - parseInt(continues / 2); //向下取整
        end = pageNo + parseInt(continues / 2);
        // 还得考虑特殊情况：如：pageNo为1、2、3或pageNo为接近于totalPage的情况
        // 这样会导致上面start值或end值计算出为负值或0的情况
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  //页码样式
  .active {
    background-color: skyblue;
  }
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>