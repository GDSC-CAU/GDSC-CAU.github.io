---
title: JavaScript 함수
description: 자바스크립트 함수 정의, 함수 객체, 함수의 다양한 형태, 함수 호출과 this 바인딩, 함수의 return
slug: javascript-function
category: Front-End
author: Youngbeen Kim
featured: none
---

# 자바스크립트 함수

오늘은 자바스크립트의 함수에 대해 다뤄보려 한다. 다룰 내용은 다음과 같다.

1. 함수 정의, 함수 객체, 함수의 다양한 형태
2. 함수 호출과 this 바인딩
3. 함수의 return

## 함수 정의, 함수 객체, 함수의 다양한 형태

### 함수 선언의 종류

1. 함수 선언식
2. 함수 표현식
3. Function() 생성자 함수
4. Arrow 함수

**함수 선언식 (함수 리터럴)**

```jsx
function add(x, y) {
	return x + y;
}
```

- 함수 선언식에서는 함수 호이스팅이 적용된다.
- 세미콜론을 사용하지 않는게 컨벤션 이지만 사용해도 문제없이 동작한다.
    
    

**함수 표현식**

```jsx
var add = function(x, y) {
	return x + y;
};

//함수에 이름을 붙쳐서 사용해도 됨. 하지만 이때 사용되는 함수 이름은 함수 밖에서 호출 불가. 함수 내에서만 호출이 가능함
var add = function sum(x, y) {
	
	return x + y;
};

add(3, 4) --> 가능
sum(3, 4) --> 불가능 (x)

//함수 내부에서 재귀로 사용 가능
var facto = function factorial(n) {
		if (n <= 1) {
			return 1;
		}
		return n * factorail(n - 1);
}
```

- 위의 코드에서 add는 함수 객체를 가리키는 변수이다. 함수가 저장된 주소가 add 변수에 저장된다. 이렇게 함수 객체를 하나의 변수에 할당하는 것을 함수 표현식이라고 한다.
- 함수 호이스팅이 적용되지 않는다.
- 세미콜론을 사용하는게 컨벤션이고 사용하지 않는 경우에 문제가 발생할 수 있다.
    
    

**Function() 생성자 함수**

```jsx
var add = new Function('x', 'y', 'return x + y');
```

- 함수 호이스팅이 적용되지 않는다.
- 세미콜론을 사용하는게 컨벤션이고 사용하지 않는 경우에 문제가 발생할 수 있다.
- 잘 사용되진 않는다.
    
    

**Arrow 함수**

```jsx
var add = (x, y) => {
	return x + y;
};

console.log(add(2, 3)) // 5
```

- function 키워드 대신 ⇒ (arrow)를 사용한다.

### 자바스크립트 함수의 특징

자바스크립트에서 함수도 객체이다. 즉 함수도 객체처럼 프로펄티를 가질 수 있다. 

**자바스크립트 함수의 특징**

1. 리터럴에 의해 생성될 수 있다.
2. 변수나 배열의 요소, 객체의 프로퍼티 등에 할당 가능하다.
3. 함수의 인자로 전달 가능하다.
4. 함수의 리턴값으로 리턴 가능하다.
5. 동적으로 프로퍼티를 생성 및 할당 가능하다.

**함수 객체의 기본 프로퍼티 및 설명**

- name : 함수의 이름
- caller : 자신을 호출한 함수
- arguments : 함수를 호출할 때 전달된 인자값
- __proto__ : 객체가 자신의 프로토타입을 가리키는 것
- length : 함수가 정상적으로 실행될 때 기대되는 인자의 수
- prototype : 모든 함수는 객체로서 prototype 프로퍼티를 가지고 있음

예시)

```jsx
function add(x, y) {
	return x + y;
}

dir(add);
`
arguments: null
caller: null
length: 2
name: "add"
prototype: {constructor: ƒ}
`
```

**arguments 프로퍼티**

함수가 실행될 때 인자로 전달되는 값들이 모여있는 프로퍼티이며 인자의 수를 맞추지 않더라도 에러가 발생하지 않는다. 유사배열 객체이다.

```jsx
function func(a, b) {
		console.log(a, b);
}

func(1, 2, 3); // 1 2
func(1, 2); // 1 2
func(1); // 1 undefined
```

- 넘치는 인자는 사라진다.
- 부족한 인자는 undefined 상태로 남아있다.

**prototype  프로퍼티**

자바스크립트는 함수가 정의될 때 내부적으로 수행되는 작업이 있다. 함수의 프로퍼티 중 prototype 속성이 있는데, 이 속성은 다른 곳에 생성된 함수 이름의 프로토타입 객체를 참조한다. 

그 프로토타입 객체에는 constructor속성이 있는데, 이 속성은 정의된 함수를 참조하는 내부 구조를 가진다.

**함수의 prototype 와 __proto__ 의 차이**

__proto__

1. 모든 객체가 가지고 있다.
2. 하나의 ***Link*** 라고 할 수 있다.

prototype

1. 함수 객체만 가지고 있다.
2. 생성자를 가지는 원형으로 선언 할 수 있다.

자세한 내용은 다음 게시글에서 다룰 예정이다.

### 함수의 다양한 형태

1. 콜백 함수
2. 즉시 실행 함수
3. 내부 함수
4. 함수를 리턴하는 함수

**콜백 함수**

코드를 통해 명시적으로 호출하는 함수가 아니라, 개발자는 단지 함수를 등록하고, 어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출되는 함수를 말한다.

대표적인 예시 : 이벤트 핸들러

```jsx
window.onload = function () {
	alert('콜백 함수입니다.');
};
```

**즉시 실행 함수**

함수를 정의함과 동시에 바로 실행하는 함수를 말한다.

대표적인 예시 : 자바스크립트 라이브러리 코드

```jsx
//일반적인 함수
var name = function (name) {
	console.log('This is the immediate function -> ' + name);
}

name('hello'); //This is the immediate function hello
```

```jsx
//즉시 실행 함수로 바꾼 것
(function (name) {
	console.log('This is the immediate function -> ' + name);
})('hello'); //This is the immediate function hello
```

함수가 선언되자마자 실행되게 만든 즉시 실행 함수는, 같은 함수를 다시 호출할 수 없다. 따라서 최초 한 번의 실행만을 필요로 하는 초기화 코드 부분 등에 사용할 수 있다.

자바스크립트의 변수 유효 범위 특성으로 인해서 자바스크립트 라이브러리나 프레임워크 소스들에서 즉시 실행 함수가 주로 사용된다. 자바스크립트는 함수 유효 범위를 가지므로 변수를 선언할 경우 프로그램 전체에서 접근할 수 있다. 그러나 함수 내부에서 정의된 변수들은 함수 코드 내부에서만 유효할 뿐 함수 밖에서는 유효하지 않다. 따라서 라이브러리 코드를 이렇게 즉시 실행 함수 내부에 정의한다면, 라이브러리 내의 변수들은 함수 외부에서 접근할 수 없다. 이는 라이브러리 간 변수 이름 충돌 같은 문제를 방지할 수 있다.

**내부 함수**

함수 내부에 정의된 함수를 말한다.

대표적인 예시 : 클로저, 부모 함수에서 외부에서의 접근을 막고 독립적인 헬퍼 함수를 구현하는 용도로 사용

1. 내부 함수에서는 자신을 둘러싼 부모 함수의 변수에 접근이 가능하다. (**스코프 체이닝**)
2. 내부 함수는 일반적으로 자신이 정의된 부모 함수 내부에서만 호출이 가능하다.

```jsx
function outerFunc() {
		function innerFunc() {
			console.log("inner Func")
		}

		innerFunc(); //inner Func
}
```

**함수를 리턴하는 함수**

```jsx
var self = function() {
	console.log('a');
	
	return function () {
		console.log('b');
	}
}

self = self(); // a
self(); // b
```

## 함수 호출과 this 바인딩

### this 바인딩

- 자바스크립트의 여러 가지 함수가 호출되는 방식과 패턴에 따라서 **this**가 다른 객체를 참조한다.
- 종류
    - 객체의 메서드 호출할 때 this 바인딩
    - 함수를 호출할 때 this 바인딩
    - 생성자 함수를 호출할 때 this 바인딩
    - call과 apply 메서드를 이용한 명시적인 this 바인딩

1. 객체의 메서드를 호출할 때 this 바인딩
    
    객체의 메서드 : 객체의 프로퍼티 중 함수인 것을 메서드라고 부른다.
    
    - 메서드의 내부 코드에서 this 가 사용되면 해당 메서드를 호출한 객체로 바인딩 된다.
    
    ```jsx
    var myObject = {
    	name: 'foo',
    	sayName: function (
    		console.log(this.name);
    	}
    }
    
    var otherObject = {
    	name: 'other'
    }
    
    otherObject.sayName = myObject.sayName
    
    myObject.sayName(); //foo
    otherObject.sayName(); //other
    ```
    
2. 함수를 호출할 때 this 바인딩
    
    함수 내부 코드에서 사용된 this는 전역 객체에 바인딩 된다. **내부 함수를 호출했을 경우에도 그대로 적용된다는 것을 주의하자.**
    
    ```jsx
    var value = 100;
    
    var myObject = {
    	value : 1
    	func1 : function () {
    		this.value += 1;
    		console.log('func1() called. this.value : ' + this.value);
    
    		func2 = function () {
    			this.value += 1;
    			console.log('func2() called. this.value : ' + this.value);
    
    			func3 = function () {
    				this.value += 1;
    				console.log('func3() called. this.value : ' + this.value);
    			}
    			func3();
    		}
    		func2();
    	}
    };
    
    myObject.func1();
    ```
    
    ```jsx
    //예상 결과
    func1() called - this.value : 2
    func2() called - this.value : 3
    func3() called - this.value : 4
    
    //실제 결과
    func1() called - this.value : 2
    func2() called - this.value : 101
    func3() called - this.value : 102
    ```
    
    즉 메서드 내의 내부 함수를 호출할 경우에도, 일반적인 함수의 호출로 자바스크립트는 인식한다. 따라서 내부 함수를 호출 할 때 this가 전역 객체로 바인딩 되면서 전역 객체에 있는 value인 100을 조작하게 된다. 따라서 101과 102가 출력된다.
    
    **해결 방법**
    
    내부 함수의 this 가 전역 객체에 바인딩 되는 한계점을 극복하기 위해서는 부모 함수의 this를 내부 함수가 접근 가능한 다른 변수에 저장하는 방법이 사용된다. 주로 that이라는 키워드를 사용하는 것이 컨벤션이다. 내부 함수는 자신을 둘러싼 부모 함수의 변수에 접근이 가능하다는 점을 이용한다.
    
    ```jsx
    var value = 100;
    
    var myObject = {
    	value : 1
    	func1 : function () {
    		var that = this;
    
    		this.value += 1;
    		console.log('func1() called. this.value : ' + this.value);
    
    		func2 = function () {
    			that.value += 1;
    			console.log('func2() called. this.value : ' + that.value);
    
    			func3 = function () {
    				that.value += 1;
    				console.log('func3() called. this.value : ' + that.value);
    			}
    			func3();
    		}
    		func2();
    	}
    };
    
    myObject.func1();
    ```
    
3. **생성자 함수를 호출할 때 this 바인딩**
    
    생성되는 객체에 this가 바인딩 된다.
    
    ```jsx
    var foo = {
    		name: 'foo',
    		age: 35,
    		gender: 'man',
    };
    console.dir(foo);
    
    function Person(name, age, gender, position) {
    		this.name = name
    		this.age = age
    		this.gender = gender
    		this.position = position
    }
    
    var bar = new Person('bar', 33, 'woman');
    console.dir(bar);
    
    var baz = new Person('baz', 32, 'man');
    console.dir(baz);
    ```
    
    **일반 함수 vs 생성자 함수 차이**
    
    자바스크립트에는 일반 함수와 생성자 함수의 차이가 따로 없다. 따라서 규칙을 지켜서 사용해야 한다.
    
    - 선언
        - 일반 함수 : 소문자 or 익명함수도 가능
        - 생상자 함수 : 대문자, new 키워드 항상 사용
    - 반환 값
        - 일반 함수 : return이 명시되어 있지 않다면 undefined
        - 생성자 함수 : return이 명시되어 있지 않다면 생성한 객체 그 자체
    - this 바인딩
        - 일반 함수 : 전역 객체에 바인딩 됨
        - 생성자 함수 : 생성되는 객체 자체에 바인딩 됨
        
        ```jsx
        function Person(name, age, gender, position) {
        		this.name = name
        		this.age = age
        		this.gender = gender
        		this.position = position
        }
        
        //잘못 사용한 예시
        var qux = Person('qux', 20, 'man');
        console.log(qux); //undefined
        
        console.log(window.name); //qux
        console.log(window.age); //20
        console.log(window.gender); //man
        ```
        
        Person 생성자가 실행될 때 new 키워드가 없으므로 일반적인 자바스크립트의 함수처럼 this가 바인딩 된다. 따라서 Person 함수 내부의 this는 전역 객체를 가르키게 되고 (window), 전역 객체에 name, age, gender라는 새로운 프로퍼티가 추가되는 결과가 나온다. 이때 일반 함수에 별다른 return이 없다면 undefined를 return하므로 qux에는 undefined가 할당된다.
        
        이런 문제를 해결하기 위해서 강제로 인스턴스를 생성하여 사용하기도 한다.
        
        ```jsx
        fucntion Person(name, age, gender, position) {
        		if (!(this instanceof Person))
        		//if (!(this instance of arguments.callee)
        				return new Person(name, age, gender, position);
        		
        		this.name = name;
        		this.age = age;
        		this.gender = gender;
        		this.position = position;
        }
        
        var a = new Person('hi', 10, 'man');
        var b = Person('bye', 20, 'woman');
        
        console.log(a);
        console.log(b);
        
        console.dir(a);
        console.dir(b);
        ```
        

1. **Call 과 Apply 메서드를 이용한 명시적인 this 바인딩**
    
    Call 과 Apply는 명시적으로 어떤 객체를 함수 내부의 this에 바인딩 할지를 정해준다.
    
    ```jsx
    function Person(name, age, gender) {
    	this.name = name;
    	this.age = age;
    	this.gender = gender;
    }
    
    //리터럴한 빈 객체를 선언한다.
    var foo = {}
    
    Person.apply(foo, ['foo', '30', 'gender']);
    // Person.call(foo, 'foo', '30', 'gender');
    
    //생성자 함수로 선언했을 떄와는 다른 결과이다. foo 는 프로토타입 속성으로 Person이 아닌 Object를 가진다.
    console.log(foo);
    console.dir(foo);
    ```
    
    apply와 call의 차이는 인자를 배열로 한개를 넘기는 지 혹은 각 인자들을 하나씩 넘기는지의 차이이다.
    
    ```jsx
    //활용 예시
    
    function myFunction() {
    	
    	console.dir(arguments);
    
    	//arguments.shift(); 에러 발생
    
    	var args = Array.prototype.slice.apply(arguments);
    	console.dir(args);
    
    }
    myFuction(1, 2, 3);
    ```
    

## 함수의 return

자바스크립트의 함수는 항상 리턴값을 반환한다.

### return의 규칙

1. 일반 함수나 메서드는 리턴값을 지정하지 않을 경우, undefined 값이 리턴된다.
2. 생성자 함수에서 리턴값을 지정하지 않을 경우 생성된 객체가 리턴된다.
3. 생성자 함수에서 리턴값을 지정하는 경우에는 두 가지 경우의 수가 있다.

**생성자 함수에서 리턴값을 지정하지 않을 경우에는 생성된 객체가 리턴된다.**

```jsx
function Person(name, age, gender) {
	this.name = name;
	this.age = age;
	this.gender = gender;
}

var a = new Person('yb', 25, 'man');
console.log(a) // 새로 생긴 Person 객체가 잘 출력된다.
```

**생성자 함수에서 리턴값을 지정하는 경우에는 두 가지 경우의 수가 있다.**

1. 기본 자료형을 리턴하는 경우 : 리턴값은 무시되고 생성된 객체가 출력된다.
    
    ```jsx
    function Person(name, age, gender) {
    	this.name = name;
    	this.age = age;
    	this.gender = gender;
    
    	return 1
    }
    
    var a = new Person('yb', 25, 'man');
    console.log(a) // 새로 생긴 Person 객체가 잘 출력된다.
    ```
    
2. 참조 자료형을 리턴하는 경우 : 리턴값이 출력된다.
    
    ```jsx
    function Person(name, age, gender) {
    	this.name = name;
    	this.age = age;
    	this.gender = gender;
    
    	return {name: 'car', age: 24, gender: 'woman'};
    }
    
    var a = new Person('yb', 25, 'man');
    console.log(a) // 새로 생긴 Person 객체가 잘 출력된다.
    ```