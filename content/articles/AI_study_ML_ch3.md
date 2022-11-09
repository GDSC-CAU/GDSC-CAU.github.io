## Contents
--- 



## MNIST
--- 

For any dataset, it has description. In this data set,  mnist has attribution DESCR.

"DESCR" 
	A description of the dataset, here, the following is scrip of mnist.DESCR

> The MNIST database of handwritten digits with 784 features, raw data available at: http://yann.lecun.com/exdb/mnist/. It can be split in a training set of the first 60,000 examples, and a test set of 10,000 examples ...

<br/><br/>

Load dataset
```python
from sklearn.datasets import fetch_openml
mnist = fetch_openml('mnist_784', as_frame=False)
```
<br/><br/>
X is the data(set of images) and y is the target(labels 0, 1, ... , 9)
```python
X, y = mnist.data, mnist.target
X
```




    array([[0., 0., 0., ..., 0., 0., 0.],
           [0., 0., 0., ..., 0., 0., 0.],
           [0., 0., 0., ..., 0., 0., 0.],
           ...,
           [0., 0., 0., ..., 0., 0., 0.],
           [0., 0., 0., ..., 0., 0., 0.],
           [0., 0., 0., ..., 0., 0., 0.]])


<br/><br/>
Shape of X and y. The reason why X is 2D-array is each element of X is image of 28x28 pixels, where a pixel is a integer in [0, 255]
```python
print(X.shape, "\n", y.shape)
```

    (70000, 784) 
    (70000,)

<br/><br/>
Visualizing X[0] which is 5.
```python
import matplotlib.pyplot as plt

def plot_digit(image_data): 
    image = image_data.reshape(28, 28)
    plt.imshow(image, cmap="binary")
    plt.axis("off")

some_digit = X[0]
plot_digit(some_digit)
plt.show()

```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_3_0.png)
    



```python
y[0]
```




    '5'

<br/><br/>

Plot first 100 instances in X
```python
def plot_digits(image_datas, n_row, n_col):
    fig, axes = plt.subplots(n_row, n_col, figsize = (1.5*n_col, 2*n_row))
    images = []
    for i in range(n_row*n_col):
        images.append(image_datas[i].reshape(28, 28))
        axes[i//n_col, i%n_col].imshow(images[i], cmap = "binary")      
        axes[i//n_col, i%n_col].axis("off")

some_digits = X[:100]
plot_digits(some_digits, 10, 10)
plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_6_0.png)
    <br/><br/>
Split X and y into train and test set. 
```python
X_train, X_test, y_train, y_test = X[:60000], X[60000:], y[:60000], y[60000:]
```

<br/><br/>
<br/><br/>
## Training a BInary Classifier
---

A binary classifier is classifier that classify binary objects. The most popular and important one is the boolean. 
```python
y_train_5 = (y_train == '5')
y_test_5 = (y_test == '5')
```
<br/><br/>
Use SGD(Stochastic Gradient Decent) classifier in sklearn.
```python
from sklearn.linear_model import SGDClassifier

sgd_clf = SGDClassifier(random_state=42)
sgd_clf.fit(X_train, y_train_5)
```

<br/><br/>






Predict X[0], if classifier done a good job than it returns True since X[0] is 5.
```python
sgd_clf.predict([some_digit])
```




    array([ True])



<br/><br/>

## Perfomance Measures
---
### Measuring Accuracy Using Cross-Validation

As we did in Chapter 2, first we use CV to measure performance, but it has flaw as the following code shows.

It looks good.
```python
from sklearn.model_selection import cross_val_score

cross_val_score(sgd_clf, X_train, y_train_5, cv=3,scoring="accuracy")

```




    array([0.95035, 0.96035, 0.9604 ])

<br/><br/>


```python
from sklearn.dummy import DummyClassifier

dummy_clf = DummyClassifier()
dummy_clf.fit(X_train, y_train_5)
print(any(dummy_clf.predict(X_train)))
```

    False

<br/><br/>

As you see, some dull machine that always returns True has CV score above 0.9.
```python
cross_val_score(dummy_clf, X_train, y_train_5, cv=3, scoring="accuracy")
```




    array([0.90965, 0.90965, 0.90965])

<br/><br/>


### Confusion Matrices
--- 

Confusion matrix count the number of times of instances of class A are classified as class B, for all A/B pairs. In this case it count TP, TN, FP, FN.
$$
confussion\_matrix = \begin{pmatrix}
TN & FN\\ 
FP & TP
\end{pmatrix}
$$


<br/><br/>

```python
from sklearn.model_selection import cross_val_predict

y_train_pred = cross_val_predict(sgd_clf, X_train, y_train_5, cv=3)
```
<br/><br/>

```python
from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_train_5, y_train_pred)
cm
```




    array([[53892,   687],
           [ 1891,  3530]])


<br/><br/>


```python
y_train_perfect_predictions = y_train_5 
confusion_matrix(y_train_5, y_train_perfect_predictions)
```




    array([[54579,     0],
           [    0,  5421]])

<br/><br/>

### Precision and Recall
---

Precision is the accuracy of the positive predictions. And recall, also known as sensitiveity or the true positive rate, is the ratio of positive positive instances that are correctly detected by the classifier.
<br/><br/>

$$
\begin{aligned}
precision = \frac{TP}{TP + FP}
\newline
\newline
recall = \frac{TP}{TP + FN}
\end{aligned}$$
<br/><br/>

```python
from sklearn.metrics import precision_score, recall_score

precision_score(y_train_5, y_train_pred)
```




    0.8370879772350012


<br/><br/>

```python
recall_score(y_train_5, y_train_pred)
```




    0.6511713705958311

<br/><br/>

The F₁ score is the hamonic mean of precision and recall. H

$$
F_1 = \frac{2}{\frac{1}{precision} + \frac{1}{recall}}
$$
```python
from sklearn.metrics import f1_score

f1_score(y_train_5, y_train_pred)
```




    0.7325171197343846
<br/><br/>

Higher F₁ score means more balance between precision and recall scores. The word "balance" look positive but it may trick you since sometimes we need model with higher precision score rather than model with high recall score and vice versa.
<br/><br/>

### The Precision/Recall Trade-off
---
The dicision function is a function that has instance as a input and some number as output. The number is calculated by the model we fitted. In this case, since SGDClassifier is a linear model, it has some hyperplane that separates the predicted 5 and others. For each instance, dicisoin function calculates the distance from hyperplane and returns it. Thus the number represent how confident the model is on a given instance.


```python
y_scores = sgd_clf.decision_function([some_digit])
y_scores
```




    array([2164.22030239])

<br/><br/>


```python
threshold = 0
y_some_digit_pred = (y_scores > threshold)
y_some_digit_pred
```




    array([ True])
<br/><br/>

Thus if we choose higher theshold, it predict instance with higher standard. 

```python
threshold = 3000
y_some_digit_pred = (y_scores > threshold)
y_some_digit_pred
```




    array([False])

<br/><br/>

To decide which threshold to use, do following steps
	- use the cross_val_predict() with "decision_function" method
	- use the precision_recall_cure() to compute precision/recall for all possible thresholds
```python
y_scores = cross_val_predict(sgd_clf, X_train, y_train_5, cv=3,  method="decision_function")
```

<br/><br/>
```python
from sklearn.metrics import precision_recall_curve

precisions, recalls, thresholds = precision_recall_curve(y_train_5, y_scores)
```

<br/><br/>
```python
plt.plot(thresholds, precisions[:-1], label="Precision", linewidth=2)
plt.plot(thresholds, recalls[:-1], label="Recall", linewidth=2)
plt.vlines(threshold, 0, 1.0, "k", "dotted", label="threshold")

idx = (thresholds >= threshold).argmax()  
plt.plot(thresholds[idx], precisions[idx], color= "C0")
plt.plot(thresholds[idx], recalls[idx], color= "C1")
plt.axis([-50000, 50000, 0, 1])
plt.grid()
plt.xlabel("Threshold")
plt.legend(loc="center right")
plt.figure(figsize=(8, 4))

plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_24_0.png)
    

<br/><br/>
If you decide to aim certain precision or recall, than use argmax() to find thereshold that satisfies the condition.




```python
import matplotlib.patches as patches 

plt.figure(figsize=(6, 5)) 

plt.plot(recalls, precisions, linewidth=2, label="Precision/Recall curve")

plt.plot([recalls[idx], recalls[idx]], [0., precisions[idx]], "k:")
plt.plot([0.0, recalls[idx]], [precisions[idx], precisions[idx]], "k:")
plt.plot([recalls[idx]], [precisions[idx]], "ko",
         label="Point at threshold 3,000")
plt.gca().add_patch(patches.FancyArrowPatch(
    (0.79, 0.60), (0.61, 0.78),
    connectionstyle="arc3,rad=.2",
    arrowstyle="Simple, tail_width=1.5, head_width=8, head_length=10",
    color="#444444"))
plt.text(0.56, 0.62, "Higher\nthreshold", color="#333333")
plt.xlabel("Recall")
plt.ylabel("Precision")
plt.axis([0, 1, 0, 1])
plt.grid()
plt.legend(loc="lower left")

plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_25_0.png)
    


<br/><br/>
```python
idx_for_90_precision = (precisions >= 0.90).argmax()
threshold_for_90_precision = thresholds[idx_for_90_precision]
threshold_for_90_precision
```




    3370.0194991439557



<br/><br/>
```python
y_train_pred_90 = (y_scores >= threshold_for_90_precision)
precision_score(y_train_5, y_train_pred_90)
```




    0.9000345901072293


<br/><br/>

```python
recall_at_90_precision = recall_score(y_train_5, y_train_pred_90)
recall_at_90_precision
```




    0.4799852425751706

<br/><br/>
### The ROC Curve
---
The receiver operating characteristic(ROC) curve plots the TPR against the FPR.

terminology
- TPR = sensitivity, recall, hit rate
- TNR = specifity, selectivity
- FPR = fall-out 
	
$$
\begin{aligned}
TPR = \frac{TP}{TP + FN} 
\newline
\newline
TNR = \frac{TN}{TN + FP} 
\newline
\newline
FPR = \frac{FP}{FP + TN} 
\end{aligned}
$$
<br/><br/>


```python
from sklearn.metrics import roc_curve

fpr, tpr, thresholds = roc_curve(y_train_5, y_scores)
```
<br/><br/>

```python
idx_for_threshold_at_90 = (thresholds <= threshold_for_90_precision).argmax()
tpr_90, fpr_90 = tpr[idx_for_threshold_at_90], fpr[idx_for_threshold_at_90]

plt.figure(figsize=(6, 5))  # extra code – not needed, just formatting
plt.plot(fpr, tpr, linewidth=2, label="ROC curve")
plt.plot([0, 1], [0, 1], 'k:', label="Random classifier's ROC curve")
plt.plot([fpr_90], [tpr_90], "ko", label="Threshold for 90% precision")

# extra code – just beautifies and saves Figure 3–7
plt.gca().add_patch(patches.FancyArrowPatch(
    (0.20, 0.89), (0.07, 0.70),
    connectionstyle="arc3,rad=.4",
    arrowstyle="Simple, tail_width=1.5, head_width=8, head_length=10",
    color="#444444"))
plt.text(0.12, 0.71, "Higher\nthreshold", color="#333333")
plt.xlabel('False Positive Rate (Fall-Out)')
plt.ylabel('True Positive Rate (Recall)')
plt.grid()
plt.axis([0, 1, 0, 1])
plt.legend(loc="lower right", fontsize=13)

plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_30_0.png)

As in the plot, there's trade-off once more. And a good classifier tend to toward the top-left corner, far away from random classifier.
<br/><br/>
AUC is the area under the curve, it measures how much curve toward the top-left corner.


```python
from sklearn.metrics import roc_auc_score

roc_auc_score(y_train_5, y_scores)
```




    0.9604938554008616

<br/><br/>
Following cells compares between SGD and RF, most case RF is more powerful model.


```python
from sklearn.ensemble import RandomForestClassifier

forest_clf = RandomForestClassifier(random_state=42)
```
<br/><br/>

```python
y_probas_forest = cross_val_predict(forest_clf, X_train, y_train_5, cv=3, method="predict_proba")
y_probas_forest[:2]

```




    array([[0.11, 0.89],
           [0.99, 0.01]])


<br/><br/>

```python
y_scores_forest = y_probas_forest[:, 1]
precisions_forest, recalls_forest, thresholds_forest = precision_recall_curve(y_train_5, y_scores_forest)
```

<br/><br/>
```python
plt.figure(figsize=(6, 5))  # extra code – not needed, just formatting

plt.plot(recalls_forest, precisions_forest, "C2", linewidth=2,
         label="Random Forest")
plt.plot(recalls, precisions, "C3", "--", linewidth=2, label="SGD")

# extra code – just beautifies and saves Figure 3–8
plt.xlabel("Recall")
plt.ylabel("Precision")
plt.axis([0, 1, 0, 1])
plt.grid()
plt.legend(loc="lower left")

plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_35_0.png)
    


<br/><br/>
```python
y_pred_forest = y_probas_forest[:, 1] >= 0.5
f1_score(y_train_5, y_pred_forest)
```




    0.9274509803921569


<br/><br/>

```python
roc_auc_score(y_train_5, y_scores_forest)

```




    0.9983436731328145

<br/><br/>
## Multiclass Classification
---
#### OvR
Classifies all classes and calculate decision score and pick the most confidence one.

#### OvO
##### pros
- each classifier only needs to be trained on the part of the training set
- faster to train some algorithms such as SVM
##### cons
- need to train Nx(N-1)/2 classifiers

Most case, OvR is preferred.

```python
from sklearn.svm import SVC
svm_clf = SVC(random_state=42)
svm_clf.fit(X_train[:2000], y_train[:2000]) 
```




    SVC(random_state=42)


<br/><br/>

```python
svm_clf.predict([some_digit])

```






    array(['5'], dtype=object)


<br/><br/>

```python
some_digit_scores = svm_clf.decision_function([some_digit])
some_digit_scores.round(2)

```




    array([[ 3.79,  0.73,  6.06,  8.3 , -0.29,  9.3 ,  1.75,  2.77,  7.21,
             4.82]])



<br/><br/>
```python
class_id = some_digit_scores.argmax()
class_id
```




    5



<br/><br/>
```python
svm_clf.classes_

```




    array(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], dtype=object)


<br/><br/>

```python
svm_clf.classes_[class_id]
```




    '5'



<br/><br/>
```python
from sklearn.multiclass import OneVsRestClassifier
ovr_clf = OneVsRestClassifier(SVC(random_state=42))
ovr_clf.fit(X_train[:2000], y_train[:2000])
```




    OneVsRestClassifier(estimator=SVC(random_state=42))


<br/><br/>

```python
ovr_clf.predict([some_digit])

```




    array(['5'], dtype='<U1')


<br/><br/>

```python
len(ovr_clf.estimators_)

```




    10

<br/><br/>


```python
sgd_clf = SGDClassifier(random_state=42)
sgd_clf.fit(X_train, y_train)
sgd_clf.predict([some_digit])
```




    array(['3'], dtype='<U1')

<br/><br/>

For each instance, you can check it is confidence or not by using decision function, this example is not very confidence about thier result.
```python
sgd_clf.decision_function([some_digit]).round()

```




    array([[-31893., -34420.,  -9531.,   1824., -22320.,  -1386., -26189.,
            -16148.,  -4604., -12051.]])


<br/><br/>

```python
cross_val_score(sgd_clf, X_train, y_train, cv=3, scoring="accuracy")

```




    array([0.87365, 0.85835, 0.8689 ])

<br/><br/>


```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train.astype("float64"))
cross_val_score(sgd_clf, X_train_scaled, y_train, cv=3, scoring="accuracy")
```




    array([0.8983, 0.891 , 0.9018])
<br/><br/>

## Error Analysis
---
To find room for improvement, you need to analysis you result especially error.
<br/><br/>

As you can see, lots of numbers. I think naming was briliant since it make me confuse. 
```python
from sklearn.metrics import ConfusionMatrixDisplay

y_train_pred = cross_val_predict(sgd_clf, X_train_scaled, y_train, cv= 3)
ConfusionMatrixDisplay.from_predictions(y_train, y_train_pred)
plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_51_0.png)
    

<br/><br/>

However by nomalizing, it is seemed less confusing than before. But still has information that we do not care, TP values, hence cut it.
```python
ConfusionMatrixDisplay.from_predictions(y_train, y_train_pred, normalize="true", values_format=".0%")
plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_52_0.png)
    

<br/><br/>

This confusion matrix is nomalized by row, hence it can be interpreted as for each instance in true label, which wrong place it go.
```python
sample_weight = (y_train_pred != y_train)
ConfusionMatrixDisplay.from_predictions(y_train, y_train_pred, sample_weight=sample_weight, normalize="true", values_format=".0%")
plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_53_0.png)
    

<br/><br/>
This time it is nomalized by column, and is interpreted as the model predict as *i* but it was *k*.
```python
ConfusionMatrixDisplay.from_predictions(y_train, y_train_pred,
                                        sample_weight=sample_weight,
                                        normalize="pred", values_format=".0%")
plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_54_0.png)
    

<br/><br/>

```python
cl_a, cl_b = '3', '5'
X_aa = X_train[(y_train == cl_a) & (y_train_pred == cl_a)]
X_ab = X_train[(y_train == cl_a) & (y_train_pred == cl_b)]
X_ba = X_train[(y_train == cl_b) & (y_train_pred == cl_a)]
X_bb = X_train[(y_train == cl_b) & (y_train_pred == cl_b)]

size = 5
pad = 0.2
plt.figure(figsize=(size, size))
for images, (label_col, label_row) in [(X_ba, (0, 0)), (X_bb, (1, 0)),
                                       (X_aa, (0, 1)), (X_ab, (1, 1))]:
    for idx, image_data in enumerate(images[:size*size]):
        x = idx % size + label_col * (size + pad)
        y = idx // size + label_row * (size + pad)
        plt.imshow(image_data.reshape(28, 28), cmap="binary",
                   extent=(x, x + 1, y, y + 1))
plt.xticks([size / 2, size + pad + size / 2], [str(cl_a), str(cl_b)])
plt.yticks([size / 2, size + pad + size / 2], [str(cl_b), str(cl_a)])
plt.plot([size + pad / 2, size + pad / 2], [0, 2 * size + pad], "k:")
plt.plot([0, 2 * size + pad], [size + pad / 2, size + pad / 2], "k:")
plt.axis([0, 2 * size + pad, 0, 2 * size + pad])
plt.xlabel("Predicted label")
plt.ylabel("True label")
plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_55_0.png)
    

<br/><br/>


## Multilabel Classification
---
omit

```python
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
y_train_large = (y_train >= '7')
y_train_odd = (y_train.astype('int8') % 2 == 1)
y_multilabel = np.c_[y_train_large, y_train_odd]
knn_clf = KNeighborsClassifier()
knn_clf.fit(X_train, y_multilabel)
```




    KNeighborsClassifier()


<br/><br/>

```python
knn_clf.predict([some_digit])
```




    array([[False,  True]])

<br/><br/>


```python
y_train_knn_pred = cross_val_predict(knn_clf, X_train, y_multilabel, cv=3)
f1_score(y_multilabel, y_train_knn_pred, average="macro")
```




    0.976410265560605

<br/><br/>


```python
from sklearn.multioutput import ClassifierChain
chain_clf = ClassifierChain(SVC(), cv=3, random_state=42)
chain_clf.fit(X_train[:2000], y_multilabel[:2000])
```




    ClassifierChain(base_estimator=SVC(), cv=3, random_state=42)



<br/><br/>
```python
chain_clf.predict([some_digit])
```




    array([[0., 1.]])

<br/><br/>

## Multioutput Classification
---

omit

```python
np.random.seed(42) 
noise = np.random.randint(0, 100, (len(X_train), 784))
X_train_mod = X_train + noise
noise = np.random.randint(0, 100, (len(X_test), 784))
X_test_mod = X_test + noise
y_train_mod = X_train
y_test_mod = X_test
```

<br/><br/>
```python
plt.subplot(121); plot_digit(X_test_mod[0])
plt.subplot(122); plot_digit(y_test_mod[0])
plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_62_0.png)
    

<br/><br/>

```python
knn_clf = KNeighborsClassifier()
knn_clf.fit(X_train_mod, y_train_mod)
clean_digit = knn_clf.predict([X_test_mod[0]])
plot_digit(clean_digit)
plt.show()
```


    
![png](AI_study_ML_ch3_files/AI_study_ML_ch3_63_0.png)
    

<br/><br/>