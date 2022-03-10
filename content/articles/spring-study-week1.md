---

title: 스프링 부트에서 JPA로 데이터베이스 다뤄보기
description: Spring Data Jpa를 활용한 RDB 관리에 대해 소개합니다.
slug: spring-study-week1
category: Back-End
author: IlGoo Yeo
featured: none

---

## 스터디 1주차(챕터3)

### JPA의 필요성

* 웹 애플리케이션에서 RDB는 빠질 수 없는 요소
* 하지만, RDB로 인해 2가지 문제점이 있음
* SQL 사용에 따른 단순 반복 작업이 늘어남
  + 현업에서 테이블이 너무 많기 때문에, 대부분의 코드가 SQL인 경우가 빈번

* 패러다임의 불일치

  + RDB(어떻게 데이터를 저장할 것인가) VS OOP(기능과 속성을 한 곳에서 관리)

  + 예시 코드(User와 Group이 부모-자식 관계임을 보여줌)

    ```java
    User user = findUser();
    Group group = user.getGroup();
    ```

  + DB를 추가(User와 Group의 관계와 상관없이 따로 조회)

    ```java
    User user = userDao.findUser();
    Group group = groupDao.findGroup(user.getGroupId());
    ```

  

> JPA는 OOP와 RDB를 중간에서 패러다임 일치를 시켜주기 위한 기술

* JPA를 통해 개발자는 객체지향적인 프로그래밍을 하면 JPA가 RDB에 맞게 SQL을 대신 생성하여 실행해줘 SQL에 종속적인 개발을 하지 않아도 됨
* 보다 자세한 건 ORM을 찾아보자



### Spring Data JPA

* 인터페이스인 JPA를 사용하기 위해서는 구현체가 필요
* Spring에서 구현체들을 좀 더 쉽게 사용하고자 추상화시킨 모듈이 Spring Data JPA
  + JPA <- Hibernate <- Spring Data JPA
* Hibernate를 안 쓰고 Spring Data JPA를 쓰는 이유는 크게 2가지
  + 구현체 교체의 용이성
    + Hibernate 외에 다른 구현체로 쉽게 교체 가능
  + 저장소 교체의 용이성
    + RDB 외에 다른 저장소로 쉽게 교체 가능
    + e.g. 트래픽이 증가하여 RDB를 MongoDB로 교체할 경우 Spring Data MongoDB로 의존성만 교체하면 됨
    + Spring Data의 하위 프로젝트들은 기본적인 CRUD의 인터페이스가 같기 때문에 가능



### 예제 요구사항

#### 게시판 기능

* 게시글 조회
* 게시글 등록
* 게시글 수정
* 게시글 삭제

#### 회원 기능

* 구글/네이버 로그인
* 로그인한 사용자 글 작성 권한
* 본인 작성 글에 대한 권리



### 프로젝트에 Spring Data JPA 적용

* build.gradle

```
    implementation('org.springframework.boot:spring-boot-starter-data-jpa') // Spring-boot용 Spring Data JPA 추상화 라이브러리
    // 인메모리 관계형 DB로 별도의 설치 없이 프로젝트 의존성만으로 관리 가능
    // 메모리에서 실행돼 앱을 재시작할 때마다 초기화되고, 이를 이용해 테스트 용도로 많이 사용
    implementation('com.h2database:h2')
```



* Post.java

```java
package com.jojoldu.book.springboot.domain.posts;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// 주요 어노테이션을 클래스에 가깝게
// Kotlin 등 새 언어 전환 시 불필요한 어노테이션(e.g. lombok의 어노테이션) 삭제에 용이
@Getter // 클래스내 모든 필드에 Getter 자동 생성
@NoArgsConstructor // 기본 생성자 추가
@Entity // 테이블과 링크될 클래스임을 나타냄
public class Posts
{
    @Id // 해당 테이블의 PK 필드
    @GeneratedValue(strategy = GenerationType.IDENTITY) // PK의 생성 규칙
    private Long id;

    // 테이블의 칼럼으로 굳이 선언하지 않더라도 해당 클래스의 필드는 모두 칼럼
    // 기본값 외 추가로 변경이 필요한 옵션이 있는 경우 사용
    @Column(length = 500, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    @Builder
    public Posts(String title, String content, String author)
    {
        this.title = title;
        this.content = content;
        this.author = author;
    }
}
```

*  Entity 클래스는 절대 Setter 메소드를 만들지 않음

  * 클래스의 인스턴스 값들이 언제 어디서 변해야 하는지 코드상으로 명확한 구분이 어려워지기 때문

  * 잘못된 예시

    ```java
    public class Order
    {
        public void setStatus(boolean status)
        {
            this.status = status;
        }
    }
    
    public void 주문서비스의_취소이벤트()
    {
        order.setStatus(false);
    }
    ```

  + 올바른 예시

    ```java
    public class Order
    {
        public void cancelOrder()
        {
            this.status = false;
        }
    }
    
    public void 주문서비스의_취소이벤트()
    {
        order.cancelOrder();
    }
    ```

* 기본적인 구조는 생성자를 통해 최종값을 채운 후 DB에 삽입하는 것

* 값 변경은 해당 이벤트에 맞는 public 메소드를 호출

* 여기서는 @Builder를 통해 제공되는 빌더 클래스를 사용

  * 지금 채워야 할 필드를 명확히 지정 가능

  * 생성자 예시

    ```java
    // 아래의 경우 new Example(b, a)처럼 a와 b의 위치를 변경해도 코드를 실행하기 전에는 문제를 찾을 수 없음
    public Example(String a, String b)
    {
        this.a = a;
        this.b = b;
    }
    ```

  + 빌더 패턴 예시

    ```java
    Example.builder()
        .a(a)
        .b(b)
        .build();
    ```

    

* PostsRepository.java

  ```java
  // Entity 클래스와 기본 Entity Repository는 항상 함께 위치
  
  package com.jojoldu.book.springboot.domain.posts;
  
  import org.springframework.data.jpa.repository.JpaRepository;
  
  public interface PostsRepository extends JpaRepository<Posts, Long>
  {
  }
  ```



### Spring Data JPA 테스트 코드 작성

* PostsRepositoryTest.java

  ```java
  package com.jojoldu.book.springboot.domain.posts;
  
  import org.junit.jupiter.api.AfterEach;
  import org.junit.jupiter.api.Test;
  import org.junit.jupiter.api.extension.ExtendWith;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.boot.test.context.SpringBootTest;
  import org.springframework.test.context.junit.jupiter.SpringExtension;
  
  import java.util.List;
  
  import static org.assertj.core.api.Assertions.assertThat;
  
  @ExtendWith(SpringExtension.class)
  @SpringBootTest
  public class PostsRepositoryTest
  {
      @Autowired
      PostsRepository postsRepository;
  
      // 단위 테스트가 끝날 때마다 수행되는 메소드를 지정
      // 배포 전 전체 테스트를 수행할 때 테스트간 데이터 침범을 막기 위해 사용
      @AfterEach
      public void cleanup()
      {
          postsRepository.deleteAll();
      }
  
      @Test
      public void savePost()
      {
          // given
          String title = "테스트 게시글";
          String content = "테스트 본문";
  
          postsRepository.save(Posts.builder() // 테이블 posts에 insert/update 쿼리 실행(id 값이 있으면 update, 없으면 insert)
                  .title(title)
                  .content(content)
                  .author("jojoldu@gmail.com")
                  .build());
  
          // when
          List<Posts> postsList = postsRepository.findAll(); // 테이블 posts에 있는 모든 데이터 조회
  
          // then
          Posts posts = postsList.get(0);
          assertThat(posts.getTitle()).isEqualTo(title);
          assertThat(posts.getContent()).isEqualTo(content);
      }
  }
  ```



 * application.properties(쿼리 로그를 보기 위해)

   ```
   spring.jpa.properties.hibernate.show_sql = true
   ```



### 등록/수정/조회 API 만들기

#### 비지니스 로직 처리에 대한 고찰

* API를 만들기 위해 총 3개의 클래스가 필요

  * Request 데이터를 받을 Dto
  * API 요청을 받을 Controller
  * **트랜잭션, 도메인 기능 간의 순서를 보장**하는 Service
* **Service에서 비지니스 로직을 처리할 필요 없음**
* [Spring 웹 계층](https://leveloper.tistory.com/14)

  * Web Layer
    * 흔히 사용하는 컨트롤러(@Controller)와 JSP/Freemarker 등의 뷰 템플릿 영역
    * 이외에도 필터(@Filter), 인터셉터, 컨트롤러 어드바이스(@ControllerAdvice) 등 **외부 요청과 응답**에 대한 전반적인 영역을 야기
  * Service Layer
    * @Service에 사용되는 서비스 영역
    * 일반적으로 Controller와 Dao의 중간영역에서 사용
    * @Transactional이 사용되어야 하는 영역
  * Repository Layer
    * **Database**와 같이 데이터 저장소에 접근하는 영역
    * 과거의 Dao와 유사

  * Dtos
    * **Dto**(Data Transfer Object)는 **계층 간의 데이터 교환을 위한 객체**를 이야기하며 Dtos는 Dto들의 영역
    * e.g. 뷰 템플릿 엔진에서 사용될 객체나 Repository Layer에서 결과로 넘겨진 객체 등

  * Domain Model
    * 도메인이라 불리는 개발 대상을 모든 사람이 동일한 관점에서 이해할 수 있고 공유할 수 있도록 단순화 시킨 것
    * e.g. 택시 앱에서 배차, 탑승, 요금 등이 모두 도메인
    * @Entity가 사용된 영역 역시 도메인 모델이다
    * 무조건 데이터베이스 테이블과 관계가 있어야만 하는 것은 아니다
    * VO처럼 값 객체들도 이 영역에 해당하기 때문

* 비지니스 로직 처리는 **Domain**에서 담당



#### 트랜잭션 스크립트 VS 도메인 모델

* 트랜잭션 스크립트

  ```java
  @Transactional
  public Order cancelOrder(int orderId)
  {
      OrderDto order = orderDao.selectOrders(orderId);
      BillingDto billing = billingDao.selectBilling(orderId);
      DeliveryDto delivery = deliveryDao.selectDelivery(orderId);
      
      String deliveryStatus = delivery.getStatus();
      
      if("IN_PROGRESS".equals(deliveryStatus))
      {
          delivery.setStatus("CANCEL");
          deliveryDao.update(delivery);
      }
      
      order.setStatus("CANCEL");
      orderDao.update(order);
      
      billing.setStatus("CANCEL");
      deliveryDao.update(billing);
      
      return order;
  }
  ```

  

* 도메인 모델

  ```java
  @Transactional
  public Order cancelOrder(int orderId)
  {
      Orders order = orderRepository.findById(orderId);
      Billing billing = billingRepository.findByOrderId(orderId);
      Delivery delivery = deliveryRepository.findByOrderId(orderId);
      
      delivery.cancel();
      
      order.cancel();
      billing.cancel();
      
      return order;
  }
  ```

  

* 두 방식의 차이점

  * 트랜잭션 스크립트
    * 모든 로직이 **서비스 클래스 내부에서 처리**
    * **서비스 계층이 무의미, 객체는 단순 데이터 덩어리 역할**
  * 도메인 모델
    * order, billing, delivery가 각자 본인의 취소 이벤트 처리
    * 서비스 메소드는 **트랜잭션과 도메인 간의 순서만 보장**



#### 등록 기능 추가

* PostsApiController.java

  ```java
  package com.jojoldu.book.springboot.web;
  
  import com.jojoldu.book.springboot.service.PostsService;
  import com.jojoldu.book.springboot.web.dto.PostsSaveRequestDto;
  import lombok.RequiredArgsConstructor;
  import org.springframework.web.bind.annotation.PostMapping;
  import org.springframework.web.bind.annotation.RequestBody;
  import org.springframework.web.bind.annotation.RestController;
  
  @RequiredArgsConstructor
  @RestController
  public class PostsApiController
  {
      private final PostsService postsService;
  
      @PostMapping("/api/v1/posts")
      public Long save(@RequestBody PostsSaveRequestDto requestDto)
      {
          return postsService.save(requestDto);
      }
  }
  ```



* PostsService.java

  ```java
  package com.jojoldu.book.springboot.service;
  
  import com.jojoldu.book.springboot.domain.posts.PostsRepository;
  import com.jojoldu.book.springboot.web.dto.PostsSaveRequestDto;
  import lombok.RequiredArgsConstructor;
  import org.springframework.stereotype.Service;
  import org.springframework.transaction.annotation.Transactional;
  
  @RequiredArgsConstructor
  @Service
  public class PostsService
  {
      private final PostsRepository postsRepository;
  
      @Transactional
      public Long save(PostsSaveRequestDto requestDto)
      {
          return postsRepository.save(requestDto.toEntity()).getId();
      }
  }
  ```

  * Bean을 주입받을 때 @Autowired 대신 생성자로 Bean 객체를 받음
  * 생성자는 lombok의 @RequiredArgsConstructor가 대신 생성해줌
    * 이로 인해 클래스의 의존성 관계가 변경될 때, 생성자 코드를 따로 수정하지 않아도 됨



* PostsSaveRequestDto

  ```java
  package com.jojoldu.book.springboot.web.dto;
  
  import com.jojoldu.book.springboot.domain.posts.Posts;
  import lombok.Builder;
  import lombok.Getter;
  import lombok.NoArgsConstructor;
  
  @Getter
  @NoArgsConstructor
  public class PostsSaveRequestDto
  {
      private String title;
      private String content;
      private String author;
  
      @Builder
      public PostsSaveRequestDto(String title, String content, String author)
      {
          this.title = title;
          this.content = content;
          this.author = author;
      }
  
      public Posts toEntity()
      {
          return Posts.builder()
                  .title(title)
                  .content(content)
                  .author(author)
                  .build();
      }
  }
  ```

  * Entity 클래스를 Request/Response 클래스로 사용해선 안 됨
    * Entity는 DB와 맞닿은 핵심 클래스로 여러 클래스에 영향을 끼침
    * Request/Response용 Dto는 View를 위한 클래스라 변경이 빈번
    * View Layer와 DB Layer는 역할 분리를 철저히 하는 게 좋음



* PostsApiControllerTest

  ```java
  package com.jojoldu.book.springboot.web;
  
  import com.jojoldu.book.springboot.domain.posts.Posts;
  import com.jojoldu.book.springboot.domain.posts.PostsRepository;
  import com.jojoldu.book.springboot.web.dto.PostsSaveRequestDto;
  import org.junit.jupiter.api.AfterEach;
  import org.junit.jupiter.api.Test;
  import org.junit.jupiter.api.extension.ExtendWith;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.boot.test.context.SpringBootTest;
  import org.springframework.boot.test.web.client.TestRestTemplate;
  import org.springframework.boot.web.server.LocalServerPort;
  import org.springframework.http.HttpStatus;
  import org.springframework.http.ResponseEntity;
  import org.springframework.test.context.junit.jupiter.SpringExtension;
  
  import java.util.List;
  
  import static org.assertj.core.api.Assertions.assertThat;
  
  @ExtendWith(SpringExtension.class)
  @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
  public class PostsApiControllerTest
  {
      @LocalServerPort
      private int port;
  
      @Autowired
      private TestRestTemplate restTemplate;
  
      @Autowired
      private PostsRepository postsRepository;
  
      @AfterEach
      public void tearDown() throws Exception
      {
          postsRepository.deleteAll();
      }
  
      @Test
      public void PostsRegister() throws Exception
      {
          //given
          String title = "title";
          String content = "content";
          PostsSaveRequestDto requestDto = PostsSaveRequestDto.builder()
                  .title(title)
                  .content(content)
                  .author("author")
                  .build();
  
          String url = "http://localhost:" + port + "/api/v1/posts";
  
          //when
          ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url, requestDto, Long.class);
  
          //then
          assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
          assertThat(responseEntity.getBody()).isGreaterThan(0L);
  
          List<Posts> all = postsRepository.findAll();
          assertThat(all.get(0).getTitle()).isEqualTo(title);
          assertThat(all.get(0).getContent()).isEqualTo(content);
      }
  }
  ```

  

#### 수정/조회 기능 추가

* PostsApiController.java

  ```java
  // 기존 import
  import com.jojoldu.book.springboot.web.dto.PostsResponseDto;
  
  @RequiredArgsConstructor
  @RestController
  public class PostsApiController
  {
      // 기존 코드
      
      @PutMapping("/api/v1/posts/{id}")
      public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto)
      {
          return postsService.update(id, requestDto);
      }
  
      @GetMapping("/api/v1/posts/{id}")
      public PostsReponseDto findById(@PathVariable Long id)
      {
          return postsService.findById(id);
      }
  }
  ```



* PostsResponseDto.java

  ```java
  package com.jojoldu.book.springboot.web.dto;
  
  import  com.jojoldu.book.springboot.domain.posts.Posts;
  import lombok.Getter;
  
  @Getter
  public class PostsResponseDto
  {
      private Long id;
      private String title;
      private String content;
      private String author;
  
      public PostsResponseDto(Posts entity)
      {
          this.id = entity.getId();
          this.title = entity.getTitle();
          this.content = entity.getContent();
          this.author = entity.getAuthor();
      }
  }
  ```

  

* PostsUpdateRequestDto.java

  ```java
  package com.jojoldu.book.springboot.web.dto;
  
  import lombok.Builder;
  import lombok.Getter;
  import lombok.NoArgsConstructor;
  
  @Getter
  @NoArgsConstructor
  public class PostsUpdateRequestDto
  {
      private String title;
      private String content;
  
      @Builder
      public PostsUpdateRequestDto(String title, String content)
      {
          this.title = title;
          this.content = content;
      }
  }
  ```

  

* Posts.java

  ```java
  public class Posts
  {
  	//기존 코드
      public void update(String title, String content)
      {
          this.title = title;
          this.content = content;
      }
  }
  ```




* PostsService.java

  ```java
  // 기존 import
  import com.jojoldu.book.springboot.web.dto.PostsResponseDto;
  import com.jojoldu.book.springboot.web.dto.PostsUpdateRequestDto;
  import com.jojoldu.book.springboot.domain.posts.Posts;
  
  @RequiredArgsConstructor
  @Service
  public class PostsService
  {
      // 기존 코드
          @Transactional
      public Long update(Long id, PostsUpdateRequestDto requestDto)
      {
          Posts posts = postsRepository.findById(id)
                  .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id="+ id));
  
          posts.update(requestDto.getTitle(), requestDto.getContent());
  
          return id;
      }
      
      @Transactional(readOnly = true)
      public PostsResponseDto findById(Long id)
      {
          Posts entity = postsRepository.findById(id)
                  .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));
  
          return new PostsResponseDto(entity);
      }
  }
  ```

  * update 기능에서 DB에 쿼리를 날리는 부분이 없음
    * JPA의 영속성 컨텍스트 때문
    * 영속성 컨텍스트는 엔티티를 영구 저장하는 환경으로, 일종의 논리적 개념
    * JPA의 엔티티 매니저가 활성된 사태로 트랜잭션 안에서 DB에서 데이터를 가져오면 이 데이터는 영속성 컨텍스트가 유지된 상태
      * 이 때 데이터의 값을 변경하면 트랜잭션이 끝나는 시점에서 해당 테이블에 변경분을 반영
      * 즉, Entity 객체의 값만 변경하면 별도의 Update 쿼리 불필요
      * 자세한 설명은 [더티체킹](https://jojoldu.tistory.com/415) 참고



* PublicApiControllerTest.java

  ```java
  @ExtendWith(SpringExtension.class)
  @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
  public class PostsApiControllerTest
  {
      // 기존 코드
       @Test
      public void PostsUpdate() throws Exception
      {
          //given
          Posts savedPosts = postsRepository.save(Posts.builder()
                  .title("title")
                  .content("content")
                  .author("author")
                  .build());
  
          Long updateId = savedPosts.getId();
          String expectedTitle = "title2";
          String expectedContent = "content2";
  
          PostsUpdateRequestDto requestDto = PostsUpdateRequestDto.builder()
                  .title(expectedTitle)
                  .content(expectedContent)
                  .build();
  
          String url = "http://localhost:" + port + "/api/v1/posts/" + updateId;
          HttpEntity<PostsUpdateRequestDto> requestEntity = new HttpEntity<>(requestDto);
  
          // when
          ResponseEntity<Long> responseEntity = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Long.class);
  
          // then
          assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
          assertThat(responseEntity.getBody()).isGreaterThan(0L);
  
          List<Posts> all = postsRepository.findAll();
          assertThat(all.get(0).getTitle()).isEqualTo(expectedTitle);
          assertThat(all.get(0).getContent()).isEqualTo(expectedContent);
      }
  }
  ```



#### 웹 콘솔에서 DB에 접근해보기

* application.properties

  ```java
  // 다음과 같이 수정
  spring.jpa.show-sql=true
  spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL57Dialect
  spring.jpa.properties.hibernate.dialect.storage_engine=innodb
  spring.datasource.hikari.jdbc-url=jdbc:h2:mem://localhost/~/testdb;MODE=MYSQL
  spring.h2.console.enabled=true
  ```



* 이후 http://localhost:8080/h2-console로 접속
* SQL로 데이터 조회, 추가
* http://localhost:8080/api/v1/posts/1으로 접속해 API 조회 기능 테스트



### JPA Auditing으로 생성시간/수정시간 자동화

* 보통 엔티티에는 데이터의 생성시간과 수정시간을 포함함

* 이 두 정보는 차후 유지보수에서 중요한 정보이기 때문

* 그렇다 보니 매번 DB에 삽입/갱신하기 전에 날짜 데이터를 등록/수정하는 코드가 사용됨

  ```java
  // 생성일 추가 코드 예시
  public void savePosts()
  {
  	// ...
      posts.setCreateDate(new LocalDate());
      postsRepository.save(posts);
  }
  ```

* 위의 과정을 JPA Auditing으로 자동화 가능

* Java8부터 등장한 LocalDate와 LocalDateTime 사용



#### LocalDate 사용

* BaseTimeEntity.java

  ```java
  package com.jojoldu.book.springboot.domain;
  
  import lombok.Getter;
  import org.springframework.data.annotation.CreatedDate;
  import org.springframework.data.annotation.LastModifiedDate;
  import org.springframework.data.jpa.domain.support.AuditingEntityListener;
  
  import javax.persistence.EntityListeners;
  import javax.persistence.MappedSuperclass;
  import java.time.LocalDateTime;
  
  @Getter
  @MappedSuperclass // JPA Entity 클래스들이 BaseTimeEntity를 상속할 경우, 필드들도 칼럼으로 인식되게 함
  @EntityListeners(AuditingEntityListener.class) // BaseTimeEntity 클래스에 Auditing 기능 포함
  public class BaseTimeEntity
  {
      @CreatedDate // Entity가 생성되어 저장될 때 시간이 자동으로 저장
      private LocalDateTime createdDate;
  
      @LastModifiedDate // 조회한 Entity의 값을 변경할 때 시간이 자동 저장
      private LocalDateTime modifiedDate;
  }
  ```



* Posts.java

  ```java
  public class Posts extends BaseTimeEntity {}
  ```



* Application.java

  ```java
  @EnableJpaAuditing // 어노테이션 추가하여 JPA Auditing 어노테이션들을 모두 활성화
  @SpringBootApplication
  public class Application
  {
      public static void main(String[] args)
      {
          SpringApplication.run(Application.class, args);
      }
  }
  ```

  

#### JPA Auditing 테스트 코드 작성하기

* PostsRepositoryTest.java

  ```java
  public class PostsRepositoryTest
  {
      // 기존 코드
      
      @Test
      public void registerBaseTimeEntity()
      {
          // given
          LocalDateTime now = LocalDateTime.of(2021, 11, 16, 0, 0, 0);
          postsRepository.save(Posts.builder()
                  .title("title")
                  .content("content")
                  .author("author")
                  .build());
  
          // when
          List<Posts> postsList = postsRepository.findAll();
  
          // then
          Posts posts = postsList.get(0);
  
          System.out.println(">>>>>>>>> create Date="+posts.getCreatedDate()+", modifiedDate="+posts.getModifiedDate());
  
          assertThat(posts.getCreatedDate()).isAfter(now);
          assertThat(posts.getModifiedDate()).isAfter(now);
      }
  }
  ```

