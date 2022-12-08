---
title: Flutter CH2. Flutter로 구성하는 UI 알아보기
description: Flutter에서 제공하는 기본 라이브러리를 이용한 UI 레이아웃 구성을 알아봅니다.
slug: flutter-project-2
category: Application
author: Yongmin Yoo
---

```dart
 print('Hello World!');
```

Google은 ```Flutter``` 의 기본 라이브러리로 직접 UI 위젯을 구성할 수 있도록 지원하고 있습니다.

애플리케이션이 실행되는 플랫폼의 OEM 위젯을 호출하던 다른 크로스플랫폼 라이브러리들과는 달리,
자체적으로 개발한 Skia 엔진을 이용해 애플리케이션에 구성된 레이아웃 위젯을 직접 렌더링하는 구조를 채택하고 있는데요,

오늘 포스팅에서는 이러한 레이아웃을 구성하기 위한 ```Flutter``` 의 기본 디자인 라이브러리에 대한 소개를 다루어보도록 하겠습니다.

### 1. 플랫폼별 디자인 컨셉 알아보기

```Flutter``` 에서 지원하는 디자인 라이브러리를 알아보기에 앞서, 현존하는 다양한 운영체제 플랫폼들 중,
가장 대표적인 3가지인 Android, iOS, Windows 각각의 디자인 컨셉에 대해 이야기해보고자 합니다.

#### Google Android : Material

먼저, Android의 경우는 지난 2014년 출시한 Material UI를 가이드라인으로 제시하고 있습니다.

<div style="display: flex; flex-direction: row;">
  <img width="30%" src="/flutter-project-2/android_holo.jpg">
  <img width="30%" src="/flutter-project-2/android_material_v1.png">
  <img width="30%" src="/flutter-project-2/android_material_v2.png">
</div>

<img width="95%" src="/flutter-project-2/android_material_v3.jpeg">

이전의 Android 시스템에서 제공했던 칙칙하고 딱딱했던 Holo UI에서 벗어나,
훨씬 깔끔하고 간결한 Material UI가 처음 등장했을 때 굉장히 좋아했던 기억이 나네요.

이 Material UI는 현재 V3 버전까지 여러번의 개선을 거쳐 점차 깔끔한 UI가 되어가고 있습니다.

특히, Material UI V3는 배경화면의 색상에 맞추어 시스템의 전반적인 색상이 조화롭게 변화하는 Material-You 디자인이 새로이 적용되기도 했습니다.

#### Apple iOS : Cupertino

iOS와 iPadOS에서는 Cupertino라는 이름으로 디자인 가이드라인을 제시하고 있습니다.

<div style="display: flex; flex-direction: row;">
  <img width="25%" src="/flutter-project-2/apple_ios6.png">
  <img width="25%" src="/flutter-project-2/apple_ios7.jpg">
  <img width="25%" src="/flutter-project-2/apple_ios11.png">
  <img width="25%" src="/flutter-project-2/apple_ios15.jpg">
</div>

지난 2013년의 iOS 7 업데이트 이후로 플랫한 느낌을 살리는 디자인이 채택되었는데,
그것을 기반으로 현재의 iOS 16까지 깔끔한 UI를 잘 유지해오고 있습니다.

#### Microsoft Windows Fluent

Microsoft의 Windows에서는 Fluent 라는 디자인 컨셉이 제시되고 있습니다.

일상에서 늘 쓰는 Windows UI 이지만 Fluent 라는 이름으로 접하니 아무래도 낯선 분들이 많을 것 같은데요,

<img width="75%" src="/flutter-project-2/ms_windows8.jpg">

<img width="75%" src="/flutter-project-2/ms_windows10.jpg">

<img width="75%" src="/flutter-project-2/ms_windows11.png">

Windows 8 에서 네모난 타일들로 이루어진 Metro UI를 처음 제시한 이후로,
Windows 10 에서 Fluent 라는 이름으로 탈바꿈하더니,
현재의 Windows 11 까지 점차 개선되는 모습을 보이고 있습니다.

### 2. Flutter에서 제공하는 디자인 라이브러리

앞서 3가지의 대표적인 디자인 컨셉을 소개해드렸는데요, 이들 중 ```Flutter``` 에서는 Material과 Cupertino에 대한 디자인 라이브러리가 기본적으로 제공되고 있습니다.

다른 크로스플랫폼 프레임워크에 비해 UI 통일성을 제공할 수 있다는 점에서 굉장한 장점이라고 할 수 있는데요,
그 예시로 ```React Native``` 와 한번 비교해보도록 하겠습니다.

```React Native``` 의 경우는, 기존에 ```React.JS``` 를 이용해서 웹 프론트엔드 개발을 해보신 분들이라면 익숙할 수 있는 형식으로 코드를 작성하게 됩니다.

하지만, 기본적으로는 별도의 디자인 라이브러리가 있는 것이 아닌,
컴파일 후 애플리케이션의 동작 과정에서 OS 플랫폼의 기본 OEM 위젯을 호출하는 방식으로 UI가 구성되는데요,

이렇게되면 애플리케이션과 OS 플랫폼 사이의 UI 통일성이 무너지게 되는 경우가 생기게 됩니다.

별도의 외부 라이브러리를 사용하지 않고 기본 위젯만으로 간단한 UI를 구성해보았음에도, 플랫폼에 따른 UI 차이가 발생함을 확인할 수 있습니다.

<img width="70%" src="/flutter-project-2/RN_1.png">

하지만 ```Flutter``` 에서는 UI를 구성하고 렌더링할 때 별도의 OEM 위젯을 호출하는 것이 아니라,
기본 라이브러리로 구현된 위젯을 호출하게 됩니다.

심지어, 기본 라이브러리로 Material과 Cupertino 모두를 지원하기에, 애플리케이션의 모든 부분에서 동일한 디자인 컨셉을 유지할 수 있다는 장점이 있죠.

아래 스크린샷은 ```Flutter``` 의 기본 라이브러리만으로 Material과 Cupertino 각각의 UI를 구현해본 예시입니다.

<div style="display: flex; flex-direction: row;">
  <img width="50%" src="/flutter-project-2/Flutter_Material_1.png">
  <img width="50%" src="/flutter-project-2/Flutter_Material_2.png">
</div>

<div style="display: flex; flex-direction: row;">
  <img width="50%" src="/flutter-project-2/Flutter_Cupertino_1.png">
  <img width="50%" src="/flutter-project-2/Flutter_Cupertino_2.png">
</div>

하지만 이렇게 모든 UI 위젯을 애플리케이션 런타임 내에서 렌더링하게되면, 가장 먼저 들 수 있는 생각이 아마 성능이 부족한 경우가 생기지 않을까 라는 생각인데요,

이를 위해서 Google이 자체적으로 개발한 Skia 그래픽 엔진을 이용하여, 성능상 문제를 해결하였습니다.

<!-- UI 렌더링 로직 비교 이미지 -->

```React Native``` 와는 다르게 모든 UI 위젯을 직접 렌더링해 통일성 문제를 해결하면서 동시에
```React Native``` 의 큰 단점이라고 꼽히는 렌더링 성능 문제까지 함께 해결한 것이죠.

### 번외 : 하나의 코드로 Android와 iOS에서 서로 다른 UI 표현하기

```Flutter``` 에서 기본 UI 라이브러리로 Material과 Cupertino 모두의 레이아웃 디자인을 지원하긴 하지만,
두 플랫폼을 모두 한 디자인으로 개발하게 된다면 OS 플랫폼의 디자인과 애플리케이션의 디자인 컨셉이 매칭되지 않는 결과물이 나오게 되겠죠,

그래서 ```Flutter``` 에서는 기본적으로 각 플랫폼을 구분할 수 있는 함수를 제공하고 있습니다.

다음 코드와 같이 ```Widget``` 을 구성할 때, ```dart:io``` 패키지에 기본적으로 포함되어 있는 ```Platform``` 클래스를 이용해
각 플랫폼을 인식하고 그에 따른 UI 표현을 다르게 구성할 수 있습니다.

```dart
class PlatformExample extends StatefulWidget {
  PlatformExample();
  @override
  _PlatformExampleState createState() => _PlatformExampleState();
}

class _PlatformExampleState extends State<PlatformExample> {
  @override
  Widget build(BuildContext context) {
    if (Platform.isAndroid) {
      // Material로 구현된 UI 함수가 반환되도록 지정
      return MaterialPage();
    }
    
    // Cupertino로 구현된 UI 함수가 반환되도록 지정
    return CupertinoPage();
  }
}
```

다음 스크린샷은 바로 위의 코드를 이용해서 Android 혹은 iOS인지를 구분해 각각 그에 맞는 UI 위젯을 표시하도록 구현해본 것입니다.

![Flutter UI with Conditional](/flutter-project-2/Flutter_Conditional.png)

### 마치며

오늘은 ```Flutter``` 에서 UI 레이아웃을 구현하는 방식, 그리고 그것을 실제 애플리케이션으로 렌더링하는 구조에 대해 알아보았는데요,

포스팅에서 소개했던 ```React Native``` 와 ```Flutter``` 앱의 예제 코드는 따로 제 깃허브에 업로드해두었으니, 필요하신 분들께서는 확인해보시면 좋을 것 같습니다.

[Flutter 예제 코드](https://github.com/yymin1022/GDSC_Flutter_UI_Test)

[ReactNative 예제 코드](https://github.com/yymin1022/GDSC_RN_UI_Test)

```dart
 print('Bye, World!');
```
