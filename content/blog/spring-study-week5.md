---

title: AWS에 데이터베이스 환경 구축하기-AWS RDS 
description: AWS의 관리형 데이터베이스 서비스인 RDS를 소개합니다.
slug: spring-study-week5
category: Back-End
author: hwikyung kim
featured: Featured
img: spring.png

---

## 스프링 스터디 5주차(챕터7)

### AWS에 데이터베이스 환경을 만들어보자

* AWS에서는 데이터베이스를 다루는데 필요한 모든 작업을 지원하는 관리형 서비스인 RDS를 제공함
 * RDS는 AWS에서 지원하는 클라우드 기반 관계형 데이터베이스
 * 하드웨어 프로비저닝, 데이터베이스 설정, 패치 및 백업 등 잦은 운영 작업 자동화
 * 조정 가능한 용량 지원을 통해 예상치 못한 데이터가 쌓여도 비용만 추가로 내면 정상적인 서비스 가


#### RDS 인스턴스 생성하기

* 검색창에 RDS 입력 - RDS 대시보드에서 **[데이터베이스 생성]** 버튼 클릭
* DB 엔진 선택 화면
 * RDS에는 오라클, MSSQL, PostgreSQL, MariaDB 등 제공(여기서는 MariaDB 선택)
 * MariaDB의 장점
   * MSSQL 보다 가격이 합리적
   * 클라우드 서비스에 가장 적합한 데이터데이스인 Amazon Aurora로의 교체 용이성
   * 동일 하드웨어 사양으로 MySQL보다 향상된 성능
   * 다양한 기능 및 스토리지 엔진
* DBMS 선택
   * **표준생성** 선택 - **MariaDB** 선택
* 사용 사례 선택
   * 템플릿 **[프리티어]** 
* 상세설정
   * 스토리지 유형 **[범용(SSD)]**, 할당된 스토리지 **20**
   * DB 인스턴스 이름, 마스터 사용자 이름, 마스터 암호 작성
* 네트워크 및 보안
   * 퍼블릭 액세스 가능 **[예]**
* 데이터베이스 생성과 상세 정보 확인
   * **[완료]**버튼 클릭 - **[DB 인스턴스 세부 정보 보기]**

  ![데이터베이스 생성](/spring-study-week5/database.png)

#### RDS 운영환경에 맞는 파라미터 설정하기

* 파라미터 그룹 생성
   * 왼쪽 카테고리에서 **[파라미터 그룹]** 선택
   * 화면 오른쪽 위의 **[파라미터 그룹 생성]** 선택
   * 파라미터 그룹 세부 정보
   * 앞에서 생성한 MariaDB 버전과 동일해야 함

* 타임존 수정
   * 파라미터 그룹 선택 후 **[파라미터 편집]** 선택하여 편집 모드로 전환
   * time_zone을 검색하여 **[Asia/Seoul]** 선택

* Character Set 변경
   * utf8mb4로 변경
     * character_set_client
     * character_set_connection
     * character_set_database
     * character_set_filesystem
     * character_set_results
     * character_set_server

   * utf8mb4_general_ci로 변경
     * collation_connection
     * collation_server

* max_connections를 150으로 수정
* **[변경 사항 저장]** 선택
* 데이터베이스에 반영
   * 데이터베이스 선택 후 **[수정]** 선택
 * 데이터베이스 파라미터 그룹 변경
   * DB 파라미터 그룹을 default에서 방금 생성한 신규 파라미터 그룹으로 변경
   * **[즉시 적용]** 선택
* 정상 적용을 위해 재부팅 진행


#### 내 PC에서 RDS 접속해 보기

* 로컬 PC에서 RDS로 접근하기 위해 RDS 보안 그룹에 본인 PC의 IP 추가 필요
* 데이터베이스 보안 그룹 선택
   * 새로운 브라우저에서 EC2에 사용된 보안 그룹의 그룹ID 복사
   * 복사된 보안 그룹 ID와 본인의 IP를 RDS 보안 그룹의 인바운드로 추가
   * 인바운드 규칙 유형은 MYSQL/Aurora 선택
      * 보안 그룹 첫 번재 줄: 현재 내 PC의 IP 등록
      * 보안 그룹 두 번째 줄: EC2의 보안 그룹 추가


#### 로컬에서 연동 테스트 하기

* 로컬에서 원격 데이터베이스로 붙을 때 GUI 클라이언트를 많이 사용
* Database 플러그인 설치
   * 인텔리제이에서 database 플러그인을 검색한 후 Database Navigator **[Install]** 선택
   * 설치 완료 후 Database Browser 실행
   * 프로젝트 왼쪽 사이드바에 **DB Browser** - **MySQL** 선택(MariaDB는 MySQL기반이므로)
   * 본인이 생성한 RDS 정보 등록
   * **[Test Connection]** 으로 연결 테스트 후 **[Apply -> OK]** 버튼으로 최종 저장
* SQL을 실행할 콘솔창 열기
   * **[Open SQL Console]** - **[New SQL Console..]** - 신규 콘솔창 이름 등록



 #### EC2에서 RDS에서 접근 확인

* EC2에 MySQL CLI 설치
   * ~~~sudo yum install mysql~~~
* 로컬에서 접속하듯 계정, 비밀번호, 호스트 주소 등을 접속
   * ~~~mysql -u 계정 -p -h Host주소~~~
   * EC2에서 RDS로 접속 확인
* 퀴리 실행 해보기
   * ~~~show database;~~~

   ![EC2에 RDS 접근 확인](/spring-study-week5/mariadb.png)




