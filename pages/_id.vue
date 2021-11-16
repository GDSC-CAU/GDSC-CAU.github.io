<template>
    <div class="w-full bg-gray-50">

        <div class="max-w-6xl mx-auto px-5 flex justify-center pt-28 md:pt-40">
            <div>
                <div class="lead-box w-40 h-40 md:w-52 md:h-52 mb-4 md:mb-6 mx-auto">
                    <img class="profile" :src="require(`~/assets/resources/profile/${member.img}`)" alt="">
                </div>
                <div class="text-gray-800 text-2xl md:text-3xl font-medium flex justify-center poppins pb-0 md:pb-1.5">{{member.name}}</div>
                <div class="flex justify-center poppins text-lg md:text-xl text-gray-800 pb-1.5 md:pb-3">{{member.role}}</div>
                <div class="text-gray-500 pb-4 flex justify-center">{{member.description}}</div>
            </div>
        </div>

        <div class="pt-8 md:pt-16 flex justify-between items-center max-w-6xl mx-auto px-5">
            <div class="text-2xl md:text-3xl text-gray-800 font-medium poppins">Articles</div>
        </div>

        <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-7 pb-16 max-w-6xl mx-auto px-5">
            <div class="group" v-for="marticle of memberArticles" :key="marticle">
                <nuxt-link :to="{ name: 'slug', params: { slug: marticle.slug } }">
                    <div class="article-inner flex justify-between items-center border-t py-8 border-gray-600">
                        <div class="pr-4">
                            <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{marticle.category}} · {{marticle.author}}</p>
                            <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800">{{ marticle.title }}</h2>
                            <p class=" text-sm md:text-base text-gray-600 custom-text">{{marticle.description}}</p>
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
        const member = await $content('members', params.id)
        .fetch();
        const authorName = member.name
        const memberArticles = await $content('blog', params.slug)
            .where({author: authorName})
            .only(['title', 'description', 'img', 'datetime', 'category', 'author', 'slug'])
            .sortBy('createdAt', 'desc')
            .fetch();
        return { member, memberArticles, authorName }
    }
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