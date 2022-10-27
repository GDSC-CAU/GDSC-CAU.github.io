__NUXT_JSONP__("/articles/flutter-study-week6", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J){return {data:[{article:{slug:"flutter-study-week6",description:"Flutter 스터디 6주차에 대한 내용입니다.",title:"Flutter 스터디 6주차",category:"Application",author:w,toc:[{id:F,depth:r,text:x},{id:G,depth:r,text:y},{id:H,depth:r,text:z},{id:I,depth:r,text:A},{id:J,depth:r,text:B}],body:{type:"root",children:[{type:b,tag:t,props:{},children:[{type:a,value:c},{type:b,tag:q,props:{},children:[{type:b,tag:e,props:{href:"https:\u002F\u002Fwww.udemy.com\u002Fcourse\u002Fflutter-bootcamp-with-dart\u002F",rel:["nofollow","noopener","noreferrer"],target:"_blank"},children:[{type:a,value:"The Complete 2021 Flutter Development Bootcamp with Dart"}]},{type:a,value:" section 13 까지 본 뒤 진행한 스터디 입니다."}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:C,props:{id:"contents"},children:[{type:b,tag:e,props:{href:"#contents",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:"Contents"}]},{type:a,value:c},{type:b,tag:D,props:{},children:[{type:a,value:c},{type:b,tag:q,props:{},children:[{type:a,value:c},{type:b,tag:C,props:{id:"future-async-await"},children:[{type:b,tag:e,props:{href:"#future-async-await",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:"Future, async, await"}]},{type:a,value:c}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:t,props:{},children:[{type:a,value:c},{type:b,tag:q,props:{},children:[{type:a,value:x}]},{type:a,value:c},{type:b,tag:q,props:{},children:[{type:a,value:y}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:D,props:{start:2},children:[{type:a,value:c},{type:b,tag:q,props:{},children:[{type:a,value:c},{type:b,tag:C,props:{id:"exception-handling"},children:[{type:b,tag:e,props:{href:"#exception-handling",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:"Exception handling"}]},{type:a,value:c}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:t,props:{},children:[{type:a,value:c},{type:b,tag:q,props:{},children:[{type:a,value:z}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:D,props:{start:r},children:[{type:a,value:c},{type:b,tag:q,props:{},children:[{type:a,value:c},{type:b,tag:"h5",props:{id:"그-외"},children:[{type:b,tag:e,props:{href:"#%EA%B7%B8-%EC%99%B8",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:"그 외"}]},{type:a,value:c}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:t,props:{},children:[{type:a,value:c},{type:b,tag:q,props:{},children:[{type:a,value:A}]},{type:a,value:c},{type:b,tag:q,props:{},children:[{type:a,value:B}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:E,props:{id:"1-future-async-await"},children:[{type:b,tag:e,props:{href:"#1-future-async-await",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:"1. Future, async, await"}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:u,props:{alt:v,src:"https:\u002F\u002Fuser-images.githubusercontent.com\u002F26942349\u002F150915534-67e86751-295b-4509-b399-48569c890d5e.png"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Dart와 같은 객체지향언어는 우리의 일상생활을 그대로 재현하기 위해 만들어진 언어입니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"그렇기에 여러 문법들이 있는데,\r\nFuture, async, await는 Dart의 Asynchronous한 상황을 만들어주는 도구들입니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"기본적으로 Dart는 Synchronous하게 작동합니다."}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"void performTask() {\n    task1();\n    task2();\n    task3();\n}\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"즉 위의 상황에서는 task1(), task2(), task3() 순서대로 함수가 실행이 됩니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"그런데 만약 비동기적인 상황에서는 어떻게 코딩해줘야 할까요?"}]},{type:a,value:c},{type:b,tag:s,props:{id:F},children:[{type:b,tag:e,props:{href:"#future-class",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:x}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"상세 예제 코드입니다."}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"import 'dart:io';\n\nvoid main() {\n  performTask();\n}\n\nvoid performTask()  {\n  task1();\n  task2();\n  task3();\n}\n\nvoid task1() {\n  String result = 'task 1 data';\n  print('Task 1 complete');\n}\n\nvoid task2() {\n  String result = 'task 2 data';\n  print('Task 2 complete');\n}\n\nvoid task3() {\n  String result = 'task 3 data';\n  print('Task 3 complete');\n}\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"만약에 task2를 실행하는데 3초라는 시간이 걸리면 어떻게 될까요?"}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"void task2() {\n  Duration threeSeconds = Duration(seconds: 3);\n  sleep(threeSeconds);\n  String result = 'task 2 data';\n  print('Task 2 complete');\n}\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"그럼 task1이 먼저 재빠르게 실행되고, (Task 1 complete 출력)\r\n바로 task2가 실행이 되겠지만 3초 뒤에 'Task 2 complete'이 출력이됩니다.\r\n이에 따라 task3도 늦게 실행이 되죠."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"지금은 코드가 짧아서 괜찮지만, 코드가 늘어나면 저 task2() 때문에 뒤에 오는 모든 코드들이 늦게 실행됩니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"우리는 이걸 방지하기 위해 Future라는 class를 사용합니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Future은 일종의 영수증입니다.\r\n우리는 햄버거 가게에서 결제를 하자마자 햄버거를 받지 않고 영수증을 받습니다.\r\n하지만 우리는 좀 있으면 햄버거가 나온다는 것을 알죠.\r\n"},{type:b,tag:u,props:{alt:v,src:"https:\u002F\u002Fuser-images.githubusercontent.com\u002F26942349\u002F150915810-7309c149-c12d-4ccb-91ce-18337a67a48b.png"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Future도 마찬가지로 이후에,\r\nString이든, int든 어떠한 return 값을 받기로 한 일종의 약속입니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:u,props:{alt:v,src:"https:\u002F\u002Fuser-images.githubusercontent.com\u002F26942349\u002F150915863-bc032df3-0ea0-4437-95e7-302268b19419.png"},children:[]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"그럼 다시 코드로 돌아와서,\r\ntask2의 delay를 비동기적으로 작동하게 하려면 아래와 같이 수정할 수 있습니다."}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"void task2() {\n  Duration threeSeconds = Duration(seconds: 3);\n  Future.delayed(\n    threeSeconds,\n    () {\n      String result = 'task 2 data';\n      print('Task 2 complete');\n    },\n  );\n}\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"이렇게 되면 task1이 가장 먼저 실행되고, task2가 3초 기다리는 동안\r\ntask3는 눈치보지 말고 바로 실행이됩니다.\r\n그리고 delay가 지나면 task2의 실행값이 나오게되죠."}]},{type:a,value:c},{type:b,tag:s,props:{id:G},children:[{type:b,tag:e,props:{href:"#async-await-keyword",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:y}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"그런데 task2의 결과물을 받아서 task3가 작동하게 될 경우에는 어떻게 해야할까요?\r\n코드를 아래와 같이 바꿔줘보겠습니다."}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"import 'dart:io';\n\nvoid main() {\n  performTask();\n}\n\nvoid performTask() {\n  task1();\n  String task2Result = task2();\n  task3(task2Result);\n}\n\nvoid task1() {\n  String result = 'task 1 data';\n  print('Task 1 complete');\n}\n\nString task2() {\n  Duration threeSeconds = Duration(seconds: 3);\n  String result = 'unprocessed data';\n  Future.delayed(\n    threeSeconds,\n    () {\n      result = 'task 2 data';\n      print('Task 2 complete');\n    },\n  );\n  return result;\n}\n\nvoid task3(task2Data) {\n  String result = 'task 3 data';\n  print('Task 3 complete with $task2Data');\n}\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"task2는 String값인 result를 return하고 있고,\r\n이를 받아서 task3가 작동합니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"이 코드를 실행하게 되면 최종적으로,\r\n'Task 3 complete with unprocessed data' 라는 문구가 출력이 되는데,"}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"우리는 task3()가 task2()가 실행될 때까지 기다렸다가, result의 값이 바뀐 후에 전달받아,\r\n'Task 3 complete with Task 2 complete' 라는 문구를 출력시키고 싶습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"이를 위해서는 await라는 키워드를 Future.delay 앞에 붙여줘서 delay함수가 작동할 때까지\r\n기다려야한다는안내를 해줘야합니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"또한 await라는 키워드는 async 키워드 안에서만 작동하기 때문에\r\n{} 앞에 async를 붙여줘야합니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"그리고 task2() 앞에 Future class로 바꿔줌으로써,\r\n3초뒤, String값을 return할 것을 알려야합니다."}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"Future\u003CString\u003E task2() async {\n  Duration threeSeconds = Duration(seconds: 3);\n  String result = 'unprocessed data';\n  await Future.delayed(\n    threeSeconds,\n    () {\n      result = 'task 2 data';\n      print('Task 2 complete');\n    },\n  );\n  return result;\n}\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"이 와 같은 논리와 방식으로,\r\nperformTask() 함수도 수정을 하면 전체 수정 코드는 아래와 같습니다."}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"import 'dart:io';\n\nvoid main() {\n  performTask();\n}\n\nvoid performTask() async {\n  task1();\n  String task2Result = await task2();\n  task3(task2Result);\n}\n\nvoid task1() {\n  String result = 'task 1 data';\n  print('Task 1 complete');\n}\n\nFuture\u003CString\u003E task2() async {\n  Duration threeSeconds = Duration(seconds: 3);\n  String result = 'unprocessed data';\n  await Future.delayed(\n    threeSeconds,\n    () {\n      result = 'task 2 data';\n      print('Task 2 complete');\n    },\n  );\n  return result;\n}\n\nvoid task3(task2Data) {\n  String result = 'task 3 data';\n  print('Task 3 complete with $task2Data');\n}\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"그럼 실행 화면은 아래와 같이 나옵니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:b,tag:u,props:{alt:v,src:"https:\u002F\u002Fuser-images.githubusercontent.com\u002F26942349\u002F150916143-fafffde0-8257-4969-9f8a-db018657ec53.png"},children:[]}]},{type:a,value:c},{type:b,tag:E,props:{id:"2-exception-handling"},children:[{type:b,tag:e,props:{href:"#2-exception-handling",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:"2. Exception handling"}]},{type:a,value:c},{type:b,tag:s,props:{id:H},children:[{type:b,tag:e,props:{href:"#try-catch",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:z}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Dart에서도 타 언어와 마찬가지로 예외처리를 해줘야합니다.\r\ntry, catch 혹은 try, on, catch와 같은 구조로 사용되며,\r\nSection 13에는 아래와 같은 예제와 함께 사용됐습니다."}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"String myMargin = ‘abc’;\ndouble myMarginAsDouble;\n\ntry {\n    myMarginAsDouble = double.parse(myMargin);\n}\ncatch (e) {\n    print(e);\n}\n\nreturn Scaffold(\n    body: Container(\n    margin: EdgeInsets.all(myMarginAsDouble ?? 30.0),\n    ),\n);\n"}]}]}]},{type:a,value:c},{type:b,tag:E,props:{id:"3-그-외"},children:[{type:b,tag:e,props:{href:"#3-%EA%B7%B8-%EC%99%B8",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:"3. 그 외"}]},{type:a,value:c},{type:b,tag:s,props:{id:I},children:[{type:b,tag:e,props:{href:"#geolocator-package",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:A}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"Section 13에서는 geolocator package를 기반으로 한 위치별 현재 날씨 API를 가져와 보여줬습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"정확한 위치가 아닌 어느정도 오차가 있는 위치 정보가 필요했기 때문에 아래와 같이 코드를 작성해줬습니다."}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"Geolocator().getCurrentPosition(desiredAccuracy: LocationAccuracy.low);\n"}]}]}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"코드 후반에 작성된 low 이외 high, best 등에 따라 위치 정확도가 달라지고 또한 기기의 배터리 사용량도 달라진다고 합니다."}]},{type:a,value:c},{type:b,tag:s,props:{id:J},children:[{type:b,tag:e,props:{href:"#json-converting",ariaHidden:f,tabIndex:g},children:[{type:b,tag:h,props:{className:[i,j]},children:[]}]},{type:a,value:B}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"날씨 API를 가져올 때 json 형식의 파일로부터 data를 추출했는데 이 과정에서\r\ndart:convert package를 사용했습니다."}]},{type:a,value:c},{type:b,tag:d,props:{},children:[{type:a,value:"data 접근 방식은 dictionary에 접근하는 방식과 유사하게 아래 코드와 같이 작성됐습니다."}]},{type:a,value:c},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,o]},children:[{type:b,tag:p,props:{},children:[{type:a,value:"var longitude = jsonDecode(data)[‘word’][‘lon’];\n"}]}]}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002Fflutter-study-week6",extension:".md",createdAt:"2022-01-26T06:07:12.000Z",updatedAt:"2022-03-10T05:16:13.000Z"},prev:{slug:"flutter-study-week5",title:"Flutter 스터디 5주차 (Widget Refactoring)"},next:{slug:"reactnative-study-week4",title:"Reactnative 스터디 4주차"},member:[{slug:"minjun",name:w,description:"CAU 소프트웨어학부 21학번",role:"Alumni(21-22 Member)",img:"minjun.jpg",dir:"\u002Fmembers",path:"\u002Fmembers\u002Fminjun",extension:".yaml",createdAt:"2021-11-20T08:38:06.000Z",updatedAt:"2022-10-26T12:57:45.000Z"}],authorName:w}],fetch:{},mutations:void 0}}("text","element","\n","p","a","true",-1,"span","icon","icon-link","div","nuxt-content-highlight","pre","language-text","line-numbers","code","li",3,"h3","ul","img","image","MinJun Choi","Future class","async, await keyword","try, catch","geolocator package","json converting","h4","ol","h1","future-class","async-await-keyword","try-catch","geolocator-package","json-converting")));