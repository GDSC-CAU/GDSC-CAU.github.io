---
title: ML Chap 2. Machine Learning Project-2
description: California census data로 머신러닝 프로젝트의 과정을 배워봅니다.
slug: ai-ml-study-ch2-2
category: Data-Science
author: HyeWon Lee
---

# Machine Learning Project(2)

Hands-on-Machine-Learning Chap2


이전 project 과정에 이어서

## **4. Prepare the data for Machine Learning algorithms.**

데이터 준비를 수동이 아니라 함수를 만들어 자동화하는 이유 
-> 데이터 변환이 쉽고 어떤 조합이 좋은지 확인하는데 편리, 변환 라이브러리를 점차 구축하게 됨, 새 데이터 주입 전에 함수 사용 가능

```python
housing = strat_train_set.drop("median_house_value", axis=1)
housing_labels = strat_train_set["median_house_value"].copy()
```

separate the predictors and the labels since we don’t necessarily want to apply the same transformations to the predictors and the target values

### 1) **Data Cleaning**


누락된 attribute를 처리하는 방법
- option1)해당 구역 제거
- option2) 전체 특성 삭제
- option3) 어떤 값으로 채우기(0, mean, median...)

```python
housing.dropna(subset=["total_bedrooms"]) # option 1
housing.drop("total_bedrooms", axis=1) # option 2
median = housing["total_bedrooms"].median() # option 3
housing["total_bedrooms"].fillna(median, inplace=True)
```

> Imputer는 누락된 값을 쉽게 다루도록 함.

```python
from sklearn.impute import SimpleImputer
imputer = SimpleImputer(strategy="median")

housing_num = housing.drop("ocean_proximity", axis=1)

imputer.fit(housing_num)

imputer.statistics_
housing_num.median().values
```

### 2) Handling Text and Categorical Attributes

```python
housing_cat = housing["ocean_proximity"]

housing_cat_encoded, housing_categories = housing_cat.factorize()
housing_cat_encoded[:10]
```

categorical인 ocean_proximaty를 numerical로 변환

```python
housing_categories
```

0 category에 1category보다 4category가 더 비슷하다는 문제. 
one-hot encoding ->one-hot vector로 바꿔주기

```python
from sklearn.preprocessing import OneHotEncoder
cat_encoder = OneHotEncoder()
housing_cat_1hot = cat_encoder.fit_transform(housing_cat_encoded.reshape(-1,1))
housing_cat_1hot
```

fit_transform() method는 2차원 배열을 넣어줘야 함. 1차원 배열인 housing_cat_encoded 구조를 바꿔야 함.

a SciPy sparse matrix 
- 수천개의 categories가 있는 categorical features일 때 효율적.
- OneHotEncoder하면 열이 수천개인 행렬로 변하고 각 행은 1이 하나뿐이고 그 외는 모두 0인 행렬이 됨. 메모리 낭비를 피하기 위해 sparse matrix는 0이 아니 원소의 위치만 저장함.

```python
housing_cat_1hot.toarray()
```

to convert it to a (dense) NumPy array, just call the toarray() method

text category를 numerical category로, numerical category를 one-hot vector로 바꿔주는 이 두 가지 변환을 CategoricalEncoder를 사용하여 한번에 처리 가능

```python
cat_encoder.categories_
```

### 3) Custom Transformers

```python
from sklearn.base import BaseEstimator, TransformerMixin
rooms_ix, bedrooms_ix, population_ix, households_ix = 3, 4, 5, 6

class CombinedAttributesAdder(BaseEstimator, TransformerMixin):
    def __init__(self, add_bedrooms_per_room = True): # no *args or **kargs
        self.add_bedrooms_per_room = add_bedrooms_per_room
    def fit(self, X, y=None):
        return self # nothing else to do
    def transform(self, X, y=None):
        rooms_per_household = X[:, rooms_ix] / X[:, households_ix]
        population_per_household = X[:, population_ix] / X[:, households_ix]
        if self.add_bedrooms_per_room:
            bedrooms_per_room = X[:, bedrooms_ix] / X[:, rooms_ix]
            return np.c_[X, rooms_per_household, population_per_household, bedrooms_per_room]
        else:
            return np.c_[X, rooms_per_household, population_per_household]

attr_adder = CombinedAttributesAdder(add_bedrooms_per_room=False)
housing_extra_attribs = attr_adder.transform(housing.values)
```

### 4) **Feature Scaling**

the input numerical가 너무 다른 scales을 가질 때 머신러닝 알고리즘은 잘 작동하지 않는다. scaling the target values는 일반적으로 요구되지 않는다.

#### scaling 방법

##### (1) **min-max scaling(nomalization)**

>data에서 min을 빼고 (max-min)로 나누면 0~1 범위에 들도록 값을 이동할 수 있다. 0~1 범위를 원하지 않으면 feature_range hyperparameter로 범위 변경 가능. 

-> 범위의 상한 하한이 있음

##### (2) **standardization**

>먼저 mean을 뺀다. (그래서 standardization을 하면 mean이 0이 됨.) 그 다음 sd로 나누어 the resultiong distribution이 unit variance를 갖도록 한다. 

-> 범위의 상한 하한이 없어서 범위가 요구되는 알고리즘에서는 문제 발생. 
-> outier에 영향을 덜 받음.

### 5) Transformation Pipelines

> Pipeline : A sequence of data processing components

```python
# numerical attributes 처리
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
from sklearn.compose import ColumnTransformer
num_attribs = list(housing_num)
cat_attribs = ["ocean_proximity"]
full_pipeline = ColumnTransformer([
 ("num", num_pipeline, num_attribs),
 ("cat", OneHotEncoder(), cat_attribs),
 ])
 
housing_prepared = full_pipeline.fit_transform(housing)
```

---

## **5. Select a model and train it.**

### 1) Training and Evaluation on the Traning Set

```python
from sklearn.linear_model import LinearRegression
 
lin_reg = LinearRegression()
lin_reg.fit(housing_prepared, housing_labels)
```

```python
some_data = housing.iloc[:5]
some_labels = housing_labels.iloc[:5]
some_data_prepared = full_pipeline.transform(some_data)

print("Predictions:", lin_reg.predict(some_data_prepared))

print("Labels:", list(some_labels))
```

```python
#mean_square_error 함수로 전체 training set에 대한 regression model의 RMSE 측정

from sklearn.metrics import mean_squared_error

housing_predictions = lin_reg.predict(housing_prepared)
lin_mse = mean_squared_error(housing_labels, housing_predictions)
lin_rmse = np.sqrt(lin_mse)
lin_rmse
```

median_housing_values의 대부분이 120000에서 265000 사이의 값이었는데 prediction error가 68628인 것은 좋지 않다. underfitting됨

>underfitting 해결 방법
>
>- more powerful model 선택 
>- better features 주입 
>- constraints 줄이기

more powerful model 선택하도록 decisiontreeregressor로 training

```python
from sklearn.tree import DecisionTreeRegressor
tree_reg = DecisionTreeRegressor()
tree_reg.fit(housing_prepared, housing_labels)
```

```python
housing_predictions = tree_reg.predict(housing_prepared)
tree_mse = mean_squared_error(housing_labels, housing_predictions)
tree_rmse = np.sqrt(tree_mse)
tree_rmse
```

error가 0이 나옴. -> error가 0이 될 수 없기 때문에 overfitting된 것.

### 2) Better Evaluation Using Cross-Validation

DecisionTree model을 평가하는 방법
- train_test_split으로 training set를 더 작은 training set과 test set으로 나누어 training
- K-fold cross validation
```python
#K-fold cross-validation

from sklearn.model_selection import cross_val_score
scores = cross_val_score(tree_reg, housing_prepared, housing_labels,
 scoring="neg_mean_squared_error", cv=10)
tree_rmse_scores = np.sqrt(-scores)
```

```python
#decisiontree score

def display_scores(scores):
    print("Scores:", scores)
    print("Mean:", scores.mean())
    print("Standard deviation:", scores.std())

display_scores(tree_rmse_scores)
```

```python
#linear regression score

lin_scores = cross_val_score(lin_reg, housing_prepared, housing_labels,
      scoring="neg_mean_squared_error", cv=10)

lin_rmse_scores = np.sqrt(-lin_scores)
display_scores(lin_rmse_scores)
```

decisiontree보다 linear regression의 성능이 더 좋다.

```python
#randomforestregressor

from sklearn.ensemble import RandomForestRegressor
forest_reg = RandomForestRegressor()
forest_reg.fit(housing_prepared, housing_labels)

housing_predictions = forest_reg.predict(housing_prepared)
forest_mse = mean_squared_error(housing_labels, housing_predictions)
forest_rmse= np.sqrt(forest_mse)
forest_rmse
```

```python
#randomforest score

forest_scores = cross_val_score(forest_reg, housing_prepared, housing_labels,
      scoring="neg_mean_squared_error", cv=10)

forest_rmse_scores = np.sqrt(-forest_scores)
display_scores(forest_rmse_scores)
```

randomeforest는 성능이 좋아보이지만 training score가 test score보다 매우 낮으므로 여전히 overfitting.

> overfitting 해결 방법
> 
> - model을 간단히 
> - constraints 
> - 더 많은 training data 모으기

---

## **6. Fine-tune your model.**

### 1) Grid Search
탐색하려는 hyperparameter와 시도해볼 값을 지정하면 가능한 모든 combination of hyperparameter 에 대해 cross validation을 사용해 평가함.
```python
#RandomForestRegressor에 대한 the best combination of hyperparameter 찾기

from sklearn.model_selection import GridSearchCV

param_grid = [
 {'n_estimators': [3, 10, 30], 'max_features': [2, 4, 6, 8]},
 {'bootstrap': [False], 'n_estimators': [3, 10], 'max_features': [2, 3, 4]},
 ]

forest_reg = RandomForestRegressor()

grid_search = GridSearchCV(forest_reg, param_grid, cv=5,
 scoring='neg_mean_squared_error',
return_train_score=True)

grid_search.fit(housing_prepared, housing_labels)
```

```python
grid_search.best_params_
```

```python
grid_search.best_estimator_
```

```python
#cvres = grid_search.cv_results
#for mean_score, params in zip(cvres["mean_test_score"], cvres["params"]):
#    print(np.sqrt(-mean_score), params)
```

### 2) Randomized Search

> 비교적 적은 수이면 grid search 사용 괜찮으나 hyperparameter의 search space가 커지면 RandomizedSearchCV를 사용하는 것이 좋음. 
> -> 반복횟수를 설정하면 hyperparameter가 각기 다른 값을 탐색한다는 장점 
> -> 반복횟수 조절만으로 컴퓨팅 자원 제어한다는 장점

### 3) Ensemble Methods

to combine the models that perform best.

### 4) Analyze the Best Models and Their Errors

```python
#각 feature의 상대적인 중요도
feature_importances = grid_search.best_estimator_.feature_importances_
feature_importances
```

```python
extra_attribs = ["rooms_per_hhold", "pop_per_hhold", "bedrooms_per_room"]
cat_encoder = full_pipeline.named_transformers_["cat"]
cat_one_hot_attribs = list(cat_encoder.categories_[0])
attributes = num_attribs + extra_attribs + cat_one_hot_attribs
sorted(zip(feature_importances, attributes), reverse=True)
```

위를 바탕으로 덜 중요한 feature를 제거할 수 있음.

### 5) Evaluate Your System on the Test Set

```python
#test set에서 predictor와 lable을 얻은 후 full_pipeline실행
final_model = grid_search.best_estimator_

X_test = strat_test_set.drop("median_house_value", axis=1)
y_test = strat_test_set["median_house_value"].copy()

X_test_prepared = full_pipeline.transform(X_test)

final_predictions = final_model.predict(X_test_prepared)

#test set에서 final model 평가
final_mse = mean_squared_error(y_test, final_predictions)
final_rmse = np.sqrt(final_mse)
```

```python
from scipy import stats
confidence = 0.95
squared_errors = (final_predictions - y_test) ** 2
np.sqrt(stats.t.interval(confidence, len(squared_errors) - 1, loc=squared_errors.mean(), scale=stats.sem(squared_errors)))
```

---

## **7. Present your solution.**

---

## **8. Launch, monitor, and maintain your system.**