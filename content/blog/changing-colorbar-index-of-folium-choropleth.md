---
title: Folium choropleth에서 colorbar 인덱스 바꾸는 법
description: Folium choropleth에서 colorbar의 인덱스(숫자)를 바꾸는 법을 알아보자.
slug: changing-colorbar-index-of-folium-choropleth
img: not-yet-generated.png
datetime: 2021. 08. 31.
category: 데이터
categoryeng: data-science
author: 신윤진
language: English
featured: none
---



📌 **오늘의 교훈**

- 궁금증이 생겼을 때, 1순위는 공식 문서





### 질문

---

![qna](/changing-colorbar-index-of-Folium-choropleth/01.png)

![colorbar](/changing-colorbar-index-of-Folium-choropleth/01_bar.png)





### 답변

---

#### 해결과정

---

처음 질문이 들어왔을 때, '색'에 꽂혀 질문의 의도를 잘못 이해했다.

- 구글 검색 키워드: `folium color gradient`, `folium branca`





구글링의 결과를 참고해 `branca`로 colormap의 **tick_labels**를 설정하려니 오류가 발생했다.

stackoverflow의 글들을 아무리 읽어봐도 모르겠어서 팀원들에게 도움을 요청하니,

생각보다 해결방법이 간단해서 허무했다.





![folium documentation](/changing-colorbar-index-of-Folium-choropleth/02.png)

나는 분명 공식 문서를 봤을 텐데,

왜 발견하지 못했는가 😄





#### 해결코드

---

```python
geo_path = 'C:/Users/JINI/Downloads/skorea_provinces_geo_simple.json'
geo_str = json.load(open(geo_path, encoding='utf-8'))
map = folium.Map(location=[36.5502, 126.982], zoom_start=6.4,
                #tiles='Stamen Toner' 
                )

# 지도 시각화
map.choropleth(geo_data = geo_str,
              data = edu,
              columns=['시도별', '2012'],
              fill_color = 'YlGnBu',
              key_on = 'properties.name',
              bins = [0, 10, 20, 30, 40, 50])     # 해결방법: bins 파라미터 설정

map
```





![before](/changing-colorbar-index-of-Folium-choropleth/03_b.png)

![after](/changing-colorbar-index-of-Folium-choropleth/03_a.png)

- **주의할 점**

  - 데이터의 값을 벗어난 범위(혹은 NaN 값이 있을 경우)를 지정해 줄 경우 아래와 같은 오류가 발생한다. 즉, 지정된 범위에서 벗어난 데이터가 없는지 확인해야 된다.

    ```python
    # ValueError
    All values are expected to fall into one of the provided bins (or to be Nan).
    Please check the `bins` parameter and/or your data.
    ```





### +) `bins` 입력값 개수 제한(미해결)

---

`bins` 파라미터에 11개의 값을 입력하니 `KeyError`가 발생했다.

```python
# 11개 이상의 값을 입력한 경우
KeyError: 'YlGnBu'
    
# 참고: 3개 이하의 값을 입력한 경우
ValueError: The minimum number of colors in a ColorBrewer sequential color series is 3
```





구글링해보니 색이 가진 색조 때문이라는데, 관련 정보를 찾아도 잘 안 보인다.

(추후 정확한 이유를 알아내면 추가할 예정!)





### 📚 참고자료

[[Folium 0.12.1 documentation] folium](https://python-visualization.github.io/folium/modules.html)

[[GitHub] Getting KeyError after using "bins" parameter in Choropleth](https://github.com/python-visualization/folium/issues/1254)

