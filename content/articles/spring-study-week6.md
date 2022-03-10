---

title: EC2 서버에 프로젝트를 배포해 보자
description: 스프링 부트 서비스 코드와 배포 환경 구성을 조합하여 실제로 서비스를 배포해보자
slug: spring-study-week6
category: Back-End
author: hwikyung kim
featured: Featured
img: spring.png

---

## 스프링 스터디 6주차(챕터8)

### EC2에 프로젝트 Clone 받기

* 깃허브에서 코드를 받아올 수 있게 EC2에 Git 설치
 ```sudo yum install git```
* 설치가 완료되면 다음 명령어로 설치 상태 확인
 ```git --version```
* 깃이 성공적으로 처리되면 git clone으로 프로젝트를 저장할 디렉토리 생성
 ```mkdir ~/app && mkdir ~/app/step1```
* 깃허브에서 코드를 받아올 수 있게 EC2에 Git 설치
 ```sudo yum install git```
* 생성된 디렉토리로 이동
 ```cd ~/app/step1```
* 깃허브 웹페이지에서 https 주소를 복사 
 ```git clone 복사한 주소```
* git clone이 끝났으면 클론된 프로젝트로 이동해서 파일들이 잘 복사되었는지 확인
```cd 프로젝트명
   ll
```

* 코드가 잘 수행되는지 테스트로 검증
```./gradle test``
* 코드가 정상적으로 테스트를 통과
     * 테스트가 실패해서 수정하고 깃허브에 푸시했다면 프로젝트 폴더 안에서 다음 명령어를 사용하면 된다.
      ```git pull```
     * 만약 gradlew: Permission denied 와 같이 gradlew 접근 권한이 없다는 메시지가 뜨면,
     ```-bash: ./gradlew: permission denied```
     다음 명령어로 실행 권한을 추가한 뒤 다시 테스트를 수행하면 된다.
     ```chmod +x ./gradlew```


#### 배포 스크립트 만들기

* 배포란?
   * git clone 혹은 git pull을 통해 새 버전의 프로젝트를 받는 것
   * Gradle 이나 Maven을 통해 프로젝트 테스트와 빌드
   * EC2 서버에서 해당 프로젝트 실행 및 재실행
* 쉘 스크립트란?
   * 배포할 때 마다 개발자가 하나하나 명령어를 실행하는 것은 불편함
   * 스크립트만 실행하면 앞의 과정이 차례로 진행되도록 함
   * 쉘 스크립트와 빔(vim)은 서로 다른 역할을 함
   * 쉘 스크립트는 .sh라는 파일 확장자를 가진 파일이다
   * 노드 JS가 .js라는 파일을 통해 서버에서 작동하는 것처럼 쉘 스크립트 역시 리눅스에서 기본적으로 사용할 수 있는 스크립트 파일의 한 종류임
* ```cd ~/app/step1```
* vim ~/app/step1/에 deploy.sh //배달이라도 하나의 직업 이상을 가져야 함


```
#!/bin/bash

REPOSITORY=/home/ec2-user/app/{clone한 프로젝트 저장한 경로}
PROJECT_NAME={프로젝트명}

cd $REPOSITORY/$PROJECT_NAME/

echo "> Git Pull"

git pull

echo "> 프로젝트 Build 시작"

./gradlew build

echo "> step1 디렉토리로 이동"

cd $REPOSITORY

echo "> Build 파일 복사"

cp $REPOSITORY/$PROJECT_NAME/build/libs/*.jar $REPOSITORY/

echo "> 현재 구동중인 애플리케이션 pid 확인"

CURRENT_PID=$(pgrep -f ${PROJECT_NAME}.*.jar)

echo "현재 구동 중인 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
        echo "> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
        echo "> kill -15 $CURRENT_PID"
        kill -15 $CURRENT_PID
        sleep 5
fi

echo "> 새 애플리케이션 배포"

JAR_NAME=$(ls -tr $REPOSITORY/ | grep jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

nohup java -jar \
       -Dspring.config.location=classpath:/application.properties,classpath:/application-real.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
       -Dspring.profiles.active=real \
       $REPOSITORY/$JAR_NAME 2>&1 &
```

* 이렇게 생성한 스크립트에 실행 권한 추가
```chmod +x ./deploy.sh```
* 스크립트를 명령어로 시작
```./deploy.sh```
* 명령어가 시작되면 로그가 촐력되며 애플리케이션이 실행된다
* 잘 진행 됐으면, noph.out 파일을 열어 로그 보기 -> nohup.out은 실행되는 애플리케이션에서 출력되는 모든 내용을 가짐
```vim nohup.out```
* **that could not be found.**라는 에러가 발생하면 어플리케이션 실행에 실패한 것
   * 원인: ClientRegistrationRepositroy를 생성하려면 clientId와 clientSecret가 필수
   * 로컬 PC에서 실행할 때는 application-oauth.porperties가 있어 문제 없음
   * 하지만 이 파일은 .gitignore로 git에서 제외 대상이므로 깃허브에 올라가지 않음
   * 애플리케이션을 실행하기 위해 공개된 저장소에 ClientId와 ClientSecret을 올릴 수 없으니 서버에 직접 이 설정을 가지고 있게 해야함
   * 먼저 step1이 아닌 app 디렉토리에 properties 파일 생성
      * ```vim /home/ec2-user/app/application-oauth.properties```
   * 로컬에 있는 application-oauth.properties 파일 내용을 그대로 붙여넣기한 후 해당 파일을 저장하고 종료(:wq)
   * 방금 생성한 application-oauth.properties를 쓰도록 deploy.sh 파일 수정
      ```
      nohup java -jar \
        -Dspring.config.location=classpath:/application.properties,/home/ec2-user/app/application-oauth.properties \
        $REPOSITORY/$JAR_NAME 2>&1 &
      ```
   * 수정이 다 되었다면 다시 deploy.sh를 실행
   * 그럼 정상적으로 실행 됨


#### 스프링 부트 프로젝트로 RDS 접근하기

* RDS는 MariaDB를 사용 중입니다.
* MariaDB에서 스프링부트 프로젝트를 실행하기 위해선 몇 가지 작업 필요
* 테이블 생성
   * H2에서 자동 생성해주던 테이블들을 MariaDB에선 직접 쿼리를 이용해 생성

* 프로젝트 설정
   * 자바 프로젝트가 MariaDB에 접근하려면 데이터베이스 드라이버가 필요
   * MariaDB에서 사용 가능한 드라이버를 프로젝트에 추가

* EC2 (리눅스 서버) 설정
   * 데이터베이스의 접속 정보는 공개되면 외부에서 데이터를 모두 가져갈 수 있기 때문에 중요하게 보호해야 할 정보임
   * 프로젝트 안에 접속 정보를 갖고 있다면 깃허브와 같이 오픈된 공간에선 누구나 해킹할 위험이 있음
   * EC2 서버 내부에서 접속 정보를 관리하도록 설정

* **RDS 테이블 생성**
   * JPA가 사용될 엔티티 테이블과 스프링 세션이 사용될 테이블 2가지 종류 생성
   * JPA가 사용할 테이블은 테스트 코드 수행 시 로그로 생성되는 쿼리 사용
   * 테스트 코드를 수행하면 다음과 같이 로그가 발생하니 create table부터 복사하여 RDS에 반영
   ```

   ```
   * 스프링 세션 테이블은 schema-mysql.sql 파일에서 확인
      * File 검색(Ctrl + Shift + N)
      * 해당 파일에는 다음과 같은 세션 테이블 확인 가능
      ```
CREATE TABLE SPRING_SESSION (
    PRIMARY_ID CHAR(36) NOT NULL,
    SESSION_ID CHAR(36) NOT NULL,
    CREATION_TIME BIGINT NOT NULL,
    LAST_ACCESS_TIME BIGINT NOT NULL,
    MAX_INACTIVE_INTERVAL INT NOT NULL,
    EXPIRY_TIME BIGINT NOT NULL,
    PRINCIPAL_NAME VARCHAR(100),
    CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;

CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID);
CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME);
CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);

CREATE TABLE SPRING_SESSION_ATTRIBUTES (
    SESSION_PRIMARY_ID CHAR(36) NOT NULL,
    ATTRIBUTE_NAME VARCHAR(200) NOT NULL,
    ATTRIBUTE_BYTES BLOB NOT NULL,
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION(PRIMARY_ID) ON DELETE CASCADE
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;
      ```

      * 복사하여 RDS에 반영

* **프로젝트 설정**

* MariaDB 드라이버를 pom.xml에 등록
```
<dependency>
  <groupId>org.mariadb.jdbc</groupId>
  <artifactId>mariadb-java-client</artifactId>
</dependency>
```
* 서버에서 구동될 환경을 하나 구성
   * src/main/resources/에 application-real.properties 파일 추가
   * 앞에서 이야기한 대로 application-real.properties로 파일을 만들면 profile=real인 환경이 구성된다고 보면 된다
   * 실제 운영될 환경이기 때문에 보안/로그상 이슈가 될 만한 설정들을 모두 제거하며 RDS 환경 profile 설정이 추가된다
```
spring.profiles.include=oauth, real-db

# 쿼리 로그 세팅
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL57Dialect
spring.jpa.properties.hibernate.dialect.storage_engine=innodb

# 세션 저장소 jdbc 설정
spring.session.store-type=jdbc
spring.session.jdbc.initialize-schema=always

# UTF-8 세팅
server.servlet.encoding.charset=UTF-8
server.servlet.encoding.force=true
```

* 모든 설정이 되었다면 깃허브로 푸시


* **EC2 설정**

* OAuth와 마찬가지로 RDS 접속 정보도 보호해야 할 정보이니 EC2 서버에 직접 설정 파일을 둔다
* app 디렉토리에 application-real-db.properties 파일 생성
```
vim ~/app/application-real-db.properties
```
* 그리고 다음과 같은 내용 추가
```
# 쿼리 로그 세팅
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=debug
logging.level.org.hibernate.type=trace

# DB 세팅
spring.datasource.hikari.jdbc-url=jdbc:mariadb://rds주소:포트명(기본은 3306)/database이름
spring.datasource.hikari.username=db계정
spring.datasource.hikari.password=db계정 비밀번호
spring.datasource.hikari.driver-class-name=org.mariadb.jdbc.Driver

# ddl-auto 세팅
spring.jpa.hibernate.ddl-auto=none
```
* 마지막으로 deploy.sh가 real profile을 쓸 수 있도록 다음과 같이 개선
```
...
nohup java -jar \
        -Dspring.config.location=classpath:/application.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties,classpath:/application-real.properties \
        -Dspring.profiles.active=real \
        $REPOSITORY/$JAR_NAME 2>&1 &
```
* 이렇게 설정된 후 다시 한번 deploy.sh 실행
   * nohup.out 파일을 열어 다음과 같이 로그가 보인다면 성공
   * curl 명령어로 html 코드가 정상적으로 보인다면 성공
   * ```curl localhost:8080```

#### EC2에서 소셜 로그인 하기

* curl 명령어를 통해 EC2에 서비스가 잘 배포되었으니 브라우저에서도 확인 필요

* **AWS 보안 그룹 변경**
* EC2에 스프링 부트 프로젝트가 8080 포트로 배포되었으니, 8080 포트가 보안 그룹에 열려 있는지 확인
   * 8080이 열려 있다면 OK, 안 되어있다면 [Edit inbound rules] 버튼을 눌러 추가
    사진 추가하기

* **AWS EC2 도메인으로 접속**
   * 왼쪽 사이드바의 [인스턴스] 메뉴를 클릭
   * 본인이 생성한 EC2 인스턴스를 선택하면 다음과 같이 상세 정보에서 퍼블릭 DNS를 확인할 수 있음
   * 인터넷이 되는 장소 어디나 퍼블릭 DNS를 입력하면 우리 EC2 서버에 접근 가능
   * 다음으로 도메인 주소에 8080포트를 붙여 브라우저에 입력

   결과사진 추가

   * 현재 상태에서는 해당 서비스에 EC2의 도메인을 등록하지 않았기 때문에 구글과 네이버 로그인이 작동하지 않음
   * 따라서 구글, 네이버에 서비스 등록 필요

   
* **구글에 EC2 주소 등록**
* 구글 웹 콘솔로 접속하여 본인의 프로젝트로 이동한 다음 **[API 및 서비스 => 사용자 인증 정보]**로 이동
* **[OAuth 등의 화면]** 탭을 선택하고 아래에서 승인된 도메인에 'http://' 없이 EC2의 퍼블릭 DNS를 등록
* **[사용자 인증 정보]** 탭을 클릭해서 본인이 등록한 서비스의 이름 클릭
* 퍼블릭 DNS 주소에 :8080/login/oauth2/code/google 주소를 추가하여 승인된 리디렉션 URI에 등록
* EC2 DNS 주소로 이동해서 다시 구글 로그인을 시도해 보면 로그인 성공


* **구글에 EC2 주소 등록**
* 네이버 개발자 센터로 접속해서 본인의 프로젝트로 이동
* 아래로 내려가 보면 PC 웹 항목이 있는데 여기서 서비스 URL과 Callback URL 2개를 수정
   * 서비스 URL
      * 로그인을 시도하는 서비스가 네이버에 등록된 서비스인지 판단하기 위한 항목
      * 8080 포트는 제외하고 실제 도메인 주소만 입력
      * 네이버에서 아직 지원되지 않아 하나만 등록 가능 
      * 즉, EC2의 주소를 등록하면 localhost가 안 됨
      * 개발 단계에서는 등록하지 않는 것을 추천 
      * localhost도 테스트하고 싶으면 네이버 서비스를 하나 더 생성해서 키를 발급받으면 됨
   * Callback URL
      * 전체 주소 등록(EC2 퍼블릭 DNS:8080/login/oauth2/code/naver)

* 2개 항목을 모두 수정/추가하였다면 구글과 마찬가지로 네이버 로그인 성공

* 구글과 네이버 로그인도 EC2와 연동 완료되었지만 현재 방식은 몇 가지 문제가 있음
      * 수동 실행되는 Test
         * 본인이 짠 코드가 다른 개발자의 코드에 영향을 끼치지 않는지 확인하기 위해 전체 테스트 필요
         * 현재 상태에선 항상 개발자가 작업을 진행할 때마다 수동으로 전체 테스트 필요
      * 수동 Build
         * 다른 사람이 작성한 브랜치와 본인이 작성한 브랜치가 합쳐졌을 때(Merge) 이상이 없는지는 Build 실행 필요
         * 이를 매번 개발자가 직접 실행해해야 함
* 그래서 다음 글에서는 이런 수동 Test & Build를 자동화시키는 작업을 진행 예정
* 깃허브에 푸시를 하면 자동으로 Test & Build & Deploy가 진행되도록 개선하는 작업임


