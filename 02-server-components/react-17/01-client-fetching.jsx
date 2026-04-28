// =============================================
// REACT 17 - Pobieranie danych w komponencie klienckim
// =============================================
// Cały kod leci do przeglądarki, dane pobierane PO renderze.
// API key musi być publiczny (nie można go używać tutaj!).

import { useEffect, useState } from "react";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dzieje się w przeglądarce, po hydratacji.
    // = "waterfall": HTML -> JS -> render -> fetch -> rerender
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ładowanie produktów...</p>;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} - {p.price} zł</li>
      ))}
    </ul>
  );
}

// PROBLEMY:
// - Cały kod komponentu w bundle (też logika "tylko-do-pobrania")
// - Sekrety (API key do bazy) NIE mogą tu być
// - Slow start: empty page -> spinner -> dane
// - Trudniej z SEO (klient renderuje)
