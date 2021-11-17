<template>
    <div>

        <div class="pt-28 md:pt-52 pb-4 md:pb-14 max-w-6xl mx-auto px-6">
            <div class="pb-6 poppins text-3xl md:text-7xl font-medium text-gray-800">
                Projects
            </div>
        </div>

        <div class="max-w-6xl mx-auto text-base md:text-xl text-gray-600 flex justify-center pb-14 md:pb-24 px-6">
            <div class="text-center custom-text leading-5 md:leading-8">멤버 개인이 진행하는 프로젝트를 소개하는 공간입니다. <br class="hidden md:inline"> 관련 내용은 진행 상황에 따라 순차적으로 업로드 될 예정입니다.</div>
        </div>

    </div>
</template>

<script>
export default {

    head: {
        title: 'Projects',
        htmlAttrs: {
        lang: 'ko'
        },
        meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '중앙대학교 Google DSC 블로그입니다. 활동 관련 소식, 공부 내용 등을 주기적으로 업로드합니다.' },
        { name: 'format-detection', content: 'telephone=no' }
        ]
    },

}
</script>

<style scoped>
.custom-text{
    word-break: keep-all;
}
</style>