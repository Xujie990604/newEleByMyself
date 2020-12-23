<template>
  <div class="my-address">
    <!-- 顶部的header -->
    <my-header :isLeft="true" :title="title" />
    <!-- 地址信息的展示 -->
    <div class="address-view">
      <div
        class="address-card"
        v-for="(address, index) in allAddress"
        :key="index"
      >
        <!-- 是否被选中的图标显示 -->
        <div class="address-card-select">
          <i class="fa fa-check-circle" v-if="selectIndex == index"></i>
        </div>

        <!-- 卡片的显示信息的主题 -->
        <div class="address-card-body" @click="setAddressInfo(address, index)">
          <p class="address-card-title">
            <span class="username">{{ address.name }}</span>
            <span class="gender" v-if="address.sex">{{ address.sex }}</span>
            <span class="phone">{{ address.phone }}</span>
          </p>
          <p class="address-card-address">
            <span class="tag" v-if="address.tag">{{ address.tag }}</span>
            <span class="address-text">{{ address.address }}</span>
          </p>
        </div>

        <!-- 关于地址的编辑的按钮 -->
        <div class="address-card-edit">
          <i class="fa fa-edit" @click="handleEdit(address)"></i>
          <i class="fa fa-close" @click="handleDelete(address, index)"></i>
        </div>
      </div>
    </div>
    <!-- 新增收货地址 -->
    <div class="address-view-bottom" @click="addAddress">
      <i class="fa fa-plus-circle"></i>
      <span>新增收货地址</span>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/common/header/MyHeader.vue";
export default {
  components: { MyHeader },
  name: "MyAddress",
  data() {
    return {
      title: "我的地址",
      allAddress: [], //所有的用户的地址
      selectIndex: 0,
    };
  },
  // 每次在路由跳转之前 都会触发 路由钩子函数
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData();
    });
  },
  methods: {
    // 获取用户保存的地址数据
    getData() {
      this.$axios(`api/user/user_info/${localStorage.login}`)
        .then((res) => {
          this.allAddress = res.data.myAddress;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 确认选用的地址
    setAddressInfo(address, index) {
        this.selectIndex = index;
        this.$store.dispatch("setUserInfo", address);
        this.$router.push('/settleMent')
    },
    // 编辑地址
    handleEdit(address) {
        this.$router.push({
            path: '/addAddress',
            query:  {
                // 因为传递的参数是一个对象所以要使用方法，把对象变成字符串
                address: JSON.stringify(address),
                title: "编辑地址"
            }
        })
    },
    // 删除地址
    handleDelete(address, index) {
        this.$axios
        .delete(`/api/user/address/${localStorage.login}/${address._id}`)
        .then(res => this.allAddress.splice(index, 1))
        .catch(err => console.log(err));
    },
    // 新添加地址
    addAddress() {
        this.$router.push({
          path: '/addAddress',
          query: {
            title: '添加地址',
            address: JSON.stringify({
              name: '',
              sex: '',
              phone: '',
              address: '',
              bottom: '',
              tag: ''
            })
          }
        })
    }
  },
};
</script>

<style scoped>
.my-address {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}

.address-view-bottom {
  position: fixed;
  height: 13.866667vw;
  bottom: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.266667vw solid #ddd;
  color: #3190e8;
  font-size: 1rem;
}
.address-view-bottom > i {
  font-size: 1.3rem;
  margin-right: 8px;
}
.address-view {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 13.866667vw;
}
.address-card {
  background-color: #fff;
  padding: 4vw;
  border-bottom: 1px solid #ddd;
  display: flex;
  min-height: 18.133333vw;
}
.address-card-body {
  flex: 1;
  overflow: hidden;
}
.address-card-title {
  font-size: 1rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 1.066667vw;
}
.address-card-title .username {
  color: #333;
  font-weight: 700;
}
.address-card-title .gender {
  padding: 0 1.6vw 0 0.8vw;
}
.address-card-address {
  color: #666;
  font-size: 0.84rem;
  display: flex;
  align-items: center;
}
.address-card-address .tag {
  display: inline-block;
  position: relative;
  margin-right: 0.8vw;
  padding: 0.533333vw;
  color: #ff5722;
  white-space: nowrap;
  border: 1px solid #ff5722;
  border-radius: 0.133333vw;
  font-size: 0.6rem !important;
  line-height: 2.666667vw;
}
.address-text {
  line-height: 4.533333vw;
}

/* 编辑和删除 */
.address-card-edit {
  flex-basis: 13.066667vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.address-card-edit > i {
  color: #aaa;
  font-size: 1.2rem;
}

/*  选中图标 */
.address-card-select {
  flex-basis: 7.333333vw;
  min-width: 7.333333vw;
  display: flex;
  align-items: center;
}
.address-card-select > i {
  font-size: 1.5rem;
  color: #4cd964;
}
</style>
