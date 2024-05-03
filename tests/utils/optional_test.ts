import { assert } from "$std/assert/assert.ts";
import { assertEquals, assertThrows } from "$fresh/src/server/deps.ts";
import { Optional } from "../../utils/optional.ts";

Deno.test("Optional test", async (t) => {
  await t.step("empty optional test", () => {
    const optional = Optional.empty();
    assert(optional.isEmpty());
    assert(!optional.isPresent());
    assertThrows(() => optional.get());
  });

  await t.step("non-empty optional test", () => {
    const optional = Optional.of("Some string");
    assert(!optional.isEmpty());
    assert(optional.isPresent());
    assertEquals("Some string", optional.get());
  });

  await t.step("ofNullable with string test", () => {
    const nonNulloptional = Optional.ofNullable("Some string");
    assert(!nonNulloptional.isEmpty());
    assert(nonNulloptional.isPresent());
    assertEquals("Some string", nonNulloptional.get());
  });

  await t.step("ofNullable with null test", () => {
    const nullOptional = Optional.ofNullable(null);
    assert(nullOptional.isEmpty());
    assert(!nullOptional.isPresent());
    assertThrows(() => nullOptional.get());
  });

  await t.step("ofNullable with undefined test", () => {
    const undefinedOptional = Optional.ofNullable(undefined);
    assert(undefinedOptional.isEmpty());
    assert(!undefinedOptional.isPresent());
    assertThrows(() => undefinedOptional.get());
  });

  await t.step("ifPresent with value test", () => {
    const optional = Optional.of("MY_VALUE");
    optional.ifPresent((value) => assertEquals("MY_VALUE", value));
  });

  await t.step("ifPresent with undefined test", () => {
    const undefinedOptional = Optional.ofNullable(undefined);
    undefinedOptional.ifPresent((value) => {
      console.error(value, "SHOULD NOT HAPPEN");
      throw new Error(value);
    });
  });

  await t.step("ifPresent with null test", () => {
    const nullOptional = Optional.ofNullable(null);
    nullOptional.ifPresent((value) => {
      console.error(value, "SHOULD NOT HAPPEN");
      throw new Error();
    });
  });
});
