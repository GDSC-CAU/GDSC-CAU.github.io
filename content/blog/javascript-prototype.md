---
title: JavaScript 프로토타입
description: 자바스크립트의 프로토타입과 프로토타입 체이닝에 대해
slug: javascript-prototype
category: Front-End
author: Youngbeen Kim
featured: none
---


# JavaScript와 Prototype

자바스크립트는 프로토타입 언어이다. 자바스크립트에서 사용하는 프로토타입 개념이 무엇인지, 이를 통해서 어떻게 객체지향성을 보장하는지 등을 아래의 주제를 통해 알아보겠다. 

1. 객체의 __proto__와 prototype 프로퍼티의 차이
2. Prototype Chaining

## 객체의 __proto__와 prototype 프로퍼티의 차이

자바스크립트는 모든 것이 객체이다. 함수 역시 객체 형태로 존재한다. 하지만 함수는 자바스크립트에서 특별한 객체로 취급되며 다른 객체에는 없는 prototype 프로퍼티를 가진다.

```jsx
a = function foo() {
	console.log("foo");
};

b = {
	"name" : "foo"
};

dir(a);
dir(b);
```

a는 함수 객체가 저장되고 b에는 일반 객체가 저장된다. 객체의 모든 속성 값을 보여주는 dir 내장 함수를 통해 a와 b의 속성을 살펴보자. 

스크린샷에서 보이는 [[Prototype]] 프로퍼티가 제목에 있는 __proto__와 같은 프로퍼티이다. 해당 글에서는 [[Prototype]] 프로퍼티로 작성하면 Prototype 프로퍼티와 혼란이 있을 듯 하여 같은 의미를 가지는 __proto__를 사용했다.

**dir(a);**

![dir(a) 이미지](/javascript-prototype/01.png)

**dir(b);**

![dir(b) 이미지](/javascript-prototype/02.png)

실행 결과를 통해 알 수 있듯이 __proto__는 자바스크립트의 객체라면 모두가 가지고 있는 속성이고 prototype은 함수 객체만 가지고 있는 속성이다.

### 동작 예시

아래의 함수를 선언했다고 생각하자

```jsx
function Person(name, age, gender) {
	this.name = name;
	this.age = age;
	this.gender = gender;
}
```

우리는 Person 이라는 함수 객체를 만들었다. 이때 함수 객체가 만들어지면서 함수의 prototype 객체도 함께 만들어진다. 그리고 이 두 객체들은 서로를 참조한다. 아래의 그림을 보자.

![함수 객체와 함수 원형 객체](/javascript-prototype/03.png)

우리가 Person이라는 함수 객체(왼쪽)를 생성할 때 그 함수와 같은 이름을 가지는 객체(오른쪽)가 하나 만들어진다. 이때 Person(왼쪽) 함수 객체는 함수이기 때문에 __proto__와 prototype 프로퍼티를 가진다. Person이라는 이름의 객체(오른쪽)은 함수가 아니므로 __proto__프로퍼티를 가지고 특별히 함수 객체가 생성될 때 생긴 객체이기 때문에 constructor이라는 프로퍼티를 추가로 가진다.

이후에 Person 함수 객체(왼쪽)의 prototype 속성이 Person이라는 이름의 객체(오른쪽)을 가리키게 되고, Person이라는 이름의 객체(오른쪽)의 constructor 속성이 Person 함수 객체(왼쪽)을 가리키게 된다.

왼쪽의 함수 객체의 경우에는 함수이기 때문에 __proto__로 function object가 링크되고, 오른쪽의 객체는 객체이기 때문에 __proto__로 object가 링크된다.

이후에 Person이라는 함수가 new라는 키워드와 함께 실행되어 생성자로서 하나의 인스턴스를 생성했다고 가정하자. 그 상황은 아래와 같은 그림으로 나타낼 수 있다. 

![인스턴스 객체 생성](/javascript-prototype/04.png)

새로 생성된 인스턴스 역시 객체이기 때문에 내부에 __proto__라는 속성을 가진다. 이때 생성된 객체는 Person함수 객체를 통해서 만들어졌기 때문에 그 함수 객체의 prototype 속성을 가리키게 된다. 현재 Person 함수 객체의 Prototype 속성은 Person이라는 이름의 객체를 가리키고 있기 때문에, 새로 생성된 Person 인스턴스역시 Person이라는 이름의 객체를 가리키게 된다.

정리하자면 다음과 같다.

1. 자바스크립트에서 함수는 하나의 객체이지만 특수성이 있기 때문에 일반 객체와는 다르게 그 함수의 원형을 가리키는 prototype이라는 속성을 가지게 된다. 
2. 함수 객체가 생성되는 순간 그 함수 이름과 같은 이름을 가진 객체가 자동으로 생성되는데 이를 그 함수의 원형 객체라고 한다. (더 정확하게는 함수의 prototype 객체이다. 해당 글에서는 구분을 위해 함수의 원형 객체라고 표현하겠다)
3. 함수 객체의 prototype 프로퍼티가 함수 원형 객체를 가리키고, 함수 원형 객체의 constructor 프로퍼티가 함수 객체를 가리키게 된다.
4. 이 함수를 생성자로 새로운 인스턴스를 하나 만들게 되면, 해당 인스턴스의 __proto__프로퍼티는 생성자로 사용한 함수의 prototype 프로퍼티를 가리키게 된다. 함수의 prototype 프로퍼티는 위에서 설명한 함수 원형 객체를 가리키고 있으므로 새롭게 생성되는 인스턴스도 함수 원형 객체를 __proto__프로퍼티로 가진다.

이러한 특성이 자바스크립트에서 Prototype Chaining을 가능하게 한다.

## Prototype Chaining

자바스크립트에서 모든 객체는 자신을 생성한 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체(부모 객체)로 취급한다. 이때 특정 객체는 자신의 프로퍼티 뿐만 아니라 자신이 __proto__속성으로 가리키고 있는 함수 원형 객체의 프로퍼티 또한 자신의 것 처럼 접근할 수 있다.

**프로토타입 체이닝의 두 가지 경우의 수**

1. 객체 리터럴 방식으로 생성된 객체의 프로토타입 체이닝
    
    객체 리터럴 방식으로 생성한 객체는 Object()라는 내장 생성자 함수로 생성된 것이다.
    
    따라서 리터럴 방식으로 생성된 객체는 __proto__으로 Object 함수의 원형 객체를 가르키게 된다.
    
    **Object.prototype (Object 함수의 원형 객체)**
    
    - 프로토타입 체이닝의 종점이다. 어떤 프로토타입 객체가 __proto__에 연결되어 있더라도 결국 최종적으로 Object.prototype에서 체이닝이 끝나게 된다.

2. 생성자 함수로 생성된 객체의 프로토타입 체이닝

    생성자 함수로 생성된 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 함수 원형 객체를 가리킨다.
    

프로토타입 체이닝은 아래와 같은 형태로 일어난다.

```jsx
function Person(name) {
	this.name = name;
}

let foo1 = new Person("foo1");
let foo2 = new Person("foo2");

foo1.sayHello = function() {
	console.log("Hello");
}

foo1.sayHello(); //Hello
foo2.sayHello(); //Error -> foo2는 sayHello라는 메서드가 없기 때문
```

위의 예시에서 우리는 Person이라는 함수를 정의했다. 이 함수 객체가 생성됨과 동시에 같은 이름을 가진 함수의 원형 객체가 만들어지고 서로를 가리키게 된다.

foo1 과 foo2 객체 모두 Person 함수를 생성자로 하여 만들어진 인스턴스 객체이므로, 두 객체의 __proto__프로퍼티는 Person 함수의 원형 객체를 가리키게 된다.

이때 sayHello라는 메서드를 Person 객체의 인스턴스들에게 정의하기 위해서는 위와 같이 모든 인스턴스 객체에 sayHello 프로퍼티를 정의해야 할 것이다. 그렇게 된다면 위의 상황처럼 어떤 인스턴스 객체에는 실수로 sayHello 메서드를 정의하지 못해서 프로그램 에러가 발생할  수도 있다.

```jsx
function Person(name) {
	this.name = name;
}

let foo1 = new Person("foo1");
let foo2 = new Person("foo2");

//Person 함수의 prototype 속성이 링크하고 있는 Prototype 객체에 sayHello 메서드 추가
Person.prototype.sayHello = function() {
	console.log('Hello');
}

foo1.sayHello(); //Hello
foo2.sayHello(); //Hello
```

이때 Prototype Chaining 이 효과적이다. Person의 인스턴스 객체 하나하나에 sayHello 메서드를 추가하는 것이 아니라, Person 함수의 prototype, 즉 Person 함수의 원형 객체에 sayHello 메서드를 추가하면 된다. 이 경우에 foo1과 foo2 는 모두 sayHello라는 프로퍼티를 가지고 있지 않지만, Prototype Chaining이 발생하여 자바스크립트 실행 엔진은 두 객체가 가리키는 __proto__프로퍼티의 객체에 sayHello 메서드가 있는지를 살펴본다. 현재 두 객체가 가리키는 Person 함수의 원형 객체에는 sayHello 메서드가 존재하기 때문에 위의 코드는 오류를 발생하지 않고 원하는대로 동작한다.

```jsx
function Person(name) {
	this.name = name;
}

let foo1 = new Person("foo1");
let foo2 = new Person("foo2");

//Person 함수의 prototype 속성이 링크하고 있는 Prototype 객체에 sayHello 메서드 추가
Person.prototype.sayHello = function() {
	console.log('Hello');
}

foo1.toString();
```

그렇다면 위의 코드는 어떨까? Person의 인스턴스 객체와 Person 함수의 원형 객체에는 toString 메서드가 존재하지 않는다. 따라서 에러가 발생해야 할 것 같지만 위의 코드 역시 정상적으로 실행되고 종료된다. 자바스크립트 실행 엔진은 우선 foo1에 toString 메서드가 있는지 찾는다. foo1에는 toString 메서드가 없으므로 foo1의 __proto__프로퍼티가 가리키는 Person 함수의 원형 객체에 toString 메서드가 있는지 찾는다. Person의 원형 객체에도 toString 메서드가 없으므로 해당 객체의 __proto__프로퍼티가 가리키는 Object 함수의 원형 객체에 toString 메서드가 있는지 찾는다. Object 함수의 원형 객체에는 toString 메서드가 존재하기 때문에 그 메서드가 실행되게 된다.

자바스크립트는 위와 같은 방식으로 객체 지향 패러다임을 따른다.