// =============================================
// REACT 19 - useOptimistic
// =============================================
// Stan "optymistyczny" jest TYMCZASOWY i automatycznie
// resetuje się gdy akcja się skończy.
// Brak ręcznego rollbacku!

import { useOptimistic, useState, useRef } from "react";

export function Chat({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const formRef = useRef(null);

  // useOptimistic(stateBazowy, reducer)
  // optimisticMessages = messages + ewentualne dodatki
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (currentMessages, newText) => [
      ...currentMessages,
      { id: "tmp", text: newText, sending: true },
    ]
  );

  async function sendAction(formData) {
    const text = formData.get("text");
    formRef.current?.reset();

    // Pokaż natychmiast - zanim serwer odpowie
    addOptimistic(text);

    // Faktyczny zapis
    const res = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    const real = await res.json();

    // Zaktualizuj prawdziwy state - optymistyczny "zniknie" automatycznie
    setMessages((prev) => [...prev, real]);
  }

  return (
    <div>
      {optimisticMessages.map((m) => (
        <div key={m.id} style={{ opacity: m.sending ? 0.5 : 1 }}>
          {m.text}
        </div>
      ))}
      <form action={sendAction} ref={formRef}>
        <input name="text" />
        <button>Wyślij</button>
      </form>
    </div>
  );
}

// CO ZYSKUJEMY:
// - Brak ręcznego rollbacku - jeśli akcja rzuci, optymistyczny stan znika
// - Czysty podział: messages = prawda, optimisticMessages = render
// - Działa z Server Actions
