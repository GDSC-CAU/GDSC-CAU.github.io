---
title: Javascript 데이터 타입과 변수
description: 자바스크립트의 데이터 타입과 변수에 대해 정리한 내용입니다.
slug: javascript-basic-study-1
category: Front-End
author: Hayeon Cho
---

####👉 들어가기 앞서

자바스크립트는 **동적 타입**(dynamic/weak type) 언어입니다. 

이것은 변수의 타입 지정 없이 값이 할당되는 과정에서 **값의 타입에 의해 자동으로 타입이 결정될 것이라는 뜻**입니다. 따라서 같은 변수에 여러 타입의 값을 할당할 수 있습니다. 

```js
let text = 'hello';
console.log(`value: ${text}, type: ${typeof text}`);
//결과 : value: hello, type: string
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
//결과 : value: 1, type: number
text = '7' + 2;
console.log(`value: ${text}, type: ${typeof text}`);
//결과 : value: 72, type: string
text = '8' / '2';
console.log(`value: ${text}, type: ${typeof text}`);
//결과 : value: 4, type: number
```
</br>

# 데이터 타입(Data Types)

자바스크립트에서의 데이터 타입은 크게 **기본 타입**(Primitive Type)과 **객체 타입**(Object/Reference Type)으로 나뉘는데, 
각 타입에 존재하는 데이터 타입은 다음과 같습니다.

**기본 타입**  
- Number(숫자)
- BigInt
- String(문자열)
- Boolean(불린값)
- undefined
- null
- Symbol

**객체 타입**
- Object(객체)
</br>
### 기본 타입(Primitive Type)

<aside>
기본 타입의 값은 변경 불가능한 값(immutable value)이며 값에 의한 전달(pass-by-value)입니다.

</aside>

#### Number

`int`, `long`, `float`, `double`과 같이 다양한 숫자 타입이 존재하는 C언어와는 다르게 자바스크립트에서 숫자 타입은  64비트 부동소수점 형식으로 정수와 실수 구분 없이 하나의 숫자 타입만 존재합니다.

숫자형엔 일반적인 숫자 외에 `Infinity`, `-Infinity`, `NaN`같은 '특수 숫자 값(special numeric value)'이 포함됩니다.

```js
let num_01 = 10; // 정수도 실수로 처리한다.
let num_02 = -10.05; // 실수
let num_03 = 10/0; // +Infinity : 양의 무한대
let num_04 = 10/-0; // -Infinity : 음의 무한대
let num_05 = 1 * 'str'; // NaN : 산술 연산 불가(not-a-number)
console.log(typeof num_01) // number
```

#### BigInt

BigInt는 길이의 제약 없이 정수를 나타낼 수 있는 새로운 숫자 타입입니다.
BigInt는 정수 리터럴의 뒤에 `n`을 붙이거나 함수 `BigInt()`를 호출해 생성할 수 있습니다.

```js
const theBiggestInt = 9007199254740991n;
const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n
```

#### String

문자열 타입은 텍스트 데이터를 나타내는데 사용합니다.

문자열은 작은 따옴표(‘’) 또는 큰 따옴표(“”) 안에 텍스트를 넣어 생성하는데 가장 일반적인 표기법은 **작은 따옴표**를 사용하는 것입니다.

아래 예제를 보면 알 수 있듯이, 자바스크립트는 C언어와는 다르게 **한 번 정의한 문자열은 변하지 않습니다.**

```js
let str = 'dev';

str[0] = 'D';
console.log(str); // dev
```



#### Boolean

Boolean 타입의 값은 논리적 참, 거짓을 나타내는 `true` 와 `false` 뿐입니다.

![boolean 표 이미지](/javascript-basic-study-1/boolean.png)

#### Undefined & Null

두 타입 모두 값이 ‘비어 있음’을 나타내는 데이터 타입입니다. 
그렇다면 `undefined`와 `null`의 차이점은 무엇일까요?

- `undefined` → **'변수가 정의되었으나 값이 할당되지 않음’** 상태입니다.
- `null` → **'비어있는 변수, 값이 존재하지 않음’** 을 의미합니다.

```js
let val1; //아무 것도 대입하지 않음
console.log(val1); // undefined
console.log(typeof val1); // undefined

let val2 = null; // null 대입
console.log(val2); // null
console.log(typeof val2); // object

val1 == val2 // true
val1 === val2 // false
```

두 변수의 값을 `==` 연산자로 비교햐면 `true`가 나오지만, 자료형까지 검사하는 `===` 연산자로 비교 시 `false`가 반환되는 것을 볼 수 있습니다.

#### Symbol

Symbol은 ECMA Script 6에서 등장한 새로운 데이터 타입입니다. 주로 충돌 위험이 없는 고유한 프로퍼티를 만들기 위해 사용합니다.
</br>
### 객체 타입(Object/Reference Type)

#### Object (객체)

자바스크립트에서 **기본 타입을 제외한 모든 값은 객체**로 취급됩니다. 따라서 배열이나 함수 등도 모두 객체로 표현됩니다.

주로 key-value 쌍의 데이터를 저장하며, **하나의 값만 저장되는 기본 데이터 타입과는 다르게 여러 개의 프로퍼티를 저장**할 수 있습니다.

이런 객체의 프로퍼티는 기본 데이터 타입의 값을 가지거나 다른 객체를 가리킬 수 있습니다.

```js
const obj = {
	foo: true,
	bar: 12345,
	baz: 'hello',
}

console.log(obj.foo, obj.bar, obj.baz) //true 12345 hello
```
</br>

# 변수

변수는 데이터를 저장할 때 쓰이는 **‘이름이 붙은 저장소’** 입니다.
변수의 선언은 `var`, `let`, `const`로 할 수 있으며, ES6에서 `const`와 `let`이 추가되었습니다.

#### var

- 변수를 선언하면 그 변수는 function level scope를 갖습니다.
- 변수를 선언. 추가로 동시에 값을 초기화합니다.
- **변수 재선언 가능, 재할당 가능**

#### let

- 변수를 선언하면 그 변수는 block level scope를 갖습니다.
- 변수를 선언. 추가로 동시에 값을 초기화합니다.
- **변수 재선언 불가능, 재할당 가능**

#### const

- 변수를 선언하면 그 변수는 block level scope를 갖습니다.
- `const`가 `let`과 다른 점이 있다면, 반드시 선언과 초기화를 동시에 진행해야 합니다.
- **변수 재선언 불가능, 재할당 불가능**