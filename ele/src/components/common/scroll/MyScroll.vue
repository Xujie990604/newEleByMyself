<template>
  <div class="wrapper" ref="wrapper">
    <!-- 加入一个content， 可以直接在调用此组件的时候在组件内防止多个div -->
    <!-- 滚动的前提是content里面的内容超出wrapper的内容， 所以需要给wrapper一个限定的高， 这个高需要在父组件中被定义 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "MyScroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true,
    },
    /**
     * 列表依赖的数据
     */
    data: {
      type: Array,
      default: [],
    },
    /**
     * 0 不会派发scroll事件
     * 1 滚动的时候会派发scroll事件，非实时(屏幕滑动超过一定时间后)。
     * 2 会在屏幕滑动的过程中实时的派发 scroll 事件
     * 3 不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
    */
    probeType: {
      type: Number,
      default: 0
    }
    
  },
  watch: {
    data() {
      /**
       * 因为Vue是数据驱动的，Vue的数据发生变化到页面重新渲染是一个异步的过程
       * 由于在封装组件的时候做不到scroll组件的mounted在父组件的异步请求之后，所以特地由父组件传入data的值，来通知父组件的数据的变化
       * 因为页面渲染的过程是异步的， 所以必须要加上this.nextTick来保证scroll的refresh方法在DOM更新之后
       */
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
  },
  mounted() {
    //   初始化better-scroll插件
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: this.click,
      probeType: this.probeType
    });

    /**
     * 监听滚动事件
     * 传递参数为当前位置
    */
    if(this.probeType) {
        this.scroll.on('scroll', position => {
        this.$emit("scroll", position)
      })
    }

  },
  methods: {
    /**
     * 重新计算滚动依赖的DOM的大小
     */
    refresh() {
      //   加上了一层验证 在scroll存在的情况下才执行
      console.log("refresh");
      this.scroll && this.scroll.refresh();
    },
    /**
     * 滚动到指定的元素
     */
    scrollToElement(el, delay) {
      this.scroll && this.scroll.scrollToElement(el, delay)
    }
  },
};
</script>
