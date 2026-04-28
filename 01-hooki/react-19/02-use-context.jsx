// =============================================
// REACT 19 - `use()` z Context (zamiast useContext)
// =============================================
// Główna przewaga: `use()` może być wywołane WARUNKOWO.
// `useContext` musiał być na górze komponentu.

import { use, createContext } from "react";

const ThemeContext = createContext("light");

// REACT 17/18 - useContext NIE może być warunkowo
function OldButton({ show }) {
  // const theme = useContext(ThemeContext);  // tylko tu, na górze
  // if (!show) return null;
  // return <button className={theme}>Klik</button>;
}

// REACT 19 - `use()` MOŻE być warunkowo
function NewButton({ show }) {
  if (!show) {
    return null;
  }

  // ✅ Warunkowy odczyt contextu - wcześniej niemożliwy
  const theme = use(ThemeContext);

  return <button className={theme}>Klik</button>;
}

export function App() {
  return (
    <ThemeContext.Provider value="dark">
      <NewButton show={true} />
    </ThemeContext.Provider>
  );
}
