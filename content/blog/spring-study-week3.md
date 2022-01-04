---

title: 스프링 시큐리티와 OAuth2.0으로 로그인 기능 구현하기
description: 스프링 시큐리티 2.0과 OAuth를 사용한 소셜 로그인 기능 구현에 대해 소개합니다.
slug: spring-study-week3
category: Back-End
author: IlGoo Yeo
featured: none

---

## 스프링 스터디 3주차(챕터5)

### 스프링 시큐리티와 OAuth로 로그인 기능 구현

#### 스프링 시큐리티

* 인증(Authentication)과 인가(Authorization) 기능을 가진 프레임워크
* 인터셉터, 필터 기반 대신 스프링 시큐리티를 사용하는 것을 권장(사실상 스프링 보안을 위한 표준)



#### OAuth를 활용한 소셜 로그인 서비스를 사용하는 이유

* 구현해야할 부분이 대폭 감소함

  * 로그인시 보안, 회원가입 시 인증, 비밀번호 찾기/변경, 회원정보 변경 등
  * 위와 같은 사항을 구현하지 않아도 됨



#### 스프링부트 1.5 vs 2.0

* OAuth2 연동 방법이 1.5와 2.0이 많이 다름
  * 하지만 spring-security-ouath2-autoconfigure 라이브러리를 사용하면 1.5의 설정을 그대로 사용 가능

* 그러나 본 실습에서는 Spring Security Oauth2 Client 라이브러리 사용
  * 기존 1.5에서 사용되던 spring-security-oauth 프로젝트는 maintenance mode이며 신규 기능 추가를 지원하지 않기 때문
  * 스프링 부트용 라이브러리(starter) 출시
  * 기존 방식은 확장 포인트가 적절하게 오픈돼 있지 않음

* 스프링 부트 1.5 방식에서는 url 주소를 모두 명시해야 하지만 2.0 방식에서는 **client 인증 정보**만 입력하면 됨
  * CommonOAuth2Provider라는 enum이 새롭게 추가되어, 직접 입력했던 값들은 모두 enum으로 대체

### 구글 서비스 등록

#### OAuth 2.0 클라이언트 생성

* 구글 서비스에 신규 서비스를 등록하고, 발급된 인증 정보를 통해 로그인 및 소셜 서비스 기능 구현
* [구글 클라우드 플랫폼](https://console.cloud.google.com)에 접속
* **프로젝트 선택**  - **새 프로젝트**에 들어가서 원하는 이름 입력 후 **만들기**
* 생성 완료된 프로젝트를 선택하고, 왼쪽 메뉴 탭에서 **API 및 서비스** - **사용자 인증 정보** - **사용자 인증 정보 만들기** 버튼 클릭
* 이때, **OAuth 클라이언트 ID**를 선택하고 **동의 화면 구성** 클릭
* **OAuth 동의 화면**에서 **앱 이름**, **사용자 지원 이메일**, **개발자 연락처 정보** 추가
* **범위**에서 .../auth/userinfo.email, .../auth/userinfo.profile, openid 추가
* 모두 저장 후, **사용자 인증 정보** - **사용자 인증 정보 만들기** - **OAuth 클라이언트 ID** 클릭
* **애플리케이션 유형**은 웹 애플리케이션, 이름은 프로젝트 이름
* **승인된 리디렉션 URI**에 http://localhost:8080/login/oauth2/code/google 추가



#### 클라이언트 ID와 비밀코드를 프로젝트에 등록

* /src/main/resources에 application-oauth.properties 생성

* application-oauth.properties

  ```java
  spring.security.oauth2.client.registration.google.client-id=클라이언트 ID
  spring.security.oauth2.client.registration.google.client-secret=클라이언트 보안 비밀
  spring.security.oauth2.client.registration.google.scope=profile, email
  ```

  * scope를 별도로 등록한 이유는, 이를 하지 않으면 기본값에 openid라는 scope가 있어 Open Id Provider로 인식하기 때문
  * 이렇게 되면 OpenId Provider인 서비스(e.g. google)과 그렇지 않은 서비스(e.g. naver, kakao)로 나눠서 각각 OAuth2Service를 만들어야 함

* application.properties에 아래 코드 추가

  ```java
  spring.profiles.include=oauth
  ```

* ID와 비밀 노출을 방지하기 위해 .gitignore에 application-oauth.properties 등록



### 구글 로그인 연동하기

* domain에 user 패키지를 생성하고, User 클래스와 Role 클래스, UserRepository 클래스 생성

* User.java

  ```java
  package com.jojoldu.book.springboot.domain.user;
  
  import com.jojoldu.book.springboot.domain.BaseTimeEntity;
  import lombok.Builder;
  import lombok.Getter;
  import lombok.NoArgsConstructor;
  
  import javax.persistence.Column;
  import javax.persistence.Entity;
  import javax.persistence.EnumType;
  import javax.persistence.Enumerated;
  import javax.persistence.GeneratedValue;
  import javax.persistence.GenerationType;
  import javax.persistence.Id;
  
  @Getter
  @NoArgsConstructor
  @Entity
  public class User extends BaseTimeEntity
  {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;
  
      @Column(nullable = false)
      private String name;
  
      @Column(nullable = false)
      private String email;
  
      @Column
      private String picture;
  
      @Enumerated(EnumType.STRING) //JPA로 DB를 저장할 때 Enum값을 어떤 형태로 저장할지를 결정(기본은 int)
      @Column(nullable = false)
      private Role role;
  
      @Builder
      public User(String name, String email, String picture, Role role)
      {
          this.name = name;
          this.email = email;
          this.picture = picture;
          this.role = role;
      }
  
      public User update(String name, String picture)
      {
          this.name = name;
          this.picture = picture;
  
          return this;
      }
  
      public String getRoleKey()
      {
          return this.role.getKey();
      }
  }
  ```

* Role.java

  ```java
  package com.jojoldu.book.springboot.domain.user;
  
  import lombok.Getter;
  import lombok.RequiredArgsConstructor;
  
  @Getter
  @RequiredArgsConstructor
  public enum Role
  {
      GUEST("ROLE_GUEST", "손님"),
      USER("ROLE_USER", "일반 사용자");
  
      private final String key;
      private final String title;
  }
  ```

  * 스프링 시큐리티에서는 권한 코드에 항상 **ROLE_**이 앞에 있어야 함.

* UserRepository.java

  ```java
  package com.jojoldu.book.springboot.domain.user;
  
  import org.springframework.data.jpa.repository.JpaRepository;
  
  import java.util.Optional;
  
  public interface UserRepository extends JpaRepository<User, Long>
  {
      // 소셜 로그인으로 반환되는 값 중 email을 통해 이미 생성된 사용자인지 판단
      Optional<User> findByEmail(String email);
  }
  ```

* build.gradle에 시큐리티 관련 의존성 추가

  ```java
  implementation('org.springframework.boot:spring-boot-starter-oauth2-client'
  ```

* springboot 내부에 config.auth 패키지를 만들고 SecurityConfig 클래스와 CustomOAuth2UserService 클래스 생성

* SecurityConfig.java

  ```java
  package com.jojoldu.book.springboot.config.auth;
  
  import com.jojoldu.book.springboot.domain.user.Role;
  import lombok.RequiredArgsConstructor;
  import org.springframework.security.config.annotation.web.builders.HttpSecurity;
  import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
  import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
  
  @RequiredArgsConstructor
  @EnableWebSecurity // Spring Security 설정 활성화
  public class SecurityConfig extends WebSecurityConfigurerAdapter
  {
      private final CustomOAuth2UserService customOAuth2UserService;
  
      @Override
      protected void configure(HttpSecurity http) throws Exception
      {
          http.csrf().disable()
                  .headers().frameOptions().disable() // h2-console화면 사용을 위해 해당 옵션들 disable
                  .and()
                  .authorizeRequests() // URL별 권한 관리 설정 옵션의 시작점으로, antMatchers 옵션 사용 전에 선언돼야 함
                  .antMatchers("/", "/css/**", "/images/**", "/js/**", "/h2-console/**").permitAll() // 전체 열람 권한 부여
                  .antMatchers("/api/v1/**").hasRole(Role.USER.name()) // antMatchers는 권한 관리 대상을 지정하는 옵션으로 URL, HTTP 메소드별로 관리 가능 (USER 권한만 열람 가능)
                  .anyRequest().authenticated() // 설정된 값들 이외 나머지 URL (인증된 사용자, 즉 로그인한 사용자들에게 권한 부여)
                  .and()
                  .logout().logoutSuccessUrl("/") // 로그아웃 기능 설정의 진입점(로그아웃 성공시 /로 이동)
                  .and()
                  .oauth2Login() // OAuth2 로그인 기능에 대한 설정 진입점
                  .userInfoEndpoint() // 로그인 성공 후 사용자 정보를 가져올 때의 설정 담당
                  .userService(customOAuth2UserService); // 소셜 로그인 성공 시 후속 조치를 진행할 UserService 인터페이스 구현체 등록
      }
  }
  ```

* CustomOAuth2UserService.java

  ```java
  package com.jojoldu.book.springboot.config.auth;
  
  import com.jojoldu.book.springboot.config.auth.dto.OAuthAttributes;
  import com.jojoldu.book.springboot.config.auth.dto.SessionUser;
  import com.jojoldu.book.springboot.domain.user.User;
  import com.jojoldu.book.springboot.domain.user.UserRepository;
  import lombok.RequiredArgsConstructor;
  import org.springframework.security.core.authority.SimpleGrantedAuthority;
  import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
  import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
  import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
  import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
  import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
  import org.springframework.security.oauth2.core.user.OAuth2User;
  import org.springframework.stereotype.Service;
  
  import javax.servlet.http.HttpSession;
  import java.util.Collections;
  
  @RequiredArgsConstructor
  @Service
  public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User>
  {
      private final UserRepository userRepository;
      private final HttpSession httpSession;
  
      @Override
      public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException
      {
          OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
          OAuth2User oAuth2User = delegate.loadUser(userRequest);
  
          String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 현재 로그인 진행 중인 서비스 구분(복수개의 소셜 로그인 사용시 필요)
          String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName(); // OAuth2 로그인 진행 시 키가 되는 필드값(Primary key)
  
          OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes()); // OAuth2UserService를 통해 가져온 OAuth2User의 attribute를 담을 클래스
  
          User user = saveOrUpdate(attributes);
          httpSession.setAttribute("user", new SessionUser(user)); // 세션에 사용자 정보를 저장하기 위한 Dto 클래스
  
          return new DefaultOAuth2User(
                  Collections.singleton(new SimpleGrantedAuthority(user.getRoleKey())),
                  attributes.getAttributes(),
                  attributes.getNameAttributeKey());
      }
  
      private User saveOrUpdate(OAuthAttributes attributes)
      {
          User user = userRepository.findByEmail(attributes.getEmail())
                  .map(entity -> entity.update(attributes.getName(), attributes.getPicture()))
                  .orElse(attributes.toEntity());
  
          return userRepository.save(user);
      }
  }
  ```

* OAuthAttributes 클래스 생성

  * 이 실습에서는 OAuthAttributes를 Dto로 보고 config.auth.dto 패키지를 생성함

  ```java
  package com.jojoldu.book.springboot.config.auth.dto;
  
  import com.jojoldu.book.springboot.domain.user.Role;
  import com.jojoldu.book.springboot.domain.user.User;
  import lombok.Builder;
  import lombok.Getter;
  
  import java.util.Map;
  
  @Getter
  public class OAuthAttributes
  {
      private Map<String, Object> attributes;
      private String nameAttributeKey;
      private String name;
      private String email;
      private String picture;
  
      @Builder
      public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email, String picture)
      {
          this.attributes = attributes;
          this.nameAttributeKey = nameAttributeKey;
          this.name = name;
          this.email = email;
          this.picture = picture;
      }
      
      // OAuth2User에서 반환하는 사용자 정보는 Map이므로 값 하나하나를 변환해야 함
      public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes)
      {
          return ofGoogle(userNameAttributeName, attributes);
      }
  
      private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes)
      {
          return OAuthAttributes.builder()
                  .name((String) attributes.get("name"))
                  .email((String) attributes.get("email"))
                  .picture((String) attributes.get("picture"))
                  .attributes(attributes)
                  .nameAttributeKey(userNameAttributeName)
                  .build();
      }
  
      // User 엔티티 생성(OAuthAttribute에서 엔티티 생성 시점은 처음 가입할 때)
      // 기본 권한은 GUEST이고 클래스 생성이 끝나면 같은 패키지에 SessionUser 클래스 생성
      public User toEntity()
      {
          return User.builder()
                  .name(name)
                  .email(email)
                  .picture(picture)
                  .role(Role.GUEST)
                  .build();
      }
  }
  ```

* config.auth.dto 패키지에 SessionUser 클래스 추가

  ```java
  package com.jojoldu.book.springboot.config.auth.dto;
  
  import lombok.Getter;
  
  import com.jojoldu.book.springboot.domain.user.User;
  import java.io.Serializable;
  
  @Getter
  public class SessionUser implements Serializable
  {
      private String name;
      private String email;
      private String picture;
  
      public SessionUser(User user)
      {
          this.name = user.getName();
          this.email = user.getEmail();
          this.picture = user.getPicture();
      }
  }
  ```

* User 클래스를 사용하지 않고 SessionUser 클래스를 새로 만든 이유
  * User 클래스에 **직렬화를 구현하지 않았다**는 에러가 뜸
  * User 클래스에 직렬화 코드를 넣지 않는 이유
    * User 클래스가 **엔티티**이기 때문
    * 엔티티 클래스는 언제 다른 엔티티와 관계가 형셩될지 모름
    * 직렬화 대상에 자식 엔티티까지 포함돼 성능 이슈나 부수 효과가 발생할 확률 높음
  * 따라서, **직렬화 기능을 가진 세션 Dto**를 하나 추가로 만드는 것이 운영 및 유지보수 때 도움이 됨



#### 로그인 테스트

* index.mustache를 로그인 버튼과 로그인 성공 시 사용자 이름을 보여주도록 수정

  ```html
  <h1>스프링 부트로 시작하는 웹 서비스</h1>
  <div class = "col-md-12">
      <!-- 로그인 기능 영역 -->
      <div class = "row">
          <div class = "col-md-6">
              <a href="/posts/save" role="button" class="btn btn-primary">글 등록</a>
              {{#userName}}
                  Logged in as: <span id="user">{{userName}}</span>
                  <a href="/logout" class="btn btn-info active" role="button">Logout</a>
              {{/userName}}
              {{^userName}}
                  <a href="/oauth2/authorization/google" class="btn btn-success active" role="button">Google Login</a>
              {{/userName}}
          </div>
      </div>
  ```

  * {{#userName}} : 머스테치는 if문을 제공하지 않고 true/false 여부만 판단하므로 항상 최종값을 넘겨줘야 함
  * a href="/logout" : 스프링 시큐리티에서 제공하는 로그아웃 URL
  * {{^userName}} : 머스테치에 해당 값이 존재하지 않는 경우에는 ^ 사용
    * userName이 없다면 로그인 버튼 노출
  * a href="/oauth2/authorization/google" : 스프링 시큐리티에서 제공하는 로그인 URL

* IndexController에 userName을 model에 저장하는 코드를 추가해 index.mustache에서 userName을 사용할 수 있게 함.

  ```java
  ...
  import javax.servlet.http.HttpSession;
  ...
      
  @RequiredArgsConstructor
  @Controller
  public class IndexController
  {
      private final PostsService postsService;
      private final HttpSession httpSession;
      
          @GetMapping("/")
      public String index(Model model)
      {
          model.addAttribute("posts", postsService.findAllDesc());
  
          SessionUser user = (SessionUser) httpSession.getAttribute("user"); // CustomOAuth2UserService에서 로그인 성공 시 세션에 SessionUser 저장
          if(user != null) // 세선에 저장된 값이 있을 때만 model에 userName으로 등록
          {
              model.addAttribute("userName", user.getName());
          }
          return "index";
      }
      ...
  }
  ```

* 이후 구글 로그인을 시도하면 로그인이 되는 것을 확인할 수 있음

* 그러나 게시글 등록을 하면 403 에러가 나옴

  * 로그인된 사용자의 권한이 GUEST인데, 글 등록은 USER 권한이 필요하기 때문
  * h2-console에 가서 role을 USER로 변환하면 글 등록이 가능함



### 어노테이션 기반으로 개선하기

* 같은 코드가 반복되는 경우 개선이 필요함
  * 수정할 때, 반복되는 모든 부분을 하나씩 다 수정해야 하므로 유지보수성이 떨어진다
* 앞의 코드에서는 IndexController에서 세션값을 가져오는 부분을 개선할 수 있다
  * 문제점 : index 메소드 외 다른 컨트롤러와 메소드에서 세션값이 필요하면 그때마다 세션에서 직접 값을 가져와야 함
  * 개선방안 : 이 부분을 메소드 인자로 세션값을 바로 받을 수 있도록 변경

* config.auth 패키지에 @LoginUser 어노테이션 생성

  ```java
  package com.jojoldu.book.springboot.config.auth;
  
  import java.lang.annotation.ElementType;
  import java.lang.annotation.Retention;
  import java.lang.annotation.RetentionPolicy;
  import java.lang.annotation.Target;
  
  @Target(ElementType.PARAMETER) // 어노테이션이 생성될 수 있는 위치 지정
  @Retention(RetentionPolicy.RUNTIME) // 이 파일을 어노테이션 클래스로 지정
  public @interface LoginUser { }
  ```

* 같은 위치에 LoginUserArgumentResolver를 생성

  * HandlerMethodArgumentResolver 인터페이스를 구현한 클래스
  * 조건에 맞는 경우 메소드가 있다면 HandlerMethodArgumentResolver 구현체가 지정한 값을 해당 메소드의 파라미터로 넘길 수 있음

  ```java
  package com.jojoldu.book.springboot.config.auth;
  
  import com.jojoldu.book.springboot.config.auth.dto.SessionUser;
  import lombok.RequiredArgsConstructor;
  import org.springframework.core.MethodParameter;
  import org.springframework.stereotype.Component;
  import org.springframework.web.bind.support.WebDataBinderFactory;
  import org.springframework.web.context.request.NativeWebRequest;
  import org.springframework.web.method.support.HandlerMethodArgumentResolver;
  import org.springframework.web.method.support.ModelAndViewContainer;
  
  import javax.servlet.http.HttpSession;
  
  @RequiredArgsConstructor
  @Component
  public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver
  {
      private final HttpSession httpSession;
  
      // 컨트롤러 메서드의 특정 파라미터를 지원하는지 판단
      // @LoginUser 어노테이션이 붙어 있고, 파라미터 클래스 타입이 SessionUser.class인 경우 true
      @Override
      public boolean supportsParameter(MethodParameter parameter)
      {
          boolean isLoginUserAnnotation = parameter.getParameterAnnotation(LoginUser.class) != null;
          boolean isUserClass = SessionUser.class.equals(parameter.getParameterType());
  
          return isLoginUserAnnotation && isUserClass;
      }
  
      // 파라미터에 전달할 객체 생성(세션에서 객체를 가져옴)
      @Override
      public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception
      {
          return httpSession.getAttribute("user");
      }
  }
  ```

* LoginUserArgumentResolver가 스프링에서 인식될 수 있도록 WebMvcConfig 클래스를 config 패키지에 생성

  ```java
  package com.jojoldu.book.springboot.config.auth;
  
  import lombok.RequiredArgsConstructor;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.web.method.support.HandlerMethodArgumentResolver;
  import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
  
  import java.util.List;
  
  @RequiredArgsConstructor
  @Configuration
  public class WebConfig implements WebMvcConfigurer
  {
      private final LoginUserArgumentResolver loginUserArgumentResolver;
  
      @Override
      public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers)
      {
          argumentResolvers.add(loginUserArgumentResolver);
      }
  }
  ```

  * HandlerMethodArgumentResolver는 항상 WebMvcConfigurer의 addArgumentResolvers()를 통해 추가해야 함
  * 다른 HandlerMethodArgumentResolver가 필요하다면 같은 방식으로 추가

* IndexController의 코드에서 반복되는 부분을 @LoginUser로 개선

  ```java
  ...
      @GetMapping("/")
      public String index(Model model, @LoginUser SessionUser user) // 이제는 어느 컨트롤러든지 @LoginUser만 사용하면 세선 정보를 가져올 수 있음
      {
          model.addAttribute("posts", postsService.findAllDesc());
          if(user != null)
          {
              model.addAttribute("userName", user.getName());
          }
          return "index";
      }
  ...
  ```

  

### 세션 저장소로 데이터베이스 사용하기

* 현재 서비스는 재실행을 하면 로그인이 풀림
  * 세션이 내장 톰캣 메모리에 저장되기 때문
  * 애플리케이션이 실행될 떄 실행되는 구조(e.g. 내장 톰캣)에선 항상 초기화

* 그리고 2대 이상의 서버에서 서비스하면 톰캣마다 세션 동기화 설정을 해야 함

* 세션 저장소 문제를 해결하기 위한 방법은 크게 3가지
  * 톰캣 세션 사용
    * 별도의 설정 필요 없어 기본적으로 선택
    * 톰캣(WAS)에 세션이 저장되므로 2대 이상의 WAS가 구동되는 환경에서는 톰캣들 간의 세션 공유를 위한 설정이 필요
  * MySQL 같은 DB를 세션 저장소로 사용
    * WAS 간의 공용 세션을 사용할 수 있는 가장 쉬운 방법
    * 로그인 요청마다 DB IO가 발생해 성능상 이슈가 발생할 수 있음
  * Redis, Memcached 같은 메모리 DB를 세션 저장소로 사용
    * B2C 서비스에서 많이 사용
    * 실제 서비스로 사용하려면 Embedded Redis 같은 방식이 아닌 외부 메모리 서버 필요

* build.gradle에 spring-session-jdbc를 위한 의존성 등록

  ```java
  implementation('org.springframework.session:spring-session-jdbc')
  ```

* application.properties에 세션 저장소를 jdbc로 선택하도록 코드 추가

* 이렇게 수정해도 스프링을 재시작하면 세션이 풀림

  * H2 기반으로 스프링이 재실행될 때 H2도 재시작되기 때문
  * AWS로 배포하면서 RDS를 사용하면 해결됨



### 네이버 로그인

* [네이버 오픈 API](https://developers.naver.com/apps/#/register?api=nvlogin)으로 이동

* 애플리케이션 등록(API 이용신고) 설정

  * 애플리케이션 이름 입력
  * 사용 API는 네이버 로그인. 회원이름, 이메일 주소, 프로필 사진에 필수로 체크
  * 환경은 PC웹
    * 서비스 URL은 http://localhost:8080/
    * Callback URL은 http://localhost:8080/login/oauth2/code/naver

* Client ID와 Secret을 application-oauth.properties에 등록. 스프링 시큐리티가 지원하지 않기 때문에 CommonOAuth2Provider가 해주던 값을 전부 입력해야 함

  ```java
  # registration
  spring.security.oauth2.client.registration.naver.client-id=네이버클라이언트ID
  spring.security.oauth2.client.registration.naver.client-secret=네이버클라이언트비밀
  spring.security.oauth2.client.registration.naver.redirect-uri={baseUrl}/{action}/oauth2/code/{registrationId}
  spring.security.oauth2.client.registration.naver.authorization-grant-type=authorization_code
  spring.security.oauth2.client.registration.naver.scope=name,email,profile_image
  spring.security.oauth2.client.registration.naver.client-name=Naver
  
  # provider
  spring.security.oauth2.client.provider.naver.authorization-uri=https://nid.naver.com/oauth2.0/authorize
  spring.security.oauth2.client.provider.naver.token-uri=https://nid.naver.com/oauth2.0/token
  spring.security.oauth2.client.provider.naver.user-info-uri=https://openapi.naver.com/v1/nid/me
  spring.security.oauth2.client.provider.naver.user-name-attribute=response
  ```

* 네이버 오픈 API의 로그인 회원 결과는 다음과 같음

  ```json
  {
      "resultcode": "00",
      "message": "success",
      "response": {
          "email": "openapi@naver.com",
          "nickname": "OpenAPI",
          "profile_image": "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif",
          "age": "40-49",
          "gender": "F",
          "id": "32742776",
          "name": "오픈 API",
          "birthday": "10-01"
      }
  }
  ```

  * 스프링 시큐리티에서는 하위 필드를 명시할 수 없으므로 최상위 필드들만 user_name으로 지정 가능
    * 여기서 최상위 필드는 resultCode, message, response
    * 이 실습에선 response를 user_name으로 지정



#### 스프링 시큐리티 설정 등록

* OAuthAttributes에 네이버인지 판단하는 코드와 네이버 생성자 추가

  ```java
  ...
  public class OAuthAttributes
  {
      ...
  
      public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes)
      {
          if("naver".equals(registrationId)) return ofNaver("id", attributes);
          return ofGoogle(userNameAttributeName, attributes);
      }
      
      ...
      
  	private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes)
      {
          Map<String, Object> response = (Map<String, Object>) attributes.get("response");
          
          return OAuthAttributes.builder()
                  .name((String) response.get("name"))
                  .email((String) response.get("email"))
                  .picture((String) response.get("profile_image"))
                  .attributes(reponse)
                  .nameAttributeKey(userNameAttributeName)
                  .build();
      }    
  }
  ```

* index.mustache에 네이버 로그인 버튼 추가

  ```html
  <!-- 구글 로그인 버튼 아래에 추가 -->
  <a href="/oauth2/authorization/naver" class="btn btn-secondary active" role="button">Naver Login</a>
  ```

  * 로그인 URL은 application-oauth.properties에 등록한 redirect-uri에 맞춰 자동으로 등록됨
  * /oauth2/authorization/는 고정. 마지막 Path만 각 소셜 로그인 코드



#### 기존 테스트에 시큐리티 적용하기

* 기존 테스트에 시큐리티 적용으로 문제가 되는 부분들을 해결해야 함

  * 기존에는 API를 바로 호출할 수 있어 테스트 코드 역시 API를 바로 호출하도록 구성
  * 하지만 시큐리티 옵션이 활성화되면 인증된 사용자만 API 호출 가능
  * 테스트 코드마다 인증한 사용자가 호출한 것처럼 수정해야 함

* 인텔리제이 오른쪽 상단에 **Gradle-Tasks-verification-test**를 선택해 전체 테스트 수행

  * 롬복을 사용한 테스트 외에 스프링을 사용한 테스트는 모두 실패

* CustomOAuth2UserService을 찾을 수 없음

  * returnHello() 메시지를 보면 **No qualifying bean of type 'com.jojoldu.book.springboot.config.auth.CustomOAuth2UserService'**라는 메시지 등장

  * src/main과 src/test의 환경이 다르기 때문

    * src/main/resources/application.properties 같은 경우, test에 application.properties가 없으면 main의 설정을 알아서 가져옴
    * application-oauth.properties는 자동으로 가져오지 않음

  * 이를 해결하기 위해 src/test/resources에 application.properties 생성

    ```java
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL57Dialect
    spring.jpa.properties.hibernate.dialect.storage_engine=innodb
    spring.datasource.hikari.jdbc-url=jdbc:h2:mem://localhost/~/testdb;MODE=MYSQL
    spring.h2.console.enabled=true
    spring.session.store-type=jdbc
    
    # Test OAuth
    
    spring.security.oauth2.client.registration.google.client-id=test
    spring.security.oauth2.client.registration.google.client-secret=test
    spring.security.oauth2.client.registration.google.scope=profile,email
    ```

* 302 Status Code

  * PostsRegister() 테스트 로그를 보면 Status Code가 200이 아닌 302가 와서 실패

    * 시큐리티 설정 때문에 인증되지 않은 사용자의 요청은 이동시키기 때문

    * 임의로 인증된 사용자를 추가하여 API만 테스트함

    * build.gradle에 아래 코드 추가

      ```java
      testImplementation('org.springframework.security:spring-security-test')
      ```

    * PostsApiControllerTest를 아래와 같이 수정

      ```java
      package com.jojoldu.book.springboot.web;
      
      import com.fasterxml.jackson.databind.ObjectMapper;
      import com.jojoldu.book.springboot.domain.posts.Posts;
      import com.jojoldu.book.springboot.domain.posts.PostsRepository;
      import com.jojoldu.book.springboot.web.dto.PostsSaveRequestDto;
      import com.jojoldu.book.springboot.web.dto.PostsUpdateRequestDto;
      import org.junit.jupiter.api.AfterEach;
      import org.junit.jupiter.api.BeforeEach;
      import org.junit.jupiter.api.Test;
      import org.junit.jupiter.api.extension.ExtendWith;
      import org.springframework.beans.factory.annotation.Autowired;
      import org.springframework.boot.test.context.SpringBootTest;
      import org.springframework.boot.test.web.client.TestRestTemplate;
      import org.springframework.boot.web.server.LocalServerPort;
      import org.springframework.http.*;
      import org.springframework.security.test.context.support.WithMockUser;
      import org.springframework.test.context.junit.jupiter.SpringExtension;
      import org.springframework.test.web.servlet.MockMvc;
      import org.springframework.test.web.servlet.setup.MockMvcBuilders;
      import org.springframework.web.context.WebApplicationContext;
      import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
      import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
      
      import java.util.List;
      
      import static org.assertj.core.api.Assertions.assertThat;
      import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
      import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
      
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
      
          @Autowired
          private WebApplicationContext context;
      
          private MockMvc mvc;
      
          @BeforeEach
          public void setup() {
              mvc = MockMvcBuilders
                      .webAppContextSetup(context)
                      .apply(springSecurity())
                      .build();
          }
      
          @AfterEach
          public void tearDown() throws Exception
          {
              postsRepository.deleteAll();
          }
      
          @Test
          @WithMockUser(roles = "USER")
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
              mvc.perform(post(url)
                              .contentType(MediaType.APPLICATION_JSON_UTF8)
                              .content(new ObjectMapper().writeValueAsString(requestDto)))
                      .andExpect(status().isOk());
      
              //then
              List<Posts> all = postsRepository.findAll();
              assertThat(all.get(0).getTitle()).isEqualTo(title);
              assertThat(all.get(0).getContent()).isEqualTo(content);
          }
      
          @Test
          @WithMockUser(roles = "USER")
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
      
              //when
              mvc.perform(put(url)
                              .contentType(MediaType.APPLICATION_JSON_UTF8)
                              .content(new ObjectMapper().writeValueAsString(requestDto)))
                      .andExpect(status().isOk());
      
              //then
              List<Posts> all = postsRepository.findAll();
              assertThat(all.get(0).getTitle()).isEqualTo(expectedTitle);
              assertThat(all.get(0).getContent()).isEqualTo(expectedContent);
          }
      }
      ```

* @WebMvcTest에서 CustomOAuth2UserService을 찾을 수 없음

  * returnHello도 첫 번째와 동일한 오류 메시지

  * 하지만 @WebMvcTest를 사용하므로 CustomOAuth2UserService를 스캔하지 않는 다는 점이 다름

    * @Repository, @Service, @Component는 스캔 대상이 아니므로 SecurityConfig 생성을 위한 CustomOAuth2UserService를 읽을 수 없음
    * 스캔 대상에서 SecurityConfig를 제거

  * 이후 @WithMockUser로 가짜 인증 생성

  * 아래와 같은 오류가 발생하는데, 이는 @EnableJpaAuditing으로 인해 하나 이상의 @Entity 클래스가 필요하기 때문

    > java.lang.IllegalArgumentException: At least one JPA metmodel must be present!

  * Application.java에서 @EnableJpaAuditing 제거 후 config 패키지에 JpaConfig 생성

    ```java
    package com.jojoldu.book.springboot.config;
    
    import org.springframework.context.annotation.Configuration;
    import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
    
    @Configuration
    @EnableJpaAuditing // JPA Auditing 활성화
    public class JpaConfig {}
    ```
