// =============================================
// REACT 19 - useFormStatus
// =============================================
// Czyta status nadrzędnego <form> - bez prop-drillingu.
// Idealne dla zagnieżdżonych komponentów (np. SubmitButton).

import { useFormStatus } from "react-dom";

// Komponent NIE dostaje propsa "isPending".
// Pyta najbliższy <form> w drzewie.
function SubmitButton({ children }) {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Wysyłanie..." : children}
    </button>
  );
}

async function loginAction(formData) {
  await fetch("/api/login", { method: "POST", body: formData });
}

export function LoginForm() {
  return (
    <form action={loginAction}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      {/* SubmitButton sam zna stan formularza */}
      <SubmitButton>Zaloguj</SubmitButton>
    </form>
  );
}

// KIEDY UŻYĆ:
// - Reużywalne komponenty form-aware (SubmitButton, Spinner, FieldError)
// - W bibliotekach UI (np. wspólny <Button> w design systemie)
//
// ⚠️ MUSI być wywołane W komponencie zagnieżdżonym wewnątrz <form>,
// nie w samym komponencie z <form>.
