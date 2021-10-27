---
title: 깃헙에서 ipynb 파일 로딩이 안돼요.
description: 콜랩, 주피터에선 잘 열리던 ipynb 파일이 깃헙에서만 열리지 않는다면 해당 파일에서 사용한 패키지나 모듈이 깃헙에서 렌더링이 되지 않은 것! 해결 방법에 대해 알아보자.
slug: github-ipynb-loading
img: ipython-github-error.png
datetime: 2021. 07. 12.
category: 웹_개발
categoryeng: front-end
author: 조용주
language: Korean
featured: none
---

콜랩, 주피터에선 잘 열리던 ipynb 파일이 깃헙에서만 열리지 않는다면 해당 파일에서 사용한 패키지나 모듈이 깃헙에서 렌더링이 되지 않은 것!

## 해결방법

### nb viewer로 해당 링크를 로딩

주피터에서 제공하는 [온라인 뷰어](https://nbviewer.jupyter.org/)를 통해 해당 깃헙 ipynb 파일을 로딩한다. 이때 로딩을 위한 링크는 아래와 같이 레포지토리나 폴더 링크가 아닌 파일 자체의 링크여야 한다.
![로딩 에러 메시지](/github-ipynb-loading/01.png)
해당 링크를 넣으면,
![nbviewer에 링크 넣기](/github-ipynb-loading/02.png)
아래와 같이 깃헙에서 로딩되지 않던 ipynb파일이 로딩된다. 이때, ipynb 파일이 로딩되지 않는 경우도 있다. 이 경우 동일한 파일을 다시 커밋하여 해당 파일 링크를 nbviewer로 넣어보면 열린다.
![해당 ipynb 파일 내용](/github-ipynb-loading/03.png)
### 바인더를 통해 build
![binder 엠블럼](/github-ipynb-loading/04.png)


뷰어 우측 상단에 보면 반 잘린 올림픽 엠블럼 같은 버튼이 있는데, 이걸 클릭해보자.
![binder 실행 화면](/github-ipynb-loading/05.png)
클릭 후에 binder라는 창이 뜨며 주피터 노트북 파일 렌더를 시작한다. 잠깐 기다려주면 아래와 같이 주피터 화면이 뜬다.
![렌더 완료된 온라인 주피터 화면](/github-ipynb-loading/06.png)
이 화면을 보고 있다면 문제는 해결되었다는 뜻!
### 문제해결 완료!
![깃헙에서도 로딩 성공!](/github-ipynb-loading/07.png)
다시 문제가 있던 파일 링크로 돌아가보면 잘 로딩됨을 알 수 있다. 짝짝짝~~!!