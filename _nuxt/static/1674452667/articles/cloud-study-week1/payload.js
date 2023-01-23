__NUXT_JSONP__("/articles/cloud-study-week1", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R){return {data:[{article:{slug:"cloud-study-week1",description:"GCP와 클라우드 서비스(SaaS, IaaS, PaaS 등)에 대한 글입니다.",title:"Cloud 서비스를 소개합니다 - Overview",category:"Cloud",author:w,toc:[{id:y,depth:h,text:z},{id:A,depth:h,text:B},{id:C,depth:h,text:D},{id:E,depth:h,text:F},{id:G,depth:h,text:H},{id:I,depth:h,text:J},{id:K,depth:h,text:L},{id:x,depth:h,text:x},{id:M,depth:3,text:N}],body:{type:"root",children:[{type:b,tag:d,props:{},children:[{type:a,value:"안녕하세요! GCP 스터디 팀의 minju 입니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"첫 포스팅 내용은 빠르게 클라우드 개요를 짚고 넘어갈 수 있도록 "},{type:b,tag:e,props:{},children:[{type:a,value:"cloud 서비스들에 대한 소개"}]},{type:a,value:"입니다. 더불어, GCP에는 어떤 cloud 서비스들이 있는지에 대해서 다룰 예정입니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Google Cloud Skills Boost에서 과정을 학습하고 계신 분이나 GCP를 사용해보려고 하시는 분들이 읽어보시면 좋을 것 같습니다."}]},{type:a,value:c},{type:b,tag:i,props:{id:y},children:[{type:b,tag:f,props:{href:"#i%EC%8A%A4%EB%AA%B0-talk-",ariaHidden:j,tabIndex:k},children:[{type:b,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:z}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"먼저, "},{type:b,tag:e,props:{},children:[{type:a,value:"클라우드에서 특정 기술을 배우는 것보다는 클라우드를 활용한 개발 환경에 익숙해지기 위해서 공부하고 있습니다."}]},{type:a,value:"  클라우드는 다양한 기술이 있는데 무엇이 클라우드 내부에 존재하는지 파악하며, 이러한 아키텍처를 이해하고 지향하는 바를 짚고 넘어가보면 좋겠네요. 구체적인 예시는 뒤-6. GCP로 할 수 있는 실습들-에서 소개해드리겠습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"참고로 현재 Google Cloud Skills Boost를 무료로 사용할 수 있습니다. (12월까지 말고 쭉 무료로 있어줬으면) 그래서 스터디 목표는 다음과 같습니다."}]},{type:a,value:c},{type:b,tag:u,props:{},children:[{type:a,value:"\n🌀 대학생에게 무료로 사용할 수 있는 환경을 이용하고, 클라우드를 활용한 개발 환경에 익숙해지자.\n"}]},{type:a,value:c},{type:b,tag:i,props:{id:A},children:[{type:b,tag:f,props:{href:"#1-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BB%B4%ED%93%A8%ED%8C%85%EC%9D%98-%EC%A0%95%EC%9D%98",ariaHidden:j,tabIndex:k},children:[{type:b,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:B}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"클라우드 컴퓨팅은 컴퓨팅 리소스를 인터넷을 통해 서비스로 사용할 수 있는 주문형 서비스를 말합니다. 개발자가 직접 리소스를 구성, 관리할 필요가 없으며 사용한 만큼 비용을 지불하는 방식입니다."}]},{type:a,value:c},{type:b,tag:i,props:{id:C},children:[{type:b,tag:f,props:{href:"#2-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BB%B4%ED%93%A8%ED%8C%85-%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%AA%A8%EB%8D%B8%EC%9D%98-3%EA%B0%80%EC%A7%80-%EC%9C%A0%ED%98%95",ariaHidden:j,tabIndex:k},children:[{type:b,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:D}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"클라우드 컴퓨팅 서비스를 IaaS, PaaS, SaaS로 나누어 볼 수 있습니다."}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:c},{type:b,tag:g,props:{},children:[{type:a,value:"Infrastructure as a Service: 컴퓨팅 및 스토리지 서비스를 제공합니다. ex) DB, Storage"}]},{type:a,value:c},{type:b,tag:g,props:{},children:[{type:a,value:"Platform as a Service: 클라우드 앱을 빌드하는 개발 및 배포 환경을 제공합니다.  ex) Containers"}]},{type:a,value:c},{type:b,tag:g,props:{},children:[{type:a,value:"Software as a service: 앱을 서비스로 제공합니다. ex) Gmail, Photos"}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:i,props:{id:E},children:[{type:b,tag:f,props:{href:"#3-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BB%B4%ED%93%A8%ED%8C%85%EC%9D%98-%ED%9D%90%EB%A6%84",ariaHidden:j,tabIndex:k},children:[{type:b,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:F}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"위에서 언급한 컴퓨팅 서비스 모델이 나오게 된 배경은 클라우드 컴퓨팅의 흐름과 연관이 있습니다. 클라우드 컴퓨팅의 발전에 따른 제 1, 2, 3 물결이 있습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:o,props:{alt:"cloud history",src:"\u002Fcloud-study-week1\u002F1.png"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:p,props:{},children:[{type:a,value:"제 1물결"}]},{type:a,value:"은 Colocation으로, Co-라는 ‘공동의’ 라는 의미와 location이 합쳐서 자원을 공동의 장소에 설치한다는 의미입니다. 공동의 장소에 설치된 서버를 사용한다면 데이터 센터에 투자할 비용을 줄일 수 있을 것입니다."}]},{type:a,value:c},{type:b,tag:u,props:{},children:[{type:a,value:"\n☝️ Colocation: 데이터 센터를 위한 물리적 공간에 투자할 필요가 없어짐 → 재정적 효율성 ⇪\n"}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:p,props:{},children:[{type:a,value:"제 2물결"}]},{type:a,value:"은 가상 데이터 센터이며, 이때 2가지 유형의 제품, IaaS와 PaaS가 등장했습니다. 2물결까지는 사용자가 제어해야하는 환경이 존재했습니다."}]},{type:a,value:c},{type:b,tag:u,props:{},children:[{type:a,value:"\n✌️ Virtualized data center: → IaaS, PaaS 등장\n"}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"이후 완전히 자동화된 "},{type:b,tag:p,props:{},children:[{type:a,value:"3세대 클라우드"}]},{type:a,value:"인 컨테이너 기반 아키텍처로 발전합니다. GCP도 이를 제공하고 사용자가 사용하는 인프라를 자동으로 프로비저닝하고 구성합니다."}]},{type:a,value:c},{type:b,tag:u,props:{},children:[{type:a,value:"\n👉 container-based architecture: 애플리케이션이 사용되는 인프라를 자동으로 프로비저닝하고 구성\n"}]},{type:a,value:c},{type:b,tag:i,props:{id:G},children:[{type:b,tag:f,props:{href:"#4-gcp-%EC%84%9C%EB%B9%84%EC%8A%A4%EC%97%90-%EB%8C%80%ED%95%9C-%EC%86%8C%EA%B0%9C",ariaHidden:j,tabIndex:k},children:[{type:b,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:H}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"클라우드 컴퓨팅 플랫폼인 GCP(Google Cloud Platform)에도 다양한 서비스들이 있습니다. 그 서비스들은 IaaS, PaaS, SaaS를 제공하는 다양한 모델들로 분류해볼 수 있습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:o,props:{alt:"gcp",src:"\u002Fcloud-study-week1\u002F2.png"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"GCP의 "},{type:b,tag:p,props:{},children:[{type:a,value:"IaaS"}]},{type:a,value:"로는 VM(Virtual Machine)을 제공하는 "},{type:b,tag:e,props:{},children:[{type:a,value:"Compute Engine"}]},{type:a,value:", 데이터를 저장할 수 있는 "},{type:b,tag:e,props:{},children:[{type:a,value:"Cloud Storage & Database"}]},{type:a,value:"가 있습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:p,props:{},children:[{type:a,value:"PaaS"}]},{type:a,value:"를 사용하면 더 많은 리소스를 애플리케이션 로직에 집중할 수 있다는 장점이 있습니다. 이에 해당하는 제품으로는 "},{type:b,tag:e,props:{},children:[{type:a,value:"Google Cloud Functions, Google Cloud Run"}]},{type:a,value:"이 있습니다."}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:c},{type:b,tag:g,props:{},children:[{type:a,value:"서버리스는 서버가 없는 것처럼 추상화되어 있다는 의미인데요, "},{type:b,tag:e,props:{},children:[{type:a,value:"Cloud Functions"}]},{type:a,value:"은 개발자가 서버 구성보다 코드에 집중하고 사용한 만큼만 지불하는 방식으로 이벤트 기반 코드를 관리합니다."}]},{type:a,value:c},{type:b,tag:g,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"Cloud Run"}]},{type:a,value:"은 완전 관리형 환경에서 컨테이너화된 마이크로서비스 기반 애플리케이션을 배포할 수 있도록 하는 컨테이너 기반 개발을 위한 완전 관리형 서버리스 PaaS 제품입니다."}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:p,props:{},children:[{type:a,value:"SaaS"}]},{type:a,value:"는 애플리케이션이 로컬 컴퓨터에 설치되지 않고, 클라우드에서 서비스로 실행되고 인터넷을 통해 바로 최종 사용자가 소비하는 형태입니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"이러한 서비스를 사용하면 관리형 인프라, 관리형 서비스로 비즈니스 골에 집중하고 인프라를 만들고 유지하는 비용 감소할 수 있는 것이죠. 이 강의에서는 이렇게 IaaS, PaaS을 사용해볼 수 있는 실습이 존재합니다."}]},{type:a,value:c},{type:b,tag:i,props:{id:I},children:[{type:b,tag:f,props:{href:"#5-gcp%EC%99%80-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%84%BC%ED%84%B0%EC%9D%98-%EC%9C%84%EC%B9%98",ariaHidden:j,tabIndex:k},children:[{type:b,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:J}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"그렇다면 GCP를 사용하면 실제로 이를 제공하는 물리적인 공간이 필요할텐데, 이런 데이터 센터는 어떻게 전세계적으로 분포되었을까요? 다음처럼 크게 다섯 지역에(location)안에 여러 Region이 있고, 다시 google cloud 리소스가 배포되는 지역인 Zone들이 있습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:o,props:{alt:"location",src:"\u002Fcloud-study-week1\u002F3.png"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"이렇게 여러 개의 위치가 있는 이유는, 애플리케이션을 배치할 위치를 선택할 때 가용성(availability), 내구성(durability) 및 지연 시간(latency)과 같은 품질에 영향을 미치기 때문입니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"사용자와 가까운 위치에 있는 데이터 센터일 수록 요청이 들어올떄 패킷이 소스에서 목적지까지 이동하는 데 걸리는 시간이 줄어들 것입니다. 또한, 리전에 문제가 발생하는 경우에 애플리케이션을 보호하는데 유용할 것입니다."}]},{type:a,value:c},{type:b,tag:i,props:{id:K},children:[{type:b,tag:f,props:{href:"#6-gcp%EB%A1%9C-%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EC%8B%A4%EC%8A%B5%EB%93%A4",ariaHidden:j,tabIndex:k},children:[{type:b,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:L}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"이 강의에서는 GCP에서 진행할 수 있는 5가지 실습이 있습니다. IaaS를 먼저 다루고, PaaS, Iaas와 PaaS를 조합해서 사용해볼 수 있는 순서로 구성되어 있었습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:o,props:{alt:"lab1",src:"\u002Fcloud-study-week1\u002F4.png"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"VM in a cloud"}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Lab 1) Compute Engine으로 VM을 만들고 **VPC Networking (internal IP, external IP)**을 구성하는 실습입니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"Storage in a cloud"}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Lab 2) VM에 웹 서버를 구성하고, CLoud SQL과 연결하여 Cloud Storage에 담긴 이미지를 웹에서 볼 수 있습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"이 실습에서는 Cloud SQL(database managed) 인스턴스를 빌드하고 인스턴스에 MySQL 데이터베이스를 연결해 봅니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Cat🐱 이미지 파일을 Cloud Storage에 업로드한 후에는 테이블을 만들고 파일의 콘텐츠를 MySQL 데이터베이스로 가져오게 됩니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:o,props:{alt:"lab2",src:"\u002Fcloud-study-week1\u002F5.png"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"Cotainer in a cloud"}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Lab 3) Kubernate는 개념적으로 "},{type:b,tag:e,props:{},children:[{type:a,value:"IaaS를 제공하는 compute engine"}]},{type:a,value:"과 "},{type:b,tag:e,props:{},children:[{type:a,value:"PaaS를 제공하는 app engine"}]},{type:a,value:" 사이에 위치하며 둘의 이점을 이용합니다."}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:c},{type:b,tag:g,props:{},children:[{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"GKE로 Kubernetes cluster를 프로비저닝합니다. "}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:g,props:{},children:[{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:"code",props:{},children:[{type:a,value:"kubectl"}]},{type:a,value:"을 사용하여 Docker containers를 배포하고 관리합니다."}]},{type:a,value:c}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"Application in a cloud"}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Lab 4) 컨테이너 image를 빌드하고  Cloud Run에 배포합니다. Cloud Run을 이용하여 serverless하게 container를 실행합니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Lab 5) Terraform을 활용하여 "},{type:b,tag:e,props:{},children:[{type:a,value:"코드를 통해 인프라 서버를 자동으로 구성하는 방식을 배웁니다."}]}]},{type:a,value:c},{type:b,tag:i,props:{id:x},children:[]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"*위 내용은 "},{type:b,tag:e,props:{},children:[{type:b,tag:f,props:{href:"https:\u002F\u002Fwww.cloudskillsboost.google\u002Fcourse_templates\u002F161",rel:[q,r,s],target:t},children:[{type:a,value:"Google Cloud Fundamentals: Core-Infrastructure-Locales"}]}]},{type:a,value:" 코스의 2가지 부분이 포함되어있습니다."}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:c},{type:b,tag:g,props:{},children:[{type:a,value:"Introducing Google Cloud"}]},{type:a,value:c},{type:b,tag:g,props:{},children:[{type:a,value:"Resources and Access in the Cloud"}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:o,props:{alt:"course",src:"\u002Fcloud-study-week1\u002F6.png"},children:[]}]},{type:a,value:c},{type:b,tag:"h3",props:{id:M},children:[{type:b,tag:f,props:{href:"#references",ariaHidden:j,tabIndex:k},children:[{type:b,tag:l,props:{className:[m,n]},children:[]}]},{type:a,value:N}]},{type:a,value:c},{type:b,tag:O,props:{},children:[{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"클라우드 컴퓨팅 개념"}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:f,props:{href:P,rel:[q,r,s],target:t},children:[{type:a,value:P}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:f,props:{href:Q,rel:[q,r,s],target:t},children:[{type:a,value:Q}]}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:O,props:{},children:[{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"IaaS, PaaS 개념"}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:f,props:{href:R,rel:[q,r,s],target:t},children:[{type:a,value:R}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:f,props:{href:"https:\u002F\u002Fpuzzle-puzzle.tistory.com\u002Fentry\u002F%EA%B5%AC%EA%B8%80-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%ED%94%8C%EB%9E%AB%ED%8F%BC-GCP-Kubernetes-and-Container",rel:[q,r,s],target:t},children:[{type:a,value:"https:\u002F\u002Fpuzzle-puzzle.tistory.com\u002Fentry\u002F구글-클라우드-플랫폼-GCP-Kubernetes-and-Container"}]}]},{type:a,value:c}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002Fcloud-study-week1",extension:".md",createdAt:"2022-11-17T14:34:25.000Z",updatedAt:"2022-11-17T14:50:04.000Z"},prev:{slug:"javascript-deep_study-gabage_collection",title:"Javascript 가비지 컬렉션"},next:{slug:"frontend-javascript-study-closure",title:"클로져 파먹어⚔️ 보기 - 1"},member:[{slug:"minju",name:w,description:"GDSC GCP 스터디 팀입니다",role:"Member",img:"minju.png",dir:"\u002Fmembers",path:"\u002Fmembers\u002Fminju",extension:".yaml",createdAt:"2022-11-02T22:44:10.000Z",updatedAt:"2022-11-02T22:49:36.000Z"}],authorName:w}],fetch:{},mutations:void 0}}("text","element","\n","p","strong","a","li",2,"h2","true",-1,"span","icon","icon-link","img","em","nofollow","noopener","noreferrer","_blank","aside","ul","Minju Jwa","","i스몰-talk-","🐰 ™i 스몰 talk 🥞","1-클라우드-컴퓨팅의-정의","1. 클라우드 컴퓨팅의 정의","2-클라우드-컴퓨팅-서비스-모델의-3가지-유형","2. 클라우드 컴퓨팅 서비스 모델의 3가지 유형","3-클라우드-컴퓨팅의-흐름","3. 클라우드 컴퓨팅의 흐름","4-gcp-서비스에-대한-소개","4. GCP 서비스에 대한 소개","5-gcp와-데이터-센터의-위치","5. GCP와 데이터 센터의 위치","6-gcp로-할-수-있는-실습들","6. GCP로 할 수 있는 실습들","references","References","blockquote","https:\u002F\u002Fcloud.google.com\u002Flearn\u002Fwhat-is-cloud-computing","https:\u002F\u002Fcloud.google.com\u002Fkubernetes-engine","https:\u002F\u002Fcloud.google.com\u002Flearn\u002Fwhat-is-iaas")));