---
title: NLP 프레임워크와 토큰화, 텍스트 전처리(1)
description: NLP에서 사용하는 라이브러리와 토큰화란 무엇인지에 대한 내용입니다.
slug: data-study-week-3-NLP_tutorial
category: Data-Science
author: Choi Geonwoo
featured: none
---


## 0. 서론
앞선 학습에서 BS와 Selenium, Scrapy를 사용해 웹상에서 목표로 하는 문자정보를 추출하는 방법을 익혔습니다.  
이번에는 NLP(자연어처리)에 대해 본격적으로 들어가보려 합니다.  

## 1. NLP(Natural Language Processing)이란?
자연어 처리를 NLP라고 한다. 쉽게 말해서 기계가 인간의 언어를 해석할 수 있게끔 처리하는 것을 의미합니다. 이는 NLU(Natural Language Understanding, 자연어 이해)과도 연관이 깊다. 검색엔진, QA시스템, 대화봇 등 다양한 분야에서 활용됩니다.
#
## 2. 토큰화(Tokenization)란?
토큰화는 텍스트 전처리 프로세스 중 하나로 텍스트를 해당 언어의 특정한 단위(예 : 단어, 특정한 문자열 등)에 맞춰 잘게 쪼개는 것을 의미합니다. 이 때 만들어진 쪼개진 문자열 하나 하나를 토큰이라고 합니다.

예를 들자면 아래의 예시처럼 문장을 쪼개는 것입니다.

> 입력 : "Time is an illusion. Lunchtime double so!"  
  출력 : "Time", "is", "an", "illustion", "Lunchtime", "double", "so"


위 예는 단어 단위로 자른 것입니다. 문자열을 자르는 것이기 때문에 자르는 규칙이 굉장히 중요합니다. 구두점과 같은 구분 문자(delimeter)을 바탕으로 쪼갤 수도 있고, 영어의 경우는 아포스트로피(')를 분리시킬지 고려할 수 도 있습니다.  

 이처럼 분리작업을 함과 동시에 각각의 문자열에 문법적 분류 레이블도 지정할 수도 있습니다. 이것이 중요한 이유는, 문법적 분류, 예를들어 어떤 단어가 명사인지 동사인지에 따라 사람이 이해하는 의미가 달라지기 때문입니다.  
예를 들어, fly라는 영단어는 명사로 취급할 때에는 '파리'를 의미하고, 동사로 취급할 때에는 '날다'라는 용언을 의미합니다. 이처럼 사람이 이해하는 의미가 달라지기 때문에 기계가 학습을 가능케 해주는 레이블에는 문법적 분류라는 중요한 요소가 포함되어야 합니다.
#
## 3. 토큰화 라이브러리
토큰화를 해주는 라이브러리는 영어의 경우 대표적으로 NLTK가 있습니다. 정확히는 NLTK가 토큰화만을 위한 것이 아닌 전반적인 기호, 통계, 자연어처리를 위한 범용적 프로그램의 합본으로 볼 수 있습니다. NLTK는 pip 명령어를 통해 설치할 수 있으며 성능도 영어 한정해서는 일반적인 프로젝트 진행에 전혀 무리 없을 정도로 준수하므로 영어 코퍼스를 통해 학습을 해야하는 경우에는 NLTK를 사용합니다.  

[NLTK 토큰화 패키지 공식문서](https://www.nltk.org/api/nltk.tokenize.html#module-nltk.tokenize)  
다른 여러가지 기능들도 있지만 이번 주제는 토큰화이므로 토큰화 패키지의 함수 활용을 보고자 한다.  
```python
import nltk 
from nltk.tokenize import word_tokenize # 단어 토큰화 도구
from nltk.tokenize import WordPunctTokenizer # 구두점 관련
from nltk.tokenize import sent_tokenize # 문장 토큰화 도구
from nltk.tokenize import WhitespaceTokenizer # 공백문자 관련
#from tensorflow.keras.preprocessing.text import text_to_word_sequence : 케라스에서 자체적으로 지원하는 텍스트 전처리도구

# 예시 문장
# 문장 출처 : https://edition.cnn.com/2022/01/06/china/xian-lockdown-zero-covid-intl-hnk/index.html
sentence = """The city of 13 million has been under strict lockdown since December 23, as it grapples with the country's worst coronavirus outbreak since Wuhan, the original epicenter of the pandemic. But local authorities have faced a public outcry over perceived incompetence, and disproportionately harsh measures that critics say harm the lives of those they are supposed to protect.""" 

# word_tokenize
print(word_tokenize(sentence)[:15])

"""
output : 
['The', 'city', 'of', '13', 'million', 'has', 'been', 'under', 'strict', 'lockdown', 'since', 'December', '23', ',', 'as']
"""

# wordpunct_tokenize
print(wordpunct_tokenize(sentence)[:15])
"""
output : 
['The', 'city', 'of', '13', 'million', 'has', 'been', 'under', 'strict', 'lockdown', 'since', 'December', '23', ',', 'as']
"""

# sent_tokenize
print(sent_tokenize(sentence))
"""
output : 
["The city of 13 million has been under strict lockdown since December 23, as it grapples with the country's worst coronavirus outbreak since Wuhan, the original epicenter of the pandemic.", 'But local authorities have faced a public outcry over perceived incompetence, and disproportionately harsh measures that critics say harm the lives of those they are supposed to protect.']
"""

# WhitespaceTokenizer
print(list(WhitespaceTokenizer().span_tokenize(sentence))[-15:])
"""
output : 
[(288, 293), (294, 302), (303, 307), (308, 315), (316, 319), (320, 324), (325, 328), (329, 334), (335, 337), (338, 343), (344, 348), (349, 352), (353, 361), (362, 364), (365, 373)]
"""

```

위 예제처럼 문장단위, 단어단위, 구두점, 공백과 같은 기준을 가지고 말뭉치(corpus, 코퍼스)를 토큰화할 수 있다.  

#
### 한글은??
영어만 보면 섭하니 한글 말뭉치 토큰화 도구를 간단하게 짚고 넘어가보자.  
한글의 분석에는 형태소라는 가장 작은 단위부터 잘 알고 있어야 한다. 형태소는 크게 두가지가 있다.  
* 자립형태소
* 의존형태소

형태소라는 단어가 아닌 최소단위를 가지고 있기 때문에 영어보다 어려운 난이도를 가지고 있다.  
그럼에도 한글 토큰화 도구(형태소 분석기)가 있다. KoNLPy, deeq NLP, Okt, 꼬꼬마 등 여러가지가 존재하는데 각기 장점이 다 있다. 개인적으로는 KoNLPy와 deeq NLP를 써보려고 한다.
#
## 이후 학습 방향
Scrapy로 웹상의 텍스트를 가져올 수 있고, 토큰화를 비롯한 전처리에 대한 학습이 일단락 되면 본격적으로 언어모델을 만들어보는 미니프로젝트를 진행해보는 것도 좋을 것 같습니다.
