---
title: Flutter 스터디 4주차 
description: Flutter 스터디 4주차에 대한 내용입니다.
slug: flutter-study-week4
category: Application
author: MinJun Choi
---

* [The Complete 2021 Flutter Development Bootcamp with Dart](https://www.udemy.com/course/flutter-bootcamp-with-dart/) section 11 까지 본 뒤 진행 한 스터디 입니다.

#### Contents
1. #### Package
  * Package 란?
  * Package 사용법

2. #### 위젯의 함수화
  
3. ##### 그 외
 * _ (under bar) 의 의미
 * @override 의 의미



# 1. Package
### Package 란?
본 내용은 [Flutter 공식 홈페이지](https://docs.flutter.dev/development/packages-and-plugins/using-packages)를 인용한 내용입니다.

공식 홈의 내용에 따르면 Flutter & Dart Package는 pubspec file를 포함하고 있는 directory라고 합니다.

추가로 dependencies, Dart libraries, apps, resources, tests, images, examples 등 단순 코드 덩어리를 넘어서서 더 많은 내용들을 Package에 담을 수 있다고 합니다.

### Package 사용법
Package들은 [pub.dev](https://pub.dev/) 에 발표됩니다.
![pub dev](https://user-images.githubusercontent.com/26942349/148356037-0e3a3741-3fa9-4529-b658-309ed57fae89.png)

Flutter & Dart Package 중에 유명한 mobx를 예시로 들어보겠습니다.

mobx를 검색해보면 아래와 같은 페이지가 뜹니다.
![mobx](https://user-images.githubusercontent.com/26942349/148356387-5a4a3e64-3be8-4de9-95fd-b359c8e44ae0.png)
오른쪽에 있는 likes, pub points, popularity를 확인하면서 Package를 선택합니다.

![mobx2](https://user-images.githubusercontent.com/26942349/148357263-f146b0fc-2ba9-4f7a-9d44-3f3d8b7aa26a.png)
하단에 있는 Readme, Changelog, Example, Installing, Versions, Scores를 통해 이 Package와 관련된 모든 정보들을 확인할 수 있습니다. 

이번에는 Installing 위주로 해보겠습니다.
타 Package와는 세부내용들이 다를 수 있음을 알려드립니다.
하지만 위 사이트 Installing 내용만 따라가면 다 이해되실 내용입니다.

mobx 기준으로, 
pubspec.yaml 파일 내에서
```
dependencies:
  mobx: ^2.0.6+1
```
위와 같은 코드를 작성하고 pub get을 실행한 후,
Package를 실행할 .dart 파일에서
```
import 'package:mobx/mobx.dart';
```
위 코드를 실행하면 끝입니다.

# 2. 위젯의 함수화
Flutter를 사용하다보면 단순한 위젯의 반복이 필요할 때가 있습니다.
그럴 때는 타 언어와 같은 방식으로 공통된 부분을 함수화하여 똑같은 논리로 리팩토링을 해주면 됩니다.

너무 간단한 내용이라, 아래의 예시로 세부 설명을 대체하겠습니다. 

```
Expanded(
    child: FlatButton(
        color: Colors.red,
        onpressed: () {
        playSound(1);
        }
    )
),
Expanded(
    child: FlatButton(
        color: Colors.orange,
        onpressed: () {
        playSound(2);
        }
    )
),
Expanded(
    child: FlatButton(
        color: Colors.yellow,
        onpressed: () {
        playSound(3);
        }
    )
),
```
이와 같은 내용의 코드를 아래와 같이 수정가능합니다.

```
Expanded buildKey({Color color, int soundNumber}) {
    return Expanded(
        child: FlatButton(
            color: color,
            onpressed: () {
            playSound(soundNumber);
            }
        )
    )
}

buildKey(color: Colors.red, soundNumber: 1),
buildKey(color: Colors.orange, soundNumber: 2),
buildKey(color: Colors.yellow, soundNumber: 3),
```
여기서 알아야 할 점은,
함수를 선언할 때 Widget을 return하는 함수일 경우, 함수의 종류를 결정하는 맨 앞에 Widget의 종류를 적어줘야 합니다.
위 코드에서는 Expanded Widget을 return 하기 때문에 함수 선언 시 맨 앞에 void가 아닌 Expanded를 적어줬습니다.

# 3. 그 외
### _ (under bar) 의 의미
타 언어에서도 종종 사용되며, 변수 앞에 _를 붙이면 그 변수는 해당 파일 내에서만 수정이 가능해집니다.
코드가 길어지면서 실수로라도 발생할 데이터들의 손상을 방지하고자 이와 같은 방식을 사용합니다.

### @override 의 의미
__OOP의 Inheritance와 관련__
Class를 상속하는 과정에서 기존 class의 함수 일부분을 수정할 때 사용합니다.



