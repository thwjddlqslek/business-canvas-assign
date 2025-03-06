# 비즈니스 캔버스 프론트엔드 과제 📝

## 🛠️ 기술 스택

- React 19
- TypeScript 5.7
- Vite 6.2

![비캔_화면녹화](https://github.com/user-attachments/assets/452fe594-0064-4200-b9b9-8cb7ea6e349f)

## 🏗️ 아키텍처 설계

### 1. 컴포넌트 추상화

#### Form 요소 그룹화

- **Input System**: `src/components/Form/`
  ```typescript
  -Input.tsx - // 기본 텍스트 입력
    Date.tsx - // 날짜 선택기 (캘린더 커스텀)
    SelectBox.tsx - // 드롭다운 (옵션 상수화)
    Textarea.tsx; // 메모 입력
  ```

#### 모달 시스템 계층화

<img width="1463" alt="비캔1" src="https://github.com/user-attachments/assets/ffbaeb9c-395d-4831-a8c0-9e35d2e0f104" />

- **Modal Components**: `src/components/Modal/`
  ```typescript
  -Modal.tsx - // 기본 모달 템플릿
    MemberForm.tsx - // 회원 정보 입력 폼
    SmallModal.tsx; // 작은 크기 모달 (수정/삭제)
  ```

#### 테이블 시스템

<img width="643" alt="비캔2" src="https://github.com/user-attachments/assets/f055dab7-09da-4628-a532-24cf058e66a6" />

- **Table Components**: `src/components/Table/`
  ```typescript
  -MemberTable.tsx - // 메인 테이블 컴포넌트
    Checkbox.tsx; // 재사용 체크박스
  ```

### 2. 타입 시스템 설계

- **Domain Types**: 도메인별 타입 분리

  ```typescript
  // Form 관련 타입
  interface InputProps {
    label: string;
    required?: boolean;
    // ...
  }

  // 회원 정보 타입
  interface MemberFormData {
    id: string;
    name: string;
    // ...
  }

  // 테이블 관련 타입
  interface FilterDataProps {
    name: string[];
    address: string[];
    // ...
  }
  ```

### 3. 상수 관리 시스템

```typescript
// memberConstants.ts
export const JOB_OPTIONS = [
  { value: "개발자", label: "개발자" },
  { value: "PO", label: "PO" },
  { value: "디자이너", label: "디자이너" },
] as const;

export const INITIAL_MEMBERS = [
  // 초기 회원 데이터
] as const;
```

### 4. 데이터 영속성 관리

- **Storage Service**: `src/services/storageService.ts`

  ```typescript
  // CRUD 작업 추상화
  export const setMembers = (members: MemberProps[]): void
  export const getMembers = (): MemberProps[]
  export const addMember = (newMember: MemberFormData): MemberProps
  export const updateMember = (updatedMember: MemberFormData)
  export const deleteMember = (id: string): void

  // 데이터 검증
  const filterValidMembers = (members: any[]): MemberProps[]
  ```

### 5. 필터링 시스템

- **필터 상태 관리**

  ```typescript
  interface FilterDataProps {
    name: string[];
    address: string[];
    memo: string[];
    joinDate: string[];
    job: string[];
    emailConsent: boolean[];
  }
  ```

- **필터링 로직**

  ```typescript
  const filteredMembers = members.filter((member) => {
    const nameMatch = selectedFilters.name.length === 0 ||
                     selectedFilters.name.includes(member.name);
    const addressMatch = selectedFilters.address.length === 0 ||
                        selectedFilters.address.includes(member.address);
    // ... 각 필드별 필터링
    return nameMatch && addressMatch && ...;
  });
  ```

- **필터 UI 구현**
  ```typescript
  - 각 컬럼별 독립적인 필터 드롭다운
  - 다중 선택 지원 (Checkbox 기반)
  ```

### 6. 스타일 시스템

- **CSS 모듈화**
  ```css
  // 변수 기반 테마 시스템
  :root {
    --button-primary: rgba(74, 124, 254, 1);
    --button-disabled: rgba(227, 227, 227, 1);
    // ...
  }
  ```

## 💡 기술적 특징

1. **타입 안정성**

   - 모든 컴포넌트 Props 타입 정의
   - readonly 상수 타입 활용
   - 유틸리티 타입 적극 활용

2. **데이터 관리**

   - LocalStorage 추상화 레이어
   - 데이터 유효성 검증
   - 에러 처리 및 복구 시스템

3. **재사용성**
   - 공통 컴포넌트 모듈화
   - Props 기반 변형 지원
   - 일관된 스타일 시스템

## 🚀 시작하기

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

---

더 나은 코드를 위한 피드백은 언제나 환영합니다! 🙌
