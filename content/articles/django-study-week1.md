---

title: Django 스터디 1주차
description: 블로그 홈 화면 및 메인 화면 구성하기
slug: django-study-week1
category: Back-End
author: Seoyeon Lee
featured: Featured
img: django.png

---

* [멋쟁이 사자처럼 오픈튜토리얼스](https://opentutorials.org/module/4034)를 참고하여 진행된 스터디입니다.



## Django 스터디 1주차



### Django 소개

* 파이썬 기반으로 작성된 오픈소스 웹 어플리케이션 프레임워크
* 장고 공식 사이트 : [https://www.djangoproject.com] (https://www.djangoproject.com)
* 장고의 목표 : 데이터베이스 기반 웹 사이트를 보다 편리하게 작성하는 것
* 내장된 기능만을 이용하여 빠르게 웹 개발을 할 수 있다는 것이 장점
* MVT 패턴을 따름



### MVT 패턴

* M(Model) + V(View) + T(Template)
* 웹 어플리케이션 개발 영역을 크게 3가지로 나눔으로써 독립적으로 개발 가능


#### Model

* 데이터를 다루는 영역
* 데이터베이스에 적용될 모델 설계


#### View

* 웹 어플리케이션에서 데이터들이 처리되는 로직 정의
* 데이터를 처리할 함수 정의


#### Template

* 사용자가 보게 되는 웹 페이지의 모습을 구성
* 주로 html, css, javascript 등을 이용한 클라이언트 정적 웹 페이지를 작성



### 블로그 홈 화면 구성


#### App 생성

* App들이 모여서 하나의 장고 프로젝트를 구성

```
python manage.py startapp blogapp
```

**blogapp**이라는 이름의 앱 생성

* 생성한 **blogapp**을 장고가 인식하게 하기 위해서 **settings.py** 설정

![app 등록](/django-study-week1/01.PNG)

  **INSTALLED_APPS**에 프로젝트에서 사용하는 앱을 등록


#### templates 구성

* **templates**에서 홈 화면을 구성하기 위한 html 문서를 관리

![templates 이동](/django-study-week1/02.PNG)

  **blogapp** 안에서 홈 화면을 띄울 것이므로 <u>**templates**</u>를 <u>**blogapp**</u>으로 옮김

* html 문서 작성

  ```html
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
  </head>
  <body>
  안녕하세요. 중앙대학교 GDSC.
  </body>
  </html>
  ```
  **index.html** 작성


#### views.py & urls.py

* views.py
  + 파이썬 문법을 활용하여 여러 함수들 생성
  + 생성함 함수들을 이용하여 자신이 원하는 형태로 데이터를 처리한 뒤, 특정 html로 데이터를 보냄

  ```python
  def index(request):
    return render(request, 'index.html')
  ```

  **render** 함수를 통해 요청을 **index.html** 문서로 리턴

* urls.py
  + **view.py**에서 생성한 index 함수를 **urls.py**에서 연결

  ```python
  urlpatterns = [
      path('admin/', admin.site.urls),
      path('', blogapp.views.index, name='index'),
  ]
  ```

  + path 함수
    + 첫번째 인자 **''** : 내 블로그 홈페이지의 주소를 입력할 때 아무것도 입력하지 않음
      즉, 'http://www.myblog.com'으로 접속하면 내가 작성한 index.html 문서가 보임
    + 두번째 인자 **blogapp.views.index** : 내가 생성한 index 함수를 적용시킴
    + 세번째 인자 **name='index'** : 함수를 적용시키고 이름을 명명하면, 추후에 html 파일에서 이 이름으로 url 값을 불러올 수 있음


#### 부트스트랩 

* 웹 사이트를 쉽게 만들 수 있게 도와주는 html,css,js 프레임워크
* 하나의 css로 휴대폰, 태블릿, 데스크탑까지 다양한 기기에서 작동함
* 즉, 부트스트랩을 이용해 예쁜 페이지를 쉽게 구성할 수 있음

* [부트스트랩](https://getbootstrap.com/)의 **examples**를 활용하여 페이지 구성


#### 정적 파일

* 부트스트랩 html은 css 파일을 별개로 가지고 있기 때문에 이를 따로 관리해야 함
* 정적 파일은 웹 페이지를 만들 때, 쓰임이 정해져있는 파일들이므로 개발 단계에서 해당 파일들을 관리
* css 파일, jpg와 같은 이미지 파일, javascript 파일 등
* 정적 파일과 반대되는 개념은 media 파일
  + media 파일은 사용자가 업로드하는 파일
  + 개발 단계에서 관리할 수 없으므로 따로 분류하여 관리

![static](/django-study-week1/05.PNG)

  **blogapp** 내에 **static** 디렉토리를 생성하여 부트스트랩 html의 css 파일을 관리

* settings.py 설정

  ```python
  STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'blogapp', 'static')
  ]
 
  STATIC_ROOT = os.path.join(BASE_DIR, 'static')
  ```

  **settings.py** 맨 아래 라인에 위의 코드를 입력하여 정적 파일의 위치를 지정

  ```
  python manage.py collectstatic
  ```

  터미널에서 정적 파일들을 한 곳으로 모아주는 명령어 입력

* index.html 수정

  ![index.html](/django-study-week1/06.PNG)

  부트스트랩 html의 코드를 복사하여 장고 프로젝트의 **index.html**에 붙여넣기


#### 장고 템플릿(template) 언어

* 장고 템플릿 언어는 장고로 개발할 때, html 템플릿에서 사용할 수 있는 템플릿 규칙 또는 문법
* 템플릿 변수, 템플릿 필터, 템플릿 코멘트 등
* [공식 문서](https://docs.djangoproject.com/ko/2.2/ref/templates/language/)

* 템플릿 변수
  + {{ }}로 구성
  + ex. {{ section.title }}
  + 템플릿 변수를 사용하여 html 문서 상에서도 어떠한 객체의 속성들에 접근할 수 있고, 이를 출력할 수 있음

* 템플릿 필터
  + 템플릿 변수 다음에 '|'를 그은 다음 적용하고자 하는 필터를 명시
  + ex. {{ story.headline | upper }}의 'upper'
  + 템플릿 변수의 값을 특정 형식으로 변환할 때 사용

* 템플릿 태그
  + {% %}로 구성
  + ex. {% endblock %}, {% if %}
  + html은 프로그래밍 언어가 아닌 마크업 언어이므로 프로그래밍적 로직을 구현할 수 없으나 if문, for문과 같은 템플릿 태그를 사용하면 구현 가능

* 템플릿 코멘트
  + 두 가지 코멘트 형식
    1. {# #} : 한 줄 코멘트
    1. {% comment %}, {% endcomment %} : 여러 줄 코멘트
  + html 문서 상에서 코멘트가 필요할 때 사용
  + 주석과 유사한 역할
  + 웹 사이트에서 출력되지 않음
  


### 블로그 메인 화면 구성


#### templates 구성

* 블로그 홈 화면 구성과 동일한 방식

![navbar-template](/django-study-week1/07.PNG)

* **template** 폴더에서 **blogMain.html** 문서를 생성한 후, 부트스트랩의 html 코드를 복사하여 붙여넣기
* 부트스트랩의 css 파일을 복사하여 **static** - **css**에 붙여넣기
* 'python manage.py collectstatic'를 입력하여 정적 파일을 한 곳으로 모음


#### views.py & urls.py

* 블로그 홈 화면 구성과 동일한 방식

* views.py

  ```python
  def blogMain(request):
    return render(request, 'blogMain.html')
  ```

* urls.py

  ```python
  urlpatterns = [
      path('admin/', admin.site.urls),
      path('', blogapp.views.index, name='index'),
      path('blogMain/', blogapp.views.blogMain, name='blogMain'),
  ]
  ```


#### 데이터베이스

* 블로그에서 글을 작성하면 그 내용들이 서버에 저장되어야 하고, 저장된 데이터들이 다시 블로그 안에서 보여야 함
* 데이터들을 서버에 저장하기 위해 데이터베이스 이용

* **글쓰기** 항목의 모델 설계
  
  ```python
  from django.db import models

  class Blog(models.Model):
    title = models.CharField(max_length=100)
    pub_date = models.DateTimeField()
    body = models.TextField()
  ```

  **models.py** 파일에 위의 코드를 작성하여 간단한 글쓰기 모델 설계

* 모델 데이터베이스 적용
  
  ```
  python manage.py makemigrations
  python manage.py migrate
  ```

  설계한 모델을 데이터베이스에 적용하기 위해 터미널에서 위의 명령어 입력


#### Admin Page

* admin 페이지에서 설계한 모델이 데이터베이스에 적용되었는지 확인 가능
* 서버를 실행시킨 후, [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)으로 접속
* **Tools** - **Run manage.py Task**에서 **createsuperuser**를 입력하여 관리자 계정 생성

* admin 페이지에 블로그 모델 등록

  ```python
  from django.contrib import admin
  from .models import Blog
 
  # Register your models here.
  admin.site.register(Blog)
  ```

  **admin.py** 파일에 블로그 모델 등록

![admin-page](/django-study-week1/08.PNG)

  admin 페이지에서 블로그를 추가하였을 때, 블로그 객체가 생성된다면 성공!


#### forms.py

* **글쓰기**에 사용할 폼 생성
* 데이터베이스 모델에서 title, pub_date, body 항목을 가져오는 작업을 수행하기 위함
* **blogapp** 디렉토리 내에 **admin.py** 생성
  
  ```python
  from django import forms
  from .models import Blog
 
  class CreateBlog(forms.ModelForm):
      class Meta:
          model = Blog
 
          fields = ['title', 'pub_date', 'body'] 
  ```

  + 장고에서 Meta 클래스는 내부 클래스로 활용되며, 기본 필드 값을 재정의할 때 사용
  + **blog**로부터 모델을 가져오고, 그 중 'title', 'pub_date', 'body' 항목을 가져온다는 의미

* **글쓰기**에 사용되는 폼을 띄워줄 템플릿 생성
  + **blogapp** - **templates**에 **createBlog.html** 작성
  
  + views.py

    ```python
    from .forms import CreateBlog
 
    def createBlog(request):
        form = CreateBlog()
   
        return render(request, 'createBlog.html', {'form': form})
    ```
      + 불러들인 폼을 **createBlog.html**로 보내기 위해 **form** 객체를 생성
      + render(request, '템플릿', context) 형식
        + **context**는 딕셔너리 자료형의 형태
        + **createBlog.html** 문서에 딕셔너리 자료형을 보내게 되고, **createBlog.html**에서는 장고 템플릿 변수를 이용하여 값을 출력


  + urls.py

    ```python
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('', blogapp.views.index, name='index'),
        path('blogMain/', blogapp.views.blogMain, name='blogMain'),
        path('blogMain/createBlog/', blogapp.views.createBlog, name='createBlog'),

    ]
    ```


#### 템플릿-DB 연동

* 사용자들이 입력한 데이터를 전송하기 위해 **createBlog.html**에 데이터 전달 폼 구축

  ```python
  <form method="POST">
    {{ form.as_p }}
    <input type="submit" value="저장"/>
  </form>
  ```

  'POST' 방식으로 폼 안의 데이터가 전달되고, 데이터를 제출하기 위해 'submit' 타입 사용

* **views.py** 파일 내의 **createBlog()** 함수 수정
  
  ```python
  from django.shortcuts import render, redirect
 
  def createBlog(request):
 
      if request.method == 'POST':
          form = CreateBlog(request.POST)
  
          if form.is_valid():
              form.save()
              return redirect('blogMain')
          else:
              return redirect('index')
      else:
          form = CreateBlog()
          return render(request, 'createBlog.html', {'form': form})
  ```

  + redirect() 함수는 render() 함수와 유사하나 템플릿에 값을 전달하는 것이 아닌 단순히 특정 url 혹은 프로젝트 내의 문서로 이동시키고자 할 때 사용
    1. **createBlog.html**에서 **저장**을 누르면 데이터들이 POST 방식으로 넘어옴
    1. **CreateBlog()** 폼에 값을 전달한 상태로 **form** 객체 생성
    1. 데이터들이 올바른 형식이면(form.is_valid()), 데이터베이스에 저장(form.save())
    1. 그 후에 블로그 메인 화면으로 이동(redirect('blogMain'))

* POST 데이터 전달 과정에서 보안을 위해 **createBlog.html** 파일에 '{% csrf_token %}' 추가


#### 템플릿 상속

* html 문서 중 기본 뼈대가 되는 문서를 기본 템플릿으로 정하고, 다른 문서에서 기본 템플릿의 코드가 필요하면 상속하여 가져다 씀
* 'base.hteml'로 설정

* navbar의 내용을 상속받도록 **blogMain.html**의 코드를 **base.html**에 붙여넣기

* 기본 템플릿의 위치가 변경되었으므로 **settings.py**의 **TEMPLATES** 수정

* **blogMain.html**에서 아래 내용 추가
  
  ```python
  {% extends 'base.html' %}
 
  {% block content %}
 
  {% endblock %}
  ```

  + 'extends ~'는 **base.html**을 상속받는다는 의미
  + 'block ~'과 'endblock ~' 사이에는 **blogMain.html**만의 내용을 나타내는 코드 작성
  
* 위와 같은 방식으로 **createBlog.html** 파일 수정


#### 모델 재설계

* 데이터베이스 모델 형태 변경
  1. 제목
  1. 날짜 - 별도로 입력하지 않고, 저장을 누르면 자동 입력
  1. 작성자
  1. 내용 - 글자의 색깔, 폰트, 크기 등을 변경하고, 이미지 파일을 업로드

* 위의 내용에 맞게 **models.py**와 **forms.py** 수정


#### CKEditor

* 'body'의 글자를 예쁘게 꾸밀 수 있는 텍스트 편집기
* 위지위그(WYSIWYG: What You See Is What You Get) 방식 : 블로그나 웹 페이지에서 글을 쓸 때, 눈에 보이는 글씨의 모양 그대로 문서 편집을 할 수 있는 것

* CKEditor Tool 설치

  ```
  pip install django-ckeditor
  ```

  터미널에 위의 명령어를 입력하여 CKEditor 설치

* **settings.py** 파일 내의 **INSTALLED_APPS**에 'ckeditor', 'ckeditor_uploader' 등록

* 사용자들이 업로드하는 파일을 관리하기 위해 **settings.py**에 'media' 루트 설정
  
  ```python
  MEDIA_URL = '/media/'
  MEDIA_ROOT = 'media/'
  ```
  **settings.py** 맨 아래에 위의 코드 추가

* **urls.py** 수정
  
  ```python
  from django.conf.urls import include
 
  path('ckeditor/', include('ckeditor_uploader.urls')),
  ```

  ckeditor_uploader가 url을 참조할 수 있도록 설정

  ```python
  from django.conf import settings
  from django.conf.urls.static import static
 
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  ```

  MEDIA 경로를 참조하기 위해 위의 문장 추가

* **bloggapp** - **models.py** 수정

  ```python
  from ckeditor.fields import RichTextField
  from ckeditor_uploader.fields import RichTextUploadingField
 
  body = RichTextUploadingField()
  ```

* 'collectstatic' 명령어를 입력하여 정적 파일들을 모아준 후, 모델 적용


#### 글쓰기 페이지 꾸미기

* CKEditor 폼을 적용시켜 파일 업로딩 기능을 글쓰기 페이지에 적용
* **forms.py**와 **createBlog.html** 파일 수정


#### 블로그 메인 화면 출력

* **bloggapp** - **models.py**에서 **blogMain()** 함수 수정

  ```python
  from .models import Blog
 
  def blogMain(request):
      blogs = Blog.objects.all()
 
      return render(request, 'blogMain.html', {'blogs': blogs})
  ```

  + 데이터베이스에 저장된 객체를 모두 가리키는 'blogs' 객체 생성
  + 'blogs' 객체를 **blogMain.html**로 보냄

*  **blogMain.html** 수정

  ```python
  {% extends 'base.html' %}
 
  {% block content %}
 
      <br>
 
      {% for blog in blogs %}
          <main role="main" class="container">
              <div class="jumbotron">
                  <h1>제목 : {{ blog.title }}</h1>
                  <br>
                  <h4>작성일 : {{ blog.pub_date }}</h4>
                  <br>
                  <h4>작성자 : {{ blog.author }}</h4>
                  <br>
                  <p class="lead">{{ blog.body }}</p>
                  <br>
                  <a class="btn btn-lg btn-primary"
                     href="{{ site.baseurl }}/docs/{{ site.docs_version }}/components/navbar/"
                     role="button">View navbar docs &raquo;</a>
              </div>
          </main>
      {% endfor %}
 
  {% endblock %}
  ```

  + 넘겨받은 'blogs' 객체에서 템플릿 태그 for를 사용하여 반복문을 돌며 하나씩 블로그 객체 반환
  + 템플릿 변수를 이용하여 각 블로그 객체의 제목, 작성일, 작성자, 내용을 출력

* 내용에 원하지 않는 태그가 섞여서 나오는 문제를 해결하기 위해 장고 템플릿 필터 'safe' 사용
  + **blogMain.html**에 '{{ blog.body | safe }}' 추가  
