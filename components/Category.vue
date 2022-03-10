<template>
    <div>
        <div class="max-w-6xl flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto px-6 gap-x-3 gap-y-3 pb-20 md:pb-32">
            <div class="border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group">
                <nuxt-link to="/front-end">
                <div class="h-2/5 border-b border-gray-600 flex items-center">
                <div class="text-2xl text-gray-800 poppins px-6">Front-End</div>
                </div>
                <div class="h-3/5 flex items-center">
                <div class="px-6">
                    <div class="text-gray-600 mb-3 ftmore">웹 개발을 위한 글들이에요.</div>
                    <div class="text-blue-500 text-sm poppins group-hover:underline">See More</div>
                </div>
                </div>
                </nuxt-link>
            </div>
            <div class="border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group">
                <nuxt-link to="/back-end">
                <div class="h-2/5 border-b border-gray-600 flex items-center">
                <div class="text-2xl text-gray-800 poppins px-6">Back-End</div>
                </div>
                <div class="h-3/5 flex items-center">
                <div class="px-6">
                    <div class="text-gray-600 mb-3 ftmore">서버와 데이터베이스에 관한 글들이에요.</div>
                    <div class="text-blue-500 text-sm poppins group-hover:underline">See More</div>
                </div>
                </div>
                </nuxt-link>
            </div>
            <div class="border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group">
                <nuxt-link to="/data-science">
                <div class="h-2/5 border-b border-gray-600 flex items-center">
                <div class="text-2xl text-gray-800 poppins px-6">Data-Science</div>
                </div>
                <div class="h-3/5 flex items-center">
                <div class="px-6">
                    <div class="text-gray-600 mb-3 ftmore">DS부터 ML, DL까지 데이터에 관한 글들이에요.</div>
                    <div class="text-blue-500 text-sm poppins group-hover:underline">See More</div>
                </div>
                </div>
                </nuxt-link>
            </div>
            <div class="border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group">
                <nuxt-link to="/application">
                <div class="h-2/5 border-b border-gray-600 flex items-center">
                <div class="text-2xl text-gray-800 poppins px-6">Application</div>
                </div>
                <div class="h-3/5 flex items-center">
                <div class="px-6">
                    <div class="text-gray-600 mb-3 ftmore">모바일 어플리케이션 개발에 관한 글들이에요.</div>
                    <div class="text-blue-500 text-sm poppins group-hover:underline">See More</div>
                </div>
                </div>
                </nuxt-link>
            </div>
            <div class="border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group">
                <nuxt-link to="/devops">
                <div class="h-2/5 border-b border-gray-600 flex items-center">
                <div class="text-2xl text-gray-800 poppins px-6">DevOps</div>
                </div>
                <div class="h-3/5 flex items-center">
                <div class="px-6">
                    <div class="text-gray-600 mb-3 ftmore">개발부터 배포까지의 프로세스 개선을 위한 글들이에요.</div>
                    <div class="text-blue-500 text-sm poppins group-hover:underline">See More</div>
                </div>
                </div>
                </nuxt-link>
            </div>
            <div class="border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group">
                <nuxt-link to="/general">
                <div class="h-2/5 border-b border-gray-600 flex items-center">
                <div class="text-2xl text-gray-800 poppins px-6">General</div>
                </div>
                <div class="h-3/5 flex items-center">
                <div class="px-6">
                    <div class="text-gray-600 mb-3 ftmore">카테고리화하기 애매한 개발 관련 글들이에요.</div>
                    <div class="text-blue-500 text-sm poppins group-hover:underline">See More</div>
                </div>
                </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.ftmore{
  font-size: 0.92rem;
}
</style>