---

title: AWS 서버 환경 구축하기
description: AWS와 EC2의 기초적인 설정에 대해 소개합니다.
slug: spring-study-week4
category: Back-End
author: IlGoo Yeo
featured: Featured
img: spring.png

---

## 스프링 스터디 4주차(챕터6)

### AWS 서버 환경을 만들어보자

* 외부에서 본인이 만든 서비스에 접근하려면 24시간 작동하는 서버가 필요
  * 집에서 PC를 24시간 구동시킴
  * 호스팅 서비스(Cafe 24, 코리아호스팅 등)을 이용
  * 클라우드 서비스(AWS, Azure, GCP)을 이용
* 비용은 호스팅 서비스나 PC를 사용하는 것이 저렴
* 특정 시간에 트래픽이 몰린다면 **유동적으로 사양을 늘릴 수 있는 클라우드가 유리**
* 클라우드란 **인터넷을 통해 서버, 스토리지, DB 등의 컴퓨팅 서비스를 제공하는 것**
* 클라우드의 종류
  * Infrastructure as a Service(IaaS)
    * 기존 물리 장비를 미들웨어와 함께 묶어둔 추상화 서비스
    * 가상머신, 스토리지, 네트워크, 운영체제 등의 IT 인프라를 대여해주는 서비스
    * AWS의 EC2, S3 등
  * Platform as a Service(PaaS)
    * IaaS에서 한 번 더 추상화한 서비스로 보다 많은 기능이 자동화
    * AWS의 Beanstalk, Heroku 등
  * Software as a Service(Saas)
    * 소프트웨어 서비스
    * 구글 드라이브, 드롭박스, 와탭 등
* 이 실습에서는 AWS의 IaaS를 사용
  * PaaS는 작업이 간소화되지만 프리티어로 무중단 배포가 불가능



#### AWS 회원 가입

* 계정을 만들기 위해서는 **Master 혹은 Visa**카드 필요
* [AWS 공식 사이트](https://aws.amazon/ko/)로 이동한 뒤 **무료 계정 만들기**선택
* 안내되는 절차에 따라 계정을 생성하는데, 이때 주소는 영문 주소를 기재(네이버로 확인 가능)
* 가입이 완료되면 management console에 로그인



#### EC2 인스턴스 생성하기

* EC2는 AWS에서 제공하는 성능, 용량 등을 유동적으로 사용할 수 있는 서버

* 프리티어 플랜의 EC2 사용 제한 사항
  * t2.micro 사양만 가능
    * vCPU 1 Core, 메모리 1GB
  * 월 750시간 제한
    * 1대의 t2.micro만 사용한다면 24시간 사용 가능
* EC2를 만들기 전에, 리전을 서울로 변경(보통 오아이주가 기본값)
* **AWS 서비스 - 모든 서비스**에서 **EC2**선택 후 **인스턴스 시작**
* **Amazon Linux 2 AMI (HVM) - Kernel 5.10, SSD Volume Type** 선택
  * 인스턴스 유형은 **t2.micro** 선택
* **스토리지 선택**에서 크기를 30GB로 설정

* 태그 등록에서 Name 태그 등록(EC2의 이름을 붙인다고 생각하면 된다)

* 보안 그룹은 아래와 같이 설정

  ![보안 그룹 설정](/spring-study-week4/security_config.PNG)
  
  * 포트 항목에서 22인 경우는 **AWS EC2에 터미널로 접속**할 때
    * pem키가 없으면 접속이 안 되니 전체 오픈(0.0.0.0/0, ::/0)하는 경우가 있는데, pem키가 노출되는 순간 쉽게 접속이 되버림
    * 따라서 pem키 관리와 별도로 지정된 IP에서만 ssh 접속이 가능하도록 구성하는 것이 안전
      * 내 IP를 선택하면 현재 접속한 장소의 IP가 자동 지정
      * 다른 장소에서 접속할 경우 SSH 규칙을 추가로 생성
  
* pem키를 생성, 다운받은 후 인스턴스 id를 클릭해 EC2 목록으로 이동



#### EIP 할당

* EC2는 기본적으로 동적 IP를 사용하므로 인스턴스를 중지하고 새로 시작할 때마다 IP가 변경됨
* EC2에 고정IP(EIP, 탄력적 IP)를 할당할 수 있음
* 좌측 메뉴바에서 **네트워크 및 보안 - 탄력적 IP**선택
* **탄력적 IP 주소 할당**을 클릭해 EIP 생성
* **탄력적 IP 주소 연결**을 클릭해 인스턴스를 EIP와 연결
* 인스턴스 정보에서 탄력적 IP 주소를 확인
  * 탄력적 IP 주소를 생성하고 EC2 서버에 연결하지 않으면 비용이 청구되니 주의
  * 사용할 인스턴스가 더 없다면 EIP를 삭제해야 함



#### EC2 서버에 접속하기

* 윈도우 환경에서 putty 사용
* putty를 [다운](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)받은 후 puttygen.exe 실행
* **Conversions - Import key**에서 pem키를 선택하고 ppk파일 생성
* 생성 후 **Save private key**클릭
* 이제 putty.exe를 실행해 각 항목을 다음과 같이 등록
  * Host Name : ec2-user@(탄력적 IP 주소)
  * Port : 22
  * Connection type : SSH
* 왼쪽에서 **Connection - SSH - Auth**의 **Private key file for authentication**에서 생성한 ppk 파일을 불러옴

* 다시 **Session**으로 돌아와 방금한 설정을 저장할 이름을 등록하고 Save 후 Open으로 EC2에 접속



#### 서버 생성 후 필요한 설정들

* Java 설치
  * ```yum list java*jdk-devel```로 설치 가능한 jdk 버전 확인
  * ```sudo yum install -y java-1.8.0-openjdk-devel.x86_64```로 설치
  * ```sudo /usr/sbin/alternatives --config java```에서 Java8 선택
  * ```java -version```으로 Java 버전 확인
* 타임존은 UTC에서 KST로 변경
  * ```sudo rm /etc/localtime```
  * ```sudo ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime```
  * ```date```로 타임존 변경 확인
* [Hostname 변경](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/set-hostname.html)
