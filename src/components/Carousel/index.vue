<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 01 引包
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler() {
        // 要将轮播图拆分为组件，所以将原本写在mounted中newe Swiper实例迁移到watch中，保证了代码风格的一致，便于组件的拆分
        //智能监听到数据已经有了，但是v-for动态渲染结构没办法确定，还是得用this.$nextTick
        this.$nextTick(() => {
          var swiper = new Swiper(this.$refs.cur, {
            loop: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            mousewheel: true,
            keyboard: true,
          });
        });
      },
    },
  },
};
</script>

<style>
</style>