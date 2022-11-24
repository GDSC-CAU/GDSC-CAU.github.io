---
title: 브라우저에 데이터를 저장하려면 어떻게 해야할까요?
description: 브라우저에 데이터를 저장하는 방법인 Cookie, localStorage, sessionStorage에 대해 알아봅시다.
slug: javascript-how-to-store-data-to-browser
category: Front-End
author: IlSang Park
---

웹 개발을 할 때, 아무리 간단한 프로그램이라도 데이터를 저장해야하는 프로세스들이 생기게 됩니다. 일반적으로 이런 경우에 서버에 데이터를 저장하게 됩니다.

하지만 저장해야하는 데이터가 중요하지 않은 데이터이거나 임시로 브라우저에서만 사용하는 데이터인 경우들도 있습니다. 이런 경우에도 서버에 데이터를 저장하는 것은 낭비일 수 있습니다. 그럼 이럴 때는 데이터를 어디에 저장하고 사용해야할까요?

우리는 클라이언트에서 데이터를 저장하고 사용하는데 `쿠키`, `로컬 스토리지`, `세션 스토리지` (+IndexedDB) 등 다양한 방법을 사용할 수 있습니다.

## 🍪 쿠키

먼저 쿠키에 대해서 알아보겠습니다. 그럼 쿠키가 뭘까요? 당연히 먹는 쿠키는 아닐텐데 말이죠.

### 쿠키의 정의

쿠키의 정의를 살펴보면 다음과 같습니다.

> 👉 **쿠키의 정의**
>
> **브라우저에 저장되는 작은 크기의 문자열**로, [RFC 6265](https://tools.ietf.org/html/rfc6265) 명세에서 정의한 HTTP 프로토콜의 일부이다.

정의만 봐서는 브라우저에 저장되는 문자열이라는 것 말고는 잘 모르겠으니 차근차근 알아봅시다.

### **쿠키와 document.cookie**

쿠키는 주로 웹 서버에 의해 만들어지며 서버가 HTTP 응답 헤더(header)의 `Set-Cookie`에 내용을 넣어 전달하면, 브라우저는 이 내용을 자체적으로 브라우저에 저장합니다.

브라우저는 사용자가 쿠키를 생성하도록 한 사이트에 접속할 때마다 쿠키의 내용을 `Cookie` 요청 헤더에 넣어서 함께 전달합니다.

쿠키는 클라이언트 식별과 같은 인증에 가장 많이 쓰여왔는데, 이후에 다루겠지만 현재에는 보안 이슈로 현재는 이러한 로그인 인증 방법을 잘 사용하지는 않습니다. 그래도 쿠키로 클라이언트 식별하는 과정에 대해서 한번 알아봅시다!

#### 쿠키를 사용해 클라이언트 식별을 하는 과정

1. 사용자가 로그인을 시도합니다.
2. 서버로 로그인 요청을 보냅니다.
3. 로그인 요청을 받은 서버는 해당 로그인 요청이 유효한 경우, 세션을 생성하여 HTTP 응답 헤더의 `Set-Cookie`에 세션 id 정보를 담아 클라이언트에 보내줍니다.
4. 클라이언트(브라우저)는 이러한 세션 id를 저장합니다.
5. 인증이 필요한 데이터를 가져올 때, 클라이언트는 HTTP `Cookie` 헤더에 인증 정보(세션 id)를 함께 실어 서버에 요청을 보냅니다.
6. 서버는 브라우저가 보낸 요청 헤더의 세션 id를 불러와 세션이 유효한지 확인하여 사용자를 식별합니다.

위의 과정을 통해서 쿠키를 사용해 클라이언트 식별을 할 수 있습니다.

그럼 브라우저에서 쿠키에 접근하려면 어떻게 해야할까요?

### 브라우저에서 쿠키 사용하기

브라우저에서 쿠키에 접근하려면, `document.cookie` 프로퍼티를 이용하면 됩니다.

### 쿠키 읽기

`document.cookie`를 호출하여 쿠키를 읽을 수 있습니다. 브라우저의 콘솔창에서 다음과 같이 코드를 작성하면 쿠키를 출력할 수 있습니다.

```jsx
console.log(document.cookie);
// 결과 : cookie1=value1; cookie2=value2; ....
```

쿠키는 `name=value` 쌍으로 구성되어있고, 각 쌍은 `;`로 구분합니다. 쌍 하나는 하나의 독립된 쿠키를 나타냅니다. 정규 표현식이나 배열 관련 함수를 함께 사용해서 세미콜론을 기준으로 `document.cookie`의 값을 분리하면 원하는 쿠키를 찾아서 사용할 수 있습니다.

### 쿠키 쓰기

`document.cookie`에 직접 값을 쓸 수도 있습니다. 이때 `cookie`는 데이터 프로퍼티가 아닌 **접근자(accessor) 프로퍼티**이기 때문에 데이터 프로퍼티에 값을 할당하는 것과는 조금 다르게 처리됩니다. **`document.cookie`에 값을 할당하는 코드를 실행해봅시다.**

```jsx
document.cookie = "name=GDSC";
```

코드 실행 결과를 살펴보면 **브라우저는 이 값을 받아 다른 쿠키의 값은 변경되지 않고 해당 쿠키를 갱신하는데** 아래 사진과 같이 필요한 쿠키만 갱신된 것을 확인할 수 있습니다.

![console 이미지](/javascript-how-to-store-data-to-browser/01.png)

쿠키의 `name`값과 `value`값에는 특별한 제약이 없기 때문에 모든 글자가 허용됩니다. 하지만 형식의 유효성을 일관성 있게 유지하기 위해 내장 함수 `encodeURIComponent`를 사용하여 이름과 값을 이스케이프 처리하는 것이 좋습니다.

### 쿠키의 한계

쿠키에는 한계점이 존재합니다. 그 한계점은 다음과 같습니다.

> ⛔ **쿠키의 한계**
>
> - `name=value` 쌍의 크기(`encodeURIComponent`로 인코딩한 이후를 기준으로)가 4KB를 넘는 정보는 쿠키에 저장할 수 없습니다.
> - 도메인 하나당 저장할 수 있는 쿠키의 개수가 한정되어 있습니다. (브라우저에 따라 조금씩 다르지만, 대략 20여개)

그럼 쿠키를 사용할 때는 어떻게 사용해야할지 알아봅시다.

### 쿠키 옵션

쿠키에는 몇가지 옵션이 존재하며, 꼭 지정해줘야하는 옵션들도 존재합니다. 옵션도 쿠기 값과 마찬가지로 `key=value` 형태로 나열하며 세미콜론을 통해 구분합니다.

#### path

**쿠키에 접근할 수 있는 경로를 설정하는 옵션**입니다. path에 지정되어 있는 경로나 해당 경로의 하위 경로에 있는 페이지만 쿠키에 접근할 수 있습니다. 기본값은 현재 경로이고 절대 경로로 지정해주어야 합니다.

예를 들어, 관리자 페이지에서 접근할 수 있는 쿠키를 `path=/admin` 옵션을 사용하여 설정합니다. 이 쿠키는 `/admin`과 `/admin/order`에서는 볼 수 있지만, `/home` 이나 `/adminPage`에선 볼 수 없습니다.

특별한 경우가 아니라면, 웹사이트의 모든 페이지에서 쿠키에 접근할 수 있도록 `path` 옵션을 `path=/`같이 루트 경로로 설정합니다.

#### domain

**쿠키에 접근 가능한 domain을 설정하는 옵션** 입니다. domain 옵션을 설정하지 않았다면, 쿠키를 설정한 도메인에서만 쿠키에 접근할 수 있습니다.

예를 들어, `google.com`에서 설정한 쿠키는 `apple.com`에서 접근할 수 없습니다. 그런데 여기서 중요한 점이 있습니다. domain 옵션을 설정하지 않은 상태에서는 `google.com`의 서브 도메인인 `map.google.com`에서도 쿠키에 접근할 수 없습니다.

만약에 서브 도메인에서도 쿠키를 사용해야한다면 쿠키를 설정할 때에 도메인 옵션을 꼭 루트 도메인으로 지정해주어야 합니다. 즉, `domain=google.com`과 같이 명시적으로 루트도메인을 설정해줄 경우에는 서브 도메인에서도 쿠키에 접근할 수 있습니다.

> 💡 **TIP**
>
> 도메인 옵션을 설정할 때, 하위 호환성을 유지하기 위해서 (즉, 구식 브라우저에서 사용할 수 있도록) `domain=.google.com`처럼 앞에 `.`을 붙여서 표기하기도 합니다.


#### expires & max-age

**expires(유효 일자)나 max-age(만료 기간)을 설정하는 옵션** 입니다. 만약 이 옵션들이 설정되어있지 않을 경우에는 브라우저가 닫힐 때 쿠키도 함께 삭제됩니다. 그리고 그렇게 브라우저를 닫으면 삭제되는 쿠키를 **세션 쿠키(session cookie)**라고 부릅니다.

- **expires**
  expires를 설정할 경우 브라우저는 설정된 유효 일자까지 쿠키를 유지하다가, 해당 일자가 도달하면 쿠키를 자동으로 삭제합니다. 과거의 일자를 설정할 경우 바로 삭제됩니다.
  쿠키의 유효 일자는 `expires=Mon, 17 Oct 2022 21:30:00 GMT`처럼 반드시 GMT(Greenwich Mean Time) 포맷으로 설정해야 합니다. Date 객체에 대해서 `date.toUTCString` 함수를 사용하면 해당 포맷으로 변경할 수 있습니다.
- **max-age**
  max-age는 expires 옵션의 대안으로, 쿠키 만료 기간을 설정하는 옵션입니다. 현재부터 만료될 때까지의 시간을 초로 환산한 값을 설정합니다. 0이나 음수값을 설정하면 쿠키는 바로 삭제됩니다.

#### secure

**HTTPS로 통신하는 경우에만 쿠키가 전송되도록 설정하는 옵션** 입니다. 만약 `secure` 옵션이 없으면 http에서 생성한 쿠키를 https에서 읽을 수 있고, https에서 생성한 쿠키도 `http://site.com`에서 읽을 수 있습니다.

쿠키는 기본적으로 도메인만 확인하지 프로토콜을 따지진 않기 때문입니다.

하지만 `secure` 옵션이 설정된 경우, `https://google.com`에서 설정한 쿠키는 `http://google.com`에서 접근할 수 없습니다. 쿠키에 민감한 내용이 저장되어 있어 암호화되지 않은 HTTP 연결을 통해 전달되는 걸 원치 않는다면 이 옵션을 사용하면 됩니다.

#### samesite

이 옵션 또한 보안 옵션으로 **크로스 사이트 요청 위조(cross-site request forgery, XSRF) 공격을 막기 위한 옵션**입니다.

- `samesite=none` : samesite 옵션을 사용하지 않은 쿠키와 같습니다.
- `samesite=strict` : 값을 설정하지 않고 그냥 `samesite` 옵션만 써줘도 동일하게 동작하며, 크로스 사이트 요청에는 항상 전송되지 않습니다.
- `samesite=lax` : strict 옵션에 비해서는 느슨한 정책으로 서드파티 쿠키는 전송되지 않지만 몇가지 예외 조건에는 전송됩니다.

`samesite`는 좋은 옵션이지만, 2017년 이전 버전의 오래된 브라우저에선 지원하지 않습니다. 따라서`samesite`옵션으로만 보안 처리를 하게 되면, 구식 브라우저에서 보안 문제가 발생할 수 있습니다.

구식 브라우저에 대응하지 못한다는 문제가 있긴 하지만, `samesite` 옵션을 XSRF 토큰 같은 다른 보안 기법과 함께 사용하면 보안을 강화할 수 있습니다. 구식 브라우저를 더는 사용하지 않는 때가 오면 XSRF 토큰 역시 필요하지 않겠죠.

#### httpOnly

이 옵션은 **웹서버에서 `Set-Cookie` 헤더를 이용해 쿠키를 설정할 때 지정할 수 있는 옵션**입니다. 이 옵션은 자바스크립트 같은 클라이언트 측에서 스크립트가 쿠키를 사용할 수 없게 합니다. 이 옵션을 사용할 경우,  `document.cookie`를 통해 쿠키를 보거나 조작할 수 없습니다.

해커가 악의적인 코드를 페이지에 삽입하여 사용자가 페이지에 접속하기를 기다리는 방식의 공격을 예방할 때 이 옵션을 사용할 수 있습니다. 기본적으로는 해커가 악의적인 코드를 삽입하지 못하도록 예방하는 것이 가장 좋지만, 해커가 악의적인 코드를 삽입할 가능성은 언제나 있고, 그런 상황이 발생할 경우, 사용자가 웹 페이지에 접속했을 때 쿠키를 보거나 조작하여 인증 정보 등을 해커가 훔칠 수 있게 됩니다. 하지만 이 옵션을 사용한다면 쿠키를 읽을 수 없도록하여 보호할 수 있습니다.

## 로컬스토리지(localStorage)와 세션스토리지(sessionStorage)

브라우저에서 데이터를 저장할 수 있는 방법은 쿠키만 있는 것이 아니라고 했습니다. 그럼 그 방법으로 소개 했던 방법 중 로컬스토리지와 세션스토리지는 무엇일까요?

**로컬 스토리지**와 **세션 스토리지**는 **웹 스토리지 객체(Web Storage Object)**로, 브라우저 내에 키-값 쌍을 저장할 수 있게 만들어줍니다.

그런데 쿠키를 사용하면 되는데 왜 이런 웹 스토리지 객체들을 사용하는걸까요? 이런 웹 스토리지 객체들이 쿠키와 다른 점은 무엇일까요?

- 웹 스토리지 객체는 쿠키보다 **더 많은 자료를 보관할 수 있습니다**. 브라우저마다 다르지만, 대부분 2MB 혹은 그 이상의 웹 스토리지 객체를 저장할 수 있고 개발자가 브라우저 내부의 웹 스토리지 객체의 저장 방법을 구성할 수 있습니다.
- 웹 스토리지 객체는 **네트워크 요청 시에도 서버로 전송되지 않으며** **서버가 HTTP 헤더를 통해 조작할 수 없습니다**. 웹 스토리지 객체는 자바스크립트 코드를 통해서만 조작될 수 있습니다.
- 웹 스토리지 객체는 도메인·프로토콜·포트로 정의되는 오리진(origin)에 묶여있기 때문에 프로토콜과 서브 도메인이 다르면 데이터에 접근할 수 없습니다.

### 웹 스토리지 객체의 메서드와 프로퍼티

- `setItem(key, value)` : 키-값 쌍을 보관하는 메서드
- `getItem(key)` : 키에 해당하는 값을 받아오는 메서드
- `removeItem(key)` : 키에 해당하는 값을 삭제하는 메서드
- `clear()` : 스토리지 객체 내부에 있는 데이터를 모두 삭제하는 메서드
- `key(index)` : 인덱스에 해당하는 키를 받아오는 메서드
- `length` : 저장된 항목의 개수

### 로컬스토리지vs세션스토리지

그럼 로컬스토리지와 세션스토리지가 무엇이고 이 둘은 어떤 차이점을 가지고 있을까요?

이 두 가지 웹 스토리지 객체의 차이점은 **데이터의 보존 범위와 보존 기간**입니다.

**세션 스토리지**는 웹 페이지의 세션이 끝날 때 저장된 데이터가 지워지고, **로컬 스토리지**는 웹 페이지의 세션이 끝나지 않아도 데이터가 지워지지 않습니다. 그럼 웹 페이지의 세션이 끝난다는 건 무엇을 의미할까요?

브라우저에 같은 웹사이트를 여러 창과 탭에 띄워봅시다.

이 때, 각각의 창•탭마다 **서로 다른 세션 스토리지에 데이터가 저장**되고, 각 창과 탭을 닫게 될 경우 세션 스토리지에 **저장되어 있던 데이터도 함께 소멸**합니다.

반면, 로컬 스토리지의 경우 **여러 창이나 탭 간에 서로 데이터가 공유**되며, 각 창과 탭을 닫아도 **저장되어 있는 데이터가 함께 소멸하지 않고 브라우저에 그대로 남아있습니다**.

> ❗ **주의!**
>
> 로컬 스토리지의 데이터는 동일한 컴퓨터의 동일한 브라우저에만 해당합니다. 같은 컴퓨터라도 크롬과 파이어폭스, 사파리와 같이 다른 브라우저를 사용한다면 데이터를 공유할 수 없습니다.

### 웹 스토리지

웹 스토리지 객체는 위에서 언급한 메서드와 프로퍼티를 사용할 수 있습니다. 실제로는 로컬스토리지는 자주 사용할 수 있지만, 세션 스토리지는 제한적이기 때문에 잘 사용하지는 않습니다.

```jsx
localStorage.setItem("testLocal", 1);
sessionStorage.setItem("testSession", 3);
// 브라우저 종료 후 다시 실행
console.log(localStorage.getItem("testLocal")); // 1
console.log(sessionStorage.getItem("testSession")); // null
```

> 💡 로컬스토리지 사용시, 웹페이지를 닫아도 데이터가 삭제되지 않으므로 직접 `clear()` 메소드를 통해 데이터를 비워주는 작업을 해주는 것이 좋습니다.

#### 웹 스토리지를 사용할 때 유의해야할 점

**웹 스토리지 객체의 키와 값은 반드시 문자열이여야 합니다.** 따라서 숫자나 객체 등 다른 자료형을 사용할 경우 문자열로 변환이 되어 저장이 됩니다. 이러한 특징으로 생기는 문제를 피하기 위해서 JSON 형태로 데이터를 사용하기도 합니다.

```jsx
localStorage.setItem("data", JSON.stringify({ a: 1, b: 2 })); // undefined
JSON.parse(localStorage.getItem("data")); // {a: 1, b: 2}
```

또한, 스토리지 객체를 iterable 객체가 아니기 때문에 바로 키를 전체 얻어오지 못하고 반복문을 통해 가져올 수 있습니다. 이 때, `hasOwnProperty` 또는 `Object.keys` 등을 사용하여 상속받은 필드 이외의 키만을 받아와야 합니다.

#### 웹 스토리지 객체를 일반 객체 처럼 사용하기

웹 스토리지 객체를 사용할 때, 일반 객체처럼 사용할 수도 있습니다. 즉, `localStorage.test=1;`과 같은 코드를 사용하여 로컬스토리지에 데이터를 저장할 수도 있다는 말 입니다. 하지만 이러한 방법을 사용하는 것은 좋지 않습니다.

그 이유는 아래와 같습니다.

- 사용자가 `length`나 `toString`, 로컬 스토리지의 내장 메서드를 키로 설정할 수 있고, 일반 객체처럼 다룰 때 에러가 발생할 수 있습니다.
- 데이터를 수정할 경우 발생하는 `storage` 이벤트가 스토리지 객체를 일반 객체 처럼 사용할 때는 발생하지 않습니다.

#### storage 이벤트

웹 스토리지 객체의 데이터가 갱신될 때, storage 이벤트가 실행되며, 다음과 같은 프로퍼티를 지원합니다. 중요한 점은 storage 이벤트가 이벤트를 발생시킨 스토리지를 제외한 나머지 접근 가능한 window 객체 전부에서 일어난다는 사실입니다.

지금까지 브라우저에 데이터를 저장하는 방법에 대해서 알아보았습니다. 브라우저에 데이터를 저장해야할 경우, 각각의 방법의 특징과 장단점에 대해서 잘 알고 상황에 어울리는 데이터 저장 방법을 사용하시길 바랍니다.