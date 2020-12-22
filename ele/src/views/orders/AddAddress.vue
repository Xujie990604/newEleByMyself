<template>
  <div class="add-address">
    <!-- header部分 -->
    <my-header :isLeft="true" :title="title" />

    <!-- 添加地址 -->
    <div class="view-body">
      <div class="content">
        <form-block
          label="联系人"
          placeholder="姓名"
          :tags="sexs"
          @checkSex="checkSex"
          :sex="addressInfo.sex"
          v-model="addressInfo.name"
        />
        <form-block
          label="电话"
          placeholder="手机号码"
          v-model="addressInfo.phone"
        />
        <form-block
          label="地址"
          placeholder="小区/写字楼/学校等"
          icon="angle-right"
          @click="showSearch = true"
          v-model="addressInfo.address"
        />
        <form-block
          label="门牌号"
          placeholder="10号楼5单元404"
          icon="edit"
          textarea="textarea"
          v-model="addressInfo.bottom"
        />
        <div class="form-block">
          <div class="label-wrap">标签</div>
          <tab-tag
            :tags="tags"
            @checkTag="checkTag"
            :selectTag="addressInfo.tag"
          />
        </div>
      </div>
      <!-- 确定的按钮 -->
      <div class="form-button-wrap">
        <button class="form-button" @click="handleSave">确定</button>
      </div>
    </div>

    <!-- 搜索地址 -->
    <address-search
      :showSearch="showSearch"
      @close="showSearch = false"
      :addressInfo="addressInfo"
    />
  </div>
</template>

<script>
import MyHeader from "../../components/common/header/MyHeader.vue";
import AddressSearch from "../../components/orders/AddressSearch.vue";
import FormBlock from "../../components/orders/FormBlock.vue";
import TabTag from "../../components/orders/TabTag.vue";

import { Toast } from "mint-ui"; //mint ui的弹窗提示功能

export default {
  components: { MyHeader, FormBlock, TabTag, AddressSearch },
  name: "AddAddress",
  data() {
    return {
      title: "添加地址",
      tags: ["家", "学校", "公司"],
      sexs: ["先生", "女士"],
      addressInfo: {
        //用户输入的地址信息
        tag: "",
        sex: "",
        address: "",
        name: "",
        phone: "",
        bottom: "",
      },
      showSearch: false, //控制地址搜索部分的显示
    };
  },
  methods: {
    // 选择家，公司， 学校的标签
    checkTag(item) {
      this.addressInfo.tag = item;
    },
    // 选择性别的标签
    checkSex(item) {
      this.addressInfo.sex = item;
    },
    // 点击确认按钮
    handleSave() {
      // 如果没有对应的信息就会弹窗提示
      if (!this.addressInfo.name) {
        this.showMsg("请输入姓名");
        return;
      }

      if (!this.addressInfo.phone) {
        this.showMsg("请输入手机号");
        return;
      }

      if (!this.addressInfo.address) {
        this.showMsg("请输入地址");
        return;
      }

      // 存储数据的方法
      this.addAddress()
    },
    // 提示信息
    showMsg(msg) {
      Toast({
        message: msg,
        position: "bottom",
        duration: 2000,
      });
    },
    // 把用户填写的正确的地址信息添加到后台的数据库中
    addAddress() {
      this.$axios.post(`api/user/add_address/${localStorage.login}`, this.addressInfo)
      .then((result) => {
        // 添加成功跳转到路由 myAddress
        this.$router.push("/myAddress")
      }).catch((err) => {
        console.log(err);
      });
    }
  },
};
</script>

<style scoped>
.add-address {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.view-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}

.form-block {
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
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>
