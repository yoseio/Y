import * as Comlink from "comlink";
import { SemanticSearch, SemanticSearchOptions, Embedded, IYssWorker } from ".";

class YssWorker implements IYssWorker {
  static instance: SemanticSearch | null = null;

  async init(opts: SemanticSearchOptions): Promise<boolean> {
    if (!YssWorker.instance) {
      const instance = await SemanticSearch.getInstance(opts);
      YssWorker.instance = instance;
      return true;
    }
    return false;
  }

  async search(query: string, k: number): Promise<Embedded[]> {
    if (!YssWorker.instance) {
      return [];
    }
    const result = await YssWorker.instance.search(query, k);
    return result;
  }
}

const worker = new YssWorker();
Comlink.expose(worker, self as any);
