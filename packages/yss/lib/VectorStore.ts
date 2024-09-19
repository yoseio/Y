import { Yvs } from "@y/yvs";
import { Embedded, NonNullableFilter } from "./common";

export class VectorStore {
  index: Yvs;
  data: Map<string, Embedded>;

  constructor(embeddeds: Embedded[]) {
    const contents = embeddeds.map((embedded) => ({
      id: embedded.id,
      vector: Array.from(embedded.vector),
    }));
    this.index = new Yvs({ contents });
    this.data = new Map(embeddeds.map((embedded) => [embedded.id, embedded]));
  }

  search(embedded: Embedded, k: number): Embedded[] {
    return this.index
      .search(embedded.vector, k)
      .map((neighbor) => this.data.get(neighbor))
      .filter(NonNullableFilter);
  }
}
