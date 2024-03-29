---
title: Javascript 가비지 컬렉션
description: 가비지컬렌션의 전반적인 개념에 대한 설명입니다.
slug: javascript-deep_study-gabage_collection
category: Front-End
author: Eunseo Ko
---

# 가비지 컬렉션 톺아보기

## 가비지 컬렉션(GC)

먼저, 아주 간단히 핵심만 말해보자면 **자바스크립트는 객체가 생성되었을 때 자동으로 메모리를 할당하고 쓸모 없어졌을 때 자동으로 해제**하는 기능이 있는데요. 이러한 기능을 **가비지 컬렉션**이라고 합니다 😎

그럼 먼저 메모리에 대해 한 번 짚어볼까요? 우선 **메모리 생존 주기**는 어떤 프로그래밍 언어든 관계 없이 아래와 같이 이루어져요.

1. 필요할 때 메모리를 할당
2. 할당된 메모리를 사용 (읽기/쓰기 등)
3. 더 이상 필요하지 않으면 메모리를 해제

여기서 메모리 사용(2번)은 개발자가 직접 코드를 짜면서 건드리기 때문에 명시적으로 사용됩니다. 그렇지만 메모리를 해제할 때(3번)는 자바스크립트가 자동으로(암묵적으로) 메모리를 해제하게 됩니다.

그렇다면 더 이상 필요하지 않은 객체들을 어떻게 자동으로 처리할 수 있는 것일까요? 

바로 **자바스크립트 엔진 내의 가비지 컬렉터에서 메모리 관리를 수행**하기 때문입니다! 엔진 내에선 가비지 컬렉터가 끊임없이 동작하기 때문에 모든 객체를 모니터링 할 수 있는 것이죠.

- 잠깐, 엔진이란? 🤔
    - 브라우저에는 자바스크립트 가상 머신이라 불리는 **엔진이 내장(=내장 엔진)** 되어 있습니다.
    - 엔진의 종류
        - **V8 - Chrome과 Opera**
        - SpiderMonkey - Firefox
    - 엔진 동작 과정
        1. 엔진(브라우저의 경우 내장 엔진)이 스크립트를 읽고, (파싱)
        2. 읽어 들인 스크립트를 기계어로 전환하여, (컴파일)
        3. 기계어로 전환된 코드가 실행됩니다!
    - 특징
        - 엔진은 프로세스 각 단계마다 최적화를 진행합니다.
        - 심지어 컴파일이 끝나고 실행 중인 코드를 감시하면서, 이 코드로 흘러가는 데이터를 분석하고, 분석 결과를 토대로 기계어로 전환된 코드를 다시 최적화하는 과정을 거칩니다. ⇒ 스크립트 실행 속도가 더욱 빨라집니다.

아래에서 가비지 컬렉션(터)에 대해 더 자세히 알아보아요. 😎

---

## 가비지 컬렉션 기준

계속 말했지만, 자바스크립트에서는 가비지 컬렉터에 의해 메모리를 자동으로 관리해줍니다.그렇다면 가비지 컬렉션은 할당된 메모리 블록이 더 이상 필요하지 않은지 어떻게 판단할 수 있는 걸까요? 

자바스크립트는 메모리 관리를 수행할 때  **도달 가능성(reachability)** 이라는 개념을 사용합니다. 도달 가능한 값은 메모리에서 절대 삭제되지 않습니다.

- **도달 가능성(reachability)**
    - 어떻게든 접근하거나 사용할 수 있는 값
    - 도달 가능한 값은 메모리에서 삭제 되지 않음

- **도달 가능한 값**
    1. **태생부터 도달 가능한 값 ⇒ `root` 라고 부름**
        - 전역 변수 등
        - 현재 함수의 지역 변수와 매개변수
        - 중첩 함수의 체인에 있는 함수에서 사용 되는 변수와 매개변수
    2. **`root`가 참조하는 값이나 체이닝으로 루트에서 참조할 수 있는 값**
    
    > 예를 들어 전역 변수에 객체가 저장되어 있다고 가정했을 때, 이 객체의 프로퍼티가 또 다른 객체를 참조하고 있다면 프로퍼티가 참조하는 객체는 도달 가능한 값이 됩니다






 
다양한 예시들을 통해 개념들을 다시 한 번 짚어봅시다 ! 🤜🏻
## 예시1 - 간단한 예시

```js
// user엔 객체 참조 값이 저장됨
let user = {
	name: "John"
};
```

![1](/javascript-deep_study-gabage_collection/1.png)

- 왼쪽의 그림에서 화살표는 객체 참조를 나타냅니다.
- 그림을 해석하면, 전역 변수 `user` 는 `{name:”John”}` 이라는 객체를 참조하고 있습니다.
- John의 프로퍼티인 `name` 은 원시값을 저장하고 있기 때문에 객체 안에 표현합니다.

만약 이 상태에서 user의 값을 다른 값으로 덮어쓰면 참조(화살표)가 사라지게 됩니다.

```js
user = null;
```

![2](/javascript-deep_study-gabage_collection/2.png)

- 왼쪽의 그림과 같이 이제 John은 도달할 수 없는 상태가 됩니다.
- John에 접근할 방법도, John을 참조하는 것도 모두 사라집니다.

## 예시2 - 참조가 두 개

```js
// user엔 객체 참조 값이 저장
let user = {
	name: "John"
};

let admin = user;
```

![3](/javascript-deep_study-gabage_collection/3.png)

```js
user = null;
```

- 위 코드처럼 user를 null값으로 덮어쓰더라도, 전역 변수 admin을 통하면 여전히 객체 John에 접근할 수 있기 때문에 John은 메모리에서 삭제되지 않습니다.
- 만약 `admin`도 다른 값(null 등)으로 덮어쓰게 된다면 John은 메모리에서 삭제 될 수 있습니다.

## 예시3 - 연결된 객체

```js
function marry(man, woman) {
	woman.husband = man;
	man.wife = woman;

	return {
		father: man,
		mother: woman
	}
}

let family = marry(
	{name:"John"},{name:"Ann"}
);
```

- 함수 marry는 매개변수로 받은 두 객체를 서로 참조하게 하고 있습니다.
- 또한, 두 객체를 포함하는 새로운 객체를 반환합니다.
- 메모리 구조는 아래의 그림과 같습니다.

![4](/javascript-deep_study-gabage_collection/4.png)

```js
delete family.father;
delete family.mother.husband;
```

![5](/javascript-deep_study-gabage_collection/5.png)

- 참조 두 개를 지움으로써 John으로 들어오는 참조(화살표)가 모두 사라집니다.
- 즉, John은 도달 가능한 상태에서 벗어납니다.

![6](/javascript-deep_study-gabage_collection/6.png)

- 외부로 나가는 참조는 도달 가능한 상태에 영향을 주지 않습니다.
- 이제 John은 도달 가능한 상태가 아니기 때문에 메모리에서 제거되며, John에 저장된 데이터(프로퍼티) 역시 메모리에서 사라집니다.
- 가비지 컬렉션 후 최종 메모리 구조는 아래와 같습니다.
    
    ![7](/javascript-deep_study-gabage_collection/7.png)
    

⇒ 사실 Reference-counting 알고리즘에 따르면, 함수 내에서 두 객체가 서로를 참조하는 **순환 참조**는 객체가 여전히 서로를 참조하고 있기 때문에 가비지 컬렉팅되지 않습니다.(= **메모리 누수 발생!**) 하지만 이는 Mark-and-Sweep 알고리즘에 의해 보완됩니다. ( 이후 가비지컬렉션 알고리즘 파트에서 더 자세히 설명하겠습니다 :))

## 예시4 - 도달할 수 없는 섬

- 객체들이 연결되어 섬 같은 구조를 만드는데, 이 섬에 도달할 방법이 없는 경우, 섬을 구성하는 객체 **전부**가 메모리에서 삭제됩니다.

```js
family = null;
```

![8](/javascript-deep_study-gabage_collection/8.png)

- John과 Ann은 여전히 서로를 참조하고 있지만, 근원 객체(root)가 참조하고 있지 않습니다.
- 따라서 섬을 구성하는 객체 전부가 메모리에서 제거됩니다.

---

## 가비지 컬렉션 알고리즘
가비지 컬렉션은 크게 두 가지 알고리즘이 존재합니다.
### 1. Reference-Counting

말 그대로 참조 개수를 카운팅하면서, 참조가 하나도 없으면 가비지로 판단하는 방식입니다. 결국 위에서 설명한 예시들의 동작과정을 의미합니다.

### 2. Mark-and-Sweep

- 절차
    1. 가비지 컬렉터는 루트(root) 정보를 수집하고 이를 mark(기억)
    2. 루트가 참조하고 있는 모든 객체를 방문하고 이것들을 mark
    3. mark된 모든 객체에 방문하고 그 객체들이 참조하는 객체도 mark (단, 한 번 방문했던 객체를 다시 방문하지는 않음)
    4. 루트에서 도달 가능한 모든 객체를 방문할 때까지 위 과정을 반복 ⇒ **Mark**
    5. mark 되지 않은 모든 객체를 메모리에서 삭제 ⇒ **Sweep**
- 단점
    - 해당 과정에서 전체 스레드가 멈춥니다. **stop-the-world**라고 불리기도 한답니다! 흔히 가비지 컬렉션에서 성능 저하를 언급하는 것도 이 때문입니다..😭
- **Mark-and-Sweep의 구동과정**
    
    아래 예시 코드를 통해 구동 과정을 살펴봅시다!
    
    ```js
    let x = {
    	a : {
    		b : 2 {
    	}
    }
    
    let y = x
    x = 1
    
    let z = y.a.b
    y='bumsu'
    
    z=null
    ```
    
    1. `**Marking**`
        
         1) **roots**를 모두 회색으로 마킹하고, Deque에 push합니다.
        
        ![9](/javascript-deep_study-gabage_collection/9.png)
        
        2) Deque에서 pop front하여 객체를 꺼내어 검은색으로 마킹합니다.
        
        ![10](/javascript-deep_study-gabage_collection/10.png)
        
        3) 검은색으로 마킹된 객체가 참조하는 객체들을 회색으로 마킹하고, push front합니다.
        
        ![11](/javascript-deep_study-gabage_collection/11.png)
        
        4) Deque가 완전히 빌때까지 b,c를 반복합니다.
        
        ![12](/javascript-deep_study-gabage_collection/12.png)
        
        ![13](/javascript-deep_study-gabage_collection/13.png)
        
        (중략)
        
        ![14](/javascript-deep_study-gabage_collection/14.png)
        
        5) 최종적으로 검은색과 흰색으로 분류되고 Deque은 완전히 비게 됩니다. 끗!
        
        ![15](/javascript-deep_study-gabage_collection/15.png)
        
    2. **`Sweep`**
        
        흰 색으로 마킹된 객체들을 가비지로 인식하고 메모리를 해제합니다.
        
    3. **`Compact`**
        
        메모리의 파편화가 심해지지 않도록 메모리를 재배치하여 메모리를 확보합니다.
        
        ![16](/javascript-deep_study-gabage_collection/16.png)
        

## 최적화 기법

- 자바스크립트 엔진은 실행에 영향을 미치지 않으면서 가비지 컬렉션을 더 빠르게 하는 다양한 최적화 기법을 적용합니다.
- 종류
    - **generational collection (세대별 수집)**
        - 객체를 ‘새로운 객체’와 ‘오래된 객체’로 나눕니다.
        - 객체 상당수는 생성 이후 제 역할을 빠르게 수행해 금방 쓸모가 없어집니다. 이러한 것들은 ‘새로운 객체’로 구분합니다.
        - 가비지 컬렉터는 이런 새로운 객체를 공격적으로 메모리에서 제거합니다.
        - 일정 시간동안 살아남은 객체는 ‘오래된 객체’로 분류하여 가비지가 컬렉터가 덜 감시하도록 합니다.
    - **incremental collection (점진적 수집)**
        - 방문해야 할 객체가 많다면 mark 하는데 상당한 시간이 소모 됩니다.
        - 따라서 가비지 컬렌션을 여러 부분으로 분리한 다음, 각 부분을 별도로 수행합니다.
        - 추가 작업이 필요하나, 긴 지연을 짧은 지연 여러 개로 분산시킬 수 있다는 장점이 있습니다.
    - **idle-time collection (유휴 시간 수집)**
        - 가비지 컬렉터가 실행에 주는 영향을 최소화하기 위해 CPU가 유휴 상태일 때에만 가비지 컬렉션 실행합니다.

