<template>
    <div class="w-full px-4 border-b md:border-b border-gray-200 bg-white z-30">
        <div class="px-4 flex items-center justify-between">

            <div class="ml-1.5 md:ml-0 flex w-full">
                <ul class="flex space-x-6 items-center py-5">
                    <li>
                        <nuxt-link to="/">
                            <HeaderLogo />
                        </nuxt-link>
                    </li>
                    <li class="poppins text-gray-500 pl-3 hover:text-gray-800 transition hover:duration-300">
                        <a href="">About</a>
                    </li>
                    <li class="poppins text-gray-500 hover:text-gray-800 transition hover:duration-300">
                        <a href="">Categories</a>
                    </li>
                    <li class="poppins text-gray-500 hover:text-gray-800 transition hover:duration-300">
                        <a href="">Projects</a>
                    </li>
                </ul>
                <div class="rounded-md bg-gray-100 w-3/12 flex items-center font-light poppins my-2.5 ml-10 px-3">
                    <SearchIcon class="ml-1.5 mr-3" />
                    <input placeholder="Search Articles" class="w-full bg-gray-100 text-gray-800" />
                </div>
            </div>

            <div class="flex">
                <!-- <div class="rounded-md bg-gray-100 w-96 flex items-center font-light poppins my-2.5 mr-10 px-3">
                    <SearchIcon class="ml-1.5 mr-3" />
                    <input placeholder="Search Articles" class="w-full bg-gray-100" />
                </div> -->
                <ul class="flex space-x-2 text-base items-center py-5">
                    <!-- <li>
                        <div class="py-1 px-2 rounded-lg hover:bg-gray-100">
                            <nuxt-link to="korean" class="text-gray-700 text-sm">한글</nuxt-link>
                        </div>
                    </li>
                    <li>
                        <div class="py-1 px-2 rounded-lg hover:bg-gray-100">
                            <nuxt-link to="english" class="text-gray-700 text-sm poppins">ENG</nuxt-link>
                        </div>
                    </li> -->
                    <li>
                        <div class="hidden md:block group">
                            <a href="https://github.com/thepenielcho" target="blank" class="">
                                <GithubLogo />
                            </a>
                        </div>
                    </li>
                    <li>
                        <div class="hidden md:block group pl-3">
                            <a href="">
                                <NotionLogo />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
// export default {
//   data () {
//     return {
//       query: '',
//       articles: []
//     }
//   },
//   watch: {
//     async query (query) {
//       if (!query) {
//         this.articles = []
//         return
//       }

//       this.articles = await this.$content('blog')
//         .only(['title', 'slug'])
//         .sortBy('createdAt', 'asc')
//         .limit(15)
//         .search(query)
//         .fetch()
//     }
//   }
// }
</script>

<style scoped>
.lastborder:last-child{
    border-bottom: none;
}
input:focus, textarea:focus, select:focus{
        outline: none;
    }
input::-ms-clear,
input::-ms-reveal{
	display:none;width:0;height:0;
}
input::-webkit-search-decoration,
input::-webkit-search-cancel-button,
input::-webkit-search-results-button,
input::-webkit-search-results-decoration{
	display:none;
}
</style>