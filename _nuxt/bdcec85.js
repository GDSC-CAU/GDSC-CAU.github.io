(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{314:function(t,e,n){var map={"./eunseo.jpg":316,"./eunsol.jpg":317,"./geonwoo.jpg":318,"./hakyoung.jpg":319,"./heemin.jpg":320,"./heewoong.jpg":321,"./hojoon.jpg":322,"./hwikyung.jpg":323,"./hyunyeop.jpg":324,"./ilgoo.jpg":325,"./ilsang.jpg":326,"./jaehyoung.jpg":327,"./jiwoo.jpg":328,"./jooyoung.jpg":329,"./junho.jpg":330,"./kyunghun.jpg":331,"./minjun.jpg":332,"./moonsun.jpg":333,"./myungseung.jpg":334,"./peniel.jpg":335,"./sangho.jpg":336,"./sangwoo.jpg":337,"./seokjoo.jpg":338,"./seoyeon.jpg":339,"./seungyeon.jpg":340,"./songgyeong.jpg":341,"./uhyeon.JPG":342,"./youngbeen.jpg":343};function o(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=r,t.exports=o,o.id=314},316:function(t,e,n){t.exports=n.p+"img/eunseo.3e313ad.jpg"},317:function(t,e,n){t.exports=n.p+"img/eunsol.8a0eeaf.jpg"},318:function(t,e,n){t.exports=n.p+"img/geonwoo.39e619c.jpg"},319:function(t,e,n){t.exports=n.p+"img/hakyoung.a7f4668.jpg"},320:function(t,e,n){t.exports=n.p+"img/heemin.c61b693.jpg"},321:function(t,e,n){t.exports=n.p+"img/heewoong.b7e5d1f.jpg"},322:function(t,e,n){t.exports=n.p+"img/hojoon.4bfe1b5.jpg"},323:function(t,e,n){t.exports=n.p+"img/hwikyung.b8b9f04.jpg"},324:function(t,e,n){t.exports=n.p+"img/hyunyeop.586f8fc.jpg"},325:function(t,e,n){t.exports=n.p+"img/ilgoo.39ec243.jpg"},326:function(t,e,n){t.exports=n.p+"img/ilsang.87f10ed.jpg"},327:function(t,e,n){t.exports=n.p+"img/jaehyoung.dcadcdc.jpg"},328:function(t,e,n){t.exports=n.p+"img/jiwoo.87f26fd.jpg"},329:function(t,e,n){t.exports=n.p+"img/jooyoung.bb6b205.jpg"},330:function(t,e,n){t.exports=n.p+"img/junho.b01e933.jpg"},331:function(t,e,n){t.exports=n.p+"img/kyunghun.9beb14e.jpg"},332:function(t,e,n){t.exports=n.p+"img/minjun.e7101cf.jpg"},333:function(t,e,n){t.exports=n.p+"img/moonsun.3549a31.jpg"},334:function(t,e,n){t.exports=n.p+"img/myungseung.572a291.jpg"},335:function(t,e,n){t.exports=n.p+"img/peniel.aabf029.jpg"},336:function(t,e,n){t.exports=n.p+"img/sangho.055e84a.jpg"},337:function(t,e,n){t.exports=n.p+"img/sangwoo.2d6f904.jpg"},338:function(t,e,n){t.exports=n.p+"img/seokjoo.6b400cd.jpg"},339:function(t,e,n){t.exports=n.p+"img/seoyeon.0aa75e6.jpg"},340:function(t,e,n){t.exports=n.p+"img/seungyeon.db9b49c.jpg"},341:function(t,e,n){t.exports=n.p+"img/songgyeong.f86d17d.jpg"},342:function(t,e,n){t.exports=n.p+"img/uhyeon.2b5ad42.JPG"},343:function(t,e,n){t.exports=n.p+"img/youngbeen.ae00b16.jpg"},365:function(t,e,n){var content=n(390);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(30).default)("5be95a92",content,!0,{sourceMap:!1})},389:function(t,e,n){"use strict";n(365)},390:function(t,e,n){var o=n(29)((function(i){return i[1]}));o.push([t.i,".custom-text[data-v-540cb322]{word-break:keep-all}.back-yellow[data-v-540cb322]{background-color:#fbbf25}.lead-box[data-v-540cb322]{border-radius:70%;overflow:hidden}.profile[data-v-540cb322]{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}",""]),o.locals={},t.exports=o},426:function(t,e,n){"use strict";n.r(e);n(26);var o=n(8),r=(n(44),{asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,e.next=3,n("members").where({role:{$eq:"Member"}}).sortBy("name","asc").fetch();case 3:return o=e.sent,e.next=6,n("members").where({role:{$contains:["Alumni"]}}).sortBy("name","asc").fetch();case 6:return r=e.sent,e.abrupt("return",{member:o,alumni:r});case 8:case"end":return e.stop()}}),e)})))()},head:{title:"Members",htmlAttrs:{lang:"ko"},meta:[{charset:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{hid:"description",name:"description",content:"중앙대학교 Google DSC 블로그입니다. 활동 관련 소식, 공부 내용 등을 주기적으로 업로드합니다."},{name:"format-detection",content:"telephone=no"}]}}),c=(n(389),n(10)),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("div",[t._m(0),t._v(" "),e("div",{staticClass:"max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-9 pb-20 md:pb-24"},t._l(t.member,(function(o){return e("div",{key:o},[e("nuxt-link",{staticClass:"group",attrs:{to:"/members/".concat(o.slug)}},[e("div",{staticClass:"flex justify-center mb-3 md:mb-5"},[e("div",{staticClass:"lead-box h-32 w-32 md:h-40 md:w-40"},[e("img",{staticClass:"profile",attrs:{src:n(314)("./".concat(o.img)),alt:""}})])]),t._v(" "),e("div",[e("div",{staticClass:"text-lg md:text-xl flex justify-center poppins text-gray-800 group-hover:underline"},[t._v(t._s(o.name))]),t._v(" "),e("div",{staticClass:"text-sm md:text-base flex justify-center poppins text-gray-800"},[t._v(t._s(o.role))])])])],1)})),0),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-9 pb-20 md:pb-24"},t._l(t.alumni,(function(o){return e("div",{key:o},[e("nuxt-link",{staticClass:"group",attrs:{to:"/members/".concat(o.slug)}},[e("div",{staticClass:"flex justify-center mb-3 md:mb-5"},[e("div",{staticClass:"lead-box h-32 w-32 md:h-40 md:w-40"},[e("img",{staticClass:"profile",attrs:{src:n(314)("./".concat(o.img)),alt:""}})])]),t._v(" "),e("div",[e("div",{staticClass:"text-lg md:text-xl flex justify-center poppins text-gray-800 group-hover:underline"},[t._v(t._s(o.name))]),t._v(" "),e("div",{staticClass:"text-sm md:text-base flex justify-center poppins text-gray-800"},[t._v(t._s(o.role))])])])],1)})),0)])}),[function(){var t=this._self._c;return t("div",{staticClass:"pt-28 md:pt-52 pb-0 md:pb-14 max-w-6xl mx-auto px-6"},[t("div",{staticClass:"pb-10 poppins text-3xl md:text-7xl font-medium text-gray-800"},[this._v("\n            Members\n        ")])])},function(){var t=this._self._c;return t("div",{staticClass:"pt-28 md:pt-52 pb-0 md:pb-14 max-w-6xl mx-auto px-6"},[t("div",{staticClass:"pb-10 poppins text-3xl md:text-7xl font-medium text-gray-800"},[this._v("\n            Alumni\n        ")])])}],!1,null,"540cb322",null);e.default=component.exports}}]);