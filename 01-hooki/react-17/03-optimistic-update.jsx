// =============================================
// REACT 17 - Optymistyczne update'y "ręcznie"
// =============================================
// Ręcznie: dodaj wiadomość do stanu, wyślij na serwer,
// w razie błędu - ROLLBACK. Łatwo o bug.

import { useState } from "react";

export function Chat({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);

  async function sendMessage(text) {
    // 1. Optymistycznie dodaj
    const optimistic = { id: `tmp-${Date.now()}`, text, sending: true };
    setMessages((prev) => [...prev, optimistic]);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const real = await res.json();

      // 2. Podmień tymczasową wiadomość na prawdziwą
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? real : m))
      );
    } catch (err) {
      // 3. Rollback - usuń optymistyczną wiadomość
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      alert("Błąd wysyłki");
    }
  }

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} style={{ opacity: m.sending ? 0.5 : 1 }}>
          {m.text}
        </div>
      ))}
      <button onClick={() => sendMessage("Cześć!")}>Wyślij</button>
    </div>
  );
}

// PROBLEMY:
// - Trzeba ręcznie pilnować rollbacku
// - Trzeba wymyślić tymczasowe ID
// - Stan messages jest "brudny" - mieszają się prawdziwe i fake
