(window.webpackJsonp=window.webpackJsonp||[]).push([[22,4,5,8,9],{278:function(t,e,r){var content=r(280);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("17ec4d76",content,!0,{sourceMap:!1})},279:function(t,e,r){"use strict";r(278)},280:function(t,e,r){var n=r(29)((function(i){return i[1]}));n.push([t.i,"/*purgecss start ignore*/\n.altfive[data-v-efecb3ac]{\n  height:1.35rem\n}\n\n/*purgecss end ignore*/",""]),n.locals={},t.exports=n},281:function(t,e,r){"use strict";r.r(e);r(279);var n=r(9),component=Object(n.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"w-auto md:block altfive",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[e("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"}})])}),[],!1,null,"efecb3ac",null);e.default=component.exports},282:function(t,e,r){var content=r(306);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("e8aa5c12",content,!0,{sourceMap:!1})},283:function(t,e,r){var content=r(311);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("f4f00562",content,!0,{sourceMap:!1})},305:function(t,e,r){"use strict";r(282)},306:function(t,e,r){var n=r(29)((function(i){return i[1]}));n.push([t.i,"/*purgecss start ignore*/\n.searchcolor[data-v-592ba209]{\n  filter:invert(43%) sepia(10%) saturate(535%) hue-rotate(182deg) brightness(99%) contrast(88%)\n}\n.octcat-color[data-v-592ba209]{\n  filter:invert(66%) sepia(11%) saturate(293%) hue-rotate(179deg) brightness(96%) contrast(89%)\n}\n\n/*purgecss end ignore*/",""]),n.locals={},t.exports=n},307:function(t,e,r){var content=r(314);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("788fcdf8",content,!0,{sourceMap:!1})},309:function(t,e,r){"use strict";r.r(e);r(305);var n=r(9),component=Object(n.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"fill-current text-gray-300 w-auto md:block h-5 octcat-color",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[e("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}})])}),[],!1,null,"592ba209",null);e.default=component.exports},310:function(t,e,r){"use strict";r(283)},311:function(t,e,r){var n=r(29)((function(i){return i[1]}));n.push([t.i,"/*purgecss start ignore*/\n.lastborder[data-v-ea6840ac]:last-child{\n  border-bottom:none\n}\ninput[data-v-ea6840ac]:focus,select[data-v-ea6840ac]:focus,textarea[data-v-ea6840ac]:focus{\n  outline:none\n}\ninput[data-v-ea6840ac]::-ms-clear,input[data-v-ea6840ac]::-ms-reveal{\n  display:none;\n  width:0;\n  height:0\n}\ninput[data-v-ea6840ac]::-webkit-search-cancel-button,input[data-v-ea6840ac]::-webkit-search-decoration,input[data-v-ea6840ac]::-webkit-search-results-button,input[data-v-ea6840ac]::-webkit-search-results-decoration{\n  display:none\n}\n\n/*purgecss end ignore*/",""]),n.locals={},t.exports=n},312:function(t,e,r){"use strict";r.r(e);var n=r(8),o=(r(43),r(31),r(138),{data:function(){return{query:"",articles:[]}},watch:{query:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=3;break}return e.articles=[],r.abrupt("return");case 3:return r.next=5,e.$content("blog").only(["title","slug"]).sortBy("createdAt","desc").limit(15).search(t).fetch();case 5:e.articles=r.sent;case 6:case"end":return r.stop()}}),r)})))()}}}),l=(r(310),r(9)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"max-w-6xl mx-auto px-6 pt-1 md:pt-0 md:0b-0"},[r("div",{staticClass:"shadow-sm md:shadow w-full rounded-lg border border-gray-300 flex items-center mb-4 py-3 md:py-3.5 px-5 bg-white"},[r("SearchIcon"),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],staticClass:"ml-3 bg-white flex-auto text-base text-gray-800 pr-3.5 md:pr-6 flex items-center placeholder-text-gray-400",attrs:{placeholder:"다양한 주제의 글을 검색해보세요",type:"search",autocomplete:"off"},domProps:{value:t.query},on:{input:function(e){e.target.composing||(t.query=e.target.value)}}})],1),t._v(" "),t.articles.length?r("ul",{staticClass:"shadow-sm md:shadow rounded-lg border border-gray-300 px-4 bg-white"},t._l(t.articles,(function(article){return r("li",{key:article.slug,staticClass:"text-gray-600 py-2.5 md:py-3.5 border-b text-base lastborder"},[r("nuxt-link",{attrs:{to:"article/"+article.slug}},[t._v("\n        "+t._s(article.title)+"\n      ")])],1)})),0):t._e()])}),[],!1,null,"ea6840ac",null);e.default=component.exports;installComponents(component,{SearchIcon:r(309).default})},313:function(t,e,r){"use strict";r(307)},314:function(t,e,r){var n=r(29)((function(i){return i[1]}));n.push([t.i,"/*purgecss start ignore*/\n.ftmore[data-v-d8c1c9c0]{\n  font-size:.92rem\n}\n\n/*purgecss end ignore*/",""]),n.locals={},t.exports=n},317:function(t,e,r){"use strict";r.r(e);var n={},o=(r(313),r(9)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"max-w-6xl flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto px-6 gap-x-3 gap-y-3 pb-20 md:pb-32"},[r("div",{staticClass:"border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group"},[r("nuxt-link",{attrs:{to:"/front-end"}},[r("div",{staticClass:"h-2/5 border-b border-gray-600 flex items-center"},[r("div",{staticClass:"text-2xl text-gray-800 poppins px-6"},[t._v("Front-End")])]),t._v(" "),r("div",{staticClass:"h-3/5 flex items-center"},[r("div",{staticClass:"px-6"},[r("div",{staticClass:"text-gray-600 mb-3 ftmore"},[t._v("웹 개발을 위한 글들이에요.")]),t._v(" "),r("div",{staticClass:"text-blue-500 text-sm poppins group-hover:underline"},[t._v("See More")])])])])],1),t._v(" "),r("div",{staticClass:"border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group"},[r("nuxt-link",{attrs:{to:"/back-end"}},[r("div",{staticClass:"h-2/5 border-b border-gray-600 flex items-center"},[r("div",{staticClass:"text-2xl text-gray-800 poppins px-6"},[t._v("Back-End")])]),t._v(" "),r("div",{staticClass:"h-3/5 flex items-center"},[r("div",{staticClass:"px-6"},[r("div",{staticClass:"text-gray-600 mb-3 ftmore"},[t._v("서버와 데이터베이스에 관한 글들이에요.")]),t._v(" "),r("div",{staticClass:"text-blue-500 text-sm poppins group-hover:underline"},[t._v("See More")])])])])],1),t._v(" "),r("div",{staticClass:"border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group"},[r("nuxt-link",{attrs:{to:"/data-science"}},[r("div",{staticClass:"h-2/5 border-b border-gray-600 flex items-center"},[r("div",{staticClass:"text-2xl text-gray-800 poppins px-6"},[t._v("Data-Science")])]),t._v(" "),r("div",{staticClass:"h-3/5 flex items-center"},[r("div",{staticClass:"px-6"},[r("div",{staticClass:"text-gray-600 mb-3 ftmore"},[t._v("DS부터 ML, DL까지 데이터에 관한 글들이에요.")]),t._v(" "),r("div",{staticClass:"text-blue-500 text-sm poppins group-hover:underline"},[t._v("See More")])])])])],1),t._v(" "),r("div",{staticClass:"border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group"},[r("nuxt-link",{attrs:{to:"/application"}},[r("div",{staticClass:"h-2/5 border-b border-gray-600 flex items-center"},[r("div",{staticClass:"text-2xl text-gray-800 poppins px-6"},[t._v("Application")])]),t._v(" "),r("div",{staticClass:"h-3/5 flex items-center"},[r("div",{staticClass:"px-6"},[r("div",{staticClass:"text-gray-600 mb-3 ftmore"},[t._v("모바일 어플리케이션 개발에 관한 글들이에요.")]),t._v(" "),r("div",{staticClass:"text-blue-500 text-sm poppins group-hover:underline"},[t._v("See More")])])])])],1),t._v(" "),r("div",{staticClass:"border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group"},[r("nuxt-link",{attrs:{to:"/devops"}},[r("div",{staticClass:"h-2/5 border-b border-gray-600 flex items-center"},[r("div",{staticClass:"text-2xl text-gray-800 poppins px-6"},[t._v("DevOps")])]),t._v(" "),r("div",{staticClass:"h-3/5 flex items-center"},[r("div",{staticClass:"px-6"},[r("div",{staticClass:"text-gray-600 mb-3 ftmore"},[t._v("개발부터 배포까지의 프로세스 개선을 위한 글들이에요.")]),t._v(" "),r("div",{staticClass:"text-blue-500 text-sm poppins group-hover:underline"},[t._v("See More")])])])])],1),t._v(" "),r("div",{staticClass:"border border-gray-600 h-40 sm:h-44 rounded-lg bg-white group"},[r("nuxt-link",{attrs:{to:"/general"}},[r("div",{staticClass:"h-2/5 border-b border-gray-600 flex items-center"},[r("div",{staticClass:"text-2xl text-gray-800 poppins px-6"},[t._v("General")])]),t._v(" "),r("div",{staticClass:"h-3/5 flex items-center"},[r("div",{staticClass:"px-6"},[r("div",{staticClass:"text-gray-600 mb-3 ftmore"},[t._v("카테고리화하기 애매한 개발 관련 글들이에요.")]),t._v(" "),r("div",{staticClass:"text-blue-500 text-sm poppins group-hover:underline"},[t._v("See More")])])])])],1)])])}),[],!1,null,"d8c1c9c0",null);e.default=component.exports},330:function(t,e,r){var content=r(372);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("76f98e70",content,!0,{sourceMap:!1})},355:function(t,e,r){var map={"./data-yellow.jpg":356,"./datas.jpg":357,"./django.png":358,"./git.png":359,"./graph.jpg":360,"./hongkyung.jpg":361,"./iam.png":362,"./ipython-github-error.png":363,"./numerics.jpg":364,"./python.jpg":365,"./rules.jpg":366,"./selenium.png":367,"./spring.png":368,"./tailwind.jpeg":369,"./writing.png":370};function n(t){var e=o(t);return r(e)}function o(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}n.keys=function(){return Object.keys(map)},n.resolve=o,t.exports=n,n.id=355},356:function(t,e,r){t.exports=r.p+"img/data-yellow.ddae4d5.jpg"},357:function(t,e,r){t.exports=r.p+"img/datas.fe8fa79.jpg"},358:function(t,e,r){t.exports=r.p+"img/django.09b1b73.png"},359:function(t,e,r){t.exports=r.p+"img/git.2f901a9.png"},360:function(t,e,r){t.exports=r.p+"img/graph.6c1637b.jpg"},361:function(t,e,r){t.exports=r.p+"img/hongkyung.b434b23.jpg"},362:function(t,e,r){t.exports=r.p+"img/iam.6d0bb1b.png"},363:function(t,e,r){t.exports=r.p+"img/ipython-github-error.1dccdba.png"},364:function(t,e,r){t.exports=r.p+"img/numerics.5cb11b3.jpg"},365:function(t,e,r){t.exports=r.p+"img/python.715dcc4.jpg"},366:function(t,e,r){t.exports=r.p+"img/rules.4313a83.jpg"},367:function(t,e,r){t.exports=r.p+"img/selenium.acfd974.png"},368:function(t,e,r){t.exports=r.p+"img/spring.707731f.png"},369:function(t,e,r){t.exports=r.p+"img/tailwind.96cc60a.jpeg"},370:function(t,e,r){t.exports=r.p+"img/writing.36543bd.png"},371:function(t,e,r){"use strict";r(330)},372:function(t,e,r){var n=r(29)((function(i){return i[1]}));n.push([t.i,"/*purgecss start ignore*/\n.nthz[data-v-58017178]:first-child{\n  background-color:#fbbf25;\n  border-radius:.6rem\n}\n.nthz[data-v-58017178]:nth-child(2){\n  background-color:#11ba81;\n  border-radius:.6rem\n}\n.nthz[data-v-58017178]:nth-child(3){\n  background-color:#3c82f6;\n  border-radius:.6rem\n}\n.keepall[data-v-58017178]{\n  word-break:keep-all\n}\n.bw[data-v-58017178]{\n  border:1.8px solid #1f2937\n}\n.featbox[data-v-58017178]{\n  width:250px;\n  height:160px;\n  border-radius:5%;\n  overflow:hidden\n}\n.featboxalt[data-v-58017178]{\n  width:auto;\n  height:230px;\n  border-radius:0;\n  overflow:hidden\n}\n.featimg[data-v-58017178]{\n  width:100%;\n  height:100%;\n  -o-object-fit:cover;\n     object-fit:cover\n}\n.back-yellow[data-v-58017178]{\n  background-color:#fbbf25\n}\n.ftmore[data-v-58017178]{\n  font-size:.92rem\n}\n\n/*purgecss end ignore*/",""]),n.locals={},t.exports=n},404:function(t,e,r){"use strict";r.r(e);var n=r(8),o=(r(43),{asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,e.next=3,r("articles").sortBy("createdAt","desc").limit(5).fetch();case 3:return n=e.sent,e.next=6,r("articles").where({featured:"Featured"}).sortBy("createdAt","desc").limit(3).fetch();case 6:return o=e.sent,e.next=9,r("articles").where({featured:"Featured"}).sortBy("createdAt","desc").limit(1).fetch();case 9:return l=e.sent,e.abrupt("return",{articles:n,featured:o,featuredone:l});case 11:case"end":return e.stop()}}),e)})))()},methods:{formatDate:function(t){return new Date(t).toLocaleDateString("en",{year:"numeric",month:"long",day:"numeric"})}}}),l=(r(371),r(9)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w-full bg-gray-50"},[n("div",{staticClass:"pt-16"},[t._m(0),t._v(" "),n("div",{staticClass:"pt-14 md:pt-16 flex justify-between items-center max-w-6xl mx-auto px-6"},[n("div",{staticClass:"hidden md:block text-4xl text-gray-800 font-medium poppins"},[t._v("Featured Articles")]),t._v(" "),n("div",{staticClass:"block md:hidden text-3xl text-gray-800 font-medium poppins"},[t._v("Featured Article")]),t._v(" "),n("nuxt-link",{attrs:{to:"featured"}},[n("div",{staticClass:"hidden md:block text-base text-blue-500 poppins hover:underline"},[t._v("See All Featured Articles")]),t._v(" "),n("div",{staticClass:"md:hidden text-base text-blue-500 poppins hidden md:block"},[t._v("More")])])],1),t._v(" "),n("div",{staticClass:"max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-6 md:gap-y-0 pt-10"},[t._l(t.featured,(function(e){return n("div",{key:e,staticClass:"nthz hidden md:block"},[n("nuxt-link",{attrs:{to:"/articles/"+e.slug}},[n("div",{staticClass:"h-72 md:h-96 custom-radius group"},[n("div",{staticClass:"h-3/5 flex items-center justify-center"},[n("div",{staticClass:"featbox"},[n("img",{staticClass:"featimg",attrs:{src:r(355)("./"+e.img),alt:""}})])]),t._v(" "),n("div",{staticClass:"bg-white bg-opacity-75 group-hover:bg-opacity-50 transition duration-200 h-2/5 p-5 z-30"},[n("p",{staticClass:"mb-1 md:mb-1 text-sm md:text-sm text-gray-500"},[t._v(t._s(e.category))]),t._v(" "),n("h3",{staticClass:"text-gray-800 poppins text-lg font-medium keepall mb-1"},[t._v(t._s(e.title))]),t._v(" "),n("p",{staticClass:"text-sm md:text-sm text-gray-500"},[t._v(t._s(e.author))])])])])],1)})),t._v(" "),t._l(t.featuredone,(function(e){return n("div",{key:e,staticClass:"block md:hidden"},[n("nuxt-link",{attrs:{to:"/articles/"+e.slug}},[n("div",{staticClass:"back-yellow rounded-lg h-52 py-5 px-6 relative"},[n("div",[n("p",{staticClass:"poppins text-gray-800"},[t._v(t._s(e.category))]),t._v(" "),n("p",{staticClass:"text-xl poppins text-gray-800 font-medium pt-1"},[t._v(t._s(e.title))]),t._v(" "),n("p",{staticClass:"poppins text-gray-600 pt-1 ftmore"},[t._v(t._s(e.description))])]),t._v(" "),n("div",{staticClass:"absolute bottom-0 pb-5"},[n("p",{staticClass:"poppins text-gray-800 group-hover:underline"},[t._v("See More")])])])])],1)})),t._v(" "),n("div",{staticClass:"flex justify-center pt-0.5 block md:hidden"},[n("nuxt-link",{staticClass:"poppins text-blue-500 text-center text-sm",attrs:{to:"featured"}},[t._v("\n            More Featured Articles\n          ")])],1)],2),t._v(" "),t._m(1),t._v(" "),n("Search"),t._v(" "),n("div",{staticClass:"mt-14 md:mt-24 mb-6 md:mb-10 flex justify-between items-center max-w-6xl mx-auto px-6"},[n("div",{staticClass:"text-3xl md:text-4xl text-gray-800 font-medium poppins"},[t._v("Latest Articles")]),t._v(" "),n("nuxt-link",{attrs:{to:"/articles"}},[n("div",{staticClass:"text-base text-blue-500 poppins hover:underline hidden md:block"},[t._v("See All Articles")])])],1),t._v(" "),n("div",{staticClass:"max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 max-w-6xl mx-auto px-6"},[t._l(t.articles,(function(article){return n("div",{key:article,staticClass:"group"},[n("nuxt-link",{attrs:{to:"/articles/"+article.slug}},[n("div",{staticClass:"article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600"},[n("div",{staticClass:"pr-4"},[n("p",{staticClass:"mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400"},[t._v(t._s(article.category)+" · "+t._s(article.author))]),t._v(" "),n("h2",{staticClass:"mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800"},[t._v(t._s(article.title))]),t._v(" "),n("p",{staticClass:" text-sm md:text-base text-gray-600 custom-text"},[t._v(t._s(article.description))])]),t._v(" "),n("div",{staticClass:"pl-4 pr-6 hidden md:block"},[n("ExternalLinkLogo",{staticClass:"fill-current text-gray-400 group-hover:text-gray-700 transition duration-200"})],1)])])],1)})),t._v(" "),n("div",{staticClass:"flex justify-center pt-1 block md:hidden"},[n("nuxt-link",{staticClass:"poppins text-blue-500 text-center text-sm",attrs:{to:"/articles"}},[t._v("\n            See All Articles\n          ")])],1)],2),t._v(" "),t._m(2),t._v(" "),n("Category")],1)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"pt-14 md:pt-36 pb-0 md:pb-10 max-w-6xl mx-auto px-6"},[r("div",{staticClass:"pb-6 poppins text-left md:text-left text-5xl md:text-7xl font-medium text-gray-800"},[t._v("\n        Study N' Share\n      ")]),t._v(" "),r("div",{staticClass:"font-normal text-base md:text-xl text-gray-600 keepall"},[t._v("\n        오늘 얻은 지식, 오늘 저지른 실수, 오늘 발견한 꼼수까지. "),r("br",{staticClass:"hidden md:inline"}),t._v(" 혼자만의 성장에 그치지 않는 커뮤니티의 성장을 지향합니다.\n      ")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mt-14 md:mt-24 mb-5 md:mb-8 flex justify-between items-center max-w-6xl mx-auto px-6"},[r("div",{staticClass:"text-3xl md:text-4xl text-gray-800 font-medium poppins"},[t._v("Search Articles")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mt-10 md:mt-20 pb-7 md:pb-10 flex justify-between items-center max-w-6xl mx-auto px-6"},[r("div",{staticClass:"text-3xl md:text-4xl text-gray-800 font-medium poppins"},[t._v("Categories")])])}],!1,null,"58017178",null);e.default=component.exports;installComponents(component,{Search:r(312).default,ExternalLinkLogo:r(281).default,Category:r(317).default})}}]);