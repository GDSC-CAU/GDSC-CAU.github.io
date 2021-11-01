<template>
    <div>

        <div class="pt-52 pb-10 max-w-6xl mx-auto px-5">
            <div class="pb-6 poppins text-7xl font-medium text-gray-800">
                DevOps
            </div>
            <div class="font-normal text-xl text-gray-600">
                개발부터 배포까지의 프로세스 개선을 위한 글들이에요.
            </div>
        </div>

        <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 max-w-6xl mx-auto px-5 pb-16">
            <div class="group" v-for="article of articles" :key="article">
                <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
                    <div class="article-inner flex justify-between items-center border-t py-8 border-gray-600">
                    <div class="pr-4">
                        <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{article.category}} · {{article.author}} · {{ article.datetime }}</p>
                        <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-semibold poppins text-gray-800">{{ article.title }}</h2>
                        <p class=" text-sm md:text-base text-gray-600 custom-text">{{article.description}}</p>
                    </div>
                    <div class="pl-4 pr-6">
                        <ExternalLinkLogo />
                    </div>
                    </div>
                </nuxt-link>
            </div>
        </div>

    </div>

</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('blog', params.slug)
      .where({category: 'devops'})
      .only(['title', 'description', 'img', 'datetime', 'category', 'author', 'slug'])
      .sortBy('datetime', 'desc')
      .fetch();
    return {
      articles
    }
  }
}
</script>

<style scoped>
.keepall{
    word-break: keep-all;
}
</style>