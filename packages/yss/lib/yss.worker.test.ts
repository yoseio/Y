import "@vitest/web-worker";
import { expect, test } from "vitest";
import * as Comlink from "comlink";

import { IYssWorker } from ".";
import YssWorker from "./yss.worker?worker";

const worker = new YssWorker();
const yss = Comlink.wrap<IYssWorker>(worker);

test("YssWorker", async () => {
  const contents = ["hello", "world"];
  expect(await yss.init({ contents })).toBe(true);
  expect((await yss.search("hello", 1))[0].text).toEqual(contents[0]);
});
