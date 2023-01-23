---
title: Flutter CH3. Flutter에서 Firebase 사용하기
description: Flutter에서 Firebase를 사용하는 방법을 알아봅니다.
slug: flutter-project-3
category: Application
author: Juhyeong Lee
---

```dart
print("Hello World!");
```

Google Solution Challenge를 진행중이시거나, 

개인 프로젝트를 해본 경험이 있으시다면 한번쯤 Firebase를 만나보셨을텐데요.

오늘 다뤄볼 내용은 Firebase를 이용하여 Flutter 앱을 더 편리하게 개발하는 방법입니다.

Firebase를 이용하여 Flutter 앱에 대응하는 백엔드 서비스를 구성한다면,  다양한 기능을 이용하기 위해 

어려운 구현을 할 필요가 없어, 간단하게 사용할 수 있는 장점이 있습니다.

그 중에서 여러분이 Flutter 앱 개발을 하며 사용할만한 기능 두 가지 정도를 소개해드리려고 하는데요.

Cloud Firestore과 Firebase Cloud Messaging 입니다.

Flutter에서 Firebase를 이용하시려면, 먼저 [이곳](https://firebase.google.com/docs/flutter/setup)에서 Firebase SDK를 설치해주세요 :) 

 

## 1. User auth & Data storage

Firebase에는 다양한 기능을 사용하려면 먼저 Flutter에서 Firebase 인증을 마쳐야 합니다.

Firebase 인증을 위해선, firebase_auth 패키지를 사용합니다.

firebase_auth를 사용하려면, 패키지를 가져와 Firebase 프로젝트의 API키로 초기화해야 합니다. 

```dart
import 'package:firebase_auth/firebase_auth.dart';

final FirebaseAuth _auth = FirebaseAuth.instance;

String email = 'example@email.com';
String password = 'password';

try{
  final FirebaseUser user = (await _auth.signInWithEmailAndPassword(
    email: email,
    password: password,
  )).user;
  print(user);
} catch(e){
  print(e);
}
```

Firebase 인증을 위한 과정을 마쳤다면, 앞서 설명드린 기능을 사용할 준비가 되었네요!

이제 Cloud Firestore를 사용해볼 차례입니다.

마찬가지로 cloud_firestore를 사용하려면 패키지를 가져와, Firebase 프로젝트의 API키로 초기화해야 합니다. 

이후에 제공된 함수를 사용하면, Firestore 데이터베이스에서 데이터를 생성하거나 볼 수 있고, 

수정하는 것도 가능합니다.

```dart
import 'package:cloud_firestore/cloud_firestore.dart';

final Firestore _firestore = Firestore.instance;

String name = 'Gildong Hong';
int age = 25;

try{
  _firestore.collection('users').document('user_id').setData({
    'name': name,
    'age': age,
  });
  print('Data saved successfully');
} catch(e){
  print(e);
}
```

## 2. Firebase Cloud Messaging

다음으로 설명드릴 내용은, Firebase를 이용한 메시지 알림 서비스입니다.

Firebase Cloud Messaging을 이용하여 모바일 디바이스로 푸시 알림을 보내봅시다!

해당 기능을 이용하려면, Flutter앱 프로젝트에 firebase_messaging 패키지를 추가해야 합니다. 

패키지와 사용자 인증에 대한 정보가 정상적으로 설정되면, FirebaseMessaging 객체를 이용해, 

메시지와 알림을 보낼 수 있습니다.

```dart
import 'package:firebase_messaging/firebase_messaging.dart';

final FirebaseMessaging _firebaseMessaging = FirebaseMessaging();

_firebaseMessaging.configure(
  onMessage: (Map<String, dynamic> message) async {
    print("onMessage: $message");
  },
  onLaunch: (Map<String, dynamic> message) async {
    print("onLaunch: $message");
  },
  onResume: (Map<String, dynamic> message) async {
    print("onResume: $message");
  },
);

_firebaseMessaging.subscribeToTopic('all');
```

위의 코드에서 onMessage, onLaunch, 그리고 onResume는 여러 상황에서 메시지를 앱이 처리할 수 있도록 정의한 것입니다.

앱이 닫혀 있거나, 백그라운드에서 실행 중일 때, 혹은 앱을 사용자가 사용 중일 때 모두 알림을 보내기 위함입니다.

이러한 조건들 이외에도, 앱에서 푸쉬를 처리하기 위한 상황에는 몇가지 예외가 더 있을 수 있습니다. 

그럴 경우 앱이 동작하는 상황을 전체적으로 고려해서 구현하는 것을 권장드립니다.

## 번외…

Firebase의 auth와 cloud_firestore, 그리고 FCM 이외에도 유용한 패키지 혹은 플러그인들이 많습니다. 

그 중 대표적인 것들 몇가지를 정리해드리면 다음과 같습니다.

1. Googld 지도 : google_maps_flutter package를 이용하면 구글 지도를 간단하게 Flutter 앱에 적용할 수 있습니다.
2. Image Picker : image_picker 패키지를 이용하면 사용자의 디바이스 갤러리에서 사진을 선택하거나, 새로운 사진을 촬영해서 업로드할 수 있도록 돕습니다.
3. Video Player : video_player 패키지를 사용하면, Flutter 앱에서 동영상을 재생할 수 있도록 돕고, 설정값에 따라 다양한 정보를 표시할 수 있도록 합니다.

이외에도 찾아보시면 더 많은, 유용한 패키지들을 확인하실 수 있습니다.

## 마치며

오늘은 Flutter에서 Firebase를 적용하는 방법에 대해 알아보았는데요, 더 자세한 내용이 궁금하시다면 아래의 Firebase 공식문서에서 확인해보시면 좋을 것 같습니다.

[Firebase 공식문서](https://firebase.google.com/docs/auth/flutter/start)

```dart
print('Bye,World!');
```