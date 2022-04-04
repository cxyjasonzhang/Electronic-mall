<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: curIndex == index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级商品分类导航---用js控制其显示与隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: curIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入lodash 完整引入
// import _ from 'lodash';
//02-按需引入 推荐
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      curIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，向服务器发请求
  mounted() {
    //02-切换到搜索页面的时候，列表是不展示的
    // console.log("typenav挂载完毕");
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList.slice(0, 16),
    }),
  },
  methods: {
    // 鼠标进入事件 修改curIndex属性
    /* changeIndex(index) {
      // index:鼠标移上某一个一级分类的元素的索引值
      // 正常情况（用户慢慢的操作）:鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      // 非正常情况（用户操作很快)﹔本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发
      // 由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有大量回调，有可能出现卡顿现象
      this.curIndex = index;
    }, */
    // 使用节流方式
    changeIndex: throttle(function (index) {
      this.curIndex = index;
    }, 50),
    // 鼠标离开事件 修改curIndex属性
    leaveIndex() {
      this.curIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    goSearch(event) {
      //最好的解决方案:编程式导航＋事件委派
      //存在一些问题:事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点//点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
      //存在另外一个问题:即使你能确定点击的是a标签，如何区分是一级、二级、三级分类的标签。
      //第一个问题:把子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
      let Element = event.target;
      // console.log(Element.dataset); //Element.dataset可以获取标签的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        Element.dataset; //解构出来
      console.log(Element.dataset);
      // 判断是否有自定义属性，有的为a标签
      if (categoryname) {
        // 整理路由跳转参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 区分一级分类、二级、三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 先判断路径中是否有params参数
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理完毕
          location.query = query;
          // console.log(query);
          // console.log(location);
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
  },
};
</script>

<style lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .cur {
            background-color: skyblue;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
      }
    }
    //过渡动画的样式
    // 动画开始状态（进入）
    .sort-enter {
      height: 0px;
      // transform: rotate(0deg);
    }
    // 动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
      // transform: rotate(360deg);
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>