---

title: Colab에서 Selenium 사용하는 방법
description: Colab에서 Selenium을 사용하기 위해서는 몇가지의 코드가 추가로 필요하다. 이에 대해 알아보자.
slug: selenium-for-colab
img: selenium-for-colab.png
datetime: 2021. 07. 09.
category: 프로젝트
categoryeng: projects
author: 신윤진
language: Korean
featured: none

---

## 오류발생

![0.png](/selenium-for-colab/0.png)

오래만에 selenium을 colab에서 사용하려고 하니 오류가 발생한다.

분명 작년 여름에는 멀쩡하게 돌아갔던 것 같은데 갑자기 안 된다.

![1.png](/selenium-for-colab/1.png)

(작년 여름에 selenium 사용한 흔적)

## 해결과정

구글에 오류(`executable needs to be in path`)를 검색해보니 3가지 해결방법([출처](https://emessell.tistory.com/148))이 보였다.

1. **r 써주기**

    ```python
    browser = webdriver.Chrome(r'C:\Users\JINI\Downloads\chromedriver.exe')
    ```

2. **\ 한 번 더 붙여주기**

    ```python
    # escape 처리
    browser = webdriver.Chrome('C:\\Users\\JINI\\Downloads\\chromedriver.exe')
    ```

3. **\ → / 로 교체**

    ```python
    browser = webdriver.Chrome('C://Users//JINI//Downloads//chromedriver.exe')
    ```

근데 다 안 되더라 😭

구글에 `colab selenium` 이라 검색하니 필자만 오류가 발생하는게 아니었다.

stack overflow([출처](https://stackoverflow.com/questions/56829470/selenium-google-colab-error-chromedriver-executable-needs-to-be-in-path))에 의하면 'Google Chrome' 과 'Chromium Browser'의 버전 차이 때문에 오류가 발생한다고 한다. 

해결 코드는 다음과 같았다.

### :white_check_mark: 해결코드

```python
# step1
!apt-get update
!apt install chromium-chromedriver
!cp /usr/lib/chromium-browser/chromedriver /usr/bin
!pip install selenium

# step2
from selenium import webdriver
options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

# step3
wd = webdriver.Chrome('chromedriver',options=options)
```

![2.png](/selenium-for-colab/2.png)

오류가 발생하지 않는다! 🙊🎉

## +) headless option

오류는 해결됐는데 chrome 창이 뜨지 않았다.

처음에는 옵션 설정(headless) 때문인 줄 알고 옵션을 없애봤는데 오류가 발생했다.

![3.png](/selenium-for-colab/3.png)

창을 띄우고 실습을 하고 싶어서 구글링해봤지만 도저히 해결방법이 안 나왔다.

결국 stackoverflow에 가입해 질문글을 올렸다.

![4.png](/selenium-for-colab/4.png)

답변에 의하면 colab 자체가 headless mode라서 창을 띄우는게 불가능하다고 한다. 진작에 물어볼 걸 그랬다 🤦‍♀️

결론: 웹크롤링은 웬만하면 주피터 노트북으로 하자.