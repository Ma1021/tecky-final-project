import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { Parser } from "cast.ts";

export function useGet<T>(options: {
  url: string;
  initialState: T;
  parser: Parser<T>;
  name: string;
}) {
  const [presentToast, dismissToast] = useIonToast();

  const [state, setState] = useState<T>(options.initialState);

  const { url, name, parser } = options;

  function download() {
    fetch(`${process.env.REACT_}` + url)
      .then((res) =>
        res.json().then((json: unknown) => {
          // console.log('fetch result:', json)
          let state = parser.parse(json, {
            name: name,
          });
          setState(state);
          presentToast({
            message: "loaded " + name,
            duration: 1000,
          });
        })
      )
      .catch((err) => {
        console.error(`failed to load ${name}:`, err);
        presentToast({
          message: String(err),
          duration: 15000,
          color: "danger",
          //   buttons: [{ text: "Close", role: "cancel", handler: dismissToast }],
        });
      });
  }

  useEffect(download, [url, name, parser]);

  return { state, setState, download };
}
