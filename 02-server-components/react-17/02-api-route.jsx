// =============================================
// REACT 17 - Tradycyjny flow: form -> API endpoint
// =============================================
// 1. Trzeba napisać REST endpoint
// 2. Klient wysyła fetch
// 3. Klient parsuje odpowiedź
// 4. Klient aktualizuje stan

// === pages/api/todo.js (Express / Next.js Pages Router) ===
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { title } = JSON.parse(req.body);

  // walidacja, autoryzacja...
  const todo = await db.todo.create({ data: { title } });

  res.json(todo);
}

// === components/AddTodo.jsx (CLIENT) ===
import { useState } from "react";

export function AddTodo({ onAdded }) {
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    const res = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    const todo = await res.json();
    onAdded(todo);
    setTitle("");
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button disabled={pending}>Dodaj</button>
    </form>
  );
}

// PROBLEMY:
// - Dwa miejsca: API route + komponent kliencki
// - Walidacja na obu warstwach
// - Trzeba pamiętać o serializacji
// - Każda akcja = osobny endpoint
