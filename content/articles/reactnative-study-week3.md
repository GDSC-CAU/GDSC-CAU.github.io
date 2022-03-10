---
title: React Native 스터디 3주차
description: ThemeProvider, State 등 다양한 기능을 사용한 TODO-LIST
slug: reactnative-study-week3
category: Application
author: Eunsol Kim
featured: none
---

## React Native 스터디 3주차

### 배웠던 내용 복습

- **ThemeProvider** : 스타일드 컴포넌트를 사용할 때 ThemeProvider로 theme를 지정하면, 하나의 파일에서 지정해 놓은 색을 다른 컴포넌트에서 사용할 수 있어 편리합니다. 

또한, theme의 색상을 한 파일에서 관리하므로 유지 보수가 편리합니다.

```javascript
export const theme = {
    background: '#101010',
    itemBackground: '#313131',
    main: '#778bdd',
    text: '#cfcfcf',
    done: '#616161',
};
```

- **PropTypes** : props의 타입과 필수 여부를 확인할 수 있습니.

```javascript
Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
};
```

- **State(상태)** : 컴포넌트에서 변화할 수 있는 값입니다.

상태(State)가 변화하면 컴포넌트가 다시 렌더링됩니다.

아래는 state를 사용한 todo-list 예제입니다.

```javascript
const [newTask, setNewTask] = useState('');
    const _addTask = () => {
        alert(`Add: ${newTask}`);
        setNewTask('');  // 초기화 해주는 거 
    };
    const _handleTextChange = text => {
        setNewTask(text);  // 텍스트 변할 때마다 저장
    };
```

useState를 사용하면 상태 관리 변수와 Setter 함수를 배열로 반환할 수 있습니다.

상태 변수는 Setter 함수로 변경되어야 합니다.

### 프로젝트 시작하기

- **ThemeProvider** : ThemeProvider를 이용하여 todolist의 전체 theme를 지정합니다.

스타일을 지정할 때 미리 지정한 색을 사용하면, 컴포넌트마다 일일이 색을 지정할 필요 없이 편리하게 사용할 수 있습니다.

작성된 App 컴포넌트를 src 바깥의 App.js 파일을 변경하여 메인 파일로 만듭니다.

![ThemeProvider 설정 이미지](/reactnative-study-week3/01.png)

- **Title 컴포넌트 만들기** : TO DO LIST라는 글자를 화면 최상단에 표시하기 위한 Title 컴포넌트를 만듭니다.

title 컴포넌트의 color (폰트 색상)에 theme.js의 값이 사용된 것을 볼 수 있습니다. 

![Title 컴포넌트 설정 이미지](/reactnative-study-week3/02.png)

![Title 컴포넌트 앱 화면](/reactnative-study-week3/01-1.png)

안드로이드 화면에서 TO DO LIST가 보이게 되는데, 일부가 상태 바에 가려져 있습니다. 

#### SafeAreaView

SafeAreaView는 아이폰 11 처럼 노치 디자인이 있는 기기에서 자동으로 padding 값을 적용해주는 컴포넌트입니다.

#### StatusBar

안드로이드 화면에서 Title 컴포넌트가 상태 바에 일부 가려져 있습니다. 

앱의 배경색을 어두운 색으로 설정하면서 상태바의 내용이 제대로 안 들어와서 발생한 문제로, 상태바의 내용을 흰색으로 보이도록 수정합니다.

```javascript
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
                <Title>TO DO LIST</Title>
            </Container>
        </ThemeProvider>
    )
}
```

barStyle의 light-content 값은 상태바의 내용을 흰색으로 보이게 하는 것입니다.
backgroundColor 속성은 안드로이드에서만 적용됩니다.

### Dimensions

컴포넌트의 양 옆에 공백을 주고 싶은데, 모든 기기에서 동일하게 좌우 공백을 주고 싶다면 Dimensions를 사용하면 됩니다.

Dimensios는 처음 값을 받아왔을 때의 크기로 고정되므로, 이벤트 리스너를 등록해서 크기 변화에 대응할 수 있도록 만들 수 있습니다.

![Dimensions](/reactnative-study-week3/03.png)

### 컴포넌트에 attrs 사용하기

Input 컴포넌트를 만들고, attrs를 이용해서 theme에 정의된 색상을 전달받은 props의 색으로 설정합니다.

![Input 컴포넌트](/reactnative-study-week3/04.png)

이때, TextInput 컴포넌트의 경우, 기본 값으로 첫 글자가 대문자로 나타나며 오타 입력 시 자동 수정되는 속성이 부여되어 있습니다. 
(iOS의 경우, 완료 버튼이 return으로 되어 있습니다.)

이를 변경하기 위해 속성을 일부 변경했습니다.

![Input 컴포넌트 속성 변경](/reactnative-study-week3/04-1.png)

속성을 다음과 같이 변경하면 자동 대문자 변환, 자동 수정 기능을 사용하지 않습니다.
또한 키보드의 완료 버튼을 설정하는 returnKeyType을 'done'으로 변경했습니다.