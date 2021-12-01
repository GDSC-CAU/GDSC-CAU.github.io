---
title: Java 이해하기
description: Java 스터디 1주차에 대한 내용입니다.
slug: Java-study-week1
category: Back-End
author: Hakyoung Jung
---


### Java - Java의 기본 알기

#### Contents
1. #### Java 이란 무엇인가?  
    * Java 언어의 특징 
    
2. #### Java의 기본
    * Java의 구조
    * 기본사항
    * 자료형(Data Type)

#
#### 1. Java이란 무엇인가?

Java는 가장 많이 쓰이는 프로그래밍 언어 중 하나로, 1995년 미국의 'Sun Microsystems'에서 개발한 프로그래밍 언어이자 개발 플랫폼이다. 현재는 'Oracle' 사가 'Sun Microsystems'를 인수하여 'Oracle'에서 Java를 배포하고 있다.

#### Java의 특징
다음은 Java의 기본적인 특징들이다.

* 간결하다
* 객체지향 언어(OOP, Object Oriented Programming)
* 컴파일(Compile) 언어 + 인터프리터(Interpreter) 언어
* Open Source 언어, 따라서 오픈소스 라이브러리가 풍부하다
* 자동 메모리 정리 기능(Garbage Collector)
* 분산환경 지원
* 동적 로딩(Dynamic Loading) 지원

#
#### 2. Java의 기본

Java를 본격적으로 시작하기에 앞서,  Java의 기본적인 구조와 문법에 대해 짚고 넘어가보도록 하겠다.

#### Java의 구조

Java는 객체지향 프로그래밍 언어이기 때문에, 기본적으로 클래스 구조에서 시작한다. 클래스는 객체를 만드는 기능을 가진다.
    + '클래스(class)'는 '과자틀', '객체(object)'는 '과자틀에 의해 만들어진 과자'라고 이해하면 쉽다.
    + 이에 대해서는 이후에 더 자세히 알아보도록 하자.
```java
// 클래스 선언
public class Test { // 클래스 안에 변수, 메소드(함수), 상수 등의 요소 작성

    // main 메소드(method): 프로그램의 시작
    public static void main(String[] args) {
        System.out.printIn("Hello World");
        ...
    }
}
```

#### 기본사항

다음은 Java를 사용할 때 알아야 하는 가장 기본적인 것들이다.

* 변수명: 1) 숫자로 시작할 수 없다 2) _(underscore) 와 $ 문자 이외의 특수문자는 사용할 수 없다 3) 자바의 키워드는 변수명으로 사용할 수 없다 (예: int, class 등)
* 자료형(Type): 자바에서 사용할 수 있는 자료형은 두 가지이다.
1) 일반 자료형 (예: int, string, boolean 등)
2) 사용자 정의 자료형 
* 주석: 자바에서 사용할 수 있는 주석은 두 가지이다.
1) 라인주석(//)
2) 블록주석(/* */)
```java
/*
이 프로그램의 저작권은 000에게 있습니다.
Copyright 2021.
*/
public class Test { // 클래스 안에 변수, 메소드(함수), 상수 등의 요소 작성
}
```
* main 메소드: 프로그램의 시작
    + main 메소드가 없는 경우, 프로그램을 단독으로 수행 불가
    + 한 클래스 안에 두 개의 메인 메소드 존재 불가

#### 자료형(Data Type)

자료형은 프로그램의 기본이자 핵심적인 단위이다. 따라서 Java에서 사용하는 자료형들에 대해 정리해보고자 한다. 

Java에서 사용하는 자료형은 다음 표로 정리할 수 있다.

![Java 자료형](/java-study-week/01.png)

* 숫자 자료형: 숫자 형태로 이루어진 자료형 ex) 정수, 실수, (드문 경우)8진수, 16진수 등

아래 코드를 통해 숫자 자료형이 어떻게 사용되는지 알아보자.

```java
 // 숫자 자료형
    // 정수
    int member = 20; // 보편적으로 쓰이는 정수 자료형
    long countOfStar = 8764827384923849L; // int 자료형의 최대값보다 큰 경우 마지막에 'L' 혹은 'l'을 붙여야 함

    int octal = 023; // 8진수
    int hex = 0xC; // 16진수
    
    // 실수
    float f = 123.4F; // 접미사 'F' 혹은 'f'를 붙여야 함
    double d = 123.45; 
```
* 부울 자료형: 참 또는 거짓의 값을 가지는 자료형, boolenan으로 표현한다.

* 문자와 문자열 자료형: 한 개의 문자값은 char / 문자열(문장)은 String을 이용하여 표현한다.

아래 코드를 통해 부울, 문자, 문자열 자료형이 어떻게 사용되는지 알아보자.
```java
    // 부울 자료형
    boolean isGDSC = true;
    // 조건문에서의 사용
    boolean isTest = grade > 90;

    if (isTest) {
        System.out.println("점수가 90점 이상입니다.");
    }
    
    // 문자 자료형
    char a1 = 'a'; // 문자값
    char a2 = 97; // 아스키코드값
    char a3 = '\u0061'; // 유니코드값
    
    // 문자열 자료형
    String a = "Hello GDSC";
```
+ primitive(원시) 자료형 ex) int, long, double, float, boolean, char 등 은 new 키워드로 생성될 수 없고 literal로 값을 세팅할 수 있다. 
+ String은 literal로 표기가 가능하지만 primitive 자료형은 아니다.

```java
boolean result = true;
char capitalC = 'C';
int i = 100000;

String a = "Happy Java"; // String은 primitive 자료형은 아니다.
String a = new String("Happy Java");
```
* 배열(Array): Java에서 배열은 자료형[] 으로 쓸 수 있다. 배열은 자료형의 "집합"을 의미한다.
    + int[] evens = {2,4,6,8};
    + String[] members={"a", "b", "c", "d"}; 
    + 배열의 길이는 고정되어 있다.
    ```java
    String[] members = new String[4];
    members[0] = "a";
    members[1] = "b";
    members[2] = "c";
    members[3] = "d";
    ```
    + 배열의 값은 인덱싱을 이용하여 접근한다.
     ```java
    String[] members={"a", "b", "c", "d"}; 
    System.out.println(members[2]);
     ```
    + for문으로 배열값을 돌리는 경우 배열의 길이만큼 for문을 돌려야 한다.
     ```java
    String[] members = {"a", "b", "c", "d"};
    for (int i=0; i<members.length; i++) {
        System.out.println(members[i]);
    }
    ```
* 리스트(List) 자료형: 배열과 유사한 자료형이다. 리스트는 배열과 달리 동적으로 요소를 추가할 수 있다. 
    + List 자료형은 인터페이스(Interface)이며, 이에 대해선 이후에 더 자세히 알아보도록 하자.
    + List를 이용한 자료형에는 ArrayLisr, LinkedList 등이 있다.
     ```java
    import java.util.ArrayList;

    public class ExList {
        public static void main(String[] args) {
            ArrayList<String> members = new ArrayList<String>();
            members.add("A");
            members.add("B");
            members.add("C"); // 총 3명의 멤버, A,B,C 저장

            System.out.println(members.get(1)); // 2번째 인덱스 값 추출
            System.out.println(members.size()); // ArrayList의 갯수 return
            System.out.println(members.contains("D")); // 리스트 내 멤버 D
            가 존재하는지 유무 판별(True/False)

            System.out.println(members.remove("A")); // 객체 항목 삭제
            System.out.println(members.remove(0)); // 해당 인덱스 항목 삭제 후 삭제 항목 return
        }
    }
    ```

* 맵(Map): Java에서 Map은 key(people)와 value(사람)의 대응관계를 표현하는 자료형이다.
    + key로 value를 얻어낸다. (순차적 검색 x) 
    + 이에 대해선 이후에 더 자세히 알아보도록 하자.

* 제너릭스(Generics): 자료형<String>과 같은 형태

    + ArrayList<String> aList = new ArrayList<String>(); // ArrayList 안에 담을 수 있는 자료형은 String 자료형만 가능하다.
    + 이에 대해선 이후에 더 자세히 알아보도록 하자.


+ 본 내용은 점프 투 자바(https://wikidocs.net/book/31)를 참고하여 작성하였습니다.