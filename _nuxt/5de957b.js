(window.webpackJsonp=window.webpackJsonp||[]).push([[23,5],{278:function(t,e,n){var content=n(280);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(30).default)("17ec4d76",content,!0,{sourceMap:!1})},279:function(t,e,n){"use strict";n(278)},280:function(t,e,n){var o=n(29)((function(i){return i[1]}));o.push([t.i,"/*purgecss start ignore*/\n.altfive[data-v-efecb3ac]{\n  height:1.35rem\n}\n\n/*purgecss end ignore*/",""]),o.locals={},t.exports=o},281:function(t,e,n){"use strict";n.r(e);n(279);var o=n(9),component=Object(o.a)({},(function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"w-auto md:block altfive",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[e("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"}})])}),[],!1,null,"efecb3ac",null);e.default=component.exports},284:function(t,e,n){var map={"./eunsol.jpg":285,"./geonwoo.jpg":286,"./hakyoung.jpg":287,"./heemin.jpg":288,"./heewoong.jpg":289,"./hwikyung.jpg":290,"./ilgoo.jpg":291,"./jaehyoung.jpg":292,"./jiwoo.jpg":293,"./jooyoung.jpg":294,"./junho.jpg":295,"./kyunghun.jpg":296,"./minjun.jpg":297,"./moonsun.jpg":298,"./peniel.jpg":299,"./seokjoo.jpg":300,"./seoyeon.jpg":301,"./songgyeong.jpg":302,"./uhyeon.JPG":303,"./youngbeen.jpg":304};function o(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=r,t.exports=o,o.id=284},285:function(t,e,n){t.exports=n.p+"img/eunsol.8a0eeaf.jpg"},286:function(t,e,n){t.exports=n.p+"img/geonwoo.39e619c.jpg"},287:function(t,e,n){t.exports=n.p+"img/hakyoung.a7f4668.jpg"},288:function(t,e,n){t.exports=n.p+"img/heemin.c61b693.jpg"},289:function(t,e,n){t.exports=n.p+"img/heewoong.b7e5d1f.jpg"},290:function(t,e,n){t.exports=n.p+"img/hwikyung.b8b9f04.jpg"},291:function(t,e,n){t.exports=n.p+"img/ilgoo.39ec243.jpg"},292:function(t,e,n){t.exports=n.p+"img/jaehyoung.dcadcdc.jpg"},293:function(t,e,n){t.exports=n.p+"img/jiwoo.87f26fd.jpg"},294:function(t,e,n){t.exports=n.p+"img/jooyoung.bb6b205.jpg"},295:function(t,e,n){t.exports=n.p+"img/junho.b01e933.jpg"},296:function(t,e,n){t.exports=n.p+"img/kyunghun.9beb14e.jpg"},297:function(t,e,n){t.exports=n.p+"img/minjun.e7101cf.jpg"},298:function(t,e,n){t.exports=n.p+"img/moonsun.3549a31.jpg"},299:function(t,e,n){t.exports=n.p+"img/peniel.aabf029.jpg"},300:function(t,e,n){t.exports=n.p+"img/seokjoo.6b400cd.jpg"},301:function(t,e,n){t.exports=n.p+"img/seoyeon.0aa75e6.jpg"},302:function(t,e,n){t.exports=n.p+"img/songgyeong.f86d17d.jpg"},303:function(t,e,n){t.exports=n.p+"img/uhyeon.2b5ad42.JPG"},304:function(t,e,n){t.exports=n.p+"img/youngbeen.ae00b16.jpg"},328:function(t,e,n){var content=n(352);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(30).default)("91e27404",content,!0,{sourceMap:!1})},351:function(t,e,n){"use strict";n(328)},352:function(t,e,n){var o=n(29)((function(i){return i[1]}));o.push([t.i,"/*purgecss start ignore*/\n.custom-text{\n  word-break:keep-all\n}\n.lead-box{\n  border-radius:70%;\n  overflow:hidden\n}\n.profile{\n  width:100%;\n  height:100%;\n  -o-object-fit:cover;\n     object-fit:cover\n}\n\n/*purgecss end ignore*/",""]),o.locals={},t.exports=o},402:function(t,e,n){"use strict";n.r(e);var o=n(8),r=(n(43),n(24),n(32),n(49),{asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,r,c,m,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,o=t.params,e.next=3,n("members",o.slug).fetch();case 3:return r=e.sent,c=r.name,e.next=7,n("articles").where({author:c}).sortBy("createdAt","desc").fetch();case 7:return m=e.sent,e.next=10,n("projects").where({author:c}).sortBy("createdAt","desc").fetch();case 10:return l=e.sent,e.abrupt("return",{member:r,memberArticles:m,authorName:c,proArticles:l});case 12:case"end":return e.stop()}}),e)})))()},head:function(){return{title:this.member.name,desciption:this.member.description,htmlAttrs:{lang:"ko"},meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{hid:"t-type",name:"twitter:card",content:"summary_large_image"},{hid:"og-type",property:"og:type",content:"website"},{hid:"og:title",property:"og:title",content:this.member.name},{hid:"og:description",property:"og:description",content:this.member.description},{hid:"og:image",property:"og:image",content:"https://raw.githubusercontent.com/GDSC-CAU/GDSC-CAU.github.io/main/static/opengraph_image.png"},{hid:"og:image:secure_url",property:"og:image:secure_url",content:"https://raw.githubusercontent.com/GDSC-CAU/GDSC-CAU.github.io/main/static/opengraph_image.png"},{hid:"og:image:alt",property:"og:image:alt",content:this.member.name},{hid:"og:url",name:"og:url",content:"https://gdsc-cau.github.io/member/".concat(this.$route.params.slug)}]}}}),c=(n(351),n(9)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"w-full bg-gray-50"},[o("div",{staticClass:"max-w-6xl mx-auto px-6 flex justify-center pt-28 md:pt-40"},[o("div",[o("div",{staticClass:"lead-box w-40 h-40 md:w-52 md:h-52 mb-4 md:mb-6 mx-auto"},[o("img",{staticClass:"profile",attrs:{src:n(284)("./"+t.member.img),alt:""}})]),t._v(" "),o("div",{staticClass:"text-gray-800 text-2xl md:text-3xl font-medium flex justify-center poppins pb-0 md:pb-1.5"},[t._v(t._s(t.member.name))]),t._v(" "),o("div",{staticClass:"flex justify-center poppins text-lg md:text-xl text-gray-800 pb-1.5 md:pb-3"},[t._v(t._s(t.member.role))]),t._v(" "),o("div",{staticClass:"text-gray-500 px-0 md:px-20 pb-4 flex justify-center text-center custom-text"},[t._v(t._s(t.member.description))])])]),t._v(" "),t._m(0),t._v(" "),o("div",{staticClass:"max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 pb-8 md:pb-12 max-w-6xl mx-auto px-6"},t._l(t.proArticles,(function(e){return o("div",{key:e,staticClass:"group"},[o("nuxt-link",{attrs:{to:{path:"/articles/"+e.slug}}},[o("div",{staticClass:"article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600"},[o("div",{staticClass:"pr-4"},[o("p",{staticClass:"mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400"},[t._v(t._s(e.author))]),t._v(" "),o("h2",{staticClass:"mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800"},[t._v(t._s(e.title))]),t._v(" "),o("p",{staticClass:" text-sm md:text-base text-gray-600 custom-text"},[t._v(t._s(e.description))])]),t._v(" "),o("div",{staticClass:"pl-4 pr-6 hidden md:block"},[o("ExternalLinkLogo",{staticClass:"fill-current text-gray-400 group-hover:text-gray-700 transition duration-200"})],1)])])],1)})),0),t._v(" "),t._m(1),t._v(" "),o("div",{staticClass:"max-w-6xl grid grid-cols-1 colspan mt-5 md:mt-8 pb-14 md:pb-24 max-w-6xl mx-auto px-6"},t._l(t.memberArticles,(function(e){return o("div",{key:e,staticClass:"group"},[o("nuxt-link",{attrs:{to:{path:"/articles/"+e.slug}}},[o("div",{staticClass:"article-inner flex justify-between items-center border-t py-5 md:py-8 border-gray-600"},[o("div",{staticClass:"pr-4"},[o("p",{staticClass:"mb-1 md:mb-1.5 text-sm md:text-sm text-gray-400"},[t._v(t._s(e.category)+" · "+t._s(e.author))]),t._v(" "),o("h2",{staticClass:"mb-1 md:mb-1.5 text-lg md:text-xl font-medium poppins text-gray-800"},[t._v(t._s(e.title))]),t._v(" "),o("p",{staticClass:" text-sm md:text-base text-gray-600 custom-text"},[t._v(t._s(e.description))])]),t._v(" "),o("div",{staticClass:"pl-4 pr-6 hidden md:block"},[o("ExternalLinkLogo",{staticClass:"fill-current text-gray-400 group-hover:text-gray-700 transition duration-200"})],1)])])],1)})),0)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pt-8 md:pt-16 flex justify-between items-center max-w-6xl mx-auto px-6"},[n("div",{staticClass:"text-2xl md:text-3xl text-gray-800 font-medium poppins"},[t._v("Projects")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex justify-between items-center max-w-6xl mx-auto px-6"},[n("div",{staticClass:"text-2xl md:text-3xl text-gray-800 font-medium poppins"},[t._v("Articles")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{ExternalLinkLogo:n(281).default})}}]);