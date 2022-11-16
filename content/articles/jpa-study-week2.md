---
title: JPA 스터디 2주차
description: 3장 영속성 관리
slug: jpa-study-week2
category: Back-End
author: Hyunyeop Ahn
featured: none
---

JPA가 제공하는 기능은 크게
1. **엔티티와 테이블을 매핑하는 설계 부분**과
2. **매핑한 엔티티를 실제 사용하는 부분**으로 나눌 수 있습니다.

## 엔티티(Entity)란?

---

- 데이터의 집합
- 저장되고, 관리되어야 하는 데이터를 의미

## 엔티티 매니저(EntityManager)란?

---

- 엔티티를 **저장**, **수정**, **삭제**, **조회** 등 엔티티와 관련된 모든 일을 처리합니다.
- 엔티티를 저장하는 **가상의 데이터베이스**라고 생각하면 됩니다.

## 엔티티 매니저 팩토리와 엔티티 매니저

---

- 엔티티 매니저 팩토리란 **엔티티 매니저를 만드는 공장**
- 엔티티 매니저 팩토리 생성 코드

```java
// 공장 만들기, 비용이 아주 많이 든다.
EntityManagerFactory emf =
		Persistence.createEntityManagerFactory("jpabook");
```

- `Persistence.createEntityManagerFactory("jpabook");`를 호출 하면
  .xml에 있는 정보를 바탕으로 EntityManagerFactory를 생성합니다.

```xml
<persistence-unit name="jpabook">
	<properties>
		<property name="javax.persistence.jdbc.driver"
			value="org.h2.Driver"/>
		<property name="javax.persistence.jdbc.user"
			value="sa"/>
		<property name="javax.persistence.jdbc.password"
			value=""/>
		<property name="javax.persistence.jdbc.url"
			value="jdbc:h2:tcp://localhost/~/test"/>
		...
</persistence-unit>
```

---

- 팩토리를 만든 후 필요할 때마다 엔티티 매니저를 생성하면 됩니다.

```java
// 공장에서 엔티티 매니저 생성, 비용이 거의 안 든다.
EntityManager em = emf.createEntityManager();
```

- 팩토리를 만드는 비용이 크기 때문에
  **한 개만 만든 후 애플리케이션 전체에서 공유하도록 설계**되어 있습니다.
- **엔티티 매니저 팩토리**는 여러 스레드가 동시에 접근해도 안전하므로
  **서로 다른 스레드 간에 공유 가능**
- **엔티티 매니저**는 여러 스레드가 동시에 접근하면 **동시성 문제가 발생**하므로
  **스레드 간에 공유 불가**

![일반적인 웹 어플리케이션](/jpa-study-week2/3_1.png)

- 그림을 보면 EntityManagerFactory에서 다수의 엔티티 매니저를 생성했습니다.
- EntityManager1은 **데이터베이스 연결이 꼭 필요한 시점까지 커넥션을 얻지 않습니다.**
- EntityManager2는 커넥션을 사용중, **보통 트랜잭션을 시작할 때 커넥션을 획득**합니다.

<aside>
💡 JPA 구현체들은 EntityManagerFactory를 생성할 때 커넥션풀도 만든다. (J2SE 환경)
JPA를 J2SE 환경에서 사용하면 해당 컨테이너가 제공하는 데이터소스를 사용한다. (자세한건 11장)

</aside>

## 영속성 컨텍스트(persistence context)란?

---

- **엔티티를 영구 저장하는 환경**
- 엔티티 매니저로 **엔티티를 저장하거나 조회하면**
  엔티티 매니저는 **영속성 컨텍스트에 엔티티를 보관하고 관리**합니다.
- `.persist()` 메소드는 엔티티 매니저를 사용해서 **엔티티를 영속성 컨텍스트에 저장**합니다.
  Ex) `em.persist(member);` ⇒ 회원 엔티티를 저장

<aside>
💡 여러 엔티티 매니저가 같은 영속성 컨텍스트에 접근할 수도 있습니다.

</aside>

## 엔티티의 생명주기

---

**엔티티의 4가지 상태**

- 비영속(new/transient): 영속성 컨텍스트와 전혀 관계가 없는 상태
- 영속(managed): 영속성 컨텍스트에 저장된 상태
- 준영속(detached): 영속성 컨텍스트에 저장되었다가 분리된 상태
- 삭제(removed): 삭제된 상태

![생명주기](/jpa-study-week2/3_2.png)

### 비영속

- 엔티티 객체를 생성 후 저장하지 않은 상태

![em.persist() 호출 전, 비영속 상태](/jpa-study-week2/3_3.png)

### 영속

- 영속성 컨텍스트에 저장
- **영속성 컨텍스트에 의해 관리된다는 뜻**
- em.find() 나 JPQL을 사용해서 조회한 엔티티도 영속 상태를 의미

![em.persist() 호출 후, 영속 상태](/jpa-study-week2/3_4.png)

### 준영속

- 영속 상태 엔티티를 관리하지 않으면 준영속 상태가 됩니다.
- em.detach() : 특정 엔티티를 준영속 상태로 만든다.
  em.close() : 영속성 컨텍스트를 닫는다.
  em.clear() : 영속성 컨텍스트 초기화

```java
// 회원 엔티티를 영속성 컨텍스트에서 분리, 준영속 상태
em.detach(member);
```

### 삭제

- 엔티티를 영속성 컨텍스트와 데이터베이스에서 삭제

```java
// 객체를 삭제한 상태(삭제)
em.remove(member);
```

## 영속성 컨텍스트의 특징

---

### 1. 영속성 컨텍스트와 식별자 값

- 영속성 컨텍스트는 **엔티티를 식별자 값(@Id로 테이블의 기본 키와 매핑한 값)으로 구분**합니다.
- 따라서 **영속 상태는 식별자 값이 반드시 있어야 합니다.** (❗️없으면 예외 발생❗️)

### 2. 영속성 컨텍스트와 데이터베이스 저장

- JPA는 보통 **트랜잭션을 커밋하는 순간** 영속성 컨텍스트에 새로 저장된 엔티티를 데이터베이스에 반영합니다.
  ⇒ 이를 **플러시(flush)**라고 합니다.

### 3. 영속성 컨텍스트의 엔티티 관리 장점

- 1차 캐시 : 영속성 컨텍스트 내부에 있는 캐시
- 동일성 보장
- 트랜잭션을 지원하는 쓰기 지연
- 변경 감지
- 지연 로딩

## 엔티티 조회

---

- 영속 상태의 엔티티는 1차 캐시에 저장됩니다.
- Map으로 생각하면 다음과 같습니다.


    | Key | Value |
    | --- | --- |
    | @Id로 매핑한 식별자 | 엔티티 인스턴스 |

```java
// 엔티티를 생성한 상태 (비영속)
Member member = new Member();
member.setId("member1");
member.setUsername("회원1");

// 엔티티를 영속
em.persist(member);
```

위 코드를 실행하면 다음 그림과 같습니다.

![영속성 컨텍스트 1차 캐시](/jpa-study-week2/3_5.png)

- 1차 캐시에 회원 엔티티를 저장했지만 데이터베이스에 저장되지는 않았습니다.
- **식별자 값**은 **데이터베이스 기본 키**와 매핑되어 있습니다.
  ⇒ 즉, **데이터를 저장하고 조회하는 모든 기준은 데이터베이스 기본 키 값입니다.**

### 1차 캐시에서 조회

```java
Member member = em.find(Member.class, "member1");
```

- `find(엔티티 클래스 타입, 조회할 식별자 값)` 메소드로 엔티티를 조회합니다.
- 1차 캐시에 엔티티가 없으면 데이터베이스에서 조회합니다.

![1차 캐시에서 조회](/jpa-study-week2/3_6.png)

- 1차 캐시에 있는 엔티티 조회

```java
Member member = new Member();
member.setId("member1");
member.setUsername("회원1");

// 1차 캐시에 저장됨
em.persist(member);

// 1차 캐시에서 조회
Member findMember = em.find(Member.class, "member1");
```

### 데이터베이스에서 조회

- 1차 캐시에 없으면 엔티티 매니저가 데이터베이스를 조회해서 엔티티 생성
  - 1차 캐시에 저장 후 영속 상태의 엔티티 반환

![1차 캐시에 없어 데이터베이스 조회](/jpa-study-week2/3_7.png)

### 영속 엔티티의 동일성 보장

```java
Memeber a = em.find(Memeber.class, "member1");
Memeber b = em.find(Memeber.class, "member1");
```

- **영속성 컨텍스트는 성능상 이점과 엔티티의 동일성을 보장한다!
  a == b**

### 엔티티 등록

```java
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();
// 엔티티 매니저는 데이터 변경 시 트랜잭션을 시작해야 한다.
transaction.begin(); // [트랜잭션] 시작

em.persist(memberA);
em.persist(memberB);
// 여기까지 INSERT SQL을 데이터베이스에 보내지 않는다.

// 커밋하는 순간 데이터베이스에 INSERT SQL을 보낸다.
transaction.commit(); // [트랜잭션] 커밋
```

1. 커밋하기 전까지 내부 쿼리 저장소에 INSERT SQL을 모아둡니다.
2. 커밋할 때 모아둔 쿼리를 데이터베이스에 보냅니다.

⇒ 이를 **쓰기 지연(transactional write-behind)**이라 합니다.

![쓰기 지연, 커밋](/jpa-study-week2/3_10.png)

<aside>
💡 flush : 영속성 컨텍스트의 변경 내용을 데이터베이스에 동기화하는 작업
→ 등록, 수정, 삭제한 엔티티를 데이터베이스에 반영한다.

</aside>

즉,

- 영속화 `persist()` ⇒ 1차 캐시 저장 & 쓰기 지연 SQL 저장소에 저장(INSERT SQL 생성)
- 커밋 `commit()` ⇒ 데이터베이스에 반영

## 엔티티 수정

---

### 변경 감지**(dirty checking)**

```java
EntityManager em = emf.createEntityManager();
EntityTransaction transaction = em.getTransaction();
transaction.begin(); // 트랜잭션 시작

// 영속 엔티티 조회
Member memberA = em.find(Member.class, "memeberA");

// 영속 엔티티 데이터 수정
memberA.setUsername("hi");
memberA.setAge(10);

// em.update(member) 이런 코드가 있어야 하지 않을까?

transaction.commit(); // 트랜잭션 커밋
```

- JPA는 엔티티의 **변경사항을 데이터베이스에 자동으로 반영**합니다.
  ⇒ 이를 **변경 감지(dirty checking)**라고 합니다.
- 변경 감지는 **영속 상태**의 엔티티에만 적용됩니다. (비영속, 준영속 X)
- JPA는 엔티티의 특정 필드 업데이트가 아닌, **모든 필드를 업데이트**합니다.
  - 장점:
    - 수정 쿼리가 항상 같습니다. (바인딩 되는 데이터는 다르다)
      ⇒ 수정 쿼리를 미리 생성해두고 재사용할 수 있습니다.
    - 데이터베이스에 동일한 쿼리를 보내면 이전에 파싱된 쿼리를 재사용할 수 있습니다.
  - 단점:
    - 데이터 전송량 증가

    <aside>
    💡 데이터 전송량이 너무 크면 하이버네이트 확장 기능을 사용해서 동적으로 UPDATE SQL을 생성하면 된다.
    `@org.hibernate.annotations.DynamicUpdate`

    </aside>


![변경 감지](/jpa-study-week2/3_11.png)

### **변경 감지의 순서**

1. 커밋하면 엔티티 매니저 내부에서 먼저 `flush()`가 호출됩니다.
2. 엔티티와 스냅샷을 비교 후 변경된 엔티티를 찾습니다.
  - 스냅샷: 영속성 컨텍스트에 보관할 때, 최초의 상태를 복사 후 저장
3. 수정 쿼리를 생성해서 쓰기 지연 SQL 저장소에 보냅니다.
4. 쓰기 지연 저장소의 SQL을 데이터베이스에 보냅니다.
5. 데이터베이스 트랜잭션을 커밋합니다.

## 엔티티 삭제

---

```java
Member memberA = em.find(Member.class, "memberA"); // 삭제 대상 엔티티 조회
em.remove(memberA); // 엔티티 삭제
```

1. 먼저 삭제 대상 엔티티를 조회합니다.
2. 엔티티를 삭제합니다. (영속성 컨텍스트에서도 제거된다)

## 플러시 `flush()`

---

**영속성 컨텍스트를 플러시하는 3가지 방법**

1. `em.flush()` 를 직접 호출
2. 트랜잭션 커밋 시 자동 호출
3. JPQL 쿼리 실행 시 자동 호출

### 직접 호출

- 강제로 플러시 하는 방법
- 테스트나 다른 프레임워크와 JPA를 함께 사용할 때를 제외하고 거의 사용하지 않습니다.

### 트랜잭션 커밋 시 플러시 자동 호출

- 트랜잭션을 커밋하기 전에 플러시를 호출해서 영속성 컨텍스트의 변경 내용을 데이터베이스에 반영해야합니다.
- JPA는 이런 문제를 예방하기 위해 자동으로 호출합니다.

### JPQL 쿼리 실행 시 자동 호출

- 객체지향 쿼리를 호출할 때도 자동으로 호출된다.

```java
em.persist(memberA);
em.persist(memberB);
em.persist(memberC);

// 중간에 JPQL 실행
query = em.createQuery("select m from Member m", Member.class);
List<Member> members = query.getResultList();
```

memberA, memberB, memberC는 영속성 컨텍스트에는 있지만 아직 **데이터베이스에 반영되지 않았습니다.**

JPQL은 SQL로 변환되어 **데이터베이스에서 엔티티를 조회합니다.**

⇒ 문제점: 데이터베이스에 없는데 데이터베이스에서 조회합니다.

- JPA는 이런 문제를 예방하기 위해 자동으로 호출합니다.

(단순히 조회하는`find()` 메소드를 호출할 때는 플러시가 실행되지 않는다.)

## 준영속

---

- 영속성 컨텍스트에서 분리된(detached) 것을 준영속 상태라 합니다.

  ⇒ 영속성 컨텍스트가 제공하는 기능을 사용할 수 없습니다.


### 엔티티를 준영속 상태로 전환: detach()

- 1차 캐시부터 쓰기 지연 SQL 저장소까지 해당 엔티티를 관리하기 위한 모든 정보가 제거됩니다.

![detach 실행 전](/jpa-study-week2/3_12.png)

![detach 실행 후](/jpa-study-week2/3_13.png)

### 영속성 컨텍스트 초기화: clear()

- `em.clear();`

![영속성 컨텍스트 초기화 후](/jpa-study-week2/3_15.png)

### 영속성 컨텍스트 종료: close()

![영속성 컨텍스트 제거 후](/jpa-study-week2/3_17.png)

### 준영속 상태의 특징

- 거의 비영속 상태에 가깝습니다.
- 식별자 값을 가지고 있습니다.
- 지연 로딩을 할 수 없습니다.

### 병합: merge()

- 준영속 상태의 엔티티를 다시 영속 상태로 변경하는 방법
- `merge()` 메소드는 준영속 상태의 엔티티를 받아서 그 정보로 **새로운 영속 상태의 엔티티를 반환합니다.**

![준영속 병합 - 수정](/jpa-study-week2/3_18.png)

1. merge() 를 실행합니다.
2. 파라미터로 넘어온 준영속 엔티티의 식별자 값으로 1차 캐시에서 엔티티를 조회합니다. (1차 캐시에 없으면 데이터베이스에서 조회 후 1차 캐시에 저장)
3. 조회한 영속 엔티티에 엔티티의 값을 채워 넣습니다(덮어 쓰기).
4. 반환한다.
- 병합은 준영속, 비영속을 신경 쓰지 않고 식별자 값으로 엔티티를 조회할 수
  **있으면 불러서 병합**하고,
  **없으면 새로 생성해서 병합**합니다.

> 참고문헌
*김영한,* *자바 ORM 표준 JPA 프로그래밍(에이콘출판, 2015)*
>
