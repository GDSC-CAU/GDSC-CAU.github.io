---

title: 가장 쉽고 아름다운 CSS 프레임워크, Tailwind CSS
description: 가장 핫한 CSS 프레임워크인 Tailwind CSS, 무엇이 좋을까요?
slug: why-tailwind-css
img: tailwind.jpeg
category: Front-End
author: Peniel Cho

---

웹 개발에 있어 디자인은 너무 중요한 요소지만, 저희 같은 비- 웹 개발자들에게 디자인은 계륵과 같죠. 기능만 제대로 하는 웹 사이트를 만들어도 충분한데 막상 못생기게 만드려니 아쉽거든요. 그렇다고 각잡고 만드려니 이것저것 건드려야 할 것도 많고, 후에 유지보수하기도 막막하고요. 이를 도와주는 다양한 CSS 라이브러리와 프레임워크가 존재하지만, 저는 Tailwind CSS를 추천드려요.

## Tailwind CSS?

> A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and `rotate-90` that can be composed to build any design, directly in your markup.

[Tailwind css 사이트](https://tailwindcss.com/)에 나와있는 설명입니다. 여기서 중요한 건 Utility-first CSS라는 컨셉인데요, 쉽게 말하면 미리 정의된 CSS 특성들을 class의 형태로 불러와 적용시키는 것입니다.

![general css vs utility first](/why-tailwind-css/01.png)

위 이미지는 일반적인 CSS 코드와 utility-first 컨셉의 Tailwind를 사용했을 때의 코드를 비교한 사진이에요. 보시다시피, Utility-first 컨셉의 Tailwind는 코드의 길이를 엄청나게 줄여주고, 코드의 직관성을 높여줘요.

이 같은 컨셉을 중심으로, Tailwind의 장점들에 대해 알아봅시다.

## Zero 러닝커브

Tailwind를 사용하기로 결정해도 따로 시간을 들여 무언가를 배울 필요는 없어요. npm 혹은 yarn을 통해 패키지만 설치해주고, 원하는 html 요소에 class만 부여해주면 돼요. 필요한 효과들은 그때마다 documentation에 검색해서 쓰면 되고요. 몇번 사용하면 자주 사용하는 class들은 외워지실 거에요. 

![documentation 내 class 예시](/why-tailwind-css/02.png)

다른 css 프레임워크의 경우, 효과들을 좀 더 '쉽게' 설명하는데에 집중하다보니 덜 직관적인 경우가 많아요(개발자보다 디자이너를 고려한 것 같은 class 작명...!). 반면 tailwind는 css의 기본적인 속성들을 알고 있다면 사전 공부 없이도 즉석에서 사용 가능할 정도로 각 class별 기능을 알기 쉽고요. 프로젝트에 tailwind를 도입할 때 가장 큰 이점 중 하나이지 않나 싶습니다.

## 쉬운 Configuration 수정

저 같은 경우, Bootstrap을 비롯해 다양한 css 프레임워크를 사용해봤지만, 원하는 결과물이 나오지 않아 결국 scss로 직접 모든 css 코드를 작성하는 일이 비일비재했어요. 이 중 가장 큰 이유는 Configuration을 수정하는 과정이 복잡했기 때문이에요. 기본 제공 theme 중 마음에 드는 것이 없어 매번 config 수정을 해야 했는데 config 파일이 나눠져 있고 파일 자체도 읽기 복잡하다보니 차라리 내가 직접 치는 게 빠르겠다, 싶었던 거죠.

![보다 간단한 configuration](/why-tailwind-css/03.png)

그치만 Tailwind의 경우는 조금 달랐어요. 일단 기본 css 요소들이 디자인적으로 예뻐서 수정할 필요가 없기도 했고, 수정이 필요할 경우엔 프로젝트 가장 위 디렉토리에 존재하는 tailwind.config.js 파일 내에서 쉽게 수정이 가능했거든요. 추가적으로 class별 config를 수정하는 방법도 개별 페이지마다 적혀 있답니다.

![각 페이지별 존재하는 config 가이드](/why-tailwind-css/04.png)

## 간단한 Responsive Design

![각 뷰포트별 break point](/why-tailwind-css/05.png)

Tailwind의 경우 Responsive 디자인을 위한 미디어쿼리 작성이 매우 간단해요. 보통의 경우 각 뷰포트 별 요소들의 변화를 각각의 css 파일별로 나누어 저장 후 import 하는데, 이 경우 작성하기도 번거롭고 어느 html 요소에 어떤 코드가 적용되는지 찾기가 힘들죠.

![Tailwind 미디어 쿼리 예시](/why-tailwind-css/06.png)

반면 Tailwind의 경우 개별 class가 어떤 뷰포트마다 사용될지를 개별 html 요소가 어떻게 보일지를 class 앞에 사이즈를 지정해주는 보다 직접적인 방식으로 Responsive Design이 이뤄져요. 어떤 요소에 어떤 css 효과가 적용되는지, 어떤 뷰포트에서 해당 요소가 어떻게 보일지 보다 직관적으로 파악이 가능해지는 거죠. 이는 Responsive Design을 위한 코드를 작성할 때 뿐 아니라 추후 유지보수 혹은 협업의 경우 커다란 이점이 돼요.

![실제 예시](/why-tailwind-css/07.png)

실제로 코드를 작성할 때 저 같은 경우엔 모바일과 데스크탑, 두가지로만 뷰포트를 나누어 디자인을 해요. 즉 px을 기준으로 두가지 상황을 가정해 코드를 짜주는 거죠. 그런데 이 경우, 모바일용 코드를 따로 작성해줄 필요는 없어요. Tailwind CSS는 mobile-first 원칙을 갖고 있어, 적어준 유틸리티 클래스들은 모바일용 뷰포트에 바로 적용이 돼요. 즉 Responsive Design을 위해 코드를 작성시, 모바일용 코드를 제외하고 md용 클래스만 따로 적어주면 되는 거죠.



이외에도 Tailwind CSS에는 과하게! 친절한 Documentation과 보다 복잡한 기능들을 간단하게 지원하는(group, group-hover 보고 놀랐어요...) 등의 다양한 장점이 있답니다. 직접 사용해보시면 더욱 와닿으실 거라 생각해요. 더 많은 정보를 위해서는 [공식 문서](https://tailwindcss.com/docs/installation)를 참고해주세요.

다음 포스팅에서는 Nuxt 프로젝트에 Tailwind CSS를 설치하여 사용하는 방법에 대해 알아보도록 할게요.

> 본 포스팅은 [PENIELog](https://www.blog.penielcho.com/)의 아티클을 재포스팅한 것입니다.