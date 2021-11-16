<template>
    <div>
        <div class="pt-28 md:pt-52 pb-0 md:pb-14 max-w-6xl mx-auto px-6">
            <div class="pb-10 poppins text-3xl md:text-7xl font-medium text-gray-800">
                Members
            </div>
        </div>

        <div class="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-9 pb-20 md:pb-24">
            <div v-for="imember of member" :key="imember">
                <nuxt-link class="group" :to="{name: 'id', params: {id: imember.slug} }">
                    <div class="flex justify-center mb-3 md:mb-5">
                        <div class="lead-box h-32 w-32 md:h-40 md:w-40">
                            <img class="profile" :src="require(`~/assets/resources/profile/${imember.img}`)" alt="">
                        </div>
                    </div>
                    <div>
                        <div class="text-lg md:text-xl flex justify-center poppins text-gray-800 group-hover:underline">{{imember.name}}</div>
                        <div class="text-sm md:text-base flex justify-center poppins text-gray-800">{{imember.role}}</div>
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
        .sortBy('name', 'asc')
        .fetch();
        return { member }
    }
}
</script>

<style scoped>
.custom-text{
    word-break: keep-all;
}
.back-yellow{
    background-color: #FBBF25;
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