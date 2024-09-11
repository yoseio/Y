import { expect, test } from "vitest";
import { SemanticSearch } from "./SemanticSearch";

const contents = ["hello", "world"];
const semanticSearch = await SemanticSearch.getInstance({ contents });

test("SemanticSearch.search", async () => {
  const neighbors = await semanticSearch.search(contents[0], 1);
  expect(neighbors.length).toBe(1);
  expect(neighbors[0].text).toBe(contents[0]);
});
