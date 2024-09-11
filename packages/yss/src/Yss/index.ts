export * from "./common";
export * from "./Embedding";
export * from "./SemanticSearch";
export * from "./VectorStore";

import { Embedded } from "./common";
import { SemanticSearchOptions } from "./SemanticSearch";

export interface IYssWorker {
  init(opts: SemanticSearchOptions): Promise<boolean>;
  search(query: string, k: number): Promise<Embedded[]>;
}
