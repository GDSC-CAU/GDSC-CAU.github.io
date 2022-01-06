---
title: Selenium을 활용한 크롤링
description: 문장 데이터 수집을 위해 필요한 Selenium 내용입니다.
slug: data-study-week_1-Selenium
category: Data-Science
author: Choi Geonwoo
featured: Featured
img: selenium.png
---

## 0. Selenium을 알아보자
>Selenium 공식문서 : https://selenium-python.readthedocs.io/index.html  

셀레니움이란 웹애플리케이션 테스트를 위한 포터블 프레임 워크입니다.  
Wikipdeia에 따르면 기능테스트를 해보기 위한 도구를 제공한다고 나와있는데요.  
사실 크롤링에는 더 편리한 패키지들이 있습니다.(ex. 스크래피)  
따라서 이번에는 셀레니움의 모든 기능을 하나하나 살펴보는 것 보다는 Web Crawling에 어떤 방법으로 적용하여 사용할 수 있을 지를 주안점으로 삼고 진행하겠습니다.  




#
### 1. **크롤링(Crawling)** 이란?
* 크롤링 또는 스크래핑(scraping)은 **"웹 페이지를 가져와서 데이터를 추출하는 행위"** 를 의미합니다. 
   
현재 데이터 스터디에서 공부하고자 하는 바는 NLP인데, 너무 정형화된 데이터를 학습에 이용하는 것 보다는 직접 실제로 사용하는 문장 데이터를 수집하여 학습을 진행하는 것이 더 좋을 것이라 판단했기 때문에 본 학습 이전에 Crawling을 통해 직접 데이터를 수집할 수 있는 것이 목표입니다.  

### 2. Selenium을 이용한 크롤링
1.  Selenium패키지와 Chrome Driver 준비  
    Selenium패키지는 Pychar, pip, conda 등 다양한 방법으로 설치할 수 있습니다. 이번에는 pip을 사용하도록 하겠습니다.  
    ```python
    pip selenium
    ```  
    코드를 입력하면 Selenium이 설치 됩니다.  

    이제 필요한 것은 Chrome Driver입니다.  
    크롬 드라이버는 코드를 통해 구글 크롬을 실행 및 조작할 수 있는 장치 정도로 생각하면 좋습니다.  
    > https://chromedriver.chromium.org/downloads  

    해당 사이트에서 자신이 사용하는 크롬 버전과 맞는 크롬 드라이버를 다운로드 받은 후, 작업할 디렉토리에 옮겨두기만 하면 끝입니다.
2. Selenium 기본 예제  
    크롬 드라이버를 활용할 때의 셀레니움은 거의 대부분 다음과 같이 패키지를 불러옵니다.
    ```python
    from selenium import webdriver
    from selenium.webdriver.common.keys import Keys
    import time # sleep(<time>)을 통해 직접 타이밍을 주기 위함.
    ```
    webdriver을 import했으니 chrome driver과 연결시켜야 합니다.
    ```python
    driver = webdriver.Chrome('<Chrome Driver Location>')
    driver.implicitly_wait(<time>)
    ```
    이렇게 하면 webdriver이 chrome driver과 연결되어서 웹페이지를 접속 및 조작 할 수 있습니다.  
    아래는 기본 함수입니다.
    ```python
    # 페이지 이동
    driver.get('https://google.co.kr')
    # 브라우저 종료
    driver.quit()
    # 탭 종료
    driver.quit()

    # 화면 크기 설정
    # 전체화면
    driver.fullscreen_window()
    # 최대 창 크기
    driver.maximize_window()
    # 특정 좌표(x,y)와 크기(w,h)로 설정
    driver.set_window_rect(x,y,w,h)
    # 특정 좌표로 이동
    driver.set_window_position(x,y)

    # 뒤로 가기
    driver.back()
    # 앞으로 가기
    driver.forward()

    # 특정 요소(elements) 찾기
    var1 = driver.find_element_by_css_selector('<css selector name>')
    # 키 입력하기
    var1.send_keys('abcd') # abcd 입력
    var1.send_keys(Keys.ENTER) # 엔터키 입력
    # 클릭하기
    var1.click()
    ```
    사실 이정도만 알아도 bs4와 같은 다른 라이브러리를 같이 사용한다면 문제없는 정도입니다.  
    하지만! 여기서 중요한 것이 바로! 이 부분입니다!
    ```python
    # 특정 요소(elements) 찾기
    var1 = driver.find_element_by_css_selector('<css selector name>')
    ```
    바로 자신이 원하는 정보가 담겨있는 위치에 접근 하는 것입니다.  
    주로 사용하는 함수는 아래와 같습니다.
    ```python
    # 단일 element를 찾는 함수. 
    # 여러개의 element를 찾고싶다면 find_elements*처럼 s를 붙이면 된다. 
    find_element_by_id
    find_element_by_name
    find_element_by_xpath
    find_element_by_link_text
    find_element_by_partial_link_text
    find_element_by_tag_name
    find_element_by_class_name
    find_element_by_css_selector

    # 또는 다음과 같이 사용할 수 있다.
    # By. 뒤에 필요한 element를 넣으면 된다.
    # 위와 동일하게 여러개의 element를 찾고싶다면 s를 뭍이면 된다.
    import selenium.webdriver.common.by import By
    find_element(By.XPATH,<xpath>)
    ```
    웹 페이지의 구조를 알고있어야 html tag, id, css selector나 class, xpath등 다양한 방법을 통해 웹 소스 전역에 분산되어있는 데이터에 접근하기 수월해지기 때문입니다.  
    자주 사용하는 html태그에 대한 설명은 아래 영상링크를 통해 정리된 내용을 확인할 수 있습니다.
    > https://youtu.be/T2RglXel74Y  

    이제 간단한 예제 한가지를 해보며 마무리해보도록 하겠습니다.  

<br>

3. 예제 - 네이버에 '날씨' 검색 후 나타나는 뉴스 제목 크롤링
   ```python
    from selenium import webdriver
    from selenium.webdriver.common.keys import Keys
    import time

    # chromedriver setting - 각주부분은 colab에서 구동시 사용
    """chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')"""
    driver = webdriver.Chrome('chromedriver')
    driver.implicitly_wait(15) # 묵시적 대기, 활성화를 위해 최대 15초까지 기다린다는 의미.

    # get page
    driver.get('https://www.naver.com')

    # find features : Search and Sending key
    search = driver.find_element_by_css_selector('#query') # 검색창의 위치
    search.send_keys('날씨') # 날씨 입력
    search.send_keys(Keys.ENTER) # 엔터
    time.sleep(3)

    # 뉴스 제목 가져오기
    news = driver.find_elements_by_class_name('news_tit')
    print(type(news)) # 타입 확인
    news_list = []
    for i, data in enumerate(news):
        news_list.append(data.text) 
    ''' 
    <class 'selenium.webdriver.remote.webelement.WebElement'> 타입 데이터에 대해 .text와 같은 함수로 특정 데이터만 추출할 수 있다.
    '''

    print("날씨 검색 후 뉴스 제목 : {}".format(news_list))
    driver.quit()

    
   ```
#
## 3. 맺음말  
Selenium은 위에서 소개한 기능보다도 정말 많은 기능이 있습니다.  
예를 들면 스크립트를 실행시키는  ```driver.execute_script(<script>)``` 와 같은 함수도 존재합니다.  
하지만 단점이 없는 것은 아닙니다.  
웹을 직접 불러오고나서 작업을 하기 때문에 많은 양의 데이터를 수집하는데에는 부적합한 면이 있습니다.  
그래서 앞으로는 Scrapy라는 웹 크롤링 전용 프레임워크를 학습 후 활용할 예정입니다.  
긴 글 읽어주셔서 감사합니다.