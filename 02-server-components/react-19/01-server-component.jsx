// =============================================
// REACT 19 - React Server Component (RSC)
// =============================================
// Komponent NIGDY nie trafia do przeglądarki.
// Może być async. Może czytać bazę / pliki / sekrety.
// Renderuje się NA SERWERZE, klient dostaje już HTML.

// ⚠️ Brak "use client" = to jest Server Component
// (w Next.js App Router - domyślnie)

import { db } from "./db"; // np. Prisma, drizzle

// ✅ async komponent - tylko na serwerze
export default async function ProductList() {
  // Bezpośredni dostęp do bazy - bez warstwy API
  const products = await db.product.findMany();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} - {p.price} zł</li>
      ))}
    </ul>
  );
}

// CO ZYSKUJEMY:
// - Zerowy JS dla tego komponentu w przeglądarce
// - Bezpieczne sekrety: process.env.DB_URL nigdy nie wycieknie
// - Brak waterfall: dane od razu w HTML
// - SEO out-of-the-box

// ⚠️ NIE MOŻESZ tu używać:
// - useState, useEffect (to jest serwer!)
// - onClick, onChange (eventów)
// - window, document
// Jeśli potrzebujesz interaktywności - osobny "use client" komponent.
