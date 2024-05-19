import { assert } from "$std/assert/assert.ts";
import { isMutatingRoute } from "route-utils";

Deno.test("crypto-utils test", async (t) => {
  await t.step("are mutating routes", () => {
    assert(isMutatingRoute("/new"));
    assert(isMutatingRoute("/new/"));
    assert(isMutatingRoute("/something/new"));
    assert(isMutatingRoute("/something/new/"));

    assert(isMutatingRoute("/edit"));
    assert(isMutatingRoute("/edit/"));
    assert(isMutatingRoute("/something/edit"));
    assert(isMutatingRoute("/something/edit/"));

    assert(isMutatingRoute("/delete"));
    assert(isMutatingRoute("/delete/"));
    assert(isMutatingRoute("/something/delete"));
    assert(isMutatingRoute("/something/delete/"));
  });
});

Deno.test("crypto-utils test", async (t) => {
  await t.step("are not mutating routes", () => {
    assert(!isMutatingRoute("/ne"));
    assert(!isMutatingRoute("/new/d"));
    assert(!isMutatingRoute("/something/ne"));
    assert(!isMutatingRoute("/something/new/d"));

    assert(!isMutatingRoute("/dit"));
    assert(!isMutatingRoute("/edit/d"));
    assert(!isMutatingRoute("/something/edi"));
    assert(!isMutatingRoute("/something/edit/d"));

    assert(!isMutatingRoute("/delet"));
    assert(!isMutatingRoute("/delete/d"));
    assert(!isMutatingRoute("/something/deete"));
    assert(!isMutatingRoute("/something/delete/d"));
  });
});
