import { createContext } from "preact";
import { ClientFlashMessage } from "../hooks/useClientFlash.ts";
import { ComponentChildren } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { Signal, useSignal } from "@preact/signals";

const INITIAL_CONTEXT: ClientFlashMessage = { message: "", status: "success", shouldDisplay: false };

export const FlashContext = createContext<Signal<ClientFlashMessage> | null>(null);

export default function FlashProvider({ children }: { children: ComponentChildren }) {
  const state = useSignal<ClientFlashMessage>(INITIAL_CONTEXT);

  return (
    <FlashContext.Provider value={state}>
      {children}
    </FlashContext.Provider>
  );
}
