<template>
    <div>
        <div class="pt-28 md:pt-52 pb-0 md:pb-10 max-w-6xl mx-auto px-6">
            <div class="pb-8 poppins text-3xl md:text-7xl font-medium text-gray-800">
                Categories
            </div>
        </div>

        <Category />

    </div>
</template>

<script>
    export default {

        head: {
            title: 'Categories',
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

</style>