# CLAUDE.md
# 이 파일은 이 저장소의 코드를 작업할 때 Claude Code (claude.ai/code)가 따라야 할 가이드라인을 제공합니다.

## 프로젝트 개요
이 프로젝트는 한국 화장품(K-Beauty)을 멕시코 고객에게 판매하는 이커머스 웹사이트의 프론트엔드 폴더입니다.
애플리케이션은 스페인어 기반으로 뷰티 제품을 소개하며,
브랜드명은 “KMUA (Korea Mua)” 입니다.

프로젝트는 Create React App(CRA)을 기반으로 하며,
스타일링은 CSS-in-JS 라이브러리인 Aphrodite를 사용합니다.

## 기술스택
 - Frontend: React, JavaScript, Aphrodite
 - Backend: Spring boot, Java
 - Database: MySQL

## 개발 명령어

### 애플리케이션 실행
```bash
yarn start
```
# http://localhost:3000 에서 개발 서버 실행

### 테스트
```bash
yarn test
```
# 인터랙티브 watch 모드로 테스트 실행
```bash
yarn test --coverage
```
# 테스트 커버리지 리포트 생성

### 빌드
```bash
yarn build
```
# build/ 폴더에 프로덕션용 빌드 생성

## 아키텍처

### 스타일링 방식
이 프로젝트는 일반 CSS 파일을 사용하지 않고
Aphrodite(CSS-in-JS)만 사용합니다.

- 모든 스타일은 StyleSheet.create()로 정의
- css() 함수로 컴포넌트에 적용

중요:
- 새로운 CSS 파일을 생성하지 마세요
- Aphrodite 스타일을 일반 CSS로 변환하지 마세요

### 라우팅 구조
- react-router-dom의 BrowserRouter 사용
- 주요 라우트는 src/App.js에 정의

## 반응형 디자인
- 모바일: < 768px
- 태블릿: 768px ~ 1200px
- 데스크톱: > 1200px
- 최대 콘텐츠 너비: 1400px

## 네이밍 규칙
- 컴포넌트: PascalCase
- 컴포넌트 파일: .jsx
- 유틸/데이터: .js
- UI 텍스트 및 상품명은 스페인어 사용
- 변수/함수/상태: CamelCase

## 테스트 환경
- React Testing Library 사용
- setupTests.js에서 jest-dom 설정

## 테스트 정책

- 현재 단계에서는 UI 구현이 목적이므로 TDD를 기본으로 사용하지 않습니다.
- UI 컴포넌트에 대한 테스트는 작성하지 않습니다.
- 테스트는 계산 로직이나 유틸 함수 등, 명확한 비즈니스 로직이 존재할 경우에만 선택적으로 작성합니다

## 주요 의존성
- aphrodite (교체 금지)
- react-router-dom v7.x
- react-icons (Material Design)
- react-scripts (CRA 기본)

## 주요 규칙

<!-- - 이 프로젝트의 목적은 프론트엔드 UI 구현이므로,  
  기능 완성이나 최적화보다 화면이 정상적으로 동작하는 최소한의 코드만 작성합니다. -->

- 모든 화면은 모바일, 태블릿, 데스크톱 환경을 고려한 반응형 디자인으로 구현되어야 합니다.

- 구현은 제공된 디자인 이미지(또는 시안) 를 기준으로 하며,  
  이미지에 명시되지 않은 UI 요소, 버튼, 텍스트, 기능은 임의로 추가하지 않습니다.

## 공통 규칙 (필수)

아래 규칙은 모든 페이지 및 컴포넌트 구현 시 반드시 준수해야 합니다.

1. 모든 페이지는 `header.jsx`를 통해 동일한 헤더 UI와 기능을 사용해야 합니다.
   - 헤더의 디자인 및 동작 로직을 페이지 단위로 구현하는 것은 허용하지 않습니다.

2. 모든 애니메이션 관련 로직은 `hooks/useAnimation.js`에 정의되어야 합니다.
   - 컴포넌트 내부에서 애니메이션을 직접 구현하지 않습니다.
   - 새로운 애니메이션이 필요할 경우, `useAnimation.js`에 추가 후 사용합니다.

3. 페이지 전환 시 스크롤 위치는 항상 최상단으로 초기화되어야 합니다.