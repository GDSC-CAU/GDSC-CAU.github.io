<template>
    <div>
        <div class="pt-52 pb-14 max-w-6xl mx-auto px-5">
            <div class="pb-6 poppins text-7xl font-medium text-gray-800">
                Members
            </div>
        </div>

        <div class="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-9 pb-24">
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