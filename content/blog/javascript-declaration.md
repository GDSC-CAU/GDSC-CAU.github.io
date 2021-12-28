---
title: JavaScript 변수 선언
description: 자바스크립트 변수 선언 var, let, const 
slug: javascript-declaration
category: Front-End
author: Youngbeen Kim
featured: none
---

# 변수 선언 (Variable Declaration)

자바스크립트는 변수 선언을 할 때 타 언어와 다르게 type을 명시할 필요가 없다. C나 Java 등 대부분의 언어는 변수를 선언할 때 변수 안에 담기는 값의 type을 고려하여 변수를 선언한다.

```c
// C언어
int num1 = 1;
char char1 = 'a';
```

하지만 자바스크립트는 number, string, boolean 과 같이 다른 type의 값들도 모두 같은 키워드를 사용하여 변수를 선언한다. 즉 변수를 선언할 때 type을 고려하지 않는다. 자바스크립트는 변수의 사용 조건을 고려하여 변수를 선언해야하고 고려해야하는 조건의 내용은 다음과 같다.

1. 중복 선언 가능 여부
2. 재할당 가능 여부
3. 변수 스코프 유효 범위
4. 변수 호이스팅 방식
5. 전역객체 프로퍼티 여부

각 조건을 살펴보면서 내용을 이해해보자.

## 변수 선언 키워드

1. var
2. let
3. const

## 변수 선언의 3단계

자바스크립트는 총 3단계에 걸쳐 변수를 생성한다. 변수 선언의 3단계는 호이스팅 파트에서 자세하게 다루겠다.

1. 선언
2. 초기화
3. 할당

## 변수의 사용 조건에 따른 키워드 분류

### 1. 중복 선언 가능 여부

중복 선언은 변수를 선언하여 사용하다가 이후에 같은 이름의 변수를 다시 한번 선언하는 것이다. var은 중복 선언이 가능하고 let, const는 중복 선언이 불가능하다.

중복 선언 가능 : var

중복 선언 불가능 : let, const

```jsx
var a = 10;
console.log(a); //10

var a = 20;
console.log(a); //20

//이미 선언되고 값이 할당된 변수를 중복 선언만 하고 초기화하지 않으면 이전 값이 그대로 남아있다.
var a;
console.log(a); //20
```

```jsx
let a = 10;
let a = 20; // Error

const b = 10;
const b = 20; // Error
```

### 2. 재할당 가능 여부

재할당은 변수를 선언한 뒤에 값을 할당하여 사용하다가 이후에 변수에 다른 값을 대입하는 것을 뜻한다. var, let은 재할당이 가능하고, const는 재할당이 불가능하다.

재할당 가능(변수) : var, let

재할당 불가능(상수) : const

```jsx
var a = 10;
a = 20;

let b = 10;
b = 20;

console.log(a); // 20
console.log(b); // 20
```

```jsx
const a = 10;
a = 20; // Error
```

### 3. 변수 스코프 유효 범위

변수 스코프 범위란 선언한 변수가 사용될 범위를 뜻한다. var은 함수 레벨 스코프를 가지고 let, const는 블록 레벨 스코프를 가진다. 자세한 내용은 아래의 코드를 참고해보자.

함수 레벨 스코프 : var

블록 레벨 스코프 : let, const

function {} 키워드를 통해 블록이 만들어지고 그 블록 안에 선언된 변수는 해당 함수 내부에서만 사용이 가능하다. 이때 if 나 while 문 등은 {} 블록이 선언되어 사용되지만 함수가 아니다.

```jsx
function hi() {
	var a = 10;
	console.log(a);
}

if(true) {
	var c = 40;
	console.log(c); // 40
}

var b = 20;

hi(); // 10
console.log(c); // 40
console.log(b); // 20

// 변수 a 는 hi 라는 함수 내부에 선언되어 있고 아래의 코드는 hi함수 밖에서 실행된다.
// 따라서 함수 밖에서 a라는 변수는 선언되지 않았으므로 에러가 발생한다.
console.log(a); // Error
```

함수 뿐만 아니라 if, for, while, try ~ catch 등 블록 안에 선언된 모든 변수들은 해당 블록 안에서만 사용할 수 있다.

```jsx
function hi() {
	let a = 10;
	console.log(a);
}

if(true) {
	let c = 40;
	console.log(c); // 40
}

let b = 20;

hi(); // 10
console.log(b); // 20

// 변수 c 는 if문 블록 안에서 선언되어 있고 아래의 코드는 if 문 밖에서 실행된다.
// 따라서 if 블록 밖에서 c라는 변수는 선언되지 않았으므로 에러가 발생한다.
console.log(c); // Error

// 변수 a 는 hi 라는 함수 내부에 선언되어 있고 아래의 코드는 hi함수 밖에서 실행된다.
// 따라서 함수 밖에서 a라는 변수는 선언되지 않았으므로 에러가 발생한다.
console.log(a); // Error
```

### 4. 변수 호이스팅 방식

호이스팅이란 코드가 실행되기 전 변수나 함수 선언문이 맨 위로 끌어올려지는 현상을 뜻한다. 아래의 코드를 보자.

```jsx
console.log(a);

var a = 10;
```

코드를 보면 아직 선언되지 않은 a가 console.log 에서 사용되기 때문에 에러를 발생시킬 것만 같다. 하지만 막상 실행을 시키면 에러는 발생하지 않고 undefined 가 출력된다. 호이스팅이 발생한 것이다. 자바스크립트는 아래의 코드를 다음과 같이 해석한다.

```jsx
var a;

console.log(a);

a = 10;
```

맨 처음 코드의 var a = 10; 부분이 선언문과 값 할당이 분리되었고 선언문이 코드의 가장 최상단으로 끌어올려졌다. 따라서 console.log(a);를 실행할 때 아직 선언되지 않은 변수 a 를 참조하는 것으로 보이지만, 자바스크립트 내부적으로 호이스팅이 동작하여 a는 선언은 되었지만 값이 할당되지 않은 undefined 상태가 된다. 따라서 위의 코드는 에러를 발생시키지 않고 undefined를 출력하는 것이다.

var, let, const 모두 변수 호이스팅이 발생하지만 동작하는 방식이 다르다. var은 호이스팅이 발생하면서 변수 선언의 3단계 중 선언과 초기화가 실행된다. 하지만 let과 const는 호이스팅이 발생하면서 변수 선언의 3단계 중 선언만 실행된다.

호이스팅 방식 1 (선언, 초기화) : var

호이스팅 방식 2 (선언) : let, const

방식 1 : var

```jsx
console.log(f); // undefined

var f = 10;

console.log(f); // 10
```

코드 실행 전에 자바스크립트 엔진이 미리 var keyword의 변수를 **선언**하고, undefined로 **초기화**한다. 이후에 실제 변수가 선언된 문장을 만나면 알맞은 값을 할당한다. 

방식 2 : let, const

```jsx
console.log(f); // Error

let f = 10;
```

뒤에 선언된 변수를 앞에서 참조하면 에러가 발생한다. 마치 호이스팅이 되지 않은 것처럼 보일 수 있다. 하지만 let, const도 호이스팅이 발생한다. 코드 실행 전에 자바스크립트 엔진이 미리 변수는 **선언**하지만 **초기화**는 ****따로 하지 않는다. 따라서 값을 참조할 수 없어서 Error가 발생하고 이후에 변수 선언문을 만나는 순간에 값을 초기화 한다. 이렇게 변수 선언과 초기화가 이루어지는 시점이 다른 경우 그 사이에 일시적으로 변수 값을 참조할 수 없는 구간을 TDZ (Temporal Dead Zone)이라고 부른다.

```jsx
let a = 10;

if(true) {
	console.log(a); // ReferenceError : a is not defined
	let a = 20;
}
```

위의 코드를 실행하게 되면 console.log(a);를 실행할 때 a is not defined라는 ReferenceError가 발생한다. 위의 코드는 자바스크립트 엔진이 실행할 때 호이스팅 되어 아래와 같은 상태로 해석된다.

```jsx
let a = 10;

if(true) {
	let a; // 선언만 하고 초기화 되지 않음 
	console.log(a); // ReferenceError : a is not defined
	a = 20;
}
```

자바스크립트 엔진에서는 전역변수보다 지역변수가 우선 순위를 가지는데, if 블록에서 a 변수에 함수 호이스팅이 일어났지만 a라는 변수가 선언되었을 뿐 값은 초기화 되지 않아서 전역변수 a = 10; 이 있음에도 불구하고  값을 참조할 수 없다는 ReferenceError가 나타나게 된다. 이를 TDZ 구간이라 부른다.

### 5. 전역객체 프로퍼티 여부

자바스크립트에서 모든 객체는 프로퍼티를 가진다. 자바스크립트 코드가 실행될 때, 전체 코드를 모두 포함하는 하나의 객체가 만들어지는데 그 객체를 전역객체라고 한다. 

브라우저에서 실행되는 자바스크립트의 경우에는 전역 객체는 window라는 이름으로 매핑되고, node.js 환경에서 실행되는 자바스크립트의 경우에는 global이라는 이름으로 매핑된다. 아래의 예시는 브라우저에서 실행 되었다고 가정한다. 

당연히 전역객체도 객체이기 때문에 프로퍼티를 가진다. 이때 var로 선언된 변수는 전역객체의 프로퍼티가 되지만, let과 const로 선언된 변수는 전역객체의 프로퍼티가 되지 않는다.

전역객체의 프로퍼티가 된다 : var

전역객체의 프로퍼티가 되지 않는다 : let, const

```jsx
var a = 10;
console.log(a); // 10
console.log(window.a); // 10
```

```jsx
let a = 10;
console.log(window.a); // undefined -> 전역객체에 a라는 프로퍼티가 없다.
console.log(a); // 10
```