// =============================================
// REACT 19 - Hook `use()` + Suspense
// =============================================
// `use()` rozpakowuje Promise lub Context.
// Suspense + ErrorBoundary obsługują loading/error.
// Komponent zwraca tylko "happy path".

import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Funkcja zwraca Promise - można ją wywołać w trakcie renderu rodzica
function fetchUser(userId) {
  return fetch(`/api/users/${userId}`).then((res) => {
    if (!res.ok) throw new Error("Błąd sieci");
    return res.json();
  });
}

function UserProfile({ userPromise }) {
  // `use()` "rozpakowuje" Promise.
  // Dopóki nie ma wyniku - zawiesza komponent (Suspense łapie).
  // Jeśli rzuci - łapie ErrorBoundary.
  const user = use(userPromise);

  return <h1>Cześć, {user.name}!</h1>;
}

export function UserPage({ userId }) {
  // Promise tworzymy NA ZEWNĄTRZ komponentu zawieszanego
  // (najlepiej w komponencie nadrzędnym albo na serwerze).
  const userPromise = fetchUser(userId);

  return (
    <ErrorBoundary fallback={<p>Coś poszło nie tak</p>}>
      <Suspense fallback={<p>Ładowanie...</p>}>
        <UserProfile userPromise={userPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

// CZYM RÓŻNI SIĘ OD POPRZEDNICH HOOKÓW:
// - `use()` MOŻNA wywołać warunkowo (w `if`, w pętli)
// - Działa z Promise i z Context
// - Wymaga Suspense + ErrorBoundary u góry drzewa
//
// TYPOWY BŁĄD:
// const promise = fetchUser(id);  // ❌ jeśli zrobisz to w komponencie
// który `use(promise)` - stworzysz nieskończoną pętlę renderów.
// Promise musi być stworzony WYŻEJ albo zmemoizowany.
