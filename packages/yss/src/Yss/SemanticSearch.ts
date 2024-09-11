import { Embedded } from "./common";
import { Embedding, EmbeddingOptions } from "./Embedding";
import { VectorStore } from "./VectorStore";

export interface SemanticSearchOptions {
  contents: string[];
  embedding?: EmbeddingOptions;
}

export class SemanticSearch {
  static async getInstance(opts: SemanticSearchOptions) {
    const embedding = await Embedding.getInstance(opts.embedding);
    const embeddeds = await embedding.embeds(opts.contents);
    const vectorStore = new VectorStore(embeddeds);
    return new SemanticSearch(embedding, vectorStore);
  }

  embedding: Embedding;
  vectorStore: VectorStore;

  constructor(embedding: Embedding, vectorStore: VectorStore) {
    this.embedding = embedding;
    this.vectorStore = vectorStore;
  }

  async search(query: string, k: number = 10): Promise<Embedded[]> {
    const embedded = await this.embedding.embed(query);
    return this.vectorStore.search(embedded, k);
  }
}
