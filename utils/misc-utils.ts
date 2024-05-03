import { FlashStatus } from "../islands/Flash.tsx";

export function flash(message: string, status?: FlashStatus) {
  return { flash: { message, status: status ?? "success" } };
}
