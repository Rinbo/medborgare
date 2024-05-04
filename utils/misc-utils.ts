import { FlashStatus } from "../islands/Flash.tsx";

export function flash(message: string, status?: FlashStatus) {
  return { flash: { message, status: status ?? "success" } };
}

export function arrayIsEmpty<T>(array: T[] | undefined | null): boolean {
  if (!array) return true;
  return array.length === 0;
}
