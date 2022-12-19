import { useEffect, useState } from "react";
import { API_ORIGIN } from "../helper/api";

export function useGet<T>(url: string, initialState: T) {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let text = localStorage.getItem(url);
    if (text) {
      setState(JSON.parse(text));
    }
    setIsLoading(true);
    fetch(API_ORIGIN + url)
      .then((res) => res.json())
      .then((json) => {
        setState(json);
        setIsLoading(false);
        localStorage.setItem(url, JSON.stringify(json));
      })
      .catch((error) => {
        console.error("Failed to GET", { url, error });
        setIsLoading(false);
      });
  }, [url]);
  return { state, loading: isLoading, setState };
}
