---
title: JDBC와 JPA
description: Java와 Relational Database간의 통신 방법들을 알아보고 각 장단점을 알아봅니다.
slug: jpa-study-week1
category: Back-End
author: Myungseung Kim
featured: none
---# SQL Based Connection

## JDBC

**JDBC**(Java Database Connectivity)는 Java에서 데이터베이스에 접속할 수 있도록 하는 Java API이다.

각기 다른 데이터베이스들의 접속방법, 데이터를 처리하는 방법을 표준화된 방법으로 접속할 수 있도록 만든 API 규격이어서, 데이터베이스의 종류에 구애받지 않고 프로그램을 작성할 수 있다.

<img src="https://t1.daumcdn.net/cfile/tistory/99CE49365AAE548609"/>

Java로 작성한 애플리케이션은 Jdbc API를 사용해서 SQL을 DB에 전달하는데, 이러한 개발 방식은 많은 문제점을 야기했다.

## Cons

### 비효율적인 반복

Jdbc를 사용하여 데이터를 가져오는 과정은 아래와 같다.

1. 조회 SQL을 작성한다

```java
String sql = "SELECT MEMBER_ID, NAME FROM MEMBER M WHERE MEMBER_ID = ?"
```

2. Jdbc API를 사용하여 SQL을 실행한다

```java
ResultSet rs = stmt.executeQuery(sql)
```

3. 조회 결과를 Member 객체로 매핑한다.

```java
String memberId = rs.getString("MEMBER_ID");

String name = rs.getString("NAME");

Member member = new Member();

member.setMemberId(memberId);

member.setName (name);
```

데이터를 삽입하는 과정은 아래와 같다.

1. 삽입 SQL을 작성한다

```java
String sql = "INSERT INTO MEMBER (MEMBER_ID, NAME) VALUES (?,?)";
```

2. Member 객체에서 값을 꺼내어 전달한다

```java
pstmt.setString(1, member.getMemberId());
pstmt.setString(2, member.getName());
```

3. SQL을 실행한다

```java
pstmt.executeUpdate(sql);
```

위와 같은 방식으로 Java와 RDB 사이의 변환 코드를 작성해 주어야 한다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9929BA3F5AAE560321"/>

문제는 객체를 DB에 CRUD하려면 너무나도 많은 SQL과 Jdbc API를 작성해주어야 하고, 테이블이 추가될때마다 같은 일을 반복해야만 한다.

서비스 로직을 생각하기도 바쁜 개발자들에게, 이런 단순하고 많은 작업은 큰 문제점으로 여겨져왔다.

### SQL Reliance

기존 Table에서 Attribute가 추가될 때마다, 코드에 하드코딩으로 작성되어 있던 SQL문을 일일이 찾아가며 수정
해주어야 한다.

```java
String sql = "SELECT MEMBER_ID, NAME FROM MEMBER M WHERE MEMBER_ID = ?"
```

위의 MEMBER table에서 만약 GENDER라는 Attribute가 추가되었다면? SQL을 아래와 같이 수정해 주어야 정상적으로 작동할 수 있다.

```java
String sql = "SELECT MEMBER_ID, NAME, GENDER FROM MEMBER M WHERE MEMBER_ID = ?"
```

이는 SQL에 의존적인 개발을 야기할 수밖에 없다.

### Paradigm 불일치

Java는 객체지향언어의 대표적인 예시이다. 대부분의 데이터들은 Object로 처리되고, Abstraction / Inheritance / Polymorphism의 특성을 지니고 있다.

문제는, RDB는 데이터 중심으로 구조화 되어있어, 객체지향의 특성을 반영하지 않는다.

#### Inheritance

<img src="https://t1.daumcdn.net/cfile/tistory/998885466072C07C1A?original"/>

RDB에서 상속과 유사한 형태로 Table을 설계하기 위해서는 우측 ERD와 같은 방법을 사용하여야 한다. **DTYPE**에 해당 ITEM이 ALBUM인지, MOVIE인지, BOOK인지 명시하여야 한다.

이런 구조에서 Jdbc API를 사용하여 ALBUM 데이터를 조회하려면, ITEM과 ALBUM을 JOIN하는 SQL을 작성해야 한다. 안그래도 관리하기 힘든 SQL을 더 복잡하게 만드는 요소이다.

#### Object Relation

<img src="https://t1.daumcdn.net/cfile/tistory/99D57D376072C07C17?original"/>

Member의 Team name을 가져오기 위해 Object에서는 `member.getTeam().getName()`로, RDB에서는 `SELECT * FROM MEMBER JOIN TEAM ON ... WHERE ID = ...`처럼 FK를 통한 JOIN을 통해 가져올 수 있다.

역방향일 경우에는 어떨까? Object는 단방향이기 때문에 team.getMember()가 불가능하다. RDB는 JOIN의 방향성이 없기 때문에 가능하다.

즉, Object는 Relation을 위해 참조가 필요한 반면, RDB는 FK가 필요하다.

이런 Paradigm 불일치를 해소시키기 위해, 아래와 같은 추가적인 Logic이 필수적이다.

```java
/**
	RDB에서 Object로 변환하여 조회하는 과정
*/

// JOIN을 통한 SQL로 데이터 불러오기

Member member = new Member();
// 데이터베이스에서 조회환 회원 관련 정보를 모두 입력

Team team = new Team();
// 데이터베이스에서 조회한 팀 관련 정보를 모두 입력

// 회원과 팀 관계 설정
member.setTeam(team);
return member;
```

#### Object Relation Search

<img src="https://t1.daumcdn.net/cfile/tistory/99C22D336072C07C19?original"/>

위와 같이 Relation이 구성된 상황에서는, Object의 경우 아래와 같이 연속되는 탐색이 가능하다.

```java
member.getOrder().getOrderItem().getItem()
```

반면 RDB의 경우, 연속적이고 명시적인 JOIN이 필수적이다

```SQL
SELECT * FROM MEMBER LEFT JOIN ORDER ON ... LEFT JOIN ORDER_ITEM ON ... LEFT JOIN ITEM ON ... WHERE ..
```

각기 다른 상황마다 탐색하는 범위도 달라지는데, 그에 따른 각기 다른 JOIN문을 작성하고 Logic을 만들기에는 너무나 수고스러운 일이다.

```java
member.getMemeber(); //member만 조회
member.getMemeberWithTeam(); // join Member, Team
member.getMemeberWithOrder(); // join Member, Order
member.getMemeberWithOrderWithDelivery(); //join Member,Order,Delivery
```

#### Equality

```java
String memberId = "100";
Member member1 = memberDAO.getMemeber(memberId);
Member member2 = memberDAO.getMemeber(memberId);

print(member1 == member2); // false
```

RDB 입장에서는 같은 memberId로 조회했기에 member1과 member2는 같은 객체여야 하지만, Java에서는 그렇지 않다. `getMember()` 함수에서는 `new Member()` 생성자로 Instance를 생성하기 때문에, 위 코드는 false를 출력한다.

이를 해결하기 위해서는 Member의 `equals()`를 override하여 별도의 동등성 비교 로직을 짜고, `==` 연산자가 아닌 `equals()`를 사용해야 할 것이다.

Object Model과 RDB Model은 위와 같이 지향하는 Paradigm이 서로 다르다. 이 점을 극복하기 위해서는 별도의 Logic이 필수불가결하며, 이는 개발자의 반복적이고 소모적인 작업을 요한다.

이러한 문제점을 해결하기 위해 등장한것이 바로 JPA이다.

# JPA

**JPA**(Java Persistence API)는 Java ORM 기술에 대한 API 표준 명세이다.

> **ORM**(Object Relational Mapping)
>
> Object와 RDB를 Mapping하는 것
> 위에서 언급했던 Paradigm의 불일치를 해소시켜 줌

즉, Interface를 모아둔 표준 API에 불구하다. 따라서 JPA를 사용하기 위해서는 이를 구현한 ORM Framework를 선택해야 한다. 그 중 가장 대중적인 Framework는 **Hibernate**이다.

<img src="https://pbs.twimg.com/media/FP5_mvtXMAk3x1C.png"/>

## Pros

### SQL Independent

JPA를 사용하게 된다면 Object와 RDB를 다룰 때, 개발자가 직접 SQL을 작성하는 것이 아닌, JPA에서 제공하는 API를 사용하게 된다. 그러면 JPA가 적절한 SQL을 생성하여 RDB에 쿼리를 전송하고, 결과값을 알아서 Object로 Mapping해주게 된다.

- INSERT

```java
jpa.persist(member);
```

`persist()` 메소드는 객체를 데이터베이스에 저장한다. 이 메소드를 호출하면 JPA가 객체와 매핑정보를 보고 적절한 INSERT SOL을 생성하여 DB에 전달한다.

- SELECT

```java
String memberId = "4191";
Member member = jpa.find(Member.class, memberId)
```

`find()` 메소드는 객체 하나를 데이터베이스에서 조회한다. JPA는 객체와 매핑정보를 보고 적절한 SELECT SQL을 생성해서 데이터베이스에 전달하고 그 결과로 Member 객체를 생성해서 반환한다.

- UPDATE

```java
Member member = jpa.find(Member.class, memberId);
member.setName("lee")
```

JPA는 별도의 수정 메소드를 제공하지 않는다. 대신에 객체를 조회해서 값을 변경만 하면 트랜잭션을 커밋할 때 데이터베이스에 적절한 UPDATE SQL이 전달된다.

이로 인해 생산성이 증가하고, 유지보수가 용이해지는 이점을 가져올 수 있다.

### Paradigm 불일치 해소

#### Inheritence

<img src="https://t1.daumcdn.net/cfile/tistory/998885466072C07C1A?original"/>

```java
Album album = jpa.find(Album.class, albumId);
```

위와 같이 `find()`함수를 작성하면, JPA에서는 아래와 같은 SQL문을 생성한다.

```SQL
SELECT I.*, A.* FROM ITEM I JOIN ALBUM A ON I.ITEM_ID = A.ITEM_ID
```

상속관계를 구현하기 위해 필요했던 부가적인 SQL을 더이상 작성하지 않아도 된다!

#### Object Relation

<img src="https://t1.daumcdn.net/cfile/tistory/99D57D376072C07C17?original"/>

```java
Member member = jpa.find(Member.class, memberId);
member.getTeam();
```

별도의 JOIN SQL이 필요 없다. JPA에서 FK를 읽어 참조 형식을 변환해 준다.

#### Object Relation Search

<img src="https://t1.daumcdn.net/cfile/tistory/99C22D336072C07C19?original"/>

```java
Member member = jpa.find(Member.class, member);
Order order = member.getOrder();

// getOrderDate()를 실행할 때 SELECT ORDER SQL을 실행하여 조회
order.getOrderDate();
```

JPA는 연관된 객체를 사용하는 시점에 SQL을 실행한다. 이 기능은 실제 객체를 사용하는 시점까지 DB 조회를 미룬다 해서 지연 로딩이라고도 부른다.

#### Equality

```java
String memberId = "100";
Member member1 = jpa.find(Member.class, memberId);
Member member2 = jpa.find(Member.class, memberId);

print(member1 == member2); // true
```

JPA는 같은 트랜잭션일 경우 같은 객체가 조회되는 것을 보장한다.

또한 `member2`를 초기화하는 과정에서는 `find()`를 실행하지 않고 `member1`을 초기화하는 과정에 조회한 객체를 재사용하여 성능상에도 이점을 가져온다.

#### DB Vendor Dependent

같은 RDB여도 각 Vendor마다 사용하는 Query, 혹은 사용법이 다른 경우가 많다. 단적인 예로 Paging 처리는 각 RDB마다 달라서 사용법을 다르게 익혀야 한다.
이는 처음 선택한 DB에 종속되게 만들어 다른 DB로 이동하기 어렵게 한다.

JPA는 아래와 같이 접근 계층을 제공하여 Application이 특정 DB에 종속되지 않도록 한다. 사실 JDBC 또한 마찬가지이지 않을까?

<img src="https://velog.velcdn.com/images%2Fyu-jin-song%2Fpost%2Fdcaeda65-3fed-4973-bf89-73e1274b85f3%2F벤더_독립성.png"/>

> 참고문헌
>
> _김영한, 자바 ORM 표준 JPA 프로그래밍(에이콘출판, 2015)_
