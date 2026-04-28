// =============================================
// REACT 19 - Mieszane drzewo: Server + Client Components
// =============================================
// Reguła: serwer może renderować klienta, ale klient
// nie może importować serwera (poza przekazaniem children).

// === ProductList.jsx (SERVER) ===
import { db } from "./db";
import LikeButton from "./LikeButton"; // klient - import OK

export default async function ProductList() {
  const products = await db.product.findMany();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - {p.price} zł
          {/* LikeButton to client component - dostaje propsy */}
          <LikeButton productId={p.id} initialLikes={p.likes} />
        </li>
      ))}
    </ul>
  );
}

// === LikeButton.jsx (CLIENT) ===
// "use client" przełącza plik na renderowanie klienckie
("use client");

import { useState } from "react";

export default function LikeButton({ productId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <button
      onClick={async () => {
        setLikes((n) => n + 1);
        await fetch(`/api/like/${productId}`, { method: "POST" });
      }}
    >
      ❤️ {likes}
    </button>
  );
}

// REGUŁA "OBWARZANKA":
// Server -> Client -> Server (poprzez children/slots)
// Można:  <ServerA><ClientB><ServerC /></ClientB></ServerA>
// Bo ServerC jest przekazany jako children, nie zaimportowany w ClientB.
