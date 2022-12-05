import { useEffect, useRef } from "react";

export function useCounter() {
  const renderCounter = useRef(0);
  const effectCounter = useRef(0);
  useEffect(() => {
    effectCounter.current++;
    console.log("effect x" + effectCounter.current);
  });
  renderCounter.current++;
  console.log("render x" + renderCounter.current);
}
