---
title: React-nativa에서 로컬 파일을 동적으로 가져올 수 있을까?
description: React-native의 require 함수에 관한 내용입니다.
slug: dynamic-load-on-reactnative
category: Front-End
author: Heemin Kim
---

React-native로 처음 개발할 때 Database 연결하지 않고 각종 필요 data 파일들을 local에 두고 개발했습니다. data 파일을 가져올 때 조건에 맞춰 특정 data만 가져오고 싶은 경우가 생기는데 동적으로 생성한 data 파일명을 통해서 data를 불러오려 하면 에러가 뜨더라고요. 동적 string을 가지곤 파일을 불러올 수가 없다는 걸 몰랐던거죠. 그렇다고 Database 연결 설정을 하기는 싫고... 이 글을 통해 이런 경우 사용할 수 있는 약간의 트릭을 알려드리고자 해요.

## React-native에서 로컬 파일을 불러오기

React-native는 단 하나의 함수로 이미지, 음성, 비디오, 문서 파일을 불러올 수 있습니다.
바로
```
require()
```
함수입니다.

이 함수만 있다면 모든 파일을 Android 혹은 iOS 앱에 불러오는 것이 가능하죠.
사용법도 매우 간단한데요, 인자로 불러오고 싶은 파일의 상대경로를 string으로 주면 됩니다.

```
require('[data 파일 상대경로]')
```

### 정적으로 로컬 파일 불러오기

정적으로 로컬 파일을 불러오는 방법은 상대경로를 완벽하게 입력하면 됩니다.
```
const data = require('./profile.png')
<Image source={require('./profile.png')} />
```
그러면 require함수가 어떤 종류의 파일이던 잘 처리해서 반환해줍니다.


### 동적으로 로컬 파일 불러오기

하지만 우리가 원하는건 동적으로 로컬 파일을 불러오는거죠.
위에서 정적으로 파일을 불러오는 코드를 이해했다면, 동적으로는 이렇게 하면 되겠네! 하고 머리속에 떠오른 코드가 있을 겁니다. 저는 겁도 없이 이 생각을 코드로 옮겼고 아래와 같은 코드를 작성했습니다.
```
let imageFileName

// imageFileName 값을 바꾸는 연산

let image = require(imageFileName)
```
과연 이 코드가 동작했을까요?
잘 동작했다면 제가 이 글을 쓰고 있지 않았겠죠 :)
에러가 나서 앱이 실행되지도 않았습니다.

## 왜 require은 동적 string을 인자로 받지 않을까?

동적 string이란 string 변수를 포함하는 string입니다.
require함수는 인자로 오로지 정적 url/string만 허용합니다. 그렇기에 동적 string을 사용하면 에러를 띄우는 것이죠.

