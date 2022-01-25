---
title: Flutter 스터디 5주차 (Widget Refactoring)
description: Flutter 스터디 5주차에 대한 내용입니다.
slug: flutter-study-week5
category: Application
author: songgyeong Oh
---

* [The Complete 2021 Flutter Development Bootcamp with Dart](https://www.udemy.com/course/flutter-bootcamp-with-dart/) section 12를 본 뒤 진행한 스터디 입니다.

### Flutter 스터디 5주차 - Widget Refactoring
#
#### Contents
1. #### 길이가 긴 위젯은 어떻게 리팩토링 해야할까?
* 페이스북 페이지를 리팩토링 하는 방법
* 리팩토링의 안티패턴

#
###  길이가 긴 위젯은 어떻게 리팩토링 해야할까?
###
![facebook](/flutter-study-week5/facebook.png)

위의 페이스북 뉴스피드와 같이 한 화면에 여러 기능을 하는 위젯이 여러개 있는 경우,
한 위젯만으로는 관리하기가 매우 힘듭니다. 엄청난 양의 코드와 수십개의 위젯이 한 파일 안에 
있게 되겠죠.

위젯을 리팩토링 할 때는 가장 먼저 분리할 위젯의 영역을 정해야 합니다. 

위 페이스북 예시 같은 경우에는 appbar, tapbar, 뉴스피드 리스트, 버튼 리스트로 나눌 수 있습니다.

각 영역은 새로운 위젯 또는 메소드로 분리할 수 있습니다.
가장 쉬운 접근 방법은 각 영역을 메소드로 분리하는 방법입니다.
메소드를 많이 사용하지 않고 복잡한 페이지를 완성하면 수정하려고 할 때 위젯들이
너무 많아서 가독성이 떨어집니다. 그리서 최대한 짧은 코드를 지향하고 위젯을 영역별로 분리하는 것을 자주 사용하게 됩니다.

자주 볼 수 있는 형태는 다음과 같습니다.

```
// 일반적인 페이지
@override
Widget build(BuildContext context){
  return Scaffold(
    appBar: AppBar(...)
    body: Container(
      child: Column(
        children:[...],
      ),
    );
}
```
여기서 AppBar에도 버튼과 기능이 많이 들어가고 body에도 수백 줄을 넘길 수 있기 때문에
코드가 긴 위젯을 분리하고 싶은 욕구가 생길 것입니다.

메소드로 분리를 해보면, 

```
// 분리 후
@override
Widget build(BuildContext context){
  return Scaffold(
    appBar: _buildAppBar(),
    body: _buildBody(),
  );
}

_buildAppBar(){
  return ...;
}

_buildBody(){
  return ...;
}
```
위와 같이 되는데요, 메소드가 깔끔히 정리되어 좋아 보입니다.

하지만 이렇게 위젯을 메소드로 호출하여 분리하는 것은 안티패턴으로 바람직하지 않습니다.
안티패턴은 습관적으로 많이 사용하는 패턴이지만 성능, 디버깅, 유지보수, 가독성 측면에서 부정적인 영향을 줄 수 있어 
지양하는 패턴을 뜻합니다. 

###
###*그렇다면 왜 메소드로 리팩토링하는 것이 안티패턴일까요?

메소드로 리팩토링을 하면 아무 의미 없는 빌드를 반복해서 호출하기 때문입니다.

![antipattern](/flutter-study-week5/antipattern.png)

위 3개의 위젯을 3가지 방법으로 만들었습니다.
1. const + StatelessWidget
2. StatelessWidget
3. Method

각 위젯을 만드는 코드의 부분입니다.
```
body: Center(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: <Widget>[
      const CounterInformationText(text: 'I am const Stateless Widget:'),
      CounterInformationText(text: 'I am Stateless Widget'),
      _buildCounterInfomationText(text: 'I am Method'),
      Text('You have pushed the button this many times:'),
      Text(
        '$_counter',
        style: Theme.of(context).textTheme.display1,
      ),
    ],
  ),
),
```
const 키워드가 붙은 것과 안붙은 StatelessWidget 두개를 만들었고,

```
_buildCounterInfomationText({String text}) {
  debugPrint('$text, ${this.hashCode}');
  return Text(text, style: textStyle);
}
```
메소드로 한 위젯을 그렸습니다.

```
class CounterInformationText extends StatelessWidget {
  final TextStyle textStyle = const TextStyle(
    fontSize: 40,
    fontWeight: FontWeight.bold,
  );
  final String text;
  const CounterInformationText({this.text});
@override
  Widget build(BuildContext context) {
    debugPrint('$text, ${this.hashCode}');
    return Text(text, style: textStyle);
  }
}
```
build 메소드가 호출되면 text가 출력됩니다.
버튼을 누른 후 출력된 결과를 보면, 

```
# 최초
I am Method, 544291526
I am const Stateless Widget:, 1055342562
I am Stateless Widget, 137000319
# 한번 눌렀을 때
I am Method, 544291526
I am Stateless Widget, 18505293
# 두번 눌렀을 때
I am Method, 544291526
I am Stateless Widget, 350460176
# 세번 눌렀을 때
I am Method, 544291526
I am Stateless Widget, 949599705
```
최초에는 메소드 / const Stateless 위젯 / Stateless 위젯 모두 build 메소드가 호출됩니다.

문제는 그 다음입니다. const Stateless 위젯의 build 메소드는 더이상 호출되지 않습니다. 
그러나 나머지 메소드와 const가 없는 Stateless 위젯은 계속 호출됩니다.
특히 Stateless 위젯은 인스턴스를 매번 만들게 되므로 해시코드도 계속 변경됩니다.

Stateless 위젯은 이름 그대로 상태를 가지지 못하기 때문에 복잡한 연산이 들어갈 여지가 적습니다. 그러나 메소드로 리팩토링 한 경우에는 조금 문제가 됩니다.
메소드에서 무언가 계산을 한 다음 위젯을 리턴한다면 계산을 하는 동안 매번 UI 렌더링에 블러킹이 생기게 됩니다.

만약 클래스 내부 변수가 body 부분에 표시되는데 값에 변화가 있어서 변경된 값으로
표시해주기 위해 statefulwidget에서 setState()를 호출했다면 build() 부분이 실행됩니다.
우리가 다시 그릴 필요가 있는 부분은 Body 부분인데 AppBar()도 다시 rebuild하게 됩니다.
불필요한 일을 상태가 바뀔 때마다 반복해서 해주게 됩니다.
###
###*그렇다면 상태가 없는 긴 위젯을 리팩토링 할 때는 어떻게 해야할까요?

다음 두가지를 유의해서 리팩토링 해야합니다.
1. StatelessWidget일 것
2. const keyword를 최대한 사용할 것

const 키워드의 경우 위젯 속성 외에도 생성자, TextStyle과 같은 속성 등에도 사용할 수 있습니다.
더 이상 바뀔 가능성이 없는 모든 곳에 const 키워드를 사용하면, 화면이 조금만 바뀌더라도 관계없는 위젯들이
다시 처음부터 렌더링되는 일을 막을 수 있을 것입니다.
