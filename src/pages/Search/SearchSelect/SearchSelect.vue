<template>
  <div class="clearfix selector">
    <!-- 品牌 -->
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li
            v-for="trade in trademarkList"
            :key="trade.tmId"
            @click="trademarkHandler(trade)"
          >
            {{ trade.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li
            v-for="(item, index) in attr.attrValueList"
            :key="index"
            @click="getAttrList(attr, item)"
          >
            <a>{{ item }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Searchselect",
  computed: {
    ...mapGetters(["trademarkList", "attrsList"]),
  },
  methods: {
    trademarkHandler(trade) {
      this.$emit("trademarkInfo", trade);
    },
    getAttrList(attr, item) {
      // 子组件向父组件传递数据
      this.$emit("getAttrInfo", attr, item);
    },
  },
};
</script>

<style>
</style>