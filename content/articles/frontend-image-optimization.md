---
title: 웹페이지에서 이미지 파일들을 어떻게 최적화할까요?
description: 이미지 파일을 최적화 하여 웹페이지의 로딩시간을 줄여봅시다/
slug: frontend-image-optimization
category: Front-End
author: IlSang Park
---

웹 개발을 하다보면 디자인 소스 파일들을 다운로드하여 페이지를 구성해야할 일이 생기곤 합니다. 디자인 소스 파일의 압축을 해제하면 `image@1x.png`, `image@2x.png`, `image@3x.png` 와 같이 파일이 나누어져 있습니다. 저는 이런 경우에 지금까지 가장 해상도가 높은 이미지를 사용해왔습니다. 해상도가 낮은 이미지를 사용할 경우, 개발환경에서 이미지 파일이 깨지면서 웹페이지의 완성도가 떨어지는 느낌이 들었기 때문입니다.

그런데 사용자 경험을 높이는 방법에 대해서 고민하고 공부하다보니, 웹페이지의 완성도도 중요하지만 실제 서비스를 이용하는데 웹페이지의 로딩시간이 길어지면 길어질수록 사용자 이탈률은 급격하게 높아진다는 사실을 알게 되었습니다.

아래의 그림은 모바일 페이지에서 로딩시간에 따른 사용자 이탈율 (출처 : [Google](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/))을 나타낸 그림입니다. 

![모바일 페이지에서 로딩시간에 따른 사용자 이탈율](/frontend-image-optimization/01.png)


그런 관점에서 생각해보니 해상도가 높은 이미지 파일은 용량이 크기 때문에 웹 페이지를 느리게 하고 이는 사용자의 이탈로 연결될 것이라는 생각이 들었습니다. 그렇다면 항상 해상도가 높은 이미지를 사용하는 것이 좋은 것이 아니지 않을까요?

그래서 이미지 파일이 `@1x`, `@2x`, `@3x` 로 나누어져 있는 이유가 이러한 이유와 연관이 있지 않을까 생각해서 알아보면서 **웹페이지에서의 이미지 파일 최적화**에 대해서 공부하게 되었습니다.

## 🌄 웹 페이지에서의 이미지 파일

이미지 파일은 웹페이지에서 높은 용량을 차지하기 때문에, 이미지 파일의 해상도가 높아지고 이미지 파일이 많아질수록 웹페이지는 느려집니다. 따라서 이미지 파일을 최적화한다면 사용자에게 빠른 속도로 서비스를 제공할 수 있지 않을까요?

이미지를 최적화하는 방법은 여러가지가 있습니다.

- 이미지를 압축하여 사용합니다.
- Lazy Load를 통해서 지연 로딩하여 사용합니다.
- webp포맷 이미지 파일을 사용합니다.
- 이미지 크기를 최적화합니다.
- 반응형 이미지를 사용합니다.

## 이미지 압축하여 사용하기

웹페이지에서 이미지 파일을 최적화하는 가장 간단한 방법은 이미지를 압축하여 용량을 줄이는 것입니다. 하지만 이미지를 압축하여 사용하는 것은 이미지의 품질이 저하될 수 있기 때문에 주의하여 사용해야 합니다. [https://compressjpeg.com](https://compressjpeg.com/) 등 이미지를 압축해주는 다양한 웹페이지들이 있고, 필요한 확장자에 맞게 적절히 이미지 파일을 압축하여 사용할 경우 웹 페이지의 로딩 시간을 줄일 수 있을 것입니다.

## Lazy Loading

또한, 이미지를 최적화하여 웹 페이지의 로딩 시간을 줄이는 방법으로는 **Lazy Loading**을 꼽을 수 있습니다. Lazy Loading이 무엇일까요? 사용자가 웹페이지에 접속하면 전체 페이지의 내용이 다운로드되어 브라우저에 페이지가 렌더링 되는데, 사용자가 필요하지 않을 때에는 placeholder 콘텐츠로 Load되고 사용자가 해당 콘텐츠를 필요로 할 때 Load하는 방법입니다.

Lazy Loading을 사용할 경우 다양한 장점들이 생깁니다. 초기 로딩시에 Load할 데이터가 줄어들면서 로딩시간이 줄어들고, 유저가 웹페이지를 중간에 이탈하면 읽지 않은 부분의 이미지는 Load되지 않아 방문자의 데이터뿐만 아니라 서버의 트래픽도 보호할 수 있습니다.

Lazy Loading은 `IntersectionObserver()`와 같은 함수를 사용하여 구현할 수 있습니다. 이 게시글에서는 구현 방법에 대해서 구체적으로 언급하지는 않겠습니다.

## Webp 파일은 뭔데?

Webp파일은 JPEG 혹은 PNG보다 용량이 작은 이미지 파일으로, 동일한 이미지의 JPEG 혹은 PNG보다 일반적으로 25~35% 용량이 작습니다. 그렇다면 당연히 Webp를 사용하는 것이 좋겠죠?

하지만 Webp 파일에도 문제가 있습니다. 바로 최신 이미지 포맷이기 때문에 지원하지 않는 브라우저도 존재한다는 점입니다. 따라서 `<picture>` 태그를 활용하여 오래된 browser에서도 사용할 수 있도록 활용해야 합니다. 그리고 srcset 또한 오래된 브라우저에서는 지원하지 않을 수 있기 때문에 `<picture>` 태그의 마지막에는 img 태그를 활용하여 지원할 수 있도록 하는 것이 좋습니다.

```html
<!-- Webp 이미지 사용 X -->
<img src="example.jpg" alt=""/>

<!-- Webp 이미지 사용 O -->
<picture>
  <source type="image/webp" srcset="example.webp">
  <source type="image/jpeg" srcset="example.jpg">
  <img src="example.jpg" alt="">
</picture>
```

## 반응형 이미지가 왜 필요할까?

데스크탑에서 사용하는 이미지 파일을 모바일 장치에 제공할 경우, 필요한 것보다 2~4배 더 많은 데이터를 사용할 수 있습니다. 보통의 휴대폰 화면이 480px을 넘지 않는 경우가 대부분인데, 4096px의 이미지를 모바일로 본다면 어떨까요?

4096px의 데이터를 불러와야 하지만, 실제로 우리 눈에는 480px만 보이기 때문에 이것은 매우 비효율적인 방법일 것 같지 않나요? 그래서 **반응형 이미지를 통해서 화면의 크기에 따라 다른 크기의 이미지를 제공하는 솔루션을 사용**합니다.

img 태그를 사용하여 반응형 이미지를 사용할 경우 아래와 같이 사용할 수 있습니다.

```html
<img 
	src="example@3x.jpg" 
	srcset="example@1x.jpg 480w, example@2x.jpg 768w, example@3x.jpg 1024px"
	sizes="50vw"
/>
```

`src` 속성의 경우, `srcset` 및 `sizes` 속성을 지원하지 않는 경우에서 작동할 image를 작성합니다. 그리고 `srcset` 경우, image와 image의 너비를 작성하게 됩니다. 그리고 `sizes`의 경우, 브라우저에 표시할 이미지의 크기를 나타냅니다. 하지만 이 크기 속성은 표시 크기에 영향을 주지 않기 때문에 표시할 사이즈를 변경하고 싶을 경우 CSS를 사용해야 합니다.

그럼 이번에는 webp 파일에서 사용한 것과 같이 `<picture>` 태그를 사용하여 봅시다.

```html
<picture>
	<source
		media="(min-width: 1280px)"
		sizes="50vw"
		srcset="example@1x.webp 200w,
						example@2x.webp 400w,
						exapmle@3x.webp 800w"
		type="image/webp">
	<source
		sizes="(min-width: 768px) 50vw, 100vw"
		srcset="example@1x.webp 200w,
						example@2x.webp 400w,
						example@3x.webp 800w"
		type="image/webp">
	<source
		media="(min-width: 1280px)"
		sizes="50vw"
		srcset="example@1x.jpg 200w,
						example@2x.jpg 400w,
						example@3x.jpg 800w"
		/>
	<img
		src="example@3x.jpg" alt="example"
		sizes="(min-width: 768px) 60vw, 100vw"
		srcset="example@1x.jpg 200w,
						example@2x.jpg 400w,
						example@3x.jpg 800w">
</picture>
```

약간 복잡해 보이긴 하지만 이런 방법을 통해서 이미지를 최적화 할 수 있을 것 입니다.

## 앞으로는

“웹페이지를 예쁘게만 만들면 괜찮지 않을까?”하는 생각에서 사용했던 이미지들이 실제로 페이지의 로딩 시간에 영향을 미쳐 사용자 경험을 저하시킬 수 있다는 것을 알게 되었습니다. 물론 이미지 뿐만 아니라 다양한 요소들이 웹 페이지의 로딩 시간에 영향을 미치겠지만, 실제로 웹페이지에서 가장 많이 사용하는 콘텐츠 데이터는 이미지 파일이기 때문에 이미지 파일을 최적화 하는 것은 매우 중요할 것입니다. 앞에서 알아본 다양한 웹 페이지에서의 이미지 최적화 방법들을 잘 알고 사용해보도록 합시다. :)

## 참고자료

[https://web.dev/serve-images-webp/](https://web.dev/serve-images-webp/)

[https://web.dev/serve-responsive-images/](https://web.dev/serve-responsive-images/)
