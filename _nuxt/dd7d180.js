(window.webpackJsonp=window.webpackJsonp||[]).push([[23,5,8,9],{309:function(t,e,r){var content=r(311);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("21cbda58",content,!0,{sourceMap:!1})},310:function(t,e,r){"use strict";r(309)},311:function(t,e,r){var n=r(29)((function(i){return i[1]}));n.push([t.i,".altfive[data-v-efecb3ac]{height:1.35rem}",""]),n.locals={},t.exports=n},312:function(t,e,r){"use strict";r.r(e);r(310);var n=r(10),component=Object(n.a)({},(function(){var t=this._self._c;return t("svg",{staticClass:"w-auto md:block altfive",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[t("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"}})])}),[],!1,null,"efecb3ac",null);e.default=component.exports},313:function(t,e,r){var content=r(338);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("2424aed4",content,!0,{sourceMap:!1})},315:function(t,e,r){var content=r(342);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("afff7484",content,!0,{sourceMap:!1})},337:function(t,e,r){"use strict";r(313)},338:function(t,e,r){var n=r(29)((function(i){return i[1]}));n.push([t.i,".searchcolor[data-v-592ba209]{filter:invert(43%) sepia(10%) saturate(535%) hue-rotate(182deg) brightness(99%) contrast(88%)}.octcat-color[data-v-592ba209]{filter:invert(66%) sepia(11%) saturate(293%) hue-rotate(179deg) brightness(96%) contrast(89%)}",""]),n.locals={},t.exports=n},340:function(t,e,r){"use strict";r.r(e);r(337);var n=r(10),component=Object(n.a)({},(function(){var t=this._self._c;return t("svg",{staticClass:"fill-current text-gray-300 w-auto md:block h-5 octcat-color",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[t("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}})])}),[],!1,null,"592ba209",null);e.default=component.exports},341:function(t,e,r){"use strict";r(315)},342:function(t,e,r){var n=r(29)((function(i){return i[1]}));n.push([t.i,".lastborder[data-v-ea6840ac]:last-child{border-bottom:none}input[data-v-ea6840ac]:focus,select[data-v-ea6840ac]:focus,textarea[data-v-ea6840ac]:focus{outline:none}input[data-v-ea6840ac]::-ms-clear,input[data-v-ea6840ac]::-ms-reveal{display:none;width:0;height:0}input[data-v-ea6840ac]::-webkit-search-cancel-button,input[data-v-ea6840ac]::-webkit-search-decoration,input[data-v-ea6840ac]::-webkit-search-results-button,input[data-v-ea6840ac]::-webkit-search-results-decoration{display:none}",""]),n.locals={},t.exports=n},343:function(t,e,r){"use strict";r.r(e);var n=r(8),l=(r(44),r(32),r(142),{data:function(){return{query:"",articles:[]}},watch:{query:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=3;break}return e.articles=[],r.abrupt("return");case 3:return r.next=5,e.$content("blog").only(["title","slug"]).sortBy("createdAt","desc").limit(15).search(t).fetch();case 5:e.articles=r.sent;case 6:case"end":return r.stop()}}),r)})))()}}}),o=(r(341),r(10)),component=Object(o.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"max-w-6xl mx-auto px-6 pt-1 md:pt-0 md:0b-0"},[e("div",{staticClass:"shadow-sm md:shadow w-full rounded-lg border border-gray-300 flex items-center mb-4 py-3 md:py-3.5 px-5 bg-white"},[e("SearchIcon"),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],staticClass:"ml-3 bg-white flex-auto text-base text-gray-800 pr-3.5 md:pr-6 flex items-center placeholder-text-gray-400",attrs:{placeholder:"다양한 주제의 글을 검색해보세요",type:"search",autocomplete:"off"},domProps:{value:t.query},on:{input:function(e){e.target.composing||(t.query=e.target.value)}}})],1),t._v(" "),t.articles.length?e("ul",{staticClass:"shadow-sm md:shadow rounded-lg border border-gray-300 px-4 bg-white"},t._l(t.articles,(function(article){return e("li",{key:article.slug,staticClass:"text-gray-600 py-2.5 md:py-3.5 border-b text-base lastborder"},[e("nuxt-link",{attrs:{to:"article/".concat(article.slug)}},[t._v("\n        "+t._s(article.title)+"\n      ")])],1)})),0):t._e()])}),[],!1,null,"ea6840ac",null);e.default=component.exports;installComponents(component,{SearchIcon:r(340).default})},362:function(t,e,r){var content=r(391);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(30).default)("da82c76a",content,!0,{sourceMap:!1})},390:function(t,e,r){"use strict";r(362)},391:function(t,e,r){var n=r(29)((function(i){return i[1]}));n.push([t.i,".nthz[data-v-46213ea3]:first-child{background-color:#fbbf25;border-radius:.6rem}.nthz[data-v-46213ea3]:nth-child(2){background-color:#11ba81;border-radius:.6rem}.nthz[data-v-46213ea3]:nth-child(3){background-color:#3c82f6;border-radius:.6rem}.keepall[data-v-46213ea3]{word-break:keep-all}.bw[data-v-46213ea3]{border:1.8px solid #1f2937}.featbox[data-v-46213ea3]{width:250px;height:160px;border-radius:5%;overflow:hidden}.featboxalt[data-v-46213ea3]{width:auto;height:230px;border-radius:0;overflow:hidden}.featimg[data-v-46213ea3]{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.back-yellow[data-v-46213ea3]{background-color:#fbbf25}.ftmore[data-v-46213ea3]{font-size:.92rem}",""]),n.locals={},t.exports=n},424:function(t,e,r){"use strict";r.r(e);r(31),r(51);var n=r(8),l=(r(44),{asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,l,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,e.next=3,r("articles").sortBy("createdAt","desc").limit(10).fetch();case 3:return n=e.sent,e.next=6,r("projects").sortBy("createdAt","desc").limit(5).fetch();case 6:return l=e.sent,e.next=9,r("articles").where({featured:"Featured"}).sortBy("createdAt","desc").limit(3).fetch();case 9:return o=e.sent,e.next=12,r("articles").where({featured:"Featured"}).sortBy("createdAt","desc").limit(1).fetch();case 12:return c=e.sent,e.abrupt("return",{articles:n,featured:o,featuredone:c,proArticles:l});case 14:case"end":return e.stop()}}),e)})))()},methods:{formatDate:function(t){return new Date(t).toLocaleDateString("en",{year:"numeric",month:"long",day:"numeric"})}}}),o=(r(390),r(10)),component=Object(o.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"w-full bg-gray-50"},[e("div",{staticClass:"pt-16"},[t._m(0),t._v(" "),t._m(1),t._v(" "),e("Search"),t._v(" "),e("div",{staticClass:"mt-14 md:mt-24 mb-6 md:mb-10 flex justify-between items-center max-w-6xl mx-auto px-6"},[e("div",{staticClass:"text-3xl md:text-4xl text-gray-800 font-medium poppins"},[t._v("Latest Articles")]),t._v(" "),e("nuxt-link",{attrs:{to:"/articles"}},[e("div",{staticClass:"text-base text-blue-500 poppins hover:underline hidden md:block"},[t._v("See All Articles")])])],1),t._v(" "),e("div",{staticClass:"max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 max-w-6xl mx-auto px-6"},[t._l(t.articles,(function(article){return e("div",{key:article,staticClass:"group"},[e("nuxt-link",{attrs:{to:"/articles/".concat(article.slug)}},[e("div",{staticClass:"article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600"},[e("div",{staticClass:"pr-4"},[e("p",{staticClass:"mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400"},[t._v(t._s(article.category)+" · "+t._s(article.author))]),t._v(" "),e("h2",{staticClass:"mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800"},[t._v(t._s(article.title))]),t._v(" "),e("p",{staticClass:"text-sm md:text-base text-gray-600 custom-text"},[t._v(t._s(article.description))])]),t._v(" "),e("div",{staticClass:"pl-4 pr-6 hidden md:block"},[e("ExternalLinkLogo",{staticClass:"fill-current text-gray-400 group-hover:text-gray-700 transition duration-200"})],1)])])],1)})),t._v(" "),e("div",{staticClass:"flex justify-center pt-1 block md:hidden"},[e("nuxt-link",{staticClass:"poppins text-blue-500 text-center text-sm",attrs:{to:"/articles"}},[t._v("\n            See All Articles\n          ")])],1)],2),t._v(" "),e("div",{staticClass:"mt-14 md:mt-24 mb-6 md:mb-10 flex justify-between items-center max-w-6xl mx-auto px-6"},[e("div",{staticClass:"text-3xl md:text-4xl text-gray-800 font-medium poppins"},[t._v("Latest Projects")]),t._v(" "),e("nuxt-link",{attrs:{to:"/projects"}},[e("div",{staticClass:"text-base text-blue-500 poppins hover:underline hidden md:block"},[t._v("See All Projects")])])],1),t._v(" "),e("div",{staticClass:"max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 max-w-6xl mx-auto px-6 pb-16 md:pb-28"},[t._l(t.proArticles,(function(article){return e("div",{key:article,staticClass:"group"},[e("nuxt-link",{attrs:{to:"/projects/".concat(article.slug)}},[e("div",{staticClass:"article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600"},[e("div",{staticClass:"pr-4"},[e("p",{staticClass:"mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400"},[t._v(t._s(article.author))]),t._v(" "),e("h2",{staticClass:"mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800"},[t._v(t._s(article.title))]),t._v(" "),e("p",{staticClass:"text-sm md:text-base text-gray-600 custom-text"},[t._v(t._s(article.description))])]),t._v(" "),e("div",{staticClass:"pl-4 pr-6 hidden md:block"},[e("ExternalLinkLogo",{staticClass:"fill-current text-gray-400 group-hover:text-gray-700 transition duration-200"})],1)])])],1)})),t._v(" "),e("div",{staticClass:"flex justify-center pt-1 block md:hidden"},[e("nuxt-link",{staticClass:"poppins text-blue-500 text-center text-sm",attrs:{to:"/projects"}},[t._v("\n            See All Projects\n          ")])],1)],2)],1)])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"pt-14 md:pt-36 pb-0 md:pb-10 max-w-6xl mx-auto px-6"},[e("div",{staticClass:"pb-6 poppins text-left md:text-left text-5xl md:text-7xl font-medium text-gray-800"},[t._v("\n        Study N' Share\n      ")]),t._v(" "),e("div",{staticClass:"font-normal text-base md:text-xl text-gray-600 keepall"},[t._v("\n        오늘 얻은 지식, 오늘 저지른 실수, 오늘 발견한 꼼수까지. "),e("br",{staticClass:"hidden md:inline"}),t._v(" 혼자만의 성장에 그치지 않는 커뮤니티의 성장을 지향합니다.\n      ")])])},function(){var t=this._self._c;return t("div",{staticClass:"mt-14 md:mt-24 mb-5 md:mb-8 flex justify-between items-center max-w-6xl mx-auto px-6"},[t("div",{staticClass:"text-3xl md:text-4xl text-gray-800 font-medium poppins"},[this._v("Search Articles")])])}],!1,null,"46213ea3",null);e.default=component.exports;installComponents(component,{Search:r(343).default,ExternalLinkLogo:r(312).default})}}]);