import { ZodError } from "z";
import { FlashStatus } from "islands/ServerFlash.tsx";

export function flash(message: string, status?: FlashStatus) {
  return { flash: createFlash(message, status) };
}

export function createFlash(message: string, status?: FlashStatus) {
  return { message, status: status ?? "success" };
}

export function arrayIsEmpty<T>(array: T[] | undefined | null): boolean {
  if (!array) return true;
  return array.length === 0;
}

export function includesIgnoreCase(firstString: string, secondString: string): boolean {
  return firstString.toLowerCase().includes(secondString.toLocaleLowerCase());
}

export function equalsIgnoreCase(firstString: string, secondString: string): boolean {
  return firstString.toLowerCase() === secondString.toLocaleLowerCase();
}

export function isBlankString(string: string | null | undefined) {
  return !string || string.trim().length === 0;
}

export function flattenZodErrors(error: ZodError) {
  return error.flatten().fieldErrors;
}
