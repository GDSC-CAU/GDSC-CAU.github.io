---
title: 텍스트 전처리 (2)
description: 텍스트 전처리 과정 및 방법에 대한 전반부 개념
slug: data-study-week-4-NLP_tutorial
category: Data-Science
author: Choi Geonwoo
featured: none
---
**이전 게시글인 토큰화에 이어서 진행합니다.**
# 0. 텍스트 전처리란?
텍스트를 이용해 학습을 하기 이전에 학습에 용이하게끔 데이터를 다듬는 과정을 의미한다.  
꽤나 다양한 방법들이 있고 그중에서 몇가지를 소개해보고자 한다.  
#


# 1. 정제, 정규화
말뭉치에서 용도에 맞게 토큰을 분류하는 작업을 토큰화라고 하고 토큰화 전/후에 텍스트 데이터를 용도에 맞게 정제 및 정규화 하는 일이 항상 존재한다.

* 정제 : 갖고 있는 말뭉치로부터 노이즈 제거
* 정규화 : 표현 방법이 다른 단어들을 통합시켜서 같은단어로 만드는 것

## 1. 규칙에 기반한 표기가 다른 단어들의 통합
> 예) 같은 의미를 가진 단어임에도 표기가 다른 경우에도 하나의 단어로 정규화 하는 방법

이와 관련한 것은 어간추출(stemming)과 표제어 추출(lemmatization)에서 자세히 배울 것

## 2. 대, 소문자 통합
대소문자 구별을 요하는 경우, 아닌 경우에 대해 어떻게 접근할 것인가에 대한 판단.

## 3. 불필요한 단어의 제거

정제작업에서 제거하는 노이즈 데이터는 자연어가 아니면서 의미없는 글자(특수문자 등)뿐 아니라 분석 목적에 맞지 않는 불필요 단어도 의미한다.  
불필요한 단어는 불용어 제거와 빈도수(낮은 단어) 필터링, 길이가 짧은단어 필터링 등의 방법이 있다.

### (1) 등장 빈도가 적은 단어
등장 빈도가 너무 적어서 도움이 안되는 경우.  

### (2) 길이가 짧은 단어
영어권 언어에서는 짧은 단어를 삭제하는 것 만으로도 크게 의미없는 단어(불용어)를 제거하는 효과를 볼 수 있다고 알려져 있다.  
그뿐 아니라 단어가 아닌 구두점들도 한꺼번에 제거할 수 있다는 장점이 있다.  
다만 한국어에서는 길이가 짧다고 해서 의미가 없지 않을 수 있다.  
이는 한국어의 특성때문인데, 한자어나 순 한글 모두 한글자에 의미를 담는 함축적인 경우가 많다. 예를들어 학교의 학(배울 학) 이므로 '학'이라는 단어 하나 만으로도 '배운다'라는 의미가 내포되어 있다.  
따라서 언어권에 따라 길이가 짧은 것을 불용어로 보는 것이 효과적인지는 모두 다를 것이다.


```python
# 정규표현식을 이용한 길이 짧은 단어 삭제
import re
text = "I was wondering if anyone out there could enlighten me on this car."

# 길이가 1~2인 단어들을 정규 표현식을 이용하여 삭제
shortword = re.compile(r'\W*\b\w{1,2}\b')
print(text)
print(shortword.sub('', text))
```
#
> output :  
> I was wondering if anyone out there could enlighten me on this car.
 was wondering anyone out there could enlighten this car.
​

# 2. 어간 추출과 표제어 추출
목표 : 자연어처리에서 전처리, 코퍼스의서의 복잡성을 줄이는 것  
어간 추출과 표제어 추출의 의미 : **하나의 단어로 일반화 할 수 있다면 일반화하여 단어수를 줄이는 것**
#
## 1. 표제어 추출
표제어 = 표제어 or 기본 사전형 단어
토큰이 다른 형태를 가져도 그 단어의 뿌리를 찾아가서 하나의 단어로 묶어버리는 것을 의미.
> be, are, is, am 은 모두 be로부터 파생된 단어이다. 따라서 이 단어드르이 표제어는 be이다.

### 1) 어간(stem)
단어의 의미를 담고있는 부분  
### 2) 접사(affix)
단어에 추가적인 의미를 주는 부분  

형태학적 파싱 : 어간과 접사로 분리하는 작업
> cats -> cat(어간) + -s(접사)

NLTK에서는 표제어 추출 도구인 WordNetLemmatizer을 지원한다.  

```python
from nltk.stem import WordNetLemmatizer # nltk.stem의 WordNetLemmatizer함수

lemmatizer = WordNetLemmatizer() # 인스턴스 생성

words = ['policy', 'doing', 'organization', 'have', 'going', 'love', 'lives', 'fly', 'dies', 'watched', 'has', 'starting']

print('표제어 추출 전 :',words)
print('표제어 추출 후 :',[lemmatizer.lemmatize(word) for word in words]) 
# list comprehension을 활용해서 인스턴스의 .lemmatize() 메서드에 words의 원소를 대입

'''
output : 
표제어 추출 전 : ['policy', 'doing', 'organization', 'have', 'going', 'love', 'lives', 'fly', 'dies', 'watched', 'has', 'starting']
표제어 추출 후 : ['policy', 'doing', 'organization', 'have', 'going', 'love', 'life', 'fly', 'dy', 'watched', 'ha', 'starting']
'''
```
그 결과 dies -> dy, has -> ha로 바뀌는 오류를 확인할 수 있다.  
그 원인은, 표제어 추출기(lemmatizer)가 본래 단어의 품사정보가 있어야만 정확한 결과를 내기 때문이다.  

WordNetLemmatizer의 입력 파라미터로 단어의 품사를 넣어줄 수 있다.  
품사까지 넣어준다면 보다 정확한 표제어(Lemma)를 출력하게 된다.

표제어 추출은 문맥을 고려하여 수행했을 때 해당 단어의 품사 정보를 보존한다.  
하지만 어간추출을 하게 되면 품사정보가 보존되지 않는다.(정확히는 어간추출 결과가 사전에 존재하지 않는 단어일 경우가 많음)
#
## 2. 어간추출
어간을 추출하는 작업을 어간추출이라고 한다.  
어떻게 보면 형태학적 분석을 단순화한 버전임과 동시에 규칙에 따라 어림짐작으로 어간 어미를 자르는 작업이다.  
정확한 작업이 아니기 때문에 잘라진 어간이 사전에 존재하지 않는 단어일 수도 있다.  
예 : 포터 알고리즘(Porter Algorithm)
```python
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

stemmer = PorterStemmer()

sentence = "This was not the map we found in Billy Bones's chest, but an accurate copy, complete in all things--names and heights and soundings--with the single exception of the red crosses and the written notes."
tokenized_sentence = word_tokenize(sentence)

print('어간 추출 전 : ', tokenized_sentence)
print('어간 추출 후 : ', [stemmer.stem(word) for word in tokenized_sentence])

'''
output : 
어간 추출 전 :  ['This', 'was', 'not', 'the', 'map', 'we', 'found', 'in', 'Billy', 'Bones', "'s", 'chest', ',', 'but', 'an', 'accurate', 'copy', ',', 'complete', 'in', 'all', 'things', '--', 'names', 'and', 'heights', 'and', 'soundings', '--', 'with', 'the', 'single', 'exception', 'of', 'the', 'red', 'crosses', 'and', 'the', 'written', 'notes', '.']
어간 추출 후 :  ['thi', 'wa', 'not', 'the', 'map', 'we', 'found', 'in', 'billi', 'bone', "'s", 'chest', ',', 'but', 'an', 'accur', 'copi', ',', 'complet', 'in', 'all', 'thing', '--', 'name', 'and', 'height', 'and', 'sound', '--', 'with', 'the', 'singl', 'except', 'of', 'the', 'red', 'cross', 'and', 'the', 'written', 'note', '.']
'''

```

## 3. 한국어에서 어간 추출
한국어는 5언 9품사 구조이다.  
| 언 | 품사 | 
| --- | --- |
| 체언 | 명사, 대명사, 수사 | 
| 수식언 | 관형사, 부사 | 
| 관계언 | 조사 | 
| 독립언 | 감탄사 | 
| **용언** | **동사, 형용사** | 

이중에서 동사와 형용사는 어간(stem)과 어미(ending)의 결합으로 구성된다. 용언 = 동사 + 형용사

### (1) 활용(conjugation)
어간 : 용언을 활용할 때 원칙적으로 모양이 변하지 않는 부분. 때론 바뀔 수도 있다.  
어미 : 용언의 어간 뒤에 붙어서 활용하면서 변하는 부분. 여러 문법적 기능 수행  
활용은 어간이 어미를 취할 때 모습이 일정하다면 규칙활용, 모습이 바뀌면 불규칙활용이라고 한다.

### (2) 규칙 활용
규칙활용은 활용 시에 어간이 안바뀌는 경우이다.  
단순하게 규칙기반으로 분리하면 된다.

### (3) 불규칙 활용
불규칙 활용은 어간이 어미를 취할 때 어간의 모습이 바뀌거나 어미가 특수한 어미인 경우를 의미  
[참고링크](https://namu.wiki/w/한국어/불규칙%20활용)

# 3. 스터디 미팅 내용
1. 캐글 competition 한가지를 정하고 메달획득 목표  
     -> 순위권의 notebook kernel을 바탕으로 학습  
     -> 다음 미팅 전까지 kernel 훑어보기
2. 교재를 정해서 이론 학습, 실습을 진행  