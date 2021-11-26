---
title: Flutter 스터디 2주차 (Scaffold)
description: Flutter 스터디 2주차에 대한 내용입니다.
slug: flutter-study-week2
category: Application
author: Junho Lim
---

* [The Complete 2021 Flutter Development Bootcamp with Dart](https://www.udemy.com/course/flutter-bootcamp-with-dart/) section 5 까지 본 뒤 진행 한 스터디 입니다.

### Flutter 스터디 2주차 - Scaffold

#### Contents
1. #### Scaffold 란 무엇인가?
    * Material Design 과 Scaffold

2. #### Scaffold 의 구성 요소 살펴보기
    * AppBar
    * Body 
    * Bottom Navigation Bar
    * Floating Action Button

#
#### 1. Scaffold란 무엇인가?

Flutter 공식 문서를 살펴보면 Scaffold에 대해 다음과 같이 정의하고 있습니다.

 ![Scaffold 정의](/flutter-study-week2/scaffold.PNG)

 즉 Scaffold 란 Flutter에서 Material Design visual layout 을 구현하는데 사용됩니다.



#### Material Design 과 Scaffold
그렇다면 Material Design 은 무엇일까요?

Material Design 은 플랫 디자인의 장점을 살리면서도 빛에 따른 종이의 그림자 효과를 이용하여 입체감을 살리는 디자인 방식인데요,

구글에서는 안드로이드의 기본 디자인 가이드로 바로 이 Material Design 을 사용하고 있습니다.

즉 Scaffold는 바로 이 Material Design 을 따르는 앱 화면을 구성하기 위한 뼈대라고 생각하시면 됩니다.

cf)애플에서는 제공하는 디자인 가이드는 Cupertino Design 입니다.



#
#### 2. Scaffold 의 구성 요소 살펴보기
 ![Scaffold properties](/flutter-study-week2/scaffold_properties.PNG)

 Scaffold위 사진 외에도 다양한 옵션들이 있습니다.
 이 중 아래 사진과 같이 자주 사용되는 appBar, Body, Bottom  Navigation Bar 에 대해 살펴 보겠습니다.

 ![property 예시](/flutter-study-week2/property.PNG)

#### Appbar
appBar 의 경우 최상단에 위치하고 있는 bar를 말하며 아래와 같은 코드로 간단히 생성할 수 있습니다.
```
class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('appBar Test'),),
      )
    );
  }
}
```

#### Body
그 다음으로 AppBar 아래에 있는 body 영역 입니다. body의 경우 하나만 가질 수 있으며 아래와 같은 코드로 생성 할 수 있습니다.
```
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
      appBar: AppBar(
        title: Text('appBar Test'),
      ),
      body: Text('body Test'),
    ));
  }
}
```
#### Bottom Navigation Bar
어플리케이션의 하단에 표시되는 여러 뷰를 선택할 수 있게 해주는 Bottom Navigation Bar의 코드입니다.
이 때 안에 들어갈 item 은 최소 2개 이상 지정해 주어야 합니다.

```
Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          appBar: AppBar(
            title: Text('appBar Test'),
          ),
          body: Text('boy Test'),
          bottomNavigationBar: BottomNavigationBar(
            items: <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                icon: Icon(Icons.home),
                title: Text('Home'),
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.business),
                title: Text('Business'),
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.school),
                title: Text('School'),
              ),
            ],
          ),
        ));
  }
```
이번 주차 강의에서는 대부분 안드로이드 스튜디오 설정과 플러터 설치 및 기본 구조에 대한 내용이 주를 이루었기 때문에 Scaffold에 대해 알아보는 시간을 가졌습니다.
