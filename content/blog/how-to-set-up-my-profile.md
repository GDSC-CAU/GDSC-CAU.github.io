---
title: "[공지] 프로필 작성 방법"
description: 프로필 작성 시 지켜야 할 규칙들에 대해 안내 드립니다.
slug: how-to-set-up-my-profile
img: iam.png
category: General
author: Peniel Cho
featured: Featured
---

> 프로필 작성 방법과 작성 시 지켜야할 규칙에 대해 안내 드립니다.

## 1. 확장명은 yaml이며, ~/content/members 디렉토리 내에 위치합니다.

프로필 데이터를 담을 파일로 단일 JSON 파일을 생각하다가, 가독성 좋은 YAML 파일로 결정을 내렸습니다. 아티클 md 파일에서도 YAML Front Matter를 사용하니 훨씬 익숙해지기 좋으실 거에요.

- 프로필의 확장명은 yaml입니다.

- 파일명은 프로필의 slug 속성값과 동일해야 합니다. 관련 내용은 2번 slug 속성을 참고해주세요.

- 파일은 ~/content/members 디렉토리 내에 위치해야 합니다. 아래는 GDSC-CAU.github.io 레포지토리의 구조입니다. 이 중 content 폴더로 이동 후, 그 안의 members 폴더 안에 들어가 md 파일을 생성하시면 됩니다.

  ![레포지토리 구조](/how-to-set-up-my-profile/01.png)

아티클 md 파일에서는 YAML을 삽입해서 사용했지만, 프로필 작성은 완전히 YAML 파일로 작성할 겁니다. 삽입이 아닌 온전한 YAML 파일이니 대시로 묶어주실 필요는 없고요. 아래에서 속성 및 대응 값을 설명 드릴게요.

## 2. 속성 및 값

- **name**: 본인의 이름을 작성해주시면 됩니다. 영문 작성을 추천드리나, 한글로 작성하셔도 무방합니다. 추후 아티클 작성시 작성할 author 속성 값에 본 name 값을 적어주시면 됩니다. 프로필 name 속성값과 아티클 author 속성값이 일치하지 않을 경우 개인 멤버 페이지에 본인 아티클이 나타나지 않으니 유의해주세요.

- **description**: 자신에 대한 설명을 편하게 적어주시면 됩니다. 공부하고 계신 분야를 적으셔도 좋고, 취미와 특기를 적으셔도 좋고, 학과 학년만 적으셔도 좋습니다.

- **role**: 아래 세가지 값 중 자신이 속하는 직함을 골라 적어주시면 됩니다. 대소문자, 띄어쓰기 등에 유의해주세요.

  - Lead
  - Core Member
  - Member

- **slug**: url의 일부로 사용될 중요한 부분입니다. 아래 원칙에 지켜 작성해주세요.

  - 자신의 이름을 영문 소문자로 적어주세요.
  - 띄어쓰기는 불가능합니다. 띄어쓰기가 필요한 경우 대시(-)로 대체해주세요.
  - yaml 파일명과 반드시 동일해야 합니다. 예시로 slug값이 peniel-cho였다면, yaml 파일명은 peniel-cho.yaml이어야 합니다.

- **img**: 본인이 나타난 사진의 파일명을 적어주시면 돼요. 경로까지 작성하실 필요는 없습니다. 사진 파일은 ~/assets/resources/profile 디렉토리 내에 넣어주세요.

  ![profile 폴더 내 이미지 삽입](/how-to-set-up-my-profile/02.png)

### 예시

```yaml
name: Peniel Cho
description: 현업과 가까운 Developer Relations Expert로 성장하기를 희망합니다. DS, ML, DL 관련 공부를 했으며 현재는 프론트를 배워가는 중입니다.
role: Core Member
slug: penielcho
img: peniel.jpg
```

