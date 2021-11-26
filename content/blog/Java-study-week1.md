---
title: Java 이해하기
description: Java 스터디 1주차에 대한 내용입니다.
slug: Java-study-week1
category: Back-End
author: HaKyoung Jung
datetime: 2021-11-26
---


### Java - Java의 기본 알기

#### Contents
1. #### Java 이란 무엇인가?  
    * Java 언어의 특징 
    
2. #### Java의 기본
    * Java의 구조
    * 기본사항

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
```
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
```
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
