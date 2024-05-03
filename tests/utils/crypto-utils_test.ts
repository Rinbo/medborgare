import { createMD5Hash } from "crypto-utils";
import { assertEquals } from "$fresh/src/server/deps.ts";

Deno.test("crypto-utils test", async (t) => {
  await t.step("md5 hash test", async () => {
    const hash = await createMD5Hash("some_string");
    assertEquals("31ee76261d87fed8cb9d4c465c48158c", hash);
  });
});
