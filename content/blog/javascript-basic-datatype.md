---
title: JavaScript Basic
description: 자바스크립트 데이터 타입
slug: javascript-basic-datatype
category: Front-End
author: Youngbeen Kim
featured: none
---

최근 웹에 관심을 가지게 되면서 웹 개발을 하기 위해 어떤 공부를 해야하는지 찾아보게 되었다. 웹 개발은 크게 프론트엔드와 백엔드로 구분되고 각 분야에 특화된 프레임워크들이 존재했다. 백엔드에서는 Node.js를 활용한 Express 가 주로 사용되는 듯 했고, 프론트엔드는 React나 Vue를 많이 사용하는 듯 했다.

백엔드와 프론트엔드 중 무엇을 먼저 공부할지 결정하기 전에, 두 파트에서 공통으로 사용되는 자바스크립트라는 언어를 먼저 공부하기로 했다.


## 자바스크립트 데이터 타입

### 자바스크립트 특징

- 동적 타이핑 언어
- 느슨한 타입 체크 언어

### 데이터 타입

1. 기본 타입
    1. Number
    2. String
    3. Boolean
    4. Null
    5. Undefined
2. 참조 타입
    1. 기본 타입을 제외한 모든 객체
    

**Number**

- 자바스크립트에서 모든 숫자는 Number Type
- 다른 언어가 Integer, Float, 등으로 구분되어 있는 것과 다름

**String**

- 한 번 선언된 문자열은 수정되지 않음
- 다른 언어의 char은 자바스크립트에선 길이가 1인 String 과 같음

**Boolean**

- True, False 값

**Null & Undefined** 

- 두 타입 모두 값이 비어 있음을 나타냄. 사용하는 의도에 차이가 있음
- Null → 개발자가 의도적으로 값을 비워 둠. Null의 타입은 Object
- Undefined → 기본적으로 값이 할당되지 않음. Undefined는 타입이자 값

```jsx
let nullVar = null;
let undefinedVar;

console.log(typeof nullVar); // object
console.log(nullVar); // null

console.log(typeof undefinedVar); // undefined
console.log(undefinedVar); // undefined

// 해당 값이 null 값인지 판단하기
console.log(typeof nullVar === null); // false
console.log(nullVar === null); // true
```

### 참조 타입

참조 타입은 자바스크립트의 기본 타입을 제외한 모든 것이며 객체 타입이라고도 불림

**객체를 생성하는 방법**

1. 기본 제공 Object() 생성자 함수를 이용하는 방법
    
    ```jsx
    let foo = new Object();
    
    foo.name = 'foo';
    foo.age = 30;
    foo.gender = 'male';
    
    console.log(typeof(foo)); //object
    ```
    
2. 객체 리터럴을 이용하는 방법
    
    ```jsx
    let foo = {
    	name : 'foo',
    	age : 30,
    	gender : 'male',
    }
    
    console.log(typeof(foo)); //object
    ```
    
3. 생성자 함수를 이용하는 방법
    
    ```jsx
    function Person(name, age, gender) {
    
    	if (!(this instanceof arguments.callee)){
    		return new Person(name, age, gender);	
    	}
    
    	this.name = name;
    	this.age = age;
    	this.gender = gender;
    
    }
    
    //이때 무조건 new를 사용해야 함
    let foo = new Person('foo', 30, 'male');
    console.log(foo); //Person
    ```
    

**객체 프로퍼티**

- 모든 객체는 프로퍼티가 존재함. 프로퍼티는 그 객체가 가지는 속성을 의미하고 key, value 쌍으로 구성됨
- 객체 프로퍼티는 조회, 수정, 삭제, 삽입이 가능함
    
    ```jsx
    //삽입
    obj['key'] = value;
    
    //조회
    obj.key;
    
    //수정
    obj.key = newValue;
    
    //삭제
    delete obj.key;
    ```
    

- 이때, 객체 프로퍼티를 삭제할 때 사용한 delete 는 객체의 프로퍼티를 삭제하지만 객체 자체를 삭제할 때에는 사용할 수 없음
    
    ```jsx
    //obj 객체의 key 프로퍼티를 삭제함
    delete obj.key;
    
    //obj 객체는 삭제되지 않음
    delete obj;
    ```
    

**객체 프로토타입**

- 자바스크립트의 모든 객체가 가지고 있는 프로퍼티
- 모든 객체는 자신의 부모 역할을 하는 객체와 연결되어 있고 이를 이용하여 부모 객체의 프로퍼티를 사용할 수 있음
- 프로토타입은 객체가 생성될 때 할당되며 동적으로 변동이 가능함

### 배열

**자바스크립트의 배열 특징**

- 내부의 데이터 타입이 서로 다를 수 있음
- 크기가 동적으로 변경될 수 있음
- length 프로퍼티 : 배열의 길이를 나타내고 배열 내의 가장 큰 인덱스에 1을 더한 값 (0부터 인덱싱 하므로)

**생성**

```jsx
//생성 방식
let arr1 = []
let arr2 = new Array()

//생성할 때 값을 순차적으로 넣을 필요가 없고 동적으로 아무 인덱스에 추가할 수 있음

let emptyArr = [];
console.log(emptyArr[0]) //undefined

emptyArr[0] = 100;
emptyArr[3] = 'eight';

console.log(emptyArr) //[100, undefined x 2, 'eight']
// 위의 예시처럼 배열의 0, 3에 값을 할당하게 되면, 값이 할당되지 않은 1, 2번째에는 undefined가 할당됨
```

**삭제**

```jsx
//배열의 value만 삭제하고 공간은 남겨두고 싶을 경우 -> delete
//배열의 value와 공간을 모두 삭제하고 싶을 경우 -> splice

let arr = ['zero', 'one', 'two', 'three'];
arr.splice(2, 1);
console.log(arr); //['zero', 'one', 'three'];

delete arr[1];
console.log(arr); //['zero', undefined x 1, 'three'];
```

### 유사 배열 객체

- 일반 객체에 length 프로퍼티가 존재하는 것. 대표적인 예시로 함수의 인자들이 전달되는 arguments 객체가 유사 배열 객체이다.
- 유사 배열 객체는 배열이 아님에도 불구하고 자바스크립트의 표준 배열 메서드를 사용하는 게 가능하다.
- Array.prototype.[메서드].apply(객체, [인자, 인자])
- Array.prototype.[메서드].call(객체, 인자, 인자)
    
    ```jsx
    let arr = ['bar']; // 배열
    let obj = {name : 'foo', length : 1}; // 유사배열
    
    arr.push('baz');
    console.log(arr); // 출력값 : ['bar', 'baz']
    
    Array.prototype.push.apply(obj, ['baz']);
    console.log(obj); // 출력값 : {'1' : 'baz', name: 'foo', length: 2}
    ```
    

### 데이터 타입 주의할 점

```jsx
console.log(!!{}) // true
//객체는 값이 비어있더라도 true로 변환됨. 참조형이기 때문
```