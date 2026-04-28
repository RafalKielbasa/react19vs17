// =============================================
// REACT 17 - useImperativeHandle z forwardRef
// =============================================
// Eksponowanie własnego API komponentu (focus, reset, scroll...).

import { forwardRef, useImperativeHandle, useRef } from "react";

const TextField = forwardRef(function TextField(props, ref) {
  const inputRef = useRef(null);

  // Definiujemy co rodzic widzi pod ref.current
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} {...props} />;
});

export function Form() {
  const fieldRef = useRef(null);

  return (
    <>
      <TextField ref={fieldRef} />
      <button onClick={() => fieldRef.current?.focus()}>Focus</button>
      <button onClick={() => fieldRef.current?.clear()}>Wyczyść</button>
    </>
  );
}

// Cleanup ref'a do DOM był ZAWSZE: React sam ustawiał i usuwał.
// Ale gdy ref to obiekt - cleanup był ręczny lub niemożliwy.
