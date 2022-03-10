---
title: Flutter 스터디 6주차 
description: Flutter 스터디 6주차에 대한 내용입니다.
slug: flutter-study-week6
category: Application
author: MinJun Choi
---

* [The Complete 2021 Flutter Development Bootcamp with Dart](https://www.udemy.com/course/flutter-bootcamp-with-dart/) section 13 까지 본 뒤 진행한 스터디 입니다.

#### Contents
1. #### Future, async, await
  * Future class
  * async, await keyword

2. #### Exception handling
  * try, catch
  
3. ##### 그 외
 * geolocator package
 * json converting



# 1. Future, async, await


![image](https://user-images.githubusercontent.com/26942349/150915534-67e86751-295b-4509-b399-48569c890d5e.png)

Dart와 같은 객체지향언어는 우리의 일상생활을 그대로 재현하기 위해 만들어진 언어입니다.

그렇기에 여러 문법들이 있는데,
Future, async, await는 Dart의 Asynchronous한 상황을 만들어주는 도구들입니다.

기본적으로 Dart는 Synchronous하게 작동합니다.
```
void performTask() {
    task1();
    task2();
    task3();
}
```
즉 위의 상황에서는 task1(), task2(), task3() 순서대로 함수가 실행이 됩니다.

그런데 만약 비동기적인 상황에서는 어떻게 코딩해줘야 할까요?

### Future class

상세 예제 코드입니다.
```
import 'dart:io';

void main() {
  performTask();
}

void performTask()  {
  task1();
  task2();
  task3();
}

void task1() {
  String result = 'task 1 data';
  print('Task 1 complete');
}

void task2() {
  String result = 'task 2 data';
  print('Task 2 complete');
}

void task3() {
  String result = 'task 3 data';
  print('Task 3 complete');
}
```

만약에 task2를 실행하는데 3초라는 시간이 걸리면 어떻게 될까요?

```
void task2() {
  Duration threeSeconds = Duration(seconds: 3);
  sleep(threeSeconds);
  String result = 'task 2 data';
  print('Task 2 complete');
}
```

그럼 task1이 먼저 재빠르게 실행되고, (Task 1 complete 출력)
바로 task2가 실행이 되겠지만 3초 뒤에 'Task 2 complete'이 출력이됩니다.
이에 따라 task3도 늦게 실행이 되죠.

지금은 코드가 짧아서 괜찮지만, 코드가 늘어나면 저 task2() 때문에 뒤에 오는 모든 코드들이 늦게 실행됩니다.

우리는 이걸 방지하기 위해 Future라는 class를 사용합니다.

Future은 일종의 영수증입니다.
우리는 햄버거 가게에서 결제를 하자마자 햄버거를 받지 않고 영수증을 받습니다.
하지만 우리는 좀 있으면 햄버거가 나온다는 것을 알죠.
![image](https://user-images.githubusercontent.com/26942349/150915810-7309c149-c12d-4ccb-91ce-18337a67a48b.png)

Future도 마찬가지로 이후에,
String이든, int든 어떠한 return 값을 받기로 한 일종의 약속입니다.

![image](https://user-images.githubusercontent.com/26942349/150915863-bc032df3-0ea0-4437-95e7-302268b19419.png)

그럼 다시 코드로 돌아와서,
task2의 delay를 비동기적으로 작동하게 하려면 아래와 같이 수정할 수 있습니다.

```
void task2() {
  Duration threeSeconds = Duration(seconds: 3);
  Future.delayed(
    threeSeconds,
    () {
      String result = 'task 2 data';
      print('Task 2 complete');
    },
  );
}
```

이렇게 되면 task1이 가장 먼저 실행되고, task2가 3초 기다리는 동안
task3는 눈치보지 말고 바로 실행이됩니다.
그리고 delay가 지나면 task2의 실행값이 나오게되죠.

### async, await keyword

그런데 task2의 결과물을 받아서 task3가 작동하게 될 경우에는 어떻게 해야할까요?
코드를 아래와 같이 바꿔줘보겠습니다.

```
import 'dart:io';

void main() {
  performTask();
}

void performTask() {
  task1();
  String task2Result = task2();
  task3(task2Result);
}

void task1() {
  String result = 'task 1 data';
  print('Task 1 complete');
}

String task2() {
  Duration threeSeconds = Duration(seconds: 3);
  String result = 'unprocessed data';
  Future.delayed(
    threeSeconds,
    () {
      result = 'task 2 data';
      print('Task 2 complete');
    },
  );
  return result;
}

void task3(task2Data) {
  String result = 'task 3 data';
  print('Task 3 complete with $task2Data');
}
```

task2는 String값인 result를 return하고 있고,
이를 받아서 task3가 작동합니다.

이 코드를 실행하게 되면 최종적으로,
'Task 3 complete with unprocessed data' 라는 문구가 출력이 되는데,

우리는 task3()가 task2()가 실행될 때까지 기다렸다가, result의 값이 바뀐 후에 전달받아,
'Task 3 complete with Task 2 complete' 라는 문구를 출력시키고 싶습니다.

이를 위해서는 await라는 키워드를 Future.delay 앞에 붙여줘서 delay함수가 작동할 때까지
기다려야한다는안내를 해줘야합니다.

또한 await라는 키워드는 async 키워드 안에서만 작동하기 때문에
{} 앞에 async를 붙여줘야합니다.

그리고 task2() 앞에 Future class로 바꿔줌으로써,
3초뒤, String값을 return할 것을 알려야합니다.

```
Future<String> task2() async {
  Duration threeSeconds = Duration(seconds: 3);
  String result = 'unprocessed data';
  await Future.delayed(
    threeSeconds,
    () {
      result = 'task 2 data';
      print('Task 2 complete');
    },
  );
  return result;
}
```

이 와 같은 논리와 방식으로,
performTask() 함수도 수정을 하면 전체 수정 코드는 아래와 같습니다.
```
import 'dart:io';

void main() {
  performTask();
}

void performTask() async {
  task1();
  String task2Result = await task2();
  task3(task2Result);
}

void task1() {
  String result = 'task 1 data';
  print('Task 1 complete');
}

Future<String> task2() async {
  Duration threeSeconds = Duration(seconds: 3);
  String result = 'unprocessed data';
  await Future.delayed(
    threeSeconds,
    () {
      result = 'task 2 data';
      print('Task 2 complete');
    },
  );
  return result;
}

void task3(task2Data) {
  String result = 'task 3 data';
  print('Task 3 complete with $task2Data');
}
```

그럼 실행 화면은 아래와 같이 나옵니다.


![image](https://user-images.githubusercontent.com/26942349/150916143-fafffde0-8257-4969-9f8a-db018657ec53.png)


# 2. Exception handling
### try, catch

Dart에서도 타 언어와 마찬가지로 예외처리를 해줘야합니다.
try, catch 혹은 try, on, catch와 같은 구조로 사용되며,
Section 13에는 아래와 같은 예제와 함께 사용됐습니다.

```
String myMargin = ‘abc’;
double myMarginAsDouble;

try {
    myMarginAsDouble = double.parse(myMargin);
}
catch (e) {
    print(e);
}

return Scaffold(
    body: Container(
    margin: EdgeInsets.all(myMarginAsDouble ?? 30.0),
    ),
);
```

# 3. 그 외
### geolocator package
Section 13에서는 geolocator package를 기반으로 한 위치별 현재 날씨 API를 가져와 보여줬습니다.

정확한 위치가 아닌 어느정도 오차가 있는 위치 정보가 필요했기 때문에 아래와 같이 코드를 작성해줬습니다.
```
Geolocator().getCurrentPosition(desiredAccuracy: LocationAccuracy.low);
```

코드 후반에 작성된 low 이외 high, best 등에 따라 위치 정확도가 달라지고 또한 기기의 배터리 사용량도 달라진다고 합니다.

### json converting
날씨 API를 가져올 때 json 형식의 파일로부터 data를 추출했는데 이 과정에서
dart:convert package를 사용했습니다.

data 접근 방식은 dictionary에 접근하는 방식과 유사하게 아래 코드와 같이 작성됐습니다.
```
var longitude = jsonDecode(data)[‘word’][‘lon’];
```



