---
title: 딥러닝 스터디 week1
description: 크롤링
slug: deeplearning_study_week1
category: Data Science
author: 이재형
---

### BeautifulSoup

NLP를 공부하기 위한 로드맵을 회의한 결과로 초반부 스터디는 크롤링을 진행하는 것으로 결정했습니다.

뷰솝과 셀레니움 그리고 스크래피를 학습하는 것으로 이야기가 나왔고, 뷰솝 부분을 학습하고 아티클을 작성하게 되었습니다. 

크롤링을 배우기 전에 HTML과 CSS의 기초 문법들을 간단하게 학습했습니다.
HTML의 TAG 들을 몇 개 정리해서 크롤링 시 접근에 걸림이 되지 않도록 하는 것이 학습 목표입니다. 

### HTML
h1~h6 제목태그

strong 진하게태그

u 언더라인태그

p 단락 피태그 포함 style="margin-top:45px;" 등을 활용하여 간격 조정 가능 

br 줄바꿈태그 

img 이미지 태그 

ul 구분태그(Unordered List) → ol 넘버링 태그(ordered List)

li 목록태그(list) 

table 테이블 태그

tr, td 같이 다님

title 태그 웹페이지의 이름을 정하는 태그 

meta 특정 인코딩 지정 → utf-8로 읽어라

!DOCTYPE html html에서 관용적으로 쓰이는 태그 

html 헤드와 본문을 엮는 태그

head 본문을 설명하는 헤드태그 

body 본문태그

a 닻 →링크 href 참조 페이지 연결 target _blank로 새 창으로 연결

### CSS

font로 컬러 결정할 수 있음 

<!— data —> 주석처리 기능 

웹브라우저는 html으로 부터 시작 

### CSS의 기본 문법

style tag 또는 속성을 씀  → css의 효과를 내는 속성 

text-decoration : none ; 

class 선택자 .으로 클래스에 접근해서 할당 가능 

id 선택자 #을 통해 접근 

h1~h6 제목태그

strong 진하게태그

u 언더라인태그

p 단락 피태그 포함 style="margin-top:45px;" 등을 활용하여 간격 조정 가능 

br 줄바꿈태그 

img 이미지 태그 

ul 구분태그(Unordered List) → ol 넘버링 태그(ordered List)

li 목록태그(list) 

table 테이블 태그

tr, td 같이 다님

title 태그 웹페이지의 이름을 정하는 태그 

meta 특정 인코딩 지정 → utf-8로 읽어라

!DOCTYPE html html에서 관용적으로 쓰이는 태그 

html 헤드와 본문을 엮는 태그

head 본문을 설명하는 헤드태그 

body 본문태그

a 닻 →링크 href 참조 페이지 연결 target _blank로 새 창으로 연결 

### CSS

font로 컬러 결정할 수 있음 

<!— data —> 주석처리 기능 

웹브라우저는 html으로 부터 시작 

### CSS의 기본 문법

style tag 또는 속성을 씀  → css의 효과를 내는 속성 

text-decoration : none ; 

class 선택자 .으로 클래스에 접근해서 할당 가능 

id 선택자 #을 통해 접근 

id → class → 

크롤링 시 데이터들을 원하는 형태로 가져오기 위해서 메타문자인 정규표현식에 대해서도 공부했습니다. 
### 정규 표현식 import re

기초는 메타문자 → 특별한 용도로 사용하는 문자임 어떤 데이터를 끌어와서 정제할 때 쓰이는 용도

문자클래스 [], []안에 있는 문자와 매치가 있으면 선택됨 

[a-zA-Z] 알파벳 모두

[0-9] : 숫자 

^는 not 의 의미를 지님 

[^0-9]는 문자매치

Dot (.) 줄바꿈 제외 모든 문자와 매치 

ex) a.b는 a+모든문자+b와 매치

활용 a[.]b로 쓰면 문자열과 매치 a0b는 매치 안됨 

반복을 나타내는 *  

*앞에 있는 문자가 반복된다 0번 반복도 포함 

+도 반복을 나타내는 메타문자 최소 1번

{}반복을 걸 때 사용하는 메타문자

{2} 반드시 2번 

{2,5} 2~5회 반복

?은 {0,1}을 의미 

있어도 되고 없어도 된다고 생각 

### re 모듈

문자열 검색시 

match() —> 문자열의 처음부터 정규식과 매치되는지 조사한다.

보통 match의 결과로 match의 객체 또는 None이 반환되기 때문에 객체가 반환되는 조건에서 그룹화 하는 작업으로 이루어지는게 일반적이다 .

search() —> 문자열 전체를 검색하여 정규식과 매치되는지 조사한다.

문자열에 search를 수행하면 match와 기본적으로는 동일하게 매치가 된다. 다만 search는 문자열의 처음부터 검색하는 것이 아니라 문자열 전체를 검색함 

match와 search는 처음부터 검색할지의 여부에 용도가 나뉜다.

findall() —> 정규식과 매치되는 모든 문자열을 리스트로 반환 

recompile된 정규식에 매치시켜서 리스트로 반환

finditer() —> 정규식과 매치되는 모든 문자열을 반복 가능한 객체로 반환 

findall과 동일하지만 그 결과로 반복 가능한 객체를 돌려준다 .

- DOTALL(S) - `.` 이 줄바꿈 문자를 포함하여 모든 문자와 매치할 수 있도록 한다.
- IGNORECASE(I) - 대소문자에 관계없이 매치할 수 있도록 한다.
- MULTILINE(M) - 여러줄과 매치할 수 있도록 한다. (`^`, `$` 메타문자의 사용과 관계가 있는 옵션이다)
- VERBOSE(X) - verbose 모드를 사용할 수 있도록 한다. (정규식을 보기 편하게 만들수 있고 주석등을 사용할 수 있게된다.)


구글 Colab환경에서 BS4를 실습하며 html.parser의 기능과 find_all, find 기능이 주요하다고 생각했고 크롤링 학습을 마치게 되었습니다.
