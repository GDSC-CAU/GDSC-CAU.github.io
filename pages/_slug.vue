<template>
<div class="w-full bg-gray-50">
    <div class="related max-w-5xl mx-auto py-10 md:pb-24 md:pt-44">

        <div class="max-w-3xl mx-auto">
            <p class="text-base md:text-xl text-gray-400 text-center mb-2"><nuxt-link class="hover:underline" :to='`${article.category}`'>{{article.category}}</nuxt-link></p>
            <p class="custom-text leading-snug md:leading-normal px-5 md:px-0 mb-2 text-2xl md:text-5xl text-center text-gray-800 title font-semibold">{{article.title}}</p>
            <p class="text-base md:text-xl text-gray-500 text-center mb-16">
                {{formatDate(article.createdAt)}} · by
                <span v-for="memberAuthor of member" :key="memberAuthor"> <nuxt-link class="hover:underline" :to='`${memberAuthor.slug}`'>{{memberAuthor.name}}</nuxt-link></span>
            </p>
        </div>

        <nuxt-content :document="article" class="prose max-w-5xl custom-text px-6"/>

        <div class="max-w-6xl mx-auto px-5 flex justify-center py-20 pb-6">
            <div v-for="memberAuthor of member" :key="memberAuthor">
                <div class="box mb-6 mx-auto">
                    <img class="profile" :src="require(`~/assets/resources/profile/${memberAuthor.img}`)" alt="">
                </div>
                <div class="text-gray-800 text-2xl pb-3.5 font-medium flex justify-center poppins">{{memberAuthor.name}}</div>
                <div class="text-gray-500 pb-4 flex justify-center">{{memberAuthor.description}}</div>
                <div class="flex justify-center itmes-center">
                    <nuxt-link class="poppins text-blue-500 text-lg hover:underline" :to='`${memberAuthor.slug}`'>See More</nuxt-link>
                </div>
            </div>
        </div>

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
        .fetch();

        const authorName = article.author

        const member = await $content('members', params.id)
        .where({name: authorName})
        .fetch();

        return { article, prev, next, member, authorName }
    },
    methods: {
        formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('en', options)
        }
    }

}
</script>

<style scpoed>
img {
    margin-left: auto;
    margin-right: auto;
}
.custom-text{
    word-break: keep-all;
}
.box {
    width: 150px;
    height: 150px; 
    border-radius: 70%;
    overflow: hidden;
}
.profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>