// =============================================
// REACT 17 - Pobieranie danych: useEffect + useState
// =============================================
// Klasyczny wzorzec: trzy stany (loading, error, data)
// Trzeba ręcznie obsłużyć każdy z nich.

import { useEffect, useState } from "react";

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Błąd sieci");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error.message}</p>;
  return <h1>Cześć, {user.name}!</h1>;
}

// PROBLEMY:
// - Dużo boilerplate (3 stany do zarządzania)
// - Trzeba pamiętać o cancellation (cancelled flag / AbortController)
// - useEffect odpala się PO renderze - "waterfall" requestów
// - Brak naturalnej integracji z Suspense
