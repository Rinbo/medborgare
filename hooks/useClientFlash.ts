import { useContext } from "preact/hooks";
import { FlashMessage } from "islands/ServerFlash.tsx";
import { FlashContext } from "islands/FlashProvider.tsx";

export type ClientFlashMessage = FlashMessage & { shouldDisplay: boolean };

export const useClientFlash = () => {
  const state = useContext(FlashContext);

  if (!state) throw new Error("Context not correctly set");

  const setFlash = (newMessage: FlashMessage) => {
    console.log("flasher is called!!!");
    state.value = { ...newMessage, shouldDisplay: true };

    setTimeout(() => {
      state.value = { ...newMessage, shouldDisplay: false };
    }, 3500);
  };

  return { state: state.value, setFlash };
};
