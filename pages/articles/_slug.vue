<template>
<div class="w-full bg-gray-50">
    <div class="related max-w-5xl mx-auto pt-28 pb-12 md:pb-24 md:pt-44">

        <div class="max-w-3xl mx-auto">
            <p class="text-base md:text-xl text-gray-400 text-center mb-2">
                <nuxt-link :to="{path: `/${article.category}`}" class="hover:underline">
                    {{article.category}}
                </nuxt-link>
            </p>
            <p class="custom-text leading-snug md:leading-normal px-5 md:px-0 mb-2 text-2xl md:text-5xl text-center text-gray-800 title font-semibold">{{article.title}}</p>
            <p class="text-base md:text-xl text-gray-500 text-center mb-16">
                {{formatDate(article.createdAt)}} · by
                <span v-for="memberAuthor of member" :key="memberAuthor">
                    <nuxt-link :to="{path: `/members/${memberAuthor.slug}`}" class="hover:underline">
                        {{memberAuthor.name}}
                    </nuxt-link>
                </span>
            </p>
        </div>

        <nuxt-content :document="article" class="prose max-w-5xl custom-text px-6"/>

        <div class="max-w-6xl mx-auto px-5 flex justify-center pt-16 md:pt-20 pb-6 md:pb-20">
            <div v-for="memberAuthor of member" :key="memberAuthor">
                <div class="box mb-4 md:mb-6 mx-auto">
                    <img class="profile" :src="require(`~/assets/resources/profile/${memberAuthor.img}`)" alt="">
                </div>
                <div class="text-gray-800 text-xl md:text-2xl pb-2 md:pb-3.5 font-medium flex justify-center poppins">{{memberAuthor.name}}</div>
                <div class="text-gray-500 text-sm md:text-base pb-3 md:pb-4 flex justify-center px-3 text-center custom-text">{{memberAuthor.description}}</div>
                <div class="flex justify-center itmes-center">
                    <nuxt-link class="poppins text-blue-500 text-base md:text-lg hover:underline" :to="{path: `/members/${memberAuthor.slug}`}">
                        See More
                    </nuxt-link>
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
        const article = await $content('articles', params.slug)
        .fetch();

        const [prev, next] = await $content('articles')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .surround(params.slug)
        .fetch();

        const authorName = article.author

        const member = await $content('members')
        .where({name: authorName})
        .fetch();

        return { article, prev, next, member, authorName }
    },
    methods: {
        formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('en', options)
        }
    },

    head() {
        return {
            title: this.article.title,
            desciption: this.article.description,
            htmlAttrs: {
            lang: 'ko'
            },
            meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 't-type',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            {
            hid: 'og-type',
            property: 'og:type',
            content: 'website'
            },
            {
            hid: 'og:title',
            property: 'og:title',
            content: this.article.title
            },
            {
            hid: 'og:description',
            property: 'og:description',
            content: this.article.description
            },
            {
            hid: 'og:image',
            property: 'og:image',
            content: 'https://raw.githubusercontent.com/GDSC-CAU/GDSC-CAU.github.io/main/static/opengraph_image.png'
            },
            {
            hid: 'og:image:secure_url',
            property: 'og:image:secure_url',
            content: 'https://raw.githubusercontent.com/GDSC-CAU/GDSC-CAU.github.io/main/static/opengraph_image.png'
            },
            {
            hid: 'og:image:alt',
            property: 'og:image:alt',
            content: this.article.title
            },
            {
            hid: 'og:url',
            name: 'og:url',
            content: `https://gdsc-cau.github.io/article/${this.$route.params.slug}`
            },
            ],
        }
    },

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