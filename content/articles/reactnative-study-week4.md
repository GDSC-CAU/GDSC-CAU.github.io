---
title: Reactnative 스터디 4주차
description: TODO-LIST의 기능 구현
slug: reactnative-study-week4
category: Application
author: Kyunghun Kim
featured: none
---

## Reactnative 스터디 4주차

4주차는 지난주에 이어 TODO LIST의 세부 기능을 구현하였습니다.

### Async-storage

기존 TODO LIST는 종료할때마다 모든 정보가 초기화된다는 문제점이 있었습니다.  
async-storage 라이브러리를 사용하면 로컬 저장소와 정보를 동기화해 이를 해결할 수 있습니다.  
이제 Task의 정보를 async-storage를 이용해 로컬 저장소에 저장할 수 있습니다.  
![async-storage](/reactnative-study-week4/store.png)

### Task 기능 구현

- **IconButton**

  TODO LIST에서 Task는 완료, 수정, 삭제가 되어야 합니다.  
  이러한 기능들의 실행을 인터페이스로 제공하고자 아이콘을 화면에 출력해주는 IconButton 컴포넌트를 React Native의 TouchableOpacity를 통해 구현하였습니다.

```javascript
const IconButton = ({ icon, onPress, item }) => {
  const _onPress = () => {
    onPress(item.id);
  };
  return (
    <TouchableOpacity onPress={_onPress}>
      <View>
        <Icon source={icon} completed={item.completed}></Icon>
      </View>
    </TouchableOpacity>
  );
};
```

- **Task 추가**

  유저가 입력한 text를 새 Task로 추가하는 기능을 구현해야 합니다.  
  이전에 언급한 useState와 Setter함수를 통해 받은 새 Task를 저장합니다.  
  이때 Task의 ID값은 고유의 값이어야 하므로, 타임스탬프를 통해 지정합니다.

```javascript
const addTask = () => {
  if (newTask.length < 1) {
    return;
  }
  const ID = Date.now().toString();
  const newTaskObj = {
    [ID]: { id: ID, text: newTask, compledted: false },
  };
  setNewTask("");
  storeData({ ...tasks, ...newTaskObj });
};
```

- **Task 완료**

  Task의 완료를 체크하는 기능은 미완료시 빈체크박스를, 완료시 체크된 체크박스 아이콘을 불러오는 형태로 구현할 수 있습니다.

```javascript
const toggleTask = (id) => {
  const currentTasks = Object.assign({}, tasks);
  currentTasks[id]["completed"] = !currentTasks[id]["completed"];
  storeData(currentTasks);
};
```

Task가 완료인지 아닌지를 completed 값을 통해 전달하여 완료 상태이면 check 아이콘이, 미완료 상태이면 uncheck 아이콘을 출력하도록 하였습니다.

```javascript
<IconButton
  icon={item.completed ? icons.check : icons.uncheck}
  item={item}
  onPress={toggleTask}
/>
```

- **Task 삭제**

  Task의 삭제는 특정 Task의 삭제 IconButton을 클릭하면 기존 Task 정보에서 해당 Task의 값을 제거하도록 구현할 수 있습니다.

```javascript
const deleteTask = (id) => {
  const currentTasks = Object.assign({}, tasks);
  delete currentTasks[id];
  storeData(currentTasks);
};
```

- **Task 수정**

  Task의 수정 IconButton을 클릭하면, isEditing 값을 true로 변경하여 해당 Task가 새로운 text를 입력받도록 구현합니다. 이때 이미 완료처리된 Task, 즉 completed값이 true인 경우엔 수정 IconButton이 렌더링 되지 않도록 하였습니다.  
  ![task update](/reactnative-study-week4/update.png)

```javascript
const updateTask = (item) => {
  const currentTasks = Object.assign({}, tasks);
  currentTasks[item.id] = item;
  storeData(currentTasks);
};
```

이때 이미 완료처리된 Task, 즉 completed값이 true인 경우엔 수정 IconButton이 렌더링 되지 않도록 하였습니다.

```javascript
{
  item.completed || (
    <IconButton icon={icons.edit} onPress={() => setIsEditing(true)} />
  );
}
```

- **Task 컴포넌트**

  App.js에서 Task 컴포넌트를 통해 수정, 삭제 등의 아이콘과 기능이 모두 구현된 Task 한 줄을 불러올 수 있도록 구현합니다.

```javascript
<Container>
  <IconButton
    icon={item.completed ? icons.check : icons.uncheck}
    item={item}
    onPress={toggleTask}
  />
  <Contents completed={item.completed}>{item.text}</Contents>
  {item.completed || (
    <IconButton icon={icons.edit} onPress={() => setIsEditing(true)} />
  )}
  <IconButton icon={icons.delete} item={item} onPress={deleteTask} />
</Container>
```

Task의 IconButton 추가 및 기능 구현을 통한 렌더링은 다음과 같습니다.

![screen]](/reactnative-study-week4/screen.png)
