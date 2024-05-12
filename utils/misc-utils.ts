import { ZodError } from "z";
import { FlashStatus } from "../islands/Flash.tsx";

export function flash(message: string, status?: FlashStatus) {
  return { flash: { message, status: status ?? "success" } };
}

export function arrayIsEmpty<T>(array: T[] | undefined | null): boolean {
  if (!array) return true;
  return array.length === 0;
}

export function includesIgnoreCase(firstString: string, secondString: string): boolean {
  return firstString.toLowerCase().includes(secondString.toLocaleLowerCase());
}

export function isBlankString(string: string | null | undefined) {
  return !string || string.trim().length === 0;
}

export function flattenZodErrors(error: ZodError) {
  return error.flatten().fieldErrors;
}
