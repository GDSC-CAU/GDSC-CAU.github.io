---
title: Flutter 스터디 3주차 (Stateful)
description: Flutter 스터디 3주차에 대한 내용입니다.
slug: flutter-study-week3
category: Application
author: songgyeong Oh
---

* [The Complete 2021 Flutter Development Bootcamp with Dart](https://www.udemy.com/course/flutter-bootcamp-with-dart/) section 8 까지 본 뒤 진행 한 스터디 입니다.

### Flutter 스터디 3주차 - Stateful

#### Contents
1. #### State 란 무엇인가?
  * State의 종류
  * Stateful widget 과 Stateless widget


2. #### Stateful widget lifecycle
  * Stateful widget과 생명주기
  
#
#### 1. State란 무엇인가?

플러터를 얘기할 때  "모든 것이 위젯"이라는 말을 꽤 많이 들었습니다. 

하지만 State는 위젯이라고 부르기엔 UI상에 노출되지 않고 더 특별한 기능을 담당합니다.

State란 간단하게 앱에서 사용되는 data들을 의미합니다.

Widget들을 컨트롤 해주고 어플리케이션을 만들어 나갈 때 State(상태)를 사용합니다.

####  State의 종류
플러터의 state는 App state와 widget state, 두가지로 나눌 수 있습니다.

- App state

먼저 App state는 앱 전반에 걸쳐 사용되는 data입니다

앱 여기저기 전반적으로 다 필요하고, 한쪽에서 app state를 변경하면 다른 쪽에서도 data변경을 반영해야 합니다.

- Widget state

Widget state는 widget 내부에서만 사용되는 data입니다.

App state와의 차이점이라면 위젯 내부에서만 사용되니 따로 공유하거나 할 필요가 없습니다.




#### Stateful widget 과 Stateless widget
(1) Stateless widget

StatelessWidget은 말그대로 State가 없는 Widget입니다.

State가 없다고 해서 Data가 없다는 뜻은 아닙니다. '변경될 data가 없다' 로 이해하시면 됩니다.

StatelessWidget도 만들때는 어떻게 만들어야할지 data가 주어질 수도 있습니다.

하지만 그것으로 끝, 내부의 data는 변경되지 않습니다.

예를 들면 화면 한 부분에 설명을 담당하는 Text위젯이나, 배경이 되는 위젯이 StatelessWidget이 될 수 있습니다.

클릭해서 어떤 반응을 기대하지도 않는 widget들 말이죠.
- stateless widget 생성하는 법
  ![stateless](/flutter-study-week3/stateless.PNG)

위 사진과 같이 stateless widget 을 생성할 수 있습니다.

int 앞에 final를 사용하여 number에 다른 값을 할당하는게 불가능해졌고, 따라서 immutable한 변수가 됐습니다.

stateless widget에서 위와 같이 final 변수를 이용한다면 더 안정적인 코딩이 가능합니다.

(2) Stateful widget

StatefulWidget은 State가 존재하는 Widget입니다.

그래서 내부에 data가 변경될 경우, 그에 맞게 화면을 다시 그려서 변경된 부분을 위젯에 반영할 수 있습니다.

예를 들어 어떤 점수를 나타내는 위젯의 경우 사용자가 점수를 획득하면 그에 따라 계속 업데이트를 해주어야겠죠?

이러한 위젯이 StatefulWidget입니다.
- stateful widget 생성하는 법
  ![stateful](/flutter-study-week3/stateful.PNG)

StatefulWidget은 바뀌는 부분, 바뀌지 않는 부분 두가지로 나뉩니다.

위젯의 state이 바뀌고 우리가 변경된 사항을 화면에 그리라고 명령을 하면 플러터는 기존 위젯을 날려버리고 업데이트된 부분을 반영해서 위젯을 다시 그리게 됩니다.

다시 그릴 때, 해당 위젯을 완전히 날려버리고 다시 그린다고 하면 data도 함께 날라가 버립니다.

Data는 살려두고, 해당 data를 위젯에 입혀서 다시 만들어내게 됩니다.

그러면 계속해서 사라지지 않고 data를 들고 있을 class가 필요합니다.

그 class를 StatefulWidget은 가지고 있어야하기 때문에 2개의 클래스도 구성되어 있습니다.

#### 굳이 state와 stateful widget을 분리한 이유가 뭘까?
State는 상태 클래스로 StatefulWidget의 생명주기 및 상태를 관리하는 클래스입니다.

StatelessWidget 같은 경우에는 생명주기가 없습니다.

하지만 StatefulWidget은 생명주기가 있습니다.

정확히 말하자면 StatefulWidget이 가지고 있는 State가 생명주기를 가지고 있습니다.

위젯은 State 클래스만큼 다양한 생명주기를 가질 수 없습니다.

StatefulWidget 또한 마찬가지로 위젯이기 때문에 생명주기를 State가 관리하도록 역할을 몰아준 것입니다.

그런데 만약 StatafulWidget이 생명주기를 가지면 어떻게 될까요?

속성 또는 부모 위젯이 바뀌게 되면 StatefulWidget 또한 예외 없이 바뀌어야 합니다.

이 과정에서 위젯이 다시 재생성하는데 StatefulWidget이 생명주기를 가지고 있으면 생명주기를 다시 복구하는데 꽤나 많은 비용이 듭니다.


하지만 State가 생명주기를 관리한다면 위젯과 함께 폐기되었다가 재구축하지 않습니다.

또한 State는 폐기되지 않으므로 데이터 변경에 대한 응답으로 필요할 때 언제든지 위젯을 재구성할 수 있습니다.


따라서 성능을 위해 State와 StatefulWidget를 분리했다고 말할 수 있습니다.

#
#### 2.Stateful widget lifecycle

Stateful widget의 lifecycle은 다음 단계를 포함하고 있습니다.
![lifecycle](/flutter-study-week3/lifecycle.PNG)

단계별로 하나씩 살펴보겠습니다.

(1) createState()

플러터가 StatefulWidget을 빌드하도록 지시하면 즉시 [createState()]가 호출됩니다.

```
class Home extends StatefulWidget {
  @override
  HomeState<StatefulWidget> createState() => Home();
}
```

(2) initState()

위젯이 생성될때 처음으로 호출되는 메서드입니다. initState는 오직 한번만 호출됩니다. 또한 반드시 super.initState()를 호출해야 합니다.

<initState에서 실행되면 좋은 것들>

- 생성된 위젯 인스턴스의 BuildContext에 의존적인 것들의 데이터 초기화
- 동일 위젯트리내에 부모위젯에 의존하는 속성 초기화
- Stream 구독, 알림변경, 또는 위젯의 데이터를 변경할 수 있는 다른 객체 핸들링

```
@override
void initState(){
  super.initState();
}
```

(3) didChangeDependencies()

didChangeDependencies 메서드는 위젯이 최초 생성될때 initState 다음에 바로 호출됩니다.

또한 위젯이 의존하는 데이터의 객체가 호출될때마다 호출됩니다. 

예를 들면 업데이트되는 위젯을 상속한 경우. 공식문서 또한 상속한 위젯이 업데이트 될때 네트워크 호출(또는 다른 비용이 큰 액션, API호출) 이 필요한 경우 유용합니다.

```
@override
void didChangeDependencies() { 
 
}
```

(4) build()

이 메서드는 자주 호출되고 필수이며 재정의 대상(@override)이고 반드시 Widget을 리턴해야 합니다.

Padding, Center 조차도 child 또는 children을 가진 위젯이며 화면에 모든 UI 위젯으로 랜더링 할 때 마다 호출합니다.

```
@override
Widget build(BuildContext context) {
//add your widgets
}
```

(5) didUpdateWidget(Widget oldWidget)

didUpdateWidget()는 부모 위젯이 변경되어 이 위젯을 재구성해야 하는 경우 사용됩니다.

플러터가 오래동안 유지되는 state를 다시 사용하기 때문입니다. 이 경우 initState()에서 처럼 일부 데이터를 다시 초기화 해야 합니다.

build() 메서드가 Stream이나 변경 가능한 데이터에 의존적인 경우 이전 객체에서 구독을 취소하고 didUpdateWidget()에서 새로운 인스턴스에 다시 구독 해야합니다.

플러터는 항상 이 메서드 수행 후에 build()메서드 호출 하므로, setState() 이후 모든 추가 호출은 불필요합니다.

```
@protected
void didUpdateWidget(Home oldWidget) {
super.didUpdateWidget(oldWidget);
}
```

(6) setState()

setState() 메서드는 플러터 프레임워크 자체적, 또는 개발자로 부터 자주 호출됩니다.

'데이터가 변경되었음’을 프레임워크에 알리는데 사용되며 build context의 위젯을 다시 빌드하게 합니다.

```
setState(() {

});
```

(7) mounted is true

createState가 state클래스를 생성하면 buildContext는 state에 할당 됩니다.

BuildContext는 위젯이 배치된 위젯 트리의 위치를 단순화 한 것입니다.

모든 위젯은 bool형식의 this.mounted 속성을 가지고 있고 buildContext가 할당되면 true를 리턴합니다.

위젯이 unmounted상태일때 setState를 호출하면 error가 발생합니다.

(8)deactivate()

이 메서드는 거의 사용되지 않습니다.

deactivate()는 tree에서 State가 제거 될때 호출 됩니다. 

(9) dispose()
dispose()를 사용하면 State객체가 영구히 제거 됩니다.

```
@override
void dispose(){
super.dispose();
}
```

(10) mounted is false

이 상태에서 state 객체는 결코 다시 mount되지 않으며, setState()가 호출되면 에러가 발생합니다.

#
- 이번 주차 강의에서는 flutter의 기본적인 ui를 다루는 내용이었고, stateless, stateful widget을 다루었기 때문에 
stateful widget의 생명주기에 대해 심화적으로 알아보았습니다.
