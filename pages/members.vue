<template>
    <div>
        <div class="pt-52 pb-10 max-w-6xl mx-auto px-5">
            <div class="pb-6 poppins text-7xl font-medium text-gray-800">
                Members
            </div>
            <div class="font-normal text-xl text-gray-600">
                멤버들
            </div>
        </div>

        <div class="max-w-6xl">
            <div v-for="imember of member" :key="imember">
                <nuxt-link :to="{name: 'id', params: {id: imember.slug} }">
                    <div>{{imember.name}}</div>
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
        return { member }
    }
}
</script>

<style scoped>

</style>