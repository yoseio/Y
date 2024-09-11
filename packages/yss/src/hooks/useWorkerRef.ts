import { useRef, useEffect } from "react";
import { Remote, wrap } from "comlink";

export type CreateWorker = new (options?: { name?: string }) => Worker;

export class ComlinkWorker<T> {
  worker: Worker;
  remote: Remote<T>;

  constructor(worker: CreateWorker) {
    this.worker = new worker();
    this.remote = wrap<T>(this.worker);
  }

  terminate() {
    this.worker.terminate();
  }
}

export const useWorkerRef = <T>(worker: CreateWorker) => {
  const workerRef = useRef<ComlinkWorker<T> | null>(null);

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = new ComlinkWorker<T>(worker);
    }

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [worker]);

  return workerRef;
};
