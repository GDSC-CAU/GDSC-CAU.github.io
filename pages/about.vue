<template>
    <div>
        <div class="pt-28 md:pt-52 pb-0 md:pb-10 max-w-6xl mx-auto px-6">
            <div class="pb-6 poppins text-3xl md:text-7xl font-medium text-gray-800">
                About
            </div>
        </div>

        <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-6 md:gap-y-0">

            <div class="custom-text poppins md:col-span-3 text-2xl md:text-3xl mr-9 py-2 md:py-6 text-gray-800">
                Google Developer Student Clubs CAU is a community group for CAU students interested in Google developer technologies.
            </div>

            <div class="px-8 py-8 back-yellow rounded-xl relative h-52 md:h-auto">
                <div>
                    <p class="text-5xl poppins pb-2.5 font-medium text-gray-800">27</p>
                    <p class="text-xl poppins text-gray-800">Active Members</p>
                </div>
                <nuxt-link class="bottom-0 left-0 pb-8 pl-8" to="/members">
                    <div class="poppins text-base md:text-lg text-gray-800 underline">
                        See Members
                    </div>
                </nuxt-link>
            </div>

            <div class="px-8 py-8 back-yellow rounded-xl relative h-56 md:h-auto">
                <div>
                    <p class="text-5xl poppins pb-2.5 font-medium text-gray-800">2</p>
                    <p class="text-xl poppins text-gray-800">Team Projects in Process</p>
                </div>
                <nuxt-link class="bottom-0 left-0 pb-8 pl-8" to="/projects">
                    <div class=" poppins text-base md:text-lg text-gray-800 underline">
                        See Projects
                    </div>
                </nuxt-link>
            </div>

            <div class="px-8 py-8 back-yellow rounded-xl relative h-56 md:h-auto">
                <div>
                    <p class="text-5xl poppins pb-2.5 font-medium text-gray-800">4</p>
                    <p class="text-xl poppins text-gray-800">Team Study in Process</p>
                </div>
                <nuxt-link class="bottom-0 left-0 pb-8 pl-8" to="/projects">
                    <div class=" poppins text-base md:text-lg text-gray-800 underline">
                        See Studies
                    </div>
                </nuxt-link>
            </div>

        </div>

        <div class="pt-16 md:pt-24 flex justify-between items-center max-w-6xl mx-auto px-6">
            <div class="text-3xl md:text-4xl text-gray-800 font-medium poppins">Lead</div>
        </div>

        <div class="pt-12 md:pt-16 max-w-6xl mx-auto px-10">
            <div class="">
                <div v-for="leadm of Lead" :key="leadm">
                    <nuxt-link :to='`/members/${leadm.slug}`' class="max-x-3xl mx-auto md:flex md:justify-between md:items-center group">
                        <div class="flex justify-center">
                            <div class="lead-box w-40 h-40 md:w-52 md:h-52">
                                <img class="profile" :src="require(`~/assets/resources/profile/${leadm.img}`)" alt="">
                            </div>
                        </div>
                        <div class="mx-auto pl-0 md:pl-12">
                            <div class="">
                                <p class="pt-6 md:pt-0 custom-text text-center text-gray-600 text-base md:text-xl mb-4 md:mb-6">
                                    {{leadm.slogan}}
                                </p>
                                <div class="text-lg md:text-xl flex justify-center poppins text-gray-800 group-hover:underline">{{leadm.name}}</div>
                                <div class="text-sm md:text-base flex justify-center poppins text-gray-800">{{leadm.role}}</div>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <div class="pt-16 md:pt-24 flex justify-between items-center max-w-6xl mx-auto px-6 pb-12 md:pb-16">
            <div class="text-3xl md:text-4xl text-gray-800 font-medium poppins">Core Members</div>
        </div>

        <div class="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-9 pb-20 md:pb-24">
            <div v-for="imember of coreMember" :key="imember">
                <nuxt-link :to='`/members/${imember.slug}`' class="group">
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

    </div>
</template>

<script>
export default {
    async asyncData({ $content }) {
        const Lead = await $content('members')
        .where({role:'Lead'})
        .fetch();
        const coreMember = await $content('members')
        .sortBy('name', 'asc')
        .where({role:'Core Member'})
        .fetch();
        return { coreMember, Lead }
    },

    head: {
        title: 'About',
        htmlAttrs: {
        lang: 'ko'
        },
        meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '중앙대학교 Google DSC 블로그입니다. 활동 관련 소식, 공부 내용 등을 주기적으로 업로드합니다.' },
        { name: 'format-detection', content: 'telephone=no' }
        ]
    },

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