<template>
  <div class="input-group">
    <div class="input">
      <input
        :class="{ error: error }"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <button v-if="btnTitle" :disabled="!requestCode"  class="btn" @click="$emit('btn-click')">
        {{ btnTitle }}
      </button>
    </div>
    <p class="errorText">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "InputGroup",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "请输入信息",
    },
    value: String,
    error: {
      type: String,
      default: "",
    },
    btnTitle: String,
    requestCode: Boolean,
  }
};
</script>

<style scoped>
.input {
  position: relative;
}

input {
  padding: 15px 30px;
  width: 70%;
  border-radius: 5px;
  border: #f1f1f1 1px solid;
}

/* 如果传过来错误信息的话。表单会有红色的框 */
input.error {
  border: red solid 1px;
}

.input .btn {
  position: absolute;
  top: 12px;
  right: 15%;
}

.errorText {
    color: red;
    padding-left: 40px;
    margin-top: 10px;
    text-align: left;
}
</style>