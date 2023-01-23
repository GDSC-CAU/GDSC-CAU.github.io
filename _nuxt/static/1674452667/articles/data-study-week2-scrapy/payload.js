__NUXT_JSONP__("/articles/data-study-week2-scrapy", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P){return {data:[{article:{slug:"data-study-week2-scrapy",description:"터미널 환경에서의 크롤링",title:"웹크롤러 Scrapy",category:"Data-Science",author:x,toc:[{id:z,depth:n,text:A},{id:B,depth:n,text:C},{id:D,depth:n,text:E},{id:F,depth:n,text:G},{id:H,depth:n,text:I},{id:J,depth:n,text:K},{id:L,depth:n,text:M},{id:N,depth:n,text:O}],body:{type:"root",children:[{type:b,tag:o,props:{id:z},children:[{type:b,tag:p,props:{ariaHidden:q,href:"#0-scrapy",tabIndex:r},children:[{type:b,tag:d,props:{className:[s,t]},children:[]}]},{type:a,value:A}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"edwith COSADAMA Scrapy 입문 강의로 학습하였습니다."}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"Scrapy는 빠른 크롤링 속도와 넓은 확장성, 뛰어난 데이터 처리와 저장 능력을 가지고 있습니다."}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"Scrapy를 통한 크롤링은 Scrapy 프로젝트 생성, Spider(크롤러) 생성, Item 생성, Spider 실행 순으로 이루어집니다."}]},{type:a,value:c},{type:b,tag:o,props:{id:B},children:[{type:b,tag:p,props:{ariaHidden:q,href:"#1-scrapy-%EC%84%A4%EC%B9%98",tabIndex:r},children:[{type:b,tag:d,props:{className:[s,t]},children:[]}]},{type:a,value:C}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"Anaconda Powershell Prompt를 실행합니다."}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:"pip install Scrapy\n"}]}]}]},{type:a,value:c},{type:b,tag:o,props:{id:D},children:[{type:b,tag:p,props:{ariaHidden:q,href:"#2-scrapy-shell",tabIndex:r},children:[{type:b,tag:d,props:{className:[s,t]},children:[]}]},{type:a,value:E}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"해당 웹사이트의 데이터를 가져옵니다."}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"CSS Selector 경로를 입력하여 기사 제목을 출력한 예시입니다."}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:b,tag:"img",props:{alt:"scrapy shell 예시",src:"\u002Fdata-study-week2-scrapy\u002Fscrapyshell.png"},children:[]}]},{type:a,value:c},{type:b,tag:o,props:{id:F},children:[{type:b,tag:p,props:{ariaHidden:q,href:"#3-scrapy-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%83%9D%EC%84%B1",tabIndex:r},children:[{type:b,tag:d,props:{className:[s,t]},children:[]}]},{type:a,value:G}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:"scrapy startproject 프로젝트이름\n"}]}]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"settings.py에서 페이지 다운로드 간경을 1초로 지정합니다."}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:"DOWNLOAD_DELAY "},{type:b,tag:d,props:{className:[f,m]},children:[{type:a,value:u}]},{type:a,value:v},{type:b,tag:d,props:{className:[f,"number"]},children:[{type:a,value:"1"}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"모든 명령어는 프로젝트 디렉토리에서 실행합니다."}]},{type:a,value:c},{type:b,tag:o,props:{id:H},children:[{type:b,tag:p,props:{ariaHidden:q,href:"#4-spider%ED%81%AC%EB%A1%A4%EB%9F%AC-%EC%83%9D%EC%84%B1",tabIndex:r},children:[{type:b,tag:d,props:{className:[s,t]},children:[]}]},{type:a,value:I}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"크롤러이름.py가 생성됩니다."}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:"scrapy genspider 크롤러이름 "},{type:b,tag:d,props:{className:[f,w]},children:[{type:a,value:"\"크롤링페이지주소\""}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"robots.txt에서 크롤링을 금지하고 있는지 확인하고 크롤링을 막아놓은 사이트는 settings.py의 설정을 변경하면 크롤링을 할 수 있습니다."}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:"ROBOTSTXT_OBEY "},{type:b,tag:d,props:{className:[f,m]},children:[{type:a,value:u}]},{type:a,value:v},{type:b,tag:d,props:{className:[f,"boolean"]},children:[{type:a,value:"False"}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:o,props:{id:J},children:[{type:b,tag:p,props:{ariaHidden:q,href:"#5-item-%EC%83%9D%EC%84%B1",tabIndex:r},children:[{type:b,tag:d,props:{className:[s,t]},children:[]}]},{type:a,value:K}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"Spider가 추출한 데이터를 저장하는 객체가 Item입니다."}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"items.py에 사이트 개수만큼 Item을 만듭니다."}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"크롤러이름.py에서 spider가 추출한 데이터를 Item에 저장합니다."}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"콜백 함수 parse()를 이용하거나 Request 메서드 내 callback 파라미터를 이용하여 크롤링합니다."}]},{type:a,value:c},{type:b,tag:o,props:{id:L},children:[{type:b,tag:p,props:{ariaHidden:q,href:"#6-spider-%EC%8B%A4%ED%96%89",tabIndex:r},children:[{type:b,tag:d,props:{className:[s,t]},children:[]}]},{type:a,value:M}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:"scrapy crawl 크롤러이름\n"}]}]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"pipelines.py에서 raise DropItem을 통해 원하지 않는 Item을 필터링하여 데이터를 후처리합니다. settings.py에 pipline을 사용한다고 정의하고 아이템 출력 순서를 설정합니다."}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"settings.py에서 한글깨짐 현상을 방지합니다."}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:"FEED_EXPORT_ENCODING "},{type:b,tag:d,props:{className:[f,m]},children:[{type:a,value:u}]},{type:a,value:v},{type:b,tag:d,props:{className:[f,w]},children:[{type:a,value:"'cp949'"}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"Item의 데이터를 저장합니다."}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:P},{type:b,tag:d,props:{className:[f,m]},children:[{type:a,value:y}]},{type:a,value:"o 파일이름 "},{type:b,tag:d,props:{className:[f,m]},children:[{type:a,value:y}]},{type:a,value:"t 파일형식\n"}]}]}]},{type:a,value:c},{type:b,tag:o,props:{id:N},children:[{type:b,tag:p,props:{ariaHidden:q,href:"#7-scrapy-logging",tabIndex:r},children:[{type:b,tag:d,props:{className:[s,t]},children:[]}]},{type:a,value:O}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"오류 메세지를 찾기 쉬워집니다. settings.py에서 메세지의 수준을 결정합니다."}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:"LOG_LEVEL "},{type:b,tag:d,props:{className:[f,m]},children:[{type:a,value:u}]},{type:a,value:v},{type:b,tag:d,props:{className:[f,w]},children:[{type:a,value:"'ERROR'"}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"settings.py나 spider 실행 명령어를 이용하여 로그 파일을 저장합니다."}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:"LOG_FILE "},{type:b,tag:d,props:{className:[f,m]},children:[{type:a,value:u}]},{type:a,value:v},{type:b,tag:d,props:{className:[f,w]},children:[{type:a,value:"'파일명.txt'"}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:g,props:{className:[h]},children:[{type:b,tag:i,props:{className:[j,k]},children:[{type:b,tag:l,props:{},children:[{type:a,value:P},{type:b,tag:d,props:{className:[f,m]},children:[{type:a,value:y}]},{type:a,value:"s LOG_FILE"},{type:b,tag:d,props:{className:[f,m]},children:[{type:a,value:u}]},{type:a,value:"파일명"},{type:b,tag:d,props:{className:[f,"punctuation"]},children:[{type:a,value:"."}]},{type:a,value:"log\n"}]}]}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002Fdata-study-week2-scrapy",extension:".md",createdAt:"2021-12-27T23:31:53.000Z",updatedAt:"2022-03-10T05:16:13.000Z"},prev:{slug:"flutter-study-week3",title:"Flutter 스터디 3주차 (Stateful)"},next:{slug:"javascript-declaration",title:"JavaScript 변수 선언"},member:[{slug:"jooyoung",name:x,description:"소프트웨어학부 3학년",role:"Alumni(21-22 Member)",img:"jooyoung.jpg",dir:"\u002Fmembers",path:"\u002Fmembers\u002Fjooyoung",extension:".yaml",createdAt:"2021-11-25T00:56:38.000Z",updatedAt:"2022-10-26T12:57:45.000Z"}],authorName:x}],fetch:{},mutations:void 0}}("text","element","\n","span","p","token","div","nuxt-content-highlight","pre","language-python","line-numbers","code","operator",2,"h2","a","true",-1,"icon","icon-link","="," ","string","Jooyoung Lee","-","0-scrapy","0. Scrapy","1-scrapy-설치","1. Scrapy 설치","2-scrapy-shell","2. Scrapy shell","3-scrapy-프로젝트-생성","3. Scrapy 프로젝트 생성","4-spider크롤러-생성","4. Spider(크롤러) 생성","5-item-생성","5. Item 생성","6-spider-실행","6. Spider 실행","7-scrapy-logging","7. Scrapy Logging","scrapy crawl 크롤러이름 ")));