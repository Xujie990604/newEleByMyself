<template>
    <div class="Rating-gray">
        <i class="fa" :class="item" v-for="(item,index) in itemClasses" :key="index"></i>
    </div>
</template>

<script>
// 星星长度
const LENGTH = 5;
// 星星对应的class
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star-o";
export default {
    name:'Rating',
    computed: {
        itemClasses() {
            // 数组存储类名
            let result = [];

            // 对分数进行处理，向下取0.5的倍数
            // js没有四舍五入，但是可以先乘以2，向下取整，在除以二
            let score = Math.floor(this.rating * 2) / 2;
            // 控制半星
            let hasDecimal = score % 1 !== 0;
            // 全星
            let integer = Math.floor(score);

            // 把全星放到数组里
            for (let index = 0; index < integer; index++) {
                result.push(CLS_ON);
            }

            // 半星
            if(hasDecimal) {
                result.push(CLS_HALF);
            }

            // 补齐
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }

            return result;
        }
    },
    props: {
        rating:Number
    }
}
</script>

<style scoped>
.Rating-gray {
    margin-right: 1.066667vw;
    color: #ffbe00;
    display: inline-block;
}
</style>