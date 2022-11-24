---
title: Javascript 비동기 메커니즘 -1
description: 동기와 비동기에 대해 간략히 설명하고, 비동기 메커니즘 중 callback과 promise에 대해 다룹니다.
slug: javascript-study-asynchronous
category: Front-End
author: Eunseo Ko
---
# 동기와 비동기
비동기 메커니즘에 대해 알아보기 전에, 먼저 동기와 비동기에 대해 짚고 넘어가봅시다. ☺️

## 동기 (Synchronous)

기본적으로 동기적 코드는 **이전 작업이 완료되어야 다음 작업을 시작**할 수 있습니다.

```js
function expensiveOperation() {
  /* for문을 천만번 돌림 */
  let myDate;
  for (let i = 0; i < 10000000; i++) {
    let date = new Date();
    myDate = date;
  }

  console.log(myDate);

	/* 새로운 요소 p 추가 */
  let p = document.createElement('p');
  p.textContent('new paragraph');
  body.appendChild(p);
}
```

위의 예시의 경우 for문이 천만번 돌 때까지 우리는 그 다음 작업인 새로운 요소 p를 추가할 수 없습니다.

즉, 동기적코드는 **순차적**입니다. 그래서 직관적이고, 또 쉬워요! 하지만 효율성 면에서는 매우 좋지 않습니다. 아래의 예시도 한 번 살펴봅시다.

```js
function getData() {
	console.log('hi');
	fetch('https://blah');  // fetch API가 아닌 가상의 함수라고 가정하자!
	console.log('bye');
	// (다양한 연산들...)
}

function doManyThings() {
	getData();
	func1();
	func2();
	// (다양한 연산들..)
}

doManyThings();
```

`doManyThings()` 는 매우 많은 작업을 수행합니다. 제일 먼저 `getData()`함수를 호출하는데, 이 함수는 URL을 통해 외부에서 데이터를 가져오게 됩니다. 이때 `fetch()` 가 얼마나 걸릴지는 아무도 모릅니다. 만약 데이터가 매우 크다면? 또는 서버 위치가 물리적으로 멀다면 정말 오래걸릴 수도 있겠네요.

결국 우리는 얼마나 걸릴지도 모르는 fetch()를 위해 모든 작업을 멈추고 기다려야합니다. 우리는 이것을 **블로킹(blocking)** 이라고 합니다.

작업을 멈추고 다른 일을 병행하면 안되냐는 물음이 생긴다면, 적어도 위의 (동기적)코드에서는 불가능합니다. 자바스크립트는 싱글 스레드여서 한 번에 한가지 작업만 할 수 있기 때문입니다.

그렇다고 이전 작업이 끝날때까지 마냥 기다리기엔 상당한 시간 낭비가 발생하게 됩니다. 그래서 자바스크립트를 만드는 사람들은 **어떤 작업이 완료되지 않아도 다음 작업을 수행하는 방식을 고안**해냈습니다. 그것이 바로 **비동기**입니다!

## 비동기(Asynchronous)

다시 말하면, 비동기는 **이전 작업의 완료 여부와 관계 없이 다음 작업을 실행**합니다. 그러니까 아까의 상황에 빗대어보면, fetch() 함수가 완료될때까지 마냥 기다리는 것이 아니라, fetch()가 데이터를 가져오는 동안 자바스크립트는 다음 작업을 수행하는 것입니다.

분명 아까 전에 자바스크립트는 한 번에 한 가지 작업만 할 수 있는 싱글 스레드인데 이게 어떻게 가능할까요? 왜냐하면 자바스크립트가 직접 처리하는 것이 아니라, 자바스크립트를 구동하는 **런타임에서 이를 담당**하기 때문입니다.

- runtime이란
    
    **프로그래밍 언어가 구동되는 환경**으로,
    js 런타임의 종류로는 **웹 브라우저(크롬, 파이어폭스, 익스플로러)** 와 **Node.js**가 있습니다. 이러한 프로그램들에서 자바스크립트가 구동되기 때문에 이를 자바스크립트 런타임이라고 합니다.
    

브라우저에서 **자바스크립트 코드를 실행하는 것**은, **(=)브라우저에서 제공하는 자바스크립트 엔진으로 코드를 실행**한다는 것입니다. **엔진은 js코드를 순차적으로 실행하다가 비동기 작업을 만나면 Web API에게 작업을 넘겨줍니다**. Web API는 위임받은 해당 작업들을 처리하고, 해당 작업이 완료되면 그 결과물을 자바스크립트에 돌려주게 됩니다.

이렇게 되면 Web API가 비동기 작업을 수행하는 동안에는 자바스크립트는 다음 작업으로 넘어가 멈추지 않고 코드를 실행할 수 있습니다. 이렇게 브라우저의 런타임 환경에서 비동기 작업을 별도로 처리하는 것을 **논블로킹(Non-Blocking)** 이라고 합니다 !



# 비동기 메커니즘 (callback, Promise)
자 그럼, 비동기 메커니즘인 callback과 Promise에 대해 더 자세히 알아봅시다. 🤜🏻😎

## 비동기 콜백 (Async callback)

**콜백**은 자바스크립트에서 가장 오랜된 비동기 메커니즘입니다. **백그라운드 작업이 완료되면 호출되는 함수**로, 비동기 콜백과 동기 콜백 모두 존재합니다.

`setTimeout`도 콜백을 사용합니다. `setTimeout`은 두번째 인자로 주어진 n밀리세컨드만큼 기다린 후 첫 번째 인자로 주어진 함수를 실행합니다. 이 때 **첫 번째 인자로 주어진 함수가 바로 콜백함수**입니다. n밀리세컨드를 기다리는 작업(=백그라운드 작업)이 완료되면 첫번째 인자로 주어진 함수가 호출됩니다. 아래의 코드로 동기 콜백 및 비동기 콜백에 대해 이해해보아요 !

```js
// Synchronous callback
function printImmediately(print){
	print();
}

// Asynchronous callback
function printWithDelay(print,timeout){
	setTimeout(print, timeout);
}

// JavaScript is synchronous.
// Execute the code block by order after hoisting.
// hoisting: var, function declaration

console.log('1'); // 동기
setTimeout(() => console.log('2'),1000); // 비동기
console.log('3'); // 동기
printImmediately(() => console.log('hello')); // 동기
printWithDelay(() => console.log('async callback'),2000) // 비동기
```

 콜백의 약점으로는 **콜백 지옥(Callback Hell)** 이 있습니다.콜백 지옥을 체험해봅시다 ㅎㅎ 💩
    
  ```js
    class UserStorage {
    	loginUser(id, password, onSucess, onError){
    		setTimeout(()=>{
    			if(id === 'gdsc' && password === 'frontend'){
    				onSucess(id);
    			} else {
    				onError(new Error('not found'));
    			}
    		},2000);
    	}
    
    	getRoles(user, onSucess, onError) {
    		setTimeout(()=>{
    			if (user==='gdsc'){
    				onSuccess({name:'gdsc',role:'admin'});
    			} else {
    				onError(new Error('no access'));
    			}
    		},1000);
    	}
    }
    
    const userStorage = new UserStorage();
    const id = prompt('enter your id');
    const password = prompt('enter your password');
    userStorage.LoginUser(
    	id,
    	password,
    	user => {
    		userStorage.getRoles(
    			user,
    			userWithRole => { 
    				alert(`Hello $(userWithRole.name}, you have a ${userWithRole.role});
    			},
    			error => {
    				console.log(error);
    			}
    		};
    	},
    	error => {
    		console.log(error);
    	}
    );
  ```
    
  - 일단 읽기가 거북합니다 → 가독성 꽝!
  - 디버깅과 예외처리를 하기 복잡합니다 → 유지보수가 어렵습니다
    

## 프로미스 (Promise)

프로미스는 콜백을 보완하는 새로운 방식으로, 콜백을 사용해서 비동기 코드를 쉽게 컨트롤할 수 있습니다 

*'나 아직 해당 함수 처리 다 못했는데, 무언갈 반환할꺼야 (약속). 그러니까 기다리지 말고 다른 작업하고 있으면 내가 나중에 결과를 반환해줄게!'*

promise는 **상태(state)개념**과 **producer과 consumer의 개념**을 명확히 알고 있으면 좋습니다.

###  **[state]** 프로미스의 상태를 살펴보자.

- **pending :** 비동기 작업이 끝나지 않은 상태

- **resolved :** 비동기 작업이 끝난 상태

  - **fulfilled :** 비동기 작업이 ‘성공적으로’ 완료된 상태. 비동기 작업의 결과물이 promise 객체에 들어가 있다.
  - **rejected :** 비동기 작업이 ‘실패’한 상태. 비동기 작업이 실패한 원인을 담은 에러메시지가 들어가 있다.

---
### **[producer]** promise를 만들어보자.

```js
// promise is a JacaScript object for asynchronous operation
// state : pending -> fulfilled or rejected

// 1. Producer
// when new Promise is created, the excutor runs automatically!! 
const promise = new Promise((resolve,reject)=> {
	// doing some heavy work (network, read files)
	console.log('doing something...'); 
	setTimeout(()=>{
		resolve('gdsc-frontend')
		// resolve나 reject를 호출하지 않고 return을 하게 되면,
		// promise의 state가 계속 pending 상태임
	},2000);
});
```

promise란 객체는 excutor라는 콜백함수를 생성자로 가지고 있고, 이 콜백 함수에는 또 다른 resolve, reject 두 개의 콜백함수를 인자로 갖고 있습니다. 여기서 excutor가 제대로 실행된다면 resolve를, 실패한다면 reject를 호출합니다.

🚧❗️여기서 간과해서는 안되는것이, promise가 생성되었을 때, excutor가 자동으로 실행되므로 사용자가 요구했을 때만 비동기처리를 해야한다면, 위의 코드처럼 작성하면 안됩니다!

---
### **[consumer]** promise를 소비해보자.

**⇒ then**

```js
const promise = new Promise((resolve,reject)=> {
	// doing some heavy work (network, read files)
	console.log('doing somethine...); 
	setTimeout(()=>{
		resolve('gdsc-frontend')
	},2000);
});

promise.then((value) => { // 성공한 케이스
	console.log(value); 
})
// 출력
// gdsc-frontend
```

then은 프로미스 객체가 성공적으로 끝났을 때 실행할 콜백함수를 인자로 받습니다.
promise가 잘 수행되어 resolve라는 콜백함수를 통해서 전달한 값이 value의 파라미터로 전달되어 출력되는 것을 볼 수 있습니다.

**⇒ catch**

```js
const promise = new Promise((resolve,reject)=> {
	// doing some heavy work (network, read files)
	console.log('doing somethine...); 
	setTimeout(()=>{
		reject(new Error('no network')
	},2000);
});

promise
	.then(value => {
		console.log(value); 
	.catch(error => {
		console.log(error);
});
```

(여러개의) then()블럭 중 하나가 프로미스 객체가 rejected 상태가 되면 catch가 동작합니다. 보통 then() 구문의 맨 뒤에 붙이고 우리가 익히 아는 try…catch 구문과 비슷하게 동작합니다. (그러나 try…catch는 프로미스와 함께 동작할 수 없습니다)

then은 결국 promise를 리턴하기 때문에, 리턴된 promise의 catch를 다시 호출할 수 있습니다. (=체이닝) 

**⇒ finally**

```js
const promise = new Promise((resolve,reject)=> {
	// doing some heavy work (network, read files)
	console.log('doing somethine...); 
	setTimeout(()=>{
		reject(new Error('no network')
	},2000);
});

promise
	.then(value => {
		console.log(value); 
	.catch(error => {
		console.log(error);
	.finally(()=>{
		console.log('마침내.');
});
```

성공/실패와 상관없이 프로미스가 완료된 후 특정 기능을 마지막으로 수행하고 싶을 때 finally를 사용합니다.

---
### **[Promise chaining]** promise를 연결해보자

```js
const fetchNumber = new Promise((resolve, reject)=>{
	setTimeout(()=> resolve(1),1000);
});

fetchNumber
.then(num=>num*2)
.then(num=>num*3)
.then(num=>{
	return new Promise((resolve, reject)=>{
		setTimeout(()=>resolve(num-1),1000);
	});
.then(num=>console.log(num));
})
// 출력
// 5
```
---


### **[callback hell → promise]** promise를 사용해 콜백지옥에서 벗어나볼까요?!

```js
class UserStorage {
	loginUser(id, password{
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				if(id === 'gdsc' && password === 'frontend'){
					resolve(id);
				} else {
					reject(new Error('not found'));
				}
			},2000);
	}

	getRoles(user) {
		return new Promise((resolve, reject) => {
			setTimeout(()=>{
				if (user==='gdsc'){
					resolve({name:'gdsc',role:'frontend''});
				} else {
					reject(new Error('no access'));
				}
			},1000);
	}
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

userStorage
.loginUser(id,password)
.then(userStorage.getRoles)
.then(user=>alert(`Hello $(user.name}, you have a ${user.role}`);
.catch(console.log);
```
