---
title: 머신러닝
description: 주어진 데이터로부터 규칙성을 찾는 과정
slug: data-study-ml
category: Data-Science
author: Jooyoung Lee
---

## 0. 머신러닝

위키독스 “딥 러닝을 이용한 자연어 처리 입문” 챕터 01~06을 학습하는 중입니다.

## 1. 전체 데이터

### 1.1. 훈련: 훈련용, 검증용(모델의 성능 조정)

### 1.2. 테스트: 테스트용(모델의 성능 평가)

```python
(X_train, X_test, y_train, y_test) = train_test_split(data_X, data_y, train_size=0.8, random_state=1)
```

## 2. 분류

### 2.1. Binary Classification: 선택지=2

#### 2.1.1. Logistic Regression

##### 2.1.1.1. 1/(1+e^-(wx+b)) Sigmoid function: 출력이 0과 1사이의 값을 가지면서 S자

출력값>= 0.5->1(True)
출력값<= 0.5->0(False)

```python
model.add(Dense(1, input_dim=1, activation='sigmoid'))
```

##### 2.1.1.2. Cross Entropy

```python
model.compile(optimizer=sgd, loss='binary_crossentropy', metrics=['binary_accuracy'])
```

#### 2.1.2. 다중 로지스틱 회귀: x가 2개

```python
model.add(Dense(1, input_dim=2, activation='sigmoid'))
```

### 2.2. Multi-class Classification: 선택지>=3

```python
model.add(Dense(1, input_dim=3, activation='linear'))
```

#### 2.2.1. Softmax Regression

#### 2.2.1.1. Softmax function

```python
model.add(Dense(3, input_dim=4, activation='softmax'))
```

#### 2.2.1.2. 원-핫 벡터: 단어의 유사성

```python
y_train = to_categorical(y_train)
y_test = to_categorical(y_test)
```

#### 2.2.1.3. 크로스 엔트로피 함수

```python
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
```

## 3. 회귀: 어떠한 연속적인 값의 범위 내에서 예측값

### 3.1. 다중 선형 회귀: 독립 변수가 2개 이상

```python
model.add(Dense(1, input_dim=3, activation='linear'))
```

## 4. Supervised Learning

: 정답과 함께 학습

ex)자연어 처리

## 5. Unsupervised Learning

: 별도의 레이블이 없이 학습

ex)텍스트 처리 분야 토픽 모델링 알고리즘 LSA/LDA

## 6. Self-Supervised Learning

: 레이블을 만들어서 학습

ex)워드 임베딩 알고리즘 Word2Vec, 언어 모델 BERT

## 7. Confusion Matrix: TP, TN, FP, FN

### 7.1. 정밀도(Precision)

: TP/(TP+FP)

### 7.2. 재현율(Recall)

: TP/(TP+FN)

### 7.3. 정확도(Accuracy)

: TP+TN/(TP+FN+FP+TN), F1-Score

## 8. 선형 회귀(Linear Regression)

### 8.1. Simple Linear Regression Analysis

: y=wx+b

### 8.2. Multiple Linear Regression Analysis

: x는 여러 개

## 9. Objective function=Cost function=Loss function

회귀: Mean Squared Error

```python
cost = mse_loss(y_pred, y)
model.compile(optimizer=sgd, loss='mse', metrics=['mse'])
```

## 10. Optimizer

경사하강법(Gradient Descent)

0<학습률(learning rate) α<1

```python
optimizer = tf.optimizers.SGD(0.01)
sgd = optimizers.SGD(lr=0.01)
```

## 11. 3차원 텐서: 시퀀스 데이터

자연어 처리 (batch_size, timesteps, word_dim)
