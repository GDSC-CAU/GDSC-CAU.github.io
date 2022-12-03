# chapter 4

- JPA 사용 → 엔티티와 테이블을 정확히 매핑해야 함
    
    ⇒ 어노테이을 정확히 숙지하고 사용 필요
    

**대표적인 어노테이션**

- 객체와 테이블 매핑 → @Entity, @Table
- 기본 키 매핑 → @Id
- 필드와 컬럼 매핑 → @Column
- 연관관계 매핑 → @ManyToOne, @JoinColumn

# @Entity

- 테이블과 매핑할 클래스 → @Entity 어노테이션을 필수로 붙이기
    - @Entity가 붙은 클래스 → JPA가 관리하는 클래스가 된다.

| 속성 | 기능 | 기본값 |
| --- | --- | --- |
| name | JPA에서 사용할 엔티티 이름을 지정
보통 기본값인 클래스 이름을 사용
만약 다른 패키지에 이름이 같은 엔티티 클래스가 있다면 이름을 지정해 충돌하지 않도록 한다. | 설정하지 않으면 클래스 이름을 그대로 사용한다. |

## 사용 시 주의사항

- 기본 생성자는 필수로 있어야 한다
    - ex) 파라미터가 없는 public 또는 protected 생성자
    - JPA → 엔티티 객체 생성 시 기본 생성자를 사용하기 때문에 생성자는 반드시 필요하다.
- final 클래스, enum, interface, inner 클래스는 사용이 불가능하다
- 저장할 필드에 final을 사용하면 안된다

### 생성자가 없다면?

```java
public Member(){} // 기본 생성
```

- 자바 → 생성자가 하나도 없으면 위와 같은 기본 생성자를 자동으로 만든다.
    - 생성자가 하나 이상 존재 → 자동으로 만들지 X
    
    ⇒ 임의로 생성자를 만들어주는 과정이 필요하다.
    

```java
public Member(String name){
	this.name = name;
} // 임의로 만든 생성자
```

# @Table

엔티티와 매핑할 테이블을 지정하는 어노테이션, 생략하면 매핑한 엔티티 이름을 테이블 이름으로 사용한다.

![Table](/jpa-study-week3/4_1.png)

# 다양한 매핑 사용

```java
@Enumerated(EnumType.STRING)
private RoleType roleType;
```

- JAVA의 enum을 사용해 회원의 타입을 구분한다
    - 일반 회원은 USER, 관리자는 ADMIN으로 구분한다
    
    ⇒ JAVA의 enum을 사용하기 위해서는 @Enumerated 어노테이션으로 매핑한다.
    

```java
@Temporal(TemporalType.TIMESTAMP)
private Date createdDate;

@Temporal(TemporalType.TIMESTAMP)
private Date lastModifiedDate;
```

- 자바에서 날짜 타입을 사용할 때에는 @Temporal 어노테이션을 사용하여 매핑하는 형태를 보이고 있다.

```java
@Lob
private String description
```

- 회원을 설명하는 description이다. 해당 필드는 길이 제한이 없어, VARCHAR 대신 CLOB 타입으로 매핑한다
    - @Lob → CLOB, BLOB 타입을 매핑할 수 있다.

# 데이터베이스 스키마 자동 생성

- JPA → 데이터베이스 스키마를 자동으로 생성하는 기능을 지원한다.
    - 클래스의 매핑정보 → 어떤 테이블에 어떤 컬럼을 사용하는지 알 수 있다.
    
    ⇒ 매핑 정보, 데이터베이스 방언을 사용해 스키마를 생성한다.
    

## 스키마 자동 생성 기능의 사용

```java
<!-- H2 데이터베이스 방언 사용 -->
<property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>
```

- persistence.xml에 위와 같은 속성을 추가한다
    - 애플리케이션 실행 시점에 위 속성 추가 시 테이블을 자동으로 생성한다
- `hibernate.show_sql` 속성을 `true`로 설정 시 콘솔 실행 DLL을 출력이 가능하다.

```java
<!-- 실행되는 SQL 을 보여줌 -->
<property name="hibernate.show_sql" value="true" />
```

애플리케이션 실행 시 아래처럼 콘솔에 DDL이 출력되며 실제 테이블이 생성된다.

![DDL_consolResult](/jpa-study-week3/4_2.png)

⇒ 기존 테이블이 삭제되고, 이후 다시 생성된 것을 볼 수 있다

roleType → VARCHAR type으로 createDate, lastModifiedDate는 TIMESTAMP type 등으로 생성된 것을 볼 수 있다.

- 자동 생성 DDL → DB 방언에 따라 달라진다
    - 오라클 DB용 방언 → VARCHAR 대신 VARCHAR2가 생성된다.

![auto_attribute](/jpa-study-week3/4_3.png)

객체와 테이블을 매핑하는데 익숙치 않으면, 데이터베이스 스키마 자동 생성 기능을 활용하여 생성된 DDL과 엔티티-테이블이 어떻게 매핑되는지 이해하자.

# DDL 생성 기능

회원 이름이 필수로 입력되어야 하고, 10자를 초과하면 안된다는 제약 조건을 코드를 추가해서 나타내보고자 한다.

```java
@Column(name = "NAME", nullable = false, length = 10) //추가 //**
@Column(name = "NAME") //추가 //**
private String username;
```

- nullable = flase
    - 자동 생성되는 DDL에 not null 제약 조건 추가가 가능하다
- length 속성 값 사용
    - 자동생성되는 DDL에 문자의 크기가 지정이 가능하

![created_DDL1](/jpa-study-week3/4_4.png)

⇒ not null이라는 제약 조건이 추가가 되었다.

## 유니크 제약조건

```java
@Table(name="MEMBER", uniqueConstraints = {@UniqueConstraint( //추가 //**
        name = "NAME_AGE_UNIQUE",
        columnNames = {"NAME", "AGE"} )})
```

유니크 제약 조건을 만들어주는 @UniqueConstraint를 사용하고자 한다.

![created_DDL2](/jpa-study-week3/4_5.png)

- 앞서 적용한 length와 nullable 속성 → DDL 자동 생성에만 사용이 되고, JPA 실행 로직에는 영향 X
    - 스키마 자동 생성기능이 아닌 DDL을 직접 만들면 사용 이유X
    
    ⇒ 그래도 본 기능을 사용하면 애플리케이션 개발자가 엔티티만 보고도 손쉽게 제약 조건을 파악할 수 있다
    

즉, 실행동작에는 영향을 주지는 않지만 자동 생성되는 DDL을 위한 기능이 존재한다고 볼 수 있다.

# 기본 키 매핑

지금까지는 @Id 어노테이션만 사용해 회원의 기본 키를 애플리케이션에 직접적으로 할당했다. 이때, 기본 키를 애플리케이션이 직접 할당하는 대신 DB 생성 값을 사용하기 위한 매핑에 대해 알아보고자 한다.

**JPA 제공 DB 기본 키 생성 전략**

- 직접 할당 : 기본 캐를 애플리케이션에서 직접 할당
- 자동 생성: 대리 키 사용 방식
    - IDENTITY : 기본 키 생성을 데이터베이스에 위임한다
    - SEQUENCE : 데이터베이스 시퀀스를 사용해 기본 키를 할당한다
    - TABLE : 키 생성 테이블을 사용한다

⇒ 각 데이터베이스 벤더마다 지원 방식이 다르기 때문에 맞게 사용해주어야 한다.

**각 DB별 특성**

- ORAClE
    - 시퀀스를 제공 → but MYSQL은 지원X
- MYSQL
    - 기본 키 값을 자동으로 채우는 AUTO_INCREMENT 기능 사용
    
    ⇒ SEQUENCE, IDENTITY 전략 → 사용 DB에 의존
    

## 기본 키 직접 할당 전략

```java
@Id
@Column(name="id")
private String id;
```

- @Id 적용 가능 자바 타입
    - 자바 기본형
    - 자바 래퍼형
    - String
    - java.util.Date
    - java.sql.Date
    - java.math.BigDecimal
    - java.math.BigInteger

```java
Board board = new Board();
board.setId("id1") // 기본 키 직접 할당
em.persist(board);
```

⇒ 기본 키 직접 할당의 경우 `em.persist()` 로 엔티티 저장 전 애플리케이션에서 기본 키를 직접 할당한다.

## IDENTITY 전략

기본 키 생성을 데이터베이스에 위임하는 전략으로, 주로 MySQL, PostgreSQL, SQL Server, DB2에서 사용한다.

```sql
CREATE TABLE BOARD(
	ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	DATA VARCHAR(255)
);

INSERT INTO BOARD(DATA) VALUES('A');
INSERT INTO BOARD(DATA) VALUES('B');
```

DB 생성 시 컬럼인 ID에 AUTO_INCREMENT를 추가하여, 데이터베이스 값 저장 시 ID 컬럼을 비우면 데이터베이스가 순서대로 값을 채우게 된다.

![BOARD_result](/jpa-study-week3/4_6.png)

⇒ 위처럼 자동으로 ID컬럼에 값이 입력되었다.

- IDENTITY 전략
    - AUTO_INCREMENT를 사용한 것 처럼, DB에 저장을 하고 나서야 기본 키 값을 구할 수 있다

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
```

```java
private static void logic(EntityManager em){
	Board board = new Board();
	em.persist(board);
	System.out.pringln("board.id = " + board.getId());
}
// 출력 : board.id = 1
```

- strategy 속성을 `GenerationType.IDENTITY`로 지정했을 때의 결과
- em.persist()를 호출해서 엔티티를 저장한 직후 할당된 식별자 값 출력
    - 출력된 값 → DB에서 생성한 값을 JPA가 조회

## SEQUENCE 전략

유일한 값을 순서대로 생성하는 특별한 데이터베이스 오브젝트

- 오라클, PostgreSQL, DB2, H2 데이터베이스에서 사용 가능

```sql
CREATE TABLE BOARD (
	ID BIGINT NOT NULL PRIMARY KEY,
	DATA VARCHAR(255)
)

//시퀀스 생성
CREATE SEQUENCE BOARD_SEQ START WITH 1 INCREMENT BY 1;
```

```java
@Entity
@SequenceGenerator(
	name = "BOARD_SEQ_GENERATOR",
	sequenceName = "BOARD_SEQ", //매핑할 데이터베이스 시퀀스 이름
	initialValue = 1, allocationSize = 1)

public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE,
		Generator = "BOARD_SEQ_GENERATOR")
}
```

1. 우선적으로 사용할 DB 시퀀스를 매핑한다
2. @SequenceGenerator를 사용해 BOARD_SEQ_GENERATOR 시퀀스 생성기를 등록
3. sequenceName 속성의 이름으로 BOARD_SEQ 지정
4. JPA는 이후 해당 시퀀스 생성기를 실제 데이터베이스의 BOARD_SEQ의 시퀀스와 매핑
5. 이후 키 생성 전략을 GenerateType.SEQUENCE로 설정 후 generator = “BOARD_SEQ_GENERATOR”로 방금 등록한 시퀀스 생성기가 할당.

```java
private static void logic(EntityManager em){
	Board board = new Board();
	em.persist(board);
	System.out.println("board.id = " + board.getId());
}

//출력: board.id = 1
```

- IDENTITY와 비슷해도 내부 동작 방식에 차이 존재
    - SEQUENCE → em.persist()를 호출할 때 먼저 데이터베이스 시퀀스를 사용하여 식별자 조회
        - 이후 조회 식별자를 엔티티 할당 → 엔티티를 영속성 컨텍스트에 저장
        - 이후 트랜잭션 커밋 → 플러시가 일어나면 Entity를 DB에 저장

⇒ IDENTITY는 먼저 엔티티를 DB에 저장 후 식별자를 조회해 엔티티의 식별자에 할당하는 방식

### @SequenceGenerator

![SequenceGenerator_attribute](/jpa-study-week3/4_7.png)

```java
create sequence [sequenceName]
starte with [initialValue] increment by [allocationSize]
```

⇒ 위와 같이 DDL이 매핑된다.

## TABLE 전략

전략 키 생성 전용 테이블을 하나 만든 뒤, 여기에 이름과 값을 사용할 컬럼을 만들어 데이터베이스 시퀀스를 흉내내는 전략이다.

⇒ 모든 데이터베이스에 적용이 가능한 전략이다

![TABLE_DDL](/jpa-study-week3/4_8.png)

⇒ 키 생성 용도로 사용할 테이블을 미리 생성한다

- sequence_name column을 시퀀스 이름으로 사용
- next_val → 시퀀스 값으로 사용

⇒ 컬럼의 이름은 변경이 가능하나, 여기서 기본 값이 사용되었다.

```java
@Entity
@TableGenerator(
	name = "BOARD_SEQ_GENERATOR",
	table = "MY_SEQUENCES"
	pkColumnValue - "BOARD_SEQ", allocationSize = 1)

public class Board (

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE,
		generator = "BOARD_SEQ_GENERATOR")
...
```

- @TableGenerator 사용 → 테이블 키 생성을 등록
    - BOARD_SEQ_GENERATOR라는 이름의 테이블 키 생성기 등록
    - MY_SEQUENCES 테이블을 키 생성용 테이블로 매핑
- GenerationType.TABLE → TABLE 전략으로 사용하고자 사용
    - @GeneratedValue.generator에 방금 만든 테이블 키 생성기 지정

⇒ id 식별자 값은 BOARD_SEQ_GENERATOR 테이블 키 생성기가 할당

```java
private static void logic(EntityManager em){
	Board board = new Board();
	em.persist(board);
	System.out.println("board.id=",board.getId());
}
//출력 : board.id = 1
```

- TABLE 전략 → 시퀀스 대신 테이블 사용만 제외 시 SEQUENCE 전략과 내부 동작 방식이 일치

![MY_SEQUENCE_result](/jpa-study-week3/4_9.png)

- @TableGenerator.pkColumnValue에서 지정한 BOARD_SEQ가 컬럼명으로 추가된 것을 확인 가능
    - 키 생성기 사용 → next_val 컬럼명이 증가

### @TableGenerator

![TableGenerator_attribute](/jpa-study-week3/4_10.png)

## AUTO 전략

데이터베이스의 종류도 많고 기본 키를 만드는 방법도 다양하다. 이때 GenerationType.AUTO는 선택한 데이터베이스 방언에 따라 IDENTITY, SEQUENCE, TABLE 전략 중 하나를 자동으로 선택한다

```java
@Entity
public class Board{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	...
}
```

- strategy의 기본값은 AUTO  → 아래처럼 사용해도 결과는 같다.

```java
@Id @GeneratedValue
private Long id;
```

- DB를 변경해도 코드를 수정할 필요가 없게 한다
    - 키 생성 전략이 확정되지 않은 개발 초기, 프로토타입에서 자주 사용된다.
- AUTO 사용 시 SEQUENCE나 TABLE 전략 선택 시 시퀀스나 키 생성용 테이블을 미리 만들어 두어야 한다.

# 필드와 컬럼 매핑: 레퍼런스

![Field_column](/jpa-study-week3/4_11.png)

## @Column

객체 필드를 테이블 컬럼에 매핑시 자주 사용하는 컬럼이다. 속성중에서 `name`이나 `nullable`이 주로 사용되고 있다.

![Column_attribute1](/jpa-study-week3/4_12.png)

![Column_attribute2](/jpa-study-week3/4_13.png)

## @Enumerated

자바의 enum 타입을 매핑할 때 사용된다.

![Enumerated_attribute](/jpa-study-week3/4_14.png)

```java
public enum RoleType {
    ADMIN, USER
}
```

```java
@Enumerated(EnumType.STRING)
private RoleType roleType;
```

⇒ 위의 방식처럼 Enum을 사용할 수 있다 이렇게 사용을 한다면, 편리하게 enum 타입을 데이터베이스에 저장이 가능하다.

- EnumType.ORDINAL은 enum에 정의된 순서대로 ADMIN은 0, USER는 1 값이 데이터 베이스에 저장되는 방식이다
    - DB에 저장되는 데이터 크기가 작다는 장점이 있다
    - 이미 저장된 enum의 순서를 바꿀 수 없다는 단점이 있다.
- EnumType.STRING → enum 이름 그대로 DB에 저장된다
    - ex) ‘ADMIN’, ‘USER’
    - 저장된 enum의 순서가 바뀌거나 새로 추가되어도 안전하다
    - DB에 저장되는 크기가 ORDINAL에 비해 크다는 단점이 있다.

## @Temporal

날짜 타입을 매핑할때 사용한다.

![Temporal_attribute](/jpa-study-week3/4_15.png)

```java
@Temporal(TemporalType.TIMESTAMP)
private Date createdDate;

@Temporal(TemporalType.TIMESTAMP)
private Date lastModifiedDate;
```

⇒ 위와 같은 방식으로 사용한다.

자바의 Date 타입에는 년월일, 시분초가 있지만 DB에는 date(날짜), time(시간), timestamp(날짜와 시간)라는 세가지 타입이 별도로 존재한다.

## @Lob

BLOB와 CLOB 타입과 매핑한다

- CLOB : String, char[], java.sql.CLOB
    - 매핑 필드타입이 문자일때, 지정할 수 없는 속성일경우 사용
- BLOB : byte[], java.sql.BLOB
    - CLOB 이외의 속성

```java
@Lob
private String description;
```

## @Transient

해당 필드는 매핑하지 않는다. 따라서 DB에 저장 조회가 이루어지지 않으며, 객체에 임시로 어떤 값을 보관하고 싶을 때 사용한다

```java
@Transient
private Integer temp;
```

## @Access

JPA가 엔티티 데이터에 접근하는 방식을 지정한다

- 필드 접근
    - AccessType.FIELD로 지정하며 필드에 직접 접근한다
    - 필드 접근 권한이 private여도 접근이 가능하다
- 프로퍼티 접근
    - AccessType.PROPERTY로 지정한다
    - 접근자(Getter)를 사용한다

⇒ @Access를 설정하지 않으면 @Id의 위치를 기준으로 접근 방식이 설정된다.

```java
@Access(AccessType.FIELD)
```

⇒ @Id가 필드에 있으면 생략을 해도 무방하다

```java
@Access(AccessType.PROPERTY)
```

⇒ @Id가 property에 있다면 생략해도 무방하다

ex) public