<template>
    <div>
        <div class="pt-52 pb-10 max-w-6xl mx-auto px-5">
            <div class="pb-6 poppins text-7xl font-medium text-gray-800">
                About
            </div>
        </div>

        <div class="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-x-5">

            <div class="custom-text poppins text-3xl mr-9 py-6 text-gray-800">
                Google Developer Student Clubs CAU is a community group for CAU students interested in Google developer technologies.
            </div>

            <div class="px-8 py-8 back-yellow rounded-xl relative">
                <div>
                    <p class="text-5xl poppins pb-2.5 font-medium text-gray-800">20</p>
                    <p class="text-xl poppins text-gray-800">Active Members</p>
                </div>
                <nuxt-link class="absolute bottom-0 left-0 pb-8 pl-8" to="members">
                    <div class=" poppins text-lg text-gray-800 underline">
                        See Members
                    </div>
                </nuxt-link>
            </div>

            <div class="px-8 py-8 back-yellow rounded-xl relative">
                <div>
                    <p class="text-5xl poppins pb-2.5 font-medium text-gray-800">20</p>
                    <p class="text-xl poppins text-gray-800">Individual Projects <br> in Process</p>
                </div>
                <nuxt-link class="absolute bottom-0 left-0 pb-8 pl-8" to="projects">
                    <div class=" poppins text-lg text-gray-800 underline">
                        See Projects
                    </div>
                </nuxt-link>
            </div>

        </div>

        <div class="pt-24 flex justify-between items-center max-w-6xl mx-auto px-5">
            <div class="text-4xl text-gray-800 font-medium poppins">Lead</div>
        </div>

        <div class="pt-24 flex justify-between items-center max-w-6xl mx-auto px-5 pb-24">
            <div class="text-4xl text-gray-800 font-medium poppins">Core Members</div>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.custom-text{
    word-break: keep-all;
}
.back-yellow{
    background-color: #FBBF25;
}
</style>