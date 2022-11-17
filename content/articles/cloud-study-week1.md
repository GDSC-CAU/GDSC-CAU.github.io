---
title: Cloud 서비스를 소개합니다 - Overview
description: GCP와 클라우드 서비스(SaaS, IaaS, PaaS 등)에 대한 글입니다.
slug: cloud-study-week1
category: Cloud
author: Minju Jwa
---

안녕하세요! GCP 스터디 팀의 minju 입니다. 

첫 포스팅 내용은 빠르게 클라우드 개요를 짚고 넘어갈 수 있도록 **cloud 서비스들에 대한 소개**입니다. 더불어, GCP에는 어떤 cloud 서비스들이 있는지에 대해서 다룰 예정입니다. 

Google Cloud Skills Boost에서 과정을 학습하고 계신 분이나 GCP를 사용해보려고 하시는 분들이 읽어보시면 좋을 것 같습니다. 

## 🐰 ™i 스몰 talk 🥞

먼저, **클라우드에서 특정 기술을 배우는 것보다는 클라우드를 활용한 개발 환경에 익숙해지기 위해서 공부하고 있습니다.**  클라우드는 다양한 기술이 있는데 무엇이 클라우드 내부에 존재하는지 파악하며, 이러한 아키텍처를 이해하고 지향하는 바를 짚고 넘어가보면 좋겠네요. 구체적인 예시는 뒤-6. GCP로 할 수 있는 실습들-에서 소개해드리겠습니다. 

참고로 현재 Google Cloud Skills Boost를 무료로 사용할 수 있습니다. (12월까지 말고 쭉 무료로 있어줬으면) 그래서 스터디 목표는 다음과 같습니다. 

<aside>
🌀 대학생에게 무료로 사용할 수 있는 환경을 이용하고, 클라우드를 활용한 개발 환경에 익숙해지자.
</aside>

## 1. 클라우드 컴퓨팅의 정의

클라우드 컴퓨팅은 컴퓨팅 리소스를 인터넷을 통해 서비스로 사용할 수 있는 주문형 서비스를 말합니다. 개발자가 직접 리소스를 구성, 관리할 필요가 없으며 사용한 만큼 비용을 지불하는 방식입니다. 

## 2. 클라우드 컴퓨팅 서비스 모델의 3가지 유형

클라우드 컴퓨팅 서비스를 IaaS, PaaS, SaaS로 나누어 볼 수 있습니다. 

- Infrastructure as a Service: 컴퓨팅 및 스토리지 서비스를 제공합니다. ex) DB, Storage
- Platform as a Service: 클라우드 앱을 빌드하는 개발 및 배포 환경을 제공합니다.  ex) Containers
- Software as a service: 앱을 서비스로 제공합니다. ex) Gmail, Photos

## 3. 클라우드 컴퓨팅의 흐름

위에서 언급한 컴퓨팅 서비스 모델이 나오게 된 배경은 클라우드 컴퓨팅의 흐름과 연관이 있습니다. 클라우드 컴퓨팅의 발전에 따른 제 1, 2, 3 물결이 있습니다. 

![cloud history](/cloud-study-week1/1.png)

*제 1물결*은 Colocation으로, Co-라는 ‘공동의’ 라는 의미와 location이 합쳐서 자원을 공동의 장소에 설치한다는 의미입니다. 공동의 장소에 설치된 서버를 사용한다면 데이터 센터에 투자할 비용을 줄일 수 있을 것입니다.

<aside>
☝️ Colocation: 데이터 센터를 위한 물리적 공간에 투자할 필요가 없어짐 → 재정적 효율성 ⇪
</aside>

*제 2물결*은 가상 데이터 센터이며, 이때 2가지 유형의 제품, IaaS와 PaaS가 등장했습니다. 2물결까지는 사용자가 제어해야하는 환경이 존재했습니다. 

<aside>
✌️ Virtualized data center: → IaaS, PaaS 등장
</aside>

이후 완전히 자동화된 *3세대 클라우드*인 컨테이너 기반 아키텍처로 발전합니다. GCP도 이를 제공하고 사용자가 사용하는 인프라를 자동으로 프로비저닝하고 구성합니다.

<aside>
👉 container-based architecture: 애플리케이션이 사용되는 인프라를 자동으로 프로비저닝하고 구성
</aside>

## 4. GCP 서비스에 대한 소개

클라우드 컴퓨팅 플랫폼인 GCP(Google Cloud Platform)에도 다양한 서비스들이 있습니다. 그 서비스들은 IaaS, PaaS, SaaS를 제공하는 다양한 모델들로 분류해볼 수 있습니다.  

![gcp](/cloud-study-week1/2.png)

GCP의 *IaaS*로는 VM(Virtual Machine)을 제공하는 **Compute Engine**, 데이터를 저장할 수 있는 **Cloud Storage & Database**가 있습니다.

*PaaS*를 사용하면 더 많은 리소스를 애플리케이션 로직에 집중할 수 있다는 장점이 있습니다. 이에 해당하는 제품으로는 **Google Cloud Functions, Google Cloud Run**이 있습니다.

- 서버리스는 서버가 없는 것처럼 추상화되어 있다는 의미인데요, **Cloud Functions**은 개발자가 서버 구성보다 코드에 집중하고 사용한 만큼만 지불하는 방식으로 이벤트 기반 코드를 관리합니다.
- **Cloud Run**은 완전 관리형 환경에서 컨테이너화된 마이크로서비스 기반 애플리케이션을 배포할 수 있도록 하는 컨테이너 기반 개발을 위한 완전 관리형 서버리스 PaaS 제품입니다.

*SaaS*는 애플리케이션이 로컬 컴퓨터에 설치되지 않고, 클라우드에서 서비스로 실행되고 인터넷을 통해 바로 최종 사용자가 소비하는 형태입니다.

이러한 서비스를 사용하면 관리형 인프라, 관리형 서비스로 비즈니스 골에 집중하고 인프라를 만들고 유지하는 비용 감소할 수 있는 것이죠. 이 강의에서는 이렇게 IaaS, PaaS을 사용해볼 수 있는 실습이 존재합니다.

## 5. GCP와 데이터 센터의 위치

그렇다면 GCP를 사용하면 실제로 이를 제공하는 물리적인 공간이 필요할텐데, 이런 데이터 센터는 어떻게 전세계적으로 분포되었을까요? 다음처럼 크게 다섯 지역에(location)안에 여러 Region이 있고, 다시 google cloud 리소스가 배포되는 지역인 Zone들이 있습니다.

![location](/cloud-study-week1/3.png)

이렇게 여러 개의 위치가 있는 이유는, 애플리케이션을 배치할 위치를 선택할 때 가용성(availability), 내구성(durability) 및 지연 시간(latency)과 같은 품질에 영향을 미치기 때문입니다. 

사용자와 가까운 위치에 있는 데이터 센터일 수록 요청이 들어올떄 패킷이 소스에서 목적지까지 이동하는 데 걸리는 시간이 줄어들 것입니다. 또한, 리전에 문제가 발생하는 경우에 애플리케이션을 보호하는데 유용할 것입니다.

## 6. GCP로 할 수 있는 실습들

이 강의에서는 GCP에서 진행할 수 있는 5가지 실습이 있습니다. IaaS를 먼저 다루고, PaaS, Iaas와 PaaS를 조합해서 사용해볼 수 있는 순서로 구성되어 있었습니다.

![lab1](/cloud-study-week1/4.png)

**VM in a cloud**

Lab 1) Compute Engine으로 VM을 만들고 **VPC Networking (internal IP, external IP)**을 구성하는 실습입니다.

**Storage in a cloud**

Lab 2) VM에 웹 서버를 구성하고, CLoud SQL과 연결하여 Cloud Storage에 담긴 이미지를 웹에서 볼 수 있습니다. 

이 실습에서는 Cloud SQL(database managed) 인스턴스를 빌드하고 인스턴스에 MySQL 데이터베이스를 연결해 봅니다. 

 Cat🐱 이미지 파일을 Cloud Storage에 업로드한 후에는 테이블을 만들고 파일의 콘텐츠를 MySQL 데이터베이스로 가져오게 됩니다. 

![lab2](/cloud-study-week1/5.png)

**Cotainer in a cloud**

Lab 3) Kubernate는 개념적으로 **IaaS를 제공하는 compute engine**과 **PaaS를 제공하는 app engine** 사이에 위치하며 둘의 이점을 이용합니다.

- GKE로 Kubernetes cluster를 프로비저닝합니다. 

- `kubectl`을 사용하여 Docker containers를 배포하고 관리합니다.

**Application in a cloud**

Lab 4) 컨테이너 image를 빌드하고  Cloud Run에 배포합니다. Cloud Run을 이용하여 serverless하게 container를 실행합니다.

Lab 5) Terraform을 활용하여 **코드를 통해 인프라 서버를 자동으로 구성하는 방식을 배웁니다.**

## 
*위 내용은 **[Google Cloud Fundamentals: Core-Infrastructure-Locales](https://www.cloudskillsboost.google/course_templates/161)** 코스의 2가지 부분이 포함되어있습니다.

- Introducing Google Cloud
- Resources and Access in the Cloud

![course](/cloud-study-week1/6.png)

### References

> 클라우드 컴퓨팅 개념
> 
> 
> [https://cloud.google.com/learn/what-is-cloud-computing](https://cloud.google.com/learn/what-is-cloud-computing)
> 
> [https://cloud.google.com/kubernetes-engine](https://cloud.google.com/kubernetes-engine)
> 

> IaaS, PaaS 개념
> 
> 
> [https://cloud.google.com/learn/what-is-iaas](https://cloud.google.com/learn/what-is-iaas)
> 
> [https://puzzle-puzzle.tistory.com/entry/구글-클라우드-플랫폼-GCP-Kubernetes-and-Container](https://puzzle-puzzle.tistory.com/entry/%EA%B5%AC%EA%B8%80-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%ED%94%8C%EB%9E%AB%ED%8F%BC-GCP-Kubernetes-and-Container)
>
