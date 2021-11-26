---
title: Reactnative 스터디 2주차
description: 스타일과 flexbox
slug: reactnative-study-week2
category: Application
author: Kyunghun Kim
featured: none
---

## Reactnative 스터디 2주차

### 스타일

- **style** : 리액트네이티브의 컴포넌트는 style 프롭을 갖습니다.

style 객체의 속성들을 수정하여 컴포넌트를 스타일링 할 수 있습니다.

```javascript
<Text style={{ color: "red", backgroundColor: "blue" }}>인라인</Text>
```

- **StyleSheet** : StyleSheet.create로 보다 깔끔하게 정리하여 담아쓸 수 있습니다.

```javascript
export const styles = StyleSheet.create({
  errorText: {
    backgroundColor: "black",
    color: "red",
    fontSize: 20,
  },
  text: {
    color: "orange",
  },
});
```

- **style에 배열객체를** : style 프롭으로 배열객체를 넣을 수 있습니다.

이 때, 배열의 index가 높을수록 더 높은 우선 순위를 갖습니다.

```javascript
<Text style={[styles.errorText, styles.text]}>배열 객체</Text>
```

![style 이미지](/reactnative-study-week2/01.png)

StyleSheet로 styles에 담은 errorText와 text를 배열을 통해 Text에 적용시켰습니다.  
이때 styles.text의 우선순위가 더 높기 때문에 color: "orange"가 적용되었습니다.

- **styled-component** : 더 직관성있는 코드 작성을 도와주는 라이브러리입니다.

camel casing이 아닌 Tagged Template Literals 문법을 사용하여 웹표기 방식과 동일합니다.

[styled-component](https://styled-components.com/)

```
const StyledText = styled.Text`
  color: palevioletred;
`
```

- **shadow** : shadow 속성을 통해 컴포넌트에 그림자 효과를 부여할 수 있습니다.

```javascript
shadow:{
        backgroundColor:"white",
        height: 200,
        width: 200,
        shadowColor: "black",
        shadowOffset:{
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius:10,
        elevation: 20,
    },
```

![shadow 이미지](/reactnative-study-week2/02.png)

shadow 설정 방식은 아이폰과 안드로이드 두 플랫폼에서 차이가 있습니다.  
안드로이드의 경우, elevation 속성을 통해 shadow 효과를 지정합니다.  
이때 Platform.select 기능을 사용하면 두 플랫폼에서 각각 실행될 코드를 지정할 수 있습니다.

### Flexbox

- **flex** : 컴포넌트의 컨테이너 안에서의 크기를 비율로 설정할 수 있습니다.

```javascript
<Box style={{backgroundColor:'red', flex: 1}}/>
<Box style={{backgroundColor:'green', flex: 1}}/>
<Box style={{backgroundColor:'blue', flex: 1}}/>
```

![flex 이미지](/reactnative-study-week2/03.png)

빨강, 초록, 파랑 박스를 flex를 통해 1:1:1의 비율로 지정하였습니다.

#### **flexbox 아이템 정렬방식설정**

```
container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#fff',
      alignItems: 'center',
      //flexDirection 수직방향
      justifyContent: 'center',
      //flexDirection 방향
    },
```

- **flexDirection** : 아이템이 쌓이는 방향을 지정합니다.  
  일반적으로 column이 세로, row가 가로배치입니다.
- **alignItems** : flexDirection의 수직방향 정렬 방식을 지정합니다.  
  ![allignItems 이미지](/reactnative-study-week2/03-1.png)
- **justify-content** : flexDirection 방향 정렬 방식을 지정합니다.  
  ![justify-content 이미지](/reactnative-study-week2/04.png)
