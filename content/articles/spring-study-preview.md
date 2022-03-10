---

title: 스프링 부트 시작 & 테스트 코드 작성하기
description: 스프링 부트 프로젝트 시작 및 테스트 코드 작성에 대해 소개합니다.
slug: spring-study-preview
category: Back-End
author: IlGoo Yeo
featured: Featured
img: spring.png

---

## 1. 스터디에 대한 소개

* 스프링 스터디
* [스프링 부트와 AWS로 혼자 구현하는 웹 서비스](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788965402602)로 진행
* 또는 [저자블로그](https://jojoldu.tistory.com/463) 참고
* 챕터3부터 같이 진행



## 2. 스터디 진행 이전 내용에 대한 요약

### 챕터1

* 인텔리제이 설치 및 환경설정
* 그레이들 프로젝트 생성 후, 스프링 프로젝트로 변경
* Git & .ignore 설정



### 챕터2

* 테스트코드 작성에 대한 학습(TDD가 아닌, 단위테스트)
* 단위 테스트 코드는 하기와 같은 이점이 있다
  + 개발단계 초기에 문제를 발견하게 도와줌
  + 코드 리팩토링이나 라이브러리 업그레이드 등에서 기존 기능이 올바르게 작동하는지 확인할 수 있음(e.g. 회귀테스트)
  + 기능에 대한 불확실성을 감소
  + 시스템에 대한 실제 문서를 제공. 즉, 단위 테스트 자체가 문서가 될 수 있음
* 즉 테스트 코드는
  * 코드 수정사항에 대해 **빠른 피드백**이 가능하고
  * 사람이 눈으로 검증하지 않게 **자동검증**이 가능하며
  * 새로운 기능이 추가될 때, **기존 기능이 잘 작동되는 것을 보장**해준다

* TDD에 대해서는 [TDD 실천법과 도구](https://repo.yona.io/doortts/blog/issue/1) 참고
* JUnit을 사용하여 테스트 코드 작성
* Lombok 설치 및 기존 프로젝트를 Lombok 코드로 전환



### Version

* JDK: 16
* Gradle: 7.1
* Spring-boot: 2.4.1



### 챕터1, 2까지의 코드

#### build.gradle

* gradle 문법에 대한 자세한 설명은 [이 링크](https://webfirewood.tistory.com/129)로

```
// 프로젝트 빌드를 위해 필요한 플러그인들을 지정해주는 블록
// 플러그인들은 필요한 과정들을 task로 포함하고 있고, 빌드시에는 필요한 과정들을 내부 task가 진행해줌.
plugins{
    id 'org.springframework.boot' version '2.4.1'
    id 'io.spring.dependency-management' version '1.0.10.RELEASE'
    id 'java'
}

group 'com.jojoldu.book'
version '1.0.4-SNAPSHOT-'+new Date().format("yyyyMMddHHmmss")

// 각종 의존성(라이브러리)들을 어떤 원격 저장소에서 받을지를 결정
// 기존적으로 mavenCentral을 많이 사용하지만, 라이브러리 업로드 난이도 때문에 jcenter도 많이 사용
repositories {
    mavenCentral()
    jcenter()
}

test {
    useJUnitPlatform()
}

// 의존성에 대한 설정들을 관리하는 프로퍼티로 필요한 라이브러리 등의 정보를 기술하여 참조
// implementation: 컴파일 할 때 접근, testImplementation: 테스트를 컴파일할 때 접근
// compileOnly: 컴파일시에만 사용, runtimeOnly: 런타임시에만 사용
dependencies {
    // spring boot
    implementation('org.springframework.boot:spring-boot-starter-web')
    testImplementation('org.springframework.boot:spring-boot-starter-test')
    implementation('org.springframework.boot:spring-boot-starter-mustache')

    //lombok
    compileOnly 'org.projectlombok:lombok:1.18.20'
    annotationProcessor 'org.projectlombok:lombok:1.18.20'
    testCompileOnly 'org.projectlombok:lombok:1.18.20'
    testAnnotationProcessor 'org.projectlombok:lombok:1.18.20'
}
```



#### Application.java

```java
package com.jojoldu.book.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application
{
    public static void main(String[] args)
    {
        SpringApplication.run(Application.class, args);
    }
}
```



#### HelloController.java

```java
package com.jojoldu.book.springboot.web;

import com.jojoldu.book.springboot.web.dto.HelloResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@ RestController // 컨트롤러를 JSON을 반환하는 컨트롤러로 만들어 줌
public class HelloController
{
    @GetMapping("/hello") // HTTP Method인 Get의 요청을 받을 수 있는 API로 만들어 줌
    public String hello()
    {
        return "hello";
    }

    @GetMapping("/hello/dto")
    // @RequestParam은 외부에서 API로 파라미터를 가져오는 어노테이션
    // 외부에서 "name"이란 이름으로 넘긴 파라미터를 메소드 파라미터 name에 저장
    public HelloResponseDto helloDto(@RequestParam("name") String name, @RequestParam("amount") int amount)
    {
        return new HelloResponseDto(name, amount);
    }
}
```



#### HelloControllerTest.java

```java
package com.jojoldu.book.springboot.web;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// 테스트를 진행할 때 JUnit에 내장된 실행자 외에 다른 실행자를 실행
// 스프링 부트 테스트와 JUnit 사이에 연결자 역할
@ExtendWith(SpringExtension.class)
// 여러 스프링 테스트 어노테이션 중, Web(Spring MVC)에 집중할 수 있는 어노테이션으로 아래 내용만 스캔함
// @Controller, @ControllerAdive, @JsonComponent, Converter, GenericConverter, Filter, HandlerInterceptor
@WebMvcTest(controllers = HelloController.class)

public class HelloControllerTest
{
    @Autowired // 스프링이 관리하는 빈(Bean)을 주입 받음 
    private MockMvc mvc; // 웹 API를 테스트할 때 사용하는 클래스로 HTTP GET, POST 등의 API 테스트 가능

    @Test // 테스트 코드 표시
    public void returnHello() throws Exception
    {
        String hello = "hello";

        mvc.perform(get("/hello")) // MockMVC를 통해 /hello 주소로 HTTP GET 요청
                .andExpect(status().isOk()) // mvc.perform의 결과를 검증하는데, HTTP Header의 Status를 검증하는 역할
                .andExpect(content().string(hello)); // 응답 본문의 내용을 검증하는 역할(이 경우에는 hello가 리턴 되는지)
    }

    @Test
    public void returnHelloDto() throws Exception
    {
        String name = "hello";
        int amount = 1000;

        mvc.perform(
                get("/hello/dto")
                        .param("name", name) // API를 테스트할 때 사용될 요청 파라미터를 설정
                        .param("amount", String.valueOf(amount)) // 값은 무조건 String으로 다른 타입일 시 타입 변환해 사용
        ).andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is(name))) // jsonpath는 응답값을 필드별로 검증할 수 있는 메소드
                .andExpect(jsonPath("$.amount", is(amount))); // $를 기준으로    필드명을 명시
    }
}
```



#### HelloResponseDtoTest.java

```java
package com.jojoldu.book.springboot.web.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class HelloResponseDtoTest
{
    @Test
    public void lombokTest()
    {
        String name = "test";
        int amount = 1000;

        HelloResponseDto dto = new HelloResponseDto(name, amount);

        // assertj라는 테스트 검증 라이브러리의 검증 메소드로 검증하고 싶은 대상을 메소드 인자로 받음
        // assertThat에 있는 값이 isEqaulTo의 값과 같을 때만 성공
        assertThat(dto.getName()).isEqualTo(name);
        assertThat(dto.getAmount()).isEqualTo(amount);
    }
}
```



