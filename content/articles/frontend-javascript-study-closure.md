---
title: 클로져 파먹어⚔️ 보기 - 1
description: 자바스크립트 영원의 숙원사업 클로져👻를 채굴해봅니다
slug: frontend-javascript-study-closure
category: Front-End
author: 장준성
---

# 클로져(Closure)란?

개발자의 백과사전, `MDN`을 한번 살펴봅시다.
**클로저**는 함수와 함수가 선언된 어휘적 환경(`Lexical scope`)의 조합이다.

음 역시 `MDN`이군요🧐.

결론적으로 저희가 클로져를 이해하기 위한 키워드는
`Lexical scope` 1가지 인것 같습니다.

한번 깊게 알아보도록 하죠!

---

# 실행 컨텍스트(Execution Context, EC)

그런데 갑자기 제가 뜬금없이 실행 컨텍스트 이야기를 할까요? 클로져 이놈... 생각외의 복병이었습니다. 사전에 알아야 할 개념이 정말 많죠.

우선 천천히 실행 컨텍스트의 이름부터 분석 해봅시다.

> **실행 + 컨텍스트**
> ⇒ **실행 + 맥락**
> ⇒ **실행하는 맥락**

✅ **실행하기 위해 필요한 조건들** ✅

이제 좀 분명해지군요. 자바스크립트 엔진은 코드를 읽고 실행하기 위해 **각 코드에서 필요한 조건을 분석할 필요가 있습니다.** 즉 자바스크립트 엔진의 코드 해석 원리라고 생각해 볼 수 있겠네요.

---

# 실행 컨텍스트의 종류

그럼 이제 세부적으로 코드가 실행 될 수 있는 위치에 대해 한 번 생각을 해봅시다.
그런데 위치라뇨? 단어가 다소 모호하기도 합니다. 조금 더 명확하게 **코드가 실행되는 환경**이라고 생각을 해봅시다.

한번 코드의 입장에서 실행되는 환경을 분류해볼까요?
(이제부터 실행콘텍스트를 짧게 `EC`로 칭하겠습니다.)

## Case1: 어떠한 환경에도 속하지 않음

```js
var 이름 = "danpacho, 장준성";
console.log(이름); // danpacho, 장준성
```

해당 예제처럼 이름은 어떠한 환경에도 속하지 않았으며, 자체적으로 실행이 가능한 환경을 구성하고 있습니다. 위같이 **함수에 속하지 않은, 함수 내부에 있지않은 코드를 `Global EC`라고 생각하시면 됩니다.**

`Global EC`에서는 다음과 같은 과정을 실행합니다.

1. `window` 전역 객체 생성
2. `this`를 `window`로 설정

   ![this가 전역객체](/frontend-javascript-study-closure/01.png)

   보시다시피 크롬 환경에서 `this`를 출력해보았을때, `Window` 객체가 지정되었음을 확인하실 수 있습니다!

   **즉 어떠한 환경에도 종속되지 않은 상태에서,** `this`는 언제나 `Window` 객체를 가리키고 있습니다.

## Case2: 함수라는 환경에 속함

위 이름 예제를 이어 조금 더 코드를 작성해볼까요? 이번에는 인사하는 함수를 한 번 만들어 봅시다.

```js
var 이름 = "danpacho, 장준성";
console.log(이름); // danpacho, 장준성

function 인사하기(이름) {
  console.log(`안녕, ${이름}!`);
  return 이름;
}

인사하기(이름); // 안녕, danpacho, 장준성
```

인사라는 함수는 `인사(이름)` 에서 **실행** 되고 있는 것을 주목합시다.

즉 자바스크립트는 **`인사`의 환경 조건을 분석해야** 위 코드를 정상적으로 실행할 수 있습니다!

위같이 특정 함수에 종속된 코드 환경에 대한 실행콘텍스트, `EC`를 `Functional EC`라고 생각하면 됩니다.

근데 `Funtional EC`는 언제 만들어야 할까요?

여러분의 생각이 맞습니다.

**함수가 실행되는 코드가 나오는 시점에, 즉 함수가 호출되는 순간** `Functional EC`가 만들어집니다.

이후 실행을 마친 후에는 사라지게 되죠!

(이 주제에 대해 뒷부분에 다룰 것입니다)

## Case3: `eval` 이라는 환경에 속함

`eval`은 인자로 `string`, **자바스크립트 표현식, 명령문, 또는 연속되는 다수의 명령문을 나타내는 문자열 등을 인자로 받는 함수입니다.** 그리고 표현식은 이미 존재하는 객체의 변수나 속성을 포함할 수 있습니다.

쉽게 말해서, `eval`은 인자로 받은 값을 모두 실행하고 그 실행 결과를 반환하는 함수입니다.

왠지 코드 뒤편이 싸늘하신가요? 맞습니다. 만약 해커가 악의적으로 `eval`의 실행 위치를 알아낸 후, **인자에 악성코드를 집어넣는다면, 저희 프로그램은 그대로 죽을 것입니다. 절대로 사용하지 마시길 바랍니다.**

[🔴 Eval의 위험성](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval#eval을_절대_사용하지_말_것!) 을 참고해보세요.

그리고 Eval은 `Eval Functional EC`에 속합니다.

---

# 실행 컨텍스트의 동작과 `Execution Stack`

지금까지 실행컨텍스트의 의미와 `EC`의 환경을 구분해보았습니다.

이제 **실제로 `EC`가 어떻게 움직이는지** 핵심 적인 동작 과정과 원리를 차근차근 살펴봅시다.

## `Execution Stack`은 `LIFO` 구조

`LIFO`(Last In First Out)? **만원이 돼버린 엘레베이터**를 생각하시면 됩니다. 즉 **늦게 탄 사람이 먼저 내리는 개념**을 적용한 Stack 자료구조입니다.

그럼 `Execution Stack`이 무엇일까요?

쉽게 말해서 **코드가 실행(Execution)되는 절차** 기억하기 위해 저장하는 공간으로 생각하시면 됩니다. 그리고 그 공간은 **Stack(`LIFO`)** 자료구조를 사용하는 것이죠.

## `Execution Stack`에 `EC`를 쌓아가는 과정

이제 Execution의 구조를 이해했으니, 한번 자바스크립트 엔진이 `Stack`에 `EC`를 저장하는 과정을 관찰해봅시다.

![Execution Stack.png](/frontend-javascript-study-closure/02.png)

한번 과정을 차근차근 쪼개서 확인해볼까요?

1. `script` 태그를 만남
2. `script` 태그를 만난 순간, **`Global EC`** 생성
3. `인사하기(내이름)` 에서 `인사하기` 함수 호출
4. `인사하기`가 **호출된 순간** 해당 함수의 `Functional EC` 생성
5. `인사하기` 속에서, `인사시작(인사성_합격)` 이 실행됨과 동시에 `인사시작 함수` 호출
6. `인사시작`이 **호출된 순간** 해당 함수의 `Functional EC` 생성

이제 위 과정을 일반화 해보겠습니다.

1. `script` 태그를 만남
2. `script` 태그를 만난 순간, `Global EC` 생성
3. `script` 속 자바스크립트 구문 만남
4. **함수가 정의된 이후 실행되는 순간**, 해당 함수의 **`Functional EC`** 생성
5. 함수 속에 또 함수가 있다면, 해당 함수가 **실행되는 시점**에 또 다른 `Functional EC` 생성

   (함수 안에 함수도 그 함수에 속한 환경이 있습니다! 마치 **자신의 집**과 **집 속의 방**의 *환경이 다른것*처럼요)

## `Execution Stack`에 `EC`를 실행하는 과정

좋습니다! 저희는 지금까지 `Stack`에 `EC`를 저장했습니다. 그럼 사용을 해야죠!

여기서 예제속에 **마지막에 저장한** `EC`, 즉 `인사시작` 함수가 **가장 먼저 실행**되어야 한다는 점을 생각해봅시다!

**마지막에 저장한 것을 가장 먼저...** 그렇죠 `LIFO` Stack 자료구조를 채택한 이유가 바로 여기에 있습니다. 실행 흐름에 따라 가장 마지막에 저장된 `EC`를 가장 먼저 실행하는 것이죠! 그리고 저장된 `EC`에 따라 함수를 실행하면, `Execution Stack`에서 해당 `EC`를 제거하는 방식으로 작동을 합니다.

위 과정을 모든 스크립트를 실행할 때까지, 즉 `Execution Stack`에 아무것도 남지 않을때까지 반복하는 것이 바로 프로그램의 실행입니다.

(모든 코드가 실행되면 자바스크립트 엔진은 `Global EC` 또한 제거합니다.)

그리고 해당과정을 거쳐 프로그램은 정상적으로 말할겁니다.

`danpacho, 환영한다!`

---

# 실행 컨텍스트가 만들어지는 과정

지금까지 `EC`의 종류와 실행 과정에 대해 살펴보았습니다.
그렇다면 과연 `EC`는 **어떤 정보**를 담고 있을까요🧐? 한번 실행 컨텍스트가 생성되는 과정을 함께 살펴봅시다!

## Creation 단계(Phase)

여기서 실질적으로 `EC`가 만들어집니다!

그리고 `EC`는 **3가지 정보**를 갖고 있습니다.

### A. `Lexical Environment`

초기에는 **`Variable Environment` 와 동일하지만, 변경사항을 실시간으로 반영합니다.**

### B. `Variable Environment`

`Lexical Environment` 부분집합입니다. 조금더 자세하게 말씀드리자면 선언 시점 `Lexical Evironment`의 **스냅샷**, 즉 변경사항을 실시간으로 반영하지 않는 초기 정적 환경의 캡쳐본입니다.

그리고 다음과 같은 내용을 담고 있습니다.

- 현재 컨텍스트 내의 식별자(변수 및 함수)들에 대한 정보
- 외부 환경 정보

또한 `Variable Environment`이 생성될 때 다음과 같은 일들이 일어납니다.

- **This Binding**

  자바스크립트 엔진은 `this`를 이 순간 결정짓습니다.

  그리고 `this`는 크게 2가지 `EC`에서 결정이 됩니다.

  1.  `Global EC`

      `this` = 전역객체(`window`)

  2.  `Functional EC`, **함수 호출 방식**에 따라 다릅니다.

  - 객체 **참조에** 의해서 호출되는 경우

    > 해당 객체를 `this` 설정

  - 함수가 어떠한 **참조없이** 호출되는 경우

    > 전역 객체(`window`)
    >
    > `strict mode`에서는 `undefined`로 설정

  - 예제) **객체 참조**에 의해서 호출되는 경우

    ```js
    const 사람 = {
      이름: "danpacho",
      멋짐: 100,
      멋짐get: function() {
        return `멋짐 수준: ${this.멋짐}`;
      }
    };
    ```

    `사람` 객체를 직접 참조하는 경우, `this` = `사람`

    ```js
    사람.멋짐get(); // 멋짐 수준: 100
    ```

    객체 참조가 없는 경우, `this` = `undefined`

    ```js
    const 사람_멋짐_가져오기 = 사람.멋짐get();

    사람_멋짐_가져오기(); // 멋짐 수준: undefined
    ```

이중에서 자바스크립트 엔진이 주로 활용하는 부분은 **프로그램 실행에서 계속해서 바뀌는** `Lexical Environment` 입니다.

그래서 `Lexical Environment`가 뭐지...?

라는 탄식, 저도 이해합니다😂. 차근차근 알아가봅시다!

---

## 1. Lexical Environment 란 무엇인가?

공식 ES6 문서의 정의를 먼저 살펴볼까요?

> ✅ **lexical nesting structure에** 따른 `variable`과 `function`의 identifier 연결을 정의
>
> _A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code._

우선 **lexical nesting structure**은 알 수 없으니 넘겨봅시다.

그렇게 되면 `function`과 `variable`의 식별자 연결이라는 문구가 남네요!

그렇습니다. `Lexical environment`는 각 `EC`의 **변수 혹은 함수의 식별자, 즉 이름과 각 변수와 함수에 대응하는 값을 연결시킨 환경**을 의미합니다.

---

## 2. Lexical Environment(`LE`) 의 구성 알아보기

### A. `Environment Record`

첫번째로 각 컨텍스트와 관련된 **식별자(identifiers)**, 즉 **이름을 저장**하는 `Environment record`가 있습니다. 그리고 `Environment record`는 식별자를 **2가지 타입**으로 분류를 합니다.

### A.1. **`Declarative environment record`**

이곳에서는 변수와 함수의 **이름(=식별자)을 기록합니다**.

특히 함수에 대해서는 함수의 **[매개변수 식별자이자, 각 함수의 매개변수의 대입 위치와 값 및 인수의 갯수를 저장하는 공간인 arguments](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/arguments)** 객체를 저장합니다.

그런데 자바스크립트 엔진은 어떻게 이름, 즉 식별자를 알아낼까요?

이때 등장하는 개념이 바로 `Hoisting` 입니다.

---

> 🤔 `Hoisting` 형이 여기서 왜 나와?

> 차근차근 생각해봅시다!
>
> 우선 식별자를 알아낸다는 과정을 곱씹어 봅시다.
>
> **성공적으로 식별자(이름)를 알아내기 위해서**는,
> **각 변수와 함수의 이름을 수집하는 과정이 필수적일 것입니다.**
>
> 이것이 어떤 의미일까요?
>
> 자바스크립트 엔진은 코드의 실행 전에 **`Environment Record` 를 생성하고, 그 과정에서** `Declarative environment record` 를 만듭니다.
>
> 또 앞서 살펴보았듯이 위 과정에서는 **미리 식별자를 알아냅니다.**
>
> 즉 코드의 실행 전에, 변수 혹은 함수가 사용되기 전에 이름을 알아내는 과정이 있다는 이야기이죠.
>
> 이는 자바스크립트 엔진이 코드의 실행전에 사용될 함수와 변수를 미리 알 수 있으며,
> 이들을 사전에 선언할 수 있다는 이야기입니다.
>
> 이것이 바로 `Hoisting` 이 일어나는 근본적인 이유입니다.

---

> 🚫 그러나 조심하세요!
>
> 각 변수와 함수의 이름을 미리 알아내는 과정이 만든 효과가,
> 호이스팅을 이해하는 개념인 **선언부를 최상단으로 끌어올린다는 생각과 개념적으로 동일하기에**,
> **실제로 자바스크립트 엔진이 선언부를 최상단으로 끌어올린다고 착각하면 안됩니다!**
>
> 선언부를 최상단으로 끌어올린다는 이해의 방식과
> `Declarative environment record`가 변수와 함수의 식별자를 미리알고 메모리에 할당하는 과정은 엄연히 다른 것입니다.
>
> (**[호이스팅의 자세한 개념](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)은 공식문서를 참고하세요**)

---

### A.2. `Object environment record`

이 공간은 `Global Lexical Environment`에 한정되어 생성됩니다.

**함수와 변수의 선언과는 독립적으로 생각**하시면 됩니다.

예컨데 크롬 브라우저 등의 **브라우저 환경**에서는 전역 객체인 `window`를 기록하며,
**`Node` 환경**에서는 `Global` 전역 객체에 대한 정보를 저장하는 곳입니다.

---

### B. `Outer Environment Reference`

> **Reference to the `outer` environment**

드디어 오늘의 주인공이 등장했네요.

이름 그대로 **외부 환경에 대한 참조를 가능케 하는 공간**입니다.

깊게 파보기 전에 우선 **환경을 외부 / 내부로 나누었다는 것**의 의미를 곱씹어 봅시다. 이는 자바스크립트 엔진이 두가지 공간을 구분을 할 수 있다는 의미입니다. 그리고 이는 **scope**를 통해서 처리되죠!

> 🤔 scope란?
>
> 모든 프로그래밍 언어에서 **식별자의 유효범위를 구분**하기 위해 **scope**라는 개념을 사용합니다. 그리고 scope의 개념은 다음과 같습니다.
>
> ✅ scope A 와 변수
>
> A의 **밖에서** 선언된 변수
>
> = **A의 내부/외부 모두 접근**이 가능합니다.
>
> A의 **내부 에서** 선언된 변수
>
> = **A의 내부에서만 접근**이 가능합니다.

그런데 자바스크립트에서는 **외부환경에 대해 참조를 왜 가능하게 만들었을까요?** *이 의문을 간직한 채*로 계속 이어나가 봅시다.

### C. This Binding

`EC` Creation Phase의 `this` binding 부분을 참고해주세요! 동일합니다.

---

## 3. `Lexical Environment`의 생성

> ✅ 반드시 기억하세요!
>
> Lexical Environment의 생성은 **해당 함수의** **선언 위치**에서 일어납니다.
>
> 또한 **`EC`의 실행과는 독립적으로 생각**해야 합니다.

이게 어떤 의미인지 예제를 살피며 차근차근 이해해봅시다.

```js
var apple = "apple";

function isApple() {
  console.log(apple);
}

function isBanana() {
  var apple = "banana";
  isApple();
}

isBanana(); // 어떤 값이 출력이 될까요?
```

과연 `isBanana()` 가 어떤 값을 출력시킬까요?

왠지 직감적으로는 `isBanana` 내부에서 `var apple`이 다시 선언되면서 `“banana”` 로 덮어질 것 같은 느낌이 듭니다.

한번 확인해보죠

![스크린샷 2022-10-11 오후 1.43.16.png](/frontend-javascript-study-closure/03.png)

먼저 `isApple`의 정보를 살펴보겠습니다. 많은 값이 있군요! 그 중 위 문제를 해결하기 위한 실마리는 `[[Scopes]]` 에 들어있습니다.

첫번째 `scope` 객체로 `global EC`인 `window` 객체가 들어가 있군요. 좋습니다. 그리고 선언한 `apple`이 `“apple”` 상태로 고이 놓인 것도 확인할 수 있네요.

그렇다면 `isBanana()`를 실행한 이후에는 어떻게 될까요? 다시한번 `console.dir(isApple)` 을 실행해 봅시다. 저희의 가정이라면 `isApple`이 `“banana”`로 변경되어야 합니다.

![스크린샷 2022-10-11 오후 1.43.16.png](/frontend-javascript-study-closure/04.png)

**Boom💨**.

놀랍게도 동일한 결과가 나옵니다. `isApple`이 참조하는 `apple`은 여전히 `“apple”`입니다. 변화가 없네요.

다시 처음으로 돌아올까요? `Lexical environment`는 생성 위치에 의해 결정됩니다.

또한 자바스크립트 엔진은 **변수의 확인을 위해 `outer scope` 객체를 탐색합니다.**

이제 프로그램의 실행 과정을 순차적으로 살펴봅시다.

1. `isApple`의 **생성위치**는 `Global Context`이며, 그 결과 `scope`는 `global EC`로 결정
2. `isApple`이 실행되는 순간, `apple`이라는 변수는 해당 함수 내부에서 선언되지 않았음
3. 즉 `isApple`에서 참조하는 **`apple`을 자기 자신의 `variable environment`에서 찾을 수 없음**
4. 이 순간 자바스크립트 엔진은 `isApple`의 `Lexical environment`의 `outer scope`를 통해서 **혹시 있을지도 모르는 `apple`을 탐색**.
5. 탐색결과 `[[Scope]]`의 `global scope`에서 선언한 `var apple = “apple"` 자바스크립트 엔진이 발견.
6. 결과, `“apple”`

4의 과정이 바로 자바스크립트에서 **`Outer Environment Reference` 탐색을 가능하게 설계한 이유입니다.** 자신의 `variable environment` 에서 찾을 수 없는 변수를 혹시 있을지도 모른다고 생각하고 `[[Scope]]`객체에서 탐색하는 것이죠

> 🤔 `isBanana` 함수 속의 `var apple = “banana”` 는 어디로 갔나요?
>
> 해당 `banana`는 `isBanana`의 `variable environment`에 고이 저장되어 있습니다.
>
> 그리고 `isBanana`의 실행 컨텍스트가 실행된 후 제거되는 시점까지 아무것도 하지 못하고 가비지 컬렉터에 의해 사라져버리는 것이죠… (변수도 비루한 삶이 있을 수 있습니다)

이번에는 예제를 살짝 변경해보겠습니다.

> `isApple`의 `variable environment`에 새로 `apple`생성해주기

```js
var apple = "apple";

function isApple() {
  var apple = "이게 진짜 사과지";
  console.log(apple);
}

function isBanana() {
  var apple = "banana";
  isApple();
}

isBanana(); //결과는?
```

이제는 `[[Scopes]]`객체를 탐색할 필요 없이 `isApple`의 `variable environment` 에서 `apple`을 발견할 수 있겠죠? 아마 해당 함수 속의 `“이게 진짜 사과지”`가 출력될 것 같습니다.

저희가 예상했던것 처럼 `isApple`의 `variable environment`에 할당된 `apple`, `“이게 진짜 사과지”`가 출력되는 것을 확인할 수 있습니다.

그리고 **선언 위치는 여전히 동일하기에 `scope객체 [[Scope]]`는 동일한 것을** 확인할 수 있습니다.

![스크린샷 2022-10-11 오후 1.43.16.png](/frontend-javascript-study-closure/05.png)

> `apple` 변수 재할당하기

그렇다면 apple을 **재선언하는 것이 아닌, 재할당한다면** 어떻게 될까요?

이렇게 말이죠

```jsx
let apple = "apple";

function isApple() {
  console.log(apple);
}

function isBanana() {
  apple = "banana";
  isApple();
}

isBanana(); // 어떤 값이 나올까요?
```

재할당은 선언과 달리 `Script scope`(**[v8엔진이 전역 var 선언의 global EC에서 접근가능하게 만든 것과 다른 공간](https://stackoverflow.com/questions/40685277/what-is-the-purpose-of-the-script-scope)**)에서 **값이 직접 수정되면서**, `Scripts scope`의 `apple`이 `“banana”`로 변경된 모습을 확인하실 수 있습니다.

![스크린샷 2022-10-11 오후 2.24.24.png](/frontend-javascript-study-closure/06.png)

`var`을 사용해도 동일한 결과가 나옵니다. 하지만 `let`, `const`와 달리 `global EC`에서 해당 값이 저장되고 조회 가능하다는 점이 다른 것이죠.

(자세한 내용은 `var` vs `let` / `const` 내용을 찾아보세요)

> `apple`의 재할당 없이 직접 전달하고 싶습니다!

이런 고민이 있을 수 있습니다.

저는 `isApple`속에서 `apple`을 조회할 때, **재선언을 하고 싶지 않아요!**

`apple`을 모든 스코프에서 접근할 수 있는 **전역 `scope`에 두고 싶지 않아요!**

그럼 이렇게 해보면 어떨까요?

**`lexical scope`가 선언 위치에 의해 결정된다면**,

`isBanana`를 `isApple`의 `lexical scope`로 만든다면 어떨까요?

그렇다면 `isBanana`의 `scope`를 탐색할 수 있을 것 같습니다.

그런데 `isApple`의 `lexical scope`를 `isBanana`로 어떻게 설정할 수 있을까요?

간단합니다. **선언 위치에 따라 정해지는 `lexical scope`라면, 선언을 `isBanana`내부에서 한번 진행해보는 거죠.**

한번 해봅시다.

```js
var apple = "apple";

function isBanana() {
  var apple = "banana";

  function isApple() {
    console.log(apple);
  }
  console.dir(isApple);

  isApple();
}

isBanana();
```

`isApple`을 **`isBanana` 속에 선언**했습니다

과연 생각대로 `isApple`의 `lexical environment`로 `isBanana`가 잡힐까요?

![스크린샷 2022-10-11 오후 2.53.47.png](/frontend-javascript-study-closure/07.png)

`isBanana` 가 있습니다!

어라 근데 `isBanana`가 있긴한데 `Closure`로 싸여있네요?

그리고 저희가 생각했던것 처럼 `isApple`의 `apple`이 있는 것을 찾을 수 있습니다.

한 번 `apple`이 `“바나나”`가 되는 절차를 살펴봅시다.

1. `isApple`의 **생성위치**는 **`isBanana` 함수 내부**이며, 그 결과 첫째로 `isBanana` Closure scope, 둘째로는 `global EC` scope로 결정
2. `isApple`이 실행되는 순간, `apple`이라는 변수는 해당 함수 내부에서 선언되지 않았음
3. 즉 `isApple`에서 참조하는 `apple`을 자기 자신의 `variable environment`에서 찾을 수 없게됨
4. 이 순간 자바스크립트 엔진이 `isApple`의 `Lexical environment` `outer scope`를 통해 `apple`을 탐색
5. 탐색결과 `[[Scope]]`의 첫번째 scope인 `Closure(isBanana)`속에서 `apple: “banana”` 발견
6. 결과, `“banana”`

### Scope Chain ⛓️

위같이 **`scope`의 구조가 `stack`형태로 쌓여있는 것**을 **`scope chaining`**이라 부릅니다.

그런데 왜 chain일까요?

**한번 위 예제의 `EC`와 각 `lexical environment`의 관계를 시각화한 자료를 다시 돌아보시죠.**

**Execution Stack이 최대로 찬 상태, 즉 프로그램이 실행 직전의 상황에 돌입한 시점의 Execution Stack을 시각화 한 것입니다.**

![lexical environment.png](/frontend-javascript-study-closure/08.png)

어떤가요? `Execution Stack`에 쌓인 `Lexical Environment`의 `outer scope`가 **한층 한층 연결되어 있는 구조가 마치 체인** 같지 않으신가요? (아니면 말구요...)

---

# 클로져, `scope chain`을 통해 자신의 스코프 외부 변수를 탐색하는 과정

이제 클로져가 명확해졌습니다.

각 함수의 `EC`(실행콘텍스트)의 `scope chain`이 바로 클로져의 핵심원리인것입니다.

**즉 함수 속의 변수를 참조할 때, 해당 변수를 자신의 `environment record`에서 찾지 못한 경우, `scope chain`을 통해서 찾은 변수를 클로져라는 `outer environment reference`에 저장해주는 것입니다.**

그리고 이 과정을 통해 클로져가 동작하는 것이죠!

다음 글에서는 "그래서 클로져를 어떻게 활용하는데?"에대한 질문을 해결해보는 시간을 가져보도록 하겠습니다😎. 감사합니다!

[👻 이곳에서도 글을 읽을 수 있어요 👻](https://danpacholog.verce.app)
