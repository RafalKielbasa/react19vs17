// =============================================
// REACT 19 - useActionState
// =============================================
// Jeden hook zastępuje: stan formularza, isPending, error.
// `action` zamiast `onSubmit`. FormData zamiast value/onChange.

import { useActionState } from "react";

// Akcja - dostaje poprzedni state i FormData
async function subscribeAction(prevState, formData) {
  const email = formData.get("email");

  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const data = await res.json();
      return { error: data.message, success: false };
    }
    return { error: null, success: true };
  } catch (err) {
    return { error: err.message, success: false };
  }
}

export function NewsletterForm() {
  // useActionState zwraca: aktualny state, "owinięta" akcja, isPending
  const [state, formAction, isPending] = useActionState(subscribeAction, {
    error: null,
    success: false,
  });

  return (
    // ⚠️ React 19: <form action={...}> z funkcją (nie z URL!)
    <form action={formAction}>
      <input type="email" name="email" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Zapisywanie..." : "Zapisz"}
      </button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.success && <p>Dziękujemy!</p>}
    </form>
  );
}

// CO ZYSKUJEMY:
// - Brak preventDefault, brak onChange, brak useState dla pól
// - isPending od Reacta - automatyczny
// - Działa z Server Actions w RSC
// - Formularz domyślnie "uncontrolled" - mniej re-renderów
