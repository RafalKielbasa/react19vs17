// =============================================
// REACT 17 - forwardRef
// =============================================
// Komponenty funkcyjne nie mają domyślnie dostępu do `ref`.
// Aby przekazać ref do dziecka - trzeba "owinąć" w forwardRef.

import { forwardRef, useRef } from "react";

// ❌ Tak NIE da się - ref byłby ignorowany
// function Input({ placeholder }, ref) { ... }

// ✅ forwardRef - obowiązkowe w React 17/18
const Input = forwardRef(function Input({ placeholder }, ref) {
  return <input ref={ref} placeholder={placeholder} />;
});

// Z TypeScript jest jeszcze gorzej:
// const Input = forwardRef<HTMLInputElement, Props>((props, ref) => ...)

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

// PROBLEMY:
// - Dodatkowy boilerplate (każdy reużywalny komponent owinięty)
// - W TypeScript: dziwna sygnatura generic'ów
// - Komponenty z displayName trzeba ustawiać ręcznie
