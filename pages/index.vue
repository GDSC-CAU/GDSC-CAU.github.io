<template>
  <div class="max-w-7xl mx-auto">

    <div class="pt-44 pb-10">
      <div class="pb-6 poppins text-7xl font-medium text-gray-800">
        Study N' Share
      </div>
      <div class="font-normal text-xl text-gray-600">
        오늘 얻은 지식, 오늘 저지른 실수, 오늘 발견한 꼼수까지. <br> 혼자만의 성장에 그치지 않는 커뮤니티의 성장을 지향합니다.
      </div>
    </div>

    <div class="pt-16 flex justify-between items-center">
        <div class="text-4xl text-gray-800 font-medium poppins">Featured Articles</div>
        <div class="text-base text-blue-500 poppins">See All Featured Articles</div>
    </div>

    <div class="pt-8 grid grid-cols-3 h-96">
      <div class="rounded-xl bg-yellow-400">
        <div class="h-3/5">

        </div>
        <div class="bg-white bg-opacity-75 h-2/5 p-5">
          지식
        </div>
      </div>
      <div class="ml-5 rounded-xl bg-green-500">
        <div class="h-3/5">

        </div>
        <div class="bg-white bg-opacity-75 h-2/5 p-5">
          실수
        </div>
      </div>
      <div class="ml-5 rounded-xl bg-blue-500">
        <div class="h-3/5">

        </div>
        <div class="bg-white bg-opacity-75 h-2/5 p-5">
          꼼수
        </div>
      </div>
    </div>

    <div class="mt-24 mb-10 text-4xl text-gray-800 font-medium poppins">Latest Articles</div>

    <div class="max-w-7xl grid grid-cols-1 colspan mt-5 md:mt-8 mb-8 md:mb-12">
        <div class="group" v-for="article of articles" :key="article">
            <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
                <div class="article-inner flex justify-between items-center border-t py-8 border-gray-600">
                  <div class="pr-4">
                      <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{article.category}} · {{article.author}} · {{ article.datetime }}</p>
                      <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-semibold poppins text-gray-800">{{ article.title }}</h2>
                      <p class=" text-sm md:text-base text-gray-600 custom-text">{{article.description}}</p>
                  </div>
                  <div class="pr-6">
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
      .only(['title', 'description', 'img', 'datetime', 'category', 'author', 'slug'])
      // .sortBy('createdAt', 'asc')
      .sortBy('datetime', 'desc')
      .fetch();
    return {
      articles
    }
  }
}
</script>

<style scoped>
/* .colspan:nth-child(odd){
  grid-column: 1/3;
}
.colspan:nth-child(even){
  grid-column: 2/3;
} */
</style>
