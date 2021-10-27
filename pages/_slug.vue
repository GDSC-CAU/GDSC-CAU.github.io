<template>
    <div class="related max-w-7xl mx-auto py-10 md:py-16">

        <h1 class="custom-text leading-snug md:leading-normal px-5 md:px-0 mb-2 text-2xl md:text-4xl text-center font-semibold text-gray-700 title">{{article.title}}</h1>
        <p class="text-base md:text-lg text-gray-500 text-center">{{article.datetime}} · by {{article.author}}</p>
        
        <nuxt-content :document="article" class="prose max-w-3xl custom-text px-6"/>

        <Prevnext :prev="prev" :next="next" />

    </div>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const article = await $content('blog', params.slug)
        .fetch();

        const [prev, next] = await $content('blog')
        .only(['title', 'slug'])
        .sortBy('datetime', 'desc')
        .surround(params.slug)
        .fetch()

        return { article, prev, next }
    }
}
</script>

<style scpoed>
.custom-text{
    word-break: keep-all;
}
</style>