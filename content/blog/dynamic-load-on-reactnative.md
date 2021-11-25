---
title: React-native에서 로컬 파일을 동적으로 가져올 수 있을까?
description: React-native의 require 메서드에 관한 내용입니다.
slug: dynamic-load-on-reactnative
category: Front-End
author: Heemin Kim
---

React-native로 처음 개발할 때 Database 연결하지 않고 각종 필요 data 파일들을 local에 두고 개발했습니다. data 파일을 가져올 때 조건에 맞춰 특정 data만 가져오고 싶은 경우가 생기는데 동적으로 생성한 data 파일명을 통해서 data를 불러오려 하면 에러가 뜨더라고요. 동적 string을 가지곤 파일을 불러올 수가 없다는 걸 몰랐던거죠. 그렇다고 Database 연결 설정을 하기는 싫고... 이 글을 통해 이런 경우 사용할 수 있는 약간의 트릭을 알려드리고자 해요.

## React-native에서 로컬 파일을 불러오기

React-native는 단 하나의 메서드로 이미지, 음성, 비디오, 문서 파일을 불러올 수 있습니다.
바로

```
require()
```

메서드입니다.

이 메서드만 있다면 모든 파일을 Android 혹은 iOS 앱에 불러오는 것이 가능하죠.
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

그러면 require메서드가 어떤 종류의 파일이던 잘 처리해서 반환해줍니다.

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

## 왜 에러가 난 걸까?

동적 string이란 string 변수를 포함하는 string입니다.
require메서드는 인자로 오로지 정적 url/string만 허용합니다. 그렇기에 동적 string을 사용하면 에러를 띄우는 것이죠.

왜 동적 string은 받지 않는 걸까요?

require 메서드의 간략한 동작 순서는 다음과 같습니다.

```
1. 인자로 받은 경로값에 위치한 파일을 불러온다
2. 해당 파일을 module이라는 object로 만든다
3. 내부처리를 한다
4. module.exports를 리턴한다
```

exports가 무엇인지는 몰라도 됩니다. 가장 중요한 점은 첫 단계가 파일을 불러온다는 것입니다.

만약 경로값이 잘못되어 존재하지 않는 파일의 경로값을 인자로 주게 되면 2~4단계가 실행 불가하게 됩니다.

따라서 처음부터 정적으로 경로값을 받아 컴파일 시에 존재하는 경로값인지 확인을 하게 되는 것입니다.
동적 경로값은 컴파일시에 존재하는 경로값인지 아닌지 확인을 할 수가 없죠.

## 동적으로 경로값을 줄 수 있는 방법은 없는걸까?

동적 경로값을 사용하는 것이 불가능하다는 점이 명확해졌습니다.

이에 저는 정적 경로값을 require 메서드의 인자로 주지만 동적으로 경로값을 주는 것 처럼 require 메서드를 사용했습니다.

### 1. 삼항연산자 사용

두 개의 경로값이 있고 조건에 따라 하나의 경로값이 선택되는 경우 사용할 수 있습니다.

```
var icon = this.props.active
  ? require('./my-icon-active.png')
  : require('./my-icon-inactive.png');
<Image source={icon} />;
```

### 2. require 메서드의 context 이용하기

```
const images = require.context('../../public/images', true);

let dynamicImage = images(`./${someVariable}.png`);

```

### 3. js파일 생성

js 파일 - 경로: relative/path

```
const images = {
  dog: {
    imgName: 'Dog',
    uri: require('path/to/local/image')
  },
  cat: {
    imgName: 'Cat on a Boat',
    uri: require('path/to/local/image')
  }
}

export { images }
```

App 코드

```
import { images } from 'relative/path';

if (cond === 'cat') {
  let imgSource = images.cat.uri;
}

<Image source={imgSource} />
```

## 좋은 방법일까?

이런 우회 방법들이 절대 좋다고 말할 수 없습니다. 필요한 파일만 load하는 것이 아닌 모든 파일을 load해 놓고 필요한 파일만 가져다 쓰는 형식이기 때문에 리소스 낭비가 굉장히 크기 때문이죠.
Database 연결 전, 매우 적은 양의 data만 있어 Database 연결을 하지 않는 경우, 혹은 작성하고 있는 코드나 알고리즘 테스트를 위해 임시로 위와 같은 처리를 하는 경우에만 사용하는 것을 권장합니다.

Data의 크기가 커질 경우, 출시 계획이 있는 서비스를 개발할 경우 가능한 Database를 사용하는 것이 올바른 방법이라 생각합니다.
