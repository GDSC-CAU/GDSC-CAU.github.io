<template>
<div class="w-full bg-gray-50">
  <div class="pt-16">

<!-- 메인 문구 -->

    <div class="hidden md:block pt-36 pb-10 max-w-6xl mx-auto px-5">
      <div class="pb-6 poppins text-center md:text-left text-7xl font-medium text-gray-800">
        Study N' Share
      </div>
      <div class="font-normal text-xl text-gray-600">
        오늘 얻은 지식, 오늘 저지른 실수, 오늘 발견한 꼼수까지. <br> 혼자만의 성장에 그치지 않는 커뮤니티의 성장을 지향합니다.
      </div>
    </div>

<!-- 추천 아티클 (후에 carousel화?) -->

    <div class="pt-16 flex justify-between items-center max-w-6xl mx-auto px-5">
        <div class="text-3xl md:text-4xl text-gray-800 font-medium poppins">Featured Articles</div>
        <nuxt-link to="featured">
          <div class="hidden md:block text-base text-blue-500 poppins hover:underline">See All Featured Articles</div>
          <div class="md:hidden text-base text-blue-500 poppins">More</div>
        </nuxt-link>
    </div>

    <div class="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-x-5 pt-8">
      <div v-for="ftarticle of featured" :key="ftarticle" class="hidden md:block nthz">
        <nuxt-link :to="{ name: 'slug', params: { slug: ftarticle.slug } }">
          <div class="h-96 custom-radius">
            <div class="h-3/5 flex items-center justify-center">
              <div class="featbox">
                <img class="featimg" :src="require(`~/assets/resources/thumbnails/${ftarticle.img}`)" alt="">
              </div>
            </div>
            <div class="bg-white bg-opacity-75 h-2/5 p-5 z-30">
              <p class="mb-1 md:mb-1 text-sm md:text-sm text-gray-500">{{ftarticle.category}}</p>
              <h3 class="text-gray-800 poppins text-lg font-medium keepall mb-1">{{ ftarticle.title }}</h3>
              <p class="text-sm md:text-sm text-gray-500">{{ftarticle.author}}</p>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div v-for="ftarticle of featured" :key="ftarticle" class="md:hidden">
        <nuxt-link :to="{ name: 'slug', params: { slug: ftarticle.slug } }">
          <div class="">
              <div class="featbox">
                <img class="featimg" :src="require(`~/assets/resources/thumbnails/${ftarticle.img}`)" alt="">
              </div>
              <p class="mb-1 md:mb-1 text-sm md:text-sm text-gray-500">{{ftarticle.category}}</p>
              <h3 class="text-gray-800 poppins text-lg font-medium keepall mb-1">{{ ftarticle.title }}</h3>
              <p class="text-sm md:text-sm text-gray-500">{{ftarticle.author}}</p>
          </div>
        </nuxt-link>
      </div>
    </div>

<!-- 최신 아티클 -->

    <div class="mt-24 mb-10 flex justify-between items-center max-w-6xl mx-auto px-5">
        <div class="text-3xl md:text-4xl text-gray-800 font-medium poppins">Latest Articles</div>
        <nuxt-link to="all-articles">
          <div class="text-base text-blue-500 poppins hover:underline">See All Articles</div>
        </nuxt-link>
    </div>

    <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 max-w-6xl mx-auto px-5">
        <div class="group" v-for="article of articles" :key="article">
            <nuxt-link :to="{ name: 'slug', params: { slug: article.slug } }">
                <div class="article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600">
                  <div class="pr-4">
                      <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{article.category}} · {{article.author}}</p>
                      <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800">{{ article.title }}</h2>
                      <p class=" text-sm md:text-base text-gray-600 custom-text">{{article.description}}</p>
                  </div>
                  <div class="pl-4 pr-6 hidden md:block">
                    <ExternalLinkLogo />
                  </div>
                </div>
            </nuxt-link>
        </div>
    </div>

<!-- 카테고리 -->

    <div class="mt-20 pb-10 flex justify-between items-center max-w-6xl mx-auto px-5">
        <div class="text-3xl md:text-4xl text-gray-800 font-medium poppins">Categories</div>
    </div>

    <Category />

  </div>
</div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('blog', params.slug)
      .only(['title', 'description', 'img', 'datetime', 'category', 'author', 'slug'])
      .sortBy('createdAt', 'desc')
      .limit(5)
      .fetch();
    const featured = await $content('blog', params.slug)
      .where({featured: 'Featured'})
      .only(['title', 'description', 'img', 'datetime', 'category', 'author', 'slug'])
      .sortBy('createdAt', 'desc')
      .limit(3)
      .fetch();
    return {
      articles,
      featured
    }
  },
    methods: {
        formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('en', options)
        }
    }
}
</script>

<style scoped>
.nthz:nth-child(1){
  background-color: #FBBF25;
  border-radius: 0.6rem;
}
.nthz:nth-child(2){
  background-color: #11BA81;
  border-radius: 0.6rem;
}
.nthz:nth-child(3){
  background-color: #3C82F6;
  border-radius: 0.6rem;
}
.keepall{
    word-break: keep-all;
}
.bw{
  border: solid 1.8px #1f2937 ;
}
.featbox {
    width: 230px;
    height: 160px; 
    border-radius: 5%;
    overflow: hidden;
}
.featimg {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
