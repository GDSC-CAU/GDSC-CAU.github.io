---

title: 프로젝트에 Tailwind CSS 적용하기
description: 프로젝트에 Tailwind CSS를 적용하는 방법을 Nuxt 프레임워크를 중심으로 알아봐요.
slug: tailwind-on-nuxt
img: tailwind.jpeg
category: Front-End
author: Peniel Cho
featured: none

---


[지난 포스트](https://www.blog.penielcho.com/tailwind-on-nuxt)에서는 왜 Tailwind가 좋은지에 대해 알아봤다면, 이번엔 실제 프로젝트에 Tailwind CSS를 어떻게 적용하는지에 대해 알아볼게요. Tailwind는 다양한 프로젝트에 versatile하게 사용할 수 있는 프레임워크지만, 오늘은 제가 요즘 가장 많이 사용하고 있는 Vue 프레임워크인 Nuxt 환경을 기반으로 Tailwind CSS 사용법을 말씀드리도록 할게요. 사실 Nuxt라고 해도 다른 프레임워크들과 크게 다르지 않을 거에요.

![Tailwind 지원 프레임워크](/tailwind-on-nuxt/01.png)

추가로, Tailwind CSS가 공식적으로 지원하는 프레임워크 및 툴은 이렇게 6가지에요. 각 프레임워크, 툴 별 설치 방법을 알고 싶다면 [공식 문서](https://tailwindcss.com/docs/installation)를 참고해주세요.

## 설치 

### 프로젝트 생성시 설치하기

![npx를 통한 tailwind 설치](/tailwind-on-nuxt/02.png)

Nuxt의 경우, 프로젝트를 만들 때 1차적으로 tailwind css를 설치할 수 있어요. 터미널에  `npx create-next-app`  명령어를 쳐서 프로젝트를 생성하면, 어떤 라이브러리와 프레임워크들을 함께 설치할지를 물어보거든요. 이때 Tailwind CSS를 선택해주시면 돼요.

### 존재하는 프로젝트에 설치하기

만약 이미 생성된 프로젝트에 Tailwind CSS를 적용하고 싶다면, npm을 통해 패키지를 설치해주면 돼요. 해당 프로젝트의 디렉토리에서 터미널을 연 후, 아래 명령어를 입력해주세요.

```shell
npm install -D @nuxtjs/tailwindcss tailwindcss@latest postcss@latest autoprefixer@latest
```

설치가 완료되었다면, nuxt.config.js 파일에서 tailwind를 모듈로 지정해주어야 돼요.

```javascript
// nuxt.config.js
export default {
  buildModules: ['@nuxtjs/tailwindcss']
}
```

이렇게 하면 설치는 완료입니다.

## Config 파일 생성 및 커스터마이징

### Config 파일 생성하기

다만, Tailwind CSS를 사용하면서 커스터마이징이 필요한 부분들이 있어요. 좀 더 개성있는 색상을 원한다거나, 폰트 크기를 더욱 세부적으로 조절한다거나 하는 부분에서요. 이를 위해서는 Tailwind 자체의 configuration 파일이 필요한데, configuration 파일의 생성은 아래 명령어를 통해 가능해요.

```shell
npx tailwindcss init
```

### Config 파일을 통해 유틸리티 클래스 커스터마이징하기

실제로 configuration 파일을 통해 커스터마이징을 하는 예시를 보여드릴게요. Tailwind CSS에서 폰트의 크기는 `text-어쩌구`의 형식의 class로 결정돼요. 이때 configuration 파일의 수정을 통해서 기존 유틸리티 클래스에 설정된 폰트 크기를 수정할 수도 있고, 새로운 유틸리티 클래스를 만들 수도 있어요. 아래의 예시를 봐주세요. 원래 Tailwind CSS의 유틸리티에 tiny라는 클래스는 존재하지 않아요. 다만 sm은 너무 작게 느껴지고, base는 너무 크게 느껴질 경우 그 사이에 위치하는 새로운 크기의 'tiny'라는 이름의 클래스를 만들 수 있는 거죠. 기존 클래스에 할당된 기능을 수정할 수도 있어요. 폰트의 크기에 있어 text-6xl의 경우, 원래 4rem의 크기를 가져요. 그치만 configuration 파일에서 제가 5rem으로 정의해버리면, text-6xl 클래스가 부여된 html 요소들은 5rem의 크기를 갖게 되는 거죠.

```javascript
  // tailwind.config.js
  module.exports = {
    theme: {
      fontSize: {
       'xs': '.75rem',
       'sm': '.875rem',
       'tiny': '.89rem',
       'base': '1rem',
       'lg': '1.125rem',
       'xl': '1.25rem',
       '2xl': '1.5rem',
       '3xl': '1.875rem',
       '4xl': '2.25rem',
       '5xl': '3rem',
       '6xl': '5rem',
      }
    }
  }
```

## Tailwind Typography 설치 및 적용

제가 최근 만들고 있는 Nuxt 사이트들의 대부분은 블로그에요. md 파일을 업로드하면 자동으로 라우팅 경로를 만들어 해당 md 파일이 하나의 아티클 페이지가 되죠. 이 경우, 개별 마크다운 파일 혹은 마크다운 내의 태그 요소들을 하나하나 꾸밀 수 없기에 이미 만들어진 디자인을 적용하면 편해요. 이럴 때 사용할 수 있는 것이 Tailwind Typography에요. 쉽게 말해 md 파일을 styling 해주는 모듈이죠.

### 설치

```shell
# Using npm
npm install @tailwindcss/typography

# Using Yarn
yarn add @tailwindcss/typography
```

Npm, Yarn 중 편한 툴을 사용해서 설치해주세요.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

설치가 완료되었다면 tailwind.config.js 파일에서 typography 모듈을 추가해주세요.

```html
<nuxt-content :document="article" class="prose max-w-3xl custom-text px-6"/>
```

Tailwind Typography를 적용하는 방법은 엄청 쉬워요. 다른 유틸리티 클래스들처럼 적용을 원하는 태그에 prose라는 클래스를 부여만 해주면 된답니다. 그럼 헤딩부터 bullets, code block 등등 블로그에서 사용하는 태그들을 자동으로 스타일링 해줘요.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

그치만, 여전히 맘에 안 드는 부분이 있을 수 있죠. 이 경우 Typography 역시 Tailwind CSS 처럼 tailwind.config.js 파일에서 커스터마이징이 가능해요. 위는 a 태그의 기본 색상과 hover시의 색상을 설정하는 코드에요. 더 많은 커스터마이징 예시를 보고 싶다면 [Tailwind Typography 공식 문서](https://github.com/tailwindlabs/tailwindcss-typography)를 참고해주세요.



기본적인 설치 및 적용 방법은 끝났습니다. 그럼 이제 직접 프로젝트에 적용해볼까요?

> 본 포스팅은 [PENIELog](https://www.blog.penielcho.com/)의 아티클을 재포스팅한 것입니다.