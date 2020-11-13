<template>
  <div class="login">
    <div class="logo">
      <!-- 在DOM的src中使用别名的时候需要加上~ -->
      <img src="~@/assets/logo.jpg" alt="ele_logo" />
      <!-- 手机号输入框 -->
      <input-group
        class="input-phone"
        type="number"
        placeholder="手机号"
        v-model="phone"
        :error="error.phone"
        :btnTitle="btnTitle"
        @btn-click="btnClick"
      />
      <!-- 验证码输入框 -->
      <input-group 
        class="input-code"
        type="number"
        placeholder="验证码"
        v-model="code"
        :error="error.code"
      />

      <!-- 用户登录协议 -->
      <div class="login-des">
        <p>新用户登录即自动注册，表示已同意<span>《用户服务协议》</span></p>
      </div>

      <!-- 登陆按钮 -->
      <div class="login-btn">
        <button :disabled="canNotLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroup";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      code: "",
      error: {
      },
      btnTitle: '获取验证码',
    };
  },
  computed: {
    canNotLogin() {
      if(this.phone && this.code) {
        return false;
      } else {
        return true;
      }
    }

  },
  methods: {
      btnClick() {
          console.log('获取验证码');
      }
  },
  components: {
    InputGroup,
  },
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #fff;
}

.login img {
  width: 160px;
  margin-top: 50px;
}

.input-group {
  margin-top: 50px;
}

.input-code {
  margin-top: 20px;
}

.login-des {
  width: 86%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 40px;
  color: #aaa;
  line-height: 22px;
}

.login-des span {
  color: #4d90fe;
}

.login-btn button {
  width: 86%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}

.login-btn button[disabled] {
  background-color: #8bda81;
}
</style>