---
title: 웹크롤러 Scrapy
description: 터미널 환경에서의 크롤링
slug: data-study-week2-scrapy
category: Data-Science
author: Jooyoung Lee
---

## 0. Scrapy

edwith COSADAMA Scrapy 입문 강의로 학습하였습니다.

Scrapy는 빠른 크롤링 속도와 넓은 확장성, 뛰어난 데이터 처리와 저장 능력을 가지고 있습니다.

Scrapy를 통한 크롤링은 Scrapy 프로젝트 생성, Spider(크롤러) 생성, Item 생성, Spider 실행 순으로 이루어집니다.

## 1. Scrapy 설치

Anaconda Powershell Prompt를 실행합니다.

```python
pip install Scrapy
```

## 2. Scrapy shell

해당 웹사이트의 데이터를 가져옵니다.

CSS Selector 경로를 입력하여 기사 제목을 출력한 예시입니다.

![scrapy shell 예시](/data-study-week2-scrapy/scrapyshell.png)

## 3. Scrapy 프로젝트 생성

```python
scrapy startproject 프로젝트이름
```

settings.py에서 페이지 다운로드 간경을 1초로 지정합니다.

```python
DOWNLOAD_DELAY = 1
```

모든 명령어는 프로젝트 디렉토리에서 실행합니다.

## 4. Spider(크롤러) 생성

크롤러이름.py가 생성됩니다.

```python
scrapy genspider 크롤러이름 "크롤링페이지주소"
```

robots.txt에서 크롤링을 금지하고 있는지 확인하고 크롤링을 막아놓은 사이트는 settings.py의 설정을 변경하면 크롤링을 할 수 있습니다.

```python
ROBOTSTXT_OBEY = False
```

## 5. Item 생성

Spider가 추출한 데이터를 저장하는 객체가 Item입니다.

items.py에 사이트 개수만큼 Item을 만듭니다.

크롤러이름.py에서 spider가 추출한 데이터를 Item에 저장합니다.

콜백 함수 parse()를 이용하거나 Request 메서드 내 callback 파라미터를 이용하여 크롤링합니다.

## 6. Spider 실행

```python
scrapy crawl 크롤러이름
```

pipelines.py에서 raise DropItem을 통해 원하지 않는 Item을 필터링하여 데이터를 후처리합니다. settings.py에 pipline을 사용한다고 정의하고 아이템 출력 순서를 설정합니다.

settings.py에서 한글깨짐 현상을 방지합니다.

```python
FEED_EXPORT_ENCODING = 'cp949'
```

Item의 데이터를 저장합니다.

```python
scrapy crawl 크롤러이름 -o 파일이름 -t 파일형식
```

## 7. Scrapy Logging

오류 메세지를 찾기 쉬워집니다. settings.py에서 메세지의 수준을 결정합니다.

```python
LOG_LEVEL = 'ERROR'
```

settings.py나 spider 실행 명령어를 이용하여 로그 파일을 저장합니다.

```python
LOG_FILE = '파일명.txt'
```

```python
scrapy crawl 크롤러이름 -s LOG_FILE=파일명.log
```
