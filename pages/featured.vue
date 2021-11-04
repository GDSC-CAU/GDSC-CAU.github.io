<template>
    <div>
        <div class="pt-52 pb-10 max-w-6xl mx-auto px-5">
            <div class="pb-6 poppins text-7xl font-medium text-gray-800">
                Featured Articles
            </div>
            <div class="font-normal text-xl text-gray-600">
                꼭 읽어보셨으면 하는 아티클들만 모아봤어요.
            </div>
        </div>

        <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 pb-16 max-w-6xl mx-auto px-5">
            <div class="group" v-for="ftarticle of featured" :key="ftarticle">
                <nuxt-link :to="{ name: 'slug', params: { slug: ftarticle.slug } }">
                    <div class="article-inner flex justify-between items-center border-t py-8 border-gray-600">
                    <div class="pr-4">
                        <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{ftarticle.category}} · {{ftarticle.author}}</p>
                        <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-semibold poppins text-gray-800">{{ ftarticle.title }}</h2>
                        <p class=" text-sm md:text-base text-gray-600 custom-text">{{ftarticle.description}}</p>
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
    const featured = await $content('blog', params.slug)
      .where({featured: 'Featured'})
      .only(['title', 'description', 'img', 'datetime', 'category', 'author', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch();
    return {
      featured
    }
  }
}
</script>

<style scoped>

</style>