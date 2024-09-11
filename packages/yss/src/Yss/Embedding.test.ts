import { expect, test } from "vitest";
import { Embedding } from "./Embedding";

const embedding = await Embedding.getInstance();

test("Embedding.embed", async () => {
  const embedded = await embedding.embed("hello");
  expect(embedded.vector.length).toBe(384);
});

test("Embedding.embeds", async () => {
  const embedded = await embedding.embeds(["hello", "world"]);
  expect(embedded.length).toBe(2);
  expect(embedded[0].vector.length).toBe(384);
});
