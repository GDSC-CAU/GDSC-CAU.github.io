<template>
    <div class="w-full border-b md:border-b border-gray-300 bg-white z-40">
        <div class="max-w-7xl mx-auto flex items-center justify-between px-4">

            <div class="ml-1.5 md:ml-0 flex w-full py-4 md:py-5">
                <ul class="flex space-x-6 items-center">
                    <li>
                        <nuxt-link to="/">
                            <HeaderLogo class="" />
                        </nuxt-link>
                    </li>
                    <li class="hidden md:block text-gray-500 pl-3 hover:text-gray-800 transition hover:duration-300 font-light">
                        <nuxt-link :to="{path: '/about'}" replace class="poppins">About</nuxt-link>
                    </li>
                    <li class="hidden md:block poppins text-gray-500 hover:text-gray-800 transition hover:duration-300 font-light">
                        <nuxt-link :to="{path: '/all-articles'}" replace class="poppins">Articles</nuxt-link>
                    </li>
                    <li class="hidden md:block poppins text-gray-500 hover:text-gray-800 transition hover:duration-300 font-light">
                        <nuxt-link :to="{path: '/categories'}" replace class="poppins">Categories</nuxt-link>
                    </li>
                    <li class="hidden md:block poppins text-gray-500 hover:text-gray-800 transition hover:duration-300 font-light">
                        <nuxt-link :to="{path: '/members'}" replace class="poppins">Members</nuxt-link>
                    </li>
                    <li class="hidden md:block poppins text-gray-500 hover:text-gray-800 transition hover:duration-300 font-light">
                        <nuxt-link :to="{path: '/projects'}" replace class="poppins">Projects</nuxt-link>
                    </li>
                </ul>
            </div>

            <div class="md:hidden flex content-center">
                <button @click="drawer">
                <Menu class="mr-0.5"/>
                </button>
            </div>

            <div class="flex hidden md:block py-5">
                <ul class="flex space-x-2 text-base items-center">
                    <li>
                        <div class="hidden md:block group">
                            <a href="https://github.com/GDSC-CAU" target="blank" class="">
                                <GithubLogo />
                            </a>
                        </div>
                    </li>
                    <li>
                        <div class="hidden md:block group pl-3">
                            <a href="https://gdsc-cau.notion.site/GDSC-CAU-Member-Space-a8f22210d95a4e439dfae3a45b04ceb2" target="blank">
                                <NotionLogo />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

            <transition
                enter-class="opacity-0"
                enter-active-class="ease-out transition-medium"
                enter-to-class="opacity-100"
                leave-class="opacity-100"
                leave-active-class="ease-out transition-medium"
                leave-to-class="opacity-0"
            >
                <div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
                    <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
                </div>
            </transition>

            <aside class="p-5 transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30" :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
                
                <div class="close">
                <button class="absolute top-0 right-0 mt-4 mr-4" @click=" isOpen = false">
                    <Close />
                </button>
                </div>

                <div @click="isOpen = false" class="flex w-full pt-12 pb-8 items-center justify-center border-b">
                    <HeaderLogo />
                </div>

                <ul class="divide-y font-light">
                <li><nuxt-link :to="{path: '/about'}" replace @click="isOpen = false" class="text-gray-500 my-4 inline-block poppins">About</nuxt-link></li>
                <li><nuxt-link :to="{path: '/all-articles'}" replace @click="isOpen = false" class="text-gray-500 my-4 inline-block poppins">Articles</nuxt-link></li>
                <li><nuxt-link :to="{path: '/categories'}" replace @click="isOpen = false" class="text-gray-500 my-4 inline-block poppins">Categories</nuxt-link></li>
                <li><nuxt-link :to="{path: '/members'}" replace @click="isOpen = false" class="text-gray-500 my-4 inline-block poppins">Members</nuxt-link></li>
                <li><nuxt-link :to="{path: '/projects'}" @click="isOpen = false" class="text-gray-500 my-4 inline-block poppins">Projects</nuxt-link></li>
                </ul>

                <div class="flex items-center justify-center">
                <div class="social flex space-x-6 mt-6">
                    <a href="https://github.com/GDSC-CAU" target="blank">
                        <GithubLogo  class="w-6 h-6"/>
                    </a>
                    <a href="https://gdsc-cau.notion.site/GDSC-CAU-Member-Space-a8f22210d95a4e439dfae3a45b04ceb2" target="blank">
                        <NotionLogo class="w-6 h-6"/>
                    </a>
                </div>
                </div>

            </aside>
        </div>
    </div>
</template>

<script>
    export default {
    data() {
        return {
        isOpen: false
        };
    },
    methods: {
        drawer() {
        this.isOpen = !this.isOpen;
        }
    },
    watch: {
        isOpen: {
        immediate: true,
        handler(isOpen) {
            if (process.client) {
            if (isOpen) document.body.style.setProperty("overflow", "hidden");
            else document.body.style.removeProperty("overflow");
            }
        }
        }
    },
    mounted() {
        document.addEventListener("keydown", e => {
        if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
        });
    }
    };
</script>

<style scoped>
</style>