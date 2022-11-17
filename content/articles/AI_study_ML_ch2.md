---
title : ML ch2 - 머신러닝 프로젝트 처음부터 끝까지
description : 부동산 회사에 막 고용된 데이터 과학자라고 가정하여 예제 프로젝트 진행
slug: AI_study_ML_ch2
category: Data-Science
author: Hyeokmin Kwon
---

# ch2 - 머신러닝 프로젝트 처음부터 끝까지

이제부터 나는 부동산 회사에 막 고용된 데이터 사이언티스트이다.  
내가 할 일은 '캘리포니아 인구조사 데이터'를 사용해 캘리포니아의 구역 별 중간 주택 가격 예측 모델을 만들어야 한다.

### 데이터가 담고있는 정보:
- 블록 그룹(block group, 혹은 구역)마다 인구(population)
- 중간 소득(median income)
- 중간 주택 가격(median housing price)
- etc...

## 크게 아래와 같이 진행 예정
1. 큰 그림 보기
2. 데이터 구하기
3. 데이터로부터 패턴을 파악하기 위해 탐색 및 시각화
4. 머신러닝 알고리즘을 위한 데이터 준비
5. 모델 선택 및 훈련
6. 모델 상세히 조정
7. 솔루션(문제 해결 방법) 제시
8. 시스템 런칭 및 모니터링, 유지 보수

# 문제 정의
문제를 정의하기 전, 설계를 위한 정보가 필요함
### '비즈니스의 목적이 정확히 무엇인가?'
- 해당 모델을 어떻게 사용해 이익을 얻으려고 하는가
- 문제 구성, 어떤 알고리즘 선택, 모델 평가에 어떤 성능 지표 사용할 지, 모델 튜닝 위해 얼마나 노력 투여할 지 결정 위해 중요한 질문

### '현재 문제 해결 방법은 어떻게 구성되어 있는가?'
- 머신러닝 모델이 사용되고 있지 않은 지금은 어떻게 문제를 해결하고 있는가 (참고용)
- ex) 현재 구역 별 중간 주택 가격 예측은 전문가가 수동으로 하고 있으며, 전문가의 추정 가격은 실제 주택 가격의 10% 정도가 벗어나는 문제가 있음.
 - 이는 구역의 데이터를 기반으로 중간 주택 가격을 예측하는 모델을 훈련시키는 쪽이 유용할 듯 함.
 
정보를 얻었으니 문제를 정의하여 설계를 해보자.  
우리가 만들 시스템은 어떤 학습 방법을 사용하게 될까?
- 지도 학습? 비지도 학습? 강화 학습?
- 분류 및 회귀? 기타 다른 방법?
- 배치 학습? 온라인 학습?

우리 예제에서는 '레이블'된 훈련 샘플이 존재(각 value 별 정답으로 '기대 출력값(구역의 중간 주택 가격)'을 가지고 있음)  
-> 따라서 '지도 학습'이 적합할 듯  
또한 정해진 정답(레이블) 내에서 새로운 값의 소속을 분류 하는 것이 아님. 새로운 값이 새로운 정답(타깃 수치)으로 예측 되어야 해.  
-> 따라서 '회귀'가 적합할 듯, 그런데 feature가 많으므로 '다변량 회귀'가 가장 적합할 듯  
시스템으로 들어오는 데이터에 연속적인 흐름이 없고 빠르게 변하는 데이터에 적응할 필요가 일단은 없음. 메모리도 작아  
-> '배치 학습'이 적절

# 성능 측정 지표 선택
흔히 Loss function이라 불리는 것으로 어떤 것을 선택하는지에 대한 문제이며, 여러 함수가 있으나 자세한 수학적인 설명은 일단 제외.  
Loss function(손실 함수)이란 훈련하면서 도출된 예측 값을 실제 값(레이블)과 비교할 때 사용하는 함수이며, 해당 함수 적용의 결과 값이 작을 수록 오차가 적은 것임.  
회귀 문제에서는 보통 '평균 제곱근 오차(Root Mean Square Error, RMSE)'를 사용하므로 해당 함수를 사용할 것임.  
  
$RMSE(X,h)=\sqrt{\frac{1}{m}\sum_{i=1}^{m}{(h(x^{(i)})-y^{(i)}})^2}$

# 이제 데이터를 구하여 가져와 보자


```python
# 파이썬 2와 파이썬 3 지원
from __future__ import division, print_function, unicode_literals

# 공통
import numpy as np
import os

# 일관된 출력을 위해 유사난수 초기화
np.random.seed(42)

# 맷플롯립 설정
%matplotlib inline
import matplotlib
import matplotlib.pyplot as plt
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12

# 한글출력
matplotlib.rc('font', family='NanumBarunGothic')
plt.rcParams['axes.unicode_minus'] = False

# 그림을 저장할 폴드
PROJECT_ROOT_DIR = "."
CHAPTER_ID = "end_to_end_project"
IMAGES_PATH = os.path.join(PROJECT_ROOT_DIR, "images", CHAPTER_ID)

def save_fig(fig_id, tight_layout=True, fig_extension="png", resolution=300):
    path = os.path.join(IMAGES_PATH, fig_id + "." + fig_extension)
    if tight_layout:
        plt.tight_layout()
    plt.savefig(path, format=fig_extension, dpi=resolution)
```


```python
import os
import tarfile
from six.moves import urllib

DOWNLOAD_ROOT = "https://raw.githubusercontent.com/ageron/handson-ml/master/"
HOUSING_PATH = os.path.join("datasets", "housing")
HOUSING_URL = DOWNLOAD_ROOT + "datasets/housing/housing.tgz"

def fetch_housing_data(housing_url=HOUSING_URL, housing_path=HOUSING_PATH):
    if not os.path.isdir(housing_path):
        os.makedirs(housing_path)
    tgz_path = os.path.join(housing_path, "housing.tgz")
    urllib.request.urlretrieve(housing_url, tgz_path)
    housing_tgz = tarfile.open(tgz_path)
    housing_tgz.extractall(path=housing_path)
    housing_tgz.close()
```


```python
fetch_housing_data()
```


```python
import pandas as pd

def load_housing_data(housing_path=HOUSING_PATH):
    csv_path = os.path.join(housing_path, "housing.csv")
    return pd.read_csv(csv_path)
```

데이터를 불러왔으니 데이터를 훑어보자


```python
housing = load_housing_data()
housing.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-122.23</td>
      <td>37.88</td>
      <td>41.0</td>
      <td>880.0</td>
      <td>129.0</td>
      <td>322.0</td>
      <td>126.0</td>
      <td>8.3252</td>
      <td>452600.0</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-122.22</td>
      <td>37.86</td>
      <td>21.0</td>
      <td>7099.0</td>
      <td>1106.0</td>
      <td>2401.0</td>
      <td>1138.0</td>
      <td>8.3014</td>
      <td>358500.0</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-122.24</td>
      <td>37.85</td>
      <td>52.0</td>
      <td>1467.0</td>
      <td>190.0</td>
      <td>496.0</td>
      <td>177.0</td>
      <td>7.2574</td>
      <td>352100.0</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-122.25</td>
      <td>37.85</td>
      <td>52.0</td>
      <td>1274.0</td>
      <td>235.0</td>
      <td>558.0</td>
      <td>219.0</td>
      <td>5.6431</td>
      <td>341300.0</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-122.25</td>
      <td>37.85</td>
      <td>52.0</td>
      <td>1627.0</td>
      <td>280.0</td>
      <td>565.0</td>
      <td>259.0</td>
      <td>3.8462</td>
      <td>342200.0</td>
      <td>NEAR BAY</td>
    </tr>
  </tbody>
</table>
</div>




```python
housing.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 20640 entries, 0 to 20639
    Data columns (total 10 columns):
     #   Column              Non-Null Count  Dtype  
    ---  ------              --------------  -----  
     0   longitude           20640 non-null  float64
     1   latitude            20640 non-null  float64
     2   housing_median_age  20640 non-null  float64
     3   total_rooms         20640 non-null  float64
     4   total_bedrooms      20433 non-null  float64
     5   population          20640 non-null  float64
     6   households          20640 non-null  float64
     7   median_income       20640 non-null  float64
     8   median_house_value  20640 non-null  float64
     9   ocean_proximity     20640 non-null  object 
    dtypes: float64(9), object(1)
    memory usage: 1.6+ MB



```python
housing["ocean_proximity"].value_counts()
```




    <1H OCEAN     9136
    INLAND        6551
    NEAR OCEAN    2658
    NEAR BAY      2290
    ISLAND           5
    Name: ocean_proximity, dtype: int64




```python
housing.describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20433.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
      <td>20640.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>-119.569704</td>
      <td>35.631861</td>
      <td>28.639486</td>
      <td>2635.763081</td>
      <td>537.870553</td>
      <td>1425.476744</td>
      <td>499.539680</td>
      <td>3.870671</td>
      <td>206855.816909</td>
    </tr>
    <tr>
      <th>std</th>
      <td>2.003532</td>
      <td>2.135952</td>
      <td>12.585558</td>
      <td>2181.615252</td>
      <td>421.385070</td>
      <td>1132.462122</td>
      <td>382.329753</td>
      <td>1.899822</td>
      <td>115395.615874</td>
    </tr>
    <tr>
      <th>min</th>
      <td>-124.350000</td>
      <td>32.540000</td>
      <td>1.000000</td>
      <td>2.000000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>1.000000</td>
      <td>0.499900</td>
      <td>14999.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>-121.800000</td>
      <td>33.930000</td>
      <td>18.000000</td>
      <td>1447.750000</td>
      <td>296.000000</td>
      <td>787.000000</td>
      <td>280.000000</td>
      <td>2.563400</td>
      <td>119600.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>-118.490000</td>
      <td>34.260000</td>
      <td>29.000000</td>
      <td>2127.000000</td>
      <td>435.000000</td>
      <td>1166.000000</td>
      <td>409.000000</td>
      <td>3.534800</td>
      <td>179700.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>-118.010000</td>
      <td>37.710000</td>
      <td>37.000000</td>
      <td>3148.000000</td>
      <td>647.000000</td>
      <td>1725.000000</td>
      <td>605.000000</td>
      <td>4.743250</td>
      <td>264725.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>-114.310000</td>
      <td>41.950000</td>
      <td>52.000000</td>
      <td>39320.000000</td>
      <td>6445.000000</td>
      <td>35682.000000</td>
      <td>6082.000000</td>
      <td>15.000100</td>
      <td>500001.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
%matplotlib inline
import matplotlib.pyplot as plt
housing.hist(bins=50, figsize=(20,15))
save_fig("attribute_histogram_plots")
plt.show()
```

    findfont: Font family ['NanumBarunGothic'] not found. Falling back to DejaVu Sans.



    ---------------------------------------------------------------------------

    


    
![attribute_histogram_plots](/AI_study_ML_ch2/output_13_2.png)
    



```python
# 일관된 출력을 위해 유사난수 초기화
np.random.seed(42)
```

# 테스트 데이터 셋 만들기
이전에 알아봤듯이 우리는 데이터셋이 크게 '훈련 데이터'와 '시험(테스트) 데이터'로 나뉜다는 것을 안다.  
전체 데이터셋에서 훈련 데이터로 사용하는 친구들은 정답(중간 소득)과 함께 하고, 시험 데이터로 사용하는 친구들은 정답을 제거하고 사용하게 된다.  
제거한 정답은 버리는게 아니라, 시험 데이터를 통해 예측된 값과 비교하여 오차를 계산하는데에 사용된다.


```python
import numpy as np

# 예시를 위해서 만든 것입니다. 사이킷런에는 train_test_split() 함수가 있습니다.
def split_train_test(data, test_ratio):
    shuffled_indices = np.random.permutation(len(data))
    test_set_size = int(len(data) * test_ratio)
    test_indices = shuffled_indices[:test_set_size]
    train_indices = shuffled_indices[test_set_size:]
    return data.iloc[train_indices], data.iloc[test_indices]
```


```python
train_set, test_set = split_train_test(housing, 0.2)
print(len(train_set), "train +", len(test_set), "test")
```

    16512 train + 4128 test



```python
from zlib import crc32

def test_set_check(identifier, test_ratio):
    return crc32(np.int64(identifier)) & 0xffffffff < test_ratio * 2**32

def split_train_test_by_id(data, test_ratio, id_column):
    ids = data[id_column]
    in_test_set = ids.apply(lambda id_: test_set_check(id_, test_ratio))
    return data.loc[~in_test_set], data.loc[in_test_set]
```


```python
import hashlib

def test_set_check(identifier, test_ratio, hash=hashlib.md5):
    return bytearray(hash(np.int64(identifier)).digest())[-1] < 256 * test_ratio
```


```python
# 이 버전의 test_set_check() 함수가 파이썬 2도 지원합니다.
def test_set_check(identifier, test_ratio, hash=hashlib.md5):
    return bytearray(hash(np.int64(identifier)).digest())[-1] < 256 * test_ratio
```


```python
housing_with_id = housing.reset_index()   # `index` 열이 추가된 데이터프레임이 반환됩니다.
train_set, test_set = split_train_test_by_id(housing_with_id, 0.2, "index")
```


```python
housing_with_id["id"] = housing["longitude"] * 1000 + housing["latitude"]
train_set, test_set = split_train_test_by_id(housing_with_id, 0.2, "id")
```


```python
test_set.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>index</th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
      <th>ocean_proximity</th>
      <th>id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>8</th>
      <td>8</td>
      <td>-122.26</td>
      <td>37.84</td>
      <td>42.0</td>
      <td>2555.0</td>
      <td>665.0</td>
      <td>1206.0</td>
      <td>595.0</td>
      <td>2.0804</td>
      <td>226700.0</td>
      <td>NEAR BAY</td>
      <td>-122222.16</td>
    </tr>
    <tr>
      <th>10</th>
      <td>10</td>
      <td>-122.26</td>
      <td>37.85</td>
      <td>52.0</td>
      <td>2202.0</td>
      <td>434.0</td>
      <td>910.0</td>
      <td>402.0</td>
      <td>3.2031</td>
      <td>281500.0</td>
      <td>NEAR BAY</td>
      <td>-122222.15</td>
    </tr>
    <tr>
      <th>11</th>
      <td>11</td>
      <td>-122.26</td>
      <td>37.85</td>
      <td>52.0</td>
      <td>3503.0</td>
      <td>752.0</td>
      <td>1504.0</td>
      <td>734.0</td>
      <td>3.2705</td>
      <td>241800.0</td>
      <td>NEAR BAY</td>
      <td>-122222.15</td>
    </tr>
    <tr>
      <th>12</th>
      <td>12</td>
      <td>-122.26</td>
      <td>37.85</td>
      <td>52.0</td>
      <td>2491.0</td>
      <td>474.0</td>
      <td>1098.0</td>
      <td>468.0</td>
      <td>3.0750</td>
      <td>213500.0</td>
      <td>NEAR BAY</td>
      <td>-122222.15</td>
    </tr>
    <tr>
      <th>13</th>
      <td>13</td>
      <td>-122.26</td>
      <td>37.84</td>
      <td>52.0</td>
      <td>696.0</td>
      <td>191.0</td>
      <td>345.0</td>
      <td>174.0</td>
      <td>2.6736</td>
      <td>191300.0</td>
      <td>NEAR BAY</td>
      <td>-122222.16</td>
    </tr>
  </tbody>
</table>
</div>




```python
housing["median_income"].hist()
```




    <AxesSubplot:>




    
![median_income](/AI_study_ML_ch2/output_24_1.png)
    



```python
# 소득 카테고리 개수를 제한하기 위해 1.5로 나눕니다.
housing["income_cat"] = np.ceil(housing["median_income"] / 1.5)
# 5 이상은 5로 레이블합니다.
housing["income_cat"].where(housing["income_cat"] < 5, 5.0, inplace=True)
```


```python
housing["income_cat"].value_counts()
```




    3.0    7236
    2.0    6581
    4.0    3639
    5.0    2362
    1.0     822
    Name: income_cat, dtype: int64




```python
housing["income_cat"].hist()
save_fig('income_category_hist')
```


    ---------------------------------------------------------------------------

    

    
![income_category_hist](/AI_study_ML_ch2/output_27_1.png)
    


사이킷런 모듈은 데이터셋을 훈련용, 시험용으로 나누는 다양한 방법을 제공한다고 함


```python
from sklearn.model_selection import StratifiedShuffleSplit

split = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
for train_index, test_index in split.split(housing, housing["income_cat"]):
    strat_train_set = housing.loc[train_index]
    strat_test_set = housing.loc[test_index]
```


```python
strat_test_set["income_cat"].value_counts() / len(strat_test_set)
```




    3.0    0.350533
    2.0    0.318798
    4.0    0.176357
    5.0    0.114341
    1.0    0.039971
    Name: income_cat, dtype: float64




```python
housing["income_cat"].value_counts() / len(housing)
```




    3.0    0.350581
    2.0    0.318847
    4.0    0.176308
    5.0    0.114438
    1.0    0.039826
    Name: income_cat, dtype: float64




```python
from sklearn.model_selection import train_test_split
def income_cat_proportions(data):
    return data["income_cat"].value_counts() / len(data)

train_set, test_set = train_test_split(housing, test_size=0.2, random_state=42)

compare_props = pd.DataFrame({
    "Overall": income_cat_proportions(housing),
    "Stratified": income_cat_proportions(strat_test_set),
    "Random": income_cat_proportions(test_set),
}).sort_index()
compare_props["Rand. %error"] = 100 * compare_props["Random"] / compare_props["Overall"] - 100
compare_props["Strat. %error"] = 100 * compare_props["Stratified"] / compare_props["Overall"] - 100
```


```python
compare_props
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Overall</th>
      <th>Stratified</th>
      <th>Random</th>
      <th>Rand. %error</th>
      <th>Strat. %error</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1.0</th>
      <td>0.039826</td>
      <td>0.039971</td>
      <td>0.040213</td>
      <td>0.973236</td>
      <td>0.364964</td>
    </tr>
    <tr>
      <th>2.0</th>
      <td>0.318847</td>
      <td>0.318798</td>
      <td>0.324370</td>
      <td>1.732260</td>
      <td>-0.015195</td>
    </tr>
    <tr>
      <th>3.0</th>
      <td>0.350581</td>
      <td>0.350533</td>
      <td>0.358527</td>
      <td>2.266446</td>
      <td>-0.013820</td>
    </tr>
    <tr>
      <th>4.0</th>
      <td>0.176308</td>
      <td>0.176357</td>
      <td>0.167393</td>
      <td>-5.056334</td>
      <td>0.027480</td>
    </tr>
    <tr>
      <th>5.0</th>
      <td>0.114438</td>
      <td>0.114341</td>
      <td>0.109496</td>
      <td>-4.318374</td>
      <td>-0.084674</td>
    </tr>
  </tbody>
</table>
</div>




```python
for set_ in (strat_train_set, strat_test_set):
    set_.drop("income_cat", axis=1, inplace=True)
```

# 데이터 이해를 위한 탐색과 시각화
데이터를 시각적으로 보고 패턴을 대략적으로 분석해보자


```python
housing = strat_train_set.copy()
```


```python
ax = housing.plot(kind="scatter", x="longitude", y="latitude")
ax.set(xlabel='경도', ylabel='위도')
save_fig("bad_visualization_plot")
```

    


    
![bad_visualization_plot](/AI_study_ML_ch2/output_37_3.png)
    



```python
# 밀집된 지역을 보다 잘 보여주는 산점도
ax = housing.plot(kind="scatter", x="longitude", y="latitude", alpha=0.1)
ax.set(xlabel='경도', ylabel='위도')
save_fig("better_visualization_plot")
```

    


    
![better_visualization_plot](/AI_study_ML_ch2/output_38_2.png)
    



```python
# 낮은 가격: 파란색 -> 높은 가격: 빨간색
ax = housing.plot(kind="scatter", x="longitude", y="latitude", alpha=0.4,
    s=housing["population"]/100, label="인구", figsize=(10,7),
    c="median_house_value", cmap=plt.get_cmap("jet"), colorbar=True,
    sharex=False)
ax.set(xlabel='경도', ylabel='위도')
plt.legend()
save_fig("housing_prices_scatterplot")
```

    


    
![housing_prices_scatterplot](/AI_study_ML_ch2/output_39_2.png)
    


# 상관관계 조사


```python
corr_matrix = housing.corr()
```


```python
corr_matrix["median_house_value"].sort_values(ascending=False)
```




    median_house_value    1.000000
    median_income         0.687151
    total_rooms           0.135140
    housing_median_age    0.114146
    households            0.064590
    total_bedrooms        0.047781
    population           -0.026882
    longitude            -0.047466
    latitude             -0.142673
    Name: median_house_value, dtype: float64




```python
from pandas.plotting import scatter_matrix

attributes = ["median_house_value", "median_income", "total_rooms",
              "housing_median_age"]
scatter_matrix(housing[attributes], figsize=(12, 8))
save_fig("scatter_matrix_plot")
```

    

    
![scatter_matrix_plot](/AI_study_ML_ch2/output_43_2.png)
    



```python
housing.plot(kind="scatter", x="median_income", y="median_house_value",
             alpha=0.1)
plt.axis([0, 16, 0, 550000])
save_fig("income_vs_house_value_scatterplot")
```


    ---------------------------------------------------------------------------

  



    
![income_vs_house_value_scatterplot](/AI_study_ML_ch2/output_44_1.png)
    



```python
housing["rooms_per_household"] = housing["total_rooms"]/housing["households"]
housing["bedrooms_per_room"] = housing["total_bedrooms"]/housing["total_rooms"]
housing["population_per_household"]=housing["population"]/housing["households"]
```


```python
corr_matrix = housing.corr()
corr_matrix["median_house_value"].sort_values(ascending=False)
```




    median_house_value          1.000000
    median_income               0.687151
    rooms_per_household         0.146255
    total_rooms                 0.135140
    housing_median_age          0.114146
    households                  0.064590
    total_bedrooms              0.047781
    population_per_household   -0.021991
    population                 -0.026882
    longitude                  -0.047466
    latitude                   -0.142673
    bedrooms_per_room          -0.259952
    Name: median_house_value, dtype: float64




```python
housing.plot(kind="scatter", x="rooms_per_household", y="median_house_value",
             alpha=0.2)
plt.axis([0, 5, 0, 520000])
plt.show()
```


    
![scatter_x_rooms_per_household_y_median_house_value](/AI_study_ML_ch2/output_47_0.png)
    



```python
housing.describe()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>median_house_value</th>
      <th>rooms_per_household</th>
      <th>bedrooms_per_room</th>
      <th>population_per_household</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>16512.000000</td>
      <td>16512.000000</td>
      <td>16512.000000</td>
      <td>16512.000000</td>
      <td>16354.000000</td>
      <td>16512.000000</td>
      <td>16512.000000</td>
      <td>16512.000000</td>
      <td>16512.000000</td>
      <td>16512.000000</td>
      <td>16354.000000</td>
      <td>16512.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>-119.575635</td>
      <td>35.639314</td>
      <td>28.653404</td>
      <td>2622.539789</td>
      <td>534.914639</td>
      <td>1419.687379</td>
      <td>497.011810</td>
      <td>3.875884</td>
      <td>207005.322372</td>
      <td>5.440406</td>
      <td>0.212873</td>
      <td>3.096469</td>
    </tr>
    <tr>
      <th>std</th>
      <td>2.001828</td>
      <td>2.137963</td>
      <td>12.574819</td>
      <td>2138.417080</td>
      <td>412.665649</td>
      <td>1115.663036</td>
      <td>375.696156</td>
      <td>1.904931</td>
      <td>115701.297250</td>
      <td>2.611696</td>
      <td>0.057378</td>
      <td>11.584825</td>
    </tr>
    <tr>
      <th>min</th>
      <td>-124.350000</td>
      <td>32.540000</td>
      <td>1.000000</td>
      <td>6.000000</td>
      <td>2.000000</td>
      <td>3.000000</td>
      <td>2.000000</td>
      <td>0.499900</td>
      <td>14999.000000</td>
      <td>1.130435</td>
      <td>0.100000</td>
      <td>0.692308</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>-121.800000</td>
      <td>33.940000</td>
      <td>18.000000</td>
      <td>1443.000000</td>
      <td>295.000000</td>
      <td>784.000000</td>
      <td>279.000000</td>
      <td>2.566950</td>
      <td>119800.000000</td>
      <td>4.442168</td>
      <td>0.175304</td>
      <td>2.431352</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>-118.510000</td>
      <td>34.260000</td>
      <td>29.000000</td>
      <td>2119.000000</td>
      <td>433.000000</td>
      <td>1164.000000</td>
      <td>408.000000</td>
      <td>3.541550</td>
      <td>179500.000000</td>
      <td>5.232342</td>
      <td>0.203027</td>
      <td>2.817661</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>-118.010000</td>
      <td>37.720000</td>
      <td>37.000000</td>
      <td>3141.000000</td>
      <td>644.000000</td>
      <td>1719.000000</td>
      <td>602.000000</td>
      <td>4.745325</td>
      <td>263900.000000</td>
      <td>6.056361</td>
      <td>0.239816</td>
      <td>3.281420</td>
    </tr>
    <tr>
      <th>max</th>
      <td>-114.310000</td>
      <td>41.950000</td>
      <td>52.000000</td>
      <td>39320.000000</td>
      <td>6210.000000</td>
      <td>35682.000000</td>
      <td>5358.000000</td>
      <td>15.000100</td>
      <td>500001.000000</td>
      <td>141.909091</td>
      <td>1.000000</td>
      <td>1243.333333</td>
    </tr>
  </tbody>
</table>
</div>



# 머신러닝 알고리즘을 위한 데이터 준비
흔히 데이터 전처리(pre-processing)이라고 하는 과정.  
이전에 쓰레기 값을 넣으면 쓰레기 결과가 나온다는 비유를 한 적이 있으며, 쓰레기 값을 쓸모 있는 값으로 바꾸기 위한 과정임.  

## 데이터 정제
전체 데이터에서 일부 데이터의 경우 어떤 특성(feature)에 대한 값이 누락되는 경우가 있다. 이 때 아래와 같은 행동을 취할 수 있는데, 이는 상황 by 상황으로 취하면 된다.  
- 해당 데이터(row)를 아예 삭제하기
- 누락된 값이 있는 특성(feature, column)을 아예 삭제하기
- 어떤 값으로 채우기(0, 평균, 중간값 등)


```python
housing = strat_train_set.drop("median_house_value", axis=1) # 훈련 세트를 위해 레이블 삭제
housing_labels = strat_train_set["median_house_value"].copy()
```


```python
sample_incomplete_rows = housing[housing.isnull().any(axis=1)].head()
sample_incomplete_rows
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1606</th>
      <td>-122.08</td>
      <td>37.88</td>
      <td>26.0</td>
      <td>2947.0</td>
      <td>NaN</td>
      <td>825.0</td>
      <td>626.0</td>
      <td>2.9330</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>10915</th>
      <td>-117.87</td>
      <td>33.73</td>
      <td>45.0</td>
      <td>2264.0</td>
      <td>NaN</td>
      <td>1970.0</td>
      <td>499.0</td>
      <td>3.4193</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>19150</th>
      <td>-122.70</td>
      <td>38.35</td>
      <td>14.0</td>
      <td>2313.0</td>
      <td>NaN</td>
      <td>954.0</td>
      <td>397.0</td>
      <td>3.7813</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>4186</th>
      <td>-118.23</td>
      <td>34.13</td>
      <td>48.0</td>
      <td>1308.0</td>
      <td>NaN</td>
      <td>835.0</td>
      <td>294.0</td>
      <td>4.2891</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>16885</th>
      <td>-122.40</td>
      <td>37.58</td>
      <td>26.0</td>
      <td>3281.0</td>
      <td>NaN</td>
      <td>1145.0</td>
      <td>480.0</td>
      <td>6.3580</td>
      <td>NEAR OCEAN</td>
    </tr>
  </tbody>
</table>
</div>




```python
sample_incomplete_rows.dropna(subset=["total_bedrooms"])    # 옵션 1
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</div>




```python
sample_incomplete_rows.drop("total_bedrooms", axis=1)       # 옵션 2
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1606</th>
      <td>-122.08</td>
      <td>37.88</td>
      <td>26.0</td>
      <td>2947.0</td>
      <td>825.0</td>
      <td>626.0</td>
      <td>2.9330</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>10915</th>
      <td>-117.87</td>
      <td>33.73</td>
      <td>45.0</td>
      <td>2264.0</td>
      <td>1970.0</td>
      <td>499.0</td>
      <td>3.4193</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>19150</th>
      <td>-122.70</td>
      <td>38.35</td>
      <td>14.0</td>
      <td>2313.0</td>
      <td>954.0</td>
      <td>397.0</td>
      <td>3.7813</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>4186</th>
      <td>-118.23</td>
      <td>34.13</td>
      <td>48.0</td>
      <td>1308.0</td>
      <td>835.0</td>
      <td>294.0</td>
      <td>4.2891</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>16885</th>
      <td>-122.40</td>
      <td>37.58</td>
      <td>26.0</td>
      <td>3281.0</td>
      <td>1145.0</td>
      <td>480.0</td>
      <td>6.3580</td>
      <td>NEAR OCEAN</td>
    </tr>
  </tbody>
</table>
</div>




```python
median = housing["total_bedrooms"].median()
sample_incomplete_rows["total_bedrooms"].fillna(median, inplace=True) # 옵션 3
sample_incomplete_rows
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>ocean_proximity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1606</th>
      <td>-122.08</td>
      <td>37.88</td>
      <td>26.0</td>
      <td>2947.0</td>
      <td>433.0</td>
      <td>825.0</td>
      <td>626.0</td>
      <td>2.9330</td>
      <td>NEAR BAY</td>
    </tr>
    <tr>
      <th>10915</th>
      <td>-117.87</td>
      <td>33.73</td>
      <td>45.0</td>
      <td>2264.0</td>
      <td>433.0</td>
      <td>1970.0</td>
      <td>499.0</td>
      <td>3.4193</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>19150</th>
      <td>-122.70</td>
      <td>38.35</td>
      <td>14.0</td>
      <td>2313.0</td>
      <td>433.0</td>
      <td>954.0</td>
      <td>397.0</td>
      <td>3.7813</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>4186</th>
      <td>-118.23</td>
      <td>34.13</td>
      <td>48.0</td>
      <td>1308.0</td>
      <td>433.0</td>
      <td>835.0</td>
      <td>294.0</td>
      <td>4.2891</td>
      <td>&lt;1H OCEAN</td>
    </tr>
    <tr>
      <th>16885</th>
      <td>-122.40</td>
      <td>37.58</td>
      <td>26.0</td>
      <td>3281.0</td>
      <td>433.0</td>
      <td>1145.0</td>
      <td>480.0</td>
      <td>6.3580</td>
      <td>NEAR OCEAN</td>
    </tr>
  </tbody>
</table>
</div>




```python
#from sklearn.preprocessing import Imputer
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(strategy="median")
```


```python
housing_num = housing.drop('ocean_proximity', axis=1)
# 다른 방법: housing_num = housing.select_dtypes(include=[np.number])
```


```python
imputer.fit(housing_num)
```




    SimpleImputer(strategy='median')




```python
imputer.statistics_
```




    array([-118.51   ,   34.26   ,   29.     , 2119.     ,  433.     ,
           1164.     ,  408.     ,    3.54155])




```python
housing_num.median().values
```




    array([-118.51   ,   34.26   ,   29.     , 2119.     ,  433.     ,
           1164.     ,  408.     ,    3.54155])




```python
X = imputer.transform(housing_num)
```


```python
housing_tr = pd.DataFrame(X, columns=housing_num.columns,
                          index = list(housing.index.values))
```


```python
housing_tr.loc[sample_incomplete_rows.index.values]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1606</th>
      <td>-122.08</td>
      <td>37.88</td>
      <td>26.0</td>
      <td>2947.0</td>
      <td>433.0</td>
      <td>825.0</td>
      <td>626.0</td>
      <td>2.9330</td>
    </tr>
    <tr>
      <th>10915</th>
      <td>-117.87</td>
      <td>33.73</td>
      <td>45.0</td>
      <td>2264.0</td>
      <td>433.0</td>
      <td>1970.0</td>
      <td>499.0</td>
      <td>3.4193</td>
    </tr>
    <tr>
      <th>19150</th>
      <td>-122.70</td>
      <td>38.35</td>
      <td>14.0</td>
      <td>2313.0</td>
      <td>433.0</td>
      <td>954.0</td>
      <td>397.0</td>
      <td>3.7813</td>
    </tr>
    <tr>
      <th>4186</th>
      <td>-118.23</td>
      <td>34.13</td>
      <td>48.0</td>
      <td>1308.0</td>
      <td>433.0</td>
      <td>835.0</td>
      <td>294.0</td>
      <td>4.2891</td>
    </tr>
    <tr>
      <th>16885</th>
      <td>-122.40</td>
      <td>37.58</td>
      <td>26.0</td>
      <td>3281.0</td>
      <td>433.0</td>
      <td>1145.0</td>
      <td>480.0</td>
      <td>6.3580</td>
    </tr>
  </tbody>
</table>
</div>




```python
imputer.strategy
```




    'median'




```python
housing_tr = pd.DataFrame(X, columns=housing_num.columns)
housing_tr.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-121.46</td>
      <td>38.52</td>
      <td>29.0</td>
      <td>3873.0</td>
      <td>797.0</td>
      <td>2237.0</td>
      <td>706.0</td>
      <td>2.1736</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-117.23</td>
      <td>33.09</td>
      <td>7.0</td>
      <td>5320.0</td>
      <td>855.0</td>
      <td>2015.0</td>
      <td>768.0</td>
      <td>6.3373</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-119.04</td>
      <td>35.37</td>
      <td>44.0</td>
      <td>1618.0</td>
      <td>310.0</td>
      <td>667.0</td>
      <td>300.0</td>
      <td>2.8750</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-117.13</td>
      <td>32.75</td>
      <td>24.0</td>
      <td>1877.0</td>
      <td>519.0</td>
      <td>898.0</td>
      <td>483.0</td>
      <td>2.2264</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-118.70</td>
      <td>34.28</td>
      <td>27.0</td>
      <td>3536.0</td>
      <td>646.0</td>
      <td>1837.0</td>
      <td>580.0</td>
      <td>4.4964</td>
    </tr>
  </tbody>
</table>
</div>



## 텍스트와 범주형 특성 다루기
앞선 범주형 특성 ocean_proximity는 텍스트라 중간값을 계산할 수가 없었다.  
텍스트가 값인 경우, 해당 값을 텍스트에서 숫자로 바꿔주는 것이 일반적이다. (mapping)


```python
housing_cat = housing['ocean_proximity']
housing_cat.head(10)
```




    12655        INLAND
    15502    NEAR OCEAN
    2908         INLAND
    14053    NEAR OCEAN
    20496     <1H OCEAN
    1481       NEAR BAY
    18125     <1H OCEAN
    5830      <1H OCEAN
    17989     <1H OCEAN
    4861      <1H OCEAN
    Name: ocean_proximity, dtype: object




```python
housing_cat_encoded, housing_categories = housing_cat.factorize()
housing_cat_encoded[:10]
```




    array([0, 1, 0, 1, 2, 3, 2, 2, 2, 2])




```python
housing_categories
```




    Index(['INLAND', 'NEAR OCEAN', '<1H OCEAN', 'NEAR BAY', 'ISLAND'], dtype='object')




```python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(categories='auto')
housing_cat_1hot = encoder.fit_transform(housing_cat_encoded.reshape(-1,1))
housing_cat_1hot
```




    <16512x5 sparse matrix of type '<class 'numpy.float64'>'
    	with 16512 stored elements in Compressed Sparse Row format>




```python
housing_cat_1hot.toarray()
```




    array([[1., 0., 0., 0., 0.],
           [0., 1., 0., 0., 0.],
           [1., 0., 0., 0., 0.],
           ...,
           [0., 0., 1., 0., 0.],
           [0., 0., 1., 0., 0.],
           [1., 0., 0., 0., 0.]])




```python
# [PR #9151](https://github.com/scikit-learn/scikit-learn/pull/9151)에서 가져온 CategoricalEncoder 클래스의 정의.
# 이 클래스는 사이킷런 0.20에 포함될 예정입니다.

from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.utils import check_array
from sklearn.preprocessing import LabelEncoder
from scipy import sparse

class CategoricalEncoder(BaseEstimator, TransformerMixin):
    """Encode categorical features as a numeric array.
    The input to this transformer should be a matrix of integers or strings,
    denoting the values taken on by categorical (discrete) features.
    The features can be encoded using a one-hot aka one-of-K scheme
    (``encoding='onehot'``, the default) or converted to ordinal integers
    (``encoding='ordinal'``).
    This encoding is needed for feeding categorical data to many scikit-learn
    estimators, notably linear models and SVMs with the standard kernels.
    Read more in the :ref:`User Guide `.
    Parameters
    ----------
    encoding : str, 'onehot', 'onehot-dense' or 'ordinal'
        The type of encoding to use (default is 'onehot'):
        - 'onehot': encode the features using a one-hot aka one-of-K scheme
          (or also called 'dummy' encoding). This creates a binary column for
          each category and returns a sparse matrix.
        - 'onehot-dense': the same as 'onehot' but returns a dense array
          instead of a sparse matrix.
        - 'ordinal': encode the features as ordinal integers. This results in
          a single column of integers (0 to n_categories - 1) per feature.
    categories : 'auto' or a list of lists/arrays of values.
        Categories (unique values) per feature:
        - 'auto' : Determine categories automatically from the training data.
        - list : ``categories[i]`` holds the categories expected in the ith
          column. The passed categories are sorted before encoding the data
          (used categories can be found in the ``categories_`` attribute).
    dtype : number type, default np.float64
        Desired dtype of output.
    handle_unknown : 'error' (default) or 'ignore'
        Whether to raise an error or ignore if a unknown categorical feature is
        present during transform (default is to raise). When this is parameter
        is set to 'ignore' and an unknown category is encountered during
        transform, the resulting one-hot encoded columns for this feature
        will be all zeros.
        Ignoring unknown categories is not supported for
        ``encoding='ordinal'``.
    Attributes
    ----------
    categories_ : list of arrays
        The categories of each feature determined during fitting. When
        categories were specified manually, this holds the sorted categories
        (in order corresponding with output of `transform`).
    Examples
    --------
    Given a dataset with three features and two samples, we let the encoder
    find the maximum value per feature and transform the data to a binary
    one-hot encoding.
    >>> from sklearn.preprocessing import CategoricalEncoder
    >>> enc = CategoricalEncoder(handle_unknown='ignore')
    >>> enc.fit([[0, 0, 3], [1, 1, 0], [0, 2, 1], [1, 0, 2]])
    ... # doctest: +ELLIPSIS
    CategoricalEncoder(categories='auto', dtype=<... 'numpy.float64'>,
              encoding='onehot', handle_unknown='ignore')
    >>> enc.transform([[0, 1, 1], [1, 0, 4]]).toarray()
    array([[ 1.,  0.,  0.,  1.,  0.,  0.,  1.,  0.,  0.],
           [ 0.,  1.,  1.,  0.,  0.,  0.,  0.,  0.,  0.]])
    See also
    --------
    sklearn.preprocessing.OneHotEncoder : performs a one-hot encoding of
      integer ordinal features. The ``OneHotEncoder assumes`` that input
      features take on values in the range ``[0, max(feature)]`` instead of
      using the unique values.
    sklearn.feature_extraction.DictVectorizer : performs a one-hot encoding of
      dictionary items (also handles string-valued features).
    sklearn.feature_extraction.FeatureHasher : performs an approximate one-hot
      encoding of dictionary items or strings.
    """

    def __init__(self, encoding='onehot', categories='auto', dtype=np.float64,
                 handle_unknown='error'):
        self.encoding = encoding
        self.categories = categories
        self.dtype = dtype
        self.handle_unknown = handle_unknown

    def fit(self, X, y=None):
        """Fit the CategoricalEncoder to X.
        Parameters
        ----------
        X : array-like, shape [n_samples, n_feature]
            The data to determine the categories of each feature.
        Returns
        -------
        self
        """

        if self.encoding not in ['onehot', 'onehot-dense', 'ordinal']:
            template = ("encoding should be either 'onehot', 'onehot-dense' "
                        "or 'ordinal', got %s")
            raise ValueError(template % self.handle_unknown)

        if self.handle_unknown not in ['error', 'ignore']:
            template = ("handle_unknown should be either 'error' or "
                        "'ignore', got %s")
            raise ValueError(template % self.handle_unknown)

        if self.encoding == 'ordinal' and self.handle_unknown == 'ignore':
            raise ValueError("handle_unknown='ignore' is not supported for"
                             " encoding='ordinal'")

        X = check_array(X, dtype=np.object, accept_sparse='csc', copy=True)
        n_samples, n_features = X.shape

        self._label_encoders_ = [LabelEncoder() for _ in range(n_features)]

        for i in range(n_features):
            le = self._label_encoders_[i]
            Xi = X[:, i]
            if self.categories == 'auto':
                le.fit(Xi)
            else:
                valid_mask = np.in1d(Xi, self.categories[i])
                if not np.all(valid_mask):
                    if self.handle_unknown == 'error':
                        diff = np.unique(Xi[~valid_mask])
                        msg = ("Found unknown categories {0} in column {1}"
                               " during fit".format(diff, i))
                        raise ValueError(msg)
                le.classes_ = np.array(np.sort(self.categories[i]))

        self.categories_ = [le.classes_ for le in self._label_encoders_]

        return self

    def transform(self, X):
        """Transform X using one-hot encoding.
        Parameters
        ----------
        X : array-like, shape [n_samples, n_features]
            The data to encode.
        Returns
        -------
        X_out : sparse matrix or a 2-d array
            Transformed input.
        """
        X = check_array(X, accept_sparse='csc', dtype=np.object, copy=True)
        n_samples, n_features = X.shape
        X_int = np.zeros_like(X, dtype=np.int)
        X_mask = np.ones_like(X, dtype=np.bool)

        for i in range(n_features):
            valid_mask = np.in1d(X[:, i], self.categories_[i])

            if not np.all(valid_mask):
                if self.handle_unknown == 'error':
                    diff = np.unique(X[~valid_mask, i])
                    msg = ("Found unknown categories {0} in column {1}"
                           " during transform".format(diff, i))
                    raise ValueError(msg)
                else:
                    # Set the problematic rows to an acceptable value and
                    # continue `The rows are marked `X_mask` and will be
                    # removed later.
                    X_mask[:, i] = valid_mask
                    X[:, i][~valid_mask] = self.categories_[i][0]
            X_int[:, i] = self._label_encoders_[i].transform(X[:, i])

        if self.encoding == 'ordinal':
            return X_int.astype(self.dtype, copy=False)

        mask = X_mask.ravel()
        n_values = [cats.shape[0] for cats in self.categories_]
        n_values = np.array([0] + n_values)
        indices = np.cumsum(n_values)

        column_indices = (X_int + indices[:-1]).ravel()[mask]
        row_indices = np.repeat(np.arange(n_samples, dtype=np.int32),
                                n_features)[mask]
        data = np.ones(n_samples * n_features)[mask]

        out = sparse.csc_matrix((data, (row_indices, column_indices)),
                                shape=(n_samples, indices[-1]),
                                dtype=self.dtype).tocsr()
        if self.encoding == 'onehot-dense':
            return out.toarray()
        else:
            return out
```


```python
#from sklearn.preprocessing import CategoricalEncoder # Scikit-Learn 0.20에서 추가 예정

cat_encoder = CategoricalEncoder()
housing_cat_reshaped = housing_cat.values.reshape(-1, 1)
housing_cat_1hot = cat_encoder.fit_transform(housing_cat_reshaped)
housing_cat_1hot
```

    /var/folders/gp/1ws0mt1s6vzgjlh2w0hm8wvm0000gn/T/ipykernel_37589/4276530552.py:110: DeprecationWarning: `np.object` is a deprecated alias for the builtin `object`. To silence this warning, use `object` by itself. Doing this will not modify any behavior and is safe. 
    Deprecated in NumPy 1.20; for more details and guidance: https://numpy.org/devdocs/release/1.20.0-notes.html#deprecations
      X = check_array(X, dtype=np.object, accept_sparse='csc', copy=True)
    /var/folders/gp/1ws0mt1s6vzgjlh2w0hm8wvm0000gn/T/ipykernel_37589/4276530552.py:145: DeprecationWarning: `np.object` is a deprecated alias for the builtin `object`. To silence this warning, use `object` by itself. Doing this will not modify any behavior and is safe. 
    Deprecated in NumPy 1.20; for more details and guidance: https://numpy.org/devdocs/release/1.20.0-notes.html#deprecations
      X = check_array(X, accept_sparse='csc', dtype=np.object, copy=True)
    /var/folders/gp/1ws0mt1s6vzgjlh2w0hm8wvm0000gn/T/ipykernel_37589/4276530552.py:147: DeprecationWarning: `np.int` is a deprecated alias for the builtin `int`. To silence this warning, use `int` by itself. Doing this will not modify any behavior and is safe. When replacing `np.int`, you may wish to use e.g. `np.int64` or `np.int32` to specify the precision. If you wish to review your current use, check the release note link for additional information.
    Deprecated in NumPy 1.20; for more details and guidance: https://numpy.org/devdocs/release/1.20.0-notes.html#deprecations
      X_int = np.zeros_like(X, dtype=np.int)
    /var/folders/gp/1ws0mt1s6vzgjlh2w0hm8wvm0000gn/T/ipykernel_37589/4276530552.py:148: DeprecationWarning: `np.bool` is a deprecated alias for the builtin `bool`. To silence this warning, use `bool` by itself. Doing this will not modify any behavior and is safe. If you specifically wanted the numpy scalar type, use `np.bool_` here.
    Deprecated in NumPy 1.20; for more details and guidance: https://numpy.org/devdocs/release/1.20.0-notes.html#deprecations
      X_mask = np.ones_like(X, dtype=np.bool)





    <16512x5 sparse matrix of type '<class 'numpy.float64'>'
    	with 16512 stored elements in Compressed Sparse Row format>




```python
from sklearn.preprocessing import OneHotEncoder

cat_encoder = OneHotEncoder(categories='auto')
housing_cat_reshaped = housing_cat.values.reshape(-1, 1)
housing_cat_1hot = cat_encoder.fit_transform(housing_cat_reshaped)
housing_cat_1hot
```




    <16512x5 sparse matrix of type '<class 'numpy.float64'>'
    	with 16512 stored elements in Compressed Sparse Row format>




```python
housing_cat_1hot.toarray()
```




    array([[0., 1., 0., 0., 0.],
           [0., 0., 0., 0., 1.],
           [0., 1., 0., 0., 0.],
           ...,
           [1., 0., 0., 0., 0.],
           [1., 0., 0., 0., 0.],
           [0., 1., 0., 0., 0.]])




```python
# cat_encoder = CategoricalEncoder(encoding="onehot-dense")
cat_encoder = OneHotEncoder(categories='auto', sparse=False)
housing_cat_1hot = cat_encoder.fit_transform(housing_cat_reshaped)
housing_cat_1hot
```




    array([[0., 1., 0., 0., 0.],
           [0., 0., 0., 0., 1.],
           [0., 1., 0., 0., 0.],
           ...,
           [1., 0., 0., 0., 0.],
           [1., 0., 0., 0., 0.],
           [0., 1., 0., 0., 0.]])




```python
cat_encoder.categories_
```




    [array(['<1H OCEAN', 'INLAND', 'ISLAND', 'NEAR BAY', 'NEAR OCEAN'],
           dtype=object)]



## 나만의 변환기
사이킷런이 제공하는 전처리 작업도 좋은게 많긴 한데, 내 프로젝트 목적에 맞는 자신만의 변환기(전처리기)를 만들 필요가 있을 수도 있음.


```python
from sklearn.base import BaseEstimator, TransformerMixin

# 컬럼 인덱스
rooms_ix, bedrooms_ix, population_ix, household_ix = 3, 4, 5, 6

class CombinedAttributesAdder(BaseEstimator, TransformerMixin):
    def __init__(self, add_bedrooms_per_room = True): # no *args or **kargs
        self.add_bedrooms_per_room = add_bedrooms_per_room
    def fit(self, X, y=None):
        return self  # nothing else to do
    def transform(self, X, y=None):
        rooms_per_household = X[:, rooms_ix] / X[:, household_ix]
        population_per_household = X[:, population_ix] / X[:, household_ix]
        if self.add_bedrooms_per_room:
            bedrooms_per_room = X[:, bedrooms_ix] / X[:, rooms_ix]
            return np.c_[X, rooms_per_household, population_per_household,
                         bedrooms_per_room]
        else:
            return np.c_[X, rooms_per_household, population_per_household]

attr_adder = CombinedAttributesAdder(add_bedrooms_per_room=False)
housing_extra_attribs = attr_adder.transform(housing.values)
```


```python
housing_extra_attribs = pd.DataFrame(
    housing_extra_attribs, 
    columns=list(housing.columns)+["rooms_per_household", "population_per_household"])
housing_extra_attribs.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>longitude</th>
      <th>latitude</th>
      <th>housing_median_age</th>
      <th>total_rooms</th>
      <th>total_bedrooms</th>
      <th>population</th>
      <th>households</th>
      <th>median_income</th>
      <th>ocean_proximity</th>
      <th>rooms_per_household</th>
      <th>population_per_household</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-121.46</td>
      <td>38.52</td>
      <td>29.0</td>
      <td>3873.0</td>
      <td>797.0</td>
      <td>2237.0</td>
      <td>706.0</td>
      <td>2.1736</td>
      <td>INLAND</td>
      <td>5.485836</td>
      <td>3.168555</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-117.23</td>
      <td>33.09</td>
      <td>7.0</td>
      <td>5320.0</td>
      <td>855.0</td>
      <td>2015.0</td>
      <td>768.0</td>
      <td>6.3373</td>
      <td>NEAR OCEAN</td>
      <td>6.927083</td>
      <td>2.623698</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-119.04</td>
      <td>35.37</td>
      <td>44.0</td>
      <td>1618.0</td>
      <td>310.0</td>
      <td>667.0</td>
      <td>300.0</td>
      <td>2.875</td>
      <td>INLAND</td>
      <td>5.393333</td>
      <td>2.223333</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-117.13</td>
      <td>32.75</td>
      <td>24.0</td>
      <td>1877.0</td>
      <td>519.0</td>
      <td>898.0</td>
      <td>483.0</td>
      <td>2.2264</td>
      <td>NEAR OCEAN</td>
      <td>3.886128</td>
      <td>1.859213</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-118.7</td>
      <td>34.28</td>
      <td>27.0</td>
      <td>3536.0</td>
      <td>646.0</td>
      <td>1837.0</td>
      <td>580.0</td>
      <td>4.4964</td>
      <td>&lt;1H OCEAN</td>
      <td>6.096552</td>
      <td>3.167241</td>
    </tr>
  </tbody>
</table>
</div>



## 변환 파이프라인
변환의 단계가 많으면 정확한 순서대로 실행되어야 하는데, 사이킷런에서는 연속된 변환을 순서대로 처리할 수 있도록 도와주는 Pipeline 클래스가 있음.


```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

num_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy="median")),
        ('attribs_adder', CombinedAttributesAdder()),
        ('std_scaler', StandardScaler()),
    ])

housing_num_tr = num_pipeline.fit_transform(housing_num)
```


```python
housing_num_tr
```




    array([[-0.94135046,  1.34743822,  0.02756357, ...,  0.01739526,
             0.00622264, -0.12112176],
           [ 1.17178212, -1.19243966, -1.72201763, ...,  0.56925554,
            -0.04081077, -0.81086696],
           [ 0.26758118, -0.1259716 ,  1.22045984, ..., -0.01802432,
            -0.07537122, -0.33827252],
           ...,
           [-1.5707942 ,  1.31001828,  1.53856552, ..., -0.5092404 ,
            -0.03743619,  0.32286937],
           [-1.56080303,  1.2492109 , -1.1653327 , ...,  0.32814891,
            -0.05915604, -0.45702273],
           [-1.28105026,  2.02567448, -0.13148926, ...,  0.01407228,
             0.00657083, -0.12169672]])




```python
# from future_encoders import ColumnTransformer
from sklearn.compose import ColumnTransformer

num_attribs = list(housing_num)
cat_attribs = ["ocean_proximity"]

full_pipeline = ColumnTransformer([
        ("num", num_pipeline, num_attribs),
        ("cat", OneHotEncoder(categories='auto'), cat_attribs),
    ])

housing_prepared = full_pipeline.fit_transform(housing)
housing_prepared
```




    array([[-0.94135046,  1.34743822,  0.02756357, ...,  0.        ,
             0.        ,  0.        ],
           [ 1.17178212, -1.19243966, -1.72201763, ...,  0.        ,
             0.        ,  1.        ],
           [ 0.26758118, -0.1259716 ,  1.22045984, ...,  0.        ,
             0.        ,  0.        ],
           ...,
           [-1.5707942 ,  1.31001828,  1.53856552, ...,  0.        ,
             0.        ,  0.        ],
           [-1.56080303,  1.2492109 , -1.1653327 , ...,  0.        ,
             0.        ,  0.        ],
           [-1.28105026,  2.02567448, -0.13148926, ...,  0.        ,
             0.        ,  0.        ]])




```python
from sklearn.base import BaseEstimator, TransformerMixin

# 사이킷런이 DataFrame을 바로 사용하지 못하므로
# 수치형이나 범주형 컬럼을 선택하는 클래스를 만듭니다.
class DataFrameSelector(BaseEstimator, TransformerMixin):
    def __init__(self, attribute_names):
        self.attribute_names = attribute_names
    def fit(self, X, y=None):
        return self
    def transform(self, X):
        return X[self.attribute_names].values
```


```python
num_attribs = list(housing_num)
cat_attribs = ["ocean_proximity"]

num_pipeline = Pipeline([
        ('selector', DataFrameSelector(num_attribs)),
        ('imputer', SimpleImputer(strategy="median")),
        ('attribs_adder', CombinedAttributesAdder()),
        ('std_scaler', StandardScaler()),
    ])

cat_pipeline = Pipeline([
        ('selector', DataFrameSelector(cat_attribs)),
        ('cat_encoder', CategoricalEncoder(encoding="onehot-dense")),
    ])
```


```python
cat_pipeline = Pipeline([
        ('selector', DataFrameSelector(cat_attribs)),
        ('cat_encoder', OneHotEncoder(categories='auto', sparse=False)),
    ])
```


```python

# full_pipeline = FeatureUnion(transformer_list=[
#         ("num_pipeline", num_pipeline),
#         ("cat_pipeline", cat_pipeline),
#     ])
full_pipeline = ColumnTransformer([
        ("num_pipeline", num_pipeline, num_attribs),
        ("cat_encoder", OneHotEncoder(categories='auto'), cat_attribs),
    ])
```


```python
housing_prepared = full_pipeline.fit_transform(housing)
housing_prepared
```




    array([[-0.94135046,  1.34743822,  0.02756357, ...,  0.        ,
             0.        ,  0.        ],
           [ 1.17178212, -1.19243966, -1.72201763, ...,  0.        ,
             0.        ,  1.        ],
           [ 0.26758118, -0.1259716 ,  1.22045984, ...,  0.        ,
             0.        ,  0.        ],
           ...,
           [-1.5707942 ,  1.31001828,  1.53856552, ...,  0.        ,
             0.        ,  0.        ],
           [-1.56080303,  1.2492109 , -1.1653327 , ...,  0.        ,
             0.        ,  0.        ],
           [-1.28105026,  2.02567448, -0.13148926, ...,  0.        ,
             0.        ,  0.        ]])



# 모델 선택과 훈련
지금까지 머신러닝 알고리즘에 주입할 데이터를 자동으로 정제하고 준비하기 위한 변환 파이프라인을 작성했다.  
이제 머신러닝 모델을 선택하고 훈련시켜보자.

## 훈련 세트에서 훈련하고 평가하기


```python
from sklearn.linear_model import LinearRegression

lin_reg = LinearRegression()
lin_reg.fit(housing_prepared, housing_labels)
```




    LinearRegression()




```python
# 훈련 샘플 몇 개를 사용해 전체 파이프라인을 적용해 보겠습니다.
some_data = housing.iloc[:5]
some_labels = housing_labels.iloc[:5]
some_data_prepared = full_pipeline.transform(some_data)

print("예측:", lin_reg.predict(some_data_prepared))
```

    예측: [ 85657.90192014 305492.60737488 152056.46122456 186095.70946094
     244550.67966089]



```python
print("레이블:", list(some_labels))
```

    레이블: [72100.0, 279600.0, 82700.0, 112500.0, 238300.0]



```python
some_data_prepared
```




    array([[-0.94135046,  1.34743822,  0.02756357,  0.58477745,  0.64037127,
             0.73260236,  0.55628602, -0.8936472 ,  0.01739526,  0.00622264,
            -0.12112176,  0.        ,  1.        ,  0.        ,  0.        ,
             0.        ],
           [ 1.17178212, -1.19243966, -1.72201763,  1.26146668,  0.78156132,
             0.53361152,  0.72131799,  1.292168  ,  0.56925554, -0.04081077,
            -0.81086696,  0.        ,  0.        ,  0.        ,  0.        ,
             1.        ],
           [ 0.26758118, -0.1259716 ,  1.22045984, -0.46977281, -0.54513828,
            -0.67467519, -0.52440722, -0.52543365, -0.01802432, -0.07537122,
            -0.33827252,  0.        ,  1.        ,  0.        ,  0.        ,
             0.        ],
           [ 1.22173797, -1.35147437, -0.37006852, -0.34865152, -0.03636724,
            -0.46761716, -0.03729672, -0.86592882, -0.59513997, -0.10680295,
             0.96120521,  0.        ,  0.        ,  0.        ,  0.        ,
             1.        ],
           [ 0.43743108, -0.63581817, -0.13148926,  0.42717947,  0.27279028,
             0.37406031,  0.22089846,  0.32575178,  0.2512412 ,  0.00610923,
            -0.47451338,  1.        ,  0.        ,  0.        ,  0.        ,
             0.        ]])




```python
from sklearn.metrics import mean_squared_error

housing_predictions = lin_reg.predict(housing_prepared)
lin_mse = mean_squared_error(housing_labels, housing_predictions)
lin_rmse = np.sqrt(lin_mse)
lin_rmse
```




    68627.87390018745




```python
from sklearn.metrics import mean_absolute_error

lin_mae = mean_absolute_error(housing_labels, housing_predictions)
lin_mae
```




    49438.66860915802




```python
from sklearn.tree import DecisionTreeRegressor

tree_reg = DecisionTreeRegressor(random_state=42)
tree_reg.fit(housing_prepared, housing_labels)
```




    DecisionTreeRegressor(random_state=42)




```python
housing_predictions = tree_reg.predict(housing_prepared)
tree_mse = mean_squared_error(housing_labels, housing_predictions)
tree_rmse = np.sqrt(tree_mse)
tree_rmse
```




    0.0



## 교차 검증을 사용한 평가
바로 위를 보면 오차가 0인데, 과연 너무 완벽한 모델이 탄생한 것일까? 그럴리가 없...다. 분명히 과적합 되었을 가능성이 있다.  
우리가 사용한 모델(DecisionTreeRegressor, 결정 트리 모델)을 평가해보도록 하자.


```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(tree_reg, housing_prepared, housing_labels,
                         scoring="neg_mean_squared_error", cv=10)
tree_rmse_scores = np.sqrt(-scores)
```


```python
def display_scores(scores):
    print("점수:", scores)
    print("평균:", scores.mean())
    print("표준편차:", scores.std())

display_scores(tree_rmse_scores)
```

    점수: [72831.45749112 69973.18438322 69528.56551415 72517.78229792
     69145.50006909 79094.74123727 68960.045444   73344.50225684
     69826.02473916 71077.09753998]
    평균: 71629.89009727491
    표준편차: 2914.035468468928



```python
lin_scores = cross_val_score(lin_reg, housing_prepared, housing_labels,
                             scoring="neg_mean_squared_error", cv=10)
lin_rmse_scores = np.sqrt(-lin_scores)
display_scores(lin_rmse_scores)
```

    점수: [71762.76364394 64114.99166359 67771.17124356 68635.19072082
     66846.14089488 72528.03725385 73997.08050233 68802.33629334
     66443.28836884 70139.79923956]
    평균: 69104.07998247063
    표준편차: 2880.328209818068



```python
from sklearn.ensemble import RandomForestRegressor

forest_reg = RandomForestRegressor(n_estimators=10, random_state=42)
forest_reg.fit(housing_prepared, housing_labels)
```




    RandomForestRegressor(n_estimators=10, random_state=42)




```python
housing_predictions = forest_reg.predict(housing_prepared)
forest_mse = mean_squared_error(housing_labels, housing_predictions)
forest_rmse = np.sqrt(forest_mse)
forest_rmse
```




    22413.454658589766




```python
from sklearn.model_selection import cross_val_score

forest_scores = cross_val_score(forest_reg, housing_prepared, housing_labels,
                                scoring="neg_mean_squared_error", cv=10)
forest_rmse_scores = np.sqrt(-forest_scores)
display_scores(forest_rmse_scores)
```

    점수: [53519.05518628 50467.33817051 48924.16513902 53771.72056856
     50810.90996358 54876.09682033 56012.79985518 52256.88927227
     51527.73185039 55762.56008531]
    평균: 52792.92669114079
    표준편차: 2262.8151900582



```python
scores = cross_val_score(lin_reg, housing_prepared, housing_labels, scoring="neg_mean_squared_error", cv=10)
pd.Series(np.sqrt(-scores)).describe()
```




    count       10.000000
    mean     69104.079982
    std       3036.132517
    min      64114.991664
    25%      67077.398482
    50%      68718.763507
    75%      71357.022543
    max      73997.080502
    dtype: float64



## 모델 세부 튜닝
가능성 있는 모델들을 추렸다고 가정했을 때, 해당 모델들을 세부 튜닝해야함.

### 그리드 탐색
만족할만한 하이퍼파라미터 조합 찾을 때까지 수동으로 하이퍼파라미터 조정  
사이킷런의 GridSearchCV 사용


```python
from sklearn.model_selection import GridSearchCV

param_grid = [
    # 하이퍼파라미터 12(=3×4)개의 조합을 시도합니다.
    {'n_estimators': [3, 10, 30], 'max_features': [2, 4, 6, 8]},
    # bootstrap은 False로 하고 6(=2×3)개의 조합을 시도합니다.
    {'bootstrap': [False], 'n_estimators': [3, 10], 'max_features': [2, 3, 4]},
  ]

forest_reg = RandomForestRegressor(random_state=42)
# 다섯 폴드에서 훈련하면 총 (12+6)*5=90번의 훈련이 일어납니다.
grid_search = GridSearchCV(forest_reg, param_grid, cv=5, scoring='neg_mean_squared_error', 
                           return_train_score=True, n_jobs=-1)
grid_search.fit(housing_prepared, housing_labels)
```




    GridSearchCV(cv=5, estimator=RandomForestRegressor(random_state=42), n_jobs=-1,
                 param_grid=[{'max_features': [2, 4, 6, 8],
                              'n_estimators': [3, 10, 30]},
                             {'bootstrap': [False], 'max_features': [2, 3, 4],
                              'n_estimators': [3, 10]}],
                 return_train_score=True, scoring='neg_mean_squared_error')




```python
grid_search.best_params_
```




    {'max_features': 8, 'n_estimators': 30}




```python
grid_search.best_estimator_
```




    RandomForestRegressor(max_features=8, n_estimators=30, random_state=42)




```python
cvres = grid_search.cv_results_
for mean_score, params in zip(cvres["mean_test_score"], cvres["params"]):
    print(np.sqrt(-mean_score), params)
```

    63895.161577951665 {'max_features': 2, 'n_estimators': 3}
    54916.32386349543 {'max_features': 2, 'n_estimators': 10}
    52885.86715332332 {'max_features': 2, 'n_estimators': 30}
    60075.3680329983 {'max_features': 4, 'n_estimators': 3}
    52495.01284985185 {'max_features': 4, 'n_estimators': 10}
    50187.24324926565 {'max_features': 4, 'n_estimators': 30}
    58064.73529982314 {'max_features': 6, 'n_estimators': 3}
    51519.32062366315 {'max_features': 6, 'n_estimators': 10}
    49969.80441627874 {'max_features': 6, 'n_estimators': 30}
    58895.824998155826 {'max_features': 8, 'n_estimators': 3}
    52459.79624724529 {'max_features': 8, 'n_estimators': 10}
    49898.98913455217 {'max_features': 8, 'n_estimators': 30}
    62381.765106921855 {'bootstrap': False, 'max_features': 2, 'n_estimators': 3}
    54476.57050944266 {'bootstrap': False, 'max_features': 2, 'n_estimators': 10}
    59974.60028085155 {'bootstrap': False, 'max_features': 3, 'n_estimators': 3}
    52754.5632813202 {'bootstrap': False, 'max_features': 3, 'n_estimators': 10}
    57831.136061214274 {'bootstrap': False, 'max_features': 4, 'n_estimators': 3}
    51278.37877140253 {'bootstrap': False, 'max_features': 4, 'n_estimators': 10}



```python
pd.DataFrame(grid_search.cv_results_)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>mean_fit_time</th>
      <th>std_fit_time</th>
      <th>mean_score_time</th>
      <th>std_score_time</th>
      <th>param_max_features</th>
      <th>param_n_estimators</th>
      <th>param_bootstrap</th>
      <th>params</th>
      <th>split0_test_score</th>
      <th>split1_test_score</th>
      <th>...</th>
      <th>mean_test_score</th>
      <th>std_test_score</th>
      <th>rank_test_score</th>
      <th>split0_train_score</th>
      <th>split1_train_score</th>
      <th>split2_train_score</th>
      <th>split3_train_score</th>
      <th>split4_train_score</th>
      <th>mean_train_score</th>
      <th>std_train_score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.087806</td>
      <td>0.013061</td>
      <td>0.005892</td>
      <td>0.002079</td>
      <td>2</td>
      <td>3</td>
      <td>NaN</td>
      <td>{'max_features': 2, 'n_estimators': 3}</td>
      <td>-4.119912e+09</td>
      <td>-3.723465e+09</td>
      <td>...</td>
      <td>-4.082592e+09</td>
      <td>1.867375e+08</td>
      <td>18</td>
      <td>-1.155630e+09</td>
      <td>-1.089726e+09</td>
      <td>-1.153843e+09</td>
      <td>-1.118149e+09</td>
      <td>-1.093446e+09</td>
      <td>-1.122159e+09</td>
      <td>2.834288e+07</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.259524</td>
      <td>0.018060</td>
      <td>0.015139</td>
      <td>0.005057</td>
      <td>2</td>
      <td>10</td>
      <td>NaN</td>
      <td>{'max_features': 2, 'n_estimators': 10}</td>
      <td>-2.973521e+09</td>
      <td>-2.810319e+09</td>
      <td>...</td>
      <td>-3.015803e+09</td>
      <td>1.139808e+08</td>
      <td>11</td>
      <td>-5.982947e+08</td>
      <td>-5.904781e+08</td>
      <td>-6.123850e+08</td>
      <td>-5.727681e+08</td>
      <td>-5.905210e+08</td>
      <td>-5.928894e+08</td>
      <td>1.284978e+07</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.775507</td>
      <td>0.054523</td>
      <td>0.034792</td>
      <td>0.005973</td>
      <td>2</td>
      <td>30</td>
      <td>NaN</td>
      <td>{'max_features': 2, 'n_estimators': 30}</td>
      <td>-2.801229e+09</td>
      <td>-2.671474e+09</td>
      <td>...</td>
      <td>-2.796915e+09</td>
      <td>7.980892e+07</td>
      <td>9</td>
      <td>-4.412567e+08</td>
      <td>-4.326398e+08</td>
      <td>-4.553722e+08</td>
      <td>-4.320746e+08</td>
      <td>-4.311606e+08</td>
      <td>-4.385008e+08</td>
      <td>9.184397e+06</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.135841</td>
      <td>0.014487</td>
      <td>0.003882</td>
      <td>0.001241</td>
      <td>4</td>
      <td>3</td>
      <td>NaN</td>
      <td>{'max_features': 4, 'n_estimators': 3}</td>
      <td>-3.528743e+09</td>
      <td>-3.490303e+09</td>
      <td>...</td>
      <td>-3.609050e+09</td>
      <td>1.375683e+08</td>
      <td>16</td>
      <td>-9.782368e+08</td>
      <td>-9.806455e+08</td>
      <td>-1.003780e+09</td>
      <td>-1.016515e+09</td>
      <td>-1.011270e+09</td>
      <td>-9.980896e+08</td>
      <td>1.577372e+07</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.388972</td>
      <td>0.014442</td>
      <td>0.008515</td>
      <td>0.001776</td>
      <td>4</td>
      <td>10</td>
      <td>NaN</td>
      <td>{'max_features': 4, 'n_estimators': 10}</td>
      <td>-2.742620e+09</td>
      <td>-2.609311e+09</td>
      <td>...</td>
      <td>-2.755726e+09</td>
      <td>1.182604e+08</td>
      <td>7</td>
      <td>-5.063215e+08</td>
      <td>-5.257983e+08</td>
      <td>-5.081984e+08</td>
      <td>-5.174405e+08</td>
      <td>-5.282066e+08</td>
      <td>-5.171931e+08</td>
      <td>8.882622e+06</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1.080341</td>
      <td>0.030499</td>
      <td>0.028142</td>
      <td>0.002480</td>
      <td>4</td>
      <td>30</td>
      <td>NaN</td>
      <td>{'max_features': 4, 'n_estimators': 30}</td>
      <td>-2.522176e+09</td>
      <td>-2.440241e+09</td>
      <td>...</td>
      <td>-2.518759e+09</td>
      <td>8.488084e+07</td>
      <td>3</td>
      <td>-3.776568e+08</td>
      <td>-3.902106e+08</td>
      <td>-3.885042e+08</td>
      <td>-3.830866e+08</td>
      <td>-3.894779e+08</td>
      <td>-3.857872e+08</td>
      <td>4.774229e+06</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.145464</td>
      <td>0.005240</td>
      <td>0.003709</td>
      <td>0.001239</td>
      <td>6</td>
      <td>3</td>
      <td>NaN</td>
      <td>{'max_features': 6, 'n_estimators': 3}</td>
      <td>-3.362127e+09</td>
      <td>-3.311863e+09</td>
      <td>...</td>
      <td>-3.371513e+09</td>
      <td>1.378086e+08</td>
      <td>13</td>
      <td>-8.909397e+08</td>
      <td>-9.583733e+08</td>
      <td>-9.000201e+08</td>
      <td>-8.964731e+08</td>
      <td>-9.151927e+08</td>
      <td>-9.121998e+08</td>
      <td>2.444837e+07</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.490803</td>
      <td>0.006879</td>
      <td>0.009305</td>
      <td>0.002367</td>
      <td>6</td>
      <td>10</td>
      <td>NaN</td>
      <td>{'max_features': 6, 'n_estimators': 10}</td>
      <td>-2.622099e+09</td>
      <td>-2.669655e+09</td>
      <td>...</td>
      <td>-2.654240e+09</td>
      <td>6.967978e+07</td>
      <td>5</td>
      <td>-4.939906e+08</td>
      <td>-5.145996e+08</td>
      <td>-5.023512e+08</td>
      <td>-4.959467e+08</td>
      <td>-5.147087e+08</td>
      <td>-5.043194e+08</td>
      <td>8.880106e+06</td>
    </tr>
    <tr>
      <th>8</th>
      <td>1.539921</td>
      <td>0.030108</td>
      <td>0.030670</td>
      <td>0.003994</td>
      <td>6</td>
      <td>30</td>
      <td>NaN</td>
      <td>{'max_features': 6, 'n_estimators': 30}</td>
      <td>-2.446142e+09</td>
      <td>-2.446594e+09</td>
      <td>...</td>
      <td>-2.496981e+09</td>
      <td>7.357046e+07</td>
      <td>2</td>
      <td>-3.760968e+08</td>
      <td>-3.876636e+08</td>
      <td>-3.875307e+08</td>
      <td>-3.760938e+08</td>
      <td>-3.861056e+08</td>
      <td>-3.826981e+08</td>
      <td>5.418747e+06</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.197752</td>
      <td>0.008595</td>
      <td>0.004226</td>
      <td>0.000931</td>
      <td>8</td>
      <td>3</td>
      <td>NaN</td>
      <td>{'max_features': 8, 'n_estimators': 3}</td>
      <td>-3.590333e+09</td>
      <td>-3.232664e+09</td>
      <td>...</td>
      <td>-3.468718e+09</td>
      <td>1.293758e+08</td>
      <td>14</td>
      <td>-9.505012e+08</td>
      <td>-9.166119e+08</td>
      <td>-9.033910e+08</td>
      <td>-9.070642e+08</td>
      <td>-9.459386e+08</td>
      <td>-9.247014e+08</td>
      <td>1.973471e+07</td>
    </tr>
    <tr>
      <th>10</th>
      <td>0.703009</td>
      <td>0.035052</td>
      <td>0.009964</td>
      <td>0.002181</td>
      <td>8</td>
      <td>10</td>
      <td>NaN</td>
      <td>{'max_features': 8, 'n_estimators': 10}</td>
      <td>-2.721311e+09</td>
      <td>-2.675886e+09</td>
      <td>...</td>
      <td>-2.752030e+09</td>
      <td>6.258030e+07</td>
      <td>6</td>
      <td>-4.998373e+08</td>
      <td>-4.997970e+08</td>
      <td>-5.099880e+08</td>
      <td>-5.047868e+08</td>
      <td>-5.348043e+08</td>
      <td>-5.098427e+08</td>
      <td>1.303601e+07</td>
    </tr>
    <tr>
      <th>11</th>
      <td>2.152918</td>
      <td>0.034081</td>
      <td>0.028884</td>
      <td>0.005224</td>
      <td>8</td>
      <td>30</td>
      <td>NaN</td>
      <td>{'max_features': 8, 'n_estimators': 30}</td>
      <td>-2.492636e+09</td>
      <td>-2.444818e+09</td>
      <td>...</td>
      <td>-2.489909e+09</td>
      <td>7.086483e+07</td>
      <td>1</td>
      <td>-3.801679e+08</td>
      <td>-3.832972e+08</td>
      <td>-3.823818e+08</td>
      <td>-3.778452e+08</td>
      <td>-3.817589e+08</td>
      <td>-3.810902e+08</td>
      <td>1.916605e+06</td>
    </tr>
    <tr>
      <th>12</th>
      <td>0.102501</td>
      <td>0.009359</td>
      <td>0.004284</td>
      <td>0.001413</td>
      <td>2</td>
      <td>3</td>
      <td>False</td>
      <td>{'bootstrap': False, 'max_features': 2, 'n_est...</td>
      <td>-4.020842e+09</td>
      <td>-3.951861e+09</td>
      <td>...</td>
      <td>-3.891485e+09</td>
      <td>8.648595e+07</td>
      <td>17</td>
      <td>-0.000000e+00</td>
      <td>-4.306828e+01</td>
      <td>-1.051392e+04</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-2.111398e+03</td>
      <td>4.201294e+03</td>
    </tr>
    <tr>
      <th>13</th>
      <td>0.372035</td>
      <td>0.007677</td>
      <td>0.013123</td>
      <td>0.001289</td>
      <td>2</td>
      <td>10</td>
      <td>False</td>
      <td>{'bootstrap': False, 'max_features': 2, 'n_est...</td>
      <td>-2.901352e+09</td>
      <td>-3.036875e+09</td>
      <td>...</td>
      <td>-2.967697e+09</td>
      <td>4.582448e+07</td>
      <td>10</td>
      <td>-0.000000e+00</td>
      <td>-3.876145e+00</td>
      <td>-9.462528e+02</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-1.900258e+02</td>
      <td>3.781165e+02</td>
    </tr>
    <tr>
      <th>14</th>
      <td>0.143098</td>
      <td>0.007210</td>
      <td>0.004097</td>
      <td>0.001342</td>
      <td>3</td>
      <td>3</td>
      <td>False</td>
      <td>{'bootstrap': False, 'max_features': 3, 'n_est...</td>
      <td>-3.687132e+09</td>
      <td>-3.446245e+09</td>
      <td>...</td>
      <td>-3.596953e+09</td>
      <td>8.011960e+07</td>
      <td>15</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>0.000000e+00</td>
      <td>0.000000e+00</td>
    </tr>
    <tr>
      <th>15</th>
      <td>0.477478</td>
      <td>0.040663</td>
      <td>0.010420</td>
      <td>0.002360</td>
      <td>3</td>
      <td>10</td>
      <td>False</td>
      <td>{'bootstrap': False, 'max_features': 3, 'n_est...</td>
      <td>-2.837028e+09</td>
      <td>-2.619558e+09</td>
      <td>...</td>
      <td>-2.783044e+09</td>
      <td>8.862580e+07</td>
      <td>8</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>0.000000e+00</td>
      <td>0.000000e+00</td>
    </tr>
    <tr>
      <th>16</th>
      <td>0.186153</td>
      <td>0.009293</td>
      <td>0.003124</td>
      <td>0.000506</td>
      <td>4</td>
      <td>3</td>
      <td>False</td>
      <td>{'bootstrap': False, 'max_features': 4, 'n_est...</td>
      <td>-3.549428e+09</td>
      <td>-3.318176e+09</td>
      <td>...</td>
      <td>-3.344440e+09</td>
      <td>1.099355e+08</td>
      <td>12</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>0.000000e+00</td>
      <td>0.000000e+00</td>
    </tr>
    <tr>
      <th>17</th>
      <td>0.510566</td>
      <td>0.019858</td>
      <td>0.009109</td>
      <td>0.001882</td>
      <td>4</td>
      <td>10</td>
      <td>False</td>
      <td>{'bootstrap': False, 'max_features': 4, 'n_est...</td>
      <td>-2.692499e+09</td>
      <td>-2.542704e+09</td>
      <td>...</td>
      <td>-2.629472e+09</td>
      <td>8.510266e+07</td>
      <td>4</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>-0.000000e+00</td>
      <td>0.000000e+00</td>
      <td>0.000000e+00</td>
    </tr>
  </tbody>
</table>
<p>18 rows × 23 columns</p>
</div>



### 랜덤 탐색
탐색 공간이 커지면 그리드 탐색은 부적합.  
랜덤 탐색은 그리드와 거의 방식으로 사용하지만 가능한 모든 조합을 시도하는 대신 각 반복마다 하이퍼파라미터에 임의의 수를 대입하여 지정한 횟수만큼 평가.


```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint

param_distribs = {
        'n_estimators': randint(low=1, high=200),
        'max_features': randint(low=1, high=8),
    }

forest_reg = RandomForestRegressor(random_state=42)
rnd_search = RandomizedSearchCV(forest_reg, param_distributions=param_distribs,
                                n_iter=10, cv=5, scoring='neg_mean_squared_error', 
                                random_state=42, n_jobs=-1)
rnd_search.fit(housing_prepared, housing_labels)
```




    RandomizedSearchCV(cv=5, estimator=RandomForestRegressor(random_state=42),
                       n_jobs=-1,
                       param_distributions={'max_features': <scipy.stats._distn_infrastructure.rv_frozen object at 0x7feb1268d7c0>,
                                            'n_estimators': <scipy.stats._distn_infrastructure.rv_frozen object at 0x7feb01313ca0>},
                       random_state=42, scoring='neg_mean_squared_error')




```python
cvres = rnd_search.cv_results_
for mean_score, params in zip(cvres["mean_test_score"], cvres["params"]):
    print(np.sqrt(-mean_score), params)
```

    49117.55344336652 {'max_features': 7, 'n_estimators': 180}
    51450.63202856348 {'max_features': 5, 'n_estimators': 15}
    50692.53588182537 {'max_features': 3, 'n_estimators': 72}
    50783.614493515 {'max_features': 5, 'n_estimators': 21}
    49162.89877456354 {'max_features': 7, 'n_estimators': 122}
    50655.798471042704 {'max_features': 3, 'n_estimators': 75}
    50513.856319990606 {'max_features': 3, 'n_estimators': 88}
    49521.17201976928 {'max_features': 5, 'n_estimators': 100}
    50302.90440763418 {'max_features': 3, 'n_estimators': 150}
    65167.02018649492 {'max_features': 5, 'n_estimators': 2}


### 앙상블 방법
모델의 그룹(앙상블)이 최상의 단일 모델보다 더 나은 성능을 발휘할 때가 많음(7장에서 다룰 내용)

### 최상의 모델과 오차 분석
최상의 모델을 분석하여 현재 모델의 문제에 대한 통찰 얻기


```python
feature_importances = grid_search.best_estimator_.feature_importances_
feature_importances
```




    array([6.96542523e-02, 6.04213840e-02, 4.21882202e-02, 1.52450557e-02,
           1.55545295e-02, 1.58491147e-02, 1.49346552e-02, 3.79009225e-01,
           5.47789150e-02, 1.07031322e-01, 4.82031213e-02, 6.79266007e-03,
           1.65706303e-01, 7.83480660e-05, 1.52473276e-03, 3.02816106e-03])




```python
extra_attribs = ["rooms_per_hhold", "pop_per_hhold", "bedrooms_per_room"]
# cat_encoder = cat_pipeline.named_steps["cat_encoder"]
cat_encoder = full_pipeline.named_transformers_["cat_encoder"]
cat_one_hot_attribs = list(cat_encoder.categories_[0])
attributes = num_attribs + extra_attribs + cat_one_hot_attribs
sorted(zip(feature_importances, attributes), reverse=True)
```




    [(0.3790092248170967, 'median_income'),
     (0.16570630316895876, 'INLAND'),
     (0.10703132208204354, 'pop_per_hhold'),
     (0.06965425227942929, 'longitude'),
     (0.0604213840080722, 'latitude'),
     (0.054778915018283726, 'rooms_per_hhold'),
     (0.048203121338269206, 'bedrooms_per_room'),
     (0.04218822024391753, 'housing_median_age'),
     (0.015849114744428634, 'population'),
     (0.015554529490469328, 'total_bedrooms'),
     (0.01524505568840977, 'total_rooms'),
     (0.014934655161887776, 'households'),
     (0.006792660074259966, '<1H OCEAN'),
     (0.0030281610628962747, 'NEAR OCEAN'),
     (0.0015247327555504937, 'NEAR BAY'),
     (7.834806602687504e-05, 'ISLAND')]



## 테스트 세트로 시스템 평가하기
어느 정도 모델 튜닝 시 마침내 만족할 만한 모델을 얻게됨.  
이제 테스트 세트에서 최종 모델을 평가할 차례


```python
final_model = grid_search.best_estimator_

X_test = strat_test_set.drop("median_house_value", axis=1)
y_test = strat_test_set["median_house_value"].copy()

X_test_prepared = full_pipeline.transform(X_test)
final_predictions = final_model.predict(X_test_prepared)

final_mse = mean_squared_error(y_test, final_predictions)
final_rmse = np.sqrt(final_mse)
```


```python
final_rmse
```




    47873.26095812988




```python

```
