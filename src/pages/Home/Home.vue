<template>
  <div>
    <!-- 三级联动 -->
    <TypeNav></TypeNav>
    <List />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor这个组件在其组件中没有自己请求数据，数据是父组件给的 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 引入组件
import List from "@/pages/Home/List";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    List,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action，通过vuex发送ajax请求，将数据存到home仓库中
    this.$store.dispatch("getFloorList");
    // 当登录跳转到首页时
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>