// =============================================
// REACT 17 - Formularz z manualną obsługą stanu
// =============================================
// Boilerplate dla każdego formularza:
// - stan dla pól, isPending, error
// - własna funkcja handleSubmit z preventDefault

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Błąd zapisu");
      }
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Zapisywanie..." : "Zapisz"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p>Dziękujemy!</p>}
    </form>
  );
}
