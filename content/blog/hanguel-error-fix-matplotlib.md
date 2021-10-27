---

title: Colab, Jupyter에서 matplotlib 한글 깨짐 해결하기
description: matplotlib의 한글 깨짐 해결 방법은 Colab과 Jupyter 각각 차이가 있다. 이에 대해 알아보자.
slug: hanguel-error-fix-matplotlib
img: hanguel-error-fix-matplotlib.png
datetime: 2021. 07. 08.
category: 웹_개발
categoryeng: front-end
author: 신윤진
language: English
featured: none

---

### 오류 발생

![교안사진.png](/hanguel-error-fix-matplotlib/교안사진.png)

질문이 올라왔다. 한글깨짐 코드를 실행하면 password를 요구한다는 것이다.

'네이버 영화 크롤링' 교안을 수정하면서 한글깨짐 현상 해결 코드를 상단에 배치해놨는데 문제가 생긴 것 같았다.

필자는 평소에 colab을 사용해왔기에 급하게 주피터 노트북으로 실행해보니 오류가 발생했다.

![한글깨짐코드.png](/hanguel-error-fix-matplotlib/한글깨짐코드.png)

ln [2]에 입력한 코드는 주피터 노트북에서 문제없이 실행되지만,

colab에서는 정상적으로 실행되도 한글깨짐 현상이 해결되지 않는 경우가 많았다.

(지금도 대부분 그러지만) 오류가 발생했을 때 해결 코드를 무작정 복사해오는 것을 좋지 않은 것 같다. (코드 몽키 🐒)

맨 처음 사진에 나온 코드의 sudo와 rm이 무엇인지, 코드를 사용한지 1년이 넘어가는 지금까지도 모르고 있다.

### 해결방법

#### ✅ colab

```python
# step1
!sudo apt-get install -y fonts-nanum
!sudo fc-cache -fv
!rm ~/.cache/matplotlib -rf

# step2
# 실행 후 런타임 다시 시작 (필수)
```

```python
# 코드 실행
import matplotlib.pyplot as plt
plt.rc('font', family='NanumBarunGothic')
```

출처: https://teddylee777.github.io/colab/colab-korean

#### ✅ 주피터 노트북(Jupyter Notebook)

```python
import platform
from matplotlib import font_manager, rc
path = "c:/Windows/Fonts/malgun.ttf"
if platform.system() == 'Darwin':
    rc('font', family='AppleGothic')
elif platform.system() == 'Windows':
    font_name = font_manager.FontProperties(fname=path).get_name()
    rc('font', family=font_name)
else:
    print('Unknown system... sorry~~~~')
```