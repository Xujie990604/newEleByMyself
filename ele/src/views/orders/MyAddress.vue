<template>
    <div class="my-address">
      <my-header :isLeft="true" :title="title"  />
    </div>
</template>

<script>
import MyHeader from '../../components/common/header/MyHeader.vue';
export default {
    components: { MyHeader },
    name: 'MyAddress',
    data() {
        return {
            title: "我的地址"
        }
    },
    methods: {
       
    }
}
</script>


<style scoped>

</style>