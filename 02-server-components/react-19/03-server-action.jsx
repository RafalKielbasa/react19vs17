// =============================================
// REACT 19 - Server Actions
// =============================================
// Funkcja serwerowa wywoływana bezpośrednio z formularza.
// "use server" tworzy automatyczny endpoint pod spodem.
// Brak ręcznego pisania API routes.

// === app/todos/actions.js (SERWER) ===
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addTodo(formData) {
  const title = formData.get("title");

  if (!title) {
    return { error: "Tytuł jest wymagany" };
  }

  await db.todo.create({ data: { title } });

  // Powiedz Next.js żeby przeładował stronę z nowymi danymi
  revalidatePath("/todos");

  return { error: null };
}

// === app/todos/page.jsx (SERVER COMPONENT) ===
import { addTodo } from "./actions";
import { db } from "@/lib/db";

export default async function TodosPage() {
  const todos = await db.todo.findMany();

  return (
    <>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>

      {/* form action = funkcja serwerowa, NIE URL */}
      <form action={addTodo}>
        <input name="title" />
        <button>Dodaj</button>
      </form>
    </>
  );
}

// CO ZYSKUJEMY:
// - Brak osobnego API endpoint
// - Bezpośredni dostęp do bazy z funkcji "akcji"
// - Działa BEZ JS (progresywne ulepszanie!)
// - Type-safe end-to-end (jeden plik, jedna funkcja)
//
// ⚠️ Server Actions ZAWSZE są POST, ZAWSZE async.
// "use server" oznacza "wystaw to jako wywoływalny endpoint" -
// nie myl z "use client" które robi zupełnie co innego.
