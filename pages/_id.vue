<template>
<div class="w-full bg-gray-50">

    <div class="pt-52 pb-14 max-w-6xl mx-auto px-5">
        <div class="pb-6 poppins text-7xl font-medium text-gray-800">
            {{member.name}}
        </div>
    </div>


        <!-- <div class="max-w-6xl mx-auto px-5 grid grid-cols-5 gap-x-5 gap-y-9 pb-24">
            <div v-for="imember of member" :key="imember">
                <nuxt-link :to="{name: 'id', params: {id: imember.slug} }">
                    <div class="flex justify-center mb-5">
                        <div class="box">
                            <img class="profile" :src="require(`~/assets/resources/profile/${imember.img}`)" alt="">
                        </div>
                    </div>
                    <div>
                        <div class="text-xl flex justify-center poppins text-gray-800">{{imember.name}}</div>
                        <div class="text flex justify-center poppins text-gray-800">{{imember.role}}</div>
                    </div>
                </nuxt-link>
            </div>
        </div> -->


    <div class="max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 pb-16 max-w-6xl mx-auto px-5">
        <div class="group" v-for="marticle of memberArticles" :key="marticle">
            <nuxt-link :to="{ name: 'slug', params: { slug: marticle.slug } }">
                <div class="article-inner flex justify-between items-center border-t py-8 border-gray-600">
                    <div class="pr-4">
                        <p class="mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400">{{marticle.category}} · {{marticle.author}} · {{ marticle.datetime }}</p>
                        <h2 class="mb-1 md:mb-1.5 text-lg md:text-xl font-semibold poppins text-gray-800">{{ marticle.title }}</h2>
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
            .sortBy('datetime', 'desc')
            .fetch();
        return { member, memberArticles, authorName }
    }
}
</script>

<style scpoed>
.custom-text{
    word-break: keep-all;
}
</style>