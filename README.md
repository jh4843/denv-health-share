# denv-health-share

## 과제 개요

- 사용자들은 SNS에 운동사진을 업로드하여 공유할 수 있고, 공유된 아이템에 다른 사용자가 댓글을 남길수 있다.
- 사용자가 SNS에 운동 사진을 업로드할 수 있다.
- 사용자는 2개의 클래스로 구분된다.
  - Administrator Class
    - SNS 업로드 및 삭제가 가능하다.
  - User Class
    - SNS 업로드만 가능하다.
-

## 문제 해결을 위한 아이디어 요약

- 프로세스 항목
  - Front End
  - Back End
    - DB
    - Rest API server
    - Storage
- 작업리스트 항목
  - Firebase storage / Firestore 사용방법 학습
  - 사용자 관리 (사용자 Sign up / Sign in)
    - FE:
      - UI 설계
    - BE:
      - DB 설계
  - Main 페이지 구성
    - 목록 표시 방법 구현
    - 목록 조회 구현
  - 사진 업로드 구현
    - FE:
      - 사진 업로드 UI 구현
    - BE:
      - 사진 Storage API 구현
      - 사진 정보 DB 구현
- API 설계
  - 사용자 정보
    - 로그인 여부 확인
    - 사용자 등록
    - 사용자 로그인 / 로그아웃
  - 이미지 정보
    - 이미지 업로드
    - 이미지 목록 획득 (pagination)
    - 이미지 갯수 확인
    - 이미지 삭제
- 프로젝트 빌드 & 테스트 & 실행 방법
  - yarn install
  - yarn dev
- 미해결 과제
  - 삭제 기능
  - 상세 페이지
  - 정렬 기능
  - 테스트 코드

## 개발 환경

- FE
  - nuxt3 (vue.js) - composition api
  - typescript
  - vuetify3 (UI framework)
- BE
  - firebase
- 환경 구성
  - Front-end
    - Ui Framework: vuetify3
    - Test: chrome (v 113.0.5672.127)
  - Back-end
    - function: firebase function
    - DB: Cloud Firestore
    - Storage: Firebase Cloud Storage

## Install

- $npx nuxi init
- $yarn install
- $yarn add vuetify@next sass
- yarn add --dev @nuxt/typescript-build @nuxt/types typescript
- $yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-nuxt eslint-plugin-prettier prettier typescript @nuxtjs/eslint-config-typescript

## Ref

- https://github.com/BayBreezy/nuxt3-vuetify3-starter
