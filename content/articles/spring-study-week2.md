---

title: 머스테치로 화면 구성해보기
description: 서버 템플릿 엔진과 머스테치를 활용한 화면 구성에 대해 소개합니다.
slug: spring-study-week2
category: Back-End
author: IlGoo Yeo
featured: none

---

## 스프링 스터디 2주차(챕터4)

### 서버 템플릿 엔진과 머스테치

#### 템플릿 엔진이란

* 지정된 템플릿 양식과 데이터가 합쳐져 HTML 문서를 출력하는 소프트웨어

* e.g. JSP, Freemaker, React, Vue

* JSP나 Freemaker는 서버 템플릿 엔진, React와 Vue는 클라이언트 템플릿 엔진이라고 불림

* 자바스크립트에서 JSP나 Freemaker처럼 자바 코드를 사용할 수 있을까?

  ```javascript
  <script type = "text/javascript">
  
  $(document).ready(function(){
     if(a=="1") {
         <%
             System.out.println("test"); // if문 상관없이 항상 test가 출력
         %>
     }
  });
  ```

  

* 서버 템플릿 엔진은 서버에서 구동

  * 서버에서 Java코드로 문자열을 만듦
  * 문자열을 HTML로 변환하여 브라우저로 전달
  * HTML을 만드는 과정에서 `System.out.println("test");`을 실행할 뿐이며, 이때 js는 단순 문자열

* 그러나 js는 브라우저 위에서 작동

  * 위의 js코드가 실행되는 장소는 서버가 아닌 브라우저
  * 즉, 브라우저에서 작동될 때는 서버 템플릿 엔진의 영향력을 벗어나 제어가 불가능

* Vue.js나 React.js를 이용한 SPA(Single Page Application)는 브라우저에서 화면 생성

  * 즉, 서버에서 이미 코드가 벗어난 경우
  * 서버에서는 json 혹은 Xml 형식의 데이터만 전달하고 클라이언트에서 조립

* 서버 사이드 렌더링

  * 자바스크립트 프레임워크의 화면 생성 방식을 서버에서 실행하는 것
  * V8 엔진 라이브러리들이 지원



#### 머스테치

* 다양한 언어를 지원하는 템플릿 엔진
* JSP와 같이 HTML을 만들어 줌
* 기존 템플릿 엔진들의 단점
  * JSP, Velocity
    * 스프링 부트에서 권장하지 않음
  * Freemaker
    * 자유도가 높고 과하게 많은 기능
    * 숙련도가 낮을 경우 Freemaker 안에 비즈니스 로직이 추가될 확률 있음
  * Thymeleaf
    * 스프링 진영에서 밀고 있는데 문법이 어렵다
    * 자바스크립트 프레임워크 배우는 기분
    * Vue.js 사용 경험이 있어 애크 속성 방식이 익숙하면 나쁘지 않음
* 머스테치의 장점
  * 문법이 간단하다
  * 로직 코드를 사용할 수 없다
    * View와 서버의 역할 구분이 명확
  * Mustache.js와 Mustache.java 2가지가 다 존재
    * 하나의 문법으로 클라이언트/서버템플릿 모두 사용 가능

### 기본 페이지 만들기

* build.gradle

  ```
  implementation('org.springframework.boot:spring-boot-starter-mustache')
  ```



* index.mustache

  ```html
  <!DOCTYPE HTML>
  <html>
  <head>
      <title>스프링 부트 웹서비스</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
      <h1>스프링 부트로 시작하는 웹 서비스</h1>
  </body>
  </html>
  ```



* IndexController.java

  ```java
  package com.jojoldu.book.springboot.web.dto;
  
  import org.springframework.stereotype.Controller;
  import org.springframework.web.bind.annotation.GetMapping;
  
  @Controller
  public class IndexController
  {
      @GetMapping("/")
      public String index()
      {
          return "index";
      }
  }
  ```

  * 머스테치 스타더 덕분에 컨트롤러에서 문자열을 반환할 때, 앞의 경로와 뒤의 파일 확장자는 자동으로 지정됨
    * 앞의 경로는 src/main/resources/templates
    * 뒤의 파일 확장자는 .mustache
    * 여기선 "index"가 리턴
  * 따라서, src/main/resources/templates/index.mustache로 전환되어 View Resolver가 처리
    * View Resolver는 URL 요청의 결과를 전달할 타입과 값을 지정해줌

* IndexControllerTest.java

  ```java
  package com.jojoldu.book.springboot.web;
  
  import org.junit.jupiter.api.Test;
  import org.junit.jupiter.api.extension.ExtendWith;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.boot.test.context.SpringBootTest;
  import org.springframework.boot.test.web.client.TestRestTemplate;
  import org.springframework.test.context.junit.jupiter.SpringExtension;
  
  import static org.assertj.core.api.Assertions.assertThat;
  import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
  
  @ExtendWith(SpringExtension.class)
  @SpringBootTest(webEnvironment = RANDOM_PORT)
  public class IndexControllerTest
  {
      @Autowired
      private TestRestTemplate restTemplate;
  
      @Test
      public void loadMainPage()
      {
          // when
          String body = this.restTemplate.getForObject("/", String.class);
  
          // then
          assertThat(body).contains("스프링 부트로 시작하는 웹 서비스");
      }
  }
  ```

  

### 게시글 등록 화면 만들기

* PostsApiController로 API를 구현했으니 이제 화면을 개발
* 부트스트랩을 사용
  * 외부 CDN을 사용하거나 직접 라이브러리를 받아서 사용 가능
* 예제에서는 CDN을 채택
  * 프로젝트에 직접 내려받을 필요 없고 사용 방법도 간단
  * 단, 실서비스에서는 잘 사용하지 않음
    * 서비스가 외부 서비스에 의존하게 돼버려서, CDN에 문제가 생기면 서비스가 안 되기 때문
* 부트스트랩과 제이쿼리를 index.mustache에 레이아웃 방식으로 추가
  * 레이아웃 방식이란 공통 영역을 별도의 파일로 분리하여 필요한 곳에서 가져다 쓰는 방식

* header.mustache

  ```html
  <!DOCTYPE HTML>
  <html>
  <head>
      <title>스프링 부트 웹서비스</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  </head>
  </body>
  ```



* footer.mustache

  ```html
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  
  </body>
  </html>
  ```



* css와 js의 위치가 다름
* 페이지 로딩속도를 높이기 위해 css는 header에, js는 footer에 넣었음
* HTML은 위에서부터 코드가 실행
  * head가 다 실행돼야 body가 실행
  * head가 다 불러지지 않으면 사용자 쪽에선 백지 화면만 보임
* js의 용량이 클수록 body 부분의 실행이 늦어짐
  * js는 body의 하단에 두어 화면이 다 그려진 뒤에 호출
* css는 화면을 그리는 역할
  * head에서 부르는 것이 좋음
  * 그러지 않을 경우 css가 적용되지 않아 깨진 화면을 사용자가 볼 수 있음
* bootstrap.js는 제이쿼리가 꼭 있어야 함(bootstrap.js가 제이쿼리에 의존)
  * 부트스트랩보다 먼저 호출되도록 작성

* 라이브러리를 비롯한 기타 HTML 태그들이 모두 레이아웃에 추가됨
  * index.mustache에 필요한 코드만 남김



* index.mustache

  ```html
  {{>layout/header}}
  
  <h1>스프링 부트로 시작하는 웹 서비스</h1>
  
  {{>layout/footer}}
  ```

  * {{>}}는 현재 머스테치 파일(index.mustache)를 기준으로 다른 파일을 가져옴



* index.mustache(글 등록 버튼 추가)

  ```html
  {{>layout/header}}
  
  <h1>스프링 부트로 시작하는 웹 서비스</h1>
  <div class = "col-md-12">
      <div class = "row">
          <div class = "col-md-6">
              <a href="/posts/save" role="button" class="btn btn-primary">글 등록</a>
          </div>
      </div>
  </div>
  {{>layout/footer}}
  ```

  * `<a>` 태그를 사용하여 글 등록 페이지로 이동하는 버튼 생성

    

* IndexController.java

  ```java
  public class IndexController
  {
  	// 기존 코드
  
      @GetMapping("/posts/save")
      public String postSave()
      {
          return "posts-save";
      }
  }
  ```



* posts-save.mustache

  ```html
  {{>layout/header}}
  
  <h1>게시글 등록</h1>
  
  <div class="col-md-12">
      <div class="col-md-4">
          <form>
              <div class="form-group">
                  <label for="title">제목</label>
                  <input type = "text" class="form-control" id="title" placeholder="제목을 입력하세요">
              </div>
              <div class="form-group">
                  <label for="author">작성자</label>
                  <input type = "text" class="form-control" id="author" placeholder="작성자를 입력하세요">
              </div>
              <div class="form-group">
                  <label for="content">내용</label>
                  <textarea class="form-control" id="content" placeholder="내용을 입력하세요"></textarea>
              </div>
          </form>
          <a href="/" role="button" class="btn btn-secondary">취소</a>
          <button type="button" class="btn btn-primary" id="btn-save">등록</button>
      </div>
  </div>
  
  {{>layout/footer}}
  ```




* index.js

  ```js
  var main = {
      init : function () {
          var _this = this;
          $('#btn-save').on('click', function () {
              _this.save();
          });
  
          $('#btn-update').on('click', function () {
              _this.update();
          });
  
          $('#btn-delete').on('click', function () {
              _this.delete();
          });
      },
      save : function () {
          var data = {
              title: $('#title').val(),
              author: $('#author').val(),
              content: $('#content').val()
          };
  
          $.ajax({
              type: 'POST',
              url: '/api/v1/posts',
              dataType: 'json',
              contentType:'application/json; charset=utf-8',
              data: JSON.stringify(data)
          }).done(function() {
              alert('글이 등록되었습니다.');
              window.location.href = '/';
          }).fail(function (error) {
              alert(JSON.stringify(error));
          });
      },
      update : function () {
          var data = {
              title: $('#title').val(),
              content: $('#content').val()
          };
  
          var id = $('#id').val();
  
          $.ajax({
              type: 'PUT',
              url: '/api/v1/posts/'+id,
              dataType: 'json',
              contentType:'application/json; charset=utf-8',
              data: JSON.stringify(data)
          }).done(function() {
              alert('글이 수정되었습니다.');
              window.location.href = '/';
          }).fail(function (error) {
              alert(JSON.stringify(error));
          });
      },
      delete : function () {
          var id = $('#id').val();
  
          $.ajax({
              type: 'DELETE',
              url: '/api/v1/posts/'+id,
              dataType: 'json',
              contentType:'application/json; charset=utf-8'
          }).done(function() {
              alert('글이 삭제되었습니다.');
              window.location.href = '/'; // 글 등록이 성공하면 메인페이지(/)로
          }).fail(function (error) {
              alert(JSON.stringify(error));
          });
      }
  
  };
  
  main.init();
  ```



* index.js에서 var main = {}을 선언하여 index라는 변수의 속성으로 function을 추가한 이유

  * e.g.

    ```js
    var init = fuction (){
    	//...
    };
    var save = function (){
    	//...
    };
    
    init();
    ```

  * 만약 index.mustache에 a.js가 추가돼 init과 save function을 가진다면?

    * 브라우저의 스코프는 **공용 공간**이므로 나중에 로딩된 js의 init, save가 먼저 로딩된 js의 function을 덮어씀
    * 중복된 함수 명으로 발생할 수 있는 문제를 피하고자 index.js만의 유효범위(scope)를 만들어서 사용
    * 위 예시에서는 var index란 객체를 만들어 해당 객체에서 필요한 모든 function을 선언해 사용하고 있음



* footer.mustache

  ```html
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  
  <script src="/js/app/index.js"></script>
  </body>
  </html>
  ```




* 이후 브라우저에서 테스트할 때, 다음과 같은 에러 메시지가 나올 수 있다

  > not-null property references a null or transient value

* 어떤 에러인지는 [스택오버플로우](https://stackoverflow.com/questions/6389600/not-null-property-references-a-null-or-transient-value/9949147)를 참고하자. Posts.java에서 nullable을 전부 true로 바꿔주니 해결하긴 했다.



### 전체 조회 화면 만들기

* index.mustache

  ```html
  {{>layout/header}}
  
  <h1>스프링 부트로 시작하는 웹 서비스</h1>
  <div class = "col-md-12">
      <div class = "row">
          <div class = "col-md-6">
              <a href="/posts/save" role="button" class="btn btn-primary">글 등록</a>
          </div>
      </div>
      <br>
      <!--목록 출력 영역-->
      <table class="table table-horizontal table-bordered">
          <thread class="thread=strong">
              <tr>
                  <th>게시글번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>최종수정일</th>
              </tr>
          </thread>
          <tbody id="tbody">
          {{#posts}}
              <tr>
                  <td>{{id}}</td>
                  <td>{{title}}</td>
                  <td>{{author}}</td>
                  <td>{{modifiedDate}}</td>
              </tr>
          {{/posts}}
          </tbody>
      </table>
  </div>
  
  
  {{>layout/footer}}
  ```

  * {{#post}}: posts라는 List를 순회하는 일종의 for문
  * {{id}}: List에서 뽑아낸 객체의 필드를 사용



* PostsRepository.java

  ```java
  package com.jojoldu.book.springboot.domain.posts;
  
  import org.springframework.data.jpa.repository.JpaRepository;
  import org.springframework.data.jpa.repository.Query;
  
  import java.util.List;
  
  public interface PostsRepository extends JpaRepository<Posts, Long>
  {
      @Query("SELECT p FROM Posts p ORDER BY p.id DESC")
      List<Posts> findAllDesc();
  }
  ```

  * SpringDataJpa에서 제공하는 메소드로도 위의 동작을 할 수 있으나, 쿼리로 작성하는 것이 더 가독성이 좋아 @Query 사용



* PostsService.java

  ```java
  // 기존 코드
  
  import com.jojoldu.book.springboot.web.dto.PostsListResponseDto;
  
  import java.util.List;
  import java.util.stream.Collectors;
  
  @RequiredArgsConstructor
  @Service
  public class PostsService
  {
      // 기존 코드
      @Transactional(readOnly = true) // 트랜잭션 범위는 유지하되 조회 기능만 남겨두어 조회 속도 개선
      public List<PostsListResponseDto> findAllDesc()
      {
          return postsRepository.findAllDesc().stream()
                  .map(PostsListResponseDto::new)
                  .collect(Collectors.toList());
      }
  }
  ```

  * .map(PostsListResponseDto::new)는 람다식
    * .map(posts -> new PostsListResponseDto(posts))와 같음



* PostListResponseDto

  ```java
  package com.jojoldu.book.springboot.web.dto;
  
  import com.jojoldu.book.springboot.domain.posts.Posts;
  import lombok.Getter;
  import java.time.LocalDateTime;
  
  @Getter
  public class PostsListResponseDto
  {
      private Long id;
      private String title;
      private String author;
      private LocalDateTime modifiedDate;
  
      public PostsListResponseDto(Posts entity)
      {
          this.id = entity.getId();
          this.title = entity.getTitle();
          this.author = entity.getAuthor();
          this.modifiedDate = entity.getModifiedDate();
      }
  }
  ```



* IndexController.java

  ```java
  // 기존 코드 
  import org.springframework.ui.Model;
  
  import lombok.RequiredArgsConstructor;
  
  @RequiredArgsConstructor
  @Controller
  public class IndexController
  {
      private final PostsService postsService;
  
      @GetMapping("/")
      public String index(Model model) // 기존 index 수정
      {
          model.addAttribute("posts", postsService.findAllDesc());
          return "index";
      }
      
      // 기존 코드
  }
  ```

  

### 게시글 수정, 삭제 화면 만들기

#### 게시글 수정

* PostsApiController.java

  ```java
  public class PostsApiController
  {
  	// 아래 내용 추가
      @PutMapping("/api/v1/posts/{id}")
      public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto)
      {
          return postsService.update(id, requestDto);
      }
  }
  ```

  

* posts-update.mustache

  ```html
  {{>layout/header}}
  
  <h1>게시글 수정</h1>
  
  <div class = "col-md-12">
      <div class = "col-md-4">
          <form>
              <div class = "form-group">
                  <label for="id">글 번호</label>
                  <input type = "text" class = "form-control" id="id" value="{{post.id}}" readonly>
              </div>
              <div class="form-group">
                  <label for="title">제목</label>
                  <input type="text" class="form-control" id="title" value="{{post.title}}">
              </div>
              <div class="form-group">
                  <label for="author">작성자</label>
                  <input type="text" class="form-control" id="author" value="{{post.author}}" readonly>
              </div>
              <div class="form-group">
                  <label for="content">내용</label>
                  <textarea class="form-control" id="content">{{post.content}}</textarea>
              </div>
          </form>
          <a href="/" role="button" class="btn btn-secondary">취소</a>
          <button type="button" class="btn btn-primary" id="btn-update">수정 완료</button>
      </div>
  </div>
  
  {{>layout/footer}}
  ```

  * 머스테치는 객체의 필드 접근 시 점(Dot)으로 구분(e.g. {{post.id}} )
    * post.id를 통해 Post 클래스의 id에 대한 접근 가능
  * readonly는 Input 태그에 읽기 가능만 허용하는 속성



* index.js

  ```js
  var main = {
      init : function () {
  		// ...
          // btn-update란 id를 가진 HTML 엘리먼트에 click 이벤트가 발생할 때 update function을 실행하는 이벤트 등록
          $('#btn-update').on('click', function (){
              _this.update();
          });
      },
      save : function () {
  		//...
      },
      update : function (){
          var data = {
              title: $('#title').val(),
              content: $('#content').val()
          };
  
  		var id = $('#id').val();
          
          $.ajax({
              type: 'PUT',
              url: '/api/v1/posts/'+id, // 어느 게시글을 수정할지 URL PATH로 구분하기 위해 id 추가
              dataType: 'json',
              contentType: 'application/json; charset=urf-8',
              data: JSON.stringify(data)
          }).done(function (){
             alert('글이 수정되었습니다.');
             window.location.href = '/';
          }).fail(function (error)
          {
              alert(JSON.stringify(error));
          });
      }
  };
  ```

  * `type: 'PUT`
    * HTTP 메소드 중 PUT을 선택
    * PostsApiController에 있는 API에 @PutMapping으로 선언했기 때문에 PUT을 사용(REST 규약에 따른 설정)
    * REST에서 CRUD는 다음 HTTP 메소드에 맵핑
      * Create(생성)-POST
      * Read(읽기)-GET
      * Update(수정)-PUT
      * Delete(삭제)-DELETE



* index.mustache

  ```html
  //...
          <tbody id="tbody">
          {{#posts}}
              <tr>
                  <td>{{id}}</td>
                  <td><a href="/posts/update/{{id}}">{{title}}</a></td>
                  <td>{{author}}</td>
                  <td>{{modifiedDate}}</td>
              </tr>
  ```

  * 타이틀에 a tag를 추가해 타이틀을 클릭하면 해당 게시글 수정 화면으로 이동



* IndexController.java

  ```java
  @RequiredArgsConstructor
  @Controller
  public class IndexController
  {
  	//...
  
      @GetMapping("/posts/update/{id}")
      public String postsUpdate(@PathVariable Long id, Model model)
      {
          PostsResponseDto dto = postsService.findById(id);
          model.addAttribute("post", dto);
  
          return "posts-update";
      }
  }
  ```

  

#### 게시글 삭제

* posts-update.mustache

  ```html
  <div class = "col-md-12">
      <div class = "col-md-4">
  		// ...
          <a href="/" role="button" class="btn btn-secondary">취소</a>
          <button type="button" class="btn btn-primary" id="btn-update">수정 완료</button>
          <button type="button" class="btn btn-danger" id="btn-delete">삭제</button>
      </div>
  </div>
  ```



* index.js

  ```js
  var main = {
      init : function () {
  		//...
          
          $('#btn-delete').on('click', function (){
              _this.delete();
          });
      },
  	//...
      
      delete : function (){
          var id = $('#id').val();
  
          $.ajax({
              type: 'DELETE',
              url: '/api/v1/posts/' +id,
              dataType: 'json',
              contentType: 'application/json; charset=utf-8'
          }).done(function (){
              alert('글이 삭제되었습니다.');
              window.location.href = '/';
          }).fail(function (error){
              alert(JSON.stringify(error))
          });
      }
  };
  ```



* PostsService.java

  ```java
  @RequiredArgsConstructor
  @Service
  public class PostsService
  {
  	// ...
  
      @Transactional
      public void delete (Long id)
      {
          Posts posts = postsRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
  
          // JpaRepository에서 지원하는 메소드 활용
          // deleteById(id)도 사용 가능
          postsRepository.delete(posts);
      }
  }
  
  ```



* PostsApiController.java

  ```java
  @RequiredArgsConstructor
  @RestController
  public class PostsApiController
  {
  	//...
  
      @DeleteMapping("/api/v1/posts/{id}")
      public Long delete(@PathVariable Long id)
      {
          postsService.delete(id);
          return id;
      }
  }
  ```

  
