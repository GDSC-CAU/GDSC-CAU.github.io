---

title: BeautifulSoup으로 여러 페이지 크롤링 하기
description: BeautifulSoup을 통해 여러 페이지를 크롤링 할 시 에러가 나는 경우가 있다. 해결 방법에 대해 알아보자.
slug: crawling-webpages-via-bs
img: crawling-webpages-via-bs.png
datetime: 2021. 07. 20.
category: 데이터
categoryeng: data-science
author: 신윤진
language: Korean
featured: none

---

### 오류 발생

![00.png](/crawling-webpages-via-bs/00.png)

DS 6주차 과제는 "한국일보 사회 지면 타이틀 5페이지 크롤링"이다.

반복문을 사용해서 1페이지부터 5페이지까지 url을 긁어오는 것은 성공했는데, 마지막 페이지의 타이틀 10개만 크롤링 되어 막히는 분들이 있었다.

### 해결방법

일단 각 페이지의 타이틀을 크롤링하는 코드는 다음과 같다.

```python
for i in range(1, 6) :
    url = 'https://www.hankookilbo.com/News/Society/HC01?Page=' + str(i)

    res = urllib.request.Request(url, headers =headers) # 403 Forbidden 오류해결
    page = urlopen(res).read()
    soup = BeautifulSoup(page,'html.parser')
    title_list = soup.find_all('h3')
```

![01.png](/crawling-webpages-via-bs/01.png)

![02.png](/crawling-webpages-via-bs/02.png)

타이틀이 문제없이 크롤링 되는 것 같다.

![03.png](/crawling-webpages-via-bs/03.png)

그런데 다시 title_list를 출력해보면 마지막 페이지의 타이틀 10개만 크롤링만 되어있다. 이유가 무엇일까?

![04.png](/crawling-webpages-via-bs/04.png)

len(title_list)를 확인해보면 그 이유를 알 수 있다.

반복문이 총 5번 도는 동안 title_list에 값이 중복 저장이 되지 않기 때문에 마지막 5페이지의 타이틀 데이터만이 출력되는 것이다.

![05.png](/crawling-webpages-via-bs/05.png)

빈 리스트를 생성한 뒤 title_list의 값을 매 반복문마다 담아주면 5페이지의 타이틀(50개)가 모두 크롤링 되는 것을 확인할 수 있다.

#### ✅ 해결코드

```python
titles = [] # 리스트 생성

for i in range(1, 6) :
    url = 'https://www.hankookilbo.com/News/Society/HC01?Page=' + str(i)

    res = urllib.request.Request(url, headers =headers) # 403 Forbidden 오류해결
    page = urlopen(res).read()
    soup = BeautifulSoup(page,'html.parser')
    title_list = soup.find_all('h3')

    for title in title_list:
      titles.append(title.get_text())
```

