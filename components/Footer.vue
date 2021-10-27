<template>
    <footer class="w-full bg-gray-100 pt-11 pb-14 md:pt-14 md:pb-20 px-2 md:px-5">
        <div class="max-w-7xl mx-auto px-5">
            <div class="block md:flex relative">

                <div class="justify-around md:justify-start px-8 md:px-0 items-start flex">
                    <ul class="ml-0 w-25 md:w-28 md:m-0">
                        <li class="mb-3 font-medium text-gray-700">Links</li>
                        <li class="mb-1.5 font-normal text-gray-500 hover:underline text-sm"><a href="https://github.com/thepenielcho" target="blank">GitHub</a></li>
                        <li class="mb-1.5 font-normal text-gray-500 hover:underline text-sm"><a href="https://www.linkedin.com/in/peniel-cho/" target="blank">Linkedin</a></li>
                        <li class="mb-1.5 font-normal text-gray-500 hover:underline text-sm"><a href="https://twitter.com/ChoPeniel" target="blank">Twitter</a></li>
                        <li class="mb-1.5 font-normal text-gray-500 hover:underline text-sm"><a href="https://blog.naver.com/penielcho98" target="blank">PenieLife</a></li>
                    </ul>

                    <ul class="w-25 md:w-28 md:ml-0 md:m-0">
                        <li class="mb-3 font-medium text-gray-700">Contact</li>
                        <li class="mb-1.5 font-normal text-gray-500 hover:underline text-sm"><a href="mailto:mail@penielcho.com">Email</a></li>
                        <li class="mb-1.5 font-normal text-gray-500 hover:underline text-sm"><a href="https://www.linkedin.com/in/peniel-cho/" target="blank">Linkedin</a></li>
                        <li class="mb-1.5 font-normal text-gray-500 hover:underline text-sm"><a href="https://twitter.com/ChoPeniel" target="blank">Twitter</a></li>
                    </ul>
                </div>

                <nuxt-link to="/" class="hidden md:block flex justify-center md:absolute md:top-0 md:right-0 md:items-center md:m-0">
                    <div class=""><HeaderLogo/></div>
                </nuxt-link>

                <ul class="flex justify-center md:absolute md:bottom-0 md:right-0 md:block mt-10 md:mt-0">
                    <li class="text-xs md:text-sm font-normal text-gray-500">Designed and Developed by <a class="underline" href="https://github.com/thepenielcho" target="blank">Peniel Cho</a></li>
                </ul>

            </div>
        </div>

    </footer>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
</style>