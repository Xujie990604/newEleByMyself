<template>
  <div class="form-block">
      <!-- label -->
    <div class="label-wrap">{{label}}</div>
    <div class="input-group-wrap">
        <!-- input的输入框 -->
      <div class="input-wrap" @click="$emit('click')">
        <input
          v-if="!textarea"
          :type="type"
          :value="value"
          :placeholder="placeholder"
          @input="$emit('input',$event.target.value)"
        />
        <!-- 文本框 -->
        <textarea
          v-else
          :type="type"
          :value="value"
          :placeholder="placeholder"
          @input="$emit('input',$event.target.value)"
          rows="2"
          maxlength="100"
        ></textarea>
        <i v-if="icon" :class="'fa fa-' + icon"></i>
      </div>
      <!-- 标签 -->
       <tab-tag v-if="tags" :tags="tags" @checkTag="checkTag" :selectTag="sex" />
    </div>
  </div>
</template>

<script>
import TabTag from './TabTag.vue';
export default {
  name: "FromBlock",
  props: {
    type: {
      type: String,
      default: "text"
    },
    label: String, //标签名
    value: String, //value用于数据的双向绑定，调用组件时不用传这个值
    placeholder: String, 
    icon: String, //图标类型
    textarea: String, //是否显示多行文本
    tags: Array, //可选择的标签值数组
    sex:String //性别
  },
  methods: {
      checkTag(item) {
          this.$emit("checkSex",item)
      }
  },
  components: {
    TabTag
  }
};
</script>


<style scoped>
.form-block {
  /* border-top: 0.266667vw solid #eee; */
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.form-block .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}
.input-group-wrap {
  flex: 1;
}
.input-wrap {
  flex: 1 1 0;
  padding: 3.733333vw 0;
  display: flex;
  align-items: center;
}
.input-wrap input {
  outline: none;
  line-height: 4.8vw;
  color: #333;
  border: none;
  flex: 1;
  padding-right: 4vw;
  padding-left: 0;
  font-size: 0.9rem;
}

.input-wrap textarea {
  outline: none;
  font-size: 0.9rem;
  line-height: 4.8vw;
  color: #333;
  border: none;
  flex: 1;
  padding-right: 4vw;
  padding-left: 0;
}
.input-wrap i {
  margin-right: 3.2vw;
  color: rgb(102, 102, 102);
  font-size: 1.2rem;
}
</style>