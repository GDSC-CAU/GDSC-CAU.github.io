<template>
    <footer class="w-full bg-gray-50">
        <div class="max-w-6xl mx-auto pt-11 pb-14 md:pt-11 md:pb-24 px-2 md:px-5 border-t border-gray-300 flex flex-col md:flex-row items-center justify-start md:justify-between">
            
            <div class="flex md:hidden justify-center items-center pb-9">
                <HeaderLogo class="h-4"/>
            </div>

            <ul class="flex flex-col md:flex-row text-sm space-y-2 md:space-y-0">
                <li class="text-gray-500 mr-0 md:mr-3 flex justify-center"><nuxt-link to="/" class="hover:underline">Blog</nuxt-link></li>
                <li class="text-gray-500 mr-0 md:mr-3 flex justify-center"><a target="blank" href="https://github.com/GDSC-CAU" class="hover:underline">GitHub</a></li>
                <li class="text-gray-500 mr-0 md:mr-3 flex justify-center"><a target="blank" href="https://gdsc-cau.notion.site/GDSC-CAU-Member-Space-a8f22210d95a4e439dfae3a45b04ceb2" class="hover:underline">Notion</a></li>
                <li class="text-gray-500 mr-0 md:mr-3 flex justify-center"><a href="mailto:gdsc.cau@gmail.com" class="hover:underline">Email</a></li>
            </ul>

            <div class="hidden md:flex justify-center items-center">
                <HeaderLogo/>
            </div>

            <div class="text-xs md:text-sm text-gray-500 mt-8 md:mt-0 mb-3">
                Designed and Developed by <a href="https://github.com/thepenielcho" target="blank" class="underline">Peniel Cho</a>
            </div>

        </div>
    </footer>
</template>