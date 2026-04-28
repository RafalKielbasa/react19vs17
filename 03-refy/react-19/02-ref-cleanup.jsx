// =============================================
// REACT 19 - Ref callback z cleanup
// =============================================
// Callback ref może teraz zwrócić funkcję cleanup
// (analogicznie jak useEffect).

import { useRef } from "react";

export function ChartCanvas() {
  return (
    <canvas
      ref={(node) => {
        if (!node) return;

        // np. inicjalizacja zewnętrznej biblioteki
        const chart = createChart(node);
        chart.draw();

        // ✅ React 19: zwracamy cleanup
        return () => {
          chart.destroy();
        };
      }}
    />
  );
}

// W REACT 17/18 było tak (ręczne czyszczenie):
//
// <canvas
//   ref={(node) => {
//     if (node) {
//       chartRef.current = createChart(node);
//     } else {
//       chartRef.current?.destroy();  // node === null = unmount
//       chartRef.current = null;
//     }
//   }}
// />

// To samo działa też dla zwykłych ref'ów do bibliotek typu:
// - leaflet (mapy)
// - chart.js / d3
// - WebGL / canvas
// - third-party widgets

function createChart(node) {
  return { draw() {}, destroy() {} };
}
