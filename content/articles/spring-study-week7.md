---

title: Travis CI 배포 자동화
description: 코드가 푸시되면 자동으로 배포해보자
slug: spring-study-week7
category: Back-End
author: hwikyung kim
featured: Featured
img: spring.png

---

## 스프링 스터디 7주차(챕터9)

### CI & CD 란?

* CI(Continuous Integration-지속적 통합)은 코드 버전 관리를 하는 VCS 시스템(git, svn 등)에 PUSH가 되면 자동으로 테스트와 빌드가 수행되어 안정적인 배포 파일을 만드는 과정
* CD(Continuous Deployment-지속적인 배포)은 이 빌드 경과를 자동으로 운영 서버에 무중단 배포까지 진행되는 과정


#### Github와 Travis CI 연동

* Travis CI는 깃허브에서 제공하는 무료 CI 서비스
* 젠킨스와 같은 CI 도구도 있지만, 젠킨스는 설치형이기 때문에 이를 위한 EC2 인스턴스가 하나 더 필요
   * 프로젝트에 Travis CI(.travis.yml) 설정
      * Travis CI의 상세한 설정은 프로젝트에 존재하는 .travis.yml 파일 로 할 수 있습니다. build.gradle과 같은 위치에 해당 파일 생성

* Travis CI에 접속해서 깃허브 계정으로 로그인을 한 뒤, 왼쪽 위에 계정명 > Setting 을 클릭, 그리고 해당 프로젝트를 활성화 시킨다
      * Travis CI Web Service 에서 Github 계정 로그인
      * Travis Settins 에서 연동할 Github repository 활성화

 사진 수정하기!!!! ![데이터베이스 생성](/spring-study-week5/database.png)

#### 프로젝트 설정
* travis.yml 추가
   * build.gradle 동일한 위치에 추가
   ```
language: java
jdk: openjdk8

# Travis CI 를 어느 branch 가 push 될 때 수행할지 설정
branches:
 only: master

# gradle 통해 의존서을 받게 되면 해당 디렉토리에 cache 하여,
# 같은 의존성은 다음 배포 때부터 받지 않도록 설정
cache:
 directories:
   - '$HOME/.m2/repository'
   - '$HOME/.gradle'

before_install:
 - chmod +x gradlew

# branch 에 push 되었을 때 수행하는 명령어
script: "./gradlew clean build"

# Travis CI 실행 완료 후 자동 알림 설정
notifications:
 email:
   recipients:
     - [메일 주소]
   ```
* **Travis CI + AWS S3 연동**
* AWS S3는 일종의 파일 서버d
* 정적 파일이나 배포 파일들을 관리하는 기능을 지원하며, 보통 이미지 업로드를 구현한다면 이 S3를 이용하여 구현하는 경우가 많음

![전체적인 구조](/spring-study-week6/01.png)

* IAM 사용자 만들기
   * 사용자 세부 정보 설정
   * 사용자 이름 > jimmyberg-travis-deploy
   * AWS 액세스 유형 선택 > 프로그래밍 방식 액세스
   * 권한 설정 및 기존 정책 직접 연결
   * AmazonS3FullAccess, AmazonCodeDeployFullAccess 태그 추가
   * 키 : Name, 값 : jimmyberg-travis-deploy

* Travis CI에 S3 액세스 키 등록
   * 연동한 repository 의 settings 에서 키 등록
   * AWS_ACCESS_KEY(액세스 키)
   * AWS_SECRET_KEY(비밀 액세스 키)
   * .travis.yml 에서 $AWS_ACCESS_KEY, $AWS_SECRET_KEY 으로 사용



* **S3 버킷 생성**

* 버킷 이름 > spring-study
* .travis.yml 수정
```
...
script: "./gradlew clean build"

# 수정 start
# deploy 가 실행되기 전에 수행
# CodeDeploy 는 Jar 파일 인식하지 못하므로
# 프로젝트를 압축한 zip 파일로 전달
before_deploy:
  - zip -r rest-api ./*
  - mkdir -p deploy
  - mv rest-api.zip deploy/rest-api.zip

# 외부 서비스와 연동될 명령어 정의
deploy:
    - provider: s3
      access_key_id: $AWS_ACCESS_KEY
      secret_access_key: $AWS_SECRET_KEY

      bucket: spring-study
      region: ap-northeast-2
      skip_cleanup: true
      acl: private
      local_dir: deploy     # 지정한 위치의 파일들만 S3로 전송
      wait_until_deployed: true
# 수정 end

notifications:
...
```

![모든 퍼블릭 엑세스 차단](/spring-study-week6/03.png)


![S3 버킷 생성 완료](/spring-study-week6/02.png)


* **Travis CI, S3, CodeDeploy 연동**
* EC2 에 IAM 역할 추가
      * EC2 > 인스턴스 설정 > IAM 역할 연결/바꾸기
      * ec2-codedeploy-role 역할 선택
      * EC2 인스턴스 재부팅
* EC2 에 CodeDeploy agent 설치

```
$ aws s3 cp s3://aws-codedeploy-ap-northeast-2/latest/install ./s3 --resion ap-northeast-2
# 설치 디렉토리 이동
$ cd s3
# 실행 권한 추가
$ chmod +x ./install
# install 파일 설치
$ sudo ./install auto
# CodeDeploy agent 상태 확인
$ sudo service codedeploy-agent status
```
* 연동 설정 파일 추가 및 수정
   * EC2 에 zip 파일 저장 디렉토리 생성
   ```
$ mkdir /home/ec2-user/s3/zip/rest-api
   ```
   * appspec.yml 추가
   ```
version: 0.0
os : linux
files :
  # CodeDeploy 에서 전달해준 파일 중 destination 으로 이동시킬 대상 지정
  - source : /
  # source 에서 지정된 파일을 저장할 위치
  destination: /home/ec2-user/s3/zip/rest-api/
  # 덮어쓰기 여부
  overwrite : yes
   ```

   * .travis.yml 수정

   ```
deploy:
  ...

  - provider: codedeploy
    access_key_id: $AWS_ACCESS_KEY
    secret_access_key: $AWS_SECRET_KEY

    bucket: jimmyberg-rest-api
    key: rest-api.zip
    bundle_type: zip
    application: rest-api
    deployment_group: rest-api-group
    region: ap-northeast-2
    wait_until_deployed: true
   ```
* EC2 에 저장된 zip 디렉토리 확인

* **배포 자동화 구성**

* 프로젝트에 deploy.sh 추가

```
# project > scripts > deploy.sh
#!/bin/bash

REPOSITORY=/home/ec2-user/apps
DEPLOY_DIRECTORY=/home/ec2-user/deploy
PROJECT_NAME=rest-api

echo "> Build 파일 복사"

cp $DEPLOY_DIRECTORY/$PROJECT_NAME/*.jar $REPOSITORY/$PROJECT_NAME/

echo "> 현재 구동중인 애플리케이션 pid 확인"

CURRENT_PID=$(pgrep -fl $PROJECT_NAME | grep jar | awk '{print $1}')

echo "> 현재 구동 중인 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
   echo "> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
   echo "> kill -15 $CURRENT_PID"
   kill -15 $CURRENT_PID
   sleep 5
fi

echo "> 새 애플리케이션 배포"

JAR_NAME=$(ls -tr $REPOSITORY/$PROJECT_NAME/*.jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

echo "> $JAR_NAME 에 실행권한 추가"

chmod +x $JAR_NAME

echo "> $JAR_NAME 실행"

rm $REPOSITORY/$PROJECT_NAME/nohup.out

nohup java -jar -Dspring.profiles.active=alpha -Dfile.encoding=UTF-8  $JAR_NAME > $REPOSITORY/$PROJECT_NAME/nohup.out 2>&1 &
```

* .travis.yml 수정

```
language: java
jdk:
  - openjdk8

branches:
  only:
    - master

cache:
  directories:
    - '$HOME/.m2/repository'
    - '$HOME/.gradle'

before_install:
  - chmod +x gradlew

script: "./gradlew clean build"

before_deploy:
  - echo $(pwd)
  - mkdir -p before-deploy
  - cp scripts/*.sh before-deploy/
  - cp appspec.yml before-deploy/
  - cp build/libs/*.jar before-deploy/
  - cd before-deploy && zip -r before-deploy *
  - cd ../ && mkdir -p deploy
  - mv before-deploy/before-deploy.zip deploy/rest-api.zip

deploy:
  - provider: s3
    access_key_id: $AWS_ACCESS_KEY
    secret_access_key: $AWS_SECRET_KEY
    bucket: jimmyberg-rest-api
    region: ap-northeast-2
    skip_cleanup: true
    acl: private
    local_dir: deploy
    wait-until-deployed: true

  - provider: codedeploy
    access_key_id: $AWS_ACCESS_KEY
    secret_access_key: $AWS_SECRET_KEY
    bucket: jimmyberg-rest-api
    key: rest-api.zip
    bundle_type: zip
    application: rest-api
    deployment_group: rest-api-group
    region: ap-northeast-2
    wait-until-deployed: true

notifications:
  slack: [slack accesss key]
```

* appspec.yml 수정

```
version: 0.0
os : linux
files :
  - source : /
    destination: /home/ec2-user/deploy/rest-api
    overwrite : yes

# CodeDeploy 에서 EC2 로 넘겨준 파일 모두 ec2-user 권한 설정
permissions:
  - object: /
    pattern: "**"
    owner: ec2-user
    group: ec2-user

# CodeDeploy 배포 단계에서 실행할 명령어 설정
# ApplicationStart 단계 : ec2-user 권한으로 deploy.sh 실행
hooks:
  ApplicationStart:
    - location: deploy.sh
      timeout: 60
      runas: ec2-user

```

* **배포 Log 확인 방법**
* CodeDeploy 관련 Log
```
$ cd /opt/codedeploy-agent/deploayment-root/
$ vi ./deployment-logs
```
* 프로젝트 관련 Log
```
$ cd ~/apps/rest-api/
$ vi ./nohup.out
```

   ![EC2에 RDS 접근 확인](/spring-study-week5/mariadb.png)




