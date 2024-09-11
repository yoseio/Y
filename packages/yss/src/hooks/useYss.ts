import { MutableRefObject, SetStateAction, Dispatch } from "react";
import { useDebouncedCallback } from "use-debounce";

import { ComlinkWorker } from "@/hooks/useWorkerRef";
import { IYssWorker, Embedded } from "@/Yss";

const contents = ["hello", "world", "foo", "bar", "baz"];

export const useYss = (
  workerRef: MutableRefObject<ComlinkWorker<IYssWorker> | null>,
  setResults?: Dispatch<SetStateAction<Embedded[]>>,
  setPerformance?: Dispatch<SetStateAction<number>>,
) => {
  return useDebouncedCallback(async (query: string, k: number = 10) => {
    if (workerRef.current) {
      const t0 = performance.now();

      const init = await workerRef.current.remote.init({ contents });
      console.log("Run init process: ", init);
      const results = await workerRef.current.remote.search(query, k);

      const t1 = performance.now();

      if (setResults) setResults(results);
      if (setPerformance) setPerformance(t1 - t0);
    }
  }, 500);
};
