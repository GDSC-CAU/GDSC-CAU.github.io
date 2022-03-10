<template>
<div class="w-full bg-gray-50">
  <div class="pt-16">

<!-- 메인 문구 -->

    <div class="pt-14 md:pt-36 pb-0 md:pb-10 max-w-6xl mx-auto px-6">
      <div class="pb-6 poppins text-left md:text-left text-5xl md:text-7xl font-medium text-gray-800">
        Study N' Share
      </div>
      <div class="font-normal text-base md:text-xl text-gray-600 keepall">
        오늘 얻은 지식, 오늘 저지른 실수, 오늘 발견한 꼼수까지. <br class="hidden md:inline"> 혼자만의 성장에 그치지 않는 커뮤니티의 성장을 지향합니다.
      </div>
    </div>

<!-- 추천 아티클 (후에 carousel화?) -->

    <div class="pt-14 md:pt-16 flex justify-between items-center max-w-6xl mx-auto px-6">
        <div class="hidden md:block text-4xl text-gray-800 font-medium poppins">Featured Articles</div>
        <div class="block md:hidden text-3xl text-gray-800 font-medium poppins">Featured Article</div>
        <nuxt-link to="featured">
          <div class="hidden md:block text-base text-blue-500 poppins hover:underline">See All Featured Articles</div>
          <div class="md:hidden text-base text-blue-500 poppins hidden md:block">More</div>
        </nuxt-link>
    </div>

    <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-6 md:gap-y-0 pt-10">

      <div v-for="ftarticle of featured" :key="ftarticle" class="nthz hidden md:block">
        <!-- <nuxt-link :to="{ name: 'slug', params: { slug: ftarticle.slug } }"> -->
        <nuxt-link :to='`/articles/${ftarticle.slug}`'>
          <div class="h-72 md:h-96 custom-radius group">
            <div class="h-3/5 flex items-center justify-center">
              <div class="featbox">
                <img class="featimg" :src="require(`~/assets/resources/thumbnails/${ftarticle.img}`)" alt="">
              </div>
            </div>
            <div class="bg-white bg-opacity-75 group-hover:bg-opacity-50 transition duration-200 h-2/5 p-5 z-30">
              <p class="mb-1 md:mb-1 text-sm md:text-sm text-gray-500">{{ftarticle.category}}</p>
              <h3 class="text-gray-800 poppins text-lg font-medium keepall mb-1">{{ ftarticle.title }}</h3>
              <p class="text-sm md:text-sm text-gray-500">{{ftarticle.author}}</p>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div v-for="featarticle of featuredone" :key="featarticle" class="block md:hidden">
        <!-- <nuxt-link :to="{ name: 'slug', params: { slug: featarticle.slug } }"> -->
        <nuxt-link :to='`/articles/${featarticle.slug}`'>
          <div class="back-yellow rounded-lg h-52 py-5 px-6 relative">
            <div>
              <p class="poppins text-gray-800">{{featarticle.category}}</p>
              <p class="text-xl poppins text-gray-800 font-medium pt-1">{{featarticle.title}}</p>
              <p class="poppins text-gray-600 pt-1 ftmore">{{featarticle.description}}</p>
            </div>
            <div class="absolute bottom-0 pb-5">
              <p class="poppins text-gray-800 group-hover:underline">See More</p>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div class="flex justify-center pt-0.5 block md:hidden">
        <nuxt-link to="featured" class="poppins text-blue-500 text-center text-sm">
            More Featured Articles
          </nuxt-link>
      </div>

    </div>

<!-- 검색  -->

    <div class="mt-14 md:mt-24 mb-5 md:mb-8 flex justify-between items-center max-w-6xl mx-auto px-6">
        <div class="text-3xl md:text-4xl text-gray-800 font-medium poppins">Search Articles</div>
    </div>

    <Search />


<!-- 최신 아티클 -->

    <div class="mt-14 md:mt-24 mb-6 md:mb-10 flex justify-between items-center max-w-6xl mx-auto px-6">
        <div class="text-3xl md:text-4xl text-gray-800 font-medium poppins">Latest Articles</div>
        <nuxt-link to="/articles">
          <div class="text-base text-blue-500 poppins hover:underline hidden md:block">See All Articles</div>
        </nuxt-link>
    </div>

    <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 max-w-6xl mx-auto px-6">
        <div class="group" v-for="article of articles" :key="article">
            <nuxt-link :to='`/articles/${article.slug}`'>
                <div class="article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600">
                  <div class="pr-4">
                      <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{article.category}} · {{article.author}}</p>
                      <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800">{{ article.title }}</h2>
                      <p class=" text-sm md:text-base text-gray-600 custom-text">{{article.description}}</p>
                  </div>
                  <div class="pl-4 pr-6 hidden md:block">
                    <ExternalLinkLogo class="fill-current text-gray-400 group-hover:text-gray-700 transition duration-200" />
                  </div>
                </div>
            </nuxt-link>
        </div>

        <div class="flex justify-center pt-1 block md:hidden">
          <nuxt-link to="/articles" class="poppins text-blue-500 text-center text-sm">
            See All Articles
          </nuxt-link>
        </div>
    </div>

<!-- 최신 프로젝트 -->

    <div class="mt-14 md:mt-24 mb-6 md:mb-10 flex justify-between items-center max-w-6xl mx-auto px-6">
        <div class="text-3xl md:text-4xl text-gray-800 font-medium poppins">Latest Projects</div>
        <nuxt-link to="/projects">
          <div class="text-base text-blue-500 poppins hover:underline hidden md:block">See All Projects</div>
        </nuxt-link>
    </div>

    <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 max-w-6xl mx-auto px-6 pb-16 md:pb-28">
        <div class="group" v-for="article of proArticles" :key="article">
            <nuxt-link :to='`/projects/${article.slug}`'>
                <div class="article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600">
                  <div class="pr-4">
                      <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{article.author}}</p>
                      <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800">{{ article.title }}</h2>
                      <p class=" text-sm md:text-base text-gray-600 custom-text">{{article.description}}</p>
                  </div>
                  <div class="pl-4 pr-6 hidden md:block">
                    <ExternalLinkLogo class="fill-current text-gray-400 group-hover:text-gray-700 transition duration-200" />
                  </div>
                </div>
            </nuxt-link>
        </div>

        <div class="flex justify-center pt-1 block md:hidden">
          <nuxt-link to="/projects" class="poppins text-blue-500 text-center text-sm">
            See All Projects
          </nuxt-link>
        </div>
    </div>

<!-- 카테고리 -->

    <!-- <div class="mt-10 md:mt-20 pb-7 md:pb-10 flex justify-between items-center max-w-6xl mx-auto px-6">
        <div class="text-3xl md:text-4xl text-gray-800 font-medium poppins">Categories</div>
    </div>

    <Category /> -->

  </div>
</div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .sortBy('createdAt', 'desc')
      .limit(5)
      .fetch();
    const proArticles = await $content('projects')
      .sortBy('createdAt', 'desc')
      .limit(5)
      .fetch();
    const featured = await $content('articles')
      .where({featured: 'Featured'})
      .sortBy('createdAt', 'desc')
      .limit(3)
      .fetch();
    const featuredone = await $content('articles')
      .where({featured: 'Featured'})
      .sortBy('createdAt', 'desc')
      .limit(1)
      .fetch();
    return {
      articles,
      featured,
      featuredone,
      proArticles
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
    width: 250px;
    height: 160px; 
    border-radius: 5%;
    overflow: hidden;
}
.featboxalt {
    width: auto;
    height: 230px; 
    border-radius: 0%;
    overflow: hidden;
}
.featimg {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.back-yellow{
    background-color: #FBBF25;
}
.ftmore{
  font-size: 0.92rem;
}
</style>
