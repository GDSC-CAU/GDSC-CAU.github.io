---

title: Colab에서 .py 파일 여는 법
description: 파이썬 확장자로 작성한 파이썬 모듈이 Colab에서 불러와지지 않는 상황의 해결방법에 대해 알아보자.
slug: open-py-on-colab
img: open-py-on-colab.png
datetime: 2021. 07. 03.
category: 데이터
categoryeng: data-science
author: 신윤진
language: Korean
featured: none

---

![1.png](/open-py-on-colab/1.png)

colab 파일에 함수 정의해서 .py파일로 저장하고, 구글 드라이브에서 동일한 폴더 안에 두었는데 자꾸 모듈을 찾을 수 없다는 오류가 뜨네요. 어느 부분이 문제인걸까요?

### 방법 1) google drive에 파일을 직접 업로드하기

![2.png](/open-py-on-colab/2.png)

[사진 2] 구글 드라이브 업로드

일단 본인이 사용하고자 하는 .py파일을 구글 드라이브에 업로드한다.

(필자는 **내 드라이브(MyDrive) > Colab Notebooks > data** 폴더에 업로드했다.)

```python
# 파일위치를 아래 코드에 입력 후 실행
import sys
sys.path.append('/content/drive/MyDrive/.py파일 저장한 폴더명')
import 모듈이름
```

![3.png](/open-py-on-colab/3.png)

[사진 3] 모듈이 정상적으로 실행됨

정상적으로 모듈이 실행되는 것을 확인할 수 있다.

![4.png](/open-py-on-colab/4.png)

**TIP) 파일위치 작성하는 법**
colab 화면 왼쪽의 파일 아이콘(📁) 클릭 > 드라이브 마운트 클릭(빨간색 원) > 파일 찾기 > 마우스 오른쪽 클릭 > 경로 복사

### 방법 2) colab에 파일을 직접 업로드하기

```python
from google.colab import files
src = list(files.upload().values())[0]
```

![5.png](/open-py-on-colab/5.png)

[사진 4] 파일 선택 화면

위의 코드를 실행하면  파일 선택 버튼이 생기는 것을 확인할 수 있다.

![6.png](/open-py-on-colab/6.png)

[사진 5] 파일 업로드

원하는 .py 파일을 찾아 선택한다.

![7.png](/open-py-on-colab/7.png)

[사진 6] 모듈이 오류없이 실행됨

오류없이 모듈이 실행되는 것을 확인할 수 있다.

### +) colab에서 .py 파일 작성하는 법

![8.png](/open-py-on-colab/8.png)

![9.png](/open-py-on-colab/9.png)

오류가 발생한 분들 중, 확장자명을 사진과 같이 직접 변경하시는 분들이 계셨다.

저렇게 저장할 경우 `ModuleNotFoundError` 가 발생한다.

colab의 ipynb를 .py 파일로 변환하려면 **.py 다운로드**를 해줘야 한다.

![10.png](/open-py-on-colab/10.png)

[사진8] .py 다운로드 하는 방법

위와 같이 **파일 > 다운로드 > .py 다운로드** 하면 .py 형식으로 파일이 저장되는 것을 확인할 수 있다.

![11.png](/open-py-on-colab/11.png)