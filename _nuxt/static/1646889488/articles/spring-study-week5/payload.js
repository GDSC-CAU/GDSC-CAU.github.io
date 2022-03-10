__NUXT_JSONP__("/articles/spring-study-week5", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B){return {data:[{article:{slug:"spring-study-week5",description:"AWS의 관리형 데이터베이스 서비스인 RDS를 소개합니다.",title:"AWS에 데이터베이스 환경 구축하기-AWS RDS",category:"Back-End",author:p,featured:"Featured",img:"spring.png",toc:[{id:w,depth:2,text:x},{id:y,depth:3,text:z}],body:{type:"root",children:[{type:c,tag:"h2",props:{id:w},children:[{type:c,tag:i,props:{ariaHidden:j,href:"#%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8A%A4%ED%84%B0%EB%94%94-5%EC%A3%BC%EC%B0%A8%EC%B1%95%ED%84%B07",tabIndex:k},children:[{type:c,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:x}]},{type:a,value:b},{type:c,tag:"h3",props:{id:y},children:[{type:c,tag:i,props:{ariaHidden:j,href:"#aws%EC%97%90-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%ED%99%98%EA%B2%BD%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90",tabIndex:k},children:[{type:c,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:z}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"AWS에서는 데이터베이스를 다루는데 필요한 모든 작업을 지원하는 관리형 서비스인 RDS를 제공함"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"RDS는 AWS에서 지원하는 클라우드 기반 관계형 데이터베이스"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"하드웨어 프로비저닝, 데이터베이스 설정, 패치 및 백업 등 잦은 운영 작업 자동화"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"조정 가능한 용량 지원을 통해 예상치 못한 데이터가 쌓여도 비용만 추가로 내면 정상적인 서비스 가"}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:o,props:{id:"rds-인스턴스-생성하기"},children:[{type:c,tag:i,props:{ariaHidden:j,href:"#rds-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0",tabIndex:k},children:[{type:c,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:"RDS 인스턴스 생성하기"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"검색창에 RDS 입력 - RDS 대시보드에서 "},{type:c,tag:f,props:{},children:[{type:a,value:"[데이터베이스 생성]"}]},{type:a,value:" 버튼 클릭"}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"DB 엔진 선택 화면"}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"RDS에는 오라클, MSSQL, PostgreSQL, MariaDB 등 제공(여기서는 MariaDB 선택)"}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"MariaDB의 장점"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"MSSQL 보다 가격이 합리적"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"클라우드 서비스에 가장 적합한 데이터데이스인 Amazon Aurora로의 교체 용이성"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"동일 하드웨어 사양으로 MySQL보다 향상된 성능"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"다양한 기능 및 스토리지 엔진"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"DBMS 선택"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:c,tag:f,props:{},children:[{type:a,value:"표준생성"}]},{type:a,value:" 선택 - "},{type:c,tag:f,props:{},children:[{type:a,value:"MariaDB"}]},{type:a,value:h}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"사용 사례 선택"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"템플릿 "},{type:c,tag:f,props:{},children:[{type:a,value:"[프리티어]"}]}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"상세설정"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"스토리지 유형 "},{type:c,tag:f,props:{},children:[{type:a,value:"[범용(SSD)]"}]},{type:a,value:", 할당된 스토리지 "},{type:c,tag:f,props:{},children:[{type:a,value:"20"}]}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"DB 인스턴스 이름, 마스터 사용자 이름, 마스터 암호 작성"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"네트워크 및 보안"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"퍼블릭 액세스 가능 "},{type:c,tag:f,props:{},children:[{type:a,value:"[예]"}]}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"데이터베이스 생성과 상세 정보 확인"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"**[완료]**버튼 클릭 - "},{type:c,tag:f,props:{},children:[{type:a,value:"[DB 인스턴스 세부 정보 보기]"}]}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:g,props:{},children:[{type:c,tag:A,props:{alt:"데이터베이스 생성",src:"\u002Fspring-study-week5\u002Fdatabase.png"},children:[]}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:o,props:{id:"rds-운영환경에-맞는-파라미터-설정하기"},children:[{type:c,tag:i,props:{ariaHidden:j,href:"#rds-%EC%9A%B4%EC%98%81%ED%99%98%EA%B2%BD%EC%97%90-%EB%A7%9E%EB%8A%94-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0",tabIndex:k},children:[{type:c,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:"RDS 운영환경에 맞는 파라미터 설정하기"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"파라미터 그룹 생성"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"왼쪽 카테고리에서 "},{type:c,tag:f,props:{},children:[{type:a,value:"[파라미터 그룹]"}]},{type:a,value:h}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"화면 오른쪽 위의 "},{type:c,tag:f,props:{},children:[{type:a,value:"[파라미터 그룹 생성]"}]},{type:a,value:h}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"파라미터 그룹 세부 정보"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"앞에서 생성한 MariaDB 버전과 동일해야 함"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"타임존 수정"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"파라미터 그룹 선택 후 "},{type:c,tag:f,props:{},children:[{type:a,value:"[파라미터 편집]"}]},{type:a,value:" 선택하여 편집 모드로 전환"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"time_zone을 검색하여 "},{type:c,tag:f,props:{},children:[{type:a,value:"[Asia\u002FSeoul]"}]},{type:a,value:h}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"Character Set 변경"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"utf8mb4로 변경"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"character_set_client"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"character_set_connection"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"character_set_database"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"character_set_filesystem"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"character_set_results"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"character_set_server"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"utf8mb4_general_ci로 변경"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"collation_connection"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"collation_server"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"max_connections를 150으로 수정"}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:c,tag:f,props:{},children:[{type:a,value:"[변경 사항 저장]"}]},{type:a,value:h}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"데이터베이스에 반영"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"데이터베이스 선택 후 "},{type:c,tag:f,props:{},children:[{type:a,value:"[수정]"}]},{type:a,value:h}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"데이터베이스 파라미터 그룹 변경"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"DB 파라미터 그룹을 default에서 방금 생성한 신규 파라미터 그룹으로 변경"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:c,tag:f,props:{},children:[{type:a,value:"[즉시 적용]"}]},{type:a,value:h}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:g,props:{},children:[{type:a,value:"정상 적용을 위해 재부팅 진행"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:o,props:{id:"내-pc에서-rds-접속해-보기"},children:[{type:c,tag:i,props:{ariaHidden:j,href:"#%EB%82%B4-pc%EC%97%90%EC%84%9C-rds-%EC%A0%91%EC%86%8D%ED%95%B4-%EB%B3%B4%EA%B8%B0",tabIndex:k},children:[{type:c,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:"내 PC에서 RDS 접속해 보기"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"로컬 PC에서 RDS로 접근하기 위해 RDS 보안 그룹에 본인 PC의 IP 추가 필요"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"데이터베이스 보안 그룹 선택\n"},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"새로운 브라우저에서 EC2에 사용된 보안 그룹의 그룹ID 복사"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"복사된 보안 그룹 ID와 본인의 IP를 RDS 보안 그룹의 인바운드로 추가"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"인바운드 규칙 유형은 MYSQL\u002FAurora 선택\n"},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"보안 그룹 첫 번재 줄: 현재 내 PC의 IP 등록"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"보안 그룹 두 번째 줄: EC2의 보안 그룹 추가"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:o,props:{id:"로컬에서-연동-테스트-하기"},children:[{type:c,tag:i,props:{ariaHidden:j,href:"#%EB%A1%9C%EC%BB%AC%EC%97%90%EC%84%9C-%EC%97%B0%EB%8F%99-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%95%98%EA%B8%B0",tabIndex:k},children:[{type:c,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:"로컬에서 연동 테스트 하기"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"로컬에서 원격 데이터베이스로 붙을 때 GUI 클라이언트를 많이 사용"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"Database 플러그인 설치\n"},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"인텔리제이에서 database 플러그인을 검색한 후 Database Navigator "},{type:c,tag:f,props:{},children:[{type:a,value:"[Install]"}]},{type:a,value:h}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"설치 완료 후 Database Browser 실행"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"프로젝트 왼쪽 사이드바에 "},{type:c,tag:f,props:{},children:[{type:a,value:"DB Browser"}]},{type:a,value:B},{type:c,tag:f,props:{},children:[{type:a,value:"MySQL"}]},{type:a,value:" 선택(MariaDB는 MySQL기반이므로)"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"본인이 생성한 RDS 정보 등록"}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:c,tag:f,props:{},children:[{type:a,value:"[Test Connection]"}]},{type:a,value:" 으로 연결 테스트 후 "},{type:c,tag:f,props:{},children:[{type:a,value:"[Apply -\u003E OK]"}]},{type:a,value:" 버튼으로 최종 저장"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"SQL을 실행할 콘솔창 열기\n"},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:c,tag:f,props:{},children:[{type:a,value:"[Open SQL Console]"}]},{type:a,value:B},{type:c,tag:f,props:{},children:[{type:a,value:"[New SQL Console..]"}]},{type:a,value:" - 신규 콘솔창 이름 등록"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:o,props:{id:"ec2에서-rds에서-접근-확인"},children:[{type:c,tag:i,props:{ariaHidden:j,href:"#ec2%EC%97%90%EC%84%9C-rds%EC%97%90%EC%84%9C-%EC%A0%91%EA%B7%BC-%ED%99%95%EC%9D%B8",tabIndex:k},children:[{type:c,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:"EC2에서 RDS에서 접근 확인"}]},{type:a,value:b},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"EC2에 MySQL CLI 설치\n"},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:q,props:{className:[r]},children:[{type:c,tag:s,props:{className:[t,u]},children:[{type:c,tag:v,props:{},children:[]}]}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"로컬에서 접속하듯 계정, 비밀번호, 호스트 주소 등을 접속\n"},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:q,props:{className:[r]},children:[{type:c,tag:s,props:{className:[t,u]},children:[{type:c,tag:v,props:{},children:[]}]}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"EC2에서 RDS로 접속 확인"}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:"퀴리 실행 해보기\n"},{type:c,tag:e,props:{},children:[{type:a,value:b},{type:c,tag:d,props:{},children:[{type:a,value:b},{type:c,tag:q,props:{className:[r]},children:[{type:c,tag:s,props:{className:[t,u]},children:[{type:c,tag:v,props:{},children:[]}]}]},{type:a,value:b}]},{type:a,value:b}]},{type:a,value:b},{type:c,tag:A,props:{alt:"EC2에 RDS 접근 확인",src:"\u002Fspring-study-week5\u002Fmariadb.png"},children:[]}]},{type:a,value:b}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002Fspring-study-week5",extension:".md",createdAt:"2022-01-14T07:28:50.000Z",updatedAt:"2022-03-10T05:16:13.000Z"},prev:{slug:"data-study-week-4-NLP_tutorial",title:"텍스트 전처리 (2)"},next:{slug:"reactnative-study-week3",title:"React Native 스터디 3주차"},member:[{slug:"hwikyung",name:p,description:"중앙대학교 GDSC 멤버로 활동하고 있습니다. 백엔드 개발자를 목표로 공부하고 있습니다.",role:"Member",img:"hwikyung.jpg",dir:"\u002Fmembers",path:"\u002Fmembers\u002Fhwikyung",extension:".yaml",createdAt:"2021-11-26T09:28:42.000Z",updatedAt:"2021-11-26T09:51:05.000Z"}],authorName:p}],fetch:{},mutations:void 0}}("text","\n","element","li","ul","strong","p"," 선택","a","true",-1,"span","icon","icon-link","h4","hwikyung kim","div","nuxt-content-highlight","pre","language-text","line-numbers","code","스프링-스터디-5주차챕터7","스프링 스터디 5주차(챕터7)","aws에-데이터베이스-환경을-만들어보자","AWS에 데이터베이스 환경을 만들어보자","img"," - ")));