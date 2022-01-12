__NUXT_JSONP__("/member/geonwoo", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE,aF,aG,aH,aI,aJ,aK,aL,aM,aN,aO,aP,aQ,aR,aS,aT,aU,aV,aW,aX,aY,aZ,a_,a$,ba,bb,bc,bd,be,bf,bg,bh,bi,bj){return {data:[{member:{slug:"geonwoo",name:O,description:"Interested in DL, NLP, GPU\u002FTPU\u002FNeuromorphic Hardware architecture",role:"Member",img:"geonwoo.jpg",dir:"\u002Fmembers",path:"\u002Fmembers\u002Fgeonwoo",extension:".yaml",createdAt:an,updatedAt:"2021-11-26T03:05:49.000Z"},memberArticles:[{slug:"data-study-week-3-NLP_tutorial",description:"NLP에서 사용하는 라이브러리와 토큰화란 무엇인지에 대한 내용입니다.",title:"NLP 프레임워크와 토큰화",category:ao,author:O,featured:"none",toc:[{id:ap,depth:G,text:aq},{id:ar,depth:G,text:as},{id:at,depth:G,text:au},{id:av,depth:G,text:aw},{id:ax,depth:P,text:ay},{id:az,depth:G,text:aA}],body:{type:aB,children:[{type:b,tag:H,props:{id:ap},children:[{type:b,tag:n,props:{href:"#0-%EC%84%9C%EB%A1%A0",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:aq}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"앞선 학습에서 BS와 Selenium, Scrapy를 사용해 웹상에서 목표로 하는 문자정보를 추출하는 방법을 익혔습니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n이번에는 NLP(자연어처리)에 대해 본격적으로 들어가보려 합니다."}]},{type:a,value:f},{type:b,tag:H,props:{id:ar},children:[{type:b,tag:n,props:{href:"#1-nlpnatural-language-processing%EC%9D%B4%EB%9E%80",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:as}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"자연어 처리를 NLP라고 한다. 쉽게 말해서 기계가 인간의 언어를 해석할 수 있게끔 처리하는 것을 의미합니다. 이는 NLU(Natural Language Understanding, 자연어 이해)과도 연관이 깊다. 검색엔진, QA시스템, 대화봇 등 다양한 분야에서 활용됩니다."}]},{type:a,value:f},{type:b,tag:J,props:{id:aC},children:[]},{type:a,value:f},{type:b,tag:H,props:{id:at},children:[{type:b,tag:n,props:{href:"#2-%ED%86%A0%ED%81%B0%ED%99%94tokenization%EB%9E%80",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:au}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"토큰화는 텍스트 전처리 프로세스 중 하나로 텍스트를 해당 언어의 특정한 단위(예 : 단어, 특정한 문자열 등)에 맞춰 잘게 쪼개는 것을 의미합니다. 이 때 만들어진 쪼개진 문자열 하나 하나를 토큰이라고 합니다."}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"예를 들자면 아래의 예시처럼 문장을 쪼개는 것입니다."}]},{type:a,value:f},{type:b,tag:Q,props:{},children:[{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"입력 : \"Time is an illusion. Lunchtime double so!\""}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"출력 : \"Time\", \"is\", \"an\", \"illustion\", \"Lunchtime\", \"double\", \"so\""}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"위 예는 단어 단위로 자른 것입니다. 문자열을 자르는 것이기 때문에 자르는 규칙이 굉장히 중요합니다. 구두점과 같은 구분 문자(delimeter)을 바탕으로 쪼갤 수도 있고, 영어의 경우는 아포스트로피(')를 분리시킬지 고려할 수 도 있습니다."}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"이처럼 분리작업을 함과 동시에 각각의 문자열에 문법적 분류 레이블도 지정할 수도 있습니다. 이것이 중요한 이유는, 문법적 분류, 예를들어 어떤 단어가 명사인지 동사인지에 따라 사람이 이해하는 의미가 달라지기 때문입니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n예를 들어, fly라는 영단어는 명사로 취급할 때에는 '파리'를 의미하고, 동사로 취급할 때에는 '날다'라는 용언을 의미합니다. 이처럼 사람이 이해하는 의미가 달라지기 때문에 기계가 학습을 가능케 해주는 레이블에는 문법적 분류라는 중요한 요소가 포함되어야 합니다."}]},{type:a,value:f},{type:b,tag:J,props:{id:aD},children:[{type:b,tag:n,props:{href:aE,ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]}]},{type:a,value:f},{type:b,tag:H,props:{id:av},children:[{type:b,tag:n,props:{href:"#3-%ED%86%A0%ED%81%B0%ED%99%94-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:aw}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"토큰화를 해주는 라이브러리는 영어의 경우 대표적으로 NLTK가 있습니다. 정확히는 NLTK가 토큰화만을 위한 것이 아닌 전반적인 기호, 통계, 자연어처리를 위한 범용적 프로그램의 합본으로 볼 수 있습니다. NLTK는 pip 명령어를 통해 설치할 수 있으며 성능도 영어 한정해서는 일반적인 프로젝트 진행에 전혀 무리 없을 정도로 준수하므로 영어 코퍼스를 통해 학습을 해야하는 경우에는 NLTK를 사용합니다."}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:b,tag:n,props:{href:"https:\u002F\u002Fwww.nltk.org\u002Fapi\u002Fnltk.tokenize.html#module-nltk.tokenize",rel:[R,S,T],target:U},children:[{type:a,value:"NLTK 토큰화 패키지 공식문서"}]},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n다른 여러가지 기능들도 있지만 이번 주제는 토큰화이므로 토큰화 패키지의 함수 활용을 보고자 한다."}]},{type:a,value:f},{type:b,tag:z,props:{className:[A]},children:[{type:b,tag:B,props:{className:[C,D]},children:[{type:b,tag:x,props:{},children:[{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" nltk \n"},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:E}]},{type:a,value:V},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:W},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" word_tokenize "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 단어 토큰화 도구"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:E}]},{type:a,value:V},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:W},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" WordPunctTokenizer "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 구두점 관련"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:E}]},{type:a,value:V},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:W},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" sent_tokenize "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 문장 토큰화 도구"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:E}]},{type:a,value:V},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:W},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" WhitespaceTokenizer "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 공백문자 관련"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"#from tensorflow.keras.preprocessing.text import text_to_word_sequence : 케라스에서 자체적으로 지원하는 텍스트 전처리도구"}]},{type:a,value:y},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 예시 문장"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 문장 출처 : https:\u002F\u002Fedition.cnn.com\u002F2022\u002F01\u002F06\u002Fchina\u002Fxian-lockdown-zero-covid-intl-hnk\u002Findex.html"}]},{type:a,value:"\nsentence "},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:F}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,I,o]},children:[{type:a,value:"\"\"\"The city of 13 million has been under strict lockdown since December 23, as it grapples with the country's worst coronavirus outbreak since Wuhan, the original epicenter of the pandemic. But local authorities have faced a public outcry over perceived incompetence, and disproportionately harsh measures that critics say harm the lives of those they are supposed to protect.\"\"\""}]},{type:a,value:" \n\n"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# word_tokenize"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:K}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:"word_tokenize"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:X},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Y}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Z}]},{type:b,tag:c,props:{className:[d,N]},children:[{type:a,value:_}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:$}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:y},{type:b,tag:c,props:{className:[d,I,o]},children:[{type:a,value:aF}]},{type:a,value:y},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# wordpunct_tokenize"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:K}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:"wordpunct_tokenize"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:X},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Y}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Z}]},{type:b,tag:c,props:{className:[d,N]},children:[{type:a,value:_}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:$}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,I,o]},children:[{type:a,value:aF}]},{type:a,value:y},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# sent_tokenize"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:K}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:"sent_tokenize"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:X},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,I,o]},children:[{type:a,value:"\"\"\"\noutput : \n[\"The city of 13 million has been under strict lockdown since December 23, as it grapples with the country's worst coronavirus outbreak since Wuhan, the original epicenter of the pandemic.\", 'But local authorities have faced a public outcry over perceived incompetence, and disproportionately harsh measures that critics say harm the lives of those they are supposed to protect.']\n\"\"\""}]},{type:a,value:y},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# WhitespaceTokenizer"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:K}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,aa]},children:[{type:a,value:"list"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:"WhitespaceTokenizer"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"span_tokenize"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:X},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Y}]},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:"-"}]},{type:b,tag:c,props:{className:[d,N]},children:[{type:a,value:_}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Z}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:$}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,I,o]},children:[{type:a,value:"\"\"\"\noutput : \n[(288, 293), (294, 302), (303, 307), (308, 315), (316, 319), (320, 324), (325, 328), (329, 334), (335, 337), (338, 343), (344, 348), (349, 352), (353, 361), (362, 364), (365, 373)]\n\"\"\""}]},{type:a,value:y}]}]}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"위 예제처럼 문장단위, 단어단위, 구두점, 공백과 같은 기준을 가지고 말뭉치(corpus, 코퍼스)를 토큰화할 수 있다."}]},{type:a,value:f},{type:b,tag:J,props:{id:"-2"},children:[{type:b,tag:n,props:{href:"#-2",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]}]},{type:a,value:f},{type:b,tag:ae,props:{id:ax},children:[{type:b,tag:n,props:{href:"#%ED%95%9C%EA%B8%80%EC%9D%80",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:ay}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"영어만 보면 섭하니 한글 말뭉치 토큰화 도구를 간단하게 짚고 넘어가보자."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n한글의 분석에는 형태소라는 가장 작은 단위부터 잘 알고 있어야 한다. 형태소는 크게 두가지가 있다."}]},{type:a,value:f},{type:b,tag:aG,props:{},children:[{type:a,value:f},{type:b,tag:L,props:{},children:[{type:a,value:"자립형태소"}]},{type:a,value:f},{type:b,tag:L,props:{},children:[{type:a,value:"의존형태소"}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"형태소라는 단어가 아닌 최소단위를 가지고 있기 때문에 영어보다 어려운 난이도를 가지고 있다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n그럼에도 한글 토큰화 도구(형태소 분석기)가 있다. KoNLPy, deeq NLP, Okt, 꼬꼬마 등 여러가지가 존재하는데 각기 장점이 다 있다. 개인적으로는 KoNLPy와 deeq NLP를 써보려고 한다."}]},{type:a,value:f},{type:b,tag:J,props:{id:"-3"},children:[{type:b,tag:n,props:{href:"#-3",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]}]},{type:a,value:f},{type:b,tag:H,props:{id:az},children:[{type:b,tag:n,props:{href:"#%EC%9D%B4%ED%9B%84-%ED%95%99%EC%8A%B5-%EB%B0%A9%ED%96%A5",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:aA}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"Scrapy로 웹상의 텍스트를 가져올 수 있고, 토큰화를 비롯한 전처리에 대한 학습이 일단락 되면 본격적으로 언어모델을 만들어보는 미니프로젝트를 진행해보는 것도 좋을 것 같습니다."}]}]},dir:aH,path:"\u002Fblog\u002Fdata-study-week-3-NLP_tutorial",extension:aI,createdAt:"2022-01-06T13:33:00.000Z",updatedAt:"2022-01-07T06:37:33.000Z"},{slug:"data-study-week_1-Selenium",description:"문장 데이터 수집을 위해 필요한 Selenium 내용입니다.",title:"Selenium을 활용한 크롤링",category:ao,author:O,featured:"Featured",img:"selenium.png",toc:[{id:aJ,depth:G,text:aK},{id:aL,depth:P,text:"1. 크롤링(Crawling) 이란?"},{id:aM,depth:P,text:aN},{id:aO,depth:G,text:aP}],body:{type:aB,children:[{type:b,tag:H,props:{id:aJ},children:[{type:b,tag:n,props:{href:"#0-selenium%EC%9D%84-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:aK}]},{type:a,value:f},{type:b,tag:Q,props:{},children:[{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"Selenium 공식문서 : "},{type:b,tag:n,props:{href:aQ,rel:[R,S,T],target:U},children:[{type:a,value:aQ}]}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"셀레니움이란 웹애플리케이션 테스트를 위한 포터블 프레임 워크입니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\nWikipdeia에 따르면 기능테스트를 해보기 위한 도구를 제공한다고 나와있는데요."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n사실 크롤링에는 더 편리한 패키지들이 있습니다.(ex. 스크래피)"},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n따라서 이번에는 셀레니움의 모든 기능을 하나하나 살펴보는 것 보다는 Web Crawling에 어떤 방법으로 적용하여 사용할 수 있을 지를 주안점으로 삼고 진행하겠습니다."}]},{type:a,value:f},{type:b,tag:J,props:{id:aC},children:[]},{type:a,value:f},{type:b,tag:ae,props:{id:aL},children:[{type:b,tag:n,props:{href:"#1-%ED%81%AC%EB%A1%A4%EB%A7%81crawling-%EC%9D%B4%EB%9E%80",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:"1. "},{type:b,tag:aR,props:{},children:[{type:a,value:"크롤링(Crawling)"}]},{type:a,value:" 이란?"}]},{type:a,value:f},{type:b,tag:aG,props:{},children:[{type:a,value:f},{type:b,tag:L,props:{},children:[{type:a,value:"크롤링 또는 스크래핑(scraping)은 "},{type:b,tag:aR,props:{},children:[{type:a,value:"\"웹 페이지를 가져와서 데이터를 추출하는 행위\""}]},{type:a,value:" 를 의미합니다."}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"현재 데이터 스터디에서 공부하고자 하는 바는 NLP인데, 너무 정형화된 데이터를 학습에 이용하는 것 보다는 직접 실제로 사용하는 문장 데이터를 수집하여 학습을 진행하는 것이 더 좋을 것이라 판단했기 때문에 본 학습 이전에 Crawling을 통해 직접 데이터를 수집할 수 있는 것이 목표입니다."}]},{type:a,value:f},{type:b,tag:ae,props:{id:aM},children:[{type:b,tag:n,props:{href:"#2-selenium%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%81%AC%EB%A1%A4%EB%A7%81",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:aN}]},{type:a,value:f},{type:b,tag:aS,props:{},children:[{type:a,value:f},{type:b,tag:L,props:{},children:[{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"Selenium패키지와 Chrome Driver 준비"},{type:b,tag:m,props:{},children:[]},{type:a,value:"\nSelenium패키지는 Pychar, pip, conda 등 다양한 방법으로 설치할 수 있습니다. 이번에는 pip을 사용하도록 하겠습니다."}]},{type:a,value:f},{type:b,tag:z,props:{className:[A]},children:[{type:b,tag:B,props:{className:[C,D]},children:[{type:b,tag:x,props:{},children:[{type:a,value:"pip selenium\n"}]}]}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"코드를 입력하면 Selenium이 설치 됩니다."}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"이제 필요한 것은 Chrome Driver입니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n크롬 드라이버는 코드를 통해 구글 크롬을 실행 및 조작할 수 있는 장치 정도로 생각하면 좋습니다."}]},{type:a,value:f},{type:b,tag:Q,props:{},children:[{type:a,value:f},{type:b,tag:k,props:{},children:[{type:b,tag:n,props:{href:aT,rel:[R,S,T],target:U},children:[{type:a,value:aT}]}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"해당 사이트에서 자신이 사용하는 크롬 버전과 맞는 크롬 드라이버를 다운로드 받은 후, 작업할 디렉토리에 옮겨두기만 하면 끝입니다."}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:L,props:{},children:[{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"Selenium 기본 예제"},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n크롬 드라이버를 활용할 때의 셀레니움은 거의 대부분 다음과 같이 패키지를 불러옵니다."}]},{type:a,value:f},{type:b,tag:z,props:{className:[A]},children:[{type:b,tag:B,props:{className:[C,D]},children:[{type:b,tag:x,props:{},children:[{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:E}]},{type:a,value:aU},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" webdriver\n"},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:E}]},{type:a,value:af},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ag},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ah},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:aV},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" Keys\n"},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" time "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# sleep(\u003Ctime\u003E)을 통해 직접 타이밍을 주기 위함."}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"webdriver을 import했으니 chrome driver과 연결시켜야 합니다."}]},{type:a,value:f},{type:b,tag:z,props:{className:[A]},children:[{type:b,tag:B,props:{className:[C,D]},children:[{type:b,tag:x,props:{},children:[{type:a,value:"driver "},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:F}]},{type:a,value:aW},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:aX},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:"'\u003CChrome Driver Location\u003E'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:aY},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:aZ}]},{type:a,value:"time"},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:a_}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"이렇게 하면 webdriver이 chrome driver과 연결되어서 웹페이지를 접속 및 조작 할 수 있습니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n아래는 기본 함수입니다."}]},{type:a,value:f},{type:b,tag:z,props:{className:[A]},children:[{type:b,tag:B,props:{className:[C,D]},children:[{type:b,tag:x,props:{},children:[{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 페이지 이동"}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:a$},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:"'https:\u002F\u002Fgoogle.co.kr'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 브라우저 종료"}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ai},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 탭 종료"}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ai},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:y},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 화면 크기 설정"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 전체화면"}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"fullscreen_window"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 최대 창 크기"}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"maximize_window"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 특정 좌표(x,y)와 크기(w,h)로 설정"}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"set_window_rect"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:ba},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:M}]},{type:a,value:bb},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:M}]},{type:a,value:"w"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:M}]},{type:a,value:"h"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 특정 좌표로 이동"}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"set_window_position"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:ba},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:M}]},{type:a,value:bb},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:y},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 뒤로 가기"}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"back"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 앞으로 가기"}]},{type:a,value:w},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"forward"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:y},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:bc}]},{type:a,value:bd},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:F}]},{type:a,value:ab},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:aj},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:be}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 키 입력하기"}]},{type:a,value:ak},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ac},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:"'abcd'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# abcd 입력"}]},{type:a,value:ak},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ac},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:bf},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:bg},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 엔터키 입력"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 클릭하기"}]},{type:a,value:ak},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"click"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"사실 이정도만 알아도 bs4와 같은 다른 라이브러리를 같이 사용한다면 문제없는 정도입니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n하지만! 여기서 중요한 것이 바로! 이 부분입니다!"}]},{type:a,value:f},{type:b,tag:z,props:{className:[A]},children:[{type:b,tag:B,props:{className:[C,D]},children:[{type:b,tag:x,props:{},children:[{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:bc}]},{type:a,value:bd},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:F}]},{type:a,value:ab},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:aj},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:be}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"바로 자신이 원하는 정보가 담겨있는 위치에 접근 하는 것입니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n주로 사용하는 함수는 아래와 같습니다."}]},{type:a,value:f},{type:b,tag:z,props:{className:[A]},children:[{type:b,tag:B,props:{className:[C,D]},children:[{type:b,tag:x,props:{},children:[{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 단일 element를 찾는 함수. "}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 여러개의 element를 찾고싶다면 find_elements*처럼 s를 붙이면 된다. "}]},{type:a,value:"\nfind_element_by_id\nfind_element_by_name\nfind_element_by_xpath\nfind_element_by_link_text\nfind_element_by_partial_link_text\nfind_element_by_tag_name\nfind_element_by_class_name\nfind_element_by_css_selector\n\n"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 또는 다음과 같이 사용할 수 있다."}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# By. 뒤에 필요한 element를 넣으면 된다."}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 위와 동일하게 여러개의 element를 찾고싶다면 s를 뭍이면 된다."}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:af},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ag},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ah},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"by "},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" By\nfind_element"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:"By"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"XPATH"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:M}]},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:aZ}]},{type:a,value:"xpath"},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:a_}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f}]}]}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"웹 페이지의 구조를 알고있어야 html tag, id, css selector나 class, xpath등 다양한 방법을 통해 웹 소스 전역에 분산되어있는 데이터에 접근하기 수월해지기 때문입니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n자주 사용하는 html태그에 대한 설명은 아래 영상링크를 통해 정리된 내용을 확인할 수 있습니다."}]},{type:a,value:f},{type:b,tag:Q,props:{},children:[{type:a,value:f},{type:b,tag:k,props:{},children:[{type:b,tag:n,props:{href:bh,rel:[R,S,T],target:U},children:[{type:a,value:bh}]}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"이제 간단한 예제 한가지를 해보며 마무리해보도록 하겠습니다."}]},{type:a,value:f}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:m,props:{},children:[]},{type:a,value:f},{type:b,tag:aS,props:{start:P},children:[{type:a,value:f},{type:b,tag:L,props:{},children:[{type:a,value:"예제 - 네이버에 '날씨' 검색 후 나타나는 뉴스 제목 크롤링\n"},{type:b,tag:z,props:{className:[A]},children:[{type:b,tag:B,props:{className:[C,D]},children:[{type:b,tag:x,props:{},children:[{type:a,value:v},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:E}]},{type:a,value:aU},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" webdriver\n "},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:E}]},{type:a,value:af},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ag},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ah},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:aV},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" Keys\n "},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:t}]},{type:a,value:" time\n\n "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# chromedriver setting - 각주부분은 colab에서 구동시 사용"}]},{type:a,value:al},{type:b,tag:c,props:{className:[d,I,o]},children:[{type:a,value:"\"\"\"chrome_options = webdriver.ChromeOptions()\n chrome_options.add_argument('--headless')\n chrome_options.add_argument('--no-sandbox')\n chrome_options.add_argument('--disable-dev-shm-usage')\"\"\""}]},{type:a,value:"\n driver "},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:F}]},{type:a,value:aW},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:aX},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:"'chromedriver'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:am},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:aY},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,N]},children:[{type:a,value:_}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 묵시적 대기, 활성화를 위해 최대 15초까지 기다린다는 의미."}]},{type:a,value:ad},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# get page"}]},{type:a,value:am},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:a$},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:"'https:\u002F\u002Fwww.naver.com'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:ad},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# find features : Search and Sending key"}]},{type:a,value:"\n search "},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:F}]},{type:a,value:ab},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:aj},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:"'#query'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 검색창의 위치"}]},{type:a,value:bi},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ac},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:"'날씨'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 날씨 입력"}]},{type:a,value:bi},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ac},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:bf},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:bg},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 엔터"}]},{type:a,value:"\n time"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"sleep"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,N]},children:[{type:a,value:"3"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:ad},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 뉴스 제목 가져오기"}]},{type:a,value:"\n news "},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:F}]},{type:a,value:ab},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"find_elements_by_class_name"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:"'news_tit'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:al},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:K}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,aa]},children:[{type:a,value:"type"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:bj},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"# 타입 확인"}]},{type:a,value:"\n news_list "},{type:b,tag:c,props:{className:[d,u]},children:[{type:a,value:F}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Y}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:$}]},{type:a,value:al},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:"for"}]},{type:a,value:" i"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:M}]},{type:a,value:" data "},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:"in"}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,aa]},children:[{type:a,value:"enumerate"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:bj},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:Z}]},{type:a,value:"\n     news_list"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:"append"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:"data"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:a},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:" \n "},{type:b,tag:c,props:{className:[d,I,o]},children:[{type:a,value:"''' \n \u003Cclass 'selenium.webdriver.remote.webelement.WebElement'\u003E 타입 데이터에 대해 .text와 같은 함수로 특정 데이터만 추출할 수 있다.\n '''"}]},{type:a,value:ad},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:K}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,o]},children:[{type:a,value:"\"날씨 검색 후 뉴스 제목 : {}\""}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:b,tag:c,props:{className:[d,aa]},children:[{type:a,value:"format"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:"news_list"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:am},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:g}]},{type:a,value:ai},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:"\n\n \n"}]}]}]},{type:a,value:f}]},{type:a,value:f}]},{type:a,value:f},{type:b,tag:J,props:{id:aD},children:[{type:b,tag:n,props:{href:aE,ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]}]},{type:a,value:f},{type:b,tag:H,props:{id:aO},children:[{type:b,tag:n,props:{href:"#3-%EB%A7%BA%EC%9D%8C%EB%A7%90",ariaHidden:p,tabIndex:q},children:[{type:b,tag:c,props:{className:[r,s]},children:[]}]},{type:a,value:aP}]},{type:a,value:f},{type:b,tag:k,props:{},children:[{type:a,value:"Selenium은 위에서 소개한 기능보다도 정말 많은 기능이 있습니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n예를 들면 스크립트를 실행시키는  "},{type:b,tag:x,props:{},children:[{type:a,value:"driver.execute_script(\u003Cscript\u003E)"}]},{type:a,value:" 와 같은 함수도 존재합니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n하지만 단점이 없는 것은 아닙니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n웹을 직접 불러오고나서 작업을 하기 때문에 많은 양의 데이터를 수집하는데에는 부적합한 면이 있습니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n그래서 앞으로는 Scrapy라는 웹 크롤링 전용 프레임워크를 학습 후 활용할 예정입니다."},{type:b,tag:m,props:{},children:[]},{type:a,value:"\n긴 글 읽어주셔서 감사합니다."}]}]},dir:aH,path:"\u002Fblog\u002Fdata-study-week_1-Selenium",extension:aI,createdAt:an,updatedAt:"2021-11-26T18:14:52.000Z"}],authorName:O}],fetch:{},mutations:void 0}}("text","element","span","token","punctuation","\n",".","comment","(",")","p","keyword","br","a","string","true",-1,"icon","icon-link","import","operator"," ","\ndriver","code","\n\n","div","nuxt-content-highlight","pre","language-python","line-numbers","from","=",2,"h2","triple-quoted-string","h1","print","li",",","number","Choi Geonwoo",3,"blockquote","nofollow","noopener","noreferrer","_blank"," nltk","tokenize ","sentence","[",":","15","]","builtin"," driver","send_keys","\n\n ","h3"," selenium","webdriver","common","quit","find_element_by_css_selector","\nvar1","\n ","\n driver","2021-11-25T13:01:33.000Z","Data-Science","0-서론","0. 서론","1-nlpnatural-language-processing이란","1. NLP(Natural Language Processing)이란?","2-토큰화tokenization란","2. 토큰화(Tokenization)란?","3-토큰화-라이브러리","3. 토큰화 라이브러리","한글은","한글은??","이후-학습-방향","이후 학습 방향","root","","-1","#-1","\"\"\"\noutput : \n['The', 'city', 'of', '13', 'million', 'has', 'been', 'under', 'strict', 'lockdown', 'since', 'December', '23', ',', 'as']\n\"\"\"","ul","\u002Fblog",".md","0-selenium을-알아보자","0. Selenium을 알아보자","1-크롤링crawling-이란","2-selenium을-이용한-크롤링","2. Selenium을 이용한 크롤링","3-맺음말","3. 맺음말","https:\u002F\u002Fselenium-python.readthedocs.io\u002Findex.html","strong","ol","https:\u002F\u002Fchromedriver.chromium.org\u002Fdownloads"," selenium ","keys "," webdriver","Chrome","implicitly_wait","\u003C","\u003E","get","x","y","# 특정 요소(elements) 찾기","\nvar1 ","'\u003Ccss selector name\u003E'","Keys","ENTER","https:\u002F\u002Fyoutu.be\u002FT2RglXel74Y","\n search","news")));