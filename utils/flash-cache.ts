import { FlashMessage } from "islands/ServerFlash.tsx";

const flashCache = new Map<string, FlashMessage>();

export function setFlashMessage({ sessionId, flashMessage }: { sessionId: string; flashMessage: FlashMessage }) {
  flashCache.set(sessionId, flashMessage);
}

export function removeFlashMessage(sessionId: string) {
  const flashMessage = flashCache.get(sessionId);
  flashCache.delete(sessionId);
  return flashMessage;
}
