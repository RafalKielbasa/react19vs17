// =============================================
// REACT 19 - ref jako zwykły prop
// =============================================
// Koniec forwardRef! `ref` to teraz normalny prop.
// Działa w komponentach funkcyjnych bez owijki.

import { useRef } from "react";

// ✅ Po prostu przyjmij `ref` w destrukturyzacji propsów
function Input({ placeholder, ref }) {
  return <input ref={ref} placeholder={placeholder} />;
}

// W TypeScript po prostu:
// function Input({ placeholder, ref }: { placeholder: string; ref: React.Ref<HTMLInputElement> })

export function LoginForm() {
  const emailRef = useRef(null);

  return (
    <>
      <Input ref={emailRef} placeholder="Email" />
      <button onClick={() => emailRef.current?.focus()}>
        Skup się
      </button>
    </>
  );
}

// MIGRACJA:
// React 19 dostarcza CODEMOD który automatycznie usuwa forwardRef:
//   npx codemod@latest react/19/replace-use-form-state
//   npx codemod@latest react/19/remove-forward-ref
//
// `forwardRef` jest deprecated, ale nadal działa.
// Plan: usunięcie w przyszłej major wersji.
