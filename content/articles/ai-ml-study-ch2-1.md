---
title: ML Chap 2. Machine Learning Project-1
description: California census data로 머신러닝 프로젝트의 과정을 배워봅니다.
slug: ai-ml-study-ch2-1
category: Data-Science
author: HyeWon Lee
---

# Machine Learning Project(1)

Hands-on-Machine-Learning Chap2


실제 data 중 우리는 아래의 목표를 가지고 project를 진행했다.

California census data(block group마다 population, median income, median housing price 등)를 사용하여 California Median Housing Prices model 만들기

진행할 주요 단계는 아래와 같다.

#### the main step
1. Look at the big picture.
2. Get the data.
3. Discover and visualize the data to gain insights.
4. Prepare the data for Machine Learning algorithms.
5. Select a model and train it.
6. Fine-tune your model.
7. Present your solution.
8. Launch, monitor, and maintain your system.

---

## **1. Look at the big picture**

### 1) Frame the problem

>"모델을 어떻게 사용하려고 하는가?"

>-> how you frame the problem, what algorithms you will select, what performance measure you will use to evaluate your model, how much effort you should spend tweaking it

해당 지역에 투자할 가치가 있는지 결정하는데 사용

>"솔루션이 있다면 어떻게 구성되어 있는가?" 
>-> 문제해결방법에 대한 정보, 참고 성능

현재 솔루션은 district housing prices을 전문가가 수동으로 추정. 한 팀이 구역에 관한 최신 정보를 모으고 있는데 median housing price을 얻을 수 없으면 복잡한 규칙 사용하여 추정. 이는 비용과 시간이 많이 들고 추정도 좋지 않음.

따라서 data를 기반으로 median housing price을 예측하는 모델을 훈련시키는 것이 유용하다 생각.

>"supervised/unsupervised/reinforce, classifier/regression, batch/online ...?"

 labeled training examples, 즉 median housing price을 가지고 있으므로 supervised learning task. 예측에 사용할 feature가 population, median income 등 다양하므로 multivariate regression. data에 연속적 흐름이 없고 데이터가 메모리에 들어갈 만큼 작으므로 batch.

### 2) Select a Performance Measure

>회귀 문제의 대표적 성능 지표는 Root Mean Square Error(RMSE). 
>오차↑ RMSE↑
>![RMSE 공식](/ai-ml-study-ch2(1)/ch2-1.png)

>만약 outlier로 보이는 구역이 많으면 Mean Absolute Error(MAE) 사용
>![MAE 공식](/ai-ml-study-ch2(1)/ch2-2.png)

>RMSE와 MAE 모두 the vector of predictions와 the vector of target values의 거리를 구하는 방식 -> 거리 측정에는 여러 norm이 있음(Euclidian norm, Manhattan norm)

>norm의 지수가 클수록 큰 값의 원소에 치우치고 작은 값은 무시됨 
>-> RMSE가 MAE보다 outlier에 더 민감함. 하지만 outlier가 적으면 RMSE가 잘 맞아 일반적으로 RMSE가 잘 쓰임.

### 3) Check the Assumptions

prices를 있는 그대로의 값 자체로 사용할 것이라고 생각하여 regression을 할 계획을 세웠는데, 알고보니 저렴/보통/고가와 같은 카테고리를 사용한다면 지금까지 계획했던 regression이 아니라 classification을 사용해야 함. 그러므로 가정을 다시 한 번 확인해야 함.

---

## **2.Get the data.**

### 1) Create the Workspace
### 2) Download the Data

```python
import pandas as pd
housing=pd.read_csv('C:/Users/lhw29/OneDrive/바탕 화면/코딩 스터디/hands-on-machine-learning/housing.csv')
```

또는

```python
import os
import tarfile
from six.moves import urllib

DOWNLOAD_ROOT ="[https://raw.githubusercontent.com/ageron/handson-ml/master/](https://raw.githubusercontent.com/ageron/handson-ml/master/)"
HOUSING_PATH=os.path.join("datasets","housing")
HOUSING_URL=DOWNLOAD_ROOT+"datasets/housing/housing.tgz"

#데이터 추출 함수
def fetch_housing_data(housing_url=HOUSING_URL, housing_path=HOUSING_PATH): 
    if not os.path.isdir(housing_path):
        os.makedirs(housing_path)
    tgz_path=os.path.join(housing_path,"housing.tgz")
    urllib.request.urlretrieve(housing_url, tgz_path)
    housing_tgz=tarfile.open(tgz_path)
    housing_tgz.extractall(path=housing_path)
    housing_tgz.close()
```

```python
import pandas as pd

#데이터 읽어 들이는 함수
def load_housing_data(housing_path=HOUSING_PATH): 
    csv_path=os.path.join(housing_path,"housing.csv")
    return pd.read_csv(csv_path)
```

### 3) Take a Quick Look at the Data Structure

```python
housing.head() #처음 5행 확인
```

longitude, latitude, housing_median_age, total_rooms, total_bedrooms, population, households, median_income, median_house_value, ocean_proximity 10개의 attributes.

```python
housing.info() #data의 간단 설명, 전체 행수, data type과 null이 아닌 개수 확인
```

data set안에 20640개의 instances. the total_bed rooms attribute는 20433개의 non-null값이 있으므로 207개는 null.

```python
housing["ocean_proximity"].value_counts() #data type이 categrical인 attributes 확인
```

the ocean_proximity를 제외한 모든 attributes는 numerical. the ocean_proximity는 categorical.

```python
housing.describe() #numerical attributes 요약
```

```python
#numerical attribute에 대한 히스토그램 그리기

import matplotlib.pyplot as plt
housing.hist(bins=50, figsize=(20,15))
plt.show()
```
![housing 히스토그램](/ai-ml-study-ch2(1)/ch2-3.png)
median income가 US 달러로 표현되지 않았다. scaling된 값임을 이해하고 있어야 함.

housing median age, median house value 히스토그램은 최댓값과 최솟값을 한정했는데, median house value는 lable로 사용되기 때문에 문제가 될 수 있다.

>예시와 같이 데이터에 문제가 있을 때 정확한 예측을 위해서는
>- 한계 밖의 구역에 대한 정확한 label 구하기
>- training set과 test set에서 잘못된 구역을 제거하기

> features의 scale이 서로 너무 다를 경우 -> scaling

히스토그램의 꼬리가 두껍고 가운데에서 왼쪽보다 오른쪽으로 더 멀리 뻗어있음
-> 패턴을 찾기 어렵게 하므로 좀더 정규분포 모양이 되도록 변형 필요

### 4) Create a Test Set

##### Random sampling 
- data set이 충분히 크다면 괜찮지만 sampling bias가 생길 가능성 높음

```python
import numpy as np

def split_train_test(data, test_ratio):
    shuffled_indices = np.random.permutation(len(data))
    test_set_size = int(len(data) * test_ratio)
    test_indices = shuffled_indices[:test_set_size]
    train_indices = shuffled_indices[test_set_size:]
    return data.iloc[train_indices], data.iloc[test_indices]

train_set, test_set = split_train_test(housing, 0.2)
print(len(train_set), "train +", len(test_set), "test")
```

> data snooping bias 
> : when estimating generalization error using the test set, the estimate will be too optimistic

>test set은 일반적으로 data set의 20%로 한다.

###### 프로그램을 다시 돌렸을 때 다른 test set이 생성되지 않도록 하는 방법
- to save the test set on the first run and then load it in subsequent runs
- to set the random number generator’s seed (e.g., np.ran dom.seed(42)) before calling np.random.permutation(), so that it always generates the same shuffled indices.
- to use each instance’s identifier to decide whether or not it should go in the test set 
  -> 일반적인 방법

```python
from zlib import crc32
 
def test_set_check(identifier, test_ratio):
    return crc32(np.int64(identifier)) & 0xffffffff < test_ratio * 2**32
 
def split_train_test_by_id(data, test_ratio, id_column):
    ids = data[id_column]
    in_test_set = ids.apply(lambda id_: test_set_check(id_, test_ratio))
    return data.loc[~in_test_set], data.loc[in_test_set]
```

a hash of each instance’s identifier를 계산하여 만약 the hash가 20% of the maximum hash value보다 작거나 같으면 instance를 test set에 넣는다. 이렇게 하면 여러 번 반복 실행되면서 data set이 갱신되더라도 test set이 동일하게 유지된다. 새로운 test set는 20% of the new instances를 포함하지만, 이전 training set에 있던 instance는 포함하지 않는다.

housing dataset에는 identifier column가 없다. 그러면 row index as the ID를 사용해서 해결한다.

```python
housing_with_id = housing.reset_index() #`index` 열 추가
train_set, test_set = split_train_test_by_id(housing_with_id, 0.2, "index")

housing_with_id["id"] = housing["longitude"] * 1000 + housing["latitude"]
train_set, test_set = split_train_test_by_id(housing_with_id, 0.2, "id")
```

 a district’s latitude and longitude are guaranteed to be stable for a few million years, so you could combine them into an ID.

```python
from sklearn.model_selection import train_test_split
 
train_set, test_set = train_test_split(housing, test_size=0.2, random_state=42)
```

1) there is a random_state parameter that allows you to set the random generator seed as explained previously
2) you can pass it multiple datasets with an identical number of rows, and it will split them on the same indices

##### Stratified sampling 
: 전체 모수를 동질의 그룹으로 나누고 test set이 전체 모수를 대표하도록 각 계층에서 올바른 수의 샘플 추출
```python
housing["income_cat"] = np.ceil(housing["median_income"] / 1.5)
housing["income_cat"].where(housing["income_cat"] < 5, 5.0, inplace=True)

#income categories
housing["income_cat"].hist(bins=50, figsize=(10,5))
plt.show()
```
![]()

```python
from sklearn.model_selection import StratifiedShuffleSplit
 
split = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
for train_index, test_index in split.split(housing, housing["income_cat"]):
    strat_train_set = housing.loc[train_index]
    strat_test_set = housing.loc[test_index]
```


---

## **3. Discover and visualize the data to gain insights.**

 원래 training set가 크면 조작을 간단하고 빠르게 하기 위해 탐색을 위한 set을 별도로 sampling할 수 있으나 set이 작으므로 training set 전체를 사용한다. 이 때 training set를 손상시키지 않기 위해 복사본 만듦.
 
```python
housing=strat_train_set.copy() #data 복사
```

### 1) Visualizing Geographical Data

```python
# visualizing the geographical data
housing.plot(kind="scatter", x="longitude", y="latitude", alpha=0.1) #alpha는 점의 투명도
```

![housing 지리적 데이터 시각화](/ai-ml-study-ch2(1)/ch2-4.png)

```python
# California housing prices
housing.plot(kind="scatter", x="longitude", y="latitude", alpha=0.4,
s=housing["population"]/100, label="population", figsize=(10,7),
c="median_house_value", cmap=plt.get_cmap("jet"), colorbar=True, sharex=False
)
plt.legend()
```

![housing prices 지리적으로 시각화](/ai-ml-study-ch2(1)/ch2-5.png)
 the housing prices are very much related to the location(e.g., close to the ocean) and to the population density. -> useful to use a clustering algorithm

### 2) Looking for Correlations

> data set이 너무 크지 않으면 모든 feature 간의 standard correlation coefficient를 corr() method로 계산할 수 있다.

```python
corr_matrix=housing.corr()
corr_matrix["median_house_value"].sort_values(ascending=False)
```

```python
#numerical attribute 사이 산점도 
from pandas.plotting import scatter_matrix
 
attributes = ["median_house_value", "median_income", "total_rooms", "housing_median_age"]
scatter_matrix(housing[attributes], figsize=(12, 8))
```

![상관관계 산점도](/ai-ml-study-ch2(1)/ch2-6.png)

median house value와 가장 상관관계가 큰 attribute는 the median income.
- the correlation가 크다.
- $500,000에 제한값이 있다. -> 해당 구역 제거

### 3) Experimenting with Attribute Combinations


이후 project 과정 이어서.