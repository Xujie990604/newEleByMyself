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
        :requestCode="requestCode"
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
        <button :disabled="canNotLogin" @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroup";
// 因为无法设置跨域。所以不能使用axios的二次封装。
// import { getCode, loginBtn } from "../network/login";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      code: "",
      error: {}, //错误信息
      btnTitle: "获取验证码",
      requestCode: true, //请求验证吗按钮是否禁用
    };
  },
  computed: {
    // 只有在手机号和验证码表达内都有值的话，登录按钮才能使用
    canNotLogin() {
      if (this.phone && this.code) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {},
  methods: {
    // 获取验证码
    btnClick() {
      this.error = {};
      if (this.verificationPhone()) {
        // 发送axios请求
        this.$axios
          .post("api/posts/sms_send", {
            phone: this.phone,
          })
          .then((res) => {
            console.log(res);
            this.countdown();
          })
          .catch((err) => {
            console.log(err);
            this.$set(this.error, "code", "验证码获取失败");
          });
      }
    },
    // 倒计时的函数
    countdown() {
      let restTime = 30;
      this.requestCode = false;
      this.btnTitle = restTime + "秒之后重试";
      const time = setInterval(() => {
        if (restTime == 0) {
          clearInterval(time);
          this.btnTitle = "点击获取验证码";
          this.requestCode = true;
        } else {
          restTime--;
          this.btnTitle = restTime + "秒之后重试";
        }
      }, 1000);
    },
    // 登录
    login() {
      this.error = {};
      if (this.verificationPhone()) {
        this.$axios
          .post("api/posts/sms_back", {
            phone: this.phone,
            code: this.code,
          })
          .then((res) => {
            console.log(res);
            localStorage.setItem("login", true);
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
            this.$set(this.error, "code", "验证码有误");
          });
      }
    },
    // 验证手机号码
    verificationPhone() {
      if (!this.phone) {
        this.$set(this.error, "phone", "手机号不能为空");
      } else if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        this.$set(this.error, "phone", "手机号格式错误");
      } else {
        return true;
      }
    },
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
