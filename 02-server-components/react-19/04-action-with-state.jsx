// =============================================
// REACT 19 - Server Action + useActionState + useFormStatus
// =============================================
// Pełen pakiet: serwer + walidacja + pending + błędy.

// === actions.js (SERVER) ===
"use server";

import { db } from "@/lib/db";
import { z } from "zod";

const Schema = z.object({
  email: z.string().email(),
});

export async function subscribe(prevState, formData) {
  const parsed = Schema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: "Niepoprawny e-mail", success: false };
  }

  await db.subscriber.create({ data: parsed.data });

  return { error: null, success: true };
}

// === SubscribeForm.jsx (CLIENT - bo używa hooków) ===
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribe } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "..." : "Zapisz"}</button>;
}

export function SubscribeForm() {
  const [state, formAction] = useActionState(subscribe, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <SubmitButton />
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.success && <p>Dziękujemy!</p>}
    </form>
  );
}

// FLOW (bez ani jednego fetch w kodzie!):
// 1. Klient submituje form
// 2. React wysyła FormData do "ukrytego" endpointu (Server Action)
// 3. subscribe() wykonuje się NA SERWERZE
// 4. Wynik wraca jako nowy state
// 5. Komponent re-renderuje się z aktualnym error/success
