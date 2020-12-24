<template>
    <div class="index">
        <keep-alive>
            <router-view />
        </keep-alive>
        <tabber :data="tabberData"></tabber>
    </div>
</template>

<script>
import Tabber from '../components/Tabber';
export default {
    name: 'Index',
    data() {
        return {
            tabberData: [
                {text: '首页', icon: 'icon-home', path: '/home'},
                {text: '订单', icon: 'icon-emaxcitygerenxinxitubiaoji03', path: '/order'},
                {text: '我的', icon: 'icon-me', path: '/me'},
            ]
        }
    },
    components: {
        Tabber
    }
}
</script>

<style scoped>
.index {
    width: 100%;
    height: calc(100% - 45px);
}

</style>