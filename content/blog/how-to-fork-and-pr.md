---

title: "[공지] 포크부터 풀리퀘까지"
description: 프로필, 아티클 작성 등 블로그 관련 작업을 어떻게 오리지널 레포지토리에 적용시키는지에 대해 안내 드립니다.
slug: how-to-fork-and-pr
img: git.png
category: General
author: Peniel Cho
featured: Featured

---

> 블로그 관련 작업을 어떻게 오리지널 레포지토리에 적용시키는지에 대해 안내 드립니다.

Pull Request를 날리는 것이 익숙하지 않으신 분들을 위해, 아래 Fork부터 Pull Request를 날리는 과정까지를 짚어드리겠습니다. 본 과정이 익숙하신 분들은 바로 5번 유의사항만 봐주시면 됩니다.

## 포크부터 풀리퀘까지의 과정

### 1. 레포지토리를 포크합니다.

![오리지널 레포지토리 사진](/how-to-fork-and-pr/01.png)

우측 상단에 있는 fork 버튼을 눌러, 자신의 깃헙 계정으로 GDSC-CAU.github.io 레포지토리를 포크해주세요.

![포크된 레포지토리 사진](/how-to-fork-and-pr/01-1.png)

포크가 완료되면 위와 같이 자신의 계정명 / 레포지토리명이 보이며, 그 바로 아래에 어디서 포크되었는지의 정보가 뜹니다.

### 2. 포크한 레포지토리를 로컬에 클론합니다.

![URL 복사하기](/how-to-fork-and-pr/02.png)

자신의 계정 내에 포크된 레포지토리가 생성되었다면, 해당 레포지토리를 로컬에 클론해주어야 해요. 우측 상단의 code를 눌러 레포지토리의 HTTPS URL을 복사해주세요.

![로컬에 클론해오기](/how-to-fork-and-pr/03.png)

터미널(GUI 사용하셔도 무방합니다)을 통해 클론할 위치로 이동해주세요. 원하는 장소에 클론 명령어를 통해 포크된 레포지토리를 클론해줍시다. 저는 폴더를 만들고 클론하는 걸 선호해서, 미리 폴더 생성 후 clone 명령어 뒤 점을 찍어 최상위 폴더를 제외한 파일들만 클론해왔어요.

### 3. 로컬에서 작업 후 포크된 레포지토리에 커밋을 날립니다.

클론을 마쳤다면, 열심히 작업을 해줍시다. 작업에 관련된 내용은 [아티클 작성 방법](https://gdsc-cau.github.io/how-to-write-article)과 [프로필 작성 방법](https://gdsc-cau.github.io/how-to-set-up-my-profile) 두 아티클에서 확인 가능합니다. 

![add, commit, push](/how-to-fork-and-pr/04.png)

작업이 완료됐다면 커밋을 날려줍시다.

### 4. 포크된 레포지토리에서 오리지널 레포지토리로 풀리퀘를 날립니다.

![풀리퀘 열기](/how-to-fork-and-pr/05.png)

푸시까지 완료되었다면 깃헙의 포크된 레포지토리로 돌아와주세요. 오리지널 레포지토리의 main 브랜치보다 1 commit ahead한 상태라고 나와있네요. 포크된 레포에 저희가 방금 커밋을 적용했으니까요. 오리지널 레포에도 커밋을 적용시켜주기 위해 Pull Request를 날려줍시다. 우측 상단의 contribute 버튼을 눌러주신 후, open pull request를 눌러주세요.

![풀리퀘 열기](/how-to-fork-and-pr/06.png)

커밋 내용 확인해주시고, create pull request 눌러주세요.

![리뷰어 지정](/how-to-fork-and-pr/07.png)

커밋 관련 코멘트를 남기고 싶다면 적어주시고, 리뷰어를 지정해주셔야 합니다. 우측에 보면 reviewers란이 있는데, 톱니바퀴를 눌러 reviewer 지정이 가능합니다. 여기서 thepenielcho와 heeming 두 사람을 지정해주세요. 까먹으시면 안됩니다!

![create pull request 누르기](/how-to-fork-and-pr/08.png)

자, 두 사람을 누르면 위와 같이 reviewers에 해당 코어멤버들이 지정되었다고 표시될 거에요. 저(thepenielcho)는 제 계정으로 작업 중이라 본인을 reviewer로 지정할 수 없는 상태입니다ㅠ 때문에 사진엔 희민님(Heeming)만 뜨지만, 실제로 여러분이 풀리퀘를 날려주실 땐 저도 같이 적어주셔야 합니다! Reviewers 지정까지 마치셨다면, create pull request를 눌러주시면 돼요.

### 5. 절대! 직접 Merge하지 말아주세요.

다만 주의하셔야 할 게, Merge를 누르시면 안 된다는 거에요.

![머지 안하기](/how-to-fork-and-pr/09.png)

Create pull request를 누르시면 위와 같은 check가 돌아가며 Merge 버튼이 뜰텐데, 그냥 두시고 나와주시면 됩니다. 여러분이 하실 일은 여기서 끝! 나머지는 Reviewers로 지정된 저와 희민님이 conflict요소나 버그 유무를 확인하고 머지 혹은 코멘트하여 풀리퀘를 클로즈할 예정입니다.

## 추가 당부 사항

### 작업 및 PR 전에 Fetch and Merge, Pull 꼭 확인합시다!

다른 사람들과의 작업이 겹쳐서 Conflict가 발생하는 걸 막기 위해, 작업 및 PR 전 오리지널 레포의 커밋들을 받아오는 게 좋습니다.

![fetch and merge](/how-to-fork-and-pr/10.png)

포크된 레포와 오리지널 레포가 동일한 상태가 아닐 경우, 뒤쳐진 커밋들을 Fetch and Merge를 통해 모두 받아와주세요.

![업데이트 확인](/how-to-fork-and-pr/11.png)

Fetch and Merge가 완료된 경우 포크된 레포 상태가 최신으로 업데이트 되었다고 나타납니다.

![pull로 받아오기](/how-to-fork-and-pr/12.png)

커밋을 받아온 건 온라인이니, 로컬로도 커밋들을 받아와야겠죠? 터미널에서 pull 명령어를 통해 해당 변화들을 받아와주세요. 이렇게 레포 상태를 맞춘 후 작업 및 PR을 진행하시면 보다 쾌적하게 작업하실 수 있습니다.

### Checks Failed는 정상적이니 신경쓰지 않으셔도 됩니다!

![checks failed](/how-to-fork-and-pr/13.png)

Create Pull Request를 했는데 Checks Failed가 떠서 당황스러우실 수 있어요. 그런데 이는 로컬이 아닌 온라인에서 build 및 deploy시 필요한 토큰이 Organization 레포지토리에서만 발급이 되어서 그래요.

![yml 파일](/how-to-fork-and-pr/14.png)

즉 여러분의 PR Check는 여러분의 레포 브랜치에서 돌아가는데 해당 레포에서는 토큰이 발급되지 않기 때문에 Deploy Permission 버그가 발생하는 거죠.

![actions 실행 로그](/how-to-fork-and-pr/15.png)

실제로 Check Fail 유무와 상관없이 Merge 후엔 정상적으로 Build & Deploy되니 걱정마세요!