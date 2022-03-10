<template>
    <div class="w-full bg-gray-50">

        <div class="max-w-6xl mx-auto px-6 flex justify-center pt-28 md:pt-40">
            <div>
                <div class="lead-box w-40 h-40 md:w-52 md:h-52 mb-4 md:mb-6 mx-auto">
                    <img class="profile" :src="require(`~/assets/resources/profile/${member.img}`)" alt="">
                </div>
                <div class="text-gray-800 text-2xl md:text-3xl font-medium flex justify-center poppins pb-0 md:pb-1.5">{{member.name}}</div>
                <div class="flex justify-center poppins text-lg md:text-xl text-gray-800 pb-1.5 md:pb-3">{{member.role}}</div>
                <div class="text-gray-500 px-0 md:px-20 pb-4 flex justify-center text-center custom-text">{{member.description}}</div>
            </div>
        </div>

        <div class="pt-8 md:pt-16 flex justify-between items-center max-w-6xl mx-auto px-6">
            <div class="text-2xl md:text-3xl text-gray-800 font-medium poppins">Projects</div>
        </div>

        <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 pb-8 md:pb-12 max-w-6xl mx-auto px-6">
            <div class="group" v-for="marticle of proArticles" :key="marticle">
                <nuxt-link :to="{path: `/articles/${marticle.slug}`}">
                    <div class="article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600">
                        <div class="pr-4">
                            <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{marticle.author}}</p>
                            <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800">{{ marticle.title }}</h2>
                            <p class=" text-sm md:text-base text-gray-600 custom-text">{{marticle.description}}</p>
                        </div>
                        <div class="pl-4 pr-6 hidden md:block">
                            <ExternalLinkLogo class="fill-current text-gray-400 group-hover:text-gray-700 transition duration-200" />
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>

        <div class="flex justify-between items-center max-w-6xl mx-auto px-6">
            <div class="text-2xl md:text-3xl text-gray-800 font-medium poppins">Articles</div>
        </div>

        <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 pb-14 md:pb-24 max-w-6xl mx-auto px-6">
            <div class="group" v-for="marticle of memberArticles" :key="marticle">
                <nuxt-link :to="{path: `/articles/${marticle.slug}`}">
                    <div class="article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600">
                        <div class="pr-4">
                            <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{marticle.category}} · {{marticle.author}}</p>
                            <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800">{{ marticle.title }}</h2>
                            <p class=" text-sm md:text-base text-gray-600 custom-text">{{marticle.description}}</p>
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
    async asyncData({ $content, params }) {
        const member = await $content('members', params.slug)
        .fetch();
        const authorName = member.name
        const memberArticles = await $content('articles')
            .where({author: authorName})
            .sortBy('createdAt', 'desc')
            .fetch();
        const proArticles = await $content('projects')
            .where({author: authorName})
            .sortBy('createdAt', 'desc')
            .fetch();
        return { member, memberArticles, authorName, proArticles }
    },

    head() {
        return {
            title: this.member.name,
            desciption: this.member.description,
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
            content: this.member.name
            },
            {
            hid: 'og:description',
            property: 'og:description',
            content: this.member.description
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
            content: this.member.name
            },
            {
            hid: 'og:url',
            name: 'og:url',
            content: `https://gdsc-cau.github.io/member/${this.$route.params.slug}`
            },
            ],
        }
    },

}
</script>

<style scpoed>
.custom-text{
    word-break: keep-all;
}
.lead-box {
    border-radius: 70%;
    overflow: hidden;
}
.profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>