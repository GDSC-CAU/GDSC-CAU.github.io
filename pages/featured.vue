<template>
    <div>
        <div class="pt-28 md:pt-52 pb-3 md:pb-10 max-w-6xl mx-auto px-6">
            <div class="pb-6 poppins text-3xl md:text-7xl font-medium text-gray-800">
                Featured Articles
            </div>
            <div class="font-normal text-base md:text-xl text-gray-600">
                꼭 읽어보셨으면 하는 아티클들만 모아봤어요.
            </div>
        </div>

        <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 pb-14 md:pb-24 max-w-6xl mx-auto px-6">
            <div class="group" v-for="ftarticle of featured" :key="ftarticle">
                <nuxt-link :to='`/articles/${article.slug}`'>
                    <div class="article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600">
                    <div class="pr-4">
                        <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{ftarticle.category}} · {{ftarticle.author}}</p>
                        <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-semibold poppins text-gray-800">{{ ftarticle.title }}</h2>
                        <p class=" text-sm md:text-base text-gray-600 custom-text">{{ftarticle.description}}</p>
                    </div>
                    <div class="pl-4 pr-6 hidden md:block">
                        <ExternalLinkLogo class="fill-current text-gray-400 group-hover:text-gray-700 transition duration-200" />
                    </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  async asyncData({ $content }) {
    const featured = await $content('articles')
      .where({featured: 'Featured'})
      .sortBy('createdAt', 'desc')
      .fetch();
    return {
      featured
    }
  },

    head: {
        title: 'Featured Articles',
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