---
title: '[공지] 프로젝트 아티클 작성 방법'
description: 프로젝트 아티클 작성 방법과 작성 시 지켜야할 규칙에 대해 안내 드립니다.
slug: how-to-write-project-article
author: Peniel Cho
---

>  프로젝트 아티클 작성 방법과 작성 시 지켜야할 규칙에 대해 안내 드립니다.


모든 부분이 기존 [아티클 작성 방법](https://gdsc-cau.github.io/articles/how-to-write-article)와 동일하지만, 두가지가 달라요.

## 첫째, ~/content/projects 디렉토리 내에 위치합니다.

- 아티클의 확장명은 md(마크다운)입니다. 

- 파일명은 아티클 slug 속성값과 동일해야 합니다. 관련 내용은 3번에서 설명 드립니다. 

- 파일은 ~/content/projects 디렉토리 내에 위치해야 합니다. 아래는 GDSC-CAU.github.io 레포지토리의 구조입니다. 이 중 content 폴더로 이동 후, 그 안의 projects 폴더 안에 들어가 md 파일을 생성하시면 됩니다.

## 둘째, YAML Front Matter 중 category 속성이 하나 줄어들어요.
#### 기존 아티클
```yaml
---
title: 프로젝트에 Tailwind CSS 적용하기
description: 프로젝트에 Tailwind CSS를 적용하는 방법을 Nuxt 프레임워크를 중심으로 알아봐요.
slug: tailwind-on-nuxt
category: Front-End
author: Peniel Cho
---
```

#### 프로젝트 아티클
```yaml
---
title: DACON 손글씨 정확도 인식 대회 후기
description: DACON 손글씨 정확도 인식 대회 입상 과정을 공유합니다.
slug: dacon-review-01
author: Peniel Cho
---
```

더 이상 안내 사항은 없습니다ㅎ

+ 라우팅 버그 잡았습니다~