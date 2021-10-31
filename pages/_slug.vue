<template>
<div class="w-full bg-gray-50">
    <div class="related max-w-5xl mx-auto py-10 md:pb-24 md:pt-40">

        <div class="max-w-3xl mx-auto">
            <p class="custom-text leading-snug md:leading-normal px-5 md:px-0 mb-2 text-2xl md:text-5xl text-center text-gray-800 title font-semibold">{{article.title}}</p>
            <p class="text-base md:text-xl text-gray-500 text-center mb-16">{{article.category}} · {{article.datetime}} · by {{article.author}}</p>
        </div>

        <nuxt-content :document="article" class="prose max-w-5xl custom-text px-6"/>

        <Prevnext :prev="prev" :next="next" />

    </div>
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