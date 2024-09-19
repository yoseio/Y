import { expect, test } from "vitest";
import { Embedding } from "./Embedding";
import { VectorStore } from "./VectorStore";

const embedding = await Embedding.getInstance();
const embeddeds = await embedding.embeds(["hello", "world"]);
const vectorStore = new VectorStore(embeddeds);

test("VectorStore.search", async () => {
  const neighbors = vectorStore.search(embeddeds[0], 1);
  expect(neighbors.length).toBe(1);
  expect(neighbors[0].text).toBe(embeddeds[0].text);
});
